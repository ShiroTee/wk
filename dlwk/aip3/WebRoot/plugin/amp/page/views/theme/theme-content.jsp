<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div id="theme-chart-box" class="container-fluid graph-content ">
	<div class="row" style="margin-left: 10px; margin-right: 20px;">
		<div class="col-lg-2 xu-menu col-md-2 col-sm-2 col-xs-2">
			<i class="ace-icon fa fa-bars bigger-230"></i>
			<div class="widget-box ui-sortable-handle" style="display: none;">
				<div class="widget-body">
					<ul class="nav nav-list" style="top: 0px;">${html}
					</ul>
				</div>
			</div>
		</div>
		<div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
			<div id="theme-mychart-box" class="graph-draw-box" style="width: 100%; height:430px;"></div>
		</div>
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
		<table class="legend-theme-box" style="margin-top:20px;float:right;">
				<tbody>
					<tr>
						<td class="legendColorBox"  style="text-align:rigtht;"><div
								style="border: 1px solid null; padding: 1px">
								<div
									style="width: 4px; height: 0; border: 5px solid #68BC31; overflow: hidden"></div>
							</div></td>
						<td class="legendLabel">需求部门</td>
					</tr>
					<tr>
						<td class="legendColorBox"><div
								style="border: 1px solid null; padding: 1px">
								<div
									style="width: 4px; height: 0; border: 5px solid #2091CF; overflow: hidden"></div>
							</div></td>
						<td class="legendLabel">提供部门</td>
					</tr>
					<tr>
						<td class="legendColorBox"><div
								style="border: 1px solid null; padding: 1px">
								<div
									style="width: 4px; height: 0;border: 5px solid #AF4E96; overflow: hidden"></div>
							</div></td>
						<td class="legendLabel">需求+提供部门</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>