var fieldList;
$(function() {
	var thistd;
	loadGridData();
	
	var panel = $("#workflow-list-box");
	var table = panel.find("table");
	setBtnMethod();
	
	//上传文件
	var uploader = WebUploader.create({
		// swf文件路径
		swf: ctx + '/resources/plugins/webuploader/Uploader.swf',
		// 文件接收服务端。
		server : ctx + '/mdp/admin/workFlowHandler/processDeploy.json',
	    // 选择文件的按钮。可选。
	    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
	    pick: {
	    	id:'#picker',
	    	multiple:false
	    },
	    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
	    resize: false
	});
	uploader.on( 'uploadSuccess', function( file,d ) {
		console.log(d);
		if( d._raw == "success" ){
			$.alert("部署成功!");
		}else{
			$.alert("部署失败!");
		}
		loadGridData();
	});	
	uploader.on( 'uploadError', function( file ) {
		$.alert("上传出错");
	});
	/**
	 * 每次上传最后一个文件
	 */
	uploader.on( 'beforeFileQueued', function( file ) {
		uploader.reset();
	});	
	uploader.on( 'fileQueued', function( file ) {
		$(".item_fileList").remove();
	    $("#fileList_fileDIV").append( '<div id="' + file.id + '" class="item item_fileList">' +
	        '<div class="info">' + file.name + '</div></div>' );
	    //resetFile_uploader(uploader);
	    uploader.upload();
	});
});

//启动流程
var pid = "", pname = "", pv = "",started="";
function confirmstart() {
	var url = ctx + '/mdp/admin/workFlowHandler/setProcess.json';
	$.ajax({
		url : url,
		cache : false,
		dataType : "json",
		data : {
			processId : pid,
			processName : pname,
			processVersion : pv,
			started:started
		},
		type : "post",
		success : function(data) {
			if (data.success) {
				loadGridData();
			} else {
				$.alert(data.msg);
			}
		}
	});
}

function loadGridData() {
	$("#processDefId").html("");
	$.ajax({
		url : ctx + '/mdp/admin/workFlowHandler/getProcessListJson.json',
		method : "post",
		dataType : "json",
		success : function(data) {
			if (data) {
				var html = "";
				for (var i = 0; i < data.length; i++) {
					var processEdit = "";
					if (data[i].started == 1) {
						processEdit = "<td><span class='label label-sm label-success arrowed arrowed-righ'>启用</span></td>";
					} else {
						processEdit = "<td><span class='label label-sm label-danger arrowed arrowed-righ'>禁用</span></td>";
					}
					var append = "<tr><td>" + (i + 1) + "</td>" + "<td>" + data[i].name + "</td>" + "<td>" + data[i].displayName + "</td>" + "<td>"
							+ data[i].version + "</td>" + "<td>" + data[i].createTime + "</td>" + processEdit + "<td><div class='action-buttons'>"
					if (data[i].started != 1) {
						append += '<a class="set_process green" href="javascript:void(0);" title="配置流程" processId="' + data[i].processId+ '"><i class="icon-pencil bigger-130" aria-hidden="true"></i></a>';
					} else {
						append += '<a class="test_process orange" href="javascript:void(0);" title="停止流程" started="0"  processId="' + data[i].processId+ '"><i class="icon-pause  bigger-130" aria-hidden="true"></i></a>';
					}
					if (data[i].started != 1) {
						append += '<a class="del_process red" href="javascript:void(0);" title="删除流程"  processId="' + data[i].processId+ '"><i class="icon-trash  bigger-130" aria-hidden="true"></i></a>';
						append += '<a class="start_process blue" href="javascript:void(0);" title="启用流程" started="1"  processId="' + data[i].processId+ '"><i class="icon-play-circle bigger-130" aria-hidden="true"></i></a>';
					}
					+"</div></td></tr>"
					html += append;

				}
				$("#processDefId").html(html);
			}
			setBtnMethod();
		}
	});
}

function setBtnMethod() {
	var panel = $("#workflow-list-box");
	var table = panel.find("table");
	table.find("tbody tr").each(function() {
		var td = $(this).find("td:eq(6)");
		var tr = $(this);
		//配置流程
		td.find(".set_process").click(function() {
			var processId = $(this).attr("processId");
			$('#flowcfg').load(ctx + "/mdp/admin/workFlowHandler/getProcessModel.html", {
				processId : processId
			}, function() {
				var stepwidth = 0;
				$(".steps li").each(function() {
					stepwidth += 1;
					if ($(this).next().length != 0) {
						$(this).prepend('<span class="arrow-right" id="arrow' + stepwidth + '" ></span>');
						$(this).prepend('<span class="arrow-line" id="line' + stepwidth + '" ></span>');
					} else {
						$(this).prepend('<div style="height:11px;width:11px;"></div>');
					}
				});

				$(".arrow-right").css({
					left : 216,
					top : 30
				});
				$(".arrow-line").css({
					left : 125,
					top : 35
				});
				// $("#arrow"+stepwidth).hide();
				// $("#line"+stepwidth).hide();

				$(".steps").width(stepwidth * 150 + 50);
			});
			panel.hide();
			$("#breadid").show();
		});
		//删除流程
		td.find(".del_process").click(function() {
			var processId = $(this).attr("processId");
			$.confirm("您确认要删除吗?", function() {
				$.ajax({
					url : ctx + '/mdp/admin/workFlowHandler/processDelete.json',
					method : "post",
					dataType : "json",
					data : {
						processId : processId
					},
					success : function() {
						loadGridData();
					}
				});
			})
		});
		//停止、启用
		td.find(".start_process,.test_process").click(function() {
			thistd = $(this);
			pid = $(this).attr("processid");
			pname = $(this).parent().parent().find("td:eq(1)").html();
			pv = $(this).parent().parent().find("td:eq(3)").html();
			started=$(this).attr("started");
			$.confirm(started == "1" ? "启用此流程会关闭当前正在使用的流程!确认要启用?" : "确认要停止当前流程吗?", function() {
				confirmstart();
			});
		});
	});
}

function submitapply(){
	var checkedItem=[];
	$("[name=checkedItem]").each(function(d){
		 if( $(this).is(":checked") ){
			 checkedItem.push( $(this).val() );
		 }
	});
	console.log(JSON.stringify(checkedItem));
	 $.ajax({
		url : ctx + '/mdp/admin/applyResourceController/startResourceProcess.json',
		method : "post",
		dataType : "json",
		data :  {
			checkedItem : JSON.stringify(checkedItem),
			phone : $("#phoneid").val(),
			dataType:$('#dataTypeid').val(),
			desc : $("#descid").val(),
			resourceId:$("#resourceid").val(),
			dataExchangeRate:$('#dataExchangeRateid').val()
		} ,
		success : function(d) {
			 if(d.success){
				 alert("申请成功!");
			 }else{
				 alert(d.msg);
			 }
			 
		},
		error : function(data, status, e){
			
		}
	}); 
}