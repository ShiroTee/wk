//查询数据
/**
 * 加载根节点数据
 */
function loaderRoot()
{
	var url=ampPreUrl+"/serverViewHandler/queryOrgServObject";
    $.ajax({url:url,type:"POST",dataType:"json",data:{orgId:rootOrgId},complete:function(XMLHttpRequest, textStatus){}
    	,success:function(data, textStatus, jqXHR){
    		if(data)
			{
    			var org=data.org;
    			var servs=data.serv;
    			graphData=org;
    			graphData.size=org.num;
    			graphData.children=[];
    			for(var i=0;i<servs.length;i++)
    			{
    				var item=servs[i];
    				item.size=item.busi_num;
    				graphData.children.push(item);
    			}
    			initNode(graphData);
    			initGraph(graphData);
			}
    	}
    });
}
/**
 * 查询服务对象子分类 
 * @param d  服务对象节点
 */
function initServChildNodes(d)
{
	var url=ampPreUrl+"/serverViewHandler/queryChildServObject";
	var nodeId=d.id;
    $.ajax({url:url,type:"POST",dataType:"json",data:{orgId:rootOrgId,servId:nodeId},complete:function(XMLHttpRequest, textStatus){}
    	,success:function(data, textStatus, jqXHR){
    		initNode(d);
    		d.children=data;
    		for(var i=0; i<data.length; i++)
    		{
    			var item=data[i];
    			item.size=item.num;
    		}
    		updateGraph(d);
    	}
    });
}
/**
 * 初始化服务分类下的业务事项
 * */
function initChildServNodes(d)
{
	var url=ampPreUrl+"/serverViewHandler/queryBusi";
	var nodeId=d.id;
    $.ajax({url:url,type:"POST",dataType:"json",data:{orgId:rootOrgId,servId:nodeId},complete:function(XMLHttpRequest, textStatus){}
    	,success:function(data, textStatus, jqXHR){
    		initNode(d);
    		d.children=data;
    		for(var i=0; i<data.length; i++)
    		{
    			var item=data[i];
    			item.size=1;
    		}
    		updateGraph(d);
    	}
    });
}
/**
 * 
 * @param d
 */
function openServerBusi(d)
{
	var serverId=d.id;
	loadServerbusi(d.id,d.serv_obj_name);
	hideSelectWidget();
	selectWidget="#serverBusi-widget";
	$.widget.show(selectWidget);
}
/**
 * 查询业务事项关联统计信息
 * @param {} d
 */
function qryBusiNodeRelateCount(d)
{
	var url=ampPreUrl+"/serverViewHandler/queryCollectBusi";
    $.ajax({url:url,type:"POST",dataType:"json",data:{busiId:d.id},complete:function(XMLHttpRequest, textStatus){}
    	,success:function(data, textStatus, jqXHR){
    		d.qry=true;
    		d.related=data;
    	}
    });
}