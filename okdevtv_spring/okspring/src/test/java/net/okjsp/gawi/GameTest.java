package net.okjsp.gawi;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
public class GameTest {

  @Autowired
  private GameDao dao;

  @Test
  public void testGetGame() {
    String strJudgement = "컴퓨터";

    Game game = dao.getGame(strJudgement);

    // System.out.println(game.getId());
    assertThat(game.getId(), is(0));
  }

}
