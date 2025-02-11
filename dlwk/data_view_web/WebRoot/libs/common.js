﻿/*******************************************************************************
 * @common.js
 * @2016-12-4 /
 ******************************************************************************/
var commonClass = {
	/*
	 * @_getDate @获取年月日
	 */
	_getDate : function() {
		var date = new Date;
		var yy = date.getFullYear();
		var mm = date.getMonth() + 1;
		var dd = date.getDate();
		var content = yy + "年" + mm + "月" + dd + "日";
		return content;
	},

	_getRootPath : function() {
		// 获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
		var curWwwPath = window.document.location.href;
		// 获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
		var pathName = window.document.location.pathname;
		var pos = curWwwPath.indexOf(pathName);
		// 获取主机地址，如： http://localhost:8083
		var localhostPaht = curWwwPath.substring(0, pos);
		// 获取带"/"的项目名，如：/uimcardprj
		var projectName = pathName.substring(0,
				pathName.substr(1).indexOf('/') + 1);
		return (localhostPaht + projectName);
	},

	/**
	 * 共同ajax
	 * 
	 * @param url
	 */
	_commAjax : function(url, param) {

		var data1 = null;
		$.ajax({
			url : commonClass._getRootPath() + '/api' + url,
			type : 'POST', // GET
			async : false, // 或false,是否异步
			contentType : 'application/json;charset=utf-8',
			data : param,
			timeout : 5000, // 超时时间
			dataType : 'json', // 返回的数据格式：json/xml/html/script/jsonp/text
			success : function(data, textStatus, jqXHR) {
				data1 = data;
			},

		});
		return data1;
	},
	// 全称变换为简称
	_jName : function(name) {
		var idx = this.fullNames.indexOf(name);
		if (idx == -1) {
			return name;
		}
		{
			return this.shortNames[idx];
		}
	},

	// 确定辅助轴data数组
	_getAuxData : function(array, max) {
		var aux_data = [];
		for (var i = 0; i < array.length; i++) {
			aux_data[i] = max;
		}
		return aux_data;
	},
	// 获取库名称
	_bName : function(a) {
		var newStr = "";
		if ('法人库' == a) {
			newStr = "法人";
		} else if ('人口库' == a) {
			newStr = "人口";
		} else if ('宏观经济库' == a) {
			newStr = "宏观经济";
		} else if ('空间地理库' == a) {
			newStr = "空间地理";
		} else {
			newStr = a;
		}
		return newStr;
	},
	getFullName : function(str, jNames, fNames) {
		$.each(jNames, function(i, n) {
			if (str == n) {
				$.each(fNames, function(j, m) {
					if (j == i) {
						return m;
					}
				});
			}
		});
	},

	fullNames :["大理市公安局","大理市安全生产监督管理局","大理市财政局（国资委）","大理市残疾人联合会","大理市城市管理综合行政执法局","大理市档案局",
		"大理市地方税务局","大理市发展和改革局","大理市妇联","大理市工商联合会","大理市工业和信息化局","大理市供销社","大理市公安局交警大队","大理市规划局",
		"大理市规划局旅游度假区分局","大理市国家税务局","大理市国土资源局","大理市国土资源局旅游度假区分局","大理市环境保护局","大理市机构编制办公室",
		"大理市纪委","大理市交通运输局","大理市教育局","大理市林业局","大理市旅游文化体育广播电视局","大理市民政局（老龄办）","大理市民族宗教事务局","大理市农业局","大理市气象局",
		"大理市人力资源和社会保障局","大理市人民法院","大理市人民防空办公室","大理市商务局","大理市审计局","大理市审计局旅游度假区分局",
		"大理市市场监督管理局","大理市水务局","大理市司法局","大理市统计局","大理市外事办","大理市委党史研究室","大理市委党校","大理市委政法委",
		"大理市卫生和计划生育局","大理市文化产业发展办公室","大理市畜牧局","大理市政府法制局","大理市政务服务管理局","大理市住房和城乡建设局","大理市总工会",
		"大理团市委","大理银监分局","大理州烟草公司大理分公司（烟草专卖局）","创新工业园区财政局","创新工业园区城市管理综合行政执法局","创新工业园区地税分局","创新工业园区发展和改革局","创新工业园区法制局",
		"创新工业园区工商分局","创新工业园区工业和信息化局","创新工业园区规划分局","创新工业园区国税局","创新工业园区国土分局","创新工业园区环保分局",
		"创新工业园区人力资源和社会保障局","创新工业园区土地收购储备交易中心","创新工业园区招商合作局","创新工业园区住房和城乡建设局","海开委财政局","旅游度假区产业规划投资服务中心","旅游度假区产业规划投资服务中心",
		"旅游度假区大理市古城保护管理局","旅游度假区党委、管委会办公室","旅游度假区党务群团工作部","旅游度假区地方税务局","旅游度假区国家税务局","旅游度假区监察室",
		"旅游度假区建设环保局","旅游度假区经济贸易财政局","旅游度假区林业园林局","旅游度假区群众工作局（信访局）","旅游度假区人力资源和社会保障局","旅游度假区社会事业局",
		"旅游度假区土地收购储备中心","旅游度假区招商局"],
	shortNames :["大理市公安局","大理市安全生产监督管理局","大理市财政局（国资委）","大理市残疾人联合会","大理市城市管理综合行政执法局","大理市档案局",
		"大理市地方税务局","大理市发展和改革局","大理市妇联","大理市工商联合会","大理市工业和信息化局","大理市供销社","大理市公安局交警大队","大理市规划局",
		"大理市规划局旅游度假区分局","大理市国家税务局","大理市国土资源局","大理市国土资源局旅游度假区分局","大理市环境保护局","大理市机构编制办公室",
		"大理市纪委","大理市交通运输局","大理市教育局","大理市林业局","大理市旅游文化体育广播电视局","大理市民政局（老龄办）","大理市民族宗教事务局","大理市农业局","大理市气象局",
		"大理市人力资源和社会保障局","大理市人民法院","大理市人民防空办公室","大理市商务局","大理市审计局","大理市审计局旅游度假区分局",
		"大理市市场监督管理局","大理市水务局","大理市司法局","大理市统计局","大理市外事办","大理市委党史研究室","大理市委党校","大理市委政法委",
		"大理市卫生和计划生育局","大理市文化产业发展办公室","大理市畜牧局","大理市政府法制局","大理市政务服务管理局","大理市住房和城乡建设局","大理市总工会",
		"大理团市委","大理银监分局","大理州烟草公司大理分公司（烟草专卖局）","创新工业园区财政局","创新工业园区城市管理综合行政执法局","创新工业园区地税分局","创新工业园区发展和改革局","创新工业园区法制局",
		"创新工业园区工商分局","创新工业园区工业和信息化局","创新工业园区规划分局","创新工业园区国税局","创新工业园区国土分局","创新工业园区环保分局",
		"创新工业园区人力资源和社会保障局","创新工业园区土地收购储备交易中心","创新工业园区招商合作局","创新工业园区住房和城乡建设局","海开委财政局","旅游度假区产业规划投资服务中心","旅游度假区产业规划投资服务中心",
		"旅游度假区大理市古城保护管理局","旅游度假区党委、管委会办公室","旅游度假区党务群团工作部","旅游度假区地方税务局","旅游度假区国家税务局","旅游度假区监察室",
		"旅游度假区建设环保局","旅游度假区经济贸易财政局","旅游度假区林业园林局","旅游度假区群众工作局（信访局）","旅游度假区人力资源和社会保障局","旅游度假区社会事业局",
		"旅游度假区土地收购储备中心","旅游度假区招商局"]
};