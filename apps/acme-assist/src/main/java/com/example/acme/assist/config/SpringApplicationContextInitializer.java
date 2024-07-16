package com.example.acme.assist.config;

import io.pivotal.cfenv.core.CfCredentials;
import io.pivotal.cfenv.core.CfEnv;
import io.pivotal.cfenv.core.CfService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;
import org.springframework.core.env.Profiles;
import org.springframework.core.env.PropertySource;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class SpringApplicationContextInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

    private static final Log logger = LogFactory.getLog(SpringApplicationContextInitializer.class);

    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        ConfigurableEnvironment appEnvironment = applicationContext.getEnvironment();
        CfEnv cfEnv = new CfEnv();

        List<CfService> services = cfEnv.findAllServices();
        List<String> serviceNames = services.stream()
                .map(CfService::getName)
                .collect(Collectors.toList());

        logger.info("Found services " + StringUtils.collectionToCommaDelimitedString(serviceNames));


        List<CfService> llmServices = cfEnv.findServicesByTag("llm");
        if (!llmServices.isEmpty()) {
            CfCredentials llmCredentials = cfEnv.findCredentialsByTag("llm");
            
            String openAiUrl = (String) llmCredentials.getMap().get("api_base");
            if (openAiUrl.endsWith("/v1")) 
                openAiUrl = openAiUrl.substring(0, openAiUrl.length() - 3);

            appEnvironment.getSystemProperties().put("vectorstore", "postgres");         
            appEnvironment.getSystemProperties().put("spring.ai.openai.base-url", openAiUrl);   
            appEnvironment.getSystemProperties().put("spring.ai.openai.api-key", llmCredentials.getMap().get("api_key"));
        }

    }
}