    function dysq(){
		
		  var s='';
		  $('input[name="CheckMe"]:checked').each(function(){
		    s+=$(this).val()+',';
		  });
		  if(s=='')
		  {
		  alert(s==''?'请勾选资源！':s);
		  return false;
		  }
	     location.href="/csdsc/myApprovalPrintAct?id="+s;
   }



 
 function  checkistrue(item)
{
	if($(item).attr("checked")=="checked"){
		 if($(item).attr('status')=='等待授权')
		    {
		    	$(item).attr("checked",true); 
		    }else{
		     alert("只有'等待授权'状态的申请才能选择并导出打印！");
		     $(item).attr("checked",false);
		    	
		    }
	}else{
		 $(item).attr("checked",false);
	}
   
	
}

var cacheData;
$(function() {
  loadMyApproval();
  $("#searchBtn").click(search);
  $("#searchInput").keyup(function(k) {
    if (k.which == 13 || k.keyCode == 13) {
      search();
    }
  });
  $(".closeBtn").click(function() {
	    $(this).parent().hide();
	    $("#fade").hide();
	    $("#dybt").html("");
	   // window.location.href=window.location.href;
	  });
  

  
  /*
   * 
   * 
   * 
   * 
  $("#model_submit").click(commit);
  $('#btn_add').click(function() {
    $('#model_title').text('提交一个申请');
    $('#model_submit').show();
    $('#model_name').val('');
    $('#model_description').val('');
    $('#model_userName').val('TestUser');
    $('#model_userOrgName').val('DCITS_CD');
  });
  
  $('#useSIP').click(function(){
    if($(this).prop("checked")){
      $('#sipRow').slideDown(800,'easeOutBounce');
    }
    else{
      $('#sipRow').slideUp(300,'easeOutBounce');
      $('#sipUrl').val('');
      $('#sipUserName').val('');
      $('#sipPassword').val('');
    }
    
  });
  */
});

function pageSkip(start,pageSize,totalRecords,herfUrl,kw){
	
	var totalRecords = totalRecords;//总记录数
	var totalPage =(totalRecords+(pageSize-1))/pageSize;//总页数
	var pageNo =start; //开始页	 
	if (!pageNo) { pageNo = 1;}
	 
	kkpager.init({
		
		pno: pageNo,
		total: totalPage,//总页码
		totalRecords: totalRecords,//总数据条数
		mode : 'click',
		click : function(n){
		    loadMyApproval(n,kw);
		  	return false;
		}
		
	});
	// $("#kkpager").val("");
	kkpager.generPageHtml();
	$("#kkpager").show();
}

 


function loadMyApproval(start,kw) {
 
  var requestUrl = getURL() + 'approvalHandler/getMyApplication?userId='+userId+'&limit='+pageSize+'&start=0';
  if (isUnsignedInteger(start)) {
	 // alert(start);
	  var startID=(start-1)*pageSize
	  requestUrl = getURL()  + 'approvalHandler/getMyApplication?userId='+userId+'&limit='+pageSize+'&start='+startID;
  }
  if(kw!=''&&kw!=undefined)
  {
	 requestUrl=requestUrl+'&assetName='+kw;
  }
  
  $.ajax({
    url: requestUrl,
    dataType : 'jsonp',
    jsonp : "jsonpcallback",
    success : function(data) {
      if (data.count) {
        fillGrid(data.list,kw);
        pageSkip(start,pageSize,data.count,requestUrl,kw);
      } else {
    	  $("#myApproval>tbody").html("<tr><td colspan=\"7\">没有找到相应的数据</td></tr>");	
    	  $("#kkpager").hide(); 
      }
    },
    error : function(response) {
      alert(response);
    },
    timeout:6000
  });
}


function search(start) {
	  $("#myApproval>tbody").empty();
	  var kw = $("#searchInput").val();
	  if (kw) {
		  
		  var requestUrl =getURL() + 'approvalHandler/getMyApplication?userId='+userId+'&limit='+pageSize+'&start=0'+'&assetName='+kw;
		  if (isUnsignedInteger(start)) {
			  var startID=(start-1)*pageSize+1
			  requestUrl = getURL()  + 'approvalHandler/getMyApplication?userId='+userId+'&limit='+pageSize+'&start='+startID+'&assetName='+kw;
		  }
		
	    $.ajax(requestUrl, {
	      dataType : 'jsonp',
	      jsonp : "jsonpcallback",
	     
	      success : function(data) {
	        if (data.count) {
	          fillGrid(data.list,kw);
	          pageSkip(start,pageSize,data.count,requestUrl,kw);
	          //添加高亮
	          $("#myApproval>tbody>tr").each(function() {
	            //var ke = $("#searchInput").val();
	            var nodeTd=$(this).children().eq(2);
	            $(nodeTd).html(
	              $(nodeTd).text().replace(new RegExp(kw, 'g'),'<span style="color:red;font-weight:bold">' + kw + '</span>'));
	            });
	        } else {
	      	  $("#myApproval>tbody").html("<tr><td colspan=\"7\">没有找到相应的数据</td></tr>");	  
	      	  $("#kkpager").hide();
	        }
	      },
	      error : function(response) {
	        alert(response);
	      }
	    });
	  } else {
	    loadMyApproval(start);
	  }
	}
function fillGrid(array,kw) {
  var line, time, status,commnet;

  cacheData = array;
  $("#myApproval>tbody").html("");
  for ( var i = 0; i < array.length; i++) {
	  
	if(undefined ==array[i].comment)  
		commnet="-";
	else if(array[i].comment.length<15)
		commnet=array[i].comment;
	else
	    commnet=  array[i].comment.substring(0,15)+'...';
	var applyTime=(undefined == array[i].applyTime ? "-" :  formatDate(array[i].applyTime, formatRQ));
    line = '<tr><td><input type="checkbox" class="ck" name="CheckMe" value="'
        +array[i].id
        +'" status="'
        + array[i].status
        +'" /></td><td>'
        + array[i].proposerOrgName +' - '+array[i].proposerName
        + '</td><td>'
        + array[i].assetName
        + '</td><td>'
        + array[i].assetProviderName
        + '</td><td>'
        + applyTime
        + '</td><td>'
        + array[i].status
        + '</td><td><span style="cursor: pointer" class="btn_detail" number='
        + i
        + '  data-toggle="modal" target-index="'
        + array[i].id
        + '" data-target="#model2"><font color="blue">查看详情</font></span></td></tr>';
    $("#myApproval>tbody").append(line);
  }
  if(kw!=''&&kw!=undefined)
  {
	  $("#myApproval>tbody>tr").each(function() {
          //var ke = $("#searchInput").val();
          var nodeTd=$(this).children().eq(2);
          $(nodeTd).html(
            $(nodeTd).text().replace(new RegExp(kw, 'g'),'<span style="color:red;font-weight:bold">' + kw + '</span>'));
       });
  }
  
  $('.btn_detail').click(function() {
    var targetIndex=$(this).attr('target-index');
    var param = {
        id : targetIndex// sso后获得的user id
      };
    $.ajax(getURL()+ 'approvalHandler/loadDetail', {
      dataType : 'jsonp',
      jsonp : "jsonpcallback",
      data : param,
      success : function(data) {
        var item;
        if (data[0]) {
          var feedback='';
          for(var i=0;i<data[0].commentList.length;i++){
            item=data[0].commentList[i];
            if(item.decision){
            feedback+='--------------------  ';
            feedback+=formatDate(item.dealTime, formatRQ)+'  : \n';
            feedback+=''+item.approverOrgName+' - '+item.approverName+'\n';
            var tempComment=(undefined == item.comment? "" :' , '+item.comment); 
            
            feedback+=item.decision +tempComment+'\n';
            }
          }
          $('#viewAssetName').val(data[0].assetName);
          $('#viewDescription').val(data[0].comment);
          /*if(data[0].sipUrl){
            $('#viewSipUrl').val(data[0].sipUrl);
            $('#viewSipUserName').val(data[0].sipUserName);
            $('#viewSipPassword').val(data[0].sipPassword);
          }else{
            $('#viewSipPanel').hide();
          }
          */
          $('#viewProposerName').val(data[0].proposerName);
          $('#viewProposerOrgName').val(data[0].proposerOrgName);
          $('#viewStatus').val(data[0].status);
          $('#viewApprovalInformation').val(feedback);
          /*if(data[0].sipUrl){
            $('#viewUseSIP').attr("checked",'true');
          }
          */
          var obj = $("#model2");
          var x1 = ($(window).width() - obj.width()) / 2;
          var y1 = ($(window).height() - obj.height()) / 2;
          y1 = y1 > 50 ? y1 : 50;
          obj.css("top", y1).css("left", x1);
          obj.show();
          //if(data[0].status=='等待授权')
        	  //{
        	   $("#dybt").html('<div class="newchaxun"> <input id="ckdy"  type="button" class="btn1" value="导出打印"  /></div>');
        	   $("#ckdy").click(function() {
        		   location.href="/csdsc/myApprovalPrintAct?id="+data[0].id;
        	   })
        	   
        	  //}
          $("#fade").show();
        } else {
        }
      },
      error : function(response) {
        alert(response);
      }
    });
  });
}

function commit() {
  var requestUrl = getURL()+ 'approvalHandler/apply';
  var param = {
    proposerId : $('#modelUserId').val(),// sso后获得的user id
    assetId : $('#assetId').val(),// 用户填写的需求标题
    description : $('#model_description').val(),// 用户填写的需求详细信息
    sipUrl: $('#sipUrl').val(),
    sipUserName : $('#sipUserName').val(),
    sipPassword : $('#sipPassword').val(),
    attachments : '/file1,/file2'// 异步上传的附件URL.
  };
  $.ajax(requestUrl, {
    dataType : 'jsonp',
    jsonp : "jsonpcallback",
    data : param,
    success : function(data) {
      if (data.success) {
        alert('提交成功!');
        location.reload(true);
      } else {
        alert('提交失败!');
      }
    },
    error : function(response) {
      alert(response);
    }
  });
}

