<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div id="container-fluid" class="container-fluid graph-content">
	<div class="row">
		<div id="chartLegend">
			<span id="bl_title_box"><i class="fa fa-square" aria-hidden="true"></i><label>业务事项【</label><label id="lengName"></label>】关联信息：</span>
			<span id="bl_sys_box" ><i class="fa fa-square" aria-hidden="true"></i><label>信息系统</label><label id="bl_sys" class="legend-value">0</label>个</span>
			<span id="bl_busi_box" class="legend-box"><i class="fa fa-square" aria-hidden="true"></i><label>业务事项</label><label id="bl_busi" class="legend-value">0</label>项</span>
			<span id="bl_asset_box" class="legend-box"><i class="fa fa-square" aria-hidden="true"></i><label>信息资源</label><label id="bl_asset" class="legend-value">0</label>项</span>
		</div>
		<div id="chartBox" class="col-md-12 graph-draw-box">
		</div>
	</div>
</div>