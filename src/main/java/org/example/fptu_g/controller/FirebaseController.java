package org.example.fptu_g.controller;

import org.example.fptu_g.model.CampusLife;
import org.example.fptu_g.model.News;
import org.example.fptu_g.model.Program;
import org.example.fptu_g.service.FirebaseDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/firebase")
public class FirebaseController {

    private final FirebaseDataService firebaseDataService;

    public FirebaseController(FirebaseDataService firebaseDataService) {
        this.firebaseDataService = firebaseDataService;
    }

    @PostMapping("/news")
    public CompletableFuture<ResponseEntity<String>> saveNews(@RequestBody News news) {
        return firebaseDataService.saveNews(news)
                .thenApply(unused -> ResponseEntity.ok("Saved News to Firebase"));
    }

    @GetMapping("/news")
    public CompletableFuture<ResponseEntity<List<News>>> getAllNews() {
        return firebaseDataService.getAllNews()
                .thenApply(ResponseEntity::ok);
    }

    @PostMapping("/programs")
    public CompletableFuture<ResponseEntity<String>> saveProgram(@RequestBody Program program) {
        return firebaseDataService.saveProgram(program)
                .thenApply(unused -> ResponseEntity.ok("Saved Program to Firebase"));
    }

    @GetMapping("/programs")
    public CompletableFuture<ResponseEntity<List<Program>>> getAllPrograms() {
        return firebaseDataService.getAllPrograms()
                .thenApply(ResponseEntity::ok);
    }

    @PostMapping("/campus-life")
    public CompletableFuture<ResponseEntity<String>> saveCampusLife(@RequestBody CampusLife campusLife) {
        return firebaseDataService.saveCampusLife(campusLife)
                .thenApply(unused -> ResponseEntity.ok("Saved CampusLife to Firebase"));
    }

    @GetMapping("/campus-life")
    public CompletableFuture<ResponseEntity<List<CampusLife>>> getAllCampusLife() {
        return firebaseDataService.getAllCampusLife()
                .thenApply(ResponseEntity::ok);
    }
}
