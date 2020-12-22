<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div class="widget-box">
	<div class="widget-header widget-header-flat">
		<h4 class="widget-title">信息资源描述</h4>
	</div>

	<div class="widget-body">
		<div class="widget-main">
			<div class="row" >
				<div class="col-xs-8">
					<div class="input-group input-group-sm">
						<span class="input-group-addon"><span
							class="glyphicon glyphicon-th-list"></span> 数据源名称:</span> <input
							id="searchInput" type="text" class="form-control">
						<span class="input-group-btn">
							<button id="searchBtn" class="btn btn-default no-disabled"
								type="button" /> <span
							class="glyphicon  glyphicon-search"></span>
							</button>
						</span>
					</div>
				</div>
			</div>

			<div class="row">

					<div class="col-xs-12">
						<div style="height: 245px; OVERFLOW: auto;">
							<table id="resGroup_table"
								class="table table-striped table-bordered table-hover">
								<thead>
									<tr>
										<th field="ele_nm" style="max-width: 170px">数据源名称</th>
										<th field="py_cd" style="max-width: 170px">拼音标识</th>
										<th field="data_typ" style="max-width: 170px">数据类型</th>
										<th field="remark" style="max-width: 170px">备注</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
					</div>

			</div>
		</div>
	</div>
</div>
