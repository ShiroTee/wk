var cacheData;
var cacheTreeData;
var orgTree = new dTree('orgTree');
var gid = 0;
$(function() {
  $('#modalTabMenu>li>a').click(function() {
    $('#modalTabMenu>li.active').removeClass('active');
    $(this).parent().addClass('active');
    var showCardId = $(this).attr('card');
    $('#cardPanel').children().hide();
    $('#card' + showCardId).show();
  });
  loadTypeTree(showTree);
  // loadAllResourceByType("_L7yE8OznEeGGd9tXrm-Mbg","","",showResourceForOrg);
  // loadResourceDetail("_D-w3wDN3EeKCG_THlh7j3g",showResoutceDetail);
  // loadEntity("_D-w3wDN3EeKCG_THlh7j3g",showEntity);
  // getWebService("_D-w3wDN3EeKCG_THlh7j3g", showWebService);
});
function showTree(data) {
  cacheTreeData=data;
  var node=new Object();
  // 添加根节点
  orgTree.add(0, -1, '主题分类','#','ZT','','');
  node.index=0;
  addNode(node, data);
  $('#typeTreeDiv').append(orgTree.toString());
  $('#typeTreeDiv a[title]').click(function() {
    var isRoot
    if('sorgTree0'==$(this).attr('id')){
      isRoot="root";
    }else{
      isRoot="notRoot";
    }
    loadAllResourceByType($(this).attr('title'),isRoot, "", "", showResourceForType);
  });
  
}
// 递归添加子节点
function addNode(node, data) {
  var currentNode;
  for ( var i = 0; i < data.length; i++) {
    currentNode = data[i];
    if (currentNode.parentId == node.id) {
      currentNode.index = ++gid;
      orgTree.add(currentNode.index, node.index, currentNode.name, '#',
          currentNode.id, '', '');
      addNode(currentNode, data);
    }
  }
}

function showResourceForType(data) {
  $("#itemTable>tbody").empty();
  var line, secrLv, publishTime;
  var totalQuantity = data.count;
  for ( var i = 0; i < data.list.length; i++) {
    if ("0" == data.list[i].secrLv) {
      secrLv = "公开";
    } else if ("1" == data.list[i].secrLv) {
      secrLv = "需要申请";
    } else {
      secrLv = "保密";
    }
    publishTime = (undefined == data.list[i].pubDate ? "-" : formatDate(
        data.list[i].pubDate, "YYYY-MM-DD hh:mm:ss"));
    line = '<tr><td>'
        + (i + 1)
        + '</td><td>'
        + data.list[i].resourceName
        + '</td><td>'
        + publishTime
        + '</td><td>'
        + secrLv
        + '</td><td><button number="'
        + i
        + '" class="btn btn-primary btn-xs btn_detail" data-toggle="modal" target-index="'
        + data.list[i].resourceId
        + '" data-target="#myModal"><span class="glyphicon glyphicon-list"></span>&nbsp;查看</button></td></tr>';
    $("#itemTable>tbody").append(line);
  }
  $('.btn_detail').click(function() {
    var id = $(this).attr('target-index');
    loadResourceDetail(id, showResoutceDetail);
    loadEntity(id, showEntity);
    getFiles(id, showFile);
    getWebService(id, showWebService);
    $('#modalTabMenu>li>a').eq(0).click();
  });
}
/**
 * 回调函数
 * @param data
 */
function showResoutceDetail(data) {
  data=data[0];
  var publishTime = (undefined == data.pubDate ? "-" : formatDate(
      data.pubDate, "YYYY-MM-DD hh:mm:ss"));
  var createTime = (undefined == data.createDate ? "-" : formatDate(
      data.createDate, "YYYY-MM-DD hh:mm:ss"));
  var securityLevel;
  if ("0" == data.secrLv) {
    securityLevel = "公开";
  } else if ("1" == data.secrLv) {
    securityLevel = "需要申请";
  } else {
    securityLevel = "保密";
  }
  $('#card1 #assetName').val(data.resourceName);
  $('#card1 #providerOrg').val(data.provider.orgName);
  $('#card1 #publishDate').val(publishTime);
  $('#card1 #createDate').val(createTime);
  $('#card1 #securityLevel').val(securityLevel);
  $('#card1 #serveTarget').val('-');
  $('#card1 #keyword').val('-');
  $('#card1 #description').val(data.resAbstract);
  $('#card1 #comment').val('-');
}
/**
 * 回调函数
 * @param data
 */
function showEntity(data) {
  var line,item;
  $("#fieldTable>tbody").empty();
  for(var i=0;i<data.list.length;i++){
    item=data.list[i];
    line='<tr><td>'
      +item.field.fieldName
      +'</td><td>'
      +item.field.pyName 
      +'</td><td>'
      +item.field.fieldId
      +'</td><td>'
      +item.field.dataType
      +'</td><td>'
      +item.dataLength
      +'</td><td>'
      +item.decLength
      +'</td></tr>'
      $("#fieldTable>tbody").append(line);
  }
}
/**
 * 回调函数
 * @param data
 */
function showFile(data) {
  var line,item;
  $("#fileTable>tbody").empty();
  for(var i=0;i<data.list.length;i++){
    item=data.list[i];
    line='<tr><td>'
      +item.fileName
      +'</td><td>'
      +item.publishURL.substring(item.publishURL.lastIndexOf("."))
      +'</td><td>'
      +item.fileSizef
      +'</td><td>'
      +formatDate(item.publishDate, "YYYY-MM-DD hh:mm:ss")
      +'</td><td>'
      +'<a href="'+item.showURL+'">下载</a>'
      +'</td></tr>'
      $("#fileTable>tbody").append(line);
  }
}
/**
 * 回调函数
 * @param data
 */
function showWebService(data) {
  var line,item,status;
  $("#serviceTable>tbody").empty();
  for(var i=0;i<data.list.length;i++){
    item=data.list[i];
    status=item.routeStatus==1?"正常":"不可用";
    line='<tr><td>'
      +item.routeName
      +'</td><td>'
      +item.routeType
      +'</td><td>'
      +'<div class="tooltips" style="height:30px"><a class="glyphicon glyphicon-link" href="#">查看代理地址</a>'
      +'<span>'+item.prxoyURL+'</span></div>'
      +'</td><td>'
      +'<div class="tooltips" style="height:30px"><a class="glyphicon glyphicon-link" href="#">查看发布地址</a>'
      +'<span>'+item.showURL+'</span></div>'
      +'</td><td>'
      +formatDate(item.publishDate, "YYYY-MM-DD hh:mm:ss")
      +'</td><td>'
      +status
      +'</td></tr>'
      $("#serviceTable>tbody").append(line);
  }
}

function loadTypeTree(callback) {
  var requestUrl = getCookie('sUrl')
      + 'serviceCatalogHandler/loadAllZT';
  $.ajax({
    url : requestUrl,
    dataType : 'jsonp',
    jsonp : "jsonpcallback",
    success : function(data) {
      callback(data)
    },
    error : function(response) {
      alert('ERROR : '+response.statusText);
    },
    timeout : 6000
  });
}

function loadAllResourceByType(typId,isRoot, secrLv, assetName, callback) {
  var requestUrl = getCookie('sUrl') + 'resourceCatalogueInfoHandler/getResourceByType';
  var param = {
    start : 0,
    limit : 20,
    typId : typId, // orgID
    isRoot : isRoot,
    secrLv : secrLv,// 保密级别
    resourceName : assetName
  // 指定资源名称(完全匹配 非 like)
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

function loadResourceDetail(assetId, callback) {
  var requestUrl = getCookie('sUrl')
      + 'resourceCatalogueInfoHandler/getResourceDetail';
  var param = {
    start : 0,
    limit : 20,
    resourceId : assetId // asset_Id
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

function loadEntity(assetId, callback) {
  var requestUrl = getCookie('sUrl')
      + 'metaInfoHandler/getMetaInfoByResourceId';
  var param = {
    start : 0,
    limit : 20,
    resourceId : assetId // asset_Id
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

function getFiles(assetId, callback) {
  var requestUrl = getCookie('sUrl')
      + 'serviceInfoHandler/getFileServiceByResourceId';
  var param = {
    start : 0,
    limit : 20,
    resourceId : assetId // asset_Id
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

function getWebService(assetId, showWebService) {
  var requestUrl = getCookie('sUrl')
      + 'serviceInfoHandler/getWebServiceByResourceId';
  var param = {
    start : 0,
    limit : 20,
    resourceId : assetId // asset_Id
  };
  $.ajax({
    url : requestUrl,
    dataType : 'jsonp',
    jsonp : "jsonpcallback",
    data : param,
    success : function(data) {
      showWebService(data);
    },
    error : function(response) {
      alert(response);
    },
    timeout : 6000
  });
}



function search() {
  $("#itemTable>tbody").empty();
  var kw = $("#searchInput").val();
  if (kw) {
    var requestUrl = getCookie('sUrl') + 'requirementHandler/queryRequirement';
    var param = {
      start : 0,
      limit : 20,
      name : kw,
      user : 1234
    };
    $.ajax(requestUrl, {
      dataType : 'jsonp',
      jsonp : "jsonpcallback",
      data : param,
      success : function(data) {
        if (data.count) {
          fillGrid(data.list);
          $("#itemTable>tbody>tr").each(
              function() {
                var ke = $("#searchInput").val();
                var nodeTd = $(this).children().eq(1);
                $(nodeTd).html(
                    $(nodeTd).text().replace(
                        new RegExp(ke, 'g'),
                        '<span style="color:red;font-weight:bold">' + ke
                            + '</span>'));
              });
        }
      },
      error : function(response) {
        alert(response);
      }
    });
  } else {
    loadAllOrg();
  }
}

function fillGrid(array) {
  var line, time, status;

  cacheData = array;
  for ( var i = 0; i < array.length; i++) {
    line = '<tr><td>'
        + (i + 1)
        + '</td><td>'
        + array[i].proposerOrgName
        + ' - '
        + array[i].proposerName
        + '</td><td>'
        + array[i].assetName
        + '</td><td>'
        + array[i].comment.substring(0, 15)
        + '...'
        + '</td><td>'
        + formatDate(array[i].applyTime, "YYYY-MM-DD hh:mm:ss")
        + '</td><td>'
        + array[i].status
        + '</td><td><button number='
        + i
        + ' class="btn btn-primary btn-xs btn_detail" data-toggle="modal" target-index="'
        + array[i].id
        + '" data-target="#model2"><span class="glyphicon glyphicon-list"></span>&nbsp;查看</button></td></tr>';
    $("#itemTable>tbody").append(line);
  }
  $("#itemTable>tbody>tr:even").addClass("success");
  $("#itemTable>tbody>tr:odd").addClass("warning");
  $('.btn_detail').click(
      function() {
        var targetIndex = $(this).attr('target-index');
        var param = {
          id : targetIndex
        // sso后获得的user id
        };
        $.ajax(getCookie('sUrl') + 'approvalHandler/load', {
          dataType : 'jsonp',
          jsonp : "jsonpcallback",
          data : param,
          success : function(data) {
            var item;
            if (data[0]) {
              var feedback = '';
              for ( var i = 0; i < data[0].commentList.length; i++) {
                item = data[0].commentList[i];
                if (item.decision) {
                  feedback += '--------------------  ';
                  feedback += formatDate(item.dealTime, "YYYY-MM-DD hh:mm:ss")
                      + '  : \n';
                  feedback += '' + item.approverOrgName + ' - '
                      + item.approverName + '\n';
                  feedback += item.decision + ' , ' + item.comment + '\n';
                }
              }
              $('#viewAssetName').val(data[0].assetName);
              $('#viewDescription').val(data[0].comment);
              if (data[0].sipUrl) {
                $('#viewSipUrl').val(data[0].sipUrl);
                $('#viewSipUserName').val(data[0].sipUserName);
                $('#viewSipPassword').val(data[0].sipPassword);
              } else {
                $('#viewSipPanel').hide();
              }

              $('#viewProposerName').val(data[0].proposerName);
              $('#viewProposerOrgName').val(data[0].proposerOrgName);
              $('#viewStatus').val(data[0].status);
              $('#viewApprovalInformation').val(feedback);
              if (data[0].sipUrl) {
                $('#viewUseSIP').attr("checked", 'true');
              }

            } else {
            }
          },
          error : function(response) {
            alert(response);
          }
        });
      });
}

/**
 * 获取cookie值
 * 
 * @param name
 * @return
 */
function getCookie(name) {
	
	return 'http://10.6.10.6:8081/service/api/sps/';
  var cookie_start = document.cookie.indexOf(name);
  var cookie_end = document.cookie.indexOf(";", cookie_start);
  if (cookie_start == -1) {
    return '';
  } else {
    var data = document.cookie.substring(cookie_start + name.length + 1,
        (cookie_end > cookie_start ? cookie_end : document.cookie.length));
    return unescape(data);
  }
}

function formatDate(value, format) {
  var date = new Date(value);
  if (arguments.length < 2 && !date.getTime) {
    format = date;
    date = new Date();
  }
  typeof format != 'string' && (format = 'YYYY年MM月DD日 hh时mm分ss秒');
  var week = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
      'Friday', 'Saturday', '日', '一', '二', '三', '四', '五', '六' ];
  return format.replace(/YYYY|YY|MM|DD|hh|mm|ss|星期|周|www|week/g, function(a) {
    switch (a) {
    case "YYYY":
      return date.getFullYear();
    case "YY":
      return (date.getFullYear() + "").slice(2);
    case "MM":
      return date.getMonth() + 1;
    case "DD":
      return date.getDate();
    case "hh":
      return date.getHours();
    case "mm":
      return date.getMinutes();
    case "ss":
      return date.getSeconds();
    case "星期":
      return "星期" + week[date.getDay() + 7];
    case "周":
      return "周" + week[date.getDay() + 7];
    case "week":
      return week[date.getDay()];
    case "www":
      return week[date.getDay()].slice(0, 3);
    }
  });
}