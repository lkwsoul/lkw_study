package net.okjsp.gawi;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class GawiController {

  private static final Logger logger = LoggerFactory
      .getLogger(GawiController.class);
  
  //@Autowired
  @Resource
  GameService gameService;

  @RequestMapping(value = "/gawi.do", method = RequestMethod.GET)
  public String gawi(Model model) {
    return "gawi";
  }

  @RequestMapping(value = "/query.do", method = RequestMethod.POST)
  public String queryJSON(Model model, @RequestParam(value="callback", required=false) String callback, @ModelAttribute("game") Game game) {
  //public String queryJSON(Model model, @RequestParam(value="choice") int choice, @RequestParam(value="callback", required=false) String callback) {
  //public String queryJSON(Model model, @RequestParam("choice") int choice, @RequestParam("callback") String callback) {
    // RequestParam으로 전달시 400 Bad Request 에러발생
    // 확인결과 callback이 무조건 전달되지 않음
    // RequestParam사용시 별도 지정없이 사용시 null전달시 에러가 발생되고 있음
    
    logger.debug("begin queryJSON method!");
    
    //비지니스 로직 분리
    Play play = gameService.play(game);
    
    Stat stat = play.getStat();
    
    model.addAttribute("game", game);
    model.addAttribute("stat", stat);
    
    logger.debug("end queryJSON method!");
    return "queryJSON";
  }

  @RequestMapping(value = "/stat.do", method = RequestMethod.GET)
  public String statJSON(Model model) {
    return "statJSON";
  }
}
