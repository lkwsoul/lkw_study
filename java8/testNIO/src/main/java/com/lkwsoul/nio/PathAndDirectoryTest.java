package com.lkwsoul.nio;

import java.io.IOException;
import java.nio.file.*;
import java.util.Iterator;

/**
 * Created by lkwsoul on 15. 9. 14..
 * ref URL : http://palpit.tistory.com/640
 */
public class PathAndDirectoryTest {

    public static void main(String[] args) {
        PathAndDirectoryTest main = new PathAndDirectoryTest();
//        main.test1();
//        main.test2();
//        main.test3();
        main.test4();
    }

    /**
     * 경로 정의(Path)
     */
    public void test1(){
        Path path = Paths.get("src/main/java/com/lkwsoul/nio/PathAndDirectoryTest.java");

        System.out.println("파일 명: " + path.getFileName());    // 파일명 리턴
        System.out.println("부모 디렉토리 명: " + path.getParent().getFileName()); // 부모 객체의 이름 리턴
        System.out.println("중첩 경로 수: " + path.getNameCount());

        System.out.println("path="+path);
        for (int i = 0; i < path.getNameCount(); i++) {
            System.out.println(path.getName(i));
        }

        System.out.println();
        Iterator<Path> iterator = path.iterator();
        while (iterator.hasNext()) {
            Path tmp = iterator.next();
            System.out.println(tmp.getFileName());
        }
    }

    /**
     * 파일 시스템 정보(FileSystem)
     */
    public void test2(){
        try {
            FileSystem fileSystem = FileSystems.getDefault();

            for (FileStore store : fileSystem.getFileStores()) {
                System.out.println("드라이버명: " + store.name());
                System.out.println("파일시스템: " + store.type());

                System.out.println("전체 공간: " + store.getTotalSpace() + " 바이트");

                System.out.println("사용 중인 공간: " + (store.getTotalSpace() - store.getUnallocatedSpace()) + " 바이트");
                System.out.println("사용 가능한 공간: " + (store.getTotalSpace() - store.getUsableSpace()) + " 바이트");
                System.out.println();
            }

            System.out.println("파일 구분자: " + fileSystem.getSeparator());
            System.out.println();

            for (Path path : fileSystem.getRootDirectories()) {
                System.out.println(path.toString());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 파일 속성 읽기 및 파일, 디렉토리 생성 / 삭제
     */
    public void test3(){
        Path path = Paths.get("src/main/java/com/lkwsoul/nio/PathAndDirectoryTest.java");
        try {
            System.out.println("디렉토리 여부: " + Files.isDirectory(path));
            System.out.println("파일 여부: " + Files.isRegularFile(path));
            System.out.println("마지막 수정 시간: " + Files.getLastModifiedTime(path));
            System.out.println("파일 크기: " + Files.size(path));
            System.out.println("소유자: " + Files.getOwner(path));
            System.out.println("숨김 파일 여부: " + Files.isHidden(path));
            System.out.println("읽기 가능 여부: " + Files.isReadable(path));
            System.out.println("쓰기 가능 여부: " + Files.isWritable(path));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * DirectoryExample, 파일생성 및 디렉토리 파일
     */
    public void test4(){
        try{
            Path path1 = Paths.get("src/main/resources/text");
            Path path2 = Paths.get("src/main/resources/text/java_text.txt");

            if (Files.notExists(path1)) {
                Files.createDirectories(path1);
            }

            if (Files.notExists(path2)) {
                Files.createFile(path2);
            }

            Path path3 = Paths.get("src/main/resources/text");
            DirectoryStream<Path> directoryStream = Files.newDirectoryStream(path3);

            for (Path path : directoryStream) {
                if (Files.isDirectory(path)) {
                    System.out.println("디렉토리: " + path.getFileName());
                } else {
                    System.out.println("파일: " + path.getFileName() + " (크기: " + Files.size(path) + " )");
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
