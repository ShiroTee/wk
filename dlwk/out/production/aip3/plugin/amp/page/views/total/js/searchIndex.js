/**
 * 页面加载完成
 */
$(function(){
	searchTxt=$("#searchText").val();
	if(searchTxt!="")
	{
		startSearchQry();
	}
	
	$("#searchResultTotal").delegate(".result-label","click",onResultCountLink);
	$("#searchResultList").delegate(".ritem-name","click",onResultNameLink);
});
/**
 * 开始查询
 */
function startSearchQry()
{
	$("#searchResultTotal").empty();
	$("#searchResultList").empty();
	searchTxt=$("#searchText").val();
	var searchType=$(".qry-label-selected").data("type");
	
	var url=ampPreUrl+"/searchViewHandler/search";
    $.ajax({url:url,type:"POST",dataType:"json",data:{type:searchType,text:searchTxt,orginId:rootOrgId},complete:function(XMLHttpRequest, textStatus){}
    	,success:function(data, textStatus, jqXHR){
    		var data=data;
    		if(data.list.length>0)
			{
    			setResultTotal(data);
    			setResultList(data);
			}
    		else
    		{
    			$("#searchResultTotal").html("未找到对应的数据！");
    		}
    	}});
}
/**
 * 设置搜索结果显示数量
 */
function setResultTotal(data)
{
	var html="搜索结果：";
	if(data.asset)
	{
		html+="<label class='result-label' data-type='asset'>信息资源</label><label class='result-label-count'>"+data.asset+"</label>个";
	}
	if(data.appsys)
	{
		html+="<label class='result-label'  data-type='appsys'>信息系统</label><label class='result-label-count'>"+data.appsys+"</label>个";
	}
	if(data.busi)
	{
		html+="<label class='result-label'  data-type='busi'>业务事项</label><label class='result-label-count'>"+data.busi+"</label>个";
	}
	if(data.ele)
	{
		html+="<label class='result-label' data-type='dataele'>元数据</label><label class='result-label-count'>"+dataele+"</label>个";
	}
	if(data.org)
	{
		html+="<label class='result-label'  data-type='org'>委办局</label><label class='result-label-count'>"+data.org+"</label>个";
	}
	
	$("#searchResultTotal").html(html);
}
/**
 * 设置搜索结果列表
 * @param data
 */
function setResultList(data)
{
	var list=data.list;
	for(var i=0;i<list.length;i++)
	{
		var item=list[i];
		var imgUrl="";
		var typeName="";
		var title="";
		var desc="";
		var type=item.type;
		var itemId="";
		if(type=="asset")
		{
			typeName="信息资源";
			imgUrl=ctx+"/plugin/amp/page/common/images/search/asset.png";
			title=item.asset_name;
			itemId=item.asset_id;
			desc+='<label class="ritem-value">资源提供方：'+(item.opp_name ? item.opp_name:'-')+'</label>';
			desc+='<label class="ritem-value">发布日期：'+(item.pub_dt ? item.pub_dt:'-')+'</label>';
			desc+='<label class="ritem-value">主题分类：'+(item.sbj_name ? item.sbj_name:'-')+'</label>';
			desc+='<label class="ritem-value">创建日期：'+(item.crt_dt ? item.crt_dt:'-')+'</label>';
		}
		else if(type=="appsys")
		{
			typeName="信息系统";
			imgUrl=ctx+"/plugin/amp/page/common/images/search/appsys.png";
			title=item.sys_name;
			itemId=item.appsys_id;
			desc+='<label class="ritem-value">系统简称：'+(item.sys_abbr ? item.sys_abbr:'-')+'</label>';
			desc+='<label class="ritem-value">拥有部门：'+(item.owner_dept ? item.owner_dept:'-')+'</label>';
			desc+='<label class="ritem-value">使用单位：'+(item.use_org_names ? item.use_org_names:'-')+'</label>';
			desc+='<label class="ritem-value">状态：'+(item.status_name ? item.status_name:'-')+'</label>';
		}
		else if(type=="dataele")
		{
			typeName="元数据";
			imgUrl=ctx+"/plugin/amp/page/common/images/search/dataele.png";
			title=item.ele_name;
			itemId=item.ele_id;
			desc+='<label class="ritem-value">源头组织：'+(item.org_name ? item.org_name:'-')+'</label>';
			desc+='<label class="ritem-value">拼音标识：'+(item.py_cd ? item.py_cd:'-')+'</label>';
			desc+='<label class="ritem-value">数据元分类：'+(item.ele_cate_name ? item.ele_cate_name:'-')+'</label>';
			desc+='<label class="ritem-value">数据类型：'+(item.data_type_name ? item.data_type_name:'-')+'</label>';
		}
		else if(type=="busi")
		{
			typeName="业务事项";
			imgUrl=ctx+"/plugin/amp/page/common/images/search/busi.png";
			title=item.busi_name;
			itemId=item.busi_id;
			desc+='<label class="ritem-value">业务机构：'+(item.org_name ? item.org_name:'-')+'</label>';
			desc+='<label class="ritem-value">上级业务：'+(item.parent_busi_name ? item.parent_busi_name:'-')+'</label>';
			desc+='<label class="ritem-value">办理主体：'+(item.main_body ? item.main_body:'-')+'</label>';
			desc+='<label class="ritem-value">事项类型：'+(item.busi_type_name ? item.busi_type_name:'-')+'</label>';
		}
		else if(type=="org")
		{
			typeName="委办局";
			imgUrl=ctx+"/plugin/amp/page/common/images/search/org.png";
			title=item.org_name;
			itemId=item.org_id;
			desc+='<label class="ritem-value">类别：'+(item.org_type_name ? item.org_type_name:'-')+'</label>';
			desc+='<label class="ritem-value">上级组织机构：'+(item.parent_org_name ? item.parent_org_name:'-')+'</label>';
			desc+='<label class="ritem-value">联系人：'+(item.ctc_psn ? item.ctc_psn:'-')+'</label>';
		}
		var html=' <li class="list-group-item"> '+
			' <img class="ritem-img"  src="'+imgUrl+'"> '+
			' <div class="ritem-title"> '+
			'  <span class="ritem-type">'+typeName+'：<label class="ritem-name" data-id="'+itemId+'" data-type="'+type+'">'+title+'</label></span> '+
			' </div> '+
			' <div class="ritem-desc"> '+desc+
			'  <label class="ritem-value">...</label> '+
			' </div> '+
			' </li>';
		$("#searchResultList").append(html);
	}
}
/**
 * 搜索结果总数链接
 * @param e
 */
function onResultCountLink(e)
{
	var type=$(this).data("type");
	$(".qry-label").removeClass("qry-label-selected");
	$(".qry-label[data-type="+type+"]").addClass("qry-label-selected");
	startSearchQry();
}
/**
 * 点击搜索项名称,查看详细信息
 * @param e
 */
function onResultNameLink(e)
{
	var type=$(this).data("type");
	var itemId=$(this).data("id");
	if(type=="asset")
	{
		//window.location.href    $.app.openFullScreen(url);
		$.app.openFullScreen(ampPreUrl+"/cvpTotalHandler/sdAsset?id="+itemId);
	}
	else if(type=="appsys")
	{
		$.app.openFullScreen(ampPreUrl+"/cvpTotalHandler/sdSys?id="+itemId);
	}
	else if(type=="dataele")
	{
		$.app.openFullScreen(ampPreUrl+"/cvpTotalHandler/sdEle?id="+itemId);
	}
	else if(type=="busi")
	{
		$.app.openFullScreen(ampPreUrl+"/cvpTotalHandler/sdBusi?id="+itemId);
	}
	else if(type=="org")
	{
		$.app.openFullScreen(ampPreUrl+"/cvpTotalHandler/sdOrg?id="+itemId+"&stxt="+searchTxt);
	}
}