package com.lkwsoul.nio;

import java.nio.file.*;
import java.util.List;

/**
 * Created by lkwsoul on 15. 9. 14..
 * ref URL : http://palpit.tistory.com/640
 */
public class WatchServiceTest extends Thread {

    @Override
    public void run() {
        try{
            // WatchService 생성
            WatchService watchservice = FileSystems.getDefault().newWatchService();
            // Watch로 설정할 path 지정
            Path directory = Paths.get("src/main/resources/text");
            // path에 watchservice 등록함
            directory.register(watchservice, StandardWatchEventKinds.ENTRY_CREATE,StandardWatchEventKinds.ENTRY_DELETE, StandardWatchEventKinds.ENTRY_MODIFY);
            while(true){
                WatchKey watchkey = watchservice.take();
                List<WatchEvent<?>> list = watchkey.pollEvents();
                for(WatchEvent<?> watchEvent : list){
                    WatchEvent.Kind<?> kind = watchEvent.kind();
                    Path path = (Path) watchEvent.context();
                    if (kind == StandardWatchEventKinds.ENTRY_CREATE) {
                        System.out.println("파일 생성됨 -> " + path.getFileName());
                    } else if (kind == StandardWatchEventKinds.ENTRY_DELETE) {
                        System.out.println("파일 삭제됨 -> " + path.getFileName());
                    } else if (kind == StandardWatchEventKinds.ENTRY_MODIFY) {
                        System.out.println("파일 수정됨 -> " + path.getFileName());
                    } else if (kind == StandardWatchEventKinds.OVERFLOW) {
                        System.out.println("파일 OVERFLOW -> " + path.getFileName() );
                    }
                }
                boolean valid = watchkey.reset();

                if (!valid) {
                    break;
                }
            }
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        WatchServiceTest wst = new WatchServiceTest();
        wst.start();
    }
}
