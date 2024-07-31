package com.example.acme.identity;

import java.util.Map;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.mockOidcLogin;
import org.springframework.test.web.reactive.server.WebTestClient;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWebTestClient
class WhoAmIControllerTests {

	@Autowired
	WebTestClient webTestClient;

    @Test
    void shouldIncludeUserAttributesForToken() {

        webTestClient
                .mutateWith(mockOidcLogin().idToken(token -> token.claim("name", "Mock User")
                        .claim("sub", "test-user")))
                .get()
                .uri("/whoami")
                .exchange()
                .expectBody()
                .jsonPath("$.userId").isEqualTo("test-user")
                .jsonPath("$.userName").isEqualTo("Mock User");
    }

    @Test
    void shouldReturnEmptyBodyWhenNoToken() {
        final WebTestClient.ResponseSpec responseSpec = webTestClient
                .get()
                .uri("/whoami")
                .exchange();

        assertThat(responseSpec.returnResult(Map.class).getResponseBody().next().block()).isEmpty();
    }

}
