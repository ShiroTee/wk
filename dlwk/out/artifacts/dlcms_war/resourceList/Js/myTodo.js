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
	 * $("#model_submit").click(commit); $('#btn_add').click(function() {
	 * $('#model_title').text('提交一个申请'); $('#model_submit').show();
	 * $('#model_name').val(''); $('#model_description').val('');
	 * $('#model_userName').val('TestUser');
	 * $('#model_userOrgName').val('DCITS_CD'); });
	 * 
	 * $('#useSIP').click(function(){ if($(this).prop("checked")){
	 * $('#sipRow').slideDown(800,'easeOutBounce'); } else{
	 * $('#sipRow').slideUp(300,'easeOutBounce'); $('#sipUrl').val('');
	 * $('#sipUserName').val(''); $('#sipPassword').val(''); }
	 * 
	 * });
	 */
});

function dysq() {
	var s = '';
	$('input[name="CheckMe"]:checked').each(function() {
		s += $(this).val();
	});
	if (s == '') {
		alert(s == '' ? '请勾选资源！' : s);
		return false;
	}
	location.href = "/csdsc/myTodoPrintAct?id=" + s;
}

function pageSkip(start, pageSize, totalRecords, herfUrl, kw) {
	var totalRecords = totalRecords;// 总记录数
	var totalPage = (totalRecords + (pageSize - 1)) / pageSize;// 总页数
	var pageNo = start; // 开始页
	if (!pageNo) {
		pageNo = 1;
	}
	kkpager.init( {
		pno : pageNo,
		total : totalPage,// 总页码
		totalRecords : totalRecords,// 总数据条数
		mode : 'click',
		click : function(n) {
			loadMyApproval(n, kw);
			return false;
		}
	});
	// $("#kkpager").val("");
	kkpager.generPageHtml();
	$("#kkpager").show();
}

function loadMyApproval(start, kw) {
	var requestUrl = getGrURL() + 'approvalHandler/' + act + '?userId=' + userId
			+ '&limit=' + pageSize + '&o=time&start=0';
	if (isUnsignedInteger(start)) {
		// alert(start);
		var startID = (start - 1) * pageSize
		requestUrl = getGrURL() + 'approvalHandler/' + act + '?userId=' + userId
				+ '&limit=' + pageSize + '&o=time&start=' + startID;
	}
	if (kw != '' && kw != undefined) {
		requestUrl = requestUrl + '&kw=' + kw;
	}
	$.ajax({
		url : requestUrl,
		dataType : 'jsonp',
		jsonp : "jsonpcallback",
		success : function(data) {
			if (data.count) {
				fillGrid(data.list, kw);
				pageSkip(start, pageSize, data.count, requestUrl, kw);
			} else {
				$("#myApproval>tbody").html(
						"<tr><td colspan=\"7\">没有找到相应的数据</td></tr>");
				$("#kkpager").hide();
			}
		},
		error : function(response) {
			alert(response);
		},
		timeout : 6000
	});
}

function search(start) {
	  $("#myApproval>tbody").empty();
	  var kw = $("#searchInput").val();
	  if (kw) {
		  var requestUrl =getGrURL() + 'approvalHandler/'+act+'?userId='+userId+'&limit='+pageSize+'&start=0'+'&kw='+kw+'&o=time';
		  if (isUnsignedInteger(start)) {
			  var startID=(start-1)*pageSize+1
			  requestUrl = getGrURL()  + 'approvalHandler/'+act+'?userId='+userId+'&limit='+pageSize+'&start='+startID+'&kw='+kw+'&o=time';
		  }
	    $.ajax(
		requestUrl, {
	      dataType : 'jsonp',
	      jsonp : "jsonpcallback",
	     
	      success : function(data) {
	        if (data.count) {
	          fillGrid(data.list,kw);
	          pageSkip(start,pageSize,data.count,requestUrl,kw);
	          //添加高亮
	          $("#myApproval>tbody>tr").each(function() {
	           // kw = $("#searchInput").val();
	            var nodeTd=$(this).children().eq(1);
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
	  
	if(undefined ==array[i].assetProviderName)  
		assetProviderName="-";
	else
		assetProviderName=array[i].assetProviderName
	   
	var applyTime=(undefined == array[i].applyTime ? "-" :  formatDate(array[i].applyTime, formatRQ));
    line = '<tr><td><input type="radio" class="ck" name="CheckMe" value="'
        +array[i].id+","+array[i].proposerOrgName+","+array[i].proposerName+'" status="'
        + array[i].status
        +'" /></td><td>'
        + array[i].proposerOrgName +' - '+array[i].proposerName
        + '</td><td>'
        + array[i].assetName
        + '</td><td>'
        + assetProviderName
        + '</td><td>'
        + applyTime
        + '</td><td>'
        + array[i].status
        + '</td><td>'
        +'<span style="cursor: pointer" class="btn_detail" number='
        + i
        + '  data-toggle="modal" target-index="'
        + array[i].id
       + '" data-target="#model2"><font color="blue">查看详情</font></span>';
    
        if(showa==1)
        {
        	
        line=line +'&nbsp;&nbsp;<span style="cursor: pointer" class="btn_deal" number='
	        + i
	        + '  data-toggle="modal" target-index="'
	        + array[i].id
	        + '" task-id="'
	        + array[i].taskId
	        + '" data-target="#model"><font color="blue">处理</font></span>'
        }
        line=line+ ' </td></tr>';
       // alert(line);
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
    $.ajax(getGrURL()+ 'approvalHandler/loadDetail', {
      dataType : 'jsonp',
      jsonp : "jsonpcallback",
      data : param,
      success : function(data) {
        var item;
        if (data[0]) {
        	
        	$('#slr').val("");
        	$('#slsj').val("");
        	$('#slyx').val("");
        	$('#slyj').val("");
        	$('#spr').val("");
        	$('#spsj').val("");
        	$('#spyx').val("");
        	$('#spyj').val("");
        	$('#sqr').val("");
        	$('#sqsj').val("");
        	$('#sqyx').val("");
        	$('#sqyj').val("");
        	$('#proposerName').val("");
            $('#assetName').val("");
            $('#proposerOrgName').val("");
            $('#ProviderName').val("");
            $('#applyTime').val("");
            $('#proposerPhone').val("");
            $('#status').val("");
            $('#comment').val("");
       	
          var applyTime=(undefined == data[0].applyTime ? "-" :  formatDate(data[0].applyTime, formatRQ));
          
         for(var i=0;i<data[0].commentList.length;i++){
            if(i==1)
            {
            	item=data[0].commentList[1];
            	var dealTime=(undefined == item.dealTime ? "-" :  formatDate(item.dealTime, formatRQ));
            	$('#slr').val(item.approverName);
            	$('#slsj').val(dealTime);
            	$('#slyx').val(item.decision);
            	$('#slyj').val(item.comment);
            }
            if(i==2)
            {
            	item=data[0].commentList[2];
            	var dealTime=(undefined == item.dealTime ? "-" :  formatDate(item.dealTime, formatRQ));
            	$('#spr').val(item.approverName);
            	$('#spsj').val(dealTime);
            	$('#spyx').val(item.decision);
            	$('#spyj').val(item.comment);
            }
            if(i==3)
            {
            	item=data[0].commentList[3];
            	var dealTime=(undefined == item.dealTime ? "-" :  formatDate(item.dealTime, formatRQ));
            	$('#sqr').val(item.approverName);
            	$('#sqsj').val(dealTime);
            	$('#sqyx').val(item.decision);
            	$('#sqyj').val(item.comment);
            }
            
          }
          $('#proposerName').val(data[0].proposerName);
          $('#assetName').val(data[0].assetName);
          
          $('#proposerOrgName').val(data[0].proposerOrgName);
         
          $('#ProviderName').val(data[0].assetProviderName);
          
          $('#applyTime').val(applyTime);
          $('#proposerPhone').val(data[0].proposerPhone);
           
          $('#status').val(data[0].status);
          $('#comment').val(data[0].comment);
         
	       
          var obj = $("#model2");
          var x1 = ($(window).width() - obj.width()) / 2;
          var y1 = ($(window).height() - obj.height()) / 2;
          y1 = y1 > 50 ? y1 : 50;
          obj.css("top", y1).css("left", x1);
          obj.show();
          $("#fade").show();
        } else {
        }
      },
      error : function(response) {
        alert(response);
      }
    });
  });
  
  
  
  $('.btn_deal').click(function() {
	    var targetIndex=$(this).attr('target-index');
	    
	    $('#taskId11').val($(this).attr('task-id'));
        $('#approval_Id1').val(targetIndex);
	    
	    var param = {
	        id : targetIndex// sso后获得的user id
	      };
	    $.ajax(getGrURL()+ 'approvalHandler/loadDetail', {
	      dataType : 'jsonp',
	      jsonp : "jsonpcallback",
	      data : param,
	      success : function(data) {
	        var item;
	        if (data[0]) {
	        	
	          var applyTime=(undefined == array[0].applyTime ? "-" :  formatDate(array[0].applyTime, formatRQ));
	         
	          $('#proposerName1').val(data[0].proposerName);
	          $('#assetName1').val(data[0].assetName);
	          
	          $('#proposerOrgName1').val(data[0].proposerOrgName);
	         
	          $('#ProviderName1').val(data[0].assetProviderName);
	          
	          $('#applyTime1').val(applyTime);
	          $('#proposerPhone1').val(data[0].proposerPhone);
	          $('#comment1').val(data[0].comment);
	         
	          
	          $('#status1').val(data[0].status);
	         // $('#userId1').val(userId);//
	         // $('#approval_Id1').val(data[0].approvalId);
	         // $('#taskId1').val(data[0].taskId);
	         
	          
		 if(data[0].status)
		  {
		    if(data[0].status=='等待受理')
			 {
			  $('#yxzd').html('受理');
			  $('#yjzd').html('受理');
			  
			  $('#spztcl').html('资源申请-受理');
			}
		   if(data[0].status=='等待审批')
			 {
			  $('#yxzd').html('审批');
			  $('#yjzd').html('审批');
			  $('#spztcl').html('资源申请-审批');
			}
			  if(data[0].status=='等待授权')
			 {
			  $('#yxzd').html('授权');
			  $('#yjzd').html('授权');
			  $('#spztcl').html('资源申请-授权');
			}
		  
		  }
        
		 
		 
	          var obj = $("#model1");
	          var x1 = ($(window).width() - obj.width()) / 2;
	          var y1 = ($(window).height() - obj.height()) / 2;
	          y1 = y1 > 50 ? y1 : 50;
	          obj.css("top", y1).css("left", x1);
	          obj.show();
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

function commit(){
	  var requestUrl = getGrURL() + 'approvalHandler/dealForService';
	  var param = {
	    userId : userId,
	    decision : $('input[name="decision1"]:checked').val(),
	    approvalComment :$('#approvalComment1').val(),
	    approval_Id : $('#approval_Id1').val(),
	    status : $('#status1').val(),
	    taskId : $('#taskId11').val()
	  };
	  $.ajax({
	    url: requestUrl,
	    dataType : 'jsonp',
	    jsonp : "jsonpcallback",
	    data : param,
	    success : function(data) {
	      if (data.success) {
	        alert('审批成功!');
	        location.reload(true);
	      } else {
	        alert('审批失败! '+data.msg);
	      }
	    },
	    error : function(response) {
	      alert('审批失败!');
	    },
	    timeout:6000
	  });
	}

