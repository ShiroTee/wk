/**
 * 页面加载完成
 */
$(function(){
	$("#busiTable tbody").delegate("tr","click",onTrClick);
});
/**
 * 加载服务对象分类的业务事项
 * @param id
 * @param name
 */
function loadServerbusi(id,name,qurl,params,fields){
	$(".content-box #busiCode").text("");
	$(".content-box #appsysId").text("");
	$(".content-box #appfunId").text("");
	$(".content-box #busiName").text("");
	$(".content-box #parbusiId").text("");
	$(".content-box #mainBody").text("");
	$(".content-box #mainbodyTyp").text("");
	$(".content-box #busiTyp").text("");
	$(".content-box #busiitemNo").text("");
	$(".content-box #importantname").text("");
	$(".content-box #priority").text("");
	$(".content-box #orgName").text("");
	$(".content-box #scale").text("");
	$(".content-box #complex").text("");
	$(".content-box #busiDesc").text("");	
	$("#serverBusi-widget .widget-title").html("【"+name+"】业务事项详情<span style=\"color:#FDFAAF\">（双击查看）</span>");
	var url = ampPreUrl+"/serverViewHandler/queryBusi";
	var filed={id:"id",no:"no",name:"name"};
	var param={servId:id,orgId:rootOrgId};
	if(qurl) url=qurl;
	if(params) param=params;
	if(fields) filed=fields;
	$.ajax({
		url : url,
		cache : false,
		dataType : "json",
		type : "post",
		data : param,
		success : function(data) {
			var trs="";
			for(var i=0;i<data.length;i++)
			{
				var item=data[i];
				var tr="<tr data-bid='"+item[filed.id]+"'><td>"+item[filed.no]+"</td><td>"+item[filed.name]+"</td></tr>";
				trs+=tr;
			}
			if(data.length==0){
				trs="<tr><td></td><td></td></tr>";
			}
			else
			{   				
				loadBusiContent(data[0].id);
			}
			$("#busiTable tbody").html(trs);
			$("#busiTable tbody tr:eq(0)").addClass("on").siblings("tr").removeClass("on");
		}
	});
}
/**
 * 点击业务事项，查询详情
 * @param e
 */
function onTrClick(e)
{
	$(this).addClass("on").siblings("tr").removeClass("on");
	var bid=$(this).data("bid");
	loadBusiContent(bid);
}