/**
 * 
 */
package com.lkwsoul.defaultMethod;

/**
 * @author lkwsoul
 * 기본적으로 Name, Persion에 getName이 디폴드 메소드로 선언되어 있다면,
 * 컴파일 에러발생함.(어떤 getName이 디폴드 메소드로 사용되어지는지 모호하기 때문.
 */
public class Student implements Name, Persion {
  
  public Student(String name) {
    this.name = name;
  }

  /* (non-Javadoc)
   * @see com.lkwsoul.defaultMethod.Persion#getId()
   */
  @Override
  public int getId() {
    // TODO Auto-generated method stub
    return 0;
  }

  /* (non-Javadoc)
   * @see com.lkwsoul.defaultMethod.Name#getName()
   */
  @Override
  public String getName() {
    // 디폴드 메소드의 모호함을 없애기 위해서
    // 어떤 인터페이스로 부터 받아올지 혹은 재정의합니다.
    //return Name.super.getName();
    //return Persion.super.getName();
    return name;
  }
  
  
  private String name;
  
  /**
   * @param name the name to set
   */
  @Override
  public void setName(String name) {
    this.name = name;
  }

}
