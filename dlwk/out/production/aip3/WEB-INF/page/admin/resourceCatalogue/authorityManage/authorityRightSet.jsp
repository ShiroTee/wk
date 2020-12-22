<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<style>
	#authorityRightSetTable th{
		text-align: left;
    	font-size: 14px;
    	font-weight: normal;
    	padding: 6px;
    	border-right: 1px solid #eff3f8;
    	background: #e5e5e5;
	}
	#authorityRightSetTable td{
		border: 1px solid #eff3f8;
	}
	#authorityRightSetTable a{
		display: block;
	}
	#authorityRightSetTable .icon-double-angle-right:before{
	    content: "\f101";
	}
	#left-table td div,#right-table td div{
		font-size: 14px;
    	text-align: left;
    	padding: 6px;
    	overflow: hidden;
    	white-space: nowrap;
    	text-overflow: ellipsis;
	}
</style>
<div class="row p0_20 pb20">
	<table id="authorityRightSetTable" width="100%" border="0" cellspacing="0" cellpadding="0">
			<thead>
				<tr>
					<th style="background: #e5e5e5;">未添加</th>					
					<th style="text-align: center;background: #e5e5e5;">操作</th>
					<th style="background: #e5e5e5;">已添加</th>
				</tr>
			</thead>
			<tbody>	
				<tr>
					<td>
						<c:choose>
							<c:when test="${type =='catalogue' }">
								<div style="width:405px;height:300px;">
							</c:when>
							<c:when test="${type =='user' }">
								<div style="width:254px;height:300px;">
							</c:when>
						</c:choose>
						<table id="left-table" width="100%" border="0" cellspacing="0" cellpadding="0">
							<thead>
								<tr>
									<th>
									<div >
										<label class="position-relative">
											<input type="checkbox" class="ace">
											<span class="lbl"></span>
										</label>
									</div>
									</th>
									<c:choose>
										<c:when test="${type =='catalogue' }">
											<th><div style="width:200px;">名称</div></th>
											<th><div style="width:145px;">提供方</div></th>
										</c:when>
										<c:when test="${type =='user' }">
											<th><div style="width:65px;">姓名</div></th>
											<th><div style="width:130px;">登录名</div></th>
										</c:when>
									</c:choose>
								</tr>
						</thead>
						<tbody>							
						</tbody>
						</table>
						</div>
					</td>
					<td>
						<div style="width:50px;">
							<a id="toRight" href="javascript:void(0);" title="添加" data-requestId="" >
								<i class="icon-angle-right icon-2x" aria-hidden="true"></i>
							</a>
							<a id="toLeft" href="javascript:void(0);" title="移除" data-requestId="" >
								<i class="icon-angle-left icon-2x" aria-hidden="true"></i>
							</a>
							<a id="allToRight" href="javascript:void(0);" title="全部添加" data-requestId="" >
								<i class="icon-double-angle-right icon-2x" aria-hidden="true"></i>
							</a>
							<a id="allToLeft" href="javascript:void(0);" title="全部移除" data-requestId="" >
								<i class="icon-double-angle-left icon-2x" aria-hidden="true"></i>
							</a>
						</div>
					</td>
					<td>
						<c:choose>
							<c:when test="${type =='catalogue' }">
								<div style="width:405px;height:300px;">
							</c:when>
							<c:when test="${type =='user' }">
								<div style="width:254px;height:300px;">
							</c:when>
						</c:choose>
						<table id="right-table" width="100%" border="0" cellspacing="0" cellpadding="0">
							<thead>
								<tr>
									<th>
									<div >
										<label class="position-relative">
											<input type="checkbox" class="ace">
											<span class="lbl"></span>
										</label>
									</div>
									</th>
									<c:choose>
										<c:when test="${type =='catalogue' }">
											<th><div style="width:200px;">名称</div></th>
											<th><div style="width:145px;">提供方</div></th>
										</c:when>
										<c:when test="${type =='user' }">
											<th><div style="width:65px;">姓名</div></th>
											<th><div style="width:130px;">登录名</div></th>
										</c:when>
									</c:choose>
								</tr>
						</thead>
						<tbody>								
						</tbody>
						</table>
						</div>
					</td>					
				</tr>				
			</tbody>
	</table>
</div>
<div class="modal-footer">
	<button type="button" class="btn btn-primary btn-xs" data-dismiss="modal">保存</button>
	<button type="button" class="btn btn-info btn-xs" data-dismiss="modal">关闭</button>
</div>
<script>
var type="${type }";
//模拟数据
var user = [{id:0,realName:'张三',userName:'zhangsan',isSelected:false},{id:1,realName:'李四',userName:'lisi',isSelected:false},{id:2,realName:'王五',userName:'wangwu',isSelected:true}];
var catalogue = [{id:0,name:'企业被执行信息',offer:'法院',isSelected:false},{id:1,name:'药店、医疗机构违法违规信息',offer:'食药监',isSelected:false},{id:2,name:'住址变动信息',offer:'公安局',isSelected:true}];
$(function(){
	$("#left-table th input[type='checkbox'],#right-table th input[type='checkbox']").click(onMdTableAllCheck);
	$("#toRight").click(function(){ 
		toRight();
	});
	$("#toLeft").click(function(){
		 toLeft();
	});
	$("#allToRight").click(function(){ 
		toRight(true);
	});
	$("#allToLeft").click(function(){ 
		toLeft(true);
	});
	initData();
});
/**
* 表格全选/不选
* @param {} e
*/
function onMdTableAllCheck(e)
{
	var check=$(this).is(":checked");
	$(this).closest('table').find('tr input[type="checkbox"]').prop({"checked":check});
}
function toRight(isAll){
	if(isAll){
		$('#left-table tbody tr').appendTo($("#right-table tbody"));
	}else{
		var selectedDom = [];
		$('#left-table tbody tr td input[type="checkbox"]').each(function(i,item){
			if(item.checked){
				selectedDom.push(item.closest('tr'));
			}
		})
		$("#right-table tbody").append(selectedDom);
	}
}
function toLeft(isAll){
	if(isAll){
		$('#right-table tbody tr').appendTo($("#left-table tbody"));
	}else{
		var selectedDom = [];
		$('#right-table tbody tr td input[type="checkbox"]').each(function(i,item){
			if(item.checked){
				selectedDom.push(item.closest('tr'));
			}
		})
		$("#left-table tbody").append(selectedDom);
	}
}
function initData(){
	var tableRow = [],leftTableRow=[],rightTableRow=[];
	if(type == 'user'){
		for(var i=0;i<user.length;i++){
			tableRow.push('<tr>');
			tableRow.push('<td><div >');
			tableRow.push('<label class="position-relative"><input type="checkbox" class="ace" value="' + user[i].id + '"><span class="lbl"></span></label>');
			tableRow.push('</div></td>');
			tableRow.push('<td><div style="width:80px;" title="' + user[i].realName + '">' + user[i].realName + '</td></div>');
			tableRow.push('<td><div style="width:130px;" title="' + user[i].userName + '">' + user[i].userName + '</td></div>');
			tableRow.push('</tr>');
			if(user[i].isSelected){
				rightTableRow.push(tableRow.join(''));
			}else{
				leftTableRow.push(tableRow.join(''));
			}
			tableRow = [];
		}
	}else{
		for(var i=0;i<catalogue.length;i++){
			tableRow.push('<tr>');
			tableRow.push('<td><div >');
			tableRow.push('<label class="position-relative"><input type="checkbox" class="ace" value="' + catalogue[i].id + '"><span class="lbl"></span></label>');
			tableRow.push('</div></td>');
			tableRow.push('<td><div style="width:200px;" title="' + catalogue[i].name + '">' + catalogue[i].name + '</div></td>');
			tableRow.push('<td><div style="width:160px;" title="' + catalogue[i].offer + '">' + catalogue[i].offer + '</div></td>');
			tableRow.push('</tr>');
			if(catalogue[i].isSelected){
				rightTableRow.push(tableRow.join(''));
			}else{
				leftTableRow.push(tableRow.join(''));
			}
			tableRow = [];
		}
	}
	$('#left-table tbody').append(leftTableRow.join(''));
	$('#right-table tbody').append(rightTableRow.join(''));
}
</script>