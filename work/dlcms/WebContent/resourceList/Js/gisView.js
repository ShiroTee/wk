

var gisTree ;
function showGisTree(data) {
 // cacheTreeData = data;
   gisTree = new dTree('gisTree');
  var node = new Object();
  // 添加根节点
  gisTree.add(0, -1, '所有分类', '', '', '', '');
  node.index = 0;
  addGisNode(gisTree,node, data);
  $('#gisTreeDiv').html(gisTree.toString());
 // $('#gisTreeDiv').append(gisTree.toString());
  $('#gisTreeDiv a[title]').click(
      function() {
        var isRoot
        if ('sorgTree0' == $(this).attr('id')) {
          isRoot = "root";
        } else {
          isRoot = "notRoot";
        }
        loadAllGisResourceByType("",$(this).attr('title'), isRoot, "", "",showGisResourceForType);
      });

}
var gid = 0;
// 递归添加子节点
//递归添加子节点
function addGisNode(gisTree,node, data) {
  var currentNode;
  for ( var i = 0; i < data.length; i++) {
    currentNode = data[i];
    if (currentNode.parentId == node.id||currentNode.parentId=='') {
      currentNode.index = ++gid;
      gisTree.add(currentNode.index, node.index, currentNode.name, '#',
          currentNode.id, '', '');
      addNode(gisTree,currentNode, data);
    }
  }
}



function showGisResourceForType(data) {
  $("#gisTable>tbody").html("");
  var line, secrLv, publishTime;
  for ( var i = 0; i < data.length; i++) {

	var publishTime = (undefined == data[i].pubDate ? "-" : formatDate(data[i].pubDate,
			  formatRQ));
	var createTime = (undefined == data[i].createDate ? "-" : formatDate(
			  data[i].createDate, formatRQ));
	  
	var resAbstract = (undefined == data[i].resAbstract ? "-" : data[i].resAbstract);
	  
	var securityLevel;
	
	if(undefined==data[i].publicLv||'undefined'==data[i].publicLv)securityLevel='-';
	else securityLevel= data[i].publicLv.publicLvName;
	  
	line = '<tr target-index="' + data[i].resourceId
		        + '"><td><input type="checkbox" class="cb"></input></td><td><font target-index="' + data[i].resourceId+ '" color="blue" style="cursor:pointer">'
		        + data[i].resourceName + '</font></td><td>'
		        + data[i].provider.orgName + '</td><td>' + publishTime
		        + '</td><td>' + securityLevel + '</td></tr>';
			  
	$("#gisTable>tbody").append(line);
    
  }
  $('#gisTable>tbody>tr').find("font").click(function() {
    // 获取当前行的ID
    var id = $(this).attr('target-index');
    //alert(id)
    loadGisResourceDetail(id, showGisResoutceDetail);
    getGisWebService(id, showGisWebService);
    //getApi();
    var obj = $("#gisModelPanel");
    var x1 = ($(window).width() - obj.width()) / 2;
    var y1 = ($(window).height() - obj.height()) / 2-50;
    y1 = y1 > 50 ? y1 : 50;
    y1 = 180;
    obj.css("top", y1).css("left", x1);
    obj.show();
    $("#fade").show();
    // $('#modalTabMenu>li>a').eq(0).click();
  });
}
/**
 * 回调函数
 * 
 * @param data
 */
function showGisResoutceDetail(data) {
	
  data = data[0];
  var publishTime;
  var createTime = data.PublishTime.toString();
  createTime = createTime.substr(0,4)+"-"+createTime.substr(4,2)+"-"+createTime.substr(6,2);
  publishTime = createTime;
  $("#detailTable5>tbody").empty();
  
  var  line = "<tr><td>资源标题：</td><td>" + data.ResourceTitle + "</td>"
  +"<td>资源名称：</td><td>" + data.ResourceTarget + "</td>"
  +"<td>包含记录个数：</td><td>" + data.RecordCount + "</td>"
  +"</tr>"
  
  +"<tr><td>所属机构编码：</td><td>" + data.DepartmentID + "</td>"
  +"<td>所属机构名称：</td><td>" + data.DepartmentName + "</td>"
  +"<td>所属主题分类编码：</td><td>" + data.TopicCode + "</td>"
  +"</tr>"
  
  +"<tr><td>所属主题分类名称：</td><td>" + data.TopicName + "</td>"
  +"<td>安全限制分级代码：</td><td>" + data.SecurityCode + "</td>"
  +"<td>安全限制分级名称：</td><td>" + data.SecurityName + "</td>"
  +"</tr>"
  
  +"<tr><td>存储类型编码：</td><td>" + data.StorageCode + "</td>"
  +"<td>存储类型名称：</td><td>" + data.StorageName + "</td>"
  +"<td>行业分类标准编码：</td><td>" + data.DomainCode + "</td>"
  +"</tr>"
  
  
  +"<tr><td>行业分类标准名称：</td><td>" + data.DomainName + "</td>"
  +"<td>区划编码：</td><td>" + data.CityCode + "</td>"
  +"<td>区划名称：</td><td>" + data.CityName + "</td>"
  +"</tr>"
  
  +"<tr><td>样式名称：</td><td>" + data.StyleName + "</td>"
  +"<td>图标文件：</td><td>" + data.Icon + "</td>"
  +"<td>最佳观测点：</td><td>" + data.LookAt + "</td>"
  +"</tr>"
  
  +"<tr><td>可见距离：</td><td>" + data.MaxVisibleDistance + "</td>"
  +"<td>数据发布时间：</td><td colspan='3'>" + publishTime + "</td>"
  +"</tr>"
  
  +"<tr><td>链接地址：</td><td colspan='5'>" + data.LinkURL + "</td>"
  +"</tr>"
  
  +"<tr><td>坐标范围：</td><td colspan='5'>" + data.Envelope.MinX+","+data.Envelope.MaxX+","+data.Envelope.MinY+","+data.Envelope.MaxY + "</td>"
  +"</tr>"
  
  +"<tr><td>覆盖范围：</td><td colspan='5'>" + data.ResourceCoverage+ "</td>"
  +"</tr>"
  
  +"<tr><td>摘要：</td><td colspan='5'>" + data.ResourceAbstract + "</td>"
  +"</tr>"
  
  +"<tr><td>关键字：</td><td colspan='5'>" + data.ResourceKeywords + "</td>"
  +"</tr>";
  
  $("#detailTable5>tbody").append(line);
}

/**
 * 回调函数
 * 
 * @param data
 */
function showGisWebService(data) {
  var line, item, status;
  $("#detailTable6>tbody").empty();
  for ( var i = 0; i < data.list.length; i++) {
    item = data.list[i];
    status = item.routeStatus == 1 ? "正常" : "不可用";
    line = '<tr><td>'
        + item.routeName
        + '</td><td>'
        + item.routeType
        + '</td>'
//        +'<td>'
//        + '<div class="tooltips" style="height:30px"><font color="blue" style="cursor:pointer">查看</font>'
//        + '<span>'
//        + item.prxoyURL
//        + '</span></div>'
//        + '</td>'
        +'<td>'
        + '<div class="tooltips" style="height:30px"><font color="blue" style="cursor:pointer">查看</font>'
        + '<span>' + item.showURL + '</span></div>' + '</td><td>'
        + formatDate(item.publishDate, formatRQ) + '</td><td>'
        + status + '</td></tr>';
    $("#detailTable6>tbody").append(line);
  }
}


function loadGisTree(callback) {
  var requestUrl = '/getGisTree.jspx';
  $.ajax({
    url : requestUrl,
//    dataType : 'jsonp',
//    jsonp : "jsonpcallback",
    async: false,
    success : function(data) {
      callback(data)
    },
    error : function(response) {
      alert('ERROR : ' + response.statusText);
    },
    timeout : 6000
  });
}


function pageGisSkipType(start,pageSize,totalRecords,herfUrl,typId, isRoot, secrLv, assetName, callback,methodFlag,zymc){
	
	var totalRecords = totalRecords;//总记录数
	var totalPage =(totalRecords+(pageSize-1))/pageSize;//总页数
	var pageNo = start; //开始页	 
	if (!pageNo) { pageNo = 1;}
	 
	kkpagerGis.init({
		
		pno: pageNo,
		total: totalPage,//总页码
		totalRecords: totalRecords,//总数据条数
		/*lang : {
			firstPageText : '首页',
			lastPageText : '尾页',
			prePageText : '上一页',
			nextPageText : '下一页',
			totalPageBeforeText : '共',
			totalPageAfterText : '页',
			totalRecordsAfterText : '条数据',
			gopageBeforeText : '转到',
			gopageButtonOkText : '确定',
			gopageAfterText : '页',
			buttonTipBeforeText : '第',
			buttonTipAfterText : '页'
			},*/
		mode : 'click',
		click : function(n){
		//选择右边树，类型查询
		if(methodFlag==1)
		{
			loadAllGisResourceByType(n,typId, isRoot, secrLv, assetName, callback);
		}
		//点击搜索按钮查询
		if(methodFlag==2)
		{
			qryAllGisResource('',zymc,n,typId, isRoot, secrLv, assetName, callback);
		}	
		  	return false;
		}
		
	});
	kkpagerGis.generPageHtml();
	$("#kkpagerGis").show();
}

function loadAllGisResourceByType(start,typId, isRoot, secrLv, assetName, callback) {
	
	$("#zymc").val("");
	 var requestUrl ="/getResourseForTree.jspx";
//	  if (start) {
//		  var startID=(start-1)*pageSize+1
//		  requestUrl = getCookie('sUrl') + 'resourceCatalogueInfoHandler/getResourceByType?resourceName='+assetName+'&typId='+typId+'&isRoot='+isRoot+'&secrLv='+secrLv+'&limit='+pageSize+'&start='+startID;
//	  }
	
/*	
	var requestUrl = getCookie('sUrl')
      + 'resourceCatalogueInfoHandler/getResourceByType';
  var param = {
    start :begin,
    limit : end,
    typId : typId, // typeId
    isRoot : isRoot,
    secrLv : secrLv,// 保密级别
    resourceName : assetName
  // 指定资源名称(完全匹配 非 like)
  };
  */
	 
	 var param = {
			 topicCode : typId
			  };
	 
  $.ajax({
    url : requestUrl,
//    dataType : 'jsonp',
//    jsonp : "jsonpcallback",
    data : param,
    async: false,
    success : function(data) {
    	
    	 //if (data.count) {
       	  
	  if(data.length==0)
	  {
		  $("#gisTable>tbody").html("<tr><td colspan=\"5\">没有找到相应的数据</td></tr>");
		  $("#kkpagerGis").hide();
	  }
	  else
	  {
		  var counts = data.length;
		  
		  if(""==start)start = 1;
		  
		  data = data.slice((start-1)*pageSize,start*pageSize);
		  
		  callback(data);
		  
		  pageGisSkipType(start,pageSize,counts,requestUrl,typId, isRoot, secrLv, assetName, callback,1,'');
	  }
    	   //pageSkipType(start,pageSize,data.count,requestUrl,typId, isRoot, secrLv, assetName, callback);
    	 //} else {
    	//	 $("#itemTable>tbody").html("<tr><td colspan=\"5\">没有找到相应的数据</td></tr>");	  
    	 //}
    },
    error : function(response) {
      alert(response);
    },
    timeout : 6000
  });
}



function qryAllGisResource(bmjb,zymc,start,typId, isRoot, secrLv, assetName, callback) {
	
	 var requestUrl ="/getResourseForQry.jspx";
	 var param = {
			 //bmjb : bmjb,
			 zymc : zymc
			  };
	 
  $.ajax({
    url : requestUrl,
//    dataType : 'jsonp',
//    jsonp : "jsonpcallback",
    data : param,
    async: false,
    success : function(data) {
	  if(data.length==0)
	  {
		  $("#gisTable>tbody").html("<tr><td colspan=\"5\">没有找到相应的数据</td></tr>");
		  $("#kkpagerGis").hide();
	  }
	  else
	  {
		  var counts = data.length;
		  
		  if(""==start)start = 1;
		  
		  data = data.slice((start-1)*pageSize,start*pageSize);
		  
		  callback(data);
		  
		  pageGisSkipType(start,pageSize,counts,requestUrl,typId, isRoot, secrLv, assetName, callback,2,zymc);
	  }
    },
    error : function(response) {
      alert(response);
    },
    timeout : 6000
  });
}


function loadGisResourceDetail(assetId, callback) {
  var requestUrl = "/getResourseInfo.jspx";
  var param = {
    resourceId : assetId
  };
  $.ajax({
    url : requestUrl,
//    dataType : 'jsonp',
//    jsonp : "jsonpcallback",
    data : param,
    success : function(data) {
      callback(data);
    },
    error : function(response) {
      alert(response);
    },
    timeout : 6000
  });
}

function getApi() {
	if($('#detailTable7').attr('src')== undefined)$('#detailTable7').attr('src', '/r/cms/api/api.htm');
}

function getGisWebService(assetId, callback) {
	//测试
	//assetId = '_8syOADXeEeK9vMEmsnhQvA';
  var requestUrl = getURL()
      + 'serviceInfoHandler/getWebServiceByResourceId';
  var param = {
	start : 0,
	limit : 100,
    resourceId : assetId
  // asset_Id
  };
  $.ajax({
    url : requestUrl,
    dataType : 'jsonp',
    jsonp : "jsonpcallback",
    data : param,
    success : function(data) {
	  callback(data);
    },
    error : function(response) {
      alert(response);
    },
    timeout : 6000
  });
}

