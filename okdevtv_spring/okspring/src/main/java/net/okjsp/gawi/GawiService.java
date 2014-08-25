package net.okjsp.gawi;

public class GawiService {

  public static void play(Game game, Play play) {
    game.setComputerChoice(play.getComputerChoice());
    game.setJudgement(play.judge(game.getChoice(), game.getComputerChoice()));
    play.save(game.getChoice(), game.getComputerChoice(), game.getJudgement());
  }

}
