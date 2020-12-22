/*******************************************
	@common.js
    @2016-12-4
/*******************************************/
var commonClass = {
    /*
        @_getDate
        @获取年月日
    */
    _getDate: function () {
        var date = new Date;
        var yy = date.getFullYear();
        var mm = date.getMonth() + 1;
        var dd = date.getDate();
        var content = yy + "年" + mm + "月" + dd + "日";
        return content;
    },

    /*
        @XX
        @XX
    */
    
    _jName: function(a){
    	
	    var newStr = ""; 
	   if('市发展和改革委员会' == a){
		   newStr = "市发改委"; 
	   }else if('市经济和信息化委员会' == a){
		   newStr = "市经信委"; 
	   }else if('市规划管理局' == a){
		   newStr = "市规划局"; 
	   }else if('市交通运输委员会' == a){
		   newStr = "市交委"; 
	   }else if('市林业和园林管理局' == a){
		   newStr = "市林业园林局"; 
	   }else if('市工商行政管理局' == a){
		   newStr = "市工商局"; 
	   }else if('市质量技术监督局' == a){
		   newStr = "市质监局"; 
	   }else if('市城市管理委员会' == a){
		   newStr = "市城管委"; 
	   }else if('市城乡房产管理局' == a){
		   newStr = "市房管局"; 
	   }else if('市国有资产监督管理委员会' == a){
		   newStr = "市国资委"; 
	   }else if('市人民政府政务服务中心' == a){
		   newStr = "市政府政务中心"; 
	   }else if('市人民政府应急管理办公室' == a){
		   newStr = "市应急办"; 
	   }else if('市残疾人联合会' == a){
		   newStr = "市残联"; 
	   }else if('市科学技术局' == a){
		   newStr = "市科技局"; 
	   }else if('市国土资源局' == a){
		   newStr = "市国土局"; 
	   }else if('市人力资源和社会保障局' == a){
		   newStr = "市人社局"; 
	   }else if('市城乡建设委员会' == a){
		   newStr = "市建委"; 
	   }else if('市商务委员会' == a){
		   newStr = "市商务委"; 
	   }else if('市文化广电新闻出版局' == a){
		   newStr = "市文广新局"; 
	   }else if('市卫生和计划生育委员会' == a){
		   newStr = "市卫计委"; 
	   }else if('市环境保护局' == a){
		   newStr = "市环保局"; 
	   }else if('市食品药品监督管理局' == a){
		   newStr = "市食药监局"; 
	   }else if('市国家税务局' == a){
		   newStr = "市国税局"; 
	   }else if('市地方税务局' == a){
		   newStr = "市地税局"; 
	   }else if('市安全生产监督管理局' == a){
		   newStr = "市安监局"; 
	   }else if('市住房公积金管理中心' == a){
		   newStr = "成都公积金中心"; 
	   }else if('市金融工作办公室' == a){
		   newStr = "市金融办"; 
	   }else if('市人民政府法制办公室' == a){
		   newStr = "市法制办"; 
	   }else if('市民族宗教事务局' == a){
		   newStr = "市民宗局"; 
	   }else if('市农业委员会' == a){
		   newStr = "市农委"; 
	   }else if('市人民政府外事侨务办公室' == a){
		   newStr = "市外侨办"; 
	   }else if('市人民防空办公室' == a){
		   newStr = "市人防办"; 
	   }else if('市投资促进委员会' == a){
		   newStr = "市投促委"; 
	   }else if('市博览局（中国国际贸易促进委员会成都市分会）' == a){
		   newStr = "市博览局"; 
	   }else if('市档案局（馆）' == a){
		   newStr = "市档案局"; 
	   }else if('市地方志编纂委员会办公室' == a){
		   newStr = "市地志办"; 
	   }else if('市公共资源交易服务中心' == a){
		   newStr = "市公共资源交易中心"; 
	   }else if('市口岸与物流办公室' == a){
		   newStr = "市物流办"; 
	   }else if('市中级人民法院' == a){
		   newStr = "市法院"; 
	   }else if('市人民检察院' == a){
		   newStr = "市检察院"; 
	   }else if('中共成都市委党校' == a){
		   newStr = "市委党校"; 
	   }else if('成都市总工会' == a){
		   newStr = "市总工会"; 
	   }else if('共青团成都市委' == a){
		   newStr = "团市委"; 
	   }else if('市妇女联合会' == a){
		   newStr = "市妇联"; 
	   }else if('市文学艺术界联合会' == a){
		   newStr = "市文联"; 
	   }else if('市工商业联合会' == a){
		   newStr = "市工商联"; 
	   }else if('市老龄工作委员会办公室' == a){
		   newStr = "市老龄办"; 
	   }else{
		   newStr = a; 
	   }
	    return newStr; 
	}

};