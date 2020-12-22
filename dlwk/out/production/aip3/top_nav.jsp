<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div class="top">
    <a href="javascript:;" class="totop"><i class="ico i107"></i></a>
    <!--------------------
    // head
    -------------------->
    <div class="head trans">
        <div class="clearfix">
            <!---------- logo ---------->
            <div class="logo">信息资产管理-后台应用V3.0</div>
            <!---------- logo end ---------->
			<ul class="head_right">	
				<li style="color:white;">${user.name }，欢迎你！</li>	
				<li class="user_op_box">
					
					<a class="user" href="javascript:void(0)"></a>
					<ul class="user_op">
						<!-- 新任务通知 -->
						<!-- 有人 -->
						<!-- <li>
							欢迎光临，<span>${user.name }</span>
						</li> -->
						<li>
							<a href="#" id="edit-user-info-btn" userId="${user.userId }">个人中心</a>
						</li>
						<li>
							<a href="javascript:void(0);" id="my-application" onclick="window.open( ctx + '/mdp/admin/application/myTodoList.html?type=myApplication')">我的需求</a>							
						</li>
						<li>
							<a href="#" id="edit-password-btn" userId="${user.userId }">修改密码</a>
						</li>						
						<li>
							<a id="log-out-btn" href="logout.html">退出</a>
						</li>
					</ul>
				</li>
				<li class="login">
					<a class="basket" target="_blank" title="资源车" href="${ctx}/mdp/welcome/application/my_basket.html">
						<span>0</span>
					</a>
				</li>		
			</ul>
			
			<!-- /.ace-nav -->
		</div><!-- /.navbar-header -->
    </div>
    <!--------------------
    // head end
    -------------------->    
</div>