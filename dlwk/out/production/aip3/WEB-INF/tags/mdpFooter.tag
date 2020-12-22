<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
	<div class="foot">
	    <div class="webWidth3 footIn">
	        <table width="100%" style="font-size: 14px;color: rgba(255, 255, 255, 0.5);text-align: left;">
	        	<tr>
	        		<td width="20%">
	        			<img src="${ctx }/resources/images/footer_dcitssvg.svg">
        			</td>
	        		<td width="20%" rowspan="3"></td>
	        		<td width="20%" rowspan="3"></td>
	        		<td width="20%" rowspan="3">
	        			<a target="_blank" href="http://118.190.17.253:8080/">
							<img src="${ctx }/resources/images/footer_knowledge.png">
						</a></td>
	        		<td width="20%" rowspan="3">
	        			<a target="_blank" href="http://118.190.17.220:5080/">
	        				<img src="${ctx }/resources/images/footer_info.png">
	        			</a>
	        		</td>
	        	</tr>
	        	<tr  style="font-size: 14px;color: rgba(255, 255, 255, 1);">
	        		<td style="font-size: 16px;padding-top: 8px;">
	        			城市级信息资产管理平台
        			</td>
	        	</tr>
	        	<tr  style="font-size: 12px;color: rgba(255, 255, 255, 0.55);">
	        		<td>
	        			Copy Right © DCITS
        			</td>
	        	</tr>
	        </table>
	    </div>
	</div>
	<!-- 模态框 -->
	<div class="modal fade" id="myModal" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="panel panel-danger" style="margin-bottom: 0px;">
					<div class="panel-heading">
						<span>资源详情</span><i class="fa fa-times"
							style="float: right; cursor: pointer;" title="关闭窗口"
							data-toggle="modal" data-target="#myModal"></i>
					</div>
					<div class="panel-body"
						style="position: relative; padding: 0px;">
						<i class="icon-spinner icon-spin orange bigger-125"
							style="margin-top: 100px; margin-bottom: 100px; margin-left: 270px;"></i>页面加载中...
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
<%@include file="../page/common/import-js-welcome.jspf"%>
<script type="text/javascript" src="${ctx }/resources/js/mricode.pagination.js"></script>
<script type="text/javascript" src="${ctx }/resources/plugins/backbone/underscore.js"></script>
<script type="text/javascript" src="${ctx }/resources/plugins/backbone/backbone.js"></script>
<script type="text/javascript" src="${ctx }/common/javascript/util.js"></script>
<script type="text/javascript" src="${ctx }/common/javascript/cookieUtils.js"></script>
<script type="text/javascript" src="${ctx }/page/base/js/front-base.js"></script>
</html>
