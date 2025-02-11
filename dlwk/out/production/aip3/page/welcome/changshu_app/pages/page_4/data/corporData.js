﻿var corporData = {
    left: {
        newIndustry: {
            data2010: {
            	xAxis_data: ["批发和零售业","制造业","租赁和商务服务业","科学研究和技术服务业","建筑业"],
                series_data_share: [376,228,116,207,88]
            },
            data2015: {
            	xAxis_data: ["批发和零售业","制造业","租赁和商务服务业","科学研究和技术服务业","建筑业"],
                series_data_share: [253, 143, 157, 100, 78]
            }
        },
        DieIndustry: {
        	data2010: {
                xAxis_data: ["批发和零售业","制造业","租赁和商务服务业","科学研究和技术服务业","建筑业"],
                series_data_share: [38,32,21,19,15]
            },
            data2015: {
            	xAxis_data: ["批发和零售业","制造业","租赁和商务服务业","科学研究和技术服务业","建筑业"],
                series_data_share: [29,33,10,17,13]
            }
        },
        IndustrySuv: {
            info: [{
                name: "30\u5e74\u4ee5\u4e0a",
                max: 15000
            },
            {
                name: "20-30\u5e74",
                max: 15000
            },
            {
                name: "10-20\u5e74",
                max: 15000
            },
            {
                name: "5-10\u5e74",
                max: 15000
            },
            {
                name: "5\u5e74\u4ee5\u5185",
                max: 15000
            }],
            data: [18, 40, 270, 9740, 11030]
        }
    },
    right: {
        IndustryPercent: {
            data1: [{
                value: 238,
                name: "\u7b2c\u4e00\u4ea7\u4e1a"
            },
            {
                value: 6892,
                name: "\u7b2c\u4e8c\u4ea7\u4e1a"
            },
            {
                value: 14610,
                name: "\u7b2c\u4e09\u4ea7\u4e1a",
                selected: !0
            }],
            data2: [
			{
			    value: 238,
			    name: "农、林、牧、渔业"//1
			},
            {
                value: 5817,
                name: "制造业"//2
            },
            {
                value: 907,
                name: "建筑业"//2
            },
            {
                value: 118,
                name: "电力、热力、燃气及水生产和供应业"//2
            },
            {
                value: 50,
                name: "采矿业"//2
            },
            {
                value: 7456,
                name: "批发和零售业"//3
            },
            
            {
                value: 1955,
                name: "租赁和商务服务业"//3
            },
            {
                value: 1409,
                name: "科学研究和技术服务业"//3
            },
            {
                value: 864,
                name: "交通运输、仓储和邮政业"//3
            },
            {
                value: 642,
                name: "房地产业"//3
            },
            {
                value: 609,
                name: "信息传输、软件和信息技术服务业"//3
            },
            {
                value: 480,
                name: "居民服务、修理和其他服务业"//3
            },
            {
                value: 404,
                name: "金融业"//3
            },
            {
                value: 256,
                name: "文化、体育和娱乐业"//3
            },
            {
                value: 226,
                name: "住宿和餐饮业"//3
            },
            {
                value: 130,
                name: "水利、环境和公共设施管理业"//3
            },
            {
                value: 101,
                name: "卫生和社会工作"//3
            },
            {
                value: 41,
                name: "教育"//3
            },
            {
                value: 35,
                name: "公共管理、社会保障和社会组织"//3
            },
            {
                value: 2,
                name: "国际组织"//3
            }]
        },
        IndustryAveSal: {
            data1: [{
                value: 1083.05,
                name: "\u7b2c\u4e00\u4ea7\u4e1a"
            },
            {
                value: 1783.58,
                name: "\u7b2c\u4e8c\u4ea7\u4e1a"
            },
            {
                value: 999.44,
                name: "\u7b2c\u4e09\u4ea7\u4e1a",
                selected: !0
            }],
            data2: [{
                value: 243.00,
                name: "批发和零售业"
            },
            {
                value: 1536.45,
                name: "制造业"
            },
            {
                value: 2342.53,
                name: "租赁和商务服务业"
            },
            {
                value: 1405.20,
                name: "科学研究和技术服务业"
            },
            {
                value: 1332.53,
                name: "建筑业"
            },
            {
                value: 2278.65,
                name: "交通运输、仓储和邮政业"
            },
            {
                value: 3514.06,
                name: "房地产业"
            },
            {
                value: 741.02,
                name: "信息传输、软件和信息技术服务业"
            },
            {
                value: 269.02,
                name: "居民服务、修理和其他服务业"
            },
            {
                value: 4236.22,
                name: "金融业"
            },
            {
                value: 320.10,
                name: "文化、体育和娱乐业"
            },
            {
                value: 1919.06,
                name: "农、林、牧、渔业"
            },
            {
                value: 524.50,
                name: "住宿和餐饮业"
            },
            {
                value: 4407.22,
                name: "水利、环境和公共设施管理业"
            },
            {
                value: 2813.84,
                name: "电力、热力、燃气及水生产和供应业"
            },
            {
                value: 330.16,
                name: "卫生和社会工作"
            },
            {
                value: 81.59,
                name: "教育"
            }]
        },
        IndustryBuble: {
            data: [[679.21,7456,528960,"批发和零售业"],
               	[570.34,5817,783783,"制造业"],
            	[280.66,1955,97893,"租赁和商务服务业"],
            	[98.11,1409,10955,"科学研究和技术服务业"],
            	[60.22,907,579934,"建筑业"],
            	[40.56,864,10889,"交通运输、仓储和邮政业"],
            	[50.77,642,16678,"房地产业"],
            	[70.66,609,7992,"信息传输、软件和信息技术服务业"],
            	[17.77,480,6678,"居民服务、修理和其他服务业"],
            	[20.6,404,5788,"金融业"],
            	[27.55,256,6357,"文化、体育和娱乐业"],
            	[79.8014,238,67940,"农、林、牧、渔业"],
            	[61.07,226,4688,"住宿和餐饮业"],
            	[30.55,130,6999,"水利、环境和公共设施管理业"],
            	[10.88,118,2679,"电力、热力、燃气及水生产和供应业"],
            	[8.88,101,3678,"卫生和社会工作"],
            	[5.88,50,1457,"采矿业"],
            	[1.67,41,7838,"教育"],
            	[0.34,35,3381,"公共管理、社会保障和社会组织"],
            	[0.18,2,1567,"国际组织"]]
        }
    },
    middel: {
        IndustryDesIncre: {
            IndustryDestiy: {
                xAxis_data: ["2012", "2013", "2014", "2015", "2016"],
                data: [0.05,0.11,49.55,60.18,86.94]
            },
            IndustryIncre: {
            	xAxis_data: ["2012", "2013", "2014", "2015", "2016"],
                data: [0.99,1.11,1.68,2.98,3.20]
            }
        }
    }
};