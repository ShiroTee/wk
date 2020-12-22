var corporData = {
	left : {
		//叠加柱状图
        stackBar: {
            xAxis_data: ['部门 1','部门 2','部门 3','部门 4','部门 5','部门6','部门 7','部门 8','部门 9','部门 10'],

            series_data: [
                { name: "信息资源总量(条)", stack: "no", color: "#d13e44", data: [23457,34578,43224,23445,32343,32453,32454,12345,32453,32497] },
                { name: "数据库(条)", stack: "共享", color: "#ffce19", data: [15467,4235,23431,12367,2345,7895,4356,4567,7643,4577] },
                { name: "电子表格(条)", stack: "共享", color: "#26beff", data: [3579,23452,4579,12345,3468,9876,5437,9865,8743,7954] }
            ],
        },
		newIndustry : {
			data2010 : {
				xAxis_data : [
						"部门4",
						"部门2",
						"部门1",
						"部门8",
						"部门11" ],
				series_data_share : [ 6665, 3329, 2771, 1901, 1626 ]
			},
			data2015 : {
				xAxis_data : [
						"部门2",
						"部门13",
						"部门12",
						"部门1",
						"部门3" ],
				series_data_share : [ 5323, 3622, 1878, 737, 966 ]
			}
		},
		 //简单柱状图
		infoNeed: {
            xAxis_data: ['需求的信息资源', '目前可被满足的信息资源'],
            series_data: [
                { name: "信息资源个数",color: "#d13e44", data: [187, 113] },
            ],
        },
        infoRate: {
        	series_data:[
             {value:825, name:'数据库'},
             {value:510, name:'电子表格'},
             {value:334, name:'纸质文件'}
         ],
         series_data1:[
                      {value:634, name:'不开放'},
                      {value:1315, name:'普遍开放'},
                      {value:2659, name:'依申请开放'}
                  ],
          series_data2:[
                        {value:240, name:'不予共享'},
                        {value:2831, name:'依条件共享'},
                        {value:1537, name:'无条件共享'}
                    ]
        },
		DieIndustry : {
			data2010 : {
				xAxis_data : [
						"\u6279\u53d1\u548c\u96f6\u552e\u4e1a",
						"\u5236\u9020\u4e1a",
						"\u79df\u8d41\u548c\u5546\u52a1\u670d\u52a1\u4e1a",
						"\u5c45\u6c11\u670d\u52a1\u3001\u4fee\u7406\u548c\u5176\u4ed6\u670d\u52a1\u4e1a",
						"\u5efa\u7b51\u4e1a" ],
				series_data_share : [ 2225, 705, 486, 601, 193 ]
			},
			data2015 : {
				xAxis_data : [
						"\u6279\u53d1\u548c\u96f6\u552e\u4e1a",
						"\u5236\u9020\u4e1a",
						"\u79df\u8d41\u548c\u5546\u52a1\u670d\u52a1\u4e1a",
						"\u4fe1\u606f\u4f20\u8f93\u3001\u8f6f\u4ef6\u548c\u4fe1\u606f\u6280\u672f\u670d\u52a1\u4e1a",
						"\u519c\u3001\u6797\u3001\u7267\u3001\u6e14\u4e1a" ],
				series_data_share : [ 4256, 4811, 297, 337, 330 ]
			}
		},
		IndustrySuv : {
			info : [ {
				name : "30\u5e74\u4ee5\u4e0a",
				max : 108771
			}, {
				name : "20-30\u5e74",
				max : 108771
			}, {
				name : "10-20\u5e74",
				max : 108771
			}, {
				name : "5-10\u5e74",
				max : 108771
			}, {
				name : "5\u5e74\u4ee5\u5185",
				max : 108771
			} ],
			data : [ 267, 3459, 25133, 47159, 108771 ]
		}
	},
	right : {
		 stackBar: {
	            xAxis_data: ['部门 1','部门 2','部门 3','部门 4','部门 5','部门6','部门 7','部门 8','部门 9','部门 10'],

	            series_data: [
	                { name: "对公众服务业务事项总量(条)", stack: "no", color: "#d13e44", data: [23457,34578,43224,23445,32343,32453,32454,12345,32453,32497] },
	                { name: "对个人服务业务事项数量(条)", stack: "共享", color: "#ffce19", data: [15467,4235,23431,12367,2345,7895,4356,4567,7643,4577] },
	                { name: "对企业服务业务事项数量(条)", stack: "共享", color: "#26beff", data: [3579,23452,4579,12345,3468,9876,5437,9865,8743,7954] },
	                { name: "对个人和企业服务业务事项数量(条)", stack: "共享", color: "#d48265", data: [3579,23452,4579,12345,3468,9876,5437,9865,8743,7954] }
	            ],
	        },
		info_data : {
			data_share_mode:[
							{value:335, name:'文件传输'},
							{value:310, name:'接口方式'},
							{value:234, name:'在线查询'},
							{value:135, name:'其他'}
	                     ],
	                     
			data_share_mode1:[
				      		{value:677, name:'实时'},
				      		{value:30, name:'月'},
				      		{value:24, name:'季度'},
				      		{value:4, name:'年'},
				      		{value:35, name:'其他'}
				      	  ],
		},
		
		IndustryPercent : {
			data1 : [ {
				value : 5855,
				name : "\u7b2c\u4e00\u4ea7\u4e1a"
			}, {
				value : 47106,
				name : "\u7b2c\u4e8c\u4ea7\u4e1a"
			}, {
				value : 117841,
				name : "\u7b2c\u4e09\u4ea7\u4e1a",
				selected : !0
			} ],
			data2 : [
					{
						value : 5855,
						name : "\u519c\u3001\u6797\u3001\u7267\u3001\u6e14\u4e1a"
					},
					{
						value : 280,
						name : "\u91c7\u77ff\u4e1a"
					},
					{
						value : 34401,
						name : "\u5236\u9020\u4e1a"
					},
					{
						value : 504,
						name : "\u7535\u529b\u3001\u70ed\u529b\u3001\u71c3\u6c14\u53ca\u6c34\u751f\u4ea7\u548c\u4f9b\u5e94\u4e1a"
					},
					{
						value : 11921,
						name : "\u5efa\u7b51\u4e1a"
					},
					{
						value : 64840,
						name : "\u6279\u53d1\u548c\u96f6\u552e\u4e1a"
					},
					{
						value : 4762,
						name : "\u4ea4\u901a\u8fd0\u8f93\u3001\u4ed3\u50a8\u548c\u90ae\u653f\u4e1a"
					},
					{
						value : 1387,
						name : "\u4f4f\u5bbf\u548c\u9910\u996e\u4e1a"
					},
					{
						value : 4246,
						name : "\u4fe1\u606f\u4f20\u8f93\u3001\u8f6f\u4ef6\u548c\u4fe1\u606f\u6280\u672f\u670d\u52a1\u4e1a"
					},
					{
						value : 2123,
						name : "\u91d1\u878d\u4e1a"
					},
					{
						value : 4954,
						name : "\u623f\u5730\u4ea7\u4e1a"
					},
					{
						value : 17749,
						name : "\u79df\u8d41\u548c\u5546\u52a1\u670d\u52a1\u4e1a"
					},
					{
						value : 11253,
						name : "\u79d1\u5b66\u7814\u7a76\u548c\u6280\u672f\u670d\u52a1\u4e1a"
					},
					{
						value : 471,
						name : "\u6c34\u5229\u3001\u73af\u5883\u548c\u516c\u5171\u8bbe\u65bd\u7ba1\u7406\u4e1a"
					},
					{
						value : 3836,
						name : "\u5c45\u6c11\u670d\u52a1\u3001\u4fee\u7406\u548c\u5176\u4ed6\u670d\u52a1\u4e1a"
					},
					{
						value : 522,
						name : "\u6559\u80b2"
					},
					{
						value : 203,
						name : "\u536b\u751f\u548c\u793e\u4f1a\u5de5\u4f5c"
					},
					{
						value : 1491,
						name : "\u6587\u5316\u3001\u4f53\u80b2\u548c\u5a31\u4e50\u4e1a"
					},
					{
						value : 4,
						name : "\u516c\u5171\u7ba1\u7406\u3001\u793e\u4f1a\u4fdd\u969c\u548c\u793e\u4f1a\u7ec4\u7ec7"
					} ]
		},
		IndustryAveSal : {
			data1 : [ {
				value : 284.0622569,
				name : "\u7b2c\u4e00\u4ea7\u4e1a"
			}, {
				value : 4345.325,
				name : "\u7b2c\u4e8c\u4ea7\u4e1a"
			}, {
				value : 7093.247,
				name : "\u7b2c\u4e09\u4ea7\u4e1a",
				selected : !0
			} ],
			data2 : [
					{
						value : 284.0622569,
						name : "\u519c\u3001\u6797\u3001\u7267\u3001\u6e14\u4e1a"
					},
					{
						value : 388.1505937,
						name : "\u91c7\u77ff\u4e1a"
					},
					{
						value : 352.6121928,
						name : "\u5236\u9020\u4e1a"
					},
					{
						value : 2907.595498,
						name : "\u7535\u529b\u3001\u70ed\u529b\u3001\u71c3\u6c14\u53ca\u6c34\u751f\u4ea7\u548c\u4f9b\u5e94\u4e1a"
					},
					{
						value : 696.9663228,
						name : "\u5efa\u7b51\u4e1a"
					},
					{
						value : 185.3023816,
						name : "\u6279\u53d1\u548c\u96f6\u552e\u4e1a"
					},
					{
						value : 422.6852376,
						name : "\u4ea4\u901a\u8fd0\u8f93\u3001\u4ed3\u50a8\u548c\u90ae\u653f\u4e1a"
					},
					{
						value : 75.60760963,
						name : "\u4f4f\u5bbf\u548c\u9910\u996e\u4e1a"
					},
					{
						value : 161.9729152,
						name : "\u4fe1\u606f\u4f20\u8f93\u3001\u8f6f\u4ef6\u548c\u4fe1\u606f\u6280\u672f\u670d\u52a1\u4e1a"
					},
					{
						value : 1514.632023,
						name : "\u91d1\u878d\u4e1a"
					},
					{
						value : 1296.361783,
						name : "\u623f\u5730\u4ea7\u4e1a"
					},
					{
						value : 597.5143659,
						name : "\u79df\u8d41\u548c\u5546\u52a1\u670d\u52a1\u4e1a"
					},
					{
						value : 528.0950039,
						name : "\u79d1\u5b66\u7814\u7a76\u548c\u6280\u672f\u670d\u52a1\u4e1a"
					},
					{
						value : 654.1470232,
						name : "\u6c34\u5229\u3001\u73af\u5883\u548c\u516c\u5171\u8bbe\u65bd\u7ba1\u7406\u4e1a"
					},
					{
						value : 130.3735398,
						name : "\u5c45\u6c11\u670d\u52a1\u3001\u4fee\u7406\u548c\u5176\u4ed6\u670d\u52a1\u4e1a"
					},
					{
						value : 183.0831325,
						name : "\u6559\u80b2"
					},
					{
						value : 1084.840434,
						name : "\u536b\u751f\u548c\u793e\u4f1a\u5de5\u4f5c"
					},
					{
						value : 181.917656,
						name : "\u6587\u5316\u3001\u4f53\u80b2\u548c\u5a31\u4e50\u4e1a"
					},
					{
						value : 76.71428571,
						name : "\u516c\u5171\u7ba1\u7406\u3001\u793e\u4f1a\u4fdd\u969c\u548c\u793e\u4f1a\u7ec4\u7ec7"
					} ]
		},
		IndustryBuble : {
			data : [
					[ 524, 529, 12,
							"民政局" ],
					[ 1275, 263, 72, "卫生局" ],
					[ 1780, 613, 22, "公积金" ],
					[
							691,
							394,
							13,
							"地税局" ],
					[ 380, 412, 26, "国税局" ],
					[ 755, 536, 34,
							"公安局" ],
					[ 405, 468, 45,
							"工商局" ],
					[ 265, 168, 50,
							"统计局" ],
					[
							801,
							350,
							67,
							"人社局" ],
					[ 236, 934, 16, "交通局" ],
					 ]
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