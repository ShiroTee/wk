
//分类颜色
var categoryColors=["btn-primary","btn-success","btn-warning","btn-danger"," btn-info","btn-default"];
var selectCate="",selectCateName="";
/**
 * 加载资源目录分类
 */
function loaderCategory()
{
	$("#categoryLabels").empty();
	var url=ampPreUrl+"/infoCatagoryHandler/qryAssetCateSche";
    $.ajax({url:url,type:"POST",dataType:"json",data:{orgId:rootOrgId},complete:function(XMLHttpRequest, textStatus){}
    	,success:function(data, textStatus, jqXHR){
    		if(data.length>0)
			{
    			for(var i=0;i<data.length;i++)
    			{
    				var item=data[i];
    				var label='<label data-id="'+item.typ_cate_id+'" data-name="'+item.typ_cate_nm+'"  class="btn '+categoryColors[i%categoryColors.length]+'" '+(i==0 ? "disabled=\"disabled\"":"")+'>'+item.typ_cate_nm+'</label>';
    				$("#categoryLabels").append(label);
    			}
    			//初始第一个目录分类 
    			selectCate=data[0].typ_cate_id;
    			selectCateName=data[0].typ_cate_nm;
    			loadCategory(0,data[0].typ_cate_id);
			}
    	}
    });
}
/**
 * 加载根资源分类目录
 * @param rootCate
 * @infoLevel 0-表示根节点
 */
function loadCategory(infoLevel,infoId,d)
{
	var url=ampPreUrl+"/infoCatagoryHandler/qryOneInfoCatagoryAndInfoCounts";
    $.ajax({url:url,type:"POST",dataType:"json",data:{infoLevel:infoLevel,infoId:infoId,typeCate:selectCate},
    	complete:function(XMLHttpRequest, textStatus){}
    	,success:function(data, textStatus, jqXHR){
    		if(data.length==0)
    		{
    			if(infoLevel!=0) //非根节点
    			{
    				setNodeQryed(d);	
    				return ;
    			}
    			graphData.name=selectCateName;
    			graphData.size=0;
    			graphData.infoCount=0;
    			graphData.children=[];
    			graphData.infoLevel=1;
    			clearData();
    			updateGraph(graphData);
    			setNodeQryed(graphData);
    			return;
    		}
    		if(!d)//根节点
			{
    			clearData();
    			graphData=data[0];
    			graphData.name=selectCateName;
    			graphData.size=data[0].infoCount;
    			graphData.children=[];
    			loadCategory(1,selectCate,graphData);
    			setNodeQryed(graphData);
			}
    		else
    		{
    			if(!d.children) d.children=[];
    			for(var i=0;i<data.length;i++)
    			{
    				var item=data[i];
    				item.name=item.infoType;
    				item.size=item.infoCount;
    				item.children=[];
    				if(item.infoCount==0) setNodeQryed(item);
    				d.children.push(item);
    			}
    			setNodeQryed(d);
    			clearData();
    			updateGraph(d);
    		}
    	}
    });
}
/**
 * 设置节点查询状态
 */
function setNodeQryed(d)
{
	d.qry=true;
}