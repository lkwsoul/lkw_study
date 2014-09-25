/**
 * 
 */
package com.lkwsoul.defaultMethod;

/**
 * @author lkwsoul
 *
 */
public interface Persion {
  
  int getId();
  
  default String getName(){
    return "Persion's Name";
  }
  
  void setName(String name);
}
