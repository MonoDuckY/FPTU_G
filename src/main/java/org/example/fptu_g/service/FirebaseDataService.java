package org.example.fptu_g.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import org.example.fptu_g.model.CampusLife;
import org.example.fptu_g.model.News;
import org.example.fptu_g.model.Program;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class FirebaseDataService {
    private static final Logger log = LoggerFactory.getLogger(FirebaseDataService.class);

    public CompletableFuture<Void> saveNews(News news) {
        log.info("Saving news to Firestore. incomingId={}", news.getId());
        CollectionReference collection = getDb().collection("news");
        String id = news.getId() != null && !news.getId().isBlank() ? news.getId() : collection.document().getId();
        news.setId(id);
        return toCompletableFuture(collection.document(id).set(news));
    }

    public CompletableFuture<Void> saveProgram(Program program) {
        log.info("Saving program to Firestore. incomingId={}", program.getId());
        CollectionReference collection = getDb().collection("programs");
        String id = program.getId() != null && !program.getId().isBlank() ? program.getId() : collection.document().getId();
        program.setId(id);
        return toCompletableFuture(collection.document(id).set(program));
    }

    public CompletableFuture<Void> saveCampusLife(CampusLife campusLife) {
        log.info("Saving campusLife to Firestore. incomingId={}", campusLife.getId());
        CollectionReference collection = getDb().collection("campusLife");
        String id = campusLife.getId() != null && !campusLife.getId().isBlank() ? campusLife.getId() : collection.document().getId();
        campusLife.setId(id);
        return toCompletableFuture(collection.document(id).set(campusLife));
    }

    public CompletableFuture<List<News>> getAllNews() {
        return readList("news", News.class, News::setId);
    }

    public CompletableFuture<List<Program>> getAllPrograms() {
        return readList("programs", Program.class, Program::setId);
    }

    public CompletableFuture<List<CampusLife>> getAllCampusLife() {
        return readList("campusLife", CampusLife.class, CampusLife::setId);
    }

    private <T> CompletableFuture<List<T>> readList(String collectionName, Class<T> clazz, IdSetter<T> idSetter) {
        log.info("Fetching Firestore collection: {}", collectionName);
        CompletableFuture<List<T>> future = new CompletableFuture<>();
        ApiFuture<QuerySnapshot> apiFuture = getDb().collection(collectionName).get();
        apiFuture.addListener(() -> {
            try {
                QuerySnapshot snapshot = apiFuture.get();
                List<T> items = new ArrayList<>();
                for (DocumentSnapshot doc : snapshot.getDocuments()) {
                    T item = doc.toObject(clazz);
                    if (item != null) {
                        idSetter.setId(item, doc.getId());
                        items.add(item);
                    }
                }
                log.info("Fetched {} records from Firestore collection: {}", items.size(), collectionName);
                future.complete(items);
            } catch (Exception e) {
                log.error("Failed to fetch Firestore collection: {}", collectionName, e);
                future.completeExceptionally(e);
            }
        }, Runnable::run);

        return future;
    }

    private CompletableFuture<Void> toCompletableFuture(ApiFuture<?> apiFuture) {
        CompletableFuture<Void> future = new CompletableFuture<>();
        apiFuture.addListener(() -> {
            try {
                apiFuture.get();
                log.info("Firestore write completed successfully.");
                future.complete(null);
            } catch (Exception e) {
                log.error("Firestore write failed.", e);
                future.completeExceptionally(e);
            }
        }, Runnable::run);
        return future;
    }

    private Firestore getDb() {
        return FirestoreClient.getFirestore();
    }

    @FunctionalInterface
    private interface IdSetter<T> {
        void setId(T item, String id);
    }
}
