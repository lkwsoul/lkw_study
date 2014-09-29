package com.lkwsoul.stream.test;

import static org.junit.Assert.assertThat;
import static org.hamcrest.CoreMatchers.*;

import java.util.stream.Stream;

import org.junit.Before;
import org.junit.Test;

import com.lkwsoul.stream.StreamMain;

public class StreamMainTest {
  
  StreamMain streamMain;

  @Before
  public void setUp() throws Exception {
    streamMain = new StreamMain();
  }

  @Test
  public void getCountLengthOver() {
    long longReturn = streamMain.getCountLengthOver(10);
    assertThat(longReturn, is(5L));
  }
  
  @Test
  public void getCountLengthOverL() {
    long longReturn = streamMain.getCountLengthOverL(10);
    assertThat(longReturn, is(5L));
  }
  
  @Test
  public void chkCountLengthOver() {
    assertThat(streamMain.getCountLengthOver(10), is(streamMain.getCountLengthOverL(10)));
  }
  
  @Test
  public void createStream() {
    Stream<String> stream = streamMain.createStream();
    assertThat(stream.count(), is(20L));
  }

}
