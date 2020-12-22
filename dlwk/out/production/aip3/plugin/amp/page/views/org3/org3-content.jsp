<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div id="container-fluid" class="container-fluid  graph-content">

	<div class="row" id="mychart_org2">
		<div id="chartLegend">
			<div class="col-md-2">
				</br>
				</br>
				</br> <span id="bl_title_box" class="legend-box legend-node"><label>图例:</span></br>
				<span id="bl_title_box" class="legend-box legend-node"><i
					class="fa fa-square" aria-hidden="true" style="color: #C0FFFF"></i><label>城市</span></br>
				<span id="bl_sys_box" class="legend-box legend-node"><i
					class="fa fa-square" aria-hidden="true" style="color: #80FF80"></i><label>组织机构类型</label></span></br>
				<span id="bl_busi_box" class="legend-box legend-node"><i
					class="fa fa-square" aria-hidden="true" style="color: #D0D0FF"></i><label>组织结构(委办局)</span></br>
				<span id="bl_asset_box" class="legend-box legend-node"><i
					class="fa fa-square" aria-hidden="true" style="color: #FDFAAF"></i><label>组织结构(处室)</span></br>
				<span id="bl_asset_box" class="legend-box legend-node"><i
					class="fa fa-square" aria-hidden="true" style="color: #B6DC91"></i><label>业务事项</span></br>
				<span id="bl_asset_box" class="legend-box legend-node"><i
					class="fa fa-square" aria-hidden="true" style="color: #91CBBD"></i><label>业务关联资源</span></br>
				<span id="bl_asset_box" class="legend-box legend-node"><i
					class="fa fa-square" aria-hidden="true" style="color: #FDD5FD"></i><label>业务需求资源</span></br>
				<span id="bl_asset_box" class="legend-box legend-node"><i
					class="fa fa-square" aria-hidden="true" style="color: #D3D0DF"></i><label>业务产出资源</span></br>
				<span id="bl_asset_box" class="legend-box legend-node"><i
					class="fa fa-square" aria-hidden="true" style="color: #FF8040"></i><label>选中节点</span></br>
			</div>

		</div>
		<div id="orgChart" style="height: 430px;" class="col-md-10">
			<div id="fullscreenBu">
				<span id="fullscreenIcon" class="glyphicon glyphicon-fullscreen"></span>
			</div>
		</div>
	</div>
	<input type="hidden" id="id" /> <input type="hidden" id="name" />
	<div id="tip" class="popover org-type-tip"></div>
	
</div>


