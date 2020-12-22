<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="container-fluid">
	<!-- 顶部 标题 -->
	<div class="row" style="text-align:center">
		<div class="col-md-12">
			<div class="title-banner">
				<div class="title-icon-box">
					<img class="title-icon" alt="总体视角" src="${ctx}/plugin/amp/page/common/images/zsj_icon.png"></img>
				</div>
				<div class="title-box">
					<div class="titl-text-box title-small">
						<div class="title-ps">
							<span class="title-p-text">展示各视角概要信息</span>
							<span class="title-p-text">
								总体把握全域内的信息资产情况。
							</span>
						</div>
						<div class="caozuoshuoming"></div>
						<div style="display: none;" class="caozuoshuoming-div">
							<p>操作说明：</br>
							1、点击屏幕中间左右两侧的图形可以进行图形切换。</br>
							2、点击屏幕下方的图标可以进行图形切换。</br>
							3、双击屏幕中间的图形可以进入到对应的视角主图形。</br>
							4、选择屏幕上方的信息分类，输入关键字，点击“资产搜搜”可以搜索相关的信息资产。</p>
						</div>
				    </div>
				    <div class="title-line">
				    	<div class="title-line-left"></div>
				    	<div class="title-line-middle"></div>
				    	<div class="title-line-right"></div>
				    </div>
				    <div class="titl-text-box title-des-box">
				    	<%@include file="searchBox.jsp" %>
				    </div>
<!-- 					<div class="titl-text-box title-des-box"> -->
<!-- 						<span class="title-text-descript"> -->
<!-- 							展示部门资源分布情况，双击各视角进入对应视角。 -->
<!-- 						</span> -->
<!-- 				   </div> -->
			   </div>
		   </div>
	   </div>
	</div>
</div>
<!-- 顶部 标题 结束  -->