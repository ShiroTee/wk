

var  typeTree;
function showTypeTree(data) {
	
  typeTree = new dTree('typeTree');
  var node;
  // 添加根节点
  typeTree.add(0, -1, '大理市政府','#',' ','','');
  for ( var i = 0; i < data.length; i++) {
    node = data[i];
    if (node.orgCode == '00') {
      node.index = 0;
      addTypeNode(typeTree,node, data);
    }
  }
  $('#orgTreeDiv').html(typeTree.toString());
  $('#orgTreeDiv a[title]').click(function() {
    loadAllResourceByOrg("",$(this).attr('title'), "", "", showResourceForOrg);
  });
}

var gid1 = 0;
// 递归添加子节点
function addTypeNode(typeTree,node, data) {
  var currentNode;
  for ( var i = 0; i < data.length; i++) {
    currentNode = data[i];
    if (currentNode.orgPid == node.orgId) {
      currentNode.index = ++gid1;
      typeTree.add(currentNode.index, node.index, currentNode.orgName, '#',
              currentNode.orgId, '', '');
      addTypeNode(typeTree,currentNode, data);
    }
  }
}



function showResourceForOrg(data) {
  $("#orgitemTable>tbody").empty();
  var line, secrLv, publishTime;
  var totalQuantity = data.count;
  for ( var i = 0; i < data.list.length; i++) {
    /*if ("0" == data.list[i].secrLv) {
      secrLv = "公开";
    } else if ("1" == data.list[i].secrLv) {
      secrLv = "需要申请";
    } else {
      secrLv = "保密";
    }*/
	  
	secrLv=(undefined == data.list[i].publicLv? "-" :data.list[i].publicLv.publicLvName);
	  
    publishTime = (undefined == data.list[i].pubDate ? "-" : formatDate(
        data.list[i].pubDate, formatRQ));
   
    line = '<tr target-index="' + data.list[i].resourceId
    + '"><td><input type="checkbox" class="cb"></input></td><td><font target-index="' + data.list[i].resourceId+ '" color="blue" style="cursor:pointer">'
    + data.list[i].resourceName + '</font></td><td>'
    + data.list[i].provider.orgName + '</td><td>' + publishTime
    + '</td><td>' + secrLv + '</td></tr>';
    
    $("#orgitemTable>tbody").append(line);
  }
  $('#orgitemTable>tbody>tr').find("font").click(function() {
	    // 获取当前行的ID
	    var id = $(this).attr('target-index');
	    loadResourceDetail(id, showResoutceDetail);
	    loadEntity(id, showEntity);
	    getFiles(id, showFile);
	    getWebService(id, showWebService);
	    var obj = $("#modelPanel");
	    var x1 = ($(window).width() - obj.width()) / 2;
	    var y1 = ($(window).height() - obj.height()) / 2;
	    y1 = y1 > 50 ? y1 : 50;
	    y1 = 180;
	    obj.css("top", y1).css("left", x1);
	    obj.show();
	    $("#fade").show();
	    // $('#modalTabMenu>li>a').eq(0).click();
	  });
}


function loadAllOrgForTree(callback) {
  var requestUrl = getURL()
      + 'organizationHandler/loadAllOrganization';
  
  $.ajax({
    url : requestUrl,
    dataType : 'jsonp',
    jsonp : "jsonpcallback",
    success : function(data) {
      callback(data)
    },
    error : function(response) {
      alert(response);
    },
    timeout : 6000
  });
}


function pageSkipOrg(start,pageSize,totalRecords,herfUrl,orgId, secrLv, assetName, callback){
	
	var totalRecords = totalRecords;//总记录数
	var totalPage =(totalRecords+(pageSize-1))/pageSize;//总页数
	var pageNo = start; //开始页	 
	if (!pageNo) { pageNo = 1;}
	 
	kkpagerOrg.init({
		 
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
			},
			*/
		mode : 'click',
		click : function(n){
			loadAllResourceByOrg(n,orgId, secrLv, assetName, callback)
		  	return false;
		}
		
	});
	kkpagerOrg.generPageHtml()
	$("#kkpagerOrg").show();
}

function loadAllResourceByOrg(start,orgId, secrLv, assetName, callback) {
	
	 $("#zymcOrg").val("");
	 var requestUrl = getURL() + 'resourceHandler/queryByOrgIdByJsonp?orgId='+orgId+'&secrLv='+secrLv+'&resourceName='+assetName+'&limit='+pageSize+'&start=0';
	  if (start) {
		  var startID=(start-1)*pageSize
		  requestUrl = getURL() + 'resourceHandler/queryByOrgIdByJsonp?orgId='+orgId+'&secrLv='+secrLv+'&resourceName='+assetName+'&limit='+pageSize+'&start='+startID;
	  }
	  $("#orgitemTable>tbody").html("<tr><td colspan=\"5\">"+requestUrl+"</td></tr>");	  
/*	
  var requestUrl = getURL() + 'resourceHandler/queryByOrgIdByJsonp';
  if(orgId==undefined){
    orgId='No orgId';
  }
  var param = {
	start : begin,
	limit : end,
    orgId : orgId, // orgID
    secrLv : secrLv,// 保密级别
    resourceName : assetName
  // 指定资源名称(完全匹配 非 like)
  };
  */
  $.ajax({
    url : requestUrl,
    dataType : 'jsonp',
    jsonp : "jsonpcallback",
    // data : param,
    success : function(data) {
    	if (data.count) {
     	  callback(data);
      	  pageSkipOrg(start,pageSize,data.count,requestUrl,orgId, secrLv, assetName, callback);
     	 } else {
     		$("#kkpagerOrg").hide();
     		$("#orgitemTable>tbody").html("<tr><td colspan=\"5\">没有找到相应的数据</td></tr>");	  
     	 }
    },
    error : function(response) {
        alert(response);
    },
    timeout : 6000
  });
}

  