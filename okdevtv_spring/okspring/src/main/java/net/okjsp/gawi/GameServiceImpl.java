package net.okjsp.gawi;

import org.springframework.stereotype.Service;

//서비스로 지정한 구현클라스가 Warired 처리가 됩니다.
//동시 선언하게 되면 Injection of autowired dependencies failed; nested exception 발생함.
@Service
public class GameServiceImpl implements GameService {

  public Play play(Game game) {
    Play play = new Play();
    
    game.setComputerChoice(play.getComputerChoice());
    game.setJudgement(play.judge(game.getChoice(), game.getComputerChoice()));
    play.save(game.getChoice(), game.getComputerChoice(), game.getJudgement());
    return play;
  }

}