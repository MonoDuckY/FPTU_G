package org.example.fptu_g.controller;

import org.example.fptu_g.model.CampusLife;
import org.example.fptu_g.model.News;
import org.example.fptu_g.model.Program;
import org.example.fptu_g.service.DataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class FrontendCompatibilityController {

    private final DataService dataService;

    public FrontendCompatibilityController(DataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping("/programs")
    public ResponseEntity<List<Program>> getPrograms() {
        return ResponseEntity.ok(dataService.getAllPrograms());
    }

    @GetMapping("/news")
    public ResponseEntity<List<News>> getNews() {
        return ResponseEntity.ok(dataService.getAllNews());
    }

    @GetMapping("/campus-life")
    public ResponseEntity<List<CampusLife>> getCampusLife() {
        return ResponseEntity.ok(dataService.getAllCampusLife());
    }
}
