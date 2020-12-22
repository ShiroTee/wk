//alert(globalInterfaceDomain)
var baseUrl = globalInterfaceDomain+"/csdsc/integralManagerDetailHandler/";
var myDate = new Date();
//初始化起至日期
var initstartdate = myDate.getFullYear()+'-'+myDate.getMonth()+'-'+myDate.getDate();
var initenddate = myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate();

//初始化总页数和总记录数
var thistotalPage = "0";
var thistotalRecords = "0";

//发布按钮标志
var publishflag = 0;

$(function() {
	$("#cxstart").val(initstartdate);
	$("#cxend").val(initenddate);
	
	//默认发布按钮不能发布，变灰
	publishflag = 0;
	$('#publish').css('background', 'gray');
});


//委办局数据提交情况查询
 function integralManagerDetailquery(n,kkpager){
	 if(n==undefined)n=1;
	 //alert(n)
	 var pageNo = n;
	 var startDate = $("#cxstart").val();
	 var endDate = $("#cxend").val();
		if (startDate != "" && endDate != "") {
			 $.ajax({
				    url: baseUrl+"getWbjIntegralData",
				    dataType : 'jsonp',
				    data:{startDate:startDate,endDate:endDate,pageNo:pageNo},
				    jsonp : "jsonpcallback",
				    success : function(data) {
				    	//alert(JSON.stringify(data))
				    	var obj = data.data.listBeans.length;
				    	var tbody = "";
				    	if(obj != undefined && obj >0){
				    		 for(var i=0;i<obj;i++){
				    			 tbody +="<tr>"+"<td>"+data.data.listBeans[i].orgName+"</td>"+"<td>"+data.data.listBeans[i].contributionIntegral+"</td>"+"<td>"+data.data.listBeans[i].useIntegral+"</td>"+"<td>"+data.data.listBeans[i].rejectIntegral+"</td></tr>";
				    		 }
				    		 $("#integralManagerDetail").html(tbody);
				    		 
				    		 //得到总页数和总记录数
				    		 thistotalPage = data.data.allpage;
				    		 thistotalRecords = data.data.allcounts;
				    		 
				    		//重新生成分页控件，刷新
				    		 kkpager.init({
				    		 	pno : n,
				    		 	//总页码
				    		 	total : thistotalPage,
				    		 	//总数据条数
				    		 	totalRecords : thistotalRecords
				    		 });
				    		 kkpager.generPageHtml();
				    		 
				    		//能发布，发布按钮变亮
				    		 publishflag = 1;
				    		$('#publish').css('background', '#f5b02e');
				    		
				    			
				    	}else{
				    		$("#integralManagerDetail").html("<tr><td colspan='4'>无信息！</td></tr>");
				    		
				    		//得到总页数和总记录数
				    		 thistotalPage = "0";
				    		 thistotalRecords = "0";
				    		 
				    		//重新生成分页控件，刷新
				    		 kkpager.init({
				    		 	pno : n,
				    		 	//总页码
				    		 	total : thistotalPage,
				    		 	//总数据条数
				    		 	totalRecords : thistotalRecords
				    		 });
				    		 kkpager.generPageHtml();
				    		 
				    		//发布按钮不能发布，变灰
				    		 publishflag = 0;
				    		$('#publish').css('background', 'gray');
				    	}
				    },
				    error : function(response) {
				      alert(response);
				    },
				    timeout:6000
				  });
		}
		else
		{
			alert("请输入正确的查询条件！");
		}
		
 }


//发布到通知公告
function publishIntegralToNotice(){
	
	if(publishflag==1)
	{
		var startDate = $("#cxstart").val();
		var endDate = $("#cxend").val();
		//alert(startDate)
		var submitUrl = "/publishIntegral.jhtml";
		if (startDate != "" && endDate != "") {
			if (confirm("确认发布到通知公告？"))
			{
				$.post(submitUrl, {
					"startDate" : startDate ,
					"endDate" : endDate
					},function(data) {
					data = eval("(" + data + ")");
					//alert(JSON.stringify(data))
					//alert(data.success);
					if (data.success) {
						alert("发布成功！");
					} else {
						alert("发布失败，请联系管理员！");
					}
				});
			}
		}
		else
		{
			alert("请输入正确的查询条件！");
		}
	}
	else
	{
		alert("请先查询到符合条件的数据！");
	}
}
 