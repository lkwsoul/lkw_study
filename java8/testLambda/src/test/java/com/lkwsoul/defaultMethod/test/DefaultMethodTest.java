/**
 * 
 */
package com.lkwsoul.defaultMethod.test;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.junit.Before;
import org.junit.Test;

import com.lkwsoul.defaultMethod.Persion;
import com.lkwsoul.defaultMethod.Student;
import com.lkwsoul.defaultMethod.StudentClassExtends;

/**
 * @author lkwsoul
 *
 */
public class DefaultMethodTest {
  
  Student student;
  
  StudentClassExtends studentClassExtends;

  /**
   * @throws java.lang.Exception
   */
  @Before
  public void setUp() throws Exception {
    student = new Student("Persion's Name");
    studentClassExtends = new StudentClassExtends();
  }

  @Test
  public void test() {
    //assertThat(student.getName(), is("Persion's Name"));
    assertThat(student.getName(), is("Persion's Name"));
  }
  
  @Test
  public void testExtends() {
    assertThat(studentClassExtends.getName(), is("PersionClass's Name"));
  }
  
  @Test
  public void testComparator() {
    List<Student> list = Arrays.asList( new Student("Test2")
                                      , new Student("Test1")
                                      );
    Collections.sort(list, Comparator.comparing(Persion::getName));
    //Collections.sort(list, Comparator.comparing(Student::getName));
    
    //정렬된 값 확인
    assertThat(list.get(0).getName(), is("Test1"));
  }

}
