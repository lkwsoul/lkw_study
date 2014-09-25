package com.lkwsoul.testLambda;

import java.util.Arrays;
import java.util.List;

public class Step1 {

  public static void main(String[] args) {
    // Step1. 로컬변수와 중접되는 변수를 사용할 수 없음
    //Path first = Paths.get("/usr/bin");
    //Comparator<String> comp = (first,second) -> Integer.compare(first.length(), second.length());
    
    // Step2. 람다식 내부에서 this사용
    Step1 step = new Step1();
    step.thisTest();
    
    // Step3.디폴트 메서드(default method)
    // forEach는 디폴트 메서드로써, Iterable 인터페이스 구현할때, 구현하거나,
    // 구현하지 않으면 기본 정의된 동작으로 동작하게 됨. 
    // 디폴트 메서드에 모호함이 발생시, 반드시 모호함을 해결해야 함(컴파일 에러발생됨)
    // 즉, 파라메터 타입, 리턴 타입이 동일한 같은 디폴트 메소드가 존재하는 상황이라면,
    //     해당 메소드에 대한 명확한 모호함을 해결해야 함.
    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);
    numbers.forEach(System.out::println);
  }

  public void thisTest() {
    Runnable runner = () -> {System.out.println(this.toString());};
    runner.run();
  }

  /* (non-Javadoc)
   * @see java.lang.Object#toString()
   */
  @Override
  public String toString() {
    return "Step1의 toString 메소드를 호출하였습니다.";
  }
  
}
