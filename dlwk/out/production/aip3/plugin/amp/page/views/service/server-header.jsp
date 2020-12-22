<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div class="container-fluid">
    <!-- 顶部 标题 -->
	<div class="row">
		<div class="col-md-12">
			<div class="row title-banner">
				<div class="title-icon-box">
					<img style="width:336px;height:111px" class="title-icon" alt="服务对象视角" src="${ctx}/plugin/amp/page/common/images/top_icon_fwdx.png"></img>
				</div>
				<div class="title-box">
					<div class="titl-text-box title-small">
						<div class="title-ps">
							<span class="title-p-text">关注服务对象拥有的业务事项</span>
						</div>
						<div class="caozuoshuoming"></div>
						<div style="display: none;" class="caozuoshuoming-div">
							<p>操作说明：</br>
							1、点击服务对象分类，可以展开/收缩服务对象的子分类。</br>
							2、点击服务对象子分类可以展开/收缩服务对象子分类关联的业务事项。</br>
							3、点击业务事项可以查看业务事项关联信息资源、信息系统、业务事项的图形。</br>
							4、双击服务对象分类、子分类可以查看分类关联的业务事项及详情。</br>
							5、双击业务事项可以查看所选业务事项详情。</p>
						</div>
				    </div>
				    <div class="title-line">
				    	<div class="title-line-left"></div>
				    	<div class="title-line-middle"></div>
				    	<div class="title-line-right"></div>
				    </div>
					<div class="titl-text-box title-des-box">
						<span class="title-text-descript">
							以智慧城市服务对象的业务办理事项为维度，描述信息资产情况。管理路径：城市->服务对象分类->服务对象子分类->业务事项。
						</span>
				   </div>
			   </div>
		   </div>
	   </div>
	</div>

<!-- 返回按钮 -->
<a class="back-bu" href="${ctx }/mdp/amp/cvpTotalHandler/index?rtype=service">
	<i class="fa fa-reply-all" aria-hidden="true"></i>总体视角
</a>
</div>
<!-- 顶部 标题 结束  -->