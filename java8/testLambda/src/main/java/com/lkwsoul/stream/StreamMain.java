package com.lkwsoul.stream;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

public class StreamMain {

  /**
   * 특정 길이를 오버하는 텍스트 라인 수 조회하기
   * 
   * @param limitLenth
   *          : 체크할 텍스트 길이
   * @return
   */
  public long getCountLengthOver(int limitLenth) {
    // 파일을 문자열로 읽어온다
    List<String> words = readFile();

    long count = 0;
    for (String w : words) {
      if (w.length() > limitLenth)
        count++;
    }

    return count;
  }

  /**
   * 파일 읽기
   * 
   * @return
   */
  public List<String> readFile() {
    String contents = "";
    try {
      URI uri = this.getClass().getResource("/com/lkwsoul/stream/readme.txt")
          .toURI();
      contents = new String(Files.readAllBytes(Paths.get(uri)),
          StandardCharsets.UTF_8);
    } catch (IOException e) {
      e.printStackTrace();
    } catch (URISyntaxException e) {
      e.printStackTrace();
    }

    List<String> words = Arrays.asList(contents.split(System.lineSeparator()));
    return words;
  }

  /**
   * 특정 길이를 오버하는 텍스트 라인 수 조회하기 - 람다식으로 변경
   * @param limitLenth
   * @return
   */
  public long getCountLengthOverL(int limitLenth) {
    // 파일을 문자열로 읽어온다
    List<String> words = readFile();

    long count = 0;
    //count = words.stream().filter(w -> w.length() > limitLenth).count();
    count = words.parallelStream().filter(w -> w.length() > limitLenth).count();
    return count;
  }

}
