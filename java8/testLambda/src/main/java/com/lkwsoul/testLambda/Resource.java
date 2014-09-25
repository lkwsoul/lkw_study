package com.lkwsoul.testLambda;

public class Resource {

  public Resource() {
    System.out.println("Opening resource");
  }

  public void operate() {
    System.out.println("Operating on resource");
  }

  public void dispose() {
    System.out.println("Disposing resource");
  }

}
