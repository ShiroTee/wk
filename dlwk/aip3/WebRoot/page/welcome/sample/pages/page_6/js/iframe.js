/**
 * 
 */

window.onload = function() {
	right1();
};

function right1(){
	var c = echarts.init(document.getElementById("right1")), d = [], e = {
		color : "#f16e15 #fee235 #457bdb #bda29a #ffb570 #90d760 #81c3ff #c23531 #fee235 #00BFFF #d48265 #76EE00 #749f83 #FF34B3 #BF3EFF #546570 #00EE00 #211c49 #962364 #8fad4a #36cfd1 #7f3900"
			.split(" "),
		title : {
			text : "",
			textStyle : {
				fontSize : 15,
				color : "#018ccd",
				fontWeight : "normal",
				fontFamily : "Microsoft YaHei"
			}
		},
		tooltip : {
	        trigger: 'item',
	        formatter: function (params) {
	            if (params.indicator2) {    // is edge
	                return params.indicator2 + ' ' + params.name + ' ' + params.indicator;
	            } else {    // is node
	                return params.name
	            }
	        }
	    },
	    series : [
	        {
	            name: '德国队效力联盟',
	            type:'chord',
	            sort : 'ascending',
	            sortSub : 'descending',
	            ribbonType: false,
	            radius: '70%',
	            itemStyle: {
	                normal: {
	                    label: {
	                        show: true,
	                        textStyle: {
	                            color: '#00a0e8'
	                        }
	                    },
	                    nodeStyle : {
	                        brushType : 'both',
	                        borderColor : 'rgba(255,215,0,0.4)',
	                        borderWidth : 1
	                    }, 
	                    chordStyle:{
		                	color:'#00a0e8'
		                },
	                },
	               
	                emphasis: {
	                    label: {
	                        show: false
	                        // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
	                    },
	                    nodeStyle : {
	                        //r: 30
	                    },
	                    linkStyle : {}
	                }
	            },	
	            // 使用 nodes links 表达和弦图
	            nodes: [
	                {name:'市公安局'},
	                {name:'市民政局'},
	                {name:'市工商局'},
	                {name:'市城乡建设委员会'},
	                {name:'市食品药品监督管理局'},
	                {name:'市质监局'},
	                {name:'市发展和改革委员会'},
	                {name:'市人力资源和社会保障局'},
	                {name:'市统计局'},
	                {name:'市司法局'},
	                {name:'市文化广电新闻出版局'},
	                {name:'市地税局'},
	                {name:'市教育局'},
	                {name:'市残疾人联合会'},
	                {name:'市国有资产监督管理委员会'},
	                
	                {name:'市工商行政管理局'},
	                {name:'市科学技术局'},
	                {name:'市经济和信息化委员会'},
	                {name:'市商务委员会'},
	                {name:'市口岸与物流办公室'},
	                {name:'市城乡房产管理局'},
	                {name:'市发展和改革委员会'},
	                {name:'市旅游局'},
	                {name:'市国土资源局'},
	                {name:'市交通运输委员会'},
	                {name:'市投资促进委员会'},
	                {name:'市财政局'},
	                {name:'市农业委员会'},
	                {name:'市林业和园林管理局'},
	                {name:'市气象局'},
	                {name:'市金融工作办公室'},
	                
	                {name:'市国家税务局'},
	                {name:'市规划管理局'},
	                {name:'市卫生和计划生育委员会'},
	                {name:'市中级人民法院'},
	                {name:'市质量技术监督局'},
	                {name:'市水务局'},
	                {name:'市安全生产监督管理局'},
	                {name:'市环境保护局'},
	                {name:'市金融工作办公室'}
	            ],
	            links: [
	                {source: '市公安局', target: '市民政局', weight: 1, name: '需求'},
	                {source: '市公安局', target: '市工商局', weight: 1, name: '需求'},
	                {source: '市公安局', target: '市城乡建设委员会', weight: 1, name: '需求'},
	                {source: '市工商局', target: '市民政局', weight: 1, name: '需求'},
	                {source: '市工商局', target: '市食品药品监督管理局', weight: 1, name: '需求'},
	                {source: '市工商局', target: '市公安局', weight: 1, name: '需求'},
	                {source: '市工商局', target: '市质监局', weight: 1, name: '需求'},
	                {source: '市国有资产监督管理委员会', target: '市工商局', weight: 1, name: '需求'},
	                {source: '市国有资产监督管理委员会', target: '市发展和改革委员会', weight: 1, name: '需求'},
	                {source: '市国有资产监督管理委员会', target: '市城乡建设委员会', weight: 1, name: '需求'},
	                {source: '市国有资产监督管理委员会', target: '市人力资源和社会保障局', weight: 1, name: '需求'},
	                {source: '市国有资产监督管理委员会', target: '市统计局', weight: 1, name: '需求'},
	                {source: '市残疾人联合会', target: '市司法局', weight: 1, name: '需求'},
	                {source: '市残疾人联合会', target: '市文化广电新闻出版局', weight: 1, name: '需求'},
	                {source: '市残疾人联合会', target: '市人力资源和社会保障局', weight: 1, name: '需求'},
	                {source: '市残疾人联合会', target: '市地税局', weight: 1, name: '需求'},
	                {source: '市残疾人联合会', target: '市教育局', weight: 1, name: '需求'},
	                {source: '市教育局', target: '市残疾人联合会', weight: 1, name: '需求'},
	                {source: '市教育局', target: '市人力资源和社会保障局', weight: 1, name: '需求'},
	                {source: '市教育局', target: '市公安局', weight: 1, name: '需求'},	                
	                {source: '市教育局', target: '市统计局', weight: 1, name: '需求'},
	                {source: '市教育局', target: '市城乡建设委员会', weight: 1, name: '需求'},
	                
	                {source: '市发展和改革委员会', target: '市工商行政管理局', weight: 1, name: '需求'},
	                {source: '市发展和改革委员会', target: '市人力资源和社会保障局', weight: 1, name: '需求'},
	                {source: '市发展和改革委员会', target: '市科学技术局', weight: 1, name: '需求'},
	                {source: '市发展和改革委员会', target: '市经济和信息化委员会', weight: 1, name: '需求'},
	                {source: '市发展和改革委员会', target: '市商务委员会', weight: 1, name: '需求'},
	                {source: '市发展和改革委员会', target: '市口岸与物流办公室', weight: 1, name: '需求'},
	                {source: '市发展和改革委员会', target: '市城乡房产管理局', weight: 1, name: '需求'},
	                {source: '市发展和改革委员会', target: '市旅游局', weight: 1, name: '需求'},
	                {source: '市发展和改革委员会', target: '市国土资源局', weight: 1, name: '需求'},
	                {source: '市发展和改革委员会', target: '市国有资产监督管理委员会', weight: 1, name: '需求'},
	                {source: '市发展和改革委员会', target: '市交通运输委员会', weight: 1, name: '需求'},
	                {source: '市发展和改革委员会', target: '市财政局', weight: 1, name: '需求'},
	                {source: '市发展和改革委员会', target: '市投资促进委员会', weight: 1, name: '需求'},
	                {source: '市发展和改革委员会', target: '市农业委员会', weight: 1, name: '需求'},
	                {source: '市发展和改革委员会', target: '市统计局', weight: 1, name: '需求'},
	                {source: '市发展和改革委员会', target: '市公安局', weight: 1, name: '需求'},
	                {source: '市发展和改革委员会', target: '市民政局', weight: 1, name: '需求'},
	                {source: '市发展和改革委员会', target: '市司法局', weight: 1, name: '需求'},
	                {source: '市发展和改革委员会', target: '市林业和园林管理局', weight: 1, name: '需求'},
	                {source: '市发展和改革委员会', target: '市气象局', weight: 1, name: '需求'},	                
	                {source: '市发展和改革委员会', target: '市城乡建设委员会', weight: 1, name: '需求'},
	                {source: '市发展和改革委员会', target: '市金融工作办公室', weight: 1, name: '需求'},
	                
	                {source: '市经济和信息化委员会', target: '市工商行政管理局', weight: 1, name: '需求'},
	                {source: '市经济和信息化委员会', target: '市人力资源和社会保障局', weight: 1, name: '需求'},
	                {source: '市经济和信息化委员会', target: '市国家税务局', weight: 1, name: '需求'},
	                {source: '市经济和信息化委员会', target: '市发展和改革委员会', weight: 1, name: '需求'},
	                {source: '市经济和信息化委员会', target: '市投资促进委员会', weight: 1, name: '需求'},
	                {source: '市经济和信息化委员会', target: '市规划管理局', weight: 1, name: '需求'},
	                {source: '市经济和信息化委员会', target: '市食品药品监督管理局', weight: 1, name: '需求'},
	                {source: '市经济和信息化委员会', target: '市卫生和计划生育委员会', weight: 1, name: '需求'},
	                {source: '市经济和信息化委员会', target: '市城乡房产管理局', weight: 1, name: '需求'},
	                {source: '市经济和信息化委员会', target: '市文化广电新闻出版局', weight: 1, name: '需求'},
	                {source: '市经济和信息化委员会', target: '市科学技术局', weight: 1, name: '需求'},
	                
	                
	                {source: '市民政局', target: '市经济和信息化委员会', weight: 1, name: '需求'},
	                {source: '市民政局', target: '市城乡建设委员会', weight: 1, name: '需求'},	                
	                {source: '市民政局', target: '市交通运输委员会', weight: 1, name: '需求'},
	                {source: '市民政局', target: '市教育局', weight: 1, name: '需求'},
	                {source: '市民政局', target: '市人力资源和社会保障局', weight: 1, name: '需求'},
	                {source: '市民政局', target: '市公安局', weight: 1, name: '需求'},	                
	                {source: '市民政局', target: '市卫生和计划生育委员会', weight: 1, name: '需求'},
	                {source: '市民政局', target: '市农业委员会', weight: 1, name: '需求'},
	                {source: '市民政局', target: '市城乡房产管理局', weight: 1, name: '需求'},
	                {source: '市民政局', target: '市水务局', weight: 1, name: '需求'},
	                {source: '市民政局', target: '市质量技术监督局', weight: 1, name: '需求'},	 
	                
	                {source: '市司法局', target: '市中级人民法院', weight: 1, name: '需求'},
	                {source: '市司法局', target: '市民政局', weight: 1, name: '需求'},
	                
	                {source: '市规划管理局', target: '市安全生产监督管理局', weight: 1, name: '需求'},
	                
	                {source: '市交通运输委员会', target: '市城乡建设委员会', weight: 1, name: '需求'},	                
	                {source: '市交通运输委员会', target: '市公安局', weight: 1, name: '需求'},
	                {source: '市交通运输委员会', target: '市规划管理局', weight: 1, name: '需求'},
	                {source: '市交通运输委员会', target: '市国土资源局', weight: 1, name: '需求'},              
	                {source: '市交通运输委员会', target: '市发展和改革委员会', weight: 1, name: '需求'},
	                
	                {source: '市林业和园林管理局', target: '市工商行政管理局', weight: 1, name: '需求'},
	                {source: '市林业和园林管理局', target: '市农业委员会', weight: 1, name: '需求'},
	                {source: '市林业和园林管理局', target: '市规划管理局', weight: 1, name: '需求'},
	                {source: '市林业和园林管理局', target: '市城乡建设委员会', weight: 1, name: '需求'},	 	                
	                {source: '市林业和园林管理局', target: '市环境保护局', weight: 1, name: '需求'},
	                {source: '市林业和园林管理局', target: '市水务局', weight: 1, name: '需求'},
	                {source: '市林业和园林管理局', target: '市交通运输委员会', weight: 1, name: '需求'},	 	                
	                {source: '市林业和园林管理局', target: '市发展和改革委员会', weight: 1, name: '需求'},
	                {source: '市质量技术监督局', target: '市工商行政管理局', weight: 1, name: '需求'},
	            ]
	        }
	    ]
	};
	c.setOption(e);
}