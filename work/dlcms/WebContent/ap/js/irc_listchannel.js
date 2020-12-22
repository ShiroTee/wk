//保存用户所选择的项，翻页保存
var allSelectArray = [];

//获取服务目录，构建成树
//取得资源大类URL;
var resClassURL = "../irc/getIRCResClass.jspx" ;

Ext.onReady(function (){
	$.post(resClassURL,function(data){
		data = eval("(" + data + ")") ;
		if(data.success){
			var resClassArr = data.data ;
			for(var i = 0; i < resClassArr.length; i++){
				$("#res_class_sel").append('<option value="' + resClassArr[i].txid + '">' + resClassArr[i].name + '</option>') ;
			}
			var defalutCatalogId = $(".dr_top_left select").find("option:selected").attr("value");
			init(defalutCatalogId);
		}else{
			Ext.MessageBox.show({
				title : '加载提示',
				msg : "加载资源分类失败，请联系管理员！",
				buttons : {
					ok : '确定'
				},
				animEl : 'res_class'
			});
		}
		
	});
});
function init(catalogId) {
	//取得树对象，以便当下拉列表切换时，将原来的树先销毁，再新建
	var tree = Ext.getCmp("catalogTree");
	if(tree != null){
		tree.destroy();
	}
	//开始新建树
	var root = new Ext.tree.AsyncTreeNode({
		text : $(".dr_top_left select").find("option:selected").text(),
		id : catalogId,
		expanded : true,
		draggable : false
	});

	tree = new Ext.tree.TreePanel({
//		title : '服务目录分类列表',
		id : "catalogTree",
		root : root,
		border : false,
		autoWidth : true,
		height : 570,
		renderTo : 'tree',
		animate : true,
		autoScroll: true,
		enableDD : false,
		containerScroll : false,
		cls : 'listtree',
		listeners : {
			'beforeload' : function(node) {
				node.loader = new Ext.tree.TreeLoader({
					url : '../irc/getIRCTree.jspx'//默认会自动将node = node.id作为请求参数,传向后台。
				});
			}
		}
	});
	
	// 树的点击事件，当点击树叶子节点时触发
	tree.on("click",function(node) {
		if (node.leaf || true) {
			document.getElementById("irc_showservlist").src = "../ap/servlist/irc_servlist.html?id="
				+ node.id
				+ "&isRoot="
				+ (node.getDepth() == 0 ? "root" : "notroot")
				+ "&nodeName="
				+ encodeURI(encodeURI(node.text));
		}
	});
	
	//左边树加载完成后自动加载右侧页面
	document.getElementById("irc_showservlist").src = "../ap/servlist/irc_servlist.html?id="
		+ tree.root.id
		+ "&isRoot=root"
		+ "&nodeName="
		+ encodeURI(encodeURI(tree.root.text));
}
