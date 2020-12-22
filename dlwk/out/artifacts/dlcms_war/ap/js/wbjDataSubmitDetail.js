
var myDate = new Date();
//初始化起至日期
var initstartdate = myDate.getFullYear()+'-'+myDate.getMonth()+'-01';
var creMonth = myDate.getMonth();
var initenddate;
if(creMonth=='1'||creMonth=='3'||creMonth=='5'||creMonth=='7'||creMonth=='8'||creMonth=='10'||creMonth=='12')
{
	initenddate = myDate.getFullYear()+'-'+myDate.getMonth()+'-31';
}
else if(creMonth=='4'||creMonth=='6'||creMonth=='9'||creMonth=='11')
{
	initenddate = myDate.getFullYear()+'-'+myDate.getMonth()+'-30';
}
else
{
	initenddate = myDate.getFullYear()+'-'+myDate.getMonth()+'-28';
}


//初始化总页数和总记录数
var thistotalPage = "0";
var thistotalRecords = "0";

$(function() {
	$("#cxstart").val(initstartdate);
	$("#cxend").val(initenddate);
});


//委办局数据提交情况查询
 function wbjsubmitdataquery(n,kkpager){
	 if(n==undefined)n=1;
	 //alert(n)
	 var pageNo = n;
	 var startDate = $("#cxstart").val();
	 var endDate = $("#cxend").val();
		if (startDate != "" && endDate != "") {
			 $.ajax({
				    url: wbjUrl+"getWbjDataSubmitCounts",
				    dataType : 'jsonp',
				    data:{startDate:'',endDate:'',pageNo:pageNo},
				    jsonp : "jsonpcallback",
				    success : function(data) {
				    	//alert(JSON.stringify(data))
				    	var obj = data.data.listBeans.length;
				    	var tbody = "";
				    	if(obj != undefined && obj >0){
				    		 for(var i=0;i<obj;i++){
				    			 tbody +="<tr>"+"<td>"+data.data.listBeans[i].orgName+"</td>"+"<td>"+data.data.listBeans[i].contributionIntegral+"</td></tr>";
				    		 }
				    		 $("#wbjsubmitdata").html(tbody);
				    		 
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
				    		
				    			
				    	}else{
				    		$("#wbjsubmitdata").html("<tr><td colspan='2'>无信息！</td></tr>");
				    		
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
				    		//alert("无信息！");
				    	}
				    },
				    error : function(response) {
				      alert(response);
				    },
				    timeout:6000
				  });
		}
		else{
			alert("请输入正确的查询条件！");
		}
 }
 
//首页上面的委办局数据提交情况
function indexwbjsubmitdataquery(){
			 $.ajax({
				    url: wbjUrl+"getIndexWbjDataSubmitCounts",
				    dataType : 'jsonp',
				    jsonp : "jsonpcallback",
				    success : function(data) {
				    	//alert(JSON.stringify(data))
					    if (data) {
					    	fillGridSubmitData(data.data.listBeans);
						} else {}
				    },
				    error : function(response) {
				      alert(response);
				    },
				    timeout:6000
				  });
}

//首页上面的数据使用排名
function indexDataUseOrder(){
			 $.ajax({
				    url: wbjUrl+"getDataUseOrder",
				    dataType : 'jsonp',
				    jsonp : "jsonpcallback",
				    success : function(data) {
				    	//alert(JSON.stringify(data))
					    if (data) {
					    	fillGridDataUseOrder(data.data.zero);
						} else {}
				    },
				    error : function(response) {
				      alert(response);
				    },
				    timeout:6000
				  });
}

//首页上面的数据使用排名
function indexDataUseInfo(){
			 $.ajax({
				    url: wbjUrl+"getDataUseInfo",
				    dataType : 'jsonp',
				    jsonp : "jsonpcallback",
				    success : function(data) {
				    	//alert(JSON.stringify(data))
					    if (data) {
					    	fillGridDataUseInfo(data.data.zero);
						} else {}
				    },
				    error : function(response) {
				      alert(response);
				    },
				    timeout:6000
				  });
}
 
function indexFileSubmitCounts(){
	 $.ajax({
		    url: wbjUrl+"getFileSubmitCounts",
		    dataType : 'jsonp',
		    jsonp : "jsonpcallback",
		    success : function(data) {
		    	//alert(JSON.stringify(data))
			    if (data) {
			    	fillFileSubmitCounts(data.data.zero);
				} else {}
		    },
		    error : function(response) {
		      alert(response);
		    },
		    timeout:6000
		  });
}

function indexjyxxTb(){
	 var papersNum = $.trim($("#p92sfzjh").val());
	 if(papersNum != ""){
	 $.ajax({
		 url: encodeURI(baseUrl+"getJyxx?papersNum="+papersNum+"&"+t),
		 /*url: encodeURI(baseUrl+"getJyxx?"),*/
		   /* url: wbjUrl+"getJyxx",*/
		    dataType : 'jsonp',
		    jsonp : "jsonpcallback",
		    success : function(data) {
			    if (data) {
			    	fillJyxx(data.data.zero);
				} else {}
		    },
		    error : function(response) {
		      alert(response);
		    },
		    timeout:6000
		  });
	 }
}
