var adminApprovalPost = [];
var reousrceOwnerApprovalPost = [];
var grantAuthorizationPost = [];
var allPost = [];

$(document).ready(
		function() {
			$('#myTabs a').click(function(e) {
				e.preventDefault()
				$(this).tab('show')
			})
			var configPanel_adminApproval = $("#config-actor-adminApproval");
			var configPanel_reousrceOwnerApproval = $("#config-actor-reousrceOwnerApproval");
			var configPanel_grantAuthorization = $("#config-actor-grantAuthorization");

			// 未选择面板 搜索按钮事件
			$(".panel").find(".no-disabled").click(function() {
				console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
				var keyword = $(this).parent().parent().find("input").val();
				var trs = $(this).parents("div .tab-pane").find("tr");
				var tds = $(this).parents("div .tab-pane").find("tr td:first-child");
				for (var i = 0; i < trs.length; i++) {
					var td = tds.get(i);
					var t = $(td).text().indexOf(keyword);
					if (t >= 0) {
						$(td).parent().show();
					} else {
						$(td).parent().hide();
					}
				}

			});

			// 未选择面板增加岗位按钮
			$(".panel tbody").delegate(".btn-success", "click", function() {
				var selectcss="";
				if($(this).hasClass("admin")){
					selectcss="admincss";
				}else if($(this).hasClass("owner")){
					selectcss="ownercss";
				}else{
					selectcss="authorcss";
				}
				/* var selectPanelName = $(this).parents(".panel").attr("name");
				var numbSpan = $(".steps li[name=" + selectPanelName + "]").find("span:last");
				numbSpan.html(numbSpan.html() - 0 + 1); */
				var yespanel = $(this).parents(".panel-body").find(".roleselected");
				var trno = $(this).parents("tr");
				var tr = "<tr>";
				tr += "<td>" + trno.find("td:eq(0)").text() + "</td>";
				// tr += "<td>" +
				// trno.find("td:eq(1)").text() +
				// "</td>";
				// tr += "<td>" +
				// trno.find("td:eq(2)").text() +
				// "</td>";
				tr += "<td><button class='btn btn-xs btn-danger "+selectcss+"' title='删除岗位' postid='" + $(this).attr("postid") + "'>";
				tr += "<i class='glyphicon glyphicon-minus'></i>";
				tr += "</button></td>";
				tr += "</tr>"
				yespanel.append(tr);
				trno.remove();
			});

			// 已选择面板删除岗位按钮
			$(".panel tbody").delegate(
					".btn-danger",
					"click",
					function() {
						var selectcss="";
						if($(this).hasClass("admincss")){
							selectcss="admin";
						}else if($(this).hasClass("ownercss")){
							selectcss="owner";
						}else{
							selectcss="author";
						}
						var nopanel = $(this).parents(".panel-body").find(".rolenotselected");
						 
						if ($(this).parents("tbody").find("tr").length == 1) {
							$.alert("节点至少包含一个角色!");
							return;
						}
						/* var selectPanelName = $(this).parents(".panel").attr("name");
						var numbSpan = $(".steps li[name=" + selectPanelName + "]").find("span:last");
						numbSpan.html(numbSpan.html() - 1); */
						var tryes = $(this).parents("tr");
						var tr = "<tr>";
						tr += "<td>" + tryes.find("td:eq(0)").text() + "</td>";
						// tr += "<td>" +
						// tryes.find("td:eq(1)").text() +
						// "</td>";
						// tr += "<td>" +
						// tryes.find("td:eq(2)").text() +
						// "</td>";
						tr += "<td><button class='btn btn-xs btn-success "+selectcss+"' title='添加岗位' postid='"
								+ $(this).attr("postid") + "'>";
						tr += "<i class='glyphicon glyphicon-plus'></i>";
						tr += "</button></td>";
						tr += "</tr>"
						nopanel.append(tr);
						tryes.remove();
					});

			// panel的关闭按钮
			$(".panel").delegate(".close", "click", function() {
				$(this).parent().parent().hide();
			});

			// 修改流程配置
			$(".panel").delegate(".approvalsave","click", function() {
				var processId = $(this).attr("processId");//
				//admin审批
				var adminPost = $(".admincss");
				//审批岗位选择
				var reousrceOwnerPost = $(".ownercss");
				// 授权人分配
				var grantPost = $(".authorcss");
				$.ajax({
					dataType : "json",
					type : "post",
					url : ctx+"/mdp/admin/workFlowHandler/editProcessDefine.json",
					data : {
						processId : processId,
						contentXml : $("#process-model").html(),
						adminPost : getSelectedPostId(adminPost),
						reousrceOwnerPost : getSelectedPostId(reousrceOwnerPost),
						grantPost : getSelectedPostId(grantPost),
					},
					success : function(data) {
						if (data.success) {
							$.alert("添加岗位成功!");
							//window.location = ctx + '/app/http/sps/workFlowHandler/getProcessList';
						} else {
							$.alert(data.msg);
						}
					}
				});
			});

			function getSelectedPostId(buttondoms) {
				var selectedPostId = "";
				buttondoms.each(function(){
					selectedPostId += $(this).attr("postId") + ",";
				});
				if (selectedPostId.length != 0) {
					selectedPostId = selectedPostId.substring(0, selectedPostId.length - 1)
				}
				//alert(selectedPostId);
				return selectedPostId;
			}

			configPanel_adminApproval.click(function(e) {
				e.stopPropagation();
			});
			configPanel_reousrceOwnerApproval.click(function(e) {
				e.stopPropagation();
			});
			configPanel_grantAuthorization.click(function(e) {
				e.stopPropagation();
			});
			$(document).click(function() {
				var name = configPanel_adminApproval.attr("task");
				var table = configPanel_adminApproval.find(".object-user");
				var selects = [];
				table.find("tbody input[type=checkbox]:checked").each(function() {
					selects.push($(this).val());
				});
				var taskName = configPanel_adminApproval.find("form input[type='text']").attr("name");
				var displayName = configPanel_adminApproval.find("form input[type='text']").val();
				if (displayName != "") {
					$("#process-model task[name='" + taskName + "']").attr("displayName", displayName);
				}
				if (selects.length > 0) {
					$("#process-model").find("task[name='" + name + "']").attr("assignee", selects.join(","));
				}

				console.log($("#process-model").html());
				configPanel_adminApproval.hide();
				configPanel_reousrceOwnerApproval.hide();
				configPanel_grantAuthorization.hide();
			});
			var panel = $("#process-config-info");
			panel.find("#gobackList").click(function() {
				$("#workflow-list-box").show();
				$("#flowcfg").html("");
				$("#breadid").hide();
			});

			panel.find(".step:gt(1)").not(".step:last").click(
					function(e) {
						// loadAllPost();
						e.stopPropagation();
						configPanel_adminApproval.show();
						var taskName = $(this).parent().attr("name");
						var displayName = $("#process-model task[name='" + taskName + "']").attr("displayName");
						if (taskName == 'adminApproval') {
							configPanel_adminApproval.show();
							configPanel_reousrceOwnerApproval.hide();
							configPanel_grantAuthorization.hide();
							configPanel_adminApproval.find(".panel-heading").html(
									"配置节点参与者【" + $(this).next().html()
											+ "】 <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>");
						} else if (taskName == 'reousrceOwnerApproval') {
							console.log("配置审批岗位");
							configPanel_adminApproval.hide();
							configPanel_reousrceOwnerApproval.show();
							configPanel_grantAuthorization.hide();
							configPanel_reousrceOwnerApproval.find(".panel-heading").html(
									"配置节点参与者【" + $(this).next().html()
											+ "】 <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>");
						} else if (taskName == 'grantAuthorization') {
							configPanel_adminApproval.hide();
							configPanel_reousrceOwnerApproval.hide();
							configPanel_grantAuthorization.show();
							configPanel_grantAuthorization.find(".panel-heading").html(
									"配置节点参与者【" + $(this).next().html()
											+ "】 <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>");
						}
						configPanel_adminApproval.find("form input[type='text']").val("");
						configPanel_adminApproval.find("form input[type='text']").attr("name", taskName)
						if (displayName && displayName != "") {
							// configPanel_adminApproval.find("form
							// input[type='text']").val(displayName);
						}
						configPanel_adminApproval.attr("task", $(this).parent().attr("name"));

					});

			configPanel_adminApproval.find("table thead input[type='checkbox']").click(function() {
				var checked = $(this).is(":checked");
				var length = $(this).parent().parent().parent().parent().find("tbody input[type='checkbox']").prop({
					checked : checked
				});
			});
		});