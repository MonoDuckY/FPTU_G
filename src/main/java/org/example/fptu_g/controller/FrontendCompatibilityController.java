package org.example.fptu_g.controller;

import org.example.fptu_g.model.CampusLife;
import org.example.fptu_g.model.News;
import org.example.fptu_g.model.Program;
import org.example.fptu_g.service.FirebaseDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api")
public class FrontendCompatibilityController {

    private final FirebaseDataService firebaseDataService;

    public FrontendCompatibilityController(FirebaseDataService firebaseDataService) {
        this.firebaseDataService = firebaseDataService;
    }

    @GetMapping("/programs")
    public CompletableFuture<ResponseEntity<List<Program>>> getPrograms() {
        return firebaseDataService.getAllPrograms()
                .thenApply(ResponseEntity::ok);
    }

    @GetMapping("/news")
    public CompletableFuture<ResponseEntity<List<News>>> getNews() {
        return firebaseDataService.getAllNews()
                .thenApply(ResponseEntity::ok);
    }

    @GetMapping("/campus-life")
    public CompletableFuture<ResponseEntity<List<CampusLife>>> getCampusLife() {
        return firebaseDataService.getAllCampusLife()
                .thenApply(ResponseEntity::ok);
    }
}
