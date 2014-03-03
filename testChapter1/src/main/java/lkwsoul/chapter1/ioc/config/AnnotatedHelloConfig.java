package lkwsoul.chapter1.ioc.config;

import lkwsoul.chapter1.ioc.bean.AnnotatedHello;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration 테스트를 위한 클라스
 * @author Lee Kyung-woo
 *
 */
@Configuration
public class AnnotatedHelloConfig {
  
  @Bean
  public AnnotatedHello annotatedHello(){
    return new AnnotatedHello();
  }
}
