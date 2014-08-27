package net.okjsp.gawi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//서비스로 지정한 구현클라스가 Warired 처리가 됩니다.
//동시 선언하게 되면 Injection of autowired dependencies failed; nested exception 발생함.
@Service
public class GameServiceImpl implements GameService {
  
  @Autowired
  private GameDao gameDao;
  
  public Play play(Game game) {
    Play play = new Play();
    
    game.setComputerChoice(play.getComputerChoice());
    game.setJudgement(play.judge(game.getChoice(), game.getComputerChoice()));
    gameDao.save(game.getChoice(), game.getComputerChoice(), game.getJudgement());
    
    //Save에 있던 로직인데 여기로 이동처리함
    play.loadStat();
    
    return play;
  }

}
