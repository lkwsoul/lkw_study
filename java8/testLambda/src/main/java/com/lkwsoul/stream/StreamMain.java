package com.lkwsoul.stream;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

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
    List<String> words = contentToList();

    long count = 0;
    for (String w : words) {
      if (w.length() > limitLenth)
        count++;
    }

    return count;
  }

  /**
   * content를 List로 만들빈다.
   * 
   * @return
   */
  private List<String> contentToList() {
    String contents = "";
    String filePath = "/com/lkwsoul/stream/readme.txt";
    contents = readFile(filePath);

    List<String> words = Arrays.asList(contents.split(System.lineSeparator()));
    return words;
  }

  /**
   * 파일 읽기
   * 
   * @param filePath
   * @return
   */
  private String readFile(String filePath) {
    String contents = "";
    try {
      URI uri = this.getClass().getResource(filePath).toURI();
      contents = new String(Files.readAllBytes(Paths.get(uri)),
          StandardCharsets.UTF_8);
    } catch (IOException e) {
      e.printStackTrace();
    } catch (URISyntaxException e) {
      e.printStackTrace();
    }
    return contents;
  }

  /**
   * 특정 길이를 오버하는 텍스트 라인 수 조회하기 - 람다식으로 변경
   * 
   * @param limitLenth
   * @return
   */
  public long getCountLengthOverL(int limitLenth) {
    // 파일을 문자열로 읽어온다
    List<String> words = contentToList();

    long count = 0;
    // count = words.stream().filter(w -> w.length() > limitLenth).count();
    count = words.parallelStream().filter(w -> w.length() > limitLenth).count();
    return count;
  }

  public Stream<String> createStream() {
    String filePath = "/com/lkwsoul/stream/stream.txt";
    String contents = readFile(filePath);

    // 배열로 Stream 만들기
    Stream<String> words = Stream.of(contents.split(System.lineSeparator()));

    return words;
  }

  public Stream<String> createSteamAlphabet() {
    String filePath = "/com/lkwsoul/stream/alphabet.txt";
    String contents = readFile(filePath);

    // 배열로 Stream 만들기
    Stream<String> words = Stream.of(contents.split(System.lineSeparator()));
    
    Stream<String> upperWords = words.map(String::toUpperCase);
    
    return upperWords;
  }
  
  public Object [] peekCheck() {
    Object [] powers = Stream.iterate(1.0, p -> p *2)
                      .peek(e -> System.out.println("Fetching " + e))
                      .limit(20)
                      .toArray();
    
    return powers;
  }
  
  public String maxAlphabet() {
    String strMax = "";
    Stream<String> words = this.createSteamAlphabet();
    Optional<String> largest = words.max(String::compareToIgnoreCase);
    if(largest.isPresent())
      strMax = largest.get();
    return strMax;
  }
  
  public String minAlphabet() {
    String strMin = "";
    Stream<String> words = this.createSteamAlphabet();
    Optional<String> largest = words.min(String::compareToIgnoreCase);
    if(largest.isPresent())
      strMin = largest.get();
    return strMin;
  }

}
