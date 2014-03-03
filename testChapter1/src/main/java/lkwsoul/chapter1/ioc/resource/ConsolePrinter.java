package lkwsoul.chapter1.ioc.resource;

/**
 * Consol에 출력하는 클라스
 * @author lkwsoul
 *
 */
public class ConsolePrinter implements Printer {

  @Override
  public void print(String message) {
    System.out.println(message);
  }

}
