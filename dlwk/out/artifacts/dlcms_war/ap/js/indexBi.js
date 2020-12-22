$(function(){
	$("#bi_con img").each(function(index,obj){
		$(this).click(function(){
			showwin2(index);
		});
	});
	
	var div=$("#bi1");
	 
	 if($("#biIframe").length == 0) 		 
	$('<iframe border="0" frameborder="0" marginheight="0" marginwidth="0" scrolling="auto" id="biIframe" width=960 height= 510 src="'+biBaseUrl+'人口年龄结构统计分析曲线图&user='+biUserName+'&pwd='+biPassword+'&params={[V_BI_XZQH]}:{['+rootCode+']}"></iframe>').appendTo(div);
});
var url = new Array();
 
url.push("人口年龄结构统计分析曲线图&user="+biUserName+"&pwd="+biPassword+"&params={[V_BI_XZQH]}:{["+rootCode+"]}");
url.push("法人按机构类型统计分析&user="+biUserName+"&pwd="+biPassword+"&params={[V_BI_XZQH]}:{["+rootCode+"]}");
url.push("人口机械变动按年月统计分析柱图&user="+biUserName+"&pwd="+biPassword+"&params={[V_BI_DATE].time1}:{"+biQueryStartDate+"};{[V_BI_DATE].time2}:{"+biQueryEndDate+"}"); 
 

function showwin2(i){
if($.browser.msie == false){
		alert("请使用IE浏览器查看！");
		return ;
	}
	var div=$("#bi1");
	 
	 if($("#biIframe").length == 0) 		 
	$('<iframe border="0" frameborder="0" marginheight="0" marginwidth="0" scrolling="auto" id="biIframe" width=960 height= 510 src=""></iframe>').appendTo(div);
	$("#biIframe").attr("src",biBaseUrl+url[i]);
	
	
	var obj = $("#light_31");
	var x = ($(window).width()- obj.width())/2;
	var y = ($(window).height()-obj.height())/2;
	obj.css("top",y).css("left",x);  
	obj.show();
	$("#fade").show();
	}