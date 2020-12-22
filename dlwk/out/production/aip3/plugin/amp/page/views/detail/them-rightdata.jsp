<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<style>
#resGroup_table tr th{
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
}
#resGroup_table tr td{
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
}
</style>
<div class="widget-box">
	<div class="widget-header widget-header-flat">
		<h4 class="widget-title">元数据组成</h4>
	</div>

	<div class="widget-body2">
		<div class="widget-main">
			<div class="row" >
				<div class="col-xs-12">
					<div class="input-group input-group-sm">
						<span class="input-group-addon">数据元名称:</span> <input
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
							<table id="resGroup_table"
								class="table table-striped table-bordered table-hover" style="width:100%">
								<thead>
									<tr>
										<th field="ele_nm">数据元名称</th>
										<th field="py_cd" style="max-width: 170px">拼音标识</th>
										<th field="data_typ" style="max-width: 190px">数据类型</th>
										<th field="remark" style="max-width: 190px">备注</th>
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
