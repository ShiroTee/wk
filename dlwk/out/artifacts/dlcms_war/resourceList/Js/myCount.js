$(function() {
	loadMyApplication();
	TodoListForService();
	loadDoneList();
});

function loadMyApplication() {
	  var requestUrl = getURL() + 'approvalHandler/getMyApplication?limit=0&start=0&userId='+userId;
	  $.ajax({
	    url: requestUrl,
	    dataType : 'jsonp',
	    jsonp : "jsonpcallback",
	    success : function(data) {
	    	$("#td1").html(data.count);
	    },
	    error : function(response) {
	      alert(response);
	    },
	    timeout:6000
	  });
	}
function TodoListForService() {
	  var requestUrl = getURL() + 'approvalHandler/getTodoListForService?limit=0&start=0&userId='+userId;
	  $.ajax({
	    url: requestUrl,
	    dataType : 'jsonp',
	    jsonp : "jsonpcallback",
	    success : function(data) {
	    	  $("#td2").html(data.count);
	    },
	    error : function(response) {
	      alert(response);
	    },
	    timeout:6000
	  });
	}
function loadDoneList() {
	  var requestUrl = getURL() + 'approvalHandler/getDoneList?limit=0&start=0&userId='+userId;
	  $.ajax({
	    url: requestUrl,
	    dataType : 'jsonp',
	    jsonp : "jsonpcallback",
	    success : function(data) {
	    	  $("#td3").html(data.count);
	    },
	    error : function(response) {
	      alert(response);
	    },
	    timeout:6000
	  });
	}