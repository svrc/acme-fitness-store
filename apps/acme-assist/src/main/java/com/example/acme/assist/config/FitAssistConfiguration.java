package com.example.acme.assist.config;

import com.example.acme.assist.vectorstore.LazyCalculateSimpleVectorStore;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.DefaultChatClientBuilder;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.vectorstore.PgVectorStore;
import org.springframework.ai.vectorstore.SimpleVectorStore;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class FitAssistConfiguration {

    @Value("classpath:/vector_store.json")
    private Resource vectorDbResource;

    @Bean
    @ConditionalOnProperty(value="vectorstore", havingValue = "simple", matchIfMissing = false)
    public SimpleVectorStore simpleVectorStore(EmbeddingModel embeddingModel) {
        SimpleVectorStore simpleVectorStore = new LazyCalculateSimpleVectorStore(embeddingModel);
        simpleVectorStore.load(vectorDbResource);
        return simpleVectorStore;
    }

    @Bean
    public ChatClient chatClient(OpenAiChatModel openAiChatModel){
        DefaultChatClientBuilder chatClientBuilder = new DefaultChatClientBuilder(openAiChatModel);

        return chatClientBuilder.build();
    }

    @Bean
    @ConditionalOnProperty(value = "vectorstore", havingValue = "postgres")
    public VectorStore postgresVectorStore(JdbcTemplate jcbcTemplate, EmbeddingModel embeddingModel) {
         return new PgVectorStore( jcbcTemplate, embeddingModel,
            4096,
            PgVectorStore.PgDistanceType.COSINE_DISTANCE,
            false,
            PgVectorStore.PgIndexType.NONE, false);
    }
 
    
}
