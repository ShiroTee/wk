
//上一次点击的节点信息
var lastSelectNode,selectedColor='#FF8040';
var selectWidget;
$(function() {
	
	//设置最低高度以及大屏幕自动扩展高度
	var gh=$("#orgChart").height();
	var bh=$(document).height();
	if((bh-140)>gh)
	{
		gh=bh-160;
		$("#orgChart").animate({height:gh},500);
	}
	gheight=gh;	
	gwidth=$("#orgChart").width()+35;
	//初始图形 
	initSvg();
	//获取初始化数据
	qryOrgHandler();
	
	$(".popover").delegate(".close-bu","click",hideHandler);
	$(".popover").delegate(".org-link","click",onOrgTipLink);
	$("svg").on("click",hideHandler);
	
	//全屏
	setOrgChartFull();
});

/**
 * 图形事件操作
 * 
 */
var timeId;
// 点击的话，隐藏或者显示子节点
function nodeClick(d) {
	clearTimeout(timeId);
	timeId = setTimeout(function() {
		if(d.qryed==true)
		{
			if (d.depth != 0) {
				toggleChildren(d);
				updateSvg(d);
			}
			centerNode(d);
		}
		else
		{
		   onClick(d);	
		}	
		d.qryed=true;//表示已经查询过，不需要二次查询
	}, 300);
}

// 双击显示详情
function nodedblClick(d) {
	if (d.root) {
		return;
	}
	clearTimeout(timeId);
	if(selectWidget) $.widget.hide(selectWidget);
	if (d.type == "ownOrg") {
		url = ampPreUrl+"/orgViewHandler/qryTypeOwnOrg";
		data = {
			parentOrgId : rootOrgId,
			orgType : d.nodeId
		};
		selectWidget="#orgOffice-widget";
		qryOffice(d.nicenm,data,url);
	} else if (d.type == "office") {
		$("#tip").hide();
		url = ampPreUrl+"/orgViewHandler/qryOrgOwnOffice";
		data = {
			parentOrgId : d.nodeId
		};
		selectWidget="#orgOffice-widget";
		qryOffice(d.nicenm,data);
	} else if (d.type == "busiItem") {
		url = ampPreUrl+"/orgViewHandler/qryOrgBusiItem";
		data = {
			orgId : d.nodeId
		};
		selectWidget="#serverBusi-widget";
		var fields ={id : "id",no : "busi_no", name :"name"};
		loadServerbusi("",d.nicenm,url,data,fields);
	} else if (d.type == "busiInfo") {
		url = ampPreUrl+"/orgViewHandler/qryBusiItemInfo";
		data = {
			busiId : d.nodeId
		};
		selectWidget="#resourceInfo";
		resDataHandler(d.nicenm,d.nodeId,5);
		qryResInfoHandler();
	} else if(d.type="needRes"){
		selectWidget="#them-res";
		loadAll(d.nodeId,d.nicenm);
	}
	if(selectWidget) $.widget.max(selectWidget);
}
function onClick(d) {
	if(selectWidget) $.widget.hide(selectWidget);
	if (d.update) {
		if (d.type == "ownOrg") {
			url = ampPreUrl+"/orgViewHandler/qryTypeOwnOrg";
			data = {
				parentOrgId : rootOrgId,
				orgType : d.nodeId
			};
			selectWidget="#orgOffice-widget";
			qryOffice(d.nicenm,data,url);
		} else if (d.type == "office") {
			$("#tip").hide();
			url = ampPreUrl+"/orgViewHandler/qryOrgOwnOffice";
			data = {
				parentOrgId : d.nodeId
			};
			selectWidget="#orgOffice-widget";
			qryOffice(d.nicenm,data);
		} else if (d.type == "busiItem") {
			url = ampPreUrl+"/orgViewHandler/qryOrgBusiItem";
			data = {
				orgId : d.nodeId
			};
			selectWidget="#serverBusi-widget";
			var fields ={id : "id",no : "busi_no", name :"name"};
			loadServerbusi("",d.nicenm,url,data,fields);
		} else if (d.type == "busiInfo") {
			url = ampPreUrl+"/orgViewHandler/qryBusiItemInfo";
			data = {
				busiId : d.nodeId
			};
			selectWidget="#resourceInfo";
			resDataHandler(d.nicenm,d.nodeId,5);
			qryResInfoHandler();
		} else if(d.type="needRes"){
			selectWidget="#them-res";
			loadAll(d.nodeId,d.nicenm);
		}
		
	} else {
		
		var data = {};
		var children = [];
		var url;			
		if (d.type == "ownOrg") {
			url = ampPreUrl+"/orgViewHandler/qryTypeOwnOrg";
			data = {
				parentOrgId : rootOrgId,
				orgType : d.nodeId
			};
			selectWidget="#orgOffice-widget";
			qryOffice(d.nicenm,data,url);
		} else if (d.type == "office") {
			url = ampPreUrl+"/orgViewHandler/qryOrgOwnOffice";
			data = {
				parentOrgId : d.nodeId
			};
			selectWidget="#orgOffice-widget";
			qryOffice(d.nicenm,data);
		} else if (d.type == "busiItem") {
			url = ampPreUrl+"/orgViewHandler/qryOrgBusiItem";
			data = {
				orgId : d.nodeId
			};
			selectWidget="#serverBusi-widget";
			var fields ={id : "id",no : "busi_no", name :"name"};
			loadServerbusi("",d.nicenm,url,data,fields);
		} else if (d.type == "busiInfo") {
			url = ampPreUrl+"/orgViewHandler/qryBusiItemInfo";
			data = {
				busiId : d.nodeId
			};	
			selectWidget="#resourceInfo";
			resDataHandler(d.nicenm,d.nodeId,5);
			qryResInfoHandler();
		} else if(d.type="needRes"){
			selectWidget="#them-res";
			loadAll(d.nodeId,d.nicenm);
		}
	
		$.ajax({
			url : url,
			cache : false,
			dataType : "json",
			type : "post",
			data : data,
			success : function(data) {
				if (data.length > 0) {
					for (var i = 0; i < data.length; i++) {
						var item = data[i];
						if (d.type == "ownOrg") {
							children
									.push({
										name : item.name + "("
												+ item.num + ")",
										nicenm : item.name,
										value : item.num,
										nodeId : item.id,
										type : "office"
									});
						} else if (d.type == "office") {
							children
									.push({
										name : item.name + "("
												+ item.num + ")",
										nicenm : item.name,
										value : item.num,
										nodeId : item.id,
										type : "busiItem"
									});
						} else if (d.type == "busiItem") {
							children
									.push({
										name : item.name + "("
												+ item.num + ")",
										nicenm : item.name,
										value : item.num,
										nodeId : item.id,
										type : "busiInfo"
									});
						} else if (d.type == "busiInfo") {
							children.push({
								name : item.name,
								nicenm : item.name,
								value : item.busicount,
								nodeId : item.id,
								gid : item.dir,
								type : "needRes"
							});
						}
					}
				}
			
				d.children = children;
				d.update = true;
				updateNode(d);
			}
		});
	}
	if(selectWidget) $.widget.show(selectWidget);
}

/**
 * 提示
 * @param {} d
 */
//显示委办局提示
var orgShowTimeOutId=0;
var officeShowTimeOutId=0;
var showTimeDelay=1000;
function showOrgTip(data)
{
	$("#tip").html("");
	orgShowTimeOutId=setTimeout(function(e){
		var html = "";
		var col=Math.ceil(Math.sqrt(data.length));
		if(col>6) col=6;
		html += "<table class='org-tip-table'><tbody>";
		var tr="<tr>";
		for(var i=0;i<data.length;i++){
			var item = data[i];
			if(i!=0 && i%col==0)
			{
				tr+="</tr>";
				html+=tr;
				tr="<tr>";
			}
			tr+="<td>"+item.name+"</td>";
		}
		html+=tr;
		html+="</tr>";
		html += "</tbody></table>";
		$("#tip").html(html);
		setTipPosition();
		$('#tip').fadeIn(500);
		clearTimeout(orgShowTimeOutId);
	},showTimeDelay);
	
}
/**
 * 设置提示的位置
 */
function setTipPosition()
{
	var tw=$("#tip").width();
	var th=$("#tip").height();
	var tleft=$("#tip").css("left");
	tleft=Number(tleft.replace("px",""));
	var top=$("#tip").css("top");
	top=Number(top.replace("px",""));
	var bw=$(document).width();
	var bh=$(document).height();
	if((tleft+tw+100)>bw)
	{
		tleft=bw-tw-160;
		$("#tip").css("left",tleft+"px");
	}
	if((top+th+100)>bh)
	{
		top=bh-th-100;
		$("#tip").css("top",top+"px");
	}
}
//显示科室提示
function showOrgOfficeTip(data,d)
{
	var html = "";
	var item = data; 
	var system = item.system ? item.system : "0";
	var info = item.info ? item.info : "0";
	var element = item.element ? item.element : "0";
	html +="<h3 class='popover-title'>"+d.nicenm+"</h3>";
	html +="<i class='fa fa-remove close-bu' style='cursor: pointer;right:5px;top:8px;position:absolute' ></i>";
	html +="<div class='popover-content'>";
	html +="<p><span class='glyphicon glyphicon-list-alt'></span>&nbsp;<span class='org-link sys' id='sys' onClick='systemInfoHandler(\""+system+"\")' style='border-bottom:#486b8d solid  1px;cursor: pointer;color:#486b8d' >拥有的信息系统数："+system+"</span></p>";
    html +="<p><span class='glyphicon glyphicon-list-alt'></span>&nbsp;<span class='org-link' id='res' onClick='resourceInfoHandler(\""+info+"\")' style=' border-bottom:#486b8d solid  1px;cursor: pointer;color:#486b8d''>拥有的信息资源数："+info+"</span></p>";
    html +="<p><span class='glyphicon glyphicon-list-alt'></span>&nbsp;<span class='org-link' id='da' onClick='elementHandler(\""+element+"\")' style='border-bottom:#486b8d solid  1px;cursor: pointer;color:#486b8d''>拥有的数据元："+element+"</span></p>";
    html +="</div>";
    $("#tip").html(html);
    setTipPosition();
	$('#tip').fadeIn(500);
}
//鼠标进入事件
function nodemouseenter(d,event){	
	//设置tip位置
	$('#tip').css({
		    'top' : (event.pageY+10) + 'px',
		    'left': (event.pageX+10)+ 'px'
    });
    $('#tip').stop();
    $('#tip').empty();
	$('#tip').hide();
	$("#container-fluid #id").val(d.nodeId);
	$("#container-fluid #name").val(d.nicenm);
	var html = "";	
	if(d.type == "ownOrg"){
		if(d.tipData)
		{
		   showOrgTip(d.tipData);	
		}
		else
		{
			var url = ampPreUrl+"/orgViewHandler/qryTypeOwnOrg";
			$.ajax({
				url : url,
				cache : false,
				dataType : "json",
				type : "post",
				data : {parentOrgId : rootOrgId, orgType : d.nodeId},
				success : function(data){
					d.tipData=data;
					showOrgTip(data);
				}
			});
		}
	}			
	else if(d.type == "office"){
		if(d.tipData)
		{
			showOrgOfficeTip(d.tipData,d);
		}
		else
		{
			var url = ampPreUrl+"/orgViewHandler/qryOrgAnalysData";
			$.ajax({
				url : url,
				cache : false,
				async : false,
				dataType : "json",
				type : "post",
				data : {orgId : d.nodeId},
				success : function(data){
					d.tipData=data;
					showOrgOfficeTip(data,d);
				}
			});  
		}
	}
	else if(d.type == "busiItem"){
	    html = "<div class='popover-content' style='width:auto'>"+
	    	   "<p><span style='font-weight: bold;'>组织机构（处室）：</span><span style='font-size:12px'>"+d.nicenm+"</span></p>"+
	           "<p><span style='font-weight: bold;'>关联业务事项数：</span><span style='font-size:12px'>"+d.value+"项</span></p>"+
	           "</div>";
	    $("#tip").html(html);
	    setTipPosition();
		$('#tip').fadeIn('slow');
	}
	else if(d.type == "busiInfo"){
	    html = "<div class='popover-content'>"+
	    	   "<p><span style='font-weight: bold;'>业务事项：</span><span style='font-size:12px'>"+d.nicenm+"</span></p>"+
	           "<p><span style='font-weight: bold;'>关联信息资源：</span><span style='font-size:12px'>"+d.value+"类</span></p>"+
	           "</div>";
	    $("#tip").html(html);
	    setTipPosition();
		$('#tip').fadeIn('slow');
	}
	else if(d.type == "needRes"){
	    html = "<div class='popover-content'>"+
	    	   "<p><span style='font-weight: bold;'>信息资源：</span><span style='font-size:12px'>"+d.nicenm+"</span></p>"+
	           "<p><span style='font-weight: bold;'>业务关联性：</span><span style='font-size:12px'>业务需求资源</span></p>"+
	           "</div>";
	    $("#tip").html(html);
	    setTipPosition();
		$('#tip').fadeIn('slow');
	}
}

//鼠标划出事件
function nodemouseout(d){
	if(d.type=="office") return;
	$('#tip').stop();
	$('#tip').empty();
	$('#tip').hide();
	clearTimeout(orgShowTimeOutId);
	clearTimeout(officeShowTimeOutId);
	/**if(d.type != "office" || d.type=="ownOrg"){
		$('#tip').hide();
		$('#tip').empty();
		clearTimeout(officeShowTimeOutId);
		clearTimeout(orgShowTimeOutId);
	}
	else {
		var timeId2;
		timeId2 = setTimeout(function() {
			clearTimeout(timeId2);
		    $('#tip').hide();
		},2000);
	}**/
}
/**
 * 加载根数据
 */
function qryOrgHandler() {
	var url = ampPreUrl+"/totalViewHandler/qryOrgTypeCount";
	$.ajax({
		url : url,
		cache : false,
		dataType : "json",
		type : "post",
		data : {
			rootOrgId : rootOrgId
		},
		success : function(data) {
			if (data.length > 0) {
				var children=graphData.children;
				for (var i = 0; i < data.length; i++) {
					var item = data[i];
					children.push({
								name : item.orgTypeName + "("
										+ item.orgTypeCount + ")",
								nicenm : item.orgTypeName,
								value : item.orgTypeCount,
								nodeId : item.orgType,
								type : 'ownOrg'
							});
				}
				updateSvg();
			}
		}
	});
}

//关闭弹出框
function hideHandler(){
	$("#tip").hide();
	clearTimeout(officeShowTimeOutId);
	clearTimeout(orgShowTimeOutId);
}
function onOrgTipLink(e)
{
	$(this).parent().parent().parent().hide();
}			

//查找拥有的详情页面
function systemInfoHandler(num){
	if(selectWidget) $.widget.hide(selectWidget);
	if(num == 0){
		   $.app.alert({
				title : "操作提示",
				message : "未找到信息系统详情！"
			});
		   return;
		}
		selectWidget="#sysResource";
		var name =$("#name").val();
		var id = $("#id").val();
		sysDataHandler(name,id);
		qryResSysHandler();
		if(selectWidget) $.widget.max(selectWidget);
}

function resourceInfoHandler(num){
	if(selectWidget) $.widget.hide(selectWidget);
	if(num == 0){
		 $.app.alert({
				title : "操作提示",
				message : "未找到信息资源详情！"
			});
		   return;
	}
	selectWidget="#resourceInfo";
	var name =$("#name").val();
	var id = $("#id").val();
	resDataHandler(name,id);
	qryResInfoHandler();
	if(selectWidget) $.widget.max(selectWidget);	
}

function elementHandler(num){
	if(selectWidget) $.widget.hide(selectWidget);
	if(num == 0){
		$.app.alert({
			title : "操作提示",
			message : "未找到信息系统详情！"
		});
	   return;
	}
	selectWidget="#metadata";
	var name =$("#name").val();
	var id = $("#id").val();
	dataHandler(name,id);
	searchHandler();
	if(selectWidget) $.widget.max(selectWidget);
}