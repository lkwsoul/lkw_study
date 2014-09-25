package com.lkwsoul.testLambda;

import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;

public class Lambda {

  private static Runnable r;

  public static void main(String[] args) {
    //String first = "test1";
    //String second = "test2";

    // System.out.println(compare(first, second));
    //
    // r = () -> System.out.println("Test");
    //
    // new Thread(r).start();
    //
    // r = () -> {
    // for (int i = 0; i < 10; i++) {
    // System.out.println(first);
    // Thread.yield();
    // }
    // };

    new Thread(r).start();

    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);

    // Step - 1
    // for (int number : numbers) {
    // if (isEven(number)) {
    // int n2 = doubleIt(number);
    // if (isGreaterThan5(n2)) {
    // System.out.println(n2);
    // break;
    // }
    // }
    // }

    // Step - 2
    // List<Integer> l1 = new ArrayList<Integer>();
    // for (int n : numbers) {
    // if (isEven(n))
    // l1.add(n);
    // }
    //
    // List<Integer> l2 = new ArrayList<Integer>();
    // for (int n : l1) {
    // l2.add(doubleIt(n));
    // }
    //
    // List<Integer> l3 = new ArrayList<Integer>();
    // for (int n : l2) {
    // if (isGreaterThan5(n))
    // l3.add(n);
    // }

    // System.out.println(l3.get(0));

    System.out.println(numbers.stream().filter(Lambda::isEven)
        .map(Lambda::doubleIt).filter(Lambda::isGreaterThan5).findFirst());

    // Step -빌려쓰기(loan) 패턴
    // Step 1
    // Resource resource = new Resource();
    // try {
    // resource.operate();
    // } finally {
    // //확실한 자원 해지를 위한 try-catch-finally추가
    // resource.dispose();
    // }

    // Step 2
    withResource(resource -> resource.operate());

  }

  // public static int compare(String first, String second) {
  // return Integer.compare(first.length(), second.length());
  // }

  public static boolean isEven(int number) {
    System.out.println("isEven : " + number);
    return number % 2 == 0;
  }

  public static int doubleIt(int number) {
    System.out.println("doubleIt : " + number);
    return number * 2;
  }

  public static boolean isGreaterThan5(int number) {
    System.out.println("isGreaterThan5 : " + number);
    return number > 5;
  }

  public static void withResource(Consumer<Resource> consumer) {
    Resource resource = new Resource();
    try {
      consumer.accept(resource);
    } finally {
      resource.dispose();
    }
  }

}
