//又被删除的文件名称字符串(字符串比较方便处理),需要在初始化函数之后重置值
var deleteFileNames="";
//这个值必须和设置的值（uploadLimit）一样大,代表原始最大可上传值，需要在初始化函数中重置值
var limitSize=1;
//全局变量，使用时始终++obj,用来生成不重复的id
var objNo=1;
/*页面加载完毕初始化下载参数*/
//$(document).ready(
//	initUploadify()
//);
//初始化上传控件的方法
function initUploadify(){
	$("#uploadify").uploadify({
		'debug'		     : false, 
		'swf' 			 : 'uploadify/uploadify.swf',	//swf文件路径
		'method'		 : 'post',	// 提交方式
		'uploader'		 : getHandlerRequestUrl()+ "serviceInfoHandler/uploadFiledd", // 服务器端处理该上传请求的程序(servlet, struts2-Action)
		'preventCaching' : true,		// 加随机数到URL后,防止缓存
		'buttonCursor'	 : 'hand',	// 上传按钮Hover时的鼠标形状
//		'buttonImage'	 : 'uploadify/uploadify.png',	// 按钮的背景图片,会覆盖文字
		'buttonText'	 : '选择文件'	, //按钮上显示的文字，默认”SELECTFILES”
		'height'		 : 20	, // 30 px
		'width'			 : 64	, // 120 px
		'fileObjName'	 : 'filedata',	//文件对象名称, 即属性名
		'fileSizeLimit'	 : 5000	,	// 文件大小限制, 100M(原始单位KB)
		'fileTypeDesc'	 : 'any'	,	//文件类型说明 any(*.*)
		'fileTypeExts'	 : '*.*;*.txt',		// 允许的文件类型,分号分隔
//		'formData'		 : {'id':'1', 'name':'myFile'} , //指定上传文件附带的其他数据。也动态设置。可通过getParameter()获取
		'multi'			 : true ,	// 允许多文件上传
		'progressData'	 : 'percentage',	// 进度显示方式, speed-上传速度,percentage-百分比	
		'queueID'		 : 'fileQueue',//上传队列的DOM元素的ID号
		'queueSizeLimit' : 99	,	// 队列长度
		'removeCompleted': false	,	// 上传完成后是否删除队列中的对应元素
		'removeTimeout'	 : 10	,	//上传完成后多少秒后删除队列中的进度条, 
		'requeueErrors'	 : false,	// 上传失败后重新加入队列
		'uploadLimit'	 : 1,	// 最多上传文件数量
		'successTimeout' : 30	,//表示文件上传完成后等待服务器响应的时间。超过该时间，那么将认为上传成功。
		//以下是各种事件
		//没有兼容的FLASH时触发
		'onFallback':function(){
			alert( '找不到兼容的Flash!' );
		},
		//上传文件失败触发
		'onUploadError':function(file, errorCode, errorMsg, errorString){
			//上传失败之后也必须为取消增加事件，否则提示不友好
			var div=$("#fileQueue").children("div:last-child");
			var div_id=div.attr("id");//此处取得id必须使用dom方式
			var aa=div.find("div:first-child").find("a:first-child");
			var a_id="uploadAID"+(++objNo);
			aa.attr("id",a_id);
			aa.attr("href","javascript:uploadify_delete('"+a_id+"','"+div_id+"','"+file.name+"');");
			//上传失败，将之增加到上传删除文件名字符串中
			if(deleteFileNames.indexOf(name+"?????", 0)==-1){				
				deleteFileNames+=file.name+"?????";
			}
			//通过uploadify的settings方式重置上传限制数量    
			$('#uploadify').uploadify('settings','uploadLimit',++limitSize);
//			alert(file.name + ' 上传失败! ' + 
//            	'错误码: ' + errorCode +
//             	',错误信息:' + errorMsg 
//			);
		},
		//在每一个文件上传成功后触发
		'onUploadSuccess':function(file, data, response){
			console.log(file.name + ' 上传成功!');
			alert(file.name + ' 上传成功!');
			//上传成功之后必须修改取消事件，自己实现文件的删除(uploadify本身没有删除回调函数)
			var div=$("#fileQueue").children("div:last-child");
			var div_id=div.attr("id");//此处取得id必须使用dom方式
			var aa=div.find("div:first-child").find("a:first-child");
			var a_id="uploadAID"+(++objNo);
			aa.attr("id",a_id);
			aa.attr("href","javascript:uploadify_delete('"+a_id+"','"+div_id+"','"+file.name+"');");
			//上传成功，之前可能删除过，将之从已删除的名称中移除	
			deleteFileNames=deleteFileNames.replace(file.name+"?????", "");
		}
	});
	deleteFileNames="";
	limitSize=1;
}
//实现上传文件删除的方法
function uploadify_delete(a_id,id,fileName){
	//获取a标签的原来href属性
	var old_href=$("#"+a_id).attr("href");
	//防止手快多点几次x，把x的功能禁用(此处有个知识点，this不能在herf中生效，只能用id迂回)    
	$("#"+a_id).attr("href","javascript:void(0);");
	$.ajax({
		url : 'Delete',
		type : 'post',
		async : false,//此处同步请求
		data:{"fileName":fileName},
//		dataType : 'json',
		success : function(contentStr) {
			$('#uploadify').uploadify('cancel', id);
			if(deleteFileNames.indexOf(fileName+"?????", 0)==-1){				
				deleteFileNames+=fileName+"?????";
			}
			//通过uploadify的settings方式重置上传限制数量    
			$('#uploadify').uploadify('settings','uploadLimit',++limitSize);
		},
		error:function(){
			//失败将href重新绑定
			$("#"+a_id).attr("href",old_href);
			alert("删除失败");
		}
	});
}