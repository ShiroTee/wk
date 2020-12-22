//数据初始化，是需要先选择类型后，再选择表点击删除数据才有效，每一条记录都是单独一个事物处理，也就是逐条处理。
function dataInit() {
	var temp = false;
	var temp1 = false;


		var ids = new Array();
        var zz = /.*?_table_check/;
		$("#subscribeManageAccordion input:checked").each(function() {
			
			if(!$(this).attr("id").match(zz)){
				ids.push($(this).attr("id"));
			}			
		});
		if (ids.length > 0) {
			temp1 = true;

		}


	if (temp1) {
		$.confirm("选中的表将被删除，无法恢复，确定进行初始化?", function(e) {
			var str = ' <ul id="dataShow_ul_id">';
			
			$("#subscribeManageAccordion input:checked").each(function() {
				
				if(!$(this).attr("id").match(zz)){
					//function() {
						var result = deleteData($(this).attr("id"));
						if (result == '0') {
							str += '<li>删除' + $(this).attr("name")
									+ '表数据成功。</li>';
						} else {
							str += '<li>删除' + $(this).attr("name")
									+ '表数据失败('+result+')。</li>';
						}
						temp = true;
				//}			
			};
			
		});
			str += '</ul>';
			if (temp) {
				$.alert(str);
			}
		});
	} else {
		$.alert("请选择需要删除的表！");
	}

}

// 调用后台方法的方法
function deleteData(id) {
	var flag = '';
	var d = new Date();
	$.ajax({
		url : "admin/dataInit/initData.json?time=" + d.getTime(),
		type : "POST",
		dataType : "json",
		async : false,// 取消异步请求
		// contentType : "application/json",
		data : {
			id : id
		},
		success : function(data) {
			if (typeof (data.msg) == "undefined") {// 如果后台没有报错，就把返回值给flag
				flag = data;
			} else {
				flag = data.msg;
			}
		}
	});
	return flag;
}
//全选或者全部取消
function allCheck(divId,tableId){
	if ($("#"+divId).is(':checked')) {
		$("#"+tableId+" input:checkbox").each(function() {
			if(!this.disabled){
				this.checked=true;
			}
			
		});
	}else{
		$("#"+tableId+" input:checkbox").each(function() {
			this.checked=false;
		});
	}
}