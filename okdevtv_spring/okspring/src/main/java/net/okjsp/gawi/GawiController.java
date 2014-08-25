package net.okjsp.gawi;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    String queryResult = "";
    if(callback!=null){
      queryResult += "(";
    }
    
    Play play = new Play();
    
    //비지니스로직 분리
    GawiService.play(game, play);
    
    Stat stat = play.getStat();
    
    queryResult += "{\"success\": true,";
    queryResult += "\"p1\":{\"name\":\"당신\", \"choice\":\"" + play.items[game.getChoice()] + "\"},";
    queryResult += " \"p2\":{\"name\":\"컴퓨터\", \"choice\":\"" + play.items[game.getComputerChoice()]  + "\"},";
    queryResult += "\"judgement\" : \"" + game.getJudgement()+ "\",";
    queryResult += "\"stat\" : {\"total\":" + stat.getTotal()+ ", ";
    queryResult += "\"win\":" + stat.getWin()+ ", ";
    queryResult += "\"even\":" + stat.getEven()+ ", ";
    queryResult += "\"lose\":" + stat.getLose()+ ", ";
    queryResult += "\"rate\":\"" + stat.getRate()+ "%\"}";
    queryResult += "}";
    
    if(callback!=null){
      queryResult += ")";
    }
    
    logger.debug("queryResult = " + queryResult);
    
    model.addAttribute("queryResult", queryResult);
    
    logger.debug("end queryJSON method!");
    return "queryJSON";
  }

  @RequestMapping(value = "/stat.do", method = RequestMethod.GET)
  public String statJSON(Model model) {
    return "statJSON";
  }
}
