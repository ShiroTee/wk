//保存用户所选择的项，翻页保存
var allSelectArray = [];

//获取服务目录，构建成树

//获取树第一个叶子节点，初始化的函数
var currentRootNode = null;// 当前选择的根节点
function NodeClass() { // 定义一个节点类
	var nodeValue = null;
	var nextNode = null;// 下一个节点
}

function InitQueue(queue) { // 初始化一个队列
	queue = new NodeClass();// 头节点为空
	return queue;
}

function Empty(queue) { // 判断一个队列为空
	var returnValue = false;
	if (queue.nextNode == null) {
		returnValue = true;
	}
	return returnValue;
}

function EnQueue(queue, x) { // 入队操作
	var returnValue = queue;
	var currentNode = queue;// 头节点
	while (currentNode.nextNode != null) {// current 一直到来到最后一个元素
		currentNode = currentNode.nextNode; //
	}
	var tempNode = new NodeClass(); // 生成一个新的元素，并且值为X
	tempNode.nodeValue = x;
	currentNode.nextNode = tempNode; // 插入到最后
	return returnValue;
}

function DeQueue(queue) { // 出队操作
	var returnValue = null;
	if (queue.nextNode != null) { // 如果队列非空
		if (queue.nextNode.nextNode == null) { // 如果是最后一个元素（即使队头又是队尾，只有一个元素）
			returnValue = queue.nextNode.nodeValue; // 取得该元素的值
			queue.nextNode = null;// 将头指针的queue的nextNode设置为NULL
		} else {
			returnValue = queue.nextNode.nodeValue; // 取得该元素的值
			queue.nextNode = queue.nextNode.nextNode; // 将第二个元素的指针赋给queue的nextNode，相当于删除了第一个元素
		}
	}
	return returnValue; // 返回被删除的第一个元素的值
}

function GetHead(queue) { // 获得队头元素的值
	return queue.nextNode.nodeValue;
}

function Clear(queue) { // 清空一个队列
	queue.nextNode = null;
	queue.nodeValue = null;
}

function Current_Size(queue) { // 获得当前队列的大小
	var returnValue = 0;
	var currentNode = queue.nextNode;// 头结点
	while (currentNode != null) { // 从头往尾计算
		returnValue++;
		currentNode = currentNode.nextNode; // 指向下一个元素
	}
	return returnValue; // 返回大小
}

function findFirstCheafNode() {
	var childNodes = null;
	var targetNode = null;// 待查找的目标叶子节点
	var queue = null;// 辅助队列
	queue = InitQueue(queue);// 初始化队列
	queue = EnQueue(queue, currentRootNode);// 根节点入队列

	while (!Empty(queue)) {// 只要队列不空
		node = DeQueue(queue);// 出队列
		if (node.hasChildNodes()) {// 非叶子节点
			childNodes = node.childNodes;
			// 其孩子节点从左到右依次入队列
			for ( var i = 0, len = childNodes.length; i < len; ++i) {
				queue = EnQueue(queue, childNodes[i]);
			}
		} else {// 找到第一个叶子节点
			return node;
		}
	}
}

Ext.onReady(init);
function init() {
	var root = new Ext.tree.AsyncTreeNode({
		text : '空间服务目录',
		id : "004c0acc-3ce5-4f43-82a5-93bd715a7972",
		expanded : true,
		draggable : false
	});

	var tree = new Ext.tree.TreePanel({
//		title : '服务目录分类列表',
		root : root,
		border : false,
		autoWidth : true,
		height : 570,
		renderTo : 'tree',
		animate : true,
		autoScroll: true,
		enableDD : false,
		containerScroll : true,
		cls : 'listtree',
		listeners : {
			'beforeload' : function(node) {
				node.loader = new Ext.tree.TreeLoader({
					url : '../list/servlist.do',
					baseParams : {
						m : 'node',
						id : node.id,
						n : 'space'
					}
				});
			}
		}
	});
	
	// 树的点击事件，单击树叶子节点时触发
	tree.on("click",function(node) {
		if (node.leaf || true) {
			document.getElementById("showservlist").src = "../ap/servlist/servlist.html?id="
				+ node.id
				+ "&nodeName="
				+ encodeURI(encodeURI(node.text));
		}
	});
	
	document.getElementById("showservlist").src = "../ap/servlist/servlist.html?id="
		+ tree.root.id
		+ "&nodeName="
		+ encodeURI(encodeURI(tree.root.text));
	
	return;
	
//	加载完成后，将所有节点展开
//	root.on('load', function(node) {
//		tree.expandAll() ;
//	});
//	
//	 //在节点展开的过程中，就有新节点添加，新节点添加时触发，当遇到第一个叶子节点时，展示出该叶子节点下的所有服务
//	var flag = 0 ;
//	tree.on('append', function(tree, parent, node, index){
//		if(node.leaf && flag == 0){
//			flag = 1 ;
//			document.getElementById("showservlist").src = "../ap/servlist/servlist.html?id="
//				+ node.id
//				+ "&nodeName="
//				+ encodeURI(encodeURI(node.text));
////			node.fireEvent('click',node) ;
//		}
//	});
	
}
