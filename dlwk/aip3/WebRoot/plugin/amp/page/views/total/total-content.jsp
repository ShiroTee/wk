<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div id="container-fluid" class="container-fluid">
<!-- 	<div class="row"> -->
<!-- 		<div id="chartBox" class="col-md-6"> -->
<%-- 			<div id="e_orgChart" class="echart" data-url="${ctx }/mdp/amp/cvpOrgViewHandler/index"></div> --%>
<!-- 		</div> -->
<!-- 		<div class="col-md-6"> -->
<%-- 			<div id="e_busiChart" class="echart" data-url="${ctx }/mdp/amp/cvpServerHandler/index"></div> --%>
<!-- 		</div> -->
<!-- 	</div> -->
<!-- 	<div class="row"> -->
<!-- 		<div class="col-md-6"> -->
<%-- 			<div id="e_assetChart" class="echart" data-url="${ctx }/mdp/amp/cvpAssetHandler/index"></div> --%>
<!-- 		</div> -->
<!-- 		<div class="col-md-6"> -->
<%-- 			<div id="e_themeChart" class="echart" data-url="${ctx }/mdp/amp/themeHandler/index"></div> --%>
<!-- 		</div> -->
<!-- 	</div> -->
    
    <!-- 图形展示区域 -->
    <div id="viewShowBox">
    	<div id="chartBox">
    		<div id="e_orgChart_item" class="flip-item" data-type="org">
    			<div id="e_orgChart" class="echart" data-url="${ctx }/mdp/amp/cvpOrgViewHandler/index2"></div>
    		</div>
    		<div id="e_busiChart_item" class="flip-item"  data-type="service">
    			<div id="e_busiChart" class="echart" data-url="${ctx }/mdp/amp/cvpServerHandler/index"></div>
    		</div>
    		<div id="e_assetChart_item" class="flip-item"   data-type="asset">
    			<div id="e_assetChart" class="echart" data-url="${ctx }/mdp/amp/cvpAssetHandler/index"></div>
    		</div>
    		<div id="e_themeChart_item" class="flip-item"  data-type="theme">
    			<div id="e_themeChart" class="echart" data-url="${ctx }/mdp/amp/themeHandler/index"></div>
    		</div>
    	</div>
    </div>
	<!-- 滚动小图 -->
	<div id="viewHScrollBox">
		<div id="viewHScroll" class="owl-carousel owl-theme">
			<div class="item" data-chart="e_orgChart_item">
	        	<img src="${ctx }/plugin/amp/page/common/images/sjicon_zzjg.png" alt="" />
				<p class="sc-name">组织机构</p>
	        </div>
	        <div class="item"  data-chart="e_busiChart_item">
	        	<img src="${ctx }/plugin/amp/page/common/images/sjicon_fwdx.png" alt="" />
				<p class="sc-name">服务对象</p>
	        </div>
	        <div class="item"  data-chart="e_assetChart_item">
	        	<img src="${ctx }/plugin/amp/page/common/images/sjicon_xxzc.png" alt="" />
				<p class="sc-name">信息资源</p>
	        </div>
	        <div class="item"  data-chart="e_themeChart_item">
	        	<img src="${ctx }/plugin/amp/page/common/images/sjicon_xtsj.png" alt="" />
				<p class="sc-name">协同主题</p>
	        </div>
<!-- 	        <div class="item"  data-chart="e_orgChart_item"> -->
<%-- 	        	<img src="${ctx }/plugin/amp/page/common/images/search/org.png" alt="" /> --%>
<!-- 				<p class="sc-name">视角1</p> -->
<!-- 	        </div> -->
		</div>
	</div>
</div>