var selectedOrgName="";
var selectedId="";
$(function(){
	var gh=$("#orgMain").height();
	var bh=$(document).height();
	if((bh-200)>gh)
	{
		gh=bh-220;
		$("#orgMain").height(gh);
	}
	gryOrg("orgType","");
	
	$("#ace-settings-box").delegate("button","click",function(e){
		$(".icon-only").click();
		dispatchAction({
		    type: 'treemapSelect',
		    // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
		    dataIndex: 2
		})
	});
	
	$('#searchBu_dataele').click(function(){
	 var url=ampPreUrl+"/cvpDataeleHandler/getDataeleJsonByEleName";
  	 $.ajax({
  		  url: url, dataType:"json",type:"POST",data:{eleName:$("#searchText_dataele").val()},
  		  success: function(data){
  			  var data=data.data;
  			  edatas=[];
  			  var leftdatas="";
  			  var rightdatas="";
  			  if(data.length>0){
  				for(var i=0;i<data.length;i++)
  		     	 {
  				    var item=data[i];
  				    $(".widget-collapse").click();
  					    edatas.push({name:item.name+"("+item.count+")", value : item.count, id : item.id, type : 'ownOrg',emptyname:item.name});					   
  					 //   item.name.substr(0,1)
  					    if(i<=data.length/2){
  					    	leftdatas+="<div class='ace-settings-item'><button type='button' class='btn btn-link' eleId='"+item.id+"'>"+item.name+"</button></div>";
  					    }else{
  					    	rightdatas+="<div class='ace-settings-item'><button type='button' class='btn btn-link' eleId='"+item.id+"'>"+item.name+"</button></div>";
  					    }
  			     }
//  				 $("#leftslider").html(leftdatas);
//  				 $("#rightslider").html(rightdatas);
  	  			 $.widget.hide("#metadata");
  	  			 initOrgChart();
  			  }else{
  				  alert("未找到相关数据!");
  			  }

  		  }
  	  });
	});
	qryDataType();
	
});


/**
 * 初始组织机构图形
 */
var myChart;
var edatas=[];
var ldatas=[];
var redatas=[];
var resultdatas=[];
var option;
var url;
function initOrgChart()
{
	// 基于准备好的dom，初始化echarts实例
    myChart = echarts.init(document.getElementById("orgMain"));
	// 指定图表的配置项和数据
    option = {
            tooltip : {
                trigger: 'item',
                formatter: function(data){
                	  return data.data.emptyname+":数据元"+data.value+"个";
                }
            },
            series : [
                {
                	name:"组织机构",
                    type:'treemap',
                    roam:false,
                    nodeClick:false,
                    width:"100%",
                    height:"100%",
                    data:edatas,
                    top:10,
                    bottom:30,
                    colorAlpha:0,
                    breadcrumb:{
                    	show:false,
                    	left:1,
                    	top:1

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
	    myChart.on('click', function (params) {
	        // 控制台打印数据的名称
	        $.widget.show("#metadata");
	        $("#dataName").val($("#searchText_dataele").val());
	        selectedOrgName=params.data.name;
	        selectedId=params.data.id;
	        dataHandler(params.data.data.emptyname,params.data.id);
	    	searchHandler();
	    	
	    });
	    
        myChart.on('dblclick', function (params) {

	        // 控制台打印数据的名称
	        $.widget.show("#metadata");
	        $("#dataName").val($("#searchText_dataele").val());
	        selectedOrgName=params.data.name;
	        selectedId=params.data.id;
	        dataHandler(params.data.emptyname,params.data.id);
	    	searchHandler();
	    	if($(".widget-box").hasClass("collapsed")){
	    		$(".widget-collapse").click();
	    	}
	    	
	    
	    });
	    
        myChart.setOption(option);
    
        
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
		//url=ampPreUrl+"/dataElementHandler/qryEleCountByOrg";
		url=ampPreUrl+"/cvpDataeleHandler/getDataeleJson";
		datas={rootOrgId : rootOrgId};
	}
  	 $.ajax({
  		  url: url, dataType:"json",type:"POST",data:datas,
  		  success: function(data){
  			  var data=data.data;
  			  var leftdatas="";
 			  var rightdatas="";
  			  if(data.length>0){
  				for(var i=0;i<data.length;i++)
  		     	 {
  				    var item=data[i];
  					    edatas.push({name:item.name+"("+item.count+")", value : item.count, id : item.id, type : 'ownOrg',emptyname:item.name});					   
  					    if(i<=data.length/2){
  					    	leftdatas+="<div class='ace-settings-item'><button type='button' class='btn btn-link' eleId='"+item.id+"'>"+item.name+"</button></div>";
  					    }else{
  					    	rightdatas+="<div class='ace-settings-item'><button type='button' class='btn btn-link' eleId='"+item.id+"'>"+item.name+"</button></div>";
  					    }
  			     }
//  				 $("#leftslider").html(leftdatas);
//  				 $("#rightslider").html(rightdatas);
  				 searchHandler(data[0].name,data[0].id);
  	  			initOrgChart();
  			  }
  			
  		  }
  	 });
}

