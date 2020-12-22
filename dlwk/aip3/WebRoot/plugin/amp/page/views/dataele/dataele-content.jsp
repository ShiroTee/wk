<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div id="container-fluid" class="container-fluid  graph-content">
	<div class="row">
		<div id="searchDiv" Style="height:35px;" class="col-md-12">
				<div class="row">
			<div class="col-md-6 col-md-offset-3">
				<div class="input-group">
					<i class="ace-icon fa fa-search blue" style="font-size: 16px; display: inline-block; position: absolute; z-index: 10; margin-top: 10px; left: 10px;"></i>
					<input id="searchText_dataele" type="text" class="form-control" style="padding-left: 30px;" placeholder="请输入数据元关键字..."> 
					<span class="input-group-btn">
						<button id="searchBu_dataele" class="btn btn-info btn-sm" type="button">数据元搜搜</button>
					</span>
				</div>
			</div>
			<div class="col-md-2">
				
			</div>
		</div>
		</div>
		<div id="orgMain"  class="col-md-12" style="margin-bottom:30px">
		</div>



<!-- 		<div class="ace-settings-container" id="ace-settings-container">
			<div class="btn btn-app btn-xs btn-inverse ace-settings-btn"
				id="ace-settings-btn">
				<i class="icon-only ace-icon fa fa-align-justify"></i>
			</div>

			<div class="ace-settings-box clearfix" style="border: 0 solid #847F79;" id="ace-settings-box">
				<div class="pull-left width-50" id="leftslider">
				
				</div>
				/.pull-left

				<div class="pull-left width-50" id="rightslider">
				
				</div>
				/.pull-left
			</div>
			/.ace-settings-box
		</div> -->

	</div>
</div>
<script src="${ctx}/resource/echarts-3.1.10/echarts.min.js"></script>
<script type="text/javascript" src="${ctx}/plugin/amp/page/views/dataele/js/dataele.js"></script>
