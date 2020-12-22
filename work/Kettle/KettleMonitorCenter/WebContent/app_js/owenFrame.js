/**
 * 
 */
var expandNodeList=new Array();
$(document).ready(function(){

		$('body').layout();
		$( "#accordion-east" ).accordion();//accordion可折叠的
		$( "#accordion-west" ).accordion();
		$( "#tabs" ).tabs();
		$("#recoverLast").button();
		$("#editTask").button();
		$("#startTask").button();
		$("#stopTask").button();
		$("#reloadTask").button();
		$("#getNewKettle").button();
		
		//定时自动刷新(每分钟一次)
		setInterval(function(){
			jQuery("#tid_task_list").trigger("reloadGrid");//重新加载当前表格，也会向服务器发起新的请求
		},30000);//设定时间为30秒
		
		$("#tid_task_list").jqGrid({
			url:"pageInit.action",//jqGrid控件通过这个参数得到需要显示的数据，具体的返回值可以使XML也可以是Json。
			datatype:"json",//用于设定将要得到的数据类型
			mtype:"POST",//定义使用哪种方法发起请求，GET或者POST。
			autowidth:true,//是否自适应宽度
			height:300,
			treeGrid: false, //是否允许是使用树形的Grid
			multiselect:true,//是否允许多行选择
			/**
			 * 用于设置Grid中一次显示的行数，默认值为20。
			 * 正是这个选项将参数rows（prmNames中设置的）通过url选项设置的链接传递到Server。
			 * 注意如果Server返回的数据行数超过了rowNum的设定，则Grid也只显示rowNum设定的行数。
			 * */
			rowNum : "-1", //不限行数
			colNames:["体系结构","任务ID","任务名称","状态","运行间隔（分钟）","","阶段"],//用于设定各列的字段名
			colModel: [ 
			            {name: 'treeLink'		, width: 80		, align: "left"		}, 
			            {name: 'taskId'			, width: 40		, align: 'left'		,editable: true},
			            {name: 'taskName'		, width: 160	, align: 'left'		},
			            {name: 'status'			, width: 40		, align: 'left'		},
			            {name: 'interval'		, width: 40		, align: 'left'	,editable: true,editoptions:{size:10},editrules:{number:true,minValue:30,maxValue:10000}	},
			            {name: 'orgName'		, width: 160	, align: 'left'		,hidden:true,editable: true},
			            {name: 'stageName'		, width: 160	, align: 'left'		,hidden:true,editable: true}
			            ],
			treeGridModel: "adjacency",//nested和adjacency；默认值：nested
		    ExpandColumn: "treeLink",
			caption: "任务列表",//设置Grid表格的标题，如果未设置，则标题区域不显示。
			saveState:true,
			jsonReader: {//一个数组，用来设定如何解析从Server端发回来的json数据。
				repeatitems: false,
			    root: "rowList"//从后台传递的数据
			},
		    treeReader : {  
		        level_field: 		"level",  
		        parent_id_field: 	"parent",   
		        leaf_field: 		"leaf",  
		        expanded_field: 	"expanded"
		    },
		    beforeProcessing:function(data, status, xhr){
		    	
		    	for(var i = 0;i < data.rowList.length;i++){//遍历界面上所有的节点
		    		for(var j = 0;j < expandNodeList.length;j++){//遍历展开的节点
		    			if(data.rowList[i].id == expandNodeList[j]){
		    				data.rowList[i].expanded = "true";//将匹配到的节点的展开属性设置为true
		    			}
		    		}
		    	}
		    }
		    ,
		    editurl:"getUpdateTaskInfo.action",
			onSelectRow: function(ids) { //当点击行时触发的事件
				var currentRowData=getSelectTasks();//获取当前行的所有数据
				var taskLogArray = new Array();
				var taskInfo = new TaskAllInfoObj(ids,currentRowData.treeLink,currentRowData.taskId,currentRowData.taskName,currentRowData.status,currentRowData.interval,currentRowData.orgName,currentRowData.stageName);
				taskLogArray.push(taskInfo);
				var param =$.toJSON(taskLogArray);//将需要推送给后台的数据形成Json格式的字符串，等待后台进行解析
				if(ids >=1000000) { //判断当前选中行是否是任务
					jQuery("#task_detail").jqGrid('setGridParam',{url:'taskInfoLoad.action?jsonParam='+param}); 
					//动态设置任务日志的标题，并且重新加载表格
					jQuery("#task_detail").jqGrid('setCaption',currentRowData.taskName).trigger('reloadGrid'); 					
				}
			}
		});
		
		var orgExpandNode = $.fn.jqGrid.expandNode;//获取展开的节点对象
	    var orgCollapseNode = $.fn.jqGrid.collapseNode;//获取展开的缩进去的节点
		$.jgrid.extend({
			expandNode: function (rc) {
				orgExpandNode.call(this, rc);
				expandNodeList.push(rc._id_);//加入节点
			},
			collapseNode: function (rc) {
				orgCollapseNode.call(this, rc);
				expandNodeList.pop(rc._id_);//删除节点
			}
		});

		//显示选中task的详细信息
		$("#task_detail").jqGrid({
			datatype:"json",
			mtype:"POST",
			autowidth:true,
			height:200,	
			rowNum : "-1", 
			colNames:["开始时间","结束时间","出错数","出错信息","日志详情"],
			colModel: [ 
			            
			            {name: 'start_time'		, width: 50			, align: 'left'	    },
			            {name: 'end_time'		, width: 50			, align: 'left'		},  
			            {name: 'error_number'	, width: 50			, align: 'left'	    },
			            {name: 'error_info'		, width:320			, align: 'left'		,hidden:true	},
			            {name: 'logDetailLink'	, width: 50			, align: 'left'	    }
			          ],
			treeGridModel: "adjacency",
			caption: "任务详细信息",
			jsonReader: {
				repeatitems: false,
			    root: "rowList"
			},
			gridComplete: function(){
				var ids = jQuery("#task_detail").jqGrid('getDataIDs');
				for(var i=0;i < ids.length;i++){
					btn = "<a href='#' onclick='showLogDetail(" + ids[i] + ")' >查看</a>";
					jQuery("#task_detail").jqGrid('setRowData',ids[i],{logDetailLink:btn});
				}	
			}
		});
		
		//开始任务
		$("#startTask").click(function(){
			var currentRow = jQuery("#tid_task_list").jqGrid('getGridParam','selarrrow');
			
			if(  null!=currentRow) {
				var taskArray = new Array();
				//获取选中行数据的内容
				var runTaskName = "";
				for(var i=0 ; i<currentRow.length; i++){
					var currentRowData=jQuery("#tid_task_list").jqGrid('getRowData',currentRow[i]);
					if(currentRowData.status=="运行中"){
						layerNGMsg("对不起，不能重复运行此任务！");
						return;
					}
					
					var taskObj = new TaskObj(currentRowData.taskId,currentRowData.interval,currentRowData.orgName,currentRowData.stageName);
					taskArray.push(taskObj);
					runTaskName += "，"+currentRowData.taskName;
				}
				
				var param = "jsonParam=" + $.toJSON(taskArray);

				$.ajax({
					type : "post",
					url : "startTasks.action",
					dataType : "json",
					data : param,
					beforeSend : function(XMLHttpRequest) {
					},
					success : function(data) {
						alert("【"+runTaskName+"】"+"准备执行.......");
					},
					complete : function(XMLHttpRequest, textStatus) {
						
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						//alert("发生异常"+"textStatus:"+textStatus+"----"+"errorThrown:"+errorThrown);
						alert("【"+currentRowData.taskName+"】所在的节点可能已经断开，请检查网络！");
					}
				});
			}
			else 
				alert("请选择具体的任务项！");
		}
		);
	
		//停止任务
		$("#stopTask").click(function(){
			var currentRow = jQuery("#tid_task_list").jqGrid('getGridParam','selarrrow');
			if(  null!=currentRow) {
				var taskArray = new Array();
				//获取选中行数据的内容
				var runTaskName = "";
				for(var i=0 ; i<currentRow.length; i++){
					var currentRowData=jQuery("#tid_task_list").jqGrid('getRowData',currentRow[i]);
					if(currentRowData.status=="未执行"){
						layerNGMsg("对不起，此任务尚未执行！");
						return;
					}
					
					var taskObj = new TaskObj(currentRowData.taskId,currentRowData.interval,currentRowData.orgName,currentRowData.stageName);
					taskArray.push(taskObj);
					runTaskName += "，"+currentRowData.taskName;
				}
				
				var param = "jsonParam=" + $.toJSON(taskArray);
				
				$.ajax({
					type : "post",
					url : "stopTasks.action",
					dataType : "json",
					data : param,
					beforeSend : function(XMLHttpRequest) {
					},
					success : function(result,textStatus) {
						alert("【"+runTaskName+"】"+"即将停止.......");
					},
					complete : function(XMLHttpRequest, textStatus) {
						
					},
					error : function() {
						alert("【"+currentRowData.taskName+"】节点可能已经断开，请检查网络！");
					}
				});
			}
			else 
				alert("请选择具体的任务项！");
		})
		
	});


function getSelectTasks(){//获取选中行的内容，可多选
	var index = jQuery("#tid_task_list").jqGrid("getGridParam","selrow");
	var currentRowData=jQuery("#tid_task_list").jqGrid('getRowData',index);
	return currentRowData;
};
function layerOKMsg(msg){
	layer.alert(msg,1);//第二个参数指弹出框的图标
};
function layerNGMsg(msg){
	layer.alert(msg,8);
};
function setIntervalTimes(){//修改任务运行时间间隔的方法
	var selTask = getSelectTasks();
	if(selTask.status=="运行中"){
		layerNGMsg("对不起，请先停止此任务再修改运行间隔！");
		return;
	}
	if( selTask.treeLink!=""){
		layerNGMsg("请选择具体的任务");
		return;
	}
	
	layer.prompt({title: "任务间歇时间"}, function(val, index, elem){//弹出输入框，参数val记录输入的值
		
		if (isNaN(val)) {//判断输入值是否为数字
			layerNGMsg("间隔时间只能为数字，单位为分钟");
		}if(val<1){
			layerNGMsg("间隔时间不能少于1分钟！");
		}else {
			layer.close(index);//点击确定按钮后使得弹出框关闭
			var taskArray = new Array();
			var taskObj = new TaskObj(selTask.taskId,val,selTask.orgName,selTask.stageName);//将界面上需要传给后台的数据装入TaskObject对象中
			taskArray.push(taskObj);//将此对象推入一个数组
			
			var param = "jsonParam=" + $.toJSON(taskArray);//形成一个JSON格式的字符串
			
			$.ajax({
				type : "post",//提交的方式
				url : "saveTasks.action",//提交的地址
				dataType : "json",//提交数据的类型
				data : param,//具体的数据
				beforeSend : function(XMLHttpRequest) {
				},
				success : function(result) {
					//alert("【"+selTask.taskName+"】所在的节点可能已经断开，请检查网络！");
					alert("修改成功,此任务即将运行。。。。");
				},
				complete : function(XMLHttpRequest, textStatus) {
				},
				error : function() {//提价出错之后执行的方法
					alert("【"+selTask.taskName+"】所在的节点可能已经断开，请检查网络！");
				}
			});
		}
	})
};

function showLogDetail(id){
	var allLog=jQuery("#task_detail").jqGrid('getRowData');
	if(allLog[id-1].error_number !=0)
		alert(allLog[id-1].error_info);
	else
		alert("此运行没有出错！");
	
}

//获取新流程
function reloadTasks(){
	var currentRow = jQuery("#tid_task_list").jqGrid('getRowData');
	if(null ==currentRow || currentRow.length == 0){
		layerNGMsg("列表为空！");
		return;
	}
	
	$.ajax({
		type : "post",
		url : "getNewTask.action",
		dataType : "json",
		beforeSend : function(XMLHttpRequest) {
		},
		success : function(result,textStatus) {
			alert("获取新流程成功！");
		},
		complete : function(XMLHttpRequest, textStatus) {
			
		},
		error : function() {
			alert("【"+currentRowData.taskName+"】所在的节点可能已经断开，请检查网络！");
		}
	});
}



