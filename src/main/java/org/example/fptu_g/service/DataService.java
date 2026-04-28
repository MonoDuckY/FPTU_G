package org.example.fptu_g.service;

import org.example.fptu_g.model.CampusLife;
import org.example.fptu_g.model.News;
import org.example.fptu_g.model.Program;
import org.example.fptu_g.repository.CampusLifeRepository;
import org.example.fptu_g.repository.NewsRepository;
import org.example.fptu_g.repository.ProgramRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataService {

    private final ProgramRepository programRepository;
    private final NewsRepository newsRepository;
    private final CampusLifeRepository campusLifeRepository;

    public DataService(
            ProgramRepository programRepository,
            NewsRepository newsRepository,
            CampusLifeRepository campusLifeRepository
    ) {
        this.programRepository = programRepository;
        this.newsRepository = newsRepository;
        this.campusLifeRepository = campusLifeRepository;
    }

    public List<Program> getAllPrograms() {
        return programRepository.findAll();
    }

    public List<News> getAllNews() {
        return newsRepository.findAll();
    }

    public List<CampusLife> getAllCampusLife() {
        return campusLifeRepository.findAll();
    }

    public Program saveProgram(Program program) {
        return programRepository.save(program);
    }

    public News saveNews(News news) {
        return newsRepository.save(news);
    }

    public CampusLife saveCampusLife(CampusLife campusLife) {
        return campusLifeRepository.save(campusLife);
    }
}
