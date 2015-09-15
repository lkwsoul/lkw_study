package com.lkwsoul.nio;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.CharBuffer;
import java.nio.IntBuffer;
import java.nio.channels.FileChannel;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.EnumSet;

/**
 * Created by lkwsoul on 15. 9. 14..
 * ref URL : http://palpit.tistory.com/641
 */
public class BufferTest {

  public static void main(String[] args) {
    BufferTest bean = new BufferTest();
//    bean.test1();
//    bean.test2();
//    bean.test3();
    bean.test4();
  }

  /**
   * 버퍼생성
   * 1. NonDirect Buffer = JVM이 관리하는 힙 메모리 공간을 이용하는 버퍼
   *                     = 버퍼 생성이 빠르다
   *                     = 버퍼크기 작다
   *                     = 입출력성능 낮다
   * 2. Direct Buffer    = 운영체제가 관리하는 메모리 공간을 이용하는 버퍼
   *                     = 버퍼 생성이 느리다
   *                     = 버퍼크기 크다
   *                     = 입출력성능 높다
   */
  public void test1(){
    ByteBuffer directBuffer = ByteBuffer.allocateDirect(800*1024*1024);
    System.out.println("다이렉트 버퍼가 생성되었습니다.");

    ByteBuffer nonDirectBuffer = ByteBuffer.allocate(800*1024*1024);
    System.out.println("넌다이렉트 버퍼가 생성되었습니다.");
  }

  /**
   * NonDirectBuffer와 DirectBuffer 성능테스트
   */
  public void test2(){
    Path from   = Paths.get("src/main/resources/img/1.jpeg");
    Path to1    = Paths.get("src/main/resources/img/to1.jpeg");
    Path to2    = Paths.get("src/main/resources/img/to2.jpeg");

    try {
      long size   = Files.size(from);

      FileChannel fileChannel_from = FileChannel.open(from);
      FileChannel fileChannel_to1  = FileChannel.open(to1, EnumSet.of( StandardOpenOption.CREATE, StandardOpenOption.WRITE ));
      FileChannel fileChannel_to2  = FileChannel.open(to2, EnumSet.of(StandardOpenOption.CREATE, StandardOpenOption.WRITE));

      // Buffer 생성
      ByteBuffer nonDirectBuffer = ByteBuffer.allocate((int) size);
      ByteBuffer directBuffer    = ByteBuffer.allocateDirect((int) size);

      long start, end;

      // 1. NonDirect Buffer 테스트
      start = System.nanoTime();
      for(int i=0; i<100; i++){
        fileChannel_from.read(nonDirectBuffer);
        nonDirectBuffer.flip();
        fileChannel_to1.write(nonDirectBuffer);
        nonDirectBuffer.clear();
      }

      end = System.nanoTime();
      System.out.println("넌다이렉트 : " + (end-start) + "ms");

      // 2. Direct Buffer 테스트

      start = System.nanoTime();
      for(int i=0; i<1000; i++){
        fileChannel_from.read(directBuffer);
        nonDirectBuffer.flip();
        fileChannel_to2.write(directBuffer);
        nonDirectBuffer.clear();
      }

      end = System.nanoTime();
      System.out.println("다이렉트  : " + (end-start) + "ms");

      fileChannel_from.close();
      fileChannel_to1.close();
      fileChannel_to2.close();

    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  /**
   * DirectBuffer, 타입별 버퍼 생성
   */
  public void test3(){
    ByteBuffer byteBuffer = ByteBuffer.allocateDirect(100);
    System.out.println("byte 저장용량 : " + byteBuffer.capacity());

    CharBuffer charBuffer = ByteBuffer.allocateDirect(100).asCharBuffer();
    System.out.println("char 저장용량 : " + charBuffer.capacity());

    IntBuffer  intBuffer  = ByteBuffer.allocateDirect(100).asIntBuffer();
    System.out.println("int  저장옹량 : " + intBuffer.capacity());
  }

  /**
   * byte 해석 순서
   * 1. Big-endian : 앞쪽 바이트 부터 처리하는 방식
   * 2. Little-endian : 뒤쪽 바이트 부터 처리하는 방식
   *
   * 운영체제에 따라 위 두가지 방식이 존재함. JVM자체는 Big-endian 방식으로 처리함
   *
   * 다이렉트 버퍼일 경우 운영체제의 native I/O 를 사용하므로 운영체제의 기본 해석 순서로 JVM의 해석 순서를 맞추는 것이 성능에 도움이 됩니다.
   */
  public void test4(){
    System.out.println("운영체제 : " + System.getProperty("os.name"));
    System.out.println("네이티브의 바이트 해석순서 : " + ByteOrder.nativeOrder());

    //order메소드를 할용하여 naitve I/O를 지정해줌.
    ByteBuffer byteBuffer = ByteBuffer.allocateDirect(100).order(ByteOrder.nativeOrder());
    System.out.println("byte 저장용량 : " + byteBuffer.capacity());

    CharBuffer charBuffer = ByteBuffer.allocateDirect(100).order(ByteOrder.nativeOrder()).asCharBuffer();
    System.out.println("char 저장용량 : " + charBuffer.capacity());

    IntBuffer  intBuffer  = ByteBuffer.allocateDirect(100).order(ByteOrder.nativeOrder()).asIntBuffer();
    System.out.println("int  저장옹량 : " + intBuffer.capacity());
  }

  public void test5(){

  }

}
