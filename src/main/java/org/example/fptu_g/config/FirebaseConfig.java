package org.example.fptu_g.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirebaseConfig {
    private static final Logger log = LoggerFactory.getLogger(FirebaseConfig.class);

    @Value("${firebase.project-id:}")
    private String projectId;

    @Value("${firebase.service-account-key}")
    private Resource serviceAccountKey;

    @PostConstruct
    public void initializeFirebase() throws IOException {
        if (!FirebaseApp.getApps().isEmpty()) {
            log.info("Firebase already initialized. Skipping init.");
            return;
        }
        if (serviceAccountKey == null || !serviceAccountKey.exists()) {
            log.warn("Firebase service account key is missing: {}", serviceAccountKey);
            return;
        }

        try (InputStream serviceAccountStream = serviceAccountKey.getInputStream()) {
            FirebaseOptions.Builder optionsBuilder = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccountStream));

            if (StringUtils.hasText(projectId)) {
                optionsBuilder.setProjectId(projectId);
            }

            FirebaseOptions options = optionsBuilder.build();

            FirebaseApp.initializeApp(options);
            log.info("Firebase initialized successfully. projectId={}", StringUtils.hasText(projectId) ? projectId : "not-set");
        }
    }
}
