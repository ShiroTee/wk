
	function showResourceTree() {

		d = new dTree('d');//创建一个树对象         
		d.add(0, -1, "资源分类统计", "#", ""); //创建一个树对象         
		d.add(1, 0, "资源申请情况统计", "#", "resourceSubscription");
		d.add(2, 0, "资源调用情况统计", "#", "");
		d.add(3, 2, "资源下载视角", "#", "fileDownload");
		d.add(4, 2, "服务调用视角", "#", "serviceRequest");

		$('#resourceTreeDiv').html(d.toString());

		$('#resourceTreeDiv a[title]').click(
				function() {
					   loadAllResourceByID("", $(this).attr('title'),'');
					   $("#resourceSearchInput").val("");
					   $("#fileDownloadSearchInput").val("");
					   $("#resourceSearchInput").val("");
				});
				
				
				
				
	}
	
	function pageSkipType(start,pageSize,totalRecords,herfUrl,typId,kw){
	
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
			loadAllResourceByID(n,typId,kw);
		  	return false;
		}
		
	});
	kkpager.generPageHtml();
	$("#kkpager").show();
}

function loadAllResourceByID(start,typId,kw) {
  
     if(typId)
     {
		 var requestUrl = globalInterfaceDomain+'/sps/statisticHandler/'+typId+'?limit='+pageSize+'&start=0';
		  if (start) {
			  var startID=(start-1)*pageSize
			  requestUrl = globalInterfaceDomain+'/sps/statisticHandler/'+typId+'?limit='+pageSize+'&start='+startID;
		  }
	     if(kw!=''&&kw!=undefined)
		  {
	    	 requestUrl=requestUrl+'&keyWord='+kw;
		  }
		  $.ajax({
		    url : requestUrl,
		    dataType : 'jsonp',
		    jsonp : "jsonpcallback",
		    //data : param,
		    success : function(data) {
		    	
		    	 if (data.count) {
		       	     if(typId=="resourceSubscription")
		       	     {
		       	    	resourceSubscriptionfillGrid(data.list,kw);
		       	    	pageSkipType(start,pageSize,data.count,requestUrl,typId,kw);
		       	     }
		       	     if(typId=="fileDownload")
		       	     {
		       	    	fileDownloadfillGrid(data.list,kw);
		    	        pageSkipType(start,pageSize,data.count,requestUrl,typId,kw);
		       	     }
			       	 if(typId=="serviceRequest")
		       	     {
			       		serviceRequestfillGrid(data.list,kw);
		    	        pageSkipType(start,pageSize,data.count,requestUrl,typId,kw);
		       	     }
		    	 } else {
		    		 
		    		 if(typId=="resourceSubscription")
		       	     {
		    			 $("#fileDownloadDiv").hide();
		    			 $("#serviceRequestDiv").hide();
		    			
		    			 $("#resourceTable>tbody").html("<tr><td colspan=\"5\">没有找到相应的数据</td></tr>");
		    			 $("#resourceDiv").show();
		    			 
		       	     }
		    		if(typId=="fileDownload")
			       	{
		    			$("#resourceDiv").hide();
	    			    $("#serviceRequestDiv").hide();
	    			    
		    			$("#fileDownloadTable>tbody").html("<tr><td colspan=\"6\">没有找到相应的数据</td></tr>");
		    			$("#fileDownloadDiv").show();    
		    			    
			       	}
		    		if(typId=="serviceRequest")
				    {
		   	 			 $("#resourceDiv").hide();
		    			 $("#fileDownloadDiv").hide();
		    			
		    			 $("#serviceRequestTable>tbody").html("<tr><td colspan=\"6\">没有找到相应的数据</td></tr>");
		    			 $("#serviceRequestDiv").show();
				    }
		    		$("#kkpager").hide();
		    	 }
		    },
		    error : function(response) {
		      alert(response);
		    },
		    timeout : 6000
		  });
  }
}
	
	function resourceSubscriptionfillGrid(array,kw) {
	  var line, time, status,asset_name,assetprovidername,pub_dt,quantity;
	  $("#resourceTable>tbody").html("");
	  cacheData = array;
	  for ( var i = 0; i < array.length; i++) {
		  
		    asset_name = (undefined == array[i].asset_name? "" : array[i].asset_name);
		    assetprovidername = (undefined == array[i].asset_provider_name? "" : array[i].asset_provider_name);
		    pub_dt = (undefined == array[i].pub_dt? "-" : formatDate(array[i].pub_dt, "YYYY-MM-DD"));
		    quantity = (undefined == array[i].quantity? "" : array[i].quantity);
		   
	    line = '<tr><td>'
	        + (i + 1)
	        + '</td><td>'
	        + asset_name
	        + '</td><td>'
	        + assetprovidername
	        + '</td><td>'
	        + pub_dt
	        + '</td><td>'
	        + quantity
	        + '</td></tr>';
	    $("#resourceTable>tbody").append(line);
	    $("#resourceDiv").show();
	    $("#fileDownloadDiv").hide();
	    $("#serviceRequestDiv").hide();
	  }
	  if(kw!=''&&kw!=undefined)
	  {
		  $("#resourceTable>tbody>tr").each(function() {
	          // var ke = $("#searchInput").val();
	           var nodeTd=$(this).children().eq(1);
	           $(nodeTd).html(
	             $(nodeTd).text().replace(new RegExp(kw, 'g'),'<span style="color:red;font-weight:bold">' + kw + '</span>'));
	       });
	  }
	 }	
	
	function fileDownloadfillGrid(array,kw) {
		  var line, time, status,file_name,file_size,org_nm,crt_dt,quantity;
		  $("#fileDownloadTable>tbody").html("");
		  cacheData = array;
		  for ( var i = 0; i < array.length; i++) {
			  
			  file_name = (undefined == array[i].file_name? "" : array[i].file_name);
			  file_size = (undefined == array[i].file_size? "" : array[i].file_size);
			  org_nm = (undefined == array[i].org_nm? "" : array[i].org_nm);
			  crt_dt = (undefined == array[i].crt_dt? "-" : formatDate(array[i].crt_dt, "YYYY-MM-DD"));
			  quantity = (undefined == array[i].quantity? "" : array[i].quantity);
			  
		    line = '<tr><td>'
		        + (i + 1)
		        + '</td><td>'
		        + file_name
		        + '</td><td>'
		        +file_size
		        + '</td><td>'
		        + org_nm
		        + '</td><td>'
		        + crt_dt
		        + '</td><td>'
		        + quantity
		        + '</td></tr>';
		    $("#fileDownloadTable>tbody").append(line);
		    $("#fileDownloadDiv").show();
		    $("#resourceDiv").hide();
		    $("#serviceRequestDiv").hide();
		  }
		  if(kw!=''&&kw!=undefined)
		  {
			  $("#fileDownloadTable>tbody>tr").each(function() {
		           // var ke = $("#searchInput").val();
		            var nodeTd=$(this).children().eq(1);
		            $(nodeTd).html(
		              $(nodeTd).text().replace(new RegExp(kw, 'g'),'<span style="color:red;font-weight:bold">' + kw + '</span>'));
		        }); 
		  }
		 }	
	
	function serviceRequestfillGrid(array,kw) {
		  var line, time, status,res_nm,res_desc,org_nm,crt_dt,quantity;
		  $("#serviceRequestTable>tbody").html("");
		  cacheData = array;
		  for ( var i = 0; i < array.length; i++) {
			  
			  res_nm = (undefined == array[i].res_nm? "" : array[i].res_nm);
			  res_desc = (undefined == array[i].res_desc? "" : array[i].res_desc);
			  org_nm = (undefined == array[i].org_nm? "" : array[i].org_nm);
			  crt_dt = (undefined == array[i].crt_dt? "-" : formatDate(array[i].crt_dt, "YYYY-MM-DD"));
			  quantity = (undefined == array[i].quantity? "" : array[i].quantity);
			  
			  
			  if(array[i].res_nm!=''&&array[i].res_nm!=undefined)
				  res_nm =array[i].res_nm;
			  if(array[i].res_desc!=''&&array[i].res_desc!=undefined)
				  res_desc =array[i].res_desc;
			  if(array[i].org_nm!=''&&array[i].org_nm!=undefined)
				  org_nm =array[i].org_nm;
			  if(array[i].crt_dt!=''&&array[i].crt_dt!=undefined)
				  crt_dt =formatDate(array[i].crt_dt, "YYYY-MM-DD");
			  if(array[i].quantity!=''&&array[i].quantity!=undefined)
				 quantity =array[i].quantity;  
			  
		    line = '<tr><td>'
		        + (i + 1)
		        + '</td><td>'
		        + res_nm
		        + '</td><td>'
		        + res_desc
		        + '</td><td>'
		        + org_nm
		        + '</td><td>'
		        +crt_dt
		        + '</td><td>'
		        + quantity
		        + '</td></tr>';
		    $("#serviceRequestTable>tbody").append(line);
		    $("#serviceRequestDiv").show();
		    $("#resourceDiv").hide();
		    $("#fileDownloadDiv").hide();
		  }
		  if(kw!=''&&kw!=undefined)
		  {
			  $("#serviceRequestTable>tbody>tr").each(function() {
		          //  var ke = $("#searchInput").val();
		            var nodeTd=$(this).children().eq(1);
		            $(nodeTd).html(
		              $(nodeTd).text().replace(new RegExp(kw, 'g'),'<span style="color:red;font-weight:bold">' + kw + '</span>'));
		        });
		  }
		 }	
	
	function search(start,typId) {
		 var kw ="";
		 if(typId=="resourceSubscription")
   	     {
		    kw = $("#resourceSearchInput").val();
   	     }
		 if(typId=="fileDownload")
   	     {
		    kw = $("#fileDownloadSearchInput").val();
   	     }
		 if(typId=="serviceRequest")
   	     {
		    kw = $("#serviceRequestSearchInput").val();
   	     }
		 
		  if (kw!="") {
			  var requestUrl = globalInterfaceDomain+'/sps/statisticHandler/'+typId+'?limit='+pageSize+'&start=0&keyWord='+kw;
			  if (isUnsignedInteger(start)) {
				  var startID=(start-1)*pageSize
				  requestUrl = globalInterfaceDomain+'/sps/statisticHandler/'+typId+'?limit='+pageSize+'&start='+startID+'&keyWord='+kw;
			  }
			  
			  $.ajax({
				    url : requestUrl,
				    dataType : 'jsonp',
				    jsonp : "jsonpcallback",
		    
				    success : function(data) {
		    	    if (data.count) {
		    		 
			       	     if(typId=="resourceSubscription")
			       	     {
			       	        $("#resourceTable>tbody").empty();
			       	    	resourceSubscriptionfillGrid(data.list);
			       	    	pageSkipType(start,pageSize,data.count,requestUrl,typId,kw);
			       	    	$("#resourceTable>tbody>tr").each(function() {
					           // var ke = $("#searchInput").val();
					            var nodeTd=$(this).children().eq(1);
					            $(nodeTd).html(
					              $(nodeTd).text().replace(new RegExp(kw, 'g'),'<span style="color:red;font-weight:bold">' + kw + '</span>'));
					        });
			       	     }
			       	     if(typId=="fileDownload")
			       	     {
			       	    	$("#fileDownloadTable>tbody").empty();
			       	    	fileDownloadfillGrid(data.list);
			    	        pageSkipType(start,pageSize,data.count,requestUrl,typId,kw);
			    	        $("#fileDownloadTable>tbody>tr").each(function() {
					           // var ke = $("#searchInput").val();
					            var nodeTd=$(this).children().eq(1);
					            $(nodeTd).html(
					              $(nodeTd).text().replace(new RegExp(kw, 'g'),'<span style="color:red;font-weight:bold">' + kw + '</span>'));
					        });
			       	     }
				       	 if(typId=="serviceRequest")
			       	     {
				       		$("#serviceRequestTable>tbody").empty();
				       		serviceRequestfillGrid(data.list);
			    	        pageSkipType(start,pageSize,data.count,requestUrl,typId,kw);
			    	        $("#serviceRequestTable>tbody>tr").each(function() {
					          //  var ke = $("#searchInput").val();
					            var nodeTd=$(this).children().eq(1);
					            $(nodeTd).html(
					              $(nodeTd).text().replace(new RegExp(kw, 'g'),'<span style="color:red;font-weight:bold">' + kw + '</span>'));
					        });
			       	     }
			    	 } else {
			    		 
			    		 if(typId=="resourceSubscription")
			       	     {
			    			 $("#fileDownloadDiv").hide();
			    			 $("#serviceRequestDiv").hide();
			    			
			    			 $("#resourceTable>tbody").html("<tr><td colspan=\"5\">没有找到相应的数据</td></tr>");
			    			 $("#resourceDiv").show();
			    			 
			       	     }
			    		if(typId=="fileDownload")
				       	{
			    			$("#resourceDiv").hide();
		    			    $("#serviceRequestDiv").hide();
		    			    
			    			$("#fileDownloadTable>tbody").html("<tr><td colspan=\"6\">没有找到相应的数据</td></tr>");
			    			$("#fileDownloadDiv").show();    
			    			    
				       	}
			    		if(typId=="serviceRequest")
					    {
			   	 			 $("#resourceDiv").hide();
			    			 $("#fileDownloadDiv").hide();
			    			
			    			 $("#serviceRequestTable>tbody").html("<tr><td colspan=\"6\">没有找到相应的数据</td></tr>");
			    			 $("#serviceRequestDiv").show();
					    }
			    		$("#kkpager").hide();
			    	 }
			    	 
		      },
		      error : function(response) {
		        alert(response);
		      }
		    });
		  } else {
			  loadAllResourceByID(start, typId,'');
		  }
		}
	
	 