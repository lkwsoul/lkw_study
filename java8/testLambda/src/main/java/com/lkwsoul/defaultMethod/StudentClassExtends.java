package com.lkwsoul.defaultMethod;

/**
 * 디폴드 메소드와 상속클라스와의 상관관계
 * @author lkwsoul
 *
 */
public class StudentClassExtends extends PersionClass implements Name {

  /* (non-Javadoc)
   * @see com.lkwsoul.defaultMethod.PersionClass#getName()
   */
  @Override
  public String getName() {
    // 디폴드 메소드가 있는 인터페이스보다
    // 상속받는 수퍼클라스가 우선시 됩니다.
    return super.getName();
  }
  
  

}
