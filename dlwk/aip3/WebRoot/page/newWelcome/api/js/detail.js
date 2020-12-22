


$(function(){
	
	initPage_APIdetails();
	
})


/**
 * 初始化页面
 */
function initPage_APIdetails(){
	//获取resid
	var searchHref = location.search;
	var resid = searchHref == null || searchHref == "" ? "" : searchHref
			.split("?")[1].split("=")[1].split("&")[0];
	
	$.ajax({
		url:ctx + "/mdp/api/getServiceByID.json",
		data:{resid:resid},
		dataType:"json",
		type:"post",
		success:function(data){
			$(".api_title").html(data.RES_NM);
			$(".update_dt").html(TimestampToStr(data.UPDATE_DT));
			$(".service_type").html(data.type_value);
			$(".service_type").attr('title',data.type_value);
			$(".service_desc").html(data.RES_DESC);
			$(".service_url").html(data.SRV_URL);
			
			if(data.ROUTE_STATUS == 1){
				$("#routestatus").html("正常");
			}
			else{
				$("#routestatus").html("异常");
			}
			var requestData =[];
			var responseData = [];
			for(var i=0;i<data.params.length;i++){
				if(data.params[i].PARAMETER_TYPE == 0){
					requestData.push(data.params[i]);
				}
				else{
					responseData.push(data.params[i]);
				}
			}
			
			//示例请求url
			var example = data.SRV_URL + "?pageSize=15&start=2&";
			var requestHTML = '<tr><td>pageSize</td><td>NUMBER</td><td>否</td><td>每页显示的行数</td></tr>';
			requestHTML += '<tr><td>start</td><td>NUMBER</td><td>否</td><td>当前页码</td></tr>';
			for(var i=0;i<requestData.length;i++){
				example += requestData[i].PARAMETER_NAME + "=1&";
				requestHTML +='<tr><td>' + requestData[i].PARAMETER_NAME + '</td>';
				requestHTML += '<td>' + requestData[i].DATA_TYPE + '</td>';
				if(data.USE_TYPE == '01'){
					requestHTML += '<td>是</td>';
				}
				else{
					requestHTML += '<td>否</td>';
				}
				requestHTML += '<td>' + requestData[i].PARAMETER_DESC + '</td></tr>';
			}
			
			$("#request_param").append(requestHTML);
			
			var responseHTML = '';
			var response_example = '{';
			for(var i=0;i<responseData.length;i++){
				response_example += '"' + responseData[i].PARAMETER_NAME + '":"' + responseData[i].PARAMETER_NAME + '1",';
				responseHTML +='<tr><td>' + responseData[i].PARAMETER_NAME + '</td>';
				responseHTML += '<td>' + responseData[i].DATA_TYPE + '</td>';
				responseHTML += '<td>' + responseData[i].PARAMETER_DESC + '</td></tr>';
			}
			response_example = response_example.substr(0,response_example.length-1) + "},{";
			for(var i=0;i<responseData.length;i++){
				response_example += '"' + responseData[i].PARAMETER_NAME + '":"' + responseData[i].PARAMETER_NAME + '2",';
			}
			response_example = response_example.substr(0,response_example.length-1) + "}";
			$("#response_param").append(responseHTML);
			$("#request_example").html(example.substr(0,example.length-1));
			
			var responseHTML = '{"pageSize":10,"start":"1","hasNext":false,"hasPrevious":false,"next":"11","previous":"0","current":"1","nextRow":"","costTime":5,"errorMsg":null,"hasError":false,"totalPage":0,"totalCount":0,"data":['
				 				+ response_example + ']}';
			$("#response_example").html(formatJson(responseHTML));
		}
	})
	
}










/**
 * timestamp 转时间字符串
 */
function TimestampToStr(timestamp){
	var newDate = new Date();
	newDate.setTime(timestamp);
	return newDate.format("yyyy-MM-dd");
}

Date.prototype.format = function(format) {
	   var o = {
	       "M+": this.getMonth() + 1,
	       // month
	       "d+": this.getDate(),
	       // day
	       "h+": this.getHours(),
	       // hour
	       "m+": this.getMinutes(),
	       // minute
	       "s+": this.getSeconds(),
	       // second
	       "q+": Math.floor((this.getMonth() + 3) / 3),
	       // quarter
	       "S": this.getMilliseconds()
	       // millisecond
	   };
	   if (/(y+)/.test(format) || /(Y+)/.test(format)) {
	       format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	   }
	   for (var k in o) {
	       if (new RegExp("(" + k + ")").test(format)) {
	           format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	       }
	   }
	   return format;
	};

	
	/**
	 * 格式化json
	 */
	var formatJson = function(json, options) {
		var reg = null,
			formatted = '',
			pad = 0,
			PADDING = '    '; // one can also use '\t' or a different number of spaces
	 
		// optional settings
		options = options || {};
		// remove newline where '{' or '[' follows ':'
		options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
		// use a space after a colon
		options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;
	 
		// begin formatting...
		if (typeof json !== 'string') {
			// make sure we start with the JSON as a string
			json = JSON.stringify(json);
		} else {
			// is already a string, so parse and re-stringify in order to remove extra whitespace
			json = JSON.parse(json);
			json = JSON.stringify(json);
		}
	 
		// add newline before and after curly braces
		reg = /([\{\}])/g;
		json = json.replace(reg, '\r\n$1\r\n');
	 
		// add newline before and after square brackets
		reg = /([\[\]])/g;
		json = json.replace(reg, '\r\n$1\r\n');
	 
		// add newline after comma
		reg = /(\,)/g;
		json = json.replace(reg, '$1\r\n');
	 
		// remove multiple newlines
		reg = /(\r\n\r\n)/g;
		json = json.replace(reg, '\r\n');
	 
		// remove newlines before commas
		reg = /\r\n\,/g;
		json = json.replace(reg, ',');
	 
		// optional formatting...
		if (!options.newlineAfterColonIfBeforeBraceOrBracket) {			
			reg = /\:\r\n\{/g;
			json = json.replace(reg, ':{');
			reg = /\:\r\n\[/g;
			json = json.replace(reg, ':[');
		}
		if (options.spaceAfterColon) {			
			reg = /\:/g;
			json = json.replace(reg, ':');
		}
	 
		$.each(json.split('\r\n'), function(index, node) {
			var i = 0,
				indent = 0,
				padding = '';
	 
			if (node.match(/\{$/) || node.match(/\[$/)) {
				indent = 1;
			} else if (node.match(/\}/) || node.match(/\]/)) {
				if (pad !== 0) {
					pad -= 1;
				}
			} else {
				indent = 0;
			}
	 
			for (i = 0; i < pad; i++) {
				padding += PADDING;
			}
	 
			formatted += padding + node + '\r\n';
			pad += indent;
		});
	 
		return formatted;
	};
	
	
