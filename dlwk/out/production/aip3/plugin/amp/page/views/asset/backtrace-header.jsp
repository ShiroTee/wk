<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="container-fluid">
	<!-- 顶部 标题 -->
	<div class="row">
		<div class="col-md-12">
			<div class="row title-banner">
				<div class="title-icon-box">
					<img style="width:336px;height:111px" class="title-icon" alt="总体视角" src="${ctx}/plugin/amp/page/common/images/sjicon_zyhssj.png"></img>
				</div>
				<div class="title-box">
					<div class="titl-text-box title-small">
						<div class="title-ps">
							<%-- <span class="title-p-text">【${asset.name}】资源回溯</span> --%>
							<span class="title-p-text">信息资源逆向展示</span>
						</div>
						<div class="caozuoshuoming"></div>
						<div style="display: none;" class="caozuoshuoming-div">
							<p>操作说明：</br>
1、点击信息资源节点，可以查看信息资源详情。</br>
2、双击信息资源节点，可以展开信息资源详情。</br>
3、点击业务事项节点，可以展开业务事项关联的处室（或科室），可以查看业务事项详情。</br>
4、点击处室（或科室），可以展开处室（或科室）关联的委办局，可以查看处室（或科室）详情。</br>
5、点击委办局节点，可以查看委办局详情。</p>
						</div>
				    </div>
				    <div class="title-line">
				    	<div class="title-line-left"></div>
				    	<div class="title-line-middle"></div>
				    	<div class="title-line-right"></div>
				    </div>
					<div class="titl-text-box title-des-box">
						<span class="title-text-descript">
							资源回溯是通过信息资源逆向查看其关联的业务事项和组织机构，图形中心点为信息资产，回溯路径：信息资产->业务事项->组织机构（处室）->组织机构（委办局）
						</span>
				   </div>
			   </div>
		   </div>
	   </div>
	</div>
	
	<!-- 返回按钮 -->
	<a class="back-bu" style="display: none;" href="<c:choose>
		<c:when test="${type eq  1}">${ctx }/mdp/amp/cvpOrgViewHandler/index2</c:when>
		<c:when test="${type eq  2}">${ctx }/mdp/amp/cvpAssetHandler/index</c:when>
		<c:when test="${type eq  3}">${ctx }/mdp/amp/themeHandler/index</c:when>
		<c:when test="${type eq  4}">${ctx }/mdp/amp/cvpAssetCategoryHandler/index</c:when>
		<c:when test="${type eq  5}">${ctx }/mdp/amp/cvpOrgViewHandler/index2</c:when>
		<c:otherwise>#</c:otherwise>
	</c:choose>">
		<i class="fa fa-reply-all" aria-hidden="true"></i>返回上页
	</a>
</div>
<!-- 顶部 标题 结束  -->