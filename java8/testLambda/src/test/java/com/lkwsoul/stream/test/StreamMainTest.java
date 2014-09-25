package com.lkwsoul.stream.test;

import static org.junit.Assert.assertThat;
import static org.hamcrest.CoreMatchers.*;

import org.junit.Before;
import org.junit.Test;

import com.lkwsoul.stream.StreamMain;

public class StreamMainTest {
  
  StreamMain StreamMain;

  @Before
  public void setUp() throws Exception {
    StreamMain = new StreamMain();
  }

  @Test
  public void getCountLengthOver() {
    long longReturn = StreamMain.getCountLengthOver(10);
    assertThat(longReturn, is(5L));
  }
  
  @Test
  public void getCountLengthOverL() {
    long longReturn = StreamMain.getCountLengthOverL(10);
    assertThat(longReturn, is(5L));
  }
  
  @Test
  public void chkCountLengthOver() {
    assertThat(StreamMain.getCountLengthOver(10), is(StreamMain.getCountLengthOverL(10)));
  }

}
