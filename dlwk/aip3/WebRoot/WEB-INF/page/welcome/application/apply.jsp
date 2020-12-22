<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<mdp:mdpHeader title="资源申请-信息资产管理平台V3.0" curItem="" />
<link href="${ctx}/page/welcome/application/css/city-picker.css" rel="stylesheet" type="text/css">
<script type="text/javascript"
	src="${ctx}/page/welcome/application/js/cookieUtils.js"></script>
<style>
.tabl th {
	text-align: center;
}

.alter_contactor i {
	width: 20px;
	height: 20px;
}

.res_field_btn:hover {
	text-decoration: none;
	color: #23527c;
}

input[type=checkbox].ace {
	opacity: 0;
	position: absolute;
	z-index: 12;
	width: 18px;
	height: 18px;
	cursor: pointer;
}

input[type=checkbox].ace:checked,input[type=checkbox].ace:focus {
	outline: none !important;
}

input[type=checkbox].ace+.lbl {
	position: relative;
	z-index: 11;
	display: inline-block;
	margin: 0;
	line-height: 20px;
	min-height: 18px;
	min-width: 18px;
	font-weight: normal;
}

input[type=checkbox].ace+.lbl::before {
	font-family: fontAwesome;
	font-weight: normal;
	font-size: 12px;
	color: #32a3ce;
	content: "\a0";
	background-color: #fafafa;
	border: 1px solid #c8c8c8;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	border-radius: 0;
	display: inline-block;
	text-align: center;
	vertical-align: middle;
	height: 16px;
	line-height: 14px;
	min-width: 16px;
	margin-right: 1px;
}

input[type=checkbox].ace:checked+.lbl::before {
	display: inline-block;
	content: '\f00c';
	background-color: #f5f8fc;
	border-color: #adb8c0;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0 -15px 10px -12px
		rgba(0, 0, 0, 0.05), inset 15px 10px -12px rgba(255, 255, 255, 0.1);
}

.title {
	float: left;
	line-height: 44px;
	width: 100px;
}
</style>
<section class="main_page">
	<div class="box mb20">
		<div class="flow_box">
			<div class="flow">
				<div class="clearfix flow_top">
					<ul>
						<!-- green 表示该步骤以完成 -->
						<c:forEach var="p" items="${processState}">
							<li class="flow_li"><c:choose>
									<c:when test="${p.result=='-1'}">
										<span class="com_color">${p.name}</span>
									</c:when>
									<c:otherwise>
										<span class="com_color">${p.name}</span>
									</c:otherwise>
								</c:choose></li>
						</c:forEach>
					</ul>
				</div>
				<div class="flow_bot flow1"></div>
			</div>
		</div>
		<div class="con_tit">
			<span class="con_tit_ico"></span>您选择的资源（共<span class="red">${fn:length(list)}</span>个）
		</div>




		<!---------- 信息资源目录 ---------->
		<div class="res_selected">
			<div class="res_selected_tit">
				<i class="ico i407"></i>信息资源目录（共<span class="red">${fn:length(list)}</span>个）
			</div>
			<div class="res_selected_con">
				<c:forEach var="resObj" items="${list}">
				        <div class="apply_res_content">
						<input type="hidden" value="0" name="restype" />  
					    <input type="hidden" value="${resObj['resourceId']}" name="resid" />
							<!---- row ---->
							<div class="res_mod  res_collapse">
								<span class="res_mod_dot ico i305"></span>
								<div class="res_mod_head">
									<i class="ico i208 res_mod_lab"></i>
									<h3 class="res_mod_tit ell" style="line-height: inherit;">${resObj.resName}</h3>
									<a href="javascript:;" class="res_mod_arr ico i105"></a>
								</div>
								<div class="res_mod_body clearfix">
									<ul>
										<c:forEach var="meta" items="${resObj['list']}">
											<li class="res_field res_field_sel" name="checkedItem" dataid="${ meta.metaInfoId }"><a style="cursor: pointer" class="res_field_btn">${meta.field.fieldName}</a><i></i></li>
										</c:forEach>
									</ul>
								</div>
							</div>
						</div>
				</c:forEach>
			</div>

		</div>

		<c:forEach var="apiObj" items="${apilist}">
			<!---------- API ---------->
			<div class="res_selected">
				<input type="hidden" value="1" name="restype" /> <input type="hidden" value="${apiObj['resourceId']}" name="resid" />
				<div class="res_selected_tit">
					<i class="ico i407"></i>API（共<span class="red">1</span>个）
				</div>
				<div class="res_selected_con">
					<!---- row ---->
					<div class="res_mod res_collapse">
						<span class="res_mod_dot ico i305"></span>
						<div class="res_mod_head">
							<i class="ico i208 res_mod_lab"></i>
							<h3 class="res_mod_tit ell" style="line-height: inherit;">API1</h3>
							<a href="javascript:;" class="res_mod_arr ico i105"></a>
						</div>
						<div class="res_mod_body clearfix">
							<!-- {PARAMETER_ID=248c886e-c5da-4394-b00c-ab258d162a3b, PARAMETER_NAME=fl, PARAMETER_DESC=分类}, {PARAMETER_ID=e0abb72e-3822-4fc4-b1df-f99d01390618, PARAMETER_NAME=ssxz, PARAMETER_DESC=乡镇名称}, {PARAMETER_ID=771439ab-bd3f-4b4d-a449-35a12b7a10b1, PARAMETER_NAME=sl, PARAMETER_DESC=数量}] -->
							<ul>
								<c:forEach var="api" items="${apiObj['list']}">
									<li class="res_field res_field_sel" name="checkedItem" dataid="${ api.PARAMETER_ID }"><a style="cursor: pointer" class="res_field_btn">${api.PARAMETER_DESC }</a><i></i></li>
								</c:forEach>

							</ul>
						</div>
					</div>
				</div>
			</div>
		</c:forEach>
		<!---------- API ---------->
		<div class="con_tit">
			<span class="con_tit_ico"></span>申请说明
		</div>
		<div class="res_con">
			<textarea id="descid" rows="4" style="width: 100%; border: 1px solid #d5d5d5; padding: .5em 1em;"></textarea>
			<script type="text/javascript">
				function checkDesc() {
					var objReg = /.*\S.*/;
					if (!objReg.test($("#descid").val())) {
						$.alert("请填写申请说明");
						$("#descid").focus();
						return false;
					}
					return true;
				}
			</script>
		</div>
		<div class="con_tit">
			<span class="con_tit_ico"></span>联系人信息
			<!-- <a href="javascript:void(0);" style="color: #337ab7; float: right; margin-right: 50px;"
				onclick="newContactor();">新增联系人</a> -->
		</div>
		<div class="res_con">
			<div id="dataExChangeType" class="row m0">
				<div style="float: left; line-height: 28px;">申请人电话：</div>
				<input id="phoneid" type="text" />
				<script type="text/javascript">
					function checkPhone() {
						var objReg = /^\d*\d$/;
						if (!objReg.test($("#phoneid").val())) {
							$.alert("请输入正确的电话号码");
							$("#phoneid").focus();
							return false;
						}
						return true;
					}
				</script>
			</div>
			<!-- <table id="contactorTable" width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl mb10">
				<thead>
					<tr>
						<th width="50px"></th>
						<th>姓名</th>
						<th>电话</th>
						<th>邮箱</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td colspan="5" style="color: red; text-align: center;">请添加联系人</td>
					</tr>
					<tr>
						<td><label class="position-relative"> <input type="checkbox" class="ace"> <span class="lbl"></span>
						</label></td>
						<td>admin</td>
						<td>13111111111</td>
						<td>example@hotmail.com</td>
						<td>
							<div>
								<a class="alter_contactor" href="javascript:void(0);" title="编辑"> <i class="ico i202" aria-hidden="true"></i>
								</a>
							</div>
						</td>
					</tr>
				</tbody>
			</table> -->
		</div>
		<div class="con_tit">
			<span class="con_tit_ico"></span>说说你的其他需求
		</div>
		<div class="res_con">
			<div id="dataExChangeType" class="row m0">
				<div class="title">数据交换方式：</div>
				<ul>
					<li class="res_field res_field_sel" name="dataTypeName" dataid="0"><a style="cursor: pointer" class="res_field_btn">数据服务</a><i></i></li>
					<li class="res_field" name="dataTypeName" dataid="1"><a style="cursor: pointer" class="res_field_btn">文件</a><i></i></li>
				</ul>
			</div>
			<div id="dataUpdateFrequency" class="row m0">
				<div class="title">数据更新频率：</div>
				<ul>
					<li class="res_field res_field_sel" name="dataExchangeRate" dataid="1"><a style="cursor: pointer" class="res_field_btn">每日更新</a><i></i></li>
					<li class="res_field" name="dataExchangeRate" dataid="2"><a style="cursor: pointer" class="res_field_btn">每周更新</a><i></i></li>
					<li class="res_field" name="dataExchangeRate" dataid="3"><a style="cursor: pointer" class="res_field_btn">每月更新</a><i></i></li>
					<li class="res_field" name="dataExchangeRate" dataid="4"><a style="cursor: pointer" class="res_field_btn">每年更新</a><i></i></li>
				</ul>
			</div>
			<!-- <div class="row m0">
				<div class="title">我期望能在：</div>
				<input type="number" min="0" style="border: 1px solid #d5d5d5; padding-left: 1em; margin: 5px; width: 50px; height: 34px; font-size: 14px;">
				<div style="display: inline-block;">天内得到解决</div>
			</div> -->
		</div>
		<!---------- 提交 ---------->
		<div class="tc p10">
			<input style="cursor: pointer" class="submit btn_blue" type="button" onclick="submitApply();" value="提交"> <a
				href="${ctx}/mdp/welcome/application/my_basket.html" class="link1 ml20">返回资源车</a>
		</div>
		<!---------- 以上提交 ---------->
	</div>
</section>
<script>
	$(function() {
		$('.res_selected').delegate('.res_mod_head', 'click', function() {
			$(this).parent().toggleClass('res_collapse');
		}).delegate('.res_field', 'click', function() {
			$(this).toggleClass('res_field_sel');
		})
		$('#dataExChangeType li,#dataUpdateFrequency li').on('click', function() {
			$(this).nextAll().removeClass("res_field_sel");
			$(this).prevAll().removeClass("res_field_sel");
			$(this).toggleClass('res_field_sel');
		})
		$('#contactorTable')
				.delegate(
						'a.alter_contactor',
						'click',
						function() {
							$(this)
									.parents('tr')
									.find('td')
									.each(
											function(i, item) {
												if (i == $(this).parents('tr').find('td').length - 1) {
													$(this)
															.html(
																	'<input type="button" value="确定" class="search_sm_submit search-btn" style="cursor: pointer; line-height: 24px;">');
												} else if (i > 0) {
													var value = $(this).html();
													$(this).html('<input type="text" style="width:100%;" value="' + value + '"/>');
												}
											})
						})
				.delegate(
						'input[type="button"]',
						'click',
						function() {
							if (!validateInput($(this).parents('tr').find('input[type="text"]'))) {
								return;
							}
							$(this)
									.parents('tr')
									.find('td')
									.each(
											function(i, item) {
												if (i == $(this).parents('tr').find('td').length - 1) {
													$(this)
															.html(
																	'<a class="alter_contactor" href="javascript:void(0);" title="编辑"><i class="ico i202" aria-hidden="true"></i></a>	');
												} else if (i > 0) {
													var value = $(this).find('input').val();
													$(this).html(value);
												}
											})
						})
	})
	function validateInput(elList) {
		if (elList.eq(0).val().trim() == '') {
			$.alert("请填写联系人姓名！");
			return false;
		}
		if (elList.eq(1).val().trim() == '') {
			$.alert("请填写联系人电话！");
			return false;
		}
		return true;
	}
	function newContactor() {
		var html = [];
		html.push('<tr>');
		html.push('<td><label class="position-relative"><input type="checkbox" class="ace"><span class="lbl"></span></label></td>');
		html.push('<td><input type="text" style="width:100%;"/></td>');
		html.push('<td><input type="text"  style="width:100%;"/></td>');
		html.push('<td><input type="text"  style="width:100%;"/></td>');
		html.push('<td><input type="button" value="确定" class="search_sm_submit search-btn" style="cursor: pointer; line-height: 24px;"></td>');
		html.push('</tr>');
		$('#contactorTable tbody').append(html.join(''));
	}

	function submitApply() {

		if (!checkDesc()) {
			return;
		}
		if (!checkPhone()) {
			return;
		}

		//reqnum = $(".res_selected").length;
		//resnum =0 ;
		var resList = [];
		$(".apply_res_content").each(function() {
			//apply($(this));
			console.log(1)
			resList.push(setResItems($(this)));
		});
		apply(resList);
	}
	function setResItems(applyObj) {
		var resMap = {};
		var checkedItem = [];
		$(applyObj).find("[name=checkedItem]").each(function(d) {
			if ($(this).hasClass("res_field_sel")) {
				checkedItem.push($(this).attr("dataid"));
			}
		});
		resMap.items = checkedItem;
		resMap.restype = $(applyObj).find("[name=restype]").val();
		resMap.resid = $(applyObj).find("[name=resid]").val();
		//var restype = $(applyObj).find("[name=restype]").val();
		//var resid = $(applyObj).find("[name=resid]").val();
		return resMap;
	}
	function apply(resList) {
		//公共部分
		var datatype = "";
		$("[name=dataTypeName]").each(function(d) {
			if ($(this).hasClass("res_field_sel")) {
				datatype = $(this).attr("dataid");
			}
		});
		var dataExchangeRate = "";
		$("[name=dataExchangeRate]").each(function(d) {
			if ($(this).hasClass("res_field_sel")) {
				dataExchangeRate = $(this).attr("dataid");
			}
		});
		//var resourceId = $("").attr("rid");
		/* console.log(checkedItem);
		console.log(datatype);
		console.log(dataExchangeRate);
		console.log( $("#descid").val());
		console.log( $("#phoneid").val());
		console.log("restype:"+restype);
		console.log(resid);
		console.log("---------------------------------------"); */
		console.log(JSON.stringify(resList));
		//if(true) return false;
		$.ajax({
			url : ctx + '/mdp/admin/applyResourceController/startResourceProcess.json',
			method : "post",
			dataType : "json",
			data : {
				resList : JSON.stringify(resList),
				phone : $("#phoneid").val(),
				dataType : datatype,
				desc : $("#descid").val(),
				//resourceId : resid,
				dataExchangeRate : dataExchangeRate
			},
			success : function(d) {
				if (d.success) {
					var route = mycookie("routeList");
					for(var i=0;i<resList.length;i++){
						var delRouteID = resList[i].resid;
						route = route.replace(','+ delRouteID ,"").replace(delRouteID + ',',"").replace(delRouteID,"");
					}
					mycookie('routeList',route,{expires:30,path:'/'})
					setApplyResourceCount();
					$.message("申请成功!");
					location.href = ctx + '/mdp/admin/application/applySuccess.html';
				} else {

					$.alert(d.msg);
				}

			},
			error : function(data, status, e) {

			}
		});

	}
</script>
<mdp:mdpFooter />



