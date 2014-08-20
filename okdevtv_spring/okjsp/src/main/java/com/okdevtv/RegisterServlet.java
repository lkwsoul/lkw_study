package com.okdevtv;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class RegisterServlet
 */
public class RegisterServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;

  /**
   * @see HttpServlet#HttpServlet()
   */
  public RegisterServlet() {
    super();
    // TODO Auto-generated constructor stub
  }

  /**
   * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
   *      response)
   */
  protected void doPost(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
    User user = new User();
    user.setId(request.getParameter("id"));
    user.setPassword(request.getParameter("password"));
    user.setConfirm_password(request.getParameter("confirm_password"));
    // check password and confirm_password
    if(!user.getPassword().equals(user.getConfirm_password())){
      request.setAttribute("msg", "패스워드가 다릅니다.");
      request.getRequestDispatcher("register.jsp").forward(request, response);
      return;
    }
    // check id duplication
    // save
    UserDao.save(user);
    // to finish page
    //request.getRequestDispatcher("register.jsp").forward(request, response);
    // 리로드시 재처리를 방지하기 위함(즉, request, response를 전달하지 않고 처리함)
    response.sendRedirect("registerFinish.jsp");
  }

}
