package com.example.acme.assist;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.HashMap;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ai/admin")
public class FitAssistAdminController {

    private final VectorStore vectorStore;
    private final IndexService indexService;

    public FitAssistAdminController(VectorStore vectorStore, IndexService indexService) {
        this.vectorStore = vectorStore;
        this.indexService = indexService;
    }

    @PostMapping("/documents")
    public ResponseEntity<Void> index(@RequestBody List<Document> request) {
        this.vectorStore.add(request);
        this.indexService.markIndexed(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/products-to-index")
    public ResponseEntity<List<String>> findProductsToIndex() {
        return ResponseEntity.ok(this.indexService.findProductsToIndex());
    }

    @PostMapping("/load-vector-json")
    public ResponseEntity<Void> loadVectorJson(@Value("classpath:/vector_store_dimension_1536.json") Resource indexedDocuments) {
        final HashMap<String, Document> documentHashMap = load(indexedDocuments);
        vectorStore.add(documentHashMap.values().stream().toList());
        return ResponseEntity.ok().build();
    }

    private HashMap<String, Document> load(Resource resource) {
        TypeReference<HashMap<String, Document>> typeRef = new TypeReference<>() {
        };
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(resource.getInputStream(), typeRef);
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }
}
