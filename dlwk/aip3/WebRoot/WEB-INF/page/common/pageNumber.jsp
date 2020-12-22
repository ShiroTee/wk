<%@ page language="java" pageEncoding="UTF-8"%>
<link type="text/css" rel="stylesheet" href="${ctx }/page/welcome/resourceDir/css/jquery.pageNumber.css"></link>
<script type="text/javascript" src="${ctx }/page/welcome/resourceDir/js/jquery.pageNumber.js"></script>
<script type="text/javascript">
   	/**
   	 *
   	 * 此jsp页面用于资源目录申请右边侧栏的相关资源分页显示
   	 *  
   	 **/
   	
   	
   	
	/**
	*初始分页
	**/
	function initPagination(url,params,total,pageSize,successFun,pageParent)
	{
		getPagenationSelector(pageParent).page({
			total:total,
			pageSize:pageSize,
 			prevBtnText:"<",
 			nextBtnText:">",
			remote: {
		        url: url,
		        params: params,
		        pageIndexName: 'pageIndex',     //请求参数，当前页数，索引从0开始
		        pageSizeName: 'pageSize',       //请求参数，每页数量
		        totalName: 'count',             //指定返回数据的总数据量的字段名
		        success: function (result, pageIndex) {
		        	if(successFun) successFun(result,pageIndex);
		        	//if(pageIndex>0){//如果是第一页就不用定位到第一条
		        		window.scrollTo(0,0);//点击上一页或者下一页后回到分页显示的第一条记录
		        	//}
		        	
		        }
		    }
		});
	}
	/**
	**更新分页
	****/
	function updatePagination(url,params,total,pageSize,successFun,pageParent)
	{
		var $page=getPagenationSelector(pageParent);
		var pageData=$page.data("page");
		if(pageData)
		{
			getPagenationSelector(pageParent).page('destroy');
		}
		initPagination(url,params,total,pageSize,successFun,pageParent);
	}
	/**
	**获取分页选择器，根据父节点分页来区分不同的分页
	**/
	function getPagenationSelector(pageParent)
	{
		var $page=$("#q_listPagination");
		if(pageParent!=null && pageParent!="")
		{
			$page=$(pageParent+" > #q_listPagination");
		}
		return $page;
	}
</script>
<div id="q_listPagination"   class="m-pagination"   data-page-btn-count="5"
        data-show-first-last-btn="true" data-load-first-page="true" 
        data-show-info="true" data-info-format="    "
        data-show-jump="false" data-jump-btn-text="跳转" 
        data-show-page-sizes="false" data-page-size-items="[10,20,30]"></div>