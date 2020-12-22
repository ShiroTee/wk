function isIe(){
	if (!!window.ActiveXObject || "ActiveXObject" in window){
        return true;
    }else{
        return false;
	}
}
function isFilterSupport(){	
	var isFilter = true;
	if(isIe()){ // ie不支持
		isFilter = false;
	}else if(navigator.userAgent.indexOf('Chrome/') != -1){ // 谷歌51不支持，设置51以下都不支持
		var version = navigator.userAgent.substr(navigator.userAgent.indexOf('Chrome/')).replace('Chrome/','').substr(0,navigator.userAgent.substr(navigator.userAgent.indexOf('Chrome/')).replace('Chrome/','').indexOf('.'));
		if(parseInt(version) <= 51){
			isFilter = false;
		}
	}
	return isFilter;
}
var Topo = (function(){
	var scene;	
	var srcData;
	var relation = {};
	function initFun(){
		initDom();
		
		initEvent();		
	}
	function initDom(){
		// 向页面添加必须的JS文件
		$('body').append('<script src="' + ctx +'/resources/jTopo/js/jTopo.js"></script>');
		// $('body').append('<script src="' + ctx
		// +'/page/welcome/portrait/js/topo.js"></script>');
		//if(!isFilterSupport()){
		//	$('body').append('<script src="' + ctx +'/resources/StackBlur/js/StackBlur.js"></script>');
		//	$('body').append('<script src="' + ctx +'/resources/html2canvas/js/html2canvas.min.js"></script>');
		//}
		// 添加样式文件
		$('body').append('<style>html,body{height:100%;} section.filter,#main.filter {filter: blur(20px);padding: 0;} .model_container {position: absolute;width: 100%;height: 100%;top: 0;display: none;z-index:2000}#reset {font-size: 30px;position: absolute;right: 16px;bottom: 170px;color: #fff;cursor: pointer;z-index: 3;border: 1px solid #F5F5F5;border-radius: 3px;width: 82px;height: 38px;line-height: 34px;text-align: center;letter-spacing: .77px;}.hide_model {position: absolute;right: 24px;top: 24px;z-index: 3;cursor: pointer;}.topo_tooltip{position: absolute;border: 1px solid #fff;padding: 6px;border-radius: 4px;background: #fff;z-index:22;}.loadding {margin: 200px auto 0;width: 150px;text-align: center;z-index: 3;position: absolute;width: 100%;}</style>');
		// 添加DOM容器
		var dom = [];
		dom.push('<div class="model_container">');
		dom.push('<div id="reset" title="还原比例">1:1</div>');
		dom.push('<img src="' + ctx + '/resources/jTopo/img/model/colsesvg.svg" class="hide_model" />');
		dom.push('</div>');		
		$('body').append(dom.join(''));
	}
	function initEvent(){
		// 绑定事件
		$(document).on('click','.show_model',function(){
		    var modecode = $(this).attr('data-modecode'); 
			$('section').addClass('filter');
			$('.model_container').show();
			if($('#topoCanvas').length > 0){//alert(modecode);
				$("#topoCanvas").remove();
			}
			$('.model_container').append('<div class="loadding"><div class="bounce1" title="加载中"></div><div class="bounce2"></div><div class="bounce3"></div></div>');						
			//if(!isFilterSupport()){
			//	$('.model_container').css('background-color','#0f151b');				
			//	html2canvas(document.getElementById('main')).then(function(canvas) {					
			//		canvas.id = 'canvasBody';
            //		$('.model_container').append(canvas);
            //		$('.model_container').append('<canvas id="filterCanvas" width="' + $('body').width() +'" height="' + $('body').height() +'" style="background-color: rgba(0, 0, 0,0);cursor: default; position: absolute;;z-index:1"></canvas>');
			//		stackBlurImage( 'canvasBody', 'filterCanvas', 40,'main' );	
			//		$('.model_container').append('<canvas id="topoCanvas" width="' + $('body').width() +'" height="' + $('body').height() +'" style="background-color: rgba(0, 0, 0,0);cursor: default; position: absolute;z-index:2;top: 0;left: 0;"></canvas>');
			//		showDataModel(modecode,draw);			
        	//	});
        	//}else{
        		$('.model_container').append('<canvas id="topoCanvas" width="' + $('body').width() +'" height="' + $('body').height() +'" style="background: url(' + ctx +'/resources/jTopo/img/model@2x.png);background-repeat: no-repeat;background-size: 100%;cursor: default; position: absolute;z-index:2;top: 0;left: 0;"></canvas>');
				
        		showDataModel(modecode,draw);
			//}			
		}).delegate('.hide_model','click',function(){
			$('section').removeClass('filter');	
			$('.model_container').hide();		  
		})
		$('#reset').click(function(){
			Topo.zoomToOne();
		});	
	}
	// 添加元素
            function addEle(name,img,x,y){
            	var Ele = new JTopo.Node(name); 
                if(img && img.length > 0){
                	Ele.setImage(ctx +'/resources/jTopo/img/model/'+ img + (isIe() ? '.png' : 'svg.svg'), true);
                }
                if(x && y){
                	Ele.setLocation(x,y); 
                }
                Ele.font = "14px 微软雅黑"
                Ele.fontColor = '255,255,255';
                Ele.textPosition = 'Bottom_Center';
                Ele.textOffsetY = -8; // 文字向上偏移8个像素
                Ele.showSelected = false;
                Ele.dragable = false;
                Ele.zIndex = 20;
                scene.add(Ele);
                return Ele;
            }
            // 定制节点
            function addNodeFun(name,img,x,y){
            	var node = new JTopo.Container('');
            	node.layout = JTopo.layout.GridLayout(1, 1);
            	node.setBound(x, y, 100, 130);
            	node.showSelected = false;
            	node.dragable = false; 
            	node.alpha = 0;  
            	node.zIndex = 11;    
            	scene.add(node);
            	var Ele = addEle(name,img);
                node.add(Ele);
                return node;
            }
            // 定制组节点
            var colWidth = 70,colHeight = 70;
            function addGroupFun(nodes,img,x,y){
            	// 计算行列 - 约定最多2列
            	var row = parseInt((nodes.length / 2).toFixed(0));
            	row = row == 0 ? 1 : row; 
            	var col = row > 1 ? 2 : 1;
            	if(nodes.length == 2){
            		row = 1;
            		col = 2;
            	}
            	// 绘制容器 - 流式布局
            	var container = new JTopo.Container('');
            	container.layout = JTopo.layout.FlowLayout(30, 50);
            	container.setBound(x - 33, y + 20, col * colWidth + 40 + 30, 0);
            	container.showSelected = false;
            	container.dragable = false; 
            	container.alpha =  1;
            	container.zIndex =  12;
            	container.fillColor = '49,93,129';
            	scene.add(container);
            	// 绘制元素
            	for(var i = 0;i < nodes.length;i++){
            		var Ele = addEle(nodes[i],img);
            		if(nodes[i].length > 8){
            			Ele.nodeFullName = Ele.text;
            			Ele.text= nodes[i].substring(0,8) + '...';
            			Ele.addEventListener('mouseover', function(event){	
							Topo.showToolTip(this.nodeFullName,event.clientX,event.clientY);							
						}).addEventListener('mouseout', function(event){							
							Topo.hideToolTip();							
						});
            		}
                	scene.add(Ele);
                	container.add(Ele);
            	}
            	// 绘制Border容器
            	var border = new JTopo.Container('');
            	border.setBound(x - col * colWidth / 2 + 20 - 5, y, col * colWidth + 2 * 20 + 30, row * (colHeight + 50));
            	border.fillColor = '49,93,129';
            	border.borderColor = '50,122,255';
            	border.borderRadius = 17; // 圆角
            	border.borderWidth = 3;   
            	border.alpha = 1;
            	border.showSelected = false;
            	border.dragable = false; 
            	border.zIndex = 11; 
            	scene.add(border);
            	
            	var node = new JTopo.Container('');
            	node.layout = JTopo.layout.GridLayout(1, 1);
            	node.setBound(x-60, y, 220, 130);
            	node.showSelected = false;
            	node.dragable = false; 
            	node.alpha = 0;  
            	// de.zIndex = 11;
            	scene.add(node);
            	
            	return node;
            	// return border;
            }            
            // 添加连线
            function addLinkFun(nodeA, nodeZ){
                var link = new JTopo.Link(nodeA, nodeZ);
                link.strokeColor = '255,255,255';
                link.lineWidth = 2;
                link.bundleOffset = 10; // 折线拐角处的长度
                link.arrowsRadius = 0;
                scene.add(link);
                return link;
            }
            
            // 定制根节点
            function addRootFun(text,img,x,y){
            	var root = new JTopo.Container('');
            	//root.layout = JTopo.layout.GridLayout(1, 1);
            	root.fillColor = '255,255,255';
            	root.borderRadius = 2; // 圆角
            	root.setBound(x, y, text.length * 16 + 90, 101);     
            	root.showSelected = false;
            	root.dragable = false; 
            	root.alpha = 1;      
            	scene.add(root);
            	var rootEle = new JTopo.Node(text);
            	// rootEle.text = '个人画像';
            	rootEle.setImage(ctx +'/resources/jTopo/img/model/' + img + (isIe() ? '.png' : 'svg.svg'), true);
            	rootEle.textPosition = 'Middle_Right';
            	rootEle.textOffsetX = 12; // 文字向上偏移8个像素
            	rootEle.textOffsetY = -8; // 文字向上偏移8个像素
            	rootEle.fontColor = '74,74,74';
            	rootEle.font = "16px 微软雅黑"
            	rootEle.showSelected = false;
            	// rootEle.dragable = false;
            	rootEle.setLocation(x + 20,y + 30); 
            	scene.add(rootEle);
            	//root.add(rootEle);
            	// 根节点下面的BORDER
            	var rootBorder = new JTopo.Container('');            
            	rootBorder.fillColor = '59,146,253';
            	rootBorder.borderRadius = 2; // 圆角
            	// root.borderWidth = 3; // 边框的宽度
            	rootBorder.setBound(x, y + 100 -3, text.length * 16 + 90, 4);     
            	rootBorder.showSelected = false;
            	rootBorder.dragable = false; 
            	rootBorder.alpha = 1;  
            	rootBorder.zIndex = 12;     
            	scene.add(rootBorder);
            	return rootBorder;
            }
            
            function zoomToOneFun(){
            	scene.scaleX = 1;
				scene.scaleY = 1;
            }
	function setDataFun(data){
		srcData = data;		
	}
	function draw(){
	
		var canvas = document.getElementById('topoCanvas');
        var stage = new JTopo.Stage(canvas);
        stage.wheelZoom = 1.125;
        stage.eagleEye.visible = true;
        scene = new JTopo.Scene(stage);    
        scene.alpha = 0;
        $('.loadding').remove();
        if(!srcData){
        	return;
        }
        
        if(srcData.nodes && srcData.nodes.length > 0){
        	for(var i = 0;i < srcData.nodes.length; i++){
        		var node;
        		if(i == 0){
        			node = Topo.addRoot(srcData.nodes[i].name,srcData.nodes[i].img,srcData.nodes[i].x,srcData.nodes[i].y);
        		}else if(srcData.nodes[i].name instanceof Array){
        			node = Topo.addGroup(srcData.nodes[i].name,srcData.nodes[i].img,srcData.nodes[i].x,srcData.nodes[i].y);
        		}else{
        			node = Topo.addNode(srcData.nodes[i].name,srcData.nodes[i].img,srcData.nodes[i].x,srcData.nodes[i].y);
        		}
        		relation[srcData.nodes[i].id] = node;
        		if(srcData.nodes[i].server){
        			var server = Topo.addNode(srcData.nodes[i].server.name,srcData.nodes[i].server.img,srcData.nodes[i].server.x,srcData.nodes[i].server.y);
        			var link = Topo.addLink(server,node);
        			link.arrowsRadius = 10;
            		link.strokeColor = '50,122,255';
            		link.lineWidth = 4;
        		}
        	}        	
        }
        
        if(srcData.links && srcData.links.length > 0){
        	for(var i = 0;i< srcData.links.length;i++){
        		Topo.addLink(relation[srcData.links[i][1]],relation[srcData.links[i][0]]);
        	}
        }
	}
	function showToolTipFun(text,x,y){
		if($('.topo_tooltip').length == 0){
			$('.model_container').append('<div class="topo_tooltip" style="top:' + y + 'px;left:' + x + 'px">' + text + '</div>')
		}else{
			$('.topo_tooltip').html(text).css({
				top : y + 'px',
				left : x+'px'
			}).show();
		}
	}
	function hideToolTipFun(){		
			$('.topo_tooltip').html('').hide();		
	}
	
	var o = {
		init : initFun,
		addRoot : addRootFun,
		addNode : addNodeFun,
		addGroup : addGroupFun,
		addLink : addLinkFun,
		zoomToOne : zoomToOneFun,
		setData : setDataFun,
		showToolTip:showToolTipFun,
		hideToolTip:hideToolTipFun
	}
	o.init();
	return o;
})();

function showDataModel(modecode,callback){
	//Topo.init();
    console.log(modecode);
	var test=function(){
		var data = { 
				  nodes : [
				  {'id':'root','name':'个人画像','img':'webapp','x':574,'y':24},
				  
				  {'id':'api1','name':'Api名称','img':'Api','x':400,'y':100},
				  {'id':'api2','name':'Api名称','img':'Api','x':800,'y':100},
				  
				  {'id':'table1','name':['表格名称','表格名称','表格名称'],'img':'form','x':400,'y':300,
				  'server':{'id':'severe1','name':'服务器名称','img':'severe','x':200,'y':300}},
				  {'id':'table2','name':'表格名称','img':'form','x':800,'y':300,
				  'server':{'id':'severe2','name':'服务器名称','img':'severe','x':600,'y':300}},
				  
				  {'id':'diaodu1','name':'任务调度','img':'diaodu','x':400,'y':500},
				  {'id':'diaodu2','name':'任务调度','img':'diaodu','x':800,'y':500},
				  
				  {'id':'save1','name':'存储过程','img':'save','x':400,'y':700},
				  {'id':'save2','name':'存储过程','img':'save','x':800,'y':700},
				  
				  {'id':'table3','name':['表格名称','表格名称','表格名称'],'img':'form','x':400,'y':900},
				  {'id':'table4','name':'表格名称','img':'form','x':800,'y':900},
				  
				  {'id':'severe3','name':'服务器名称','img':'severe','x':400,'y':1100 + 1 *120}, 
				  {'id':'severe4','name':'服务器名称','img':'severe','x':800,'y':1100 + 1 *120} ], 
				  
				  links : [ ['root','api1'], ['root','api2'],
				  
				  ['api1','table1'], ['api2','table2'],
				  
				  ['table1','diaodu1'], ['table2','diaodu2'],
				  
				  ['diaodu1','save1'], ['diaodu2','save2'],
				
				  ['save1','table3'], ['save2','table4'],
				  
				  ['table3','severe3'], ['table4','severe4'] ] } 
				  Topo.setData(data);
	}
	 
	 
	var loaddata=function(){
		console.log(modecode);
		$.ajax({
			url : ctx + "/mdp/datamodel/getApiIdsListByCode.json",
			type : 'POST',
			data : {
				code : modecode
			},
			success : function(d) {
				   if(false){
					   test();
					   return;
				   }
				   console.log(d);
                   if(d !=null && d.length>0 && d != undefined){
                	   showModel(d);
                   }
			}
		});
	}
	var showModel = function(d){

		// *****************************************************************************************
		var tasky=0;
		var num = d.length-1;
		var leftx=0;
		if(num ==0){
			leftx=getX()
		}else{
			leftx = getX()-num*400/2;
		}
		
		// 根名称
		var data = {
				nodes:[
					{'id':'root','name':d[0].MODEL_NAME,'img':'webapp','x': num<2?getX()-d[0].MODEL_NAME.length * 16 / 2 + 5:getX()-8,'y':24} 
				],
				links:[]
		}
		
		for(var i = 0 ;i<d.length;i++){
			var y=190;
			if(i != 0){
				leftx+=420; 
			} 
			// API名称
			data.nodes.push({
				id:'api'+i,
				name:d[i].SERVICE_NAMES,
				img:'Api',
				x:leftx,
				y:y
			});		
			// api表
			var tables = d[i].SERVICE_TABLES.split(";");
			if(tables.length==1){
				y+=220;
				data.nodes.push({
					id:"table"+i,
					name:tables[0],
					img:'form',
					x:leftx,
					y:y,
					server:{
						id:"server"+i,
						name:d[i].SERVICE_DB,
						img:'severe',
						x:leftx-190,
						y:y
					}
				});
				if(tasky==0){
					tasky = y;
				} 
			}else{
			   y+=220;
			   var temptables=[];
			   var rownum = Math.ceil( tables.length/2) ;
			   for(var j=0 ;j<tables.length;j++){
				   temptables.push(tables[j]);	
			   }
			   data.nodes.push({
					id:"table"+i,
					name:tables,
					img:'form',
					x:leftx,
					y:y,
					server:{
						id:"server"+i,
						name:d[i].SERVICE_DB,
						img:'severe',
						x:leftx-190,
						y:y
					}
				});
			   
			   if(tasky==0){
					tasky = (y+rownum*90) ;
			   }else if( tasky< (y+rownum*90) ){
				   tasky = y+rownum*90;
			   }
			}
			 
			data.links.push(["api"+i,"table"+i]);
			data.links.push(["root","api"+i ]);
			 
		}
		// *****************************************************************************************
		leftx=0;
		if(num ==0){
			leftx=getX()
		}else{
			leftx = getX()-num*400/2;
		}
		for(var i = 0 ;i<d.length;i++){
			var y=0;
			// 任务调度
			if(i != 0){
				leftx+=420; 
			} 
		    if(d[i].TASKSCHEDULE_NAME != undefined && d[i].TASKSCHEDULE_NAME !=null && d[i].TASKSCHEDULE_NAME !=""){
		    	data.nodes.push({
		    		id:"task"+i,
		    		name:d[i].TASKSCHEDULE_NAME,
		    		img:'diaodu',
		    		x:leftx,
		    		y:tasky+200
		    	});
		    	data.links.push(["table"+i,"task"+i]);
		    }
		    
		    y+=tasky+170+170;
		    
		    if( d[i].TSSAPI != undefined ){
		    	  data.nodes.push({
				    	id:"ddapi"+i,
				    	name:d[i].PROCEDURE_NAMES,
				    	img:"Api",
				    	x:leftx,
				    	y:y+50
				    });
		    	  data.links.push(["task"+i,"ddapi"+i]);
		    	continue;
		    }else if( d[i].TSSETL != undefined ){
		    	  data.nodes.push({
				    	id:"ddetl"+i,
				    	name:d[i].PROCEDURE_NAMES,
				    	img:"ETL",
				    	x:leftx,
				    	y:y+50
				    });
		    	  data.links.push(["task"+i,"ddetl"+i]);
            	continue;
		    }
		    
		    
		    if( d[i].PROCEDURE_NAMES == undefined 　||　d[i].PROCEDURE_NAMES == ""　) continue;
		    data.nodes.push({
		    	id:"save"+i,
		    	name:d[i].PROCEDURE_NAMES,
		    	img:"save",
		    	x:leftx,
		    	y:y+50
		    });
		    
		    data.links.push(["task"+i,"save"+i]);
		    // 存储过程表名
		    if( d[i].PROCEDURE_TABLES == undefined) continue;
		    var tables = d[i].PROCEDURE_TABLES.split(";");
			if(tables.length==1){
				y+=170;
				data.nodes.push({
					id:"ptable"+i,
					name:tables[0],
					img:'form',
					x:leftx,
					y:y+100
					
				});
				  data.nodes.push({
					 
						    id:"pserver"+i,
							name:d[i].PROCEDURE_DB,
							img:'severe',
							x:leftx,
							y:y+300
						 
				   });
				  data.links.push(["ptable"+i,"pserver"+i]);
				 
			}else{
			   y+=170;
			   var temptables=[];
			   var rownum = Math.ceil( tables.length/2) ;
			   for(var j=0 ;j<tables.length;j++){
				   if( tables[j]=="" ) continue;
				   temptables.push(tables[j]);	
			   }
			   if( temptables.length==0) continue;
			   data.nodes.push({
					id:"ptable"+i,
					name:tables,
					img:'form',
					x:leftx,
					y:y+100
					
				});
			   
			   data.nodes.push({
				  
						id:"pserver"+i,
						name:d[i].PROCEDURE_DB,
						img:'severe',
						x:leftx,
						y:y+rownum*150+150
				   
			   });
			   
			   data.links.push(["ptable"+i,"pserver"+i]);
		   }
			 
			data.links.push(["save"+i,"ptable"+i]);
			
			
		}
		// *****************************************************************************************
		console.log(data);
		Topo.setData(data);
		callback();
	}
	var getX=function(){
		return $("body").width()/2-100;
	}
	 
	var gettables=function(talbe){
		talbe.split(";")
	}
	loaddata();
}

function modelExist(code){
	$("[data-modecode]").hide();
	$.ajax({
		url : ctx + "/mdp/admin/datamodel/modelExist.json",
		type : 'POST',
		data : {
			modelcode : code
		},
		success : function(d) {
			 if(!d){
				 $("[data-modecode]").hide();
			 }else{
				 $("[data-modecode]").show();
			 }
		}
	});
}