$(function()
{
	AutoLayout.exec([$('#sidebar'),$('.main-content')]);
	
	//---------->> 滑动页面头部变化
	$(window).scroll(function(){
	    var top = $(window).scrollTop();   //设置变量top,表示当前滚动条到顶部的值
        if (top > 56)// 当滚动条到顶部的值大于136（原head+nav）时
        {
			$(".top").addClass("small");
			$(".totop").fadeIn();
        }
		else
		{
		    $(".top").removeClass("small");
			$(".totop").fadeOut();
		}
	});	
	
	var top = $(window).scrollTop();   //设置变量top,表示当前滚动条到顶部的值
    if (top > 56)// 当滚动条到顶部的值大于136（原head+nav）时
    {
		$(".top").addClass("small");
		$(".totop").fadeIn();
    }
	
	$(".totop").click(function(){
		$('body,html').animate({scrollTop:0},1000);
		return false;
	});
	$('body').delegate('.dropdown-toggle','mouseup',function(e){
	
		if(e.which != 1 || $(this).parent().parent().attr('id') != "ROOT"){
			return;
		}
		
		if($(this).hasClass('cur')){
			$(this).removeClass('cur');
			$(this).next().removeClass('show');
			return;
		}
		$(this).parent().siblings().find('.dropdown-toggle.cur').removeClass('cur');
		$(this).addClass('cur');
		$(this).parent().siblings().find('.submenu').removeClass('show');
		$(this).next().addClass('show');
		e.stopPropagation();
		return false;
	});
	/*$('.nav').css('height',($('#page-content').height() + 4) + 'px');*/

    loadOrgChartData();
	$(".import").click(loadImportHandler);
	$(".update").click(loadUpdateHandler);
	$("#apply_re").click(function(){
		var node=
		{
				nodeId:new Date().getTime()+"",
				text:"补录申请",
				href:"admin/applyMakeUp/index.html"
		};
		workspace.addPage(node);
	});
	$("#link_list").click(linkDataNeedHandler);
	var uploader = WebUploader.create(
	{

		// swf文件路径
		swf : CTX + '/resources/plugins/webuploader/Uploader.swf',

		// 文件接收服务端。
		server : 'metadata/upload.json'
	});
	uploader
			.on(
					'uploadAccept',
					function(file, response)
					{
						uploader.reset();
						if (response.msg)
						{
							$.alert("文件上传失败!" + response.msg);
						} else
						{
							$
									.alert(
											"文件上传成功!",
											function()
											{
												var html = '<i class="icon-spinner icon-spin orange bigger-200" style="margin-top:50px;margin-left:50px;"></i><font color="red">正在导入数据...</font>';
												$(".import").html(html);
												$.submitData(
												{
													url:"metadata/import.json",
													sucFun:function(data)
													{
														$.alert("数据导入完成!"+data.tip);
														$(".import").html("<span>导入元数据</span>");
													},
													errorFun:function(data)
													{
														$.alert(data.msg);
														$(".import").html("<span>导入元数据</span>");
													}
												});
											});

						}
					});
	$("body")
			.on(
					"change",
					"#import-data-file",
					function(e)
					{
						uploader.reset();
						uploader.addFiles(e.target.files);
						var reqData =
						{};
						reqData.fileType = uploader.getFiles()[0].ext;
						reqData.fileName = uploader.getFiles()[0].name;
						if (!(reqData.fileType == "xls" || reqData.fileType == "xlsx"))
						{
							$.alert("只能上传xls或xlsx格式文档!");
							return;
						}
						uploader.option('formData', reqData);
						uploader.upload();
						$(this)
								.replaceWith(
										'<input type="file" id="import-data-file" name="file" style="display: none;" accept=".xls,.xlsx" />');
					});

	
});

function loadImportHandler()
{
	$('#import-data-file').trigger("click");
}

function loadUpdateHandler()
{
}

//初始化数据
function loadOrgChartData(){
	exData();
    seData();
}

//获取数据交换数据
function exData() {
    var exdata=[];
    var xAdata=[];
	$.ajax({
		url:ctx+"/mdp/admin/exchange.json",
        cache: false,
        dataType: "json",
        type: "post",
        success: function (data) {
            if(data.length>0){
            	var o={};
            	o.name = '数据汇聚';
            	o.type = 'line';
            	o.stack= '总量';
            	o.data=[];
                var e={};
                e.name = '数据提供';
                e.type = 'line';
                e.stack= '总量';
                e.data=[];
                for (var i = 0 ; i<data.length;i++){
            		var item = data[i];
            		xAdata.push(item.time);
            		o.data.push(item.incoming);
            		e.data.push(item.exchange);
				}
				exdata.push(o);
				exdata.push(e);
			}
            queryDataExchByTime(exdata,xAdata);
        }
	})

}
//获取服务调用数据
function seData() {
	var sedata=[];
    var xAdata=[];
	$.ajax({
        url:ctx+"/mdp/admin/service.json",
        cache: false,
        dataType: "json",
        type: "post",
        success: function (data) {
        	if (data.length>0){
                var o={};
                o.name = '调用量';
                o.type = 'line';
                o.stack= '总量';
                o.data=[];
                for (var i = 0 ; i<data.length;i++) {
                    var item = data[i];
                    xAdata.push(item.time);
                    o.data.push(item.service);
                }
                sedata.push(o);
			}
            queryServiceByTime(sedata,xAdata);
        }
	})
}
// 左边的图
function queryDataExchByTime(exdata,xAdata)
{
	var myChart = echarts.init(document.getElementById("dataExch"));

	var option =
	{
		/*title :
		{
			text : '近7日数据交换'
		},*/
		tooltip :
		{
			trigger : 'axis'
		},
		legend :
		{
			data : [ '数据汇聚', '数据提供' ],
			top:15,
			right:15
		},
		grid :
		{
			left : '3%',
			right : '4%',
			bottom : '3%',
			containLabel : true
		},
		xAxis :
		{
			type : 'category',
			boundaryGap : false,
			data : xAdata,
            splitLine: {
                show: false
            }
		},
		yAxis :
		{
			type : 'value'
		},
		series : exdata
	};
	myChart.setOption(option);
}
// 右边的图
function queryServiceByTime(sedata,xAdata)
{
	var myChart = echarts.init(document.getElementById("service"));
	var option =
	{
		/*title :
		{
			text : '数据服务调用'
		},*/
		tooltip :
		{
			trigger : 'axis'
		},
		legend :
		{
			data : [ '调用量'],
			top:15,
			right:15
		},
		grid :
		{
			left : '3%',
			right : '4%',
			bottom : '3%',
			containLabel : true
		},
		xAxis :
		{
			type : 'category',
			boundaryGap : false,
			data : xAdata,
            splitLine: {
                show: false
            }
		},
		yAxis :
		{
			type : 'value'
		},
		series : sedata
	};
	myChart.setOption(option);
}

//链接数据需求
function linkDataNeedHandler(){
//	window.open("admin/dataDemand/manage.html");
	var node=
	{
			nodeId:new Date().getTime()+"",
			text:"数据需求管理",
			href:"admin/dataDemand/manage.html"
	};
	workspace.addPage(node);
}
//链接资源申请
function linkApplyResHandler(){
//	window.open("admin/resourcesApply/manage.html");
	var node=
		{
				nodeId:new Date().getTime()+"",
				text:"资源申请管理",
				href:"admin/resourcesApply/manage.html"
		};
	workspace.addPage(node);
}