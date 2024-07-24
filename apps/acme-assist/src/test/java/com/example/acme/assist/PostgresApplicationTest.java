package com.example.acme.assist;


import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;


@Testcontainers
@SpringBootTest
@ActiveProfiles({"postgres"})
public class PostgresApplicationTest {

    @Container
    @ServiceConnection
    public static final PostgreSQLContainer postgreSQLContainer =
            new PostgreSQLContainer<>(DockerImageName.parse("pgvector/pgvector:pg16")
            .asCompatibleSubstituteFor("postgres"));

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    void seedsTheInitialVectorStoreData() {
        String sql = "SELECT COUNT(*) FROM vector_store";
        Integer count =  jdbcTemplate.queryForObject(sql, Integer.class);
        assertThat(count).isEqualTo(50);
    }

    @Test
    public void testConnectToDB() {
        assertThat(postgreSQLContainer.isRunning()).isTrue();


    }


}
