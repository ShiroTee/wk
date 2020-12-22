<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<link rel="stylesheet" href="${ctx }/plugin/amp/page/views/total/css/searchBox.css" />
<div id="searchBox" class="search-box">
<!-- 	<div class="col-md-12"> -->
<!-- 		<div class="row"> -->
			<div class="labels-box">
				<label class="qry-label qry-label-selected" data-type="all">全部</label>
				<label class="qry-label" data-type="asset">信息资源</label> 
				<label class="qry-label" data-type="appsys">信息系统</label> 
				<label class="qry-label" data-type="dataele">元数据</label> 
				<label class="qry-label" data-type="busi">业务事项</label>
				<label class="qry-label" data-type="org">委办局</label>
			</div>
			<div class="text-box">
				<i class="ace-icon fa fa-search blue search-icon"></i>
				<input id="searchText"  type="text"  placeholder="请输入关键字..."> 
				<button id="searchBu" class="btn btn-info btn-sm" type="button">资产搜搜</button>
			</div>
<!-- 		</div> -->
<!-- 	</div> -->
</div>
<script src="${ctx}/plugin/amp/page/views/total/js/seachBox.js"></script>