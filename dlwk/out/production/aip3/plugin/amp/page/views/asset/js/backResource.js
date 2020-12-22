$(function(){
	var gh=$("#resourceMain").height();
	var bh=$(document).height();
	if((bh-200)>gh)
	{
		gh=bh-220;
		$("#resourceMain").height(gh);
	}
	qryResource();
	$("#searchBtn").click(searchResource);
	$('#resNm').bind('keypress',function(event){
	     if(event.keyCode == "13"){ searchResource()}
	});
});

var edatas=[];
var myChart;
function initResChart()
{
	// 基于准备好的dom，初始化echarts实例
    myChart = echarts.init(document.getElementById("resourceMain"));
	// 指定图表的配置项和数据
    option = {
            tooltip : {
            	show:true,
            	formatter :function(params){
            		return params.data.nicenm+":信息资源数【"+params.data.value+"】";
            	}
            },
            series : [
                {
                	name:"信息资源",
                    type:'treemap',
                    roam:false,
                    nodeClick:false,
                    width:'100%',
                    height:'95%',
                    top:10,
                    bottom:20,
                    data:edatas,
                    breadcrumb:{
                    	show:false
                    },
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                formatter: '{b}:{c}',
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
        
        myChart.on('click',function(params){
        	$.widget.show("#resourceInfo");
        	$("#resName").val($("#resNm").val());
        	resDataHandler(params.data.nicenm,params.data.id,2);
        	qryResInfoHandler();
        });
        
        myChart.on('dblclick',function(params){
        	$.widget.max("#resourceInfo");
        	resDataHandler(params.data.nicenm,params.data.id,2);
        	qryResInfoHandler();
        });
} 

function qryResource(){
	var url = ampPreUrl+"/depInfoHandler/qryOrgOwnAssetCount";
	$.ajax({
		url : url,
		cache : false,
		dataType : "json",
		type : "post",
		data : {rootOrgId:rootOrgId},
		success : function(data){
			if(data.length>0){				
				for(var i=0;i<data.length;i++){					
					var item = data[i];	
					edatas.push({name  :item.name+"("+item.assetCount+")",nicenm:item.name, value : item.assetCount, id : item.id});						
				}
				initResChart();
			}				
		}
	});
}

function searchResource(){
	var startDate = $("#startTime").val();
	var endDate = $("#endTime").val();
	var resNm = $("#resNm").val();
	var url = ampPreUrl+"/depInfoHandler/qryOrgOwnAssetCount";
	$.ajax({
		url : url,
		cache : false,
		dataType : "json",
		type : "post",
		data : {rootOrgId:rootOrgId, assetName : resNm, startDate : startDate, endDate : endDate},
		success : function(data){			
			if(data.length>0){	
				$.widget.hide("#resourceInfo");
				myChart.clear();
				edatas.length=0;
				for(var i=0;i<data.length;i++){					
					var item = data[i];	
					edatas.push({name  :item.name+"("+item.assetCount+")",nicenm:item.name, value : item.assetCount, id : item.id});						
				}
				initResChart();
			}else{
				$.app.alert({
        			title : "错误提示",
        			message : "未找到相关数据！"
        		});
			}				
		}
	});
}