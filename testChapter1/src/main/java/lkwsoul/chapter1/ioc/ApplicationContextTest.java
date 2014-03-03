package lkwsoul.chapter1.ioc;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.assertThat;
import lkwsoul.chapter1.ioc.bean.AnnotatedHello;
import lkwsoul.chapter1.ioc.config.AnnotatedHelloConfig;
import lkwsoul.chapter1.ioc.resource.Hello;
import lkwsoul.chapter1.ioc.resource.Printer;
import lkwsoul.chapter1.ioc.resource.StringPrinter;

import org.junit.Test;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.config.RuntimeBeanReference;
import org.springframework.beans.factory.support.RootBeanDefinition;
import org.springframework.beans.factory.xml.XmlBeanDefinitionReader;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.GenericApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;
import org.springframework.context.support.StaticApplicationContext;

/**
 * Application Context 테스트를 위한 클라스
 * @author lkwsoul
 */
public class ApplicationContextTest {
  
  @Test
  public void registerBean() {
    StaticApplicationContext ac = new StaticApplicationContext();
    ac.registerSingleton("hello1", Hello.class);
    
    Hello hello1 = ac.getBean("hello1", Hello.class);
    assertThat(hello1, is(notNullValue()) );    
    
    ac.close();
  }
  
  @Test
  public void registerBeanDefine() {
    StaticApplicationContext ac = new StaticApplicationContext();
    ac.registerSingleton("hello1", Hello.class);
    
    Hello hello1 = ac.getBean("hello1", Hello.class);
    
    BeanDefinition helloDef = new RootBeanDefinition(Hello.class);
    //빈의 name 프로퍼티에 들어갈 값을 지정한다.
    // <property name="name" value="Spring"/>과 같은 의미
    helloDef.getPropertyValues().addPropertyValue("name", "Spring");
    //앞에서 지정한 프로퍼티로 "hello2"라는 이름을 가진 빈으로 등록
    //<bean id="hello2"... /> 해당한다.
    ac.registerBeanDefinition("hello2", helloDef);
    
    //위에서 생성한 Bean정보 가져오기
    Hello hello2 = ac.getBean("hello2", Hello.class);
    
    //hello1과 hello2가 같지 않은지 테스트
    assertThat(hello1, is(not(hello2)));
    
    //등록된 bean갯수가 2개인지 체크함
    assertThat(ac.getBeanFactory().getBeanDefinitionCount(), is(2));
    
    ac.close();
    
    //System.out.println( ( is(2).getClass().getName() ) );
  }
  
  @Test
  public void registerWithDependency(){
    
    StaticApplicationContext ac = new StaticApplicationContext();
    ac.registerBeanDefinition("printer", new RootBeanDefinition(StringPrinter.class));
    
    BeanDefinition helloDef = new RootBeanDefinition(Hello.class);
    helloDef.getPropertyValues().addPropertyValue("name", "Spring");
    helloDef.getPropertyValues().addPropertyValue("printer",new RuntimeBeanReference("printer"));
    
    ac.registerBeanDefinition("hello", helloDef);
    Hello hello = ac.getBean("hello", Hello.class);
    
    hello.print();
    
    // toString시 "Hello "+name이므로 "Hello Spring"되는지 확인함.
    assertThat(ac.getBean("printer").toString(), is("Hello Spring"));
    
    ac.close();
  }
  
  private <T> void genericsPrint(T value) {
    if(value==null)
      return;
    
    System.out.println("# Class Name = " + value.getClass().getName() );
    System.out.println(value);
  }
  
  @Test
  public void testGenerics(){
    genericsPrint("테스트입니다.");
    genericsPrint(3000);
    genericsPrint(30.1111);
    genericsPrint(true);
    genericsPrint(null);
  }
  
  @Test
  public void genericApplicationContext(){
    GenericApplicationContext   ac = new GenericApplicationContext();
    XmlBeanDefinitionReader reader = new XmlBeanDefinitionReader(ac);
    //클라스 패스로 부터 XML파일을 로딩합니다.
    reader.loadBeanDefinitions("lkwsoul/chapter1/ioc/config/genericApplicationContext.xml");
    
    //모든 메터정보가 로딩되었으니, Application Context를 초기화합니다.
    ac.refresh();
    
    Hello hello = ac.getBean("hello", Hello.class);
    hello.print();
    
    //toString시 "Hello "+name이므로 "Hello Spring"되는지 확인함.
    assertThat(ac.getBean("printer").toString(), is("Hello Spring"));
  }
  
  @Test
  public void genericXmlApplicationContext(){
    //애플리케이션 컨텍스트 생성과 동시에 XML파일을 읽어오고 초기화까지 수행함.
    GenericXmlApplicationContext ac= new GenericXmlApplicationContext("lkwsoul/chapter1/ioc/config/genericApplicationContext.xml");
    
    //모든 메터정보가 로딩되었으니, Application Context를 초기화합니다.
    //아래부부은 이미 XML loadBeanDefinitions수행하고 refresh까지 했기 때문에 실행할 필요가 없음.
    //ac.refresh();
    
    Hello hello = ac.getBean("hello", Hello.class);
    hello.print();
    
    //toString시 "Hello "+name이므로 "Hello Spring"되는지 확인함.
    assertThat(ac.getBean("printer").toString(), is("Hello Spring"));
    
    ac.close();
  }
  
  @Test
  public void childParentAppliationContext(){
    String basePath = "lkwsoul/chapter1/ioc/config/";
    ApplicationContext acParent = new GenericXmlApplicationContext(basePath + "parentContext.xml");
    
    GenericApplicationContext child = new GenericApplicationContext(acParent);
    XmlBeanDefinitionReader readerChild = new XmlBeanDefinitionReader(child);
    
    readerChild.loadBeanDefinitions(basePath + "childContext.xml");
    
    child.refresh();
    
    Printer printer = child.getBean("printer", Printer.class);
    // null인지 확인합니다.
    assertThat(printer, is(notNullValue()));
    
    Hello hello = child.getBean("hello", Hello.class);
    // null인지 확인합니다.
    assertThat(hello, is(notNullValue()));
    
    hello.print();
    //출력값 확인
    assertThat(printer.toString() , is("Hello Child"));
  }
  
  @Test
  public void simpleBeanScanning() {
    ApplicationContext ctx = new AnnotationConfigApplicationContext("lkwsoul.chapter1.ioc.bean");
    
    // @Component로 애노테이션을 지정했다면 Class명(재일앞은 소문자) 형태로 id가 지정됨.
    //AnnotatedHello hello = ctx.getBean("annotatedHello", AnnotatedHello.class);
    
    // @Component("지정id")로 애노테이션을 지정했다면 "저장id"로 찾을 수 있음.
    AnnotatedHello hello = ctx.getBean("myAnnotatedHello", AnnotatedHello.class);
    
    assertThat(hello, is(notNullValue()));
  }
  
  @Test
  public void simpleConfiguration() {
    ApplicationContext ctx = new AnnotationConfigApplicationContext(AnnotatedHelloConfig.class);
    
    AnnotatedHello hello = ctx.getBean("annotatedHello", AnnotatedHello.class);
    
    assertThat(hello, is(notNullValue()));
    
    //AnnotatedHelloConfig 자체도 하나의 Bean으로 등록됨
    AnnotatedHelloConfig con = ctx.getBean("annotatedHelloConfig", AnnotatedHelloConfig.class);
    
    //다른 Instance인지 검증함.
    //assertThat(con.annotatedHello(), is( not( sameInstance(hello) )) );
    //검증결과 Exception발생
    
    //같은지 검증
    //같은 Instance를 return함.
    assertThat(con.annotatedHello(), is( sameInstance(hello) ));
  }

}
