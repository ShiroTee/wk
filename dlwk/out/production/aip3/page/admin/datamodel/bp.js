$(function() {
	initNodeTree();
	initAddNodeButton();
});

function initNodeTree() {
	$.ajax({
		url : ctx + "/mdp/admin/datamodel/getAllNodes.json",
		type : 'POST',
		success : function(defaultData) {
			if (defaultData.length == 0) {
				enableAddNodeButton("");
			} else {
				$('#treeview8').treeview({
					nodeIcon: 'glyphicon glyphicon-bookmark',
					data : defaultData,
					onNodeSelected : function(event, node) {
						enableAddNodeButton(node.id,node.text);
						enterBPEdit(node.id);
					},
					onNodeUnselected : function(event, node) {
						disableAddNodeButton();
					}
				});
			}
		}
	});
	$(".bpbody").html('<span class="label label-warning"> 点击左侧企业画像节点创建和编辑节点信息</span>');
}


function enterBPEdit(dataid){
	$.ajax({
		url : ctx + "/mdp/admin/datamodel/enterNodeEdit.json",
		type : 'POST',
		data : {
			nodeid : dataid
		},
		success : function(defaultData) {
			 
			var  files = [];
			for(var i = 0 ;i<defaultData.paths.length;i++){
				files.push({
					file:ctx+"/page/admin/datamodel/image/"+defaultData.paths[i],
					name:defaultData.paths[i],
					img:defaultData.IMG
				});
			}
			if(defaultData.SERVICE_URL != ""  && defaultData.SERVICE_URL != undefined  ){
				defaultData.accessurl=$("#cloudUrlId").val()+"/api/"+defaultData.SERVICE_URL;
			}
			defaultData.paths= files;
			$(".bpbody").html($("#bpeditTemplate").render(defaultData));
			$(".saveNodeCss").html("修改");
		}
	});
}

function selectIcon(dom){
	$(".circlecss").removeClass("selected");
	$(".circlecss").addClass("unselected");
	$(dom).addClass("selected");
	$(dom).removeClass("unselected");
}

function initAddNodeButton() {
	$(".addNodeCss").on("click", function() {
		if($(this).hasClass("disabled") ){
			return false;
		} 
		var addDom = $(this);
		$.ajax({
			url : ctx + "/mdp/admin/datamodel/getImgUrl.json",
			type : 'POST',
			data : {},
			success : function(d) {
				    var imagePath = $("#imagePathId").val();
				    
					if( !$(this).hasClass("disabled" ) ){
						var defaultData={
								paths:[]
						};
						for(var i = 0 ;i<d.length;i++){
							defaultData.paths.push({
								file:ctx+"/page/admin/datamodel/image/"+d[i],
								name:d[i]
							});
						}
						defaultData.PARENT_ID=$(addDom).attr("dataid");
						defaultData.PARENT_NAME=$(addDom).attr("dataname");
						$(".bpbody").html($("#bpeditTemplate").render(defaultData));
						$(".deleteNodeCss").hide();
					}
			}
		});
		
	});

	$("body").on("click", ".saveNodeCss", function() {
		var nodeid = $(".bpbody [name=dataid]").val();
		var url = $(".bpbody [name=url]").val();
		var nodeName = $(".bpbody [name=nodename]").val();
		var parentid = $(".bpbody [name=parentid]").val();
		if(parentid==""){
			if ( url.replace(/\s*/g, "") == "") {
			    $.alert("根节点必须选择一个服务地址!");
				return false;
			}	
		}
		if ( nodeName.replace(/\s*/g, "") == "") {
		    $.alert("节点名称不能为空");
			return false;
		}
		 if($(".circlecss.selected").length == 0){
			 $.alert("请选择图标");
			 return false;
		} 
		var img = $(".circlecss.selected").attr("img");
		$.ajax({
			url : ctx + "/mdp/admin/datamodel/saveNode.json",
			type : 'POST',
			data : {
				nodeid : nodeid,
				url : url,
				nodeName : nodeName,
				parentid : parentid,
				img:img,
				checkservice:$("[name=checkservice]").is(':checked')?"1":"0"
			},
			success : function(d) {
				$.message("操作成功");
				$(".bpbody [name=nodeid]").val(d.returnid)
				initNodeTree();
			}
		});
	});
	$("body").on("click", ".deleteNodeCss", function() {
	    if(window.confirm("删除节点将删除节点下面的全部子节点，确认删除吗?")){
	    	var nodeid = $(".bpbody [name=dataid]").val();
			$.ajax({
				url : ctx + "/mdp/admin/datamodel/deleteNode.json",
				type : 'POST',
				data : {
					nodeid : nodeid
				},
				success : function(d) {
					$.message("操作成功");
					 
					initNodeTree();
				}
			});
	    }
		
	});
	
}

function enableAddNodeButton(dataid,dataname) {
	$(".addNodeCss").attr("dataid", dataid);
	$(".addNodeCss").attr("dataname",dataname);
	$(".addNodeCss").removeClass("disabled");
}
function disableAddNodeButton() {
	$(".addNodeCss").removeAttr("dataid");
	$(".addNodeCss").addClass("disabled");
	$(".bpbody").html('<span class="label label-warning"> 点击左侧企业画像节点创建和编辑节点信息</span>');
}

function bpsearchUrl(){
	$(".submenu a").each(function(){
		var href = $(this).attr("href");
		if(href.indexOf("cloudservice?")>=0){
			$(this).trigger("click");
		}
	});
}

function searchBPUrl(dom){
	if($(dom).val() == "") {
		$(".bpbody [name=url]").val("");
		$(".bpbody [name=showurl]").val("");
		return false;
	}
	$.ajax({
		url : ctx + "/mdp/admin/datamodel/searchAPIList.json",
		type : 'POST',
		data : {
			searchapi:$(dom).val()
		},
		success : function(d) {
			if(d==null || d.length==0) {
				$("#searchAPIID").html("");
				$(".bpbody [name=url]").val("");
				$(".bpbody [name=showurl]").val("");
				return false;
			}
			var result={
					datas:d
			};
			$("#searchAPIID").html( $("#apiListTemplate").render(result) );
		}
	});
}
function selectAPIUrl(dom){
	 $(".bpbody [name=url]").val($(dom).attr("value"));
	 $(".bpbody [name=showname]").val($(dom).attr("dataname"));
	 $(".bpbody [name=showurl]").val( $("#cloudUrlId").val()+"/api/"+  $(dom).attr("value"));
	 
	 $(dom).parent().remove();
}