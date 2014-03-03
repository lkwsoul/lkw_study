package lkwsoul.chapter1.ioc.resource;

public class StringPrinter implements Printer {
  
  private StringBuffer sb = new StringBuffer();

  @Override
  public void print(String message) {
    // TODO Auto-generated method stub
    this.sb.append(message);
  }
  
  
  public String toString() {
    return this.sb.toString();
  }

}
