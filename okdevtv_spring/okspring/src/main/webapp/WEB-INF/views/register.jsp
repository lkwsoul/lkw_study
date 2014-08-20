<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Register</title>
<style type="text/css">
.msg {
  color : red;
}
</style>
</head>
<body>
<form name="frmMain" method="post" action="register.do">
		id : <input type="input" id="id" name="id" value="${user.id}"><br>
		pw : <input type="password" id="password" name="password"><br>
		confirm pw : <input type="password" id="confirm_password" name="confirm_password"><br>
		<input type="submit" value="Register"><br>
		<span class="msg">${msg}</span>
	</form>
</body>
</html>