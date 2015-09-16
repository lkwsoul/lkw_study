package com.lkwsoul.nio;

import java.io.IOException;
import java.nio.*;
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
//    bean.test4();
    bean.test5();
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

  /**
   * - position : 현재 읽거나 쓰는 위치값이다. 인덱스 값이기 때문에 0부터 시작하며, limit 보다 큰 값을 가질 수 없다. 만약 position과 limit 값이 같아지면 더 이상 데이터를 쓰거나 읽을 수 없다는 뜻이 된다.
   * - limit    : 버퍼에서 읽거나 쓸 수 있는 위치의 한계를 나타낸다. 이 값은 capacity 보다 작거나 같은 값을 가진다. 최초에 버퍼를 만들었을 때는 capacity와 같은 값을 가진다.
   * - capacity : 버퍼의 최대 데이터 개수(메모리 크기)를 나타낸다. 인덱스 값이 아니라 수량임을 주의하자.
   * - mark     : reset() 메소드를 실행했을 때 돌아오는 위치를 지정하는 인덱스로서 mark() 메소드로 지정할 수 있다. 주의할 점은 반드시 position 이하의 값으로 지정해주어야 한다. position이나 limit 의 값이 mark 값보다 작은 경우, mark 값은 자동 제거된다. mark가 없는 상태에서 reset() 메소드를 호출하면 InvalidMarkException이 발생한다.
   *              mark는 position이나 limit이 mark 보다 작은 값으로 조정되면 자동적으로 없어집니다.
   *
   * - reset()  : position을 지정한 mark위치로 이동함
   * - rewind() : position 위치를 0로 이동함
   * - clear()  : limit는 capacity로 지정되고, position은 0으로, mark는 없어짐.(데이터는 삭제되지 않음)
   * - compact(): 현재 position에서 limit 사이의 데이터가 0번 인덱스로 복사되고 현재 position은 복사된 데이터 다음 위치로 이동
   *              호출하는 이유는 읽지 않은 데이터 뒤에 새로운 데이터를 저장하기 위해
   *
   * - put()    : 데이터 저장
   * - get()    : 데이터 읽기
   * - 데이터 저장/읽기에서 상대적(Relative), 절대적(Absolute)으로 구분함
   *   상대적(Relative) : position값 증가
   *   절대적(Absolute) : position값 증가되지 않음.
   *
   * - BufferOverflowException : position이 limit에 도달했을 때 put() 을 호출하면 발생
   * - BufferUnderflowException: position이 limit에 도달했을 때 get() 을 호출하면 발생
   * - InvalidMarkException    : mark가 없는 상태에서 reset() 메소드를 호출하면 발생
   * - ReadOnlyBufferException : 읽기 전용 버퍼에서 put() 또는 compact() 메소드를 호출하면 발생
   *
   * - 크기 연관관계
   *   0 <= mark <= position <= limit <= capacity
   */
  public void test5(){
    System.out.println("[7바이트 크기로 버퍼 생성]");

    ByteBuffer buffer = ByteBuffer.allocateDirect(7);
    printState(buffer);

    buffer.put((byte) 10);
    buffer.put((byte) 11);
    System.out.println("[2바이트 저장후]");
    printState(buffer);

    buffer.put((byte) 12);
    buffer.put((byte) 13);
    buffer.put((byte) 13);
    System.out.println("[3바이트 저장후]");
    printState(buffer);

    buffer.flip();
    System.out.println("[flip 실행후]");
    printState(buffer);

    buffer.get(new byte[3]);
    System.out.println("[3바이트 읽은후]");
    printState(buffer);

    buffer.mark();
    System.out.println("[현재위치 mark 지정함]");

    buffer.get(new byte[2]);
    System.out.println("[2바이트 읽은후]");
    printState(buffer);

    buffer.reset();
    System.out.println("[position을 mark 위치로 지정]");
    printState(buffer);

    buffer.rewind();
    System.out.println("[rewind 실행후]");
    printState(buffer);

    buffer.clear();
    System.out.println("[clear 실행후]");
    printState(buffer);

  }

  public void printState(Buffer buffer) {
    System.out.print("\tposition: " + buffer.position() + ", ");
    System.out.print("\tlimit: " + buffer.limit() + ", ");
    System.out.println("\tcapacity: " + buffer.capacity());
  }

}
