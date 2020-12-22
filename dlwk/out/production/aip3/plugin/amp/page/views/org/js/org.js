$(function(){
	gryOrg("orgType","");
	
	$("#orgMain").delegate(".close-bu","click",hideHandler);
	$("#orgMain").delegate(".org-link","click",onOrgTipLink);
});


/**
 * 初始化组织机构图形
 */
var myChart;
var edatas=[];
var ldatas=[];
var redatas=[];
var resultdatas=[];
var option;
var url;
var selectWidget;
function initOrgChart()
{
	// 基于准备好的dom，初始化echarts实例
    myChart = echarts.init(document.getElementById("orgMain"));
	// 指定图表的配置项和数据
    option = {
            tooltip : {
            	show:true,
            	trigger: 'item',
            	enterable : true,
            	transitionDuration : 0,
            	triggerOn : 'click',
            	formatter: function (params,ticket,callback){
               	 if(params.data.type=="office"){
                     var name = params.data.nicenm;
                     var id = params.data.id;
                     $("#name").val(name);
                     $("#id").val(id);
                     var item={};
                	 $.ajax({
                    	 url : ampPreUrl+"/orgViewHandler/qryOrgAnalysData",
                         cache : false,
                         async : false,
                         dataType : "json",
                         type : "post",
                         data : {orgId : id},
                         success : function(data){
                        	 item = data; 
                        	 
                         }
                     }); 
                    
                     var info =  item.info ? item.info : 0;
                     var system = item.system?item.system:0;
                     var element = item.element?item.element:0;
                     var res = "";
                     res = "<p style='color:white'>"+name+"</p> " +
                     "<input type='hidden' value='"+params.data.nicenm+"' id='pName'/>"+
                     "<input type='hidden' value='"+params.data.id+"' id='pid'/>"+
                     "<i class='fa fa-remove close-bu' style='cursor: pointer;right:5px;top:8px;position:absolute' ></i>"+
                     "<p>信息系统数：<span class='org-link sys' id='sys' onClick='systemInfoHandler(\""+system+"\")' style='border-bottom:yellow solid  1px;cursor: pointer;color:yellow' >"+system+"</span></p>"+
                     "<p>信息资源数：<span class='org-link' id='res' onClick='resourceInfoHandler(\""+info+"\")' style=' border-bottom:yellow solid  1px;cursor: pointer;color:yellow''>"+info+"</span></p>"+
                     "<p>拥有数据元：<span class='org-link' id='da' onClick='elementHandler(\""+element+"\")' style='border-bottom:yellow solid  1px;cursor: pointer;color:yellow''>"+element+"</span></p>";
                     return res;
                     
             		}
                 }
            },
            series : [
                {
                	name:"组织机构",
                    type:'treemap',
                    roam:false,
                    nodeClick:false,
                    width:"100%",
                    childrenVisibleMin:100,
                    data:edatas,
                    breadcrumb:{
                    	show:false
                    },
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                formatter: "{b}",
                                textStyle:{
                                	fontSize:14
                                }
                            },
                            borderWidth: 1
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);      
    
        myChart.on('dblclick', function (params) {
        	if(selectWidget) $.widget.hide(selectWidget);
        	if(params.data.value==0){     	  
        		$.app.alert({
        			title : "错误提示",
        			message : "未找到下级机构！"
        		});
        		return;
        	}
        	if(params.data.type=="ownOrg"){
        		$("#ownOrgId").val(params.data.id);
        		$("#ownOrgNm").val(params.data.nicenm);
        		var html="";
        		html="<li onClick='ownOrgHandler()'><font>组织机构类型【"+params.data.nicenm+"】</font></li>";
        		$(".breadcrumb").html(html);
        	}
        	if(params.data.type=="office"){
        		$("#officeId").val(params.data.id);
        		$("#officeNm").val(params.data.nicenm);
        		var ownOrgNm = $("#ownOrgNm").val();
        	    var html="";
        	    html="<li onClick='ownOrgHandler()'><font>组织机构类型【"+ownOrgNm+"】</font></li>"+
        	    	 "<li onClick='officeHandler()'><font>组织机构（委办局）【"+params.data.nicenm+"】</font></li>";
        	    $(".breadcrumb").html(html);
        	}
        	if(params.data.type=="busiItem"){
        		$("#busiItemId").val(params.data.id);
        		var ownOrgNm = $("#ownOrgNm").val();
        		var officeNm = $("#officeNm").val();
        	    var html="";
        	    html="<li onClick='ownOrgHandler()'><font>组织机构类型【"+ownOrgNm+"】</font></li>"+
        	    	 "<li onClick='officeHandler()'><font>组织机构（委办局）【"+officeNm+"】</font></li>"+
        	    	 "<li onClick='busiItemHandler()'><font>组织机构（处室）【"+params.data.nicenm+"】</font></li>";
        	    $(".breadcrumb").html(html);
        	}
	    	gryOrg(params.data.type,params.data.id,params.data.nicenm);
	    });

        myChart.on('click', function (params) {   
        	if(selectWidget) $.widget.hide(selectWidget);
        	if(params.data.type=="ownOrg"){
        		selectWidget="#orgOffice-widget";
//        		url= ampPreUrl+"/orgViewHandler/qryTypeOwnOrg";
        		var data={parentOrgId : rootOrgId, orgType : params.data.id};
        		qryOffice(params.data.nicenm,data);
        	}
        	else if(params.data.type=="office")
        	{
        		selectWidget="#orgOffice-widget";
//        		url= ampPreUrl+"/orgViewHandler/qryOrgOwnOffice";
        		var data = {parentOrgId : params.data.id};
        		qryOffice(params.data.nicenm,data);
        	}
        	else if(params.data.type=="busiItem"){
        		selectWidget="#serverBusi-widget";
        		url= ampPreUrl+"/orgViewHandler/qryOrgBusiItem";
        		var data={orgId : params.data.id};
        		var fields ={id : "id",no : "busi_no", name :"name"};
        		loadServerbusi("",params.data.nicenm,url,data,fields);
        	}
        	if(selectWidget) $.widget.show(selectWidget);
        });
 } 
//关闭弹出框
function hideHandler(){
	$(this).parent().hide();
}
function onOrgTipLink(e)
{
	$(this).parent().parent().hide();
}
/**
 * 通用查询方法
 * @param type
 * @param nodeId
 * @param name
 */
function gryOrg(type,nodeId,name){
	var datas={};
	if(type=="orgType")
	{
		url=ampPreUrl+"/totalViewHandler/qryOrgTypeCount";
		datas={rootOrgId : rootOrgId};
	}
	else if(type=="ownOrg")
	{
		url= ampPreUrl+"/orgViewHandler/qryTypeOwnOrg";
		datas={parentOrgId : rootOrgId, orgType : nodeId};
	}
	else if(type=="office")
	{
		url= ampPreUrl+"/orgViewHandler/qryOrgOwnOffice";
		datas={parentOrgId : nodeId}			
	}
	else if(type=="busiItem")
	{   
		if(selectWidget) $.widget.hide(selectWidget);
		url= ampPreUrl+"/cvpOrgViewHandler/qryBusiItemAndInfo";
		qryBusiAndResource(nodeId,name,url);
		return;
	}
  	 $.ajax({
  		  url: url, cache: false, dataType:"json",type:"post",data:datas,
  		  success: function(data){
  			  if(type != "orgType"){
  				  myChart.clear();
  				  edatas.length=0;
  				  ldatas.length=0;
  			  }
  			  if(data.length>0){
  				for(var i=0;i<data.length;i++)
  		     	 {
  				    var item=data[i];
  				    if(type=="orgType"){ 					
  					    edatas.push({name  :item.orgTypeName+"("+item.orgTypeCount+")",nicenm : item.orgTypeName, value : item.orgTypeCount, id : item.orgType, type : 'ownOrg'});					   
  				    }
  				    else if(type=="ownOrg"){
  				    	edatas.push({name : item.name+"("+item.num+")",nicenm : item.name, value : item.num, id :item.id, type : "office"});
  				    }
  				    else if(type=="office"){
  				        edatas.push({name : item.name+"("+item.num+")",nicenm : item.name, value : item.num,id :item.id,type : "busiItem"});
  				    }
  			     }
  			  }
  			initOrgChart();
  		  }
  	 });
}

function qryBusiAndResource(id,name,url){
	$.ajax({
		url : url,
		cache : false,
		dataType : "json",
		type : "post",
		data : {orgId : id},
		success : function(data){
			var busiId;
			resultdatas.length=0;
			ldatas.length=0;
			resultdatas.push({name:name,type:"org",gid:id});
			for(var i=0;i<data.length;i++)
			{
				var item=data[i];
				if(busiId!=item.busi_id)
				{
					busiId=item.busi_id;
					resultdatas.push({name:item.busi_nm,type:"busi",gid:busiId});
					ldatas.push({source:name,target:item.busi_nm,value:1});
				}
				if(item.uview_id)
				{
				  resultdatas.push({name:item.uview_nm,type:"asset",gid:item.uview_id});
				  ldatas.push({source:item.busi_nm,target:item.uview_nm,value:1});
				}
			}
			initGraph();
		}
	});
}

/**
 * 初始化桑基图
 */
function initGraph(){
	//初始化DIV
	myChart = echarts.init(document.getElementById("orgMain"));
	//配置关系图形
	option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
            showContent:false
        },
        series: [
            {
                type: 'sankey',
                layout:'none',
                data: resultdatas,
                links: ldatas,
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        borderColor: '#aaa'
                    }
                },
                lineStyle: {
                    normal: {
                        curveness: 0.5
                    }
                    
                }
            }
        ]
	};
	myChart.setOption(option);
	
	myChart.on('click', function (params) {	
		console.log(params.data.gid);
		if(selectWidget) $.widget.hide(selectWidget);
		if(params.data.type=="org"){
			selectWidget="#org-widget";
			loadOrg(params.data.gid,params.data.name)
		}
		if(params.data.type=="busi"){
			selectWidget="#busi-widget";
			loadbusi(params.data.gid,params.data.name)
		}
		if(params.data.type=="asset"){
			selectWidget="#res-widget";
			rescourceHandler(params.data.gid,params.data.name);
		}
		if(selectWidget) $.widget.show(selectWidget);
    });
	
	myChart.on('dblclick',function(params){
		if(selectWidget) $.widget.max(selectWidget);
	});
}

//查询拥有信息系统
function systemInfoHandler(num){
	if(num == 0){
	   if(selectWidget) $.widget.hide(selectWidget);
	   $.app.alert({
			title : "操作提示",
			message : "未找到信息系统详情！"
		});
	   return;
	}
	if(selectWidget) $.widget.hide(selectWidget);
	selectWidget="#sysResource";
	var name =$("#pName").val();
	var id = $("#pid").val();
	sysDataHandler(name,id);
	qryResSysHandler();
	if(selectWidget) $.widget.max(selectWidget);
}

//查询拥有信息资源
function resourceInfoHandler(num){
	if(num == 0){
		if(selectWidget) $.widget.hide(selectWidget);
		   $.app.alert({
				title : "操作提示",
				message : "未找到信息资源详情！"
			});
		return;
	}
	if(selectWidget) $.widget.hide(selectWidget);
	selectWidget="#resourceInfo";
	var name =$("#pName").val();
	var id = $("#pid").val();
	resDataHandler(name,id);
	qryResInfoHandler();
	if(selectWidget) $.widget.max(selectWidget);
}

//查询数据元
function elementHandler(num){
	if(num == 0){
		if(selectWidget) $.widget.hide(selectWidget);
		   $.app.alert({
				title : "操作提示",
				message : "未找到数据元详情！"
			});
		return;
	}
	if(selectWidget) $.widget.hide(selectWidget);
	selectWidget="#metadata";
	var name =$("#pName").val();
	var id = $("#pid").val();
	dataHandler(name,id);
	searchHandler();
	if(selectWidget) $.widget.max(selectWidget);
}

//----以下方法都为导航栏
function ownOrgHandler(){
	location.href = ampPreUrl+"/cvpOrgViewHandler/index";
}

function officeHandler(){
	var ownOrgId = $("#ownOrgId").val();
	gryOrg("ownOrg",ownOrgId,"");
}

function busiItemHandler(){
	var officeId = $("#officeId").val();
	gryOrg("office",officeId,"");
}