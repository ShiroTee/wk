/**
 * 
 */
window.onload = function() {
	resizeTheme('社会信用');
};
function resizeTheme(val){
	
	var data1 = null;
	var data2 = null;
	var data3 = null;
	
	var data4 = null;
	var data5 = null;
	var data6 = null;
	var data7 = null;
	
	var d1 = null;
	var d2 = null;
	var d3 = null;
	if('社会信用' == val){
		 data1 = 48;
		 data2 = 32;
		 data3 = 9;
		
		 data4 = 48;
		 data5 = 32;
		 data6 = 8;
		 data7 = 1;
		 
		 d1 = 9;
		 d2 = 32;
		 d3 = 48;
	}else if('公共突发事件应急指挥' == val){
		 data1 = 32;
		 data2 = 22;
		 data3 = 3;
		 
		 data4 = 32;
		 data5 = 22;
		 data6 = 2;
		 data7 = 1;
		 
		 d1 = 3;
		 d2 = 22;
		 d3 = 32;
	}else if('社会治安综合治理' == val){
		 data1 = 23;
		 data2 = 13;
		 data3 = 11;
		 
		 data4 = 23;
		 data5 = 13;
		 data6 = 10;
		 data7 = 1;
		 
		 d1 = 11;
		 d2 = 13;
		 d3 = 23;
	}else if('居住证积分入户' == val){
		 data1 = 54;
		 data2 = 23;
		 data3 = 1;
		 
		 data4 = 54;
		 data5 = 22;
		 data6 = 1;
		 data7 = 1;
		 
		 d1 = 1;
		 d2 = 23;
		 d3 = 54;
	}else if('房屋土地信息' == val){
		 data1 = 43;
		 data2 = 11;
		 data3 = 2;
		 
		 data4 = 43;
		 data5 = 10;
		 data6 = 2;
		 data7 = 1;
		 
		 d1 = 2;
		 d2 = 11;
		 d3 = 43;
	}else if('城市环境' == val){
		 data1 = 54;
		 data2 = 12;
		 data3 = 10;
		
		 data4 = 54;
		 data5 = 12;
		 data6 = 9;
		 data7 = 1;
		 
		 d1 = 10;
		 d2 = 12;
		 d3 = 54;
	}else if('非紧急救助' == val){
		 data1 = 34;
		 data2 = 10;
		 data3 = 2;
		 
		 data4 = 34;
		 data5 = 10;
		 data6 = 1;
		 data7 = 1;
		 
		 d1 = 2;
		 d2 = 10;
		 d3 = 34;
	}else if('健康保障' == val){
		 data1 = 51;
		 data2 = 3;
		 data3 = 2;
		 
		 data4 = 51;
		 data5 = 3;
		 data6 = 1;
		 data7 = 1;
		 
		 d1 = 2;
		 d2 = 3;
		 d3 = 51;
	}else if('社会保障' == val){
		 data1 = 43;
		 data2 = 7;
		 data3 = 3;
		 
		 data4 = 43;
		 data5 = 7;
		 data6 = 2;
		 data7 = 1;
		 
		 d1 = 3;
		 d2 = 7;
		 d3 = 43;
	}else if('食品药品安全' == val){
		 data1 = 27;
		 data2 = 4;
		 data3 = 1;
		 
		 data4 = 27;
		 data5 = 3;
		 data6 = 1;
		 data7 = 1;
		 
		 d1 = 1;
		 d2 = 4;
		 d3 = 27;
	}else if('安全生产' == val){
		 data1 = 19;
		 data2 = 7;
		 data3 = 9;
		
		 data4 = 19;
		 data5 = 7;
		 data6 = 5;
		 data7 = 4;
		 
		 d1 = 9;
		 d2 = 7;
		 d3 = 19;
	}else if('价格监管' == val){
		 data1 = 32;
		 data2 = 6;
		 data3 = 4;
		 
		 data4 = 32;
		 data5 = 6;
		 data6 = 2;
		 data7 = 2;
		 
		 d1 = 4;
		 d2 = 6;
		 d3 = 32;
	}else if('能源安全' == val){
		 data1 = 54;
		 data2 = 7;
		 data3 = 2;
		
		 data4 = 54;
		 data5 = 7;
		 data6 = 1;
		 data7 = 1;
		 
		 d1 = 2;
		 d2 = 7;
		 d3 = 54;
	}else if('旅游休闲' == val){
		 data1 = 34;
		 data2 = 9;
		 data3 = 2;
		 
		 data4 = 34;
		 data5 = 9;
		 data6 = 1;
		 data7 = 1;
		 
		 d1 = 2;
		 d2 = 9;
		 d3 = 34;
	}else if('城乡建设' == val){
		 data1 = 46;
		 data2 = 11;
		 data3 = 6;
		 
		 data4 = 46;
		 data5 = 11;
		 data6 = 5;
		 data7 = 1;
		 
		 d1 = 6;
		 d2 = 11;
		 d3 = 46;
	}else if('文化教育' == val){
		 data1 = 54;
		 data2 = 11;
		 data3 = 1;
		 
		 data4 = 54;
		 data5 = 9;
		 data6 = 1;
		 data7 = 2;
		 
		 d1 = 1;
		 d2 = 11;
		 d3 = 54;
	}else if('交通运输' == val){
		 data1 = 78;
		 data2 = 14;
		 data3 = 6;
		 
		 data4 = 78;
		 data5 = 14;
		 data6 = 4;
		 data7 = 2;
		 
		 d1 = 6;
		 d2 = 14;
		 d3 = 78;
	}

	var demo = {
			left : {
				 //简单柱状图
				infoNeed: {
		            xAxis_data: ['需求的信息资源', '目前可被满足的信息资源'],
		            series_data: [
		                { name: "信息资源个数",color: "#d13e44", data: [Math.ceil(Math.random()*10+1000), Math.ceil(Math.random()*10+1000)] },
		            ],
		        },
		        infoRate: {
		        	
		        	series_data:[
		             {value:data1, name:'数据库'},
		             {value:data2, name:'电子表格'},
		             {value:data3, name:'纸质文件'}
		         ],
		         series_data1:[
		                      {value:d1, name:'不开放'},
		                      {value:d2, name:'依申请开放'},
		                      {value:d3, name:'普遍开放'}		                      
		                  ],
		          series_data2:[
		                        {value:data1, name:'不予共享'},
		                        {value:data2, name:'依条件共享'},
		                        {value:data3, name:'无条件共享'}
		                    ]
		        },
		        
		        newIndustry : {
					data2010 : {
						xAxis_data : [
								"市经济和信息化委员会",
								"市人力资源和社会保障局",
								"市公安局",
								"市卫生和计划生育委员会",
								"市统计局" ],
						series_data_share : [ 449, 287, 189,187, 191 ]
					},
					data2015 : {
						xAxis_data : [
								"市公安局",
								"市民政局",
								"市司法局",
								"市林业和园林管理局",
								"市工商局" ],
						series_data_share : [ 419, 418, 317, 316, 215 ]
					}
				},
			},
			right : {
				
				info_data : {
					data_share_mode:[
									{value:data4, name:'文件传输'},
									{value:data5, name:'接口方式'},
									{value:data6, name:'在线查询'},
									{value:data7, name:'其他'}
			                     ],
			                     
					data_share_mode1:[
						      		{value:Math.ceil(Math.random()*100+100), name:'市经济和信息化委员会'},
						      		{value:Math.ceil(Math.random()*100+100), name:'市人力资源和社会保障局'},
						      		{value:Math.ceil(Math.random()*100+100), name:'市公安局'},
						      		{value:Math.ceil(Math.random()*100+100), name:'市卫生和计划生育委员会'},
						      		{value:Math.ceil(Math.random()*100+100), name:'市统计局'},
						      		{value:Math.ceil(Math.random()*100+100), name:'市民政局'},
						      		{value:Math.ceil(Math.random()*100+100), name:'市城市管理委员会'}
						      	  ],
				},
				IndustryBuble : {
					
					data1:[98,89,78,76,66,63,63,57,56,56,53,47,46,45,42,35,32],
					data2:[19,13,6,12,17,16,12,18,6,9,11,7,11,14,15,14,13],
					data3:[],
					data : ["交通运输","社会信用","居住证积分入户","城市环境","城乡建设","文化教育","能源安全","公共突发事件应急指挥","房屋土地信息","健康保障","社会保障","社会治安综合治理","非紧急救助"
					        ,"旅游休闲","价格监管","安全生产","食品药品安全"]
				}
			},
			middel : {
				IndustryDesIncre : {
					IndustryDestiy : {
						xAxis_data : [ "2011", "2012", "2013", "2014", "2015" ],
						data : [ 109.42, 115.53, 126.94, 137.71, 148.31 ]
					},
					IndustryIncre : {
						xAxis_data : [ "2011", "2012", "2013", "2014", "2015" ],
						data : [ 10.69, 11.44, 12.78, 14.1, 15.26 ]
					}
				}
			}
		};
	pageLoad(demo,val);
}