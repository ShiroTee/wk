function pageSearch(start,pageSize,totalRecords,type){
	
	var totalRecords = totalRecords;//总记录数
	var totalPage =(totalRecords+(pageSize-1))/pageSize;//总页数
	var pageNo = start; //开始页	 
	if (!pageNo) { pageNo = 1;}
	
	 if(1==type){
		 
		 kkpagerOrg.init({
				pno: pageNo,
				total: totalPage,//总页码
				totalRecords: totalRecords,//总数据条数
				mode : 'click',
				click : function(n){
					search(n,type);
				  	return false;
				}
				
			});
		 kkpagerOrg.generPageHtml();
		 $("#kkpagerOrg").show();
		 
	 } else if(2==type){
		 kkpager.init({
				pno: pageNo,
				total: totalPage,//总页码
				totalRecords: totalRecords,//总数据条数
				mode : 'click',
				click : function(n){
					search(n,type);
				  	return false;
				}
				
			});
		 kkpager.generPageHtml();
		 $("#kkpager").show();
	 }
	
}

function search(start,type) {
  
  
  $("#kkpager").hide();
  $("#kkpagerOrg").hide();
  var kw;
  if(1==type)
  {
	  kw = $("#zymcOrg").val();
	  //$("#orgitemTable>tbody").html("");
  }
  else if(2==type)
  {
	  kw = $("#zymcType").val(); 
	 // $("#itemTable>tbody").html("");
  }
  if (kw) {
       
      var requestUrl = getURL() + 'resourceCatalogueInfoHandler/queryByAssetName?kw='+kw+'&limit='+pageSize+'&start=0';
	  if (start) {
		  var startID=(start-1)*pageSize
		  requestUrl = getURL() + 'resourceCatalogueInfoHandler/queryByAssetName?kw='+kw+'&limit='+pageSize+'&start='+startID;
	  }
		  
    $.ajax(requestUrl, {
      dataType : 'jsonp',
      jsonp : "jsonpcallback",
     // data : param,
      success : function(data) {
        if (data.count) {
        	 if(1==type){
        		 
        		showResourceForOrg(data);
              	pageSearch(start,pageSize,data.count,type);
             
               /* $("#orgitemTable>tbody>tr").each(function() {
                  var nodeTd=$(this).children().eq(1);
                  $(nodeTd).html(
                    $(nodeTd).text().replace(new RegExp(kw, 'g'),'<span style="color:red;font-weight:bold">' + kw + '</span>'));
                  });*/
        		 
        		 
        	 }else if(2==type){
        		 
        		showResourceForType(data);
             	pageSearch(start,pageSize,data.count,type);
            
              /* $("#itemTable>tbody>tr").each(function() {
                 var nodeTd=$(this).children().eq(1);
                 $(nodeTd).html(
                   $(nodeTd).text().replace(new RegExp(kw, 'g'),'<span style="color:red;font-weight:bold">' + kw + '</span>'));
                 });*/
        	 }
        	
        }
        else{
        	if(1==type)
        	  $("#orgitemTable>tbody").html("<tr><td colspan=\"5\">没有找到相应的数据</td></tr>");
            else if(2==type)
              $("#itemTable>tbody").html("<tr><td colspan=\"5\">没有找到相应的数据</td></tr>");
        }
      },
      error : function(response) {
        alert(response);
      }
    });
  } else {
    alert('请填写需要搜索的资源目录名称!');
  }
}

function submitForm(callback) {
  var requestUrl = getURL() + 'approvalHandler/applyBatch';
  
  if ( $('#formComment').val()=='请在此填写本次申请的资源用于支撑的系统、平台或业务，并填写本次申请的资源拟进行数据的方式和频率。')
	  $('#formComment').val("");
  
  var param = {
    proposerId : $('#formUserID').val(),
    userPhone : $('#formPhone').val(),
    comment: $('#formComment').val(),
    appliedList : $('#formNames').attr('ids')
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
    timeout : 15000
  });
}
function showResult(data) {
  if(data.success){
    alert('提交成功!');
    $('#applicationPanel').hide();
    $("#fade").hide();
  }else{
    alert('提交失败: '+data.msg);
  }
}
function applyMultiple() {
  var applyIDs = [];
  var applyNames = [];
  var namesString = '';
  $('.cb').each(function() {
    if ($(this).prop("checked")) {
      applyIDs.push($(this).parent().parent().attr('target-index'));
      applyNames.push($(this).parent().next().text());
      namesString += $(this).parent().next().text() + '\n';
    }
  });
  if (applyIDs.length == 0) {
    alert('请选择信息资源!');
  } else {
    $('#formNames').val(namesString);
    $('#formNames').attr('ids', applyIDs.toString());
    $('#formUserID').val(userId);// 登陆用户的ID
    $('#userloginName').val(userloginName);// 登陆用户的组织机构
    $('#formPhone').val(phone);
    $('#formComment').val('请在此填写本次申请的资源用于支撑的系统、平台或业务，并填写本次申请的资源拟进行数据的方式和频率。');
    $('#formComment').css('color','#999');
    
    var obj = $("#applicationPanel");
    var x1 = ($(window).width() - obj.width()) / 2;
    var y1 = ($(window).height() - obj.height()) / 2;
    y1 = y1 > 50 ? y1 : 50;
    obj.css("top", y1).css("left", x1);
    obj.show();
    $("#fade").show();
  }
}
var orgTree ;
function showTree(data) {
 // cacheTreeData = data;
   orgTree = new dTree('orgTree');
  var node = new Object();
  // 添加根节点
  orgTree.add(0, -1, '主题分类', '#', 'ZT', '', '');
  node.index = 0;
  addNode(orgTree,node, data);
  $('#typeTreeDiv').html(orgTree.toString());
 // $('#typeTreeDiv').append(orgTree.toString());
  $('#typeTreeDiv a[title]').click(
      function() {
        var isRoot
        if ('sorgTree0' == $(this).attr('id')) {
          isRoot = "root";
        } else {
          isRoot = "notRoot";
        }
        loadAllResourceByType("",$(this).attr('title'), isRoot, "", "",showResourceForType);
      });

}
var gid = 0;
// 递归添加子节点
function addNode(orgTree,node, data) {
  var currentNode;
  for ( var i = 0; i < data.length; i++) {
    currentNode = data[i];
    if (currentNode.parentId == node.id) {
      currentNode.index = ++gid;
      orgTree.add(currentNode.index, node.index, currentNode.name, '#',
          currentNode.id, '', '');
      addNode(orgTree,currentNode, data);
    }
  }
}

function showResourceForType(data) {
  $("#itemTable>tbody").html("");
  var line, secrLv, publishTime;
  var totalQuantity = data.count;
  for ( var i = 0; i < data.list.length; i++) {
   /* if ("0" == data.list[i].secrLv) {
      secrLv = "公开";
    } else if ("1" == data.list[i].secrLv) {
      secrLv = "需要申请";
    } else {
      secrLv = "保密";
    }
	  secrLv= data.list[i].publicLv.publicLvName;*/
	  secrLv=(undefined == data.list[i].publicLv? "-" :data.list[i].publicLv.publicLvName); 
	  
    publishTime = (undefined == data.list[i].pubDate ? "-" : formatDate(
        data.list[i].pubDate, formatRQ));
    line = '<tr target-index="' + data.list[i].resourceId
        + '"><td><input type="checkbox" class="cb"></input></td><td><font target-index="' + data.list[i].resourceId+ '" color="blue" style="cursor:pointer">'
        + data.list[i].resourceName + '</font></td><td>'
        + data.list[i].provider.orgName + '</td><td>' + publishTime
        + '</td><td>' + secrLv + '</td></tr>';
    $("#itemTable>tbody").append(line);
  }
  $('#itemTable>tbody>tr').find("font").click(function() {
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
/**
 * 回调函数
 * 
 * @param data
 */
function showResoutceDetail(data) {
 $("#gxrq").html("更新频率");
  data = data[0];
  var publishTime = (undefined == data.pubDate ? "-" : formatDate(data.pubDate,
		  formatRQ));
  var createTime = (undefined == data.updateRate ? "-" : getUpdateRate(data.updateRate));
  
  var resAbstract = (undefined == data.resAbstract ? "-" : data.resAbstract);
  
  var applyQuantity = (undefined == data.applyQuantity ? "-" : data.applyQuantity);
  
  var securityLevel;
  /*if ("0" == data.secrLv) {
    securityLevel = "公开";
  } else if ("1" == data.secrLv) {
    securityLevel = "需要申请";
  } else {
    securityLevel = "保密";
  }
  
  securityLevel= data.publicLv.publicLvName;*/
  
  securityLevel=(undefined == data.publicLv? "-" :data.publicLv.publicLvName);
  
  $("#detailTable4>tbody").empty();
  
  var  line = '<tr><td>' + data.resourceName + '</td><td>' + data.provider.orgName
  + '</td><td>' + publishTime + '</td><td>' + createTime
  + '</td><td>' + securityLevel + '</td><td>' +resAbstract
  + '</td><td>' + applyQuantity 
  + '</td></tr>';
  $("#detailTable4>tbody").append(line);
  
}
/**
 * 回调函数
 * 
 * @param data
 */
function showEntity(data) {
  var line, item;
  $("#detailTable2>tbody").empty();
  for ( var i = 0; i < data.list.length; i++) {
	   
    item = data.list[i];
    var decLength = (undefined == item.decLength ? "-" :item.decLength);
    
    line = '<tr><td>' + item.field.fieldName + '</td><td>' + item.field.pyName
        + '</td><td>' + item.field.dataType
       /* + '</td><td>' + item.dataLength + '</td><td>' + decLength*/
        + '</td></tr>';
    $("#detailTable2>tbody").append(line);
  }
}
/**
 * 回调函数
 * 
 * @param data
 */
function showFile(data) {
  var line, item;
  var downloadLink; //新增变量 
  $("#detailTable3>tbody").empty();
  for ( var i = 0; i < data.list.length; i++) {
    item = data.list[i];
    
    
    var downUrl="#";
    if(undefined != item.showURL&&""!=item.showURL)
    {
    	downUrl=item.showURL+"?authKey="+authKey+"&timestamp="+new Date().getTime();
    }
    
    
    
    var fileSizef = (undefined == item.fileSizef? "-" :item.fileSizef);
    
    if(""==item.publishURL){      
    	downloadLink='<span style="color:#707070">无法下载,需要申请</span>';     
    }else{      
    	downloadLink='<a href="'+downUrl+'"><font color="blue" style="cursor:pointer">下载</font></a>';    
    } 

    
    line = '<tr><td>' + item.fileName + '</td><td>'
        + item.fileName.substring(item.fileName.lastIndexOf("."))
        + '</td><td>' + fileSizef + '</td><td>'
        + formatDate(item.publishDate, formatRQ) + '</td><td>'
        + downloadLink  + '</td></tr>';
    $("#detailTable3>tbody").append(line);
  }
}
/**
 * 回调函数
 * 
 * @param data
 */
function showWebService(tempUrl,data) {
  var line, item, status,linkUrl,auth;
  $("#detailTable1>tbody").empty();
 
  for ( var i = 0; i < data.list.length; i++) {
 
    item = data.list[i];
    status = item.routeStatus == 1 ? "正常" : "不可用";
    
    auth= item.isAuth == 1 ? "授权访问" : "公开访问"


    
    linkUrl=tempUrl+'/app/http/sps/serviceInfoHandler/getAPIDetails?checkSession=false&routeId='+item.routeId;
    line = '<tr><td>'
        + item.routeName
        + '</td><td>'
        + item.routeType
        + '</td><td>'
       /* + '<div class="tooltips" style="height:30px"><font color="blue" style="cursor:pointer">查看</font>'
        + '<span>'
        + item.prxoyURL
        + '</span></div>'
        + '</td><td>' 
        + '<div class="tooltips" style="height:30px"><font color="blue" style="cursor:pointer">查看</font>'
        + '<span>' + item.showURL + '</span></div>'*/ + '<font color="blue" style="cursor:pointer" onclick=openServiceLink("'+linkUrl+'") >查看</font></td><td>'
        + formatDate(item.publishDate, formatRQ) + '</td><td>'+ status + '</td><td>'
        + auth+ '</td></tr>';
    $("#detailTable1>tbody").append(line);
  }
}
/////////////////////
function openServiceLink(link){
	
	document.getElementById("serviceLink").src=link;
	var obj = $("#serviceLinkWindow");
	var x1 = ($(window).width() - obj.width()) / 2;
	var y1 = ($(window).height() - obj.height()) / 2 - 50;
	y1 = y1 > 50 ? y1 : 50;
	y1 = 180;
	obj.css("top", y1).css("left", x1);
	obj.show();
	$("#serviceLinkFade").show();
}

 
////////////////


function loadTypeTree(callback) {
  var requestUrl = getURL() + 'serviceCatalogHandler/loadAllZT';
  $.ajax({
    url : requestUrl,
    dataType : 'jsonp',
    jsonp : "jsonpcallback",
    success : function(data) {
      callback(data)
    },
    error : function(response) {
      alert('ERROR : ' + response.statusText);
    },
    timeout : 6000
  });
}


function pageSkipType(start,pageSize,totalRecords,herfUrl,typId, isRoot, secrLv, assetName, callback){
	
	var totalRecords = totalRecords;//总记录数
	var totalPage =(totalRecords+(pageSize-1))/pageSize;//总页数
	var pageNo = start; //开始页	 
	if (!pageNo) { pageNo = 1;}
	 
	kkpager.init({
		
		pno: pageNo,
		total: totalPage,//总页码
		totalRecords: totalRecords,//总数据条数
		mode : 'click',
		click : function(n){
			loadAllResourceByType(n,typId, isRoot, secrLv, assetName, callback);
		  	return false;
		}
		
	});
	kkpager.generPageHtml();
	$("#kkpager").show();
}

function loadAllResourceByType(start,typId, isRoot, secrLv, assetName, callback) {
  
	 
	 $("#zymcType").val("");
	 
	 
	 var requestUrl = getURL() + 'resourceCatalogueInfoHandler/getResourceByType?resourceName='+assetName+'&typId='+typId+'&isRoot='+isRoot+'&secrLv='+secrLv+'&limit='+pageSize+'&start=0';
	  if (start) {
		  var startID=(start-1)*pageSize
		  requestUrl = getURL() + 'resourceCatalogueInfoHandler/getResourceByType?resourceName='+assetName+'&typId='+typId+'&isRoot='+isRoot+'&secrLv='+secrLv+'&limit='+pageSize+'&start='+startID;
	  }
 
  $.ajax({
    url : requestUrl,
    dataType : 'jsonp',
    jsonp : "jsonpcallback",
    //data : param,
    success : function(data) {
    	
    	 if (data.count) {
       	  
    	   callback(data);
    	        
    	   pageSkipType(start,pageSize,data.count,requestUrl,typId, isRoot, secrLv, assetName, callback);
    	 } else {
    		
    		 $("#itemTable>tbody").html("<tr><td colspan=\"5\">没有找到相应的数据</td></tr>");	
    		 $("#kkpager").hide();
    	 }
    	
    	
    	
     
    },
    error : function(response) {
      alert(response);
    },
    timeout : 6000
  });
}

function loadResourceDetail(assetId, callback,urlhead) {
	

	var requestUrl;
	if (urlhead != undefined) {
		requestUrl = urlhead + "resourceCatalogueInfoHandler/getResourceDetailWithStatistics";
	} else {
		requestUrl = getURL()
				+ 'resourceCatalogueInfoHandler/getResourceDetailWithStatistics';
	}
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

function loadEntity(assetId, callback,urlhead) {
	

	var requestUrl;
	if (urlhead != undefined) {
		//requestUrl = urlhead + "metaInfoHandler/getMetaInfoByResourceId";
		requestUrl = urlhead + "metaInfoHandler/getPublishedMetaInfoByResourceId";
	} else {
		//requestUrl = getURL() + 'metaInfoHandler/getMetaInfoByResourceId';
		requestUrl = getURL() + 'metaInfoHandler/getPublishedMetaInfoByResourceId';
	}
   
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
     // if(data.success)
        callback(data);
    },
    error : function(response) {
      alert(response);
    },
    timeout : 6000
  });
}

function getFiles(assetId, callback,urlhead) {
	var requestUrl;
	if (urlhead != undefined) {
		requestUrl = urlhead + "serviceInfoHandler/getFileServiceByResourceId";
	} else {
		requestUrl = getURL() + 'serviceInfoHandler/getFileServiceByResourceId';
	}
   
  var param = {
	start : 0,
    limit : 100,
    resourceId : assetId,
    userId:userId
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

function getWebService(assetId, showWebService,urlhead) {
	 
	var requestUrl,tempUrl;
	if (urlhead != undefined) {
		requestUrl = urlhead + "/service/api/sps/serviceInfoHandler/getWebServiceByResourceId";
		tempUrl=urlhead;
	} else {
		requestUrl = getURL() + 'serviceInfoHandler/getWebServiceByResourceId';
		tempUrl=platformAddt;
	}
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
      showWebService(tempUrl,data);
    },
    error : function(response) {
      alert(response);
    },
    timeout : 6000
  });
}

function getUpdateRate(i) {
	  var x
	  switch (i) {
	  case 0:
	    x = '实时';
	    break;
	  case 1:
	    x = '日';
	    break;
	  case 2:
	    x = '半月';
	    break;
	  case 3:
	    x = '月';
	    break;
	  case 4:
	    x = '季';
	    break;
	  case 5:
	    x = '半季';
	    break;
	  case 6:
	    x = '年';
	    break;
	  case 7:
	    x = '半年';
	    break;
	  default:
	    x='-';
	  }
	  return x;
	}

//应用描述查看信息类
function searchInitData(type) {


    $("#kkpager").hide();
    $("#kkpagerOrg").hide();

        var requestUrl = getURL() + 'resourceCatalogueInfoHandler/queryByAssetName?kw='+type+'&limit='+pageSize+'&start=0';

        $.ajax(requestUrl, {
            dataType : 'jsonp',
            jsonp : "jsonpcallback",
            // data : param,
            success : function(data) {
                if (data.count) {
                    showResourceForOrg(data);
                    pageSearch(0,pageSize,data.count,1);
                }
                else{
                    $("#orgitemTable>tbody").html("<tr><td colspan=\"5\">没有找到相应的数据</td></tr>");
                }
            },
            error : function(response) {
                alert(response);
            }
        });
}