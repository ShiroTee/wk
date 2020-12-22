//查询数据

function initRootNode()
{
	graphData.id=assetId;
	graphData.name=assetName;
	graphData.type="asset";
	graphData.size=1;
	graphData.children=[];
}
/**
 * 加载根节点数据
 */
function loaderRoot()
{
	var url=ampPreUrl+"/assetViewHandler/qryBusiByAssetId";
    $.ajax({url:url,type:"POST",dataType:"json",data:{assetId:assetId},complete:function(XMLHttpRequest, textStatus){}
    	,success:function(data, textStatus, jqXHR){
    		if(data.length>0)
			{
    			for(var i=0;i<data.length;i++)
    			{
    				var item=data[i];
    				item.size=1;
    				item.type="busi";
    				graphData.children.push(item);
    			}
    			initNode(graphData);
    			initGraph(graphData);
			}
    	}
    });
}
/**
 * 初始业务事项关联处室节点
 * @param d
 */
function initBusiOffice(d)
{
	var url=ampPreUrl+"/assetViewHandler/qryOrgOfficeByBusiId";
	var nodeId=d.id;
    $.ajax({url:url,type:"POST",dataType:"json",data:{busiId:nodeId},complete:function(XMLHttpRequest, textStatus){}
    	,success:function(data, textStatus, jqXHR){
    		initNode(d);
    		d.children=data;
    		for(var i=0; i<data.length; i++)
    		{
    			var item=data[i];
    			item.size=1;
    			item.type="office";
    		}
    		updateGraph(d);
    	}
    });
}

/**
 * 初始处室关联委办局节点
 * @param d
 */
function initOfficeOrg(d)
{
	var url=ampPreUrl+"/assetViewHandler/qryOrgByOfficeId";
	var nodeId=d.id;
    $.ajax({url:url,type:"POST",dataType:"json",data:{officeId:nodeId},complete:function(XMLHttpRequest, textStatus){}
    	,success:function(data, textStatus, jqXHR){
    		initNode(d);
    		d.children=data;
    		for(var i=0; i<data.length; i++)
    		{
    			var item=data[i];
    			item.size=1;
    			item.type="org";
    		}
    		updateGraph(d);
    	}
    });
}