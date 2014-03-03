package lkwsoul.chapter1.ioc.bean;

import lkwsoul.chapter1.ioc.resource.Printer;

import org.springframework.stereotype.Component;

/**
 * Annotation Scan을 허용한 Hello클라스
 * @author Lee Kyung-woo
 *
 */
@Component("myAnnotatedHello")
public class AnnotatedHello {
  
  String name;
  Printer printer;
  
  public String sayHello() {
    return "Hello " + name;
  }
  
  public void print() {
    this.printer.print(sayHello());
  }
  
  public void setName(String name) {
    this.name = name;
  }

  public void setPrinter(Printer printer) {
    this.printer = printer;
  }

}
