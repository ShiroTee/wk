$(function()
{
	$("#resourceInfo #searchBtn").click(qryResInfoHandler);
	$("#searchBtn2").click(findGroup);
	$('#resName').bind('keypress', function(event)
	{
		if (event.keyCode == "13")
		{
			qryResInfoHandler();
		}
	});
	$('#resourceInfo #searchInput').bind('keypress', function(event)
	{
		if (event.keyCode == "13")
		{
			findGroup();
		}
	});
	sharelvlHandler();
	keptlvlHandler();
	$('#resourceInfo_table').delegate("tr", "click", findResource);
});
/**
 * 
 * @param {}
 *            name
 * @param {}
 *            id
 * @param {}

 *            pageType 资源回溯时返回上页 1-组织机构主页面 2-信息资源 3-协同主题主页面 4-资源分类主页面 5-业务关联资源       
 **/
var assetPageType = 1;
function resDataHandler(name, id, pageType)
{	
	$("#group_table tbody").empty();
	$("#resourceInfo #resourceId").text("");
	$("#resourceInfo #pubDt").text("");
	$("#resourceInfo #assetNm").text("");
	$("#resourceInfo #providerName").text("");
	$("#resourceInfo #keyword").text("");
	$("#resourceInfo #resOnline").text("");
	$("#resourceInfo #archCateName").text("");
	$("#resourceInfo #sbjName").text("");
	$("#resourceInfo #pubName").text("");
	$("#resourceInfo #secrName").text("");
	$("#resourceInfo #subCatName").text("");
	$("#resourceInfo #abstract").text("");
	$("#resourceInfo #name").val(name);
	$("#resourceInfo #id").val(id);
	if (pageType)
		assetPageType = pageType;
	if(pageType==3){
		 $("#resourceInfo_table thead tr th:nth-child(3)").each(function(){
		        $(this).remove();
		 });
	}
	if(pageType==5){
		$("#searchR").css('display','none');
	}
}

// 查询信息资源列表
function qryResInfoHandler()
{
	var orgName = $("#resourceInfo #name").val();
	var id = $("#resourceInfo #id").val();
	$("#resourceInfo .widget-title").html(
			"【" + orgName
					+ "】信息资源详情<span style=\"color:#FDFAAF\">（双击查看）</span>");
	var sharelvl = $("#sharelvl").val();
	var keptlvl = $("#keptlvl").val();
	var resName = $("#resName").val();
	var startDate = $("#startTime").val();
	var endDate = $("#endTime").val();
	var url = ampPreUrl+"/depInfoHandler/qryOneOrgOwnInfos";
	var data =
	{
		orgId : id,
		cateId : id,
		rootOrgId : rootOrgId,
		assetName : resName,
		pubLv : sharelvl,
		secLv : keptlvl,
		pubStartDate : startDate,
		pubEndDate : endDate
	};
	if (assetPageType == 4)// 根据资源分类查询信息资源
	{
		url = ampPreUrl+"/infoCatagoryHandler/qryCatagoryInfos";
	} 
	else if (assetPageType == 3)
	{
		url = ampPreUrl+"/themeViewHandler/queryAsset";
		data =
		{
			sdOrgId : id,
			oppOrgId : id,
			sbjId:sbjId
		}
	}
	else if(assetPageType == 5){
		url = ampPreUrl+"/orgViewHandler/qryBusiItemInfo";
		data = {
			busiId : id			
		};
	}
	$.ajax(
	{
		url : url,
		cache : false,
		dataType : "json",
		type : "post",
		data : data,
		success : function(data)
		{
			if(data.length>0){
				$.util.bindTableData("#resourceInfo_table", data);
				$('#resourceInfo_table tbody tr:eq(0)').addClass("on").siblings("tr").removeClass("on");
				$("#assetId").val(data[0].id);
				findDescribe();
				findGroup();				
			}
		}
	});
}

// 共享级别
function sharelvlHandler()
{
	var url = ampPreUrl+"/orgViewHandler/qryDictTableData";
	$.ajax(
	{
		url : url,
		cache : false,
		dataType : "json",
		type : "post",
		data :
		{
			table : "DICT_PUB_LV"
		},
		success : function(data)
		{
			var html = "";
			html += " <option value=''>请选择</option>";
			for (var i = 0; i < data.length; i++)
			{
				var item = data[i];

				html += " <option value='" + item.typ_cd + "'>" + item.typ_nm
						+ "</option>";
			}

			$("#sharelvl").html(html);
		}
	});
}

// 保密级别
function keptlvlHandler()
{
	var url = ampPreUrl+"/orgViewHandler/qryDictTableData";
	$.ajax(
	{
		url : url,
		cache : false,
		dataType : "json",
		type : "post",
		data :
		{
			table : "dict_secure_class"
		},
		success : function(data)
		{
			var html = "";
			html += " <option value=''>请选择</option>";
			for (var i = 0; i < data.length; i++)
			{
				var item = data[i];

				html += " <option value='" + item.typ_cd + "'>" + item.typ_nm
						+ "</option>";
			}

			$("#keptlvl").html(html);
		}
	});
}

// 查信息资源描述和组成
function findResource(e)
{
	$(this).addClass("on").siblings("tr").removeClass("on");
	var data = $(this).data("data");
	$("#assetId").val(data.id);
	findDescribe();
	findGroup();
}
// 资源描述
function findDescribe()
{
	var url = ampPreUrl+"/themeViewHandler/findAsset";
	var id = $("#assetId").val();
	$
			.ajax(
			{
				url : url,
				cache : false,
				dataType : "json",
				type : "post",
				data :
				{
					assetId : id
				},
				success : function(data)
				{
					var item = data
					$("#resourceInfo #resourceId").text(
							item.resourceid ? item.resourceid : "-");
					$("#resourceInfo #pubDt").text(
							item.pub_dt ? item.pub_dt : "-");
					$("#resourceInfo #assetNm").text(item.asset_name ? item.asset_name : "-");
					$("#resourceInfo #providerName").text(
							item.provider_name ? item.provider_name : "-");
					$("#resourceInfo #keyword").text(
							item.keyword ? item.keyword : "-");
					$("#resourceInfo #resOnline").text(
							item.res_online ? item.res_online : "-");
					$("#resourceInfo #archCateName").text(
							item.arch_cate_name ? item.arch_cate_name : "-");
					$("#resourceInfo #sbjName").text(
							item.sbj_name ? item.sbj_name : "-");
					$("#resourceInfo #pubName").text(
							item.pub_name ? item.pub_name : "-");
					$("#resourceInfo #secrName").text(
							item.secr_name ? item.secr_name : "-");
					$("#resourceInfo #subCatName").text(
							item.sub_cat_name ? item.sub_cat_name : "-");
					$("#resourceInfo #abstract").text(
							item.abstract ? item.abstract : "-");
				}
			});
}
// 资源组成
function findGroup()
{
	var url = ampPreUrl+"/depInfoHandler/qryEleByAsset";
	var id = $("#assetId").val();
	var name = $("#resourceInfo #searchInput").val();
	$.ajax(
	{
		url : url,
		cache : false,
		dataType : "json",
		type : "post",
		data :
		{
			assetId : id,
			eleName : name
		},
		success : function(data)
		{
			$.util.bindTableData("#group_table", data);
		}
	});
}

function busiCountHandler(field, data)
{   
	if(assetPageType==5){
		return "<a style='cursor: pointer;' onclick='backtraceHandler(\""
		+ data.id + "\")'>资源需求回溯</a>";
	}else{
		if (data[field] == "" || data[field] == null)
		{
			return "<span style='color:#c8c7c7'>资源需求回溯</span>";
		} else
		{
			return "<a style='cursor: pointer;' onclick='backtraceHandler(\""
					+ data.id + "\")'>资源需求回溯</a>";
		}
	}	
}

function backtraceHandler(id)
{
	$.app.openFullScreen(ampPreUrl+"/cvpAssetHandler/backtrace?assetId=" + id
			+ "&type=" + assetPageType);
}