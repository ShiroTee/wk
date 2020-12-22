<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%
	String exceptionCode = request.getParameter("exceptionCode");
	String exceptionMsg = request.getParameter("exceptionMsg");
	if (exceptionCode != null && !"".equals(exceptionCode))
	{
		request.setAttribute("exceptionCode", exceptionCode);
	}
	if (exceptionMsg != null && !"".equals(exceptionMsg))
	{
		request.setAttribute("exceptionMsg", exceptionMsg);
	}
	request.setAttribute("ctx",request.getContextPath());
%>

<div class="row">
	<div class="col-xs-12">
		<!-- PAGE CONTENT BEGINS -->

		<div class="error-container">
			<div class="well">
				<h1 class="grey lighter smaller">
					<span class="blue bigger-125"> <i class="icon-random"></i>
						Sorry,您的访问出错啦！
					</span> 
				</h1>

				<hr>
				<h3 class="lighter smaller">
					异常代码:<i
						class="icon-wrench icon-animated-wrench bigger-125"></i> ${exceptionCode} 
				</h3>

				<div class="space"></div>

				<div>
					<h4 class="lighter smaller">错误消息:
						</h4>

					<ul class="list-unstyled spaced inline bigger-110 margin-15">
						<li><i class="icon-hand-right blue"></i> ${exceptionMsg}</li>
					</ul>
				</div>

				<hr>
				<div class="space"></div>

				<div class="center">
				<a href="${ctx}/mdp/login.html" class="btn btn-primary"> <i class="icon-dashboard"></i>
						重新登录
					</a>
				</div>
			</div>
		</div>

		<!-- PAGE CONTENT ENDS -->
	</div>
	<!-- /.col -->
</div>