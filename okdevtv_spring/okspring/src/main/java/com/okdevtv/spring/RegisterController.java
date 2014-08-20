package com.okdevtv.spring;

import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.okdevtv.User;
import com.okdevtv.UserDao;

@Controller
public class RegisterController {

  @RequestMapping(value="register.do", method=RequestMethod.GET)
  public String register(Locale locale, Model model){
    return "register";
  }
  
  @RequestMapping(value="register.do", method=RequestMethod.POST)
  public String registerFinish(Locale locale, @ModelAttribute("User") User user, Model model){
    // check password and confirm_password
    if(!user.getPassword().equals(user.getConfirm_password())){
      model.addAttribute("msg", "패스워드가 다릅니다.");
      model.addAttribute("user", user);
      //return "forward:register.do";
      //view중에 register.jsp로 보여주게 됨.
      return "register";
    }
    // check id duplication
    // save
    UserDao.save(user);
    // to finish page
    //request.getRequestDispatcher("register.jsp").forward(request, response);
    // 리로드시 재처리를 방지하기 위함(redirect를 사용하여 처리함)
    //return "registerFinish";
    return "redirect:registerFinish.do";
  }
  
  @RequestMapping(value="registerFinish.do")
  public String registerFinished(Model model) {
    return "registerFinish";
  }
}
