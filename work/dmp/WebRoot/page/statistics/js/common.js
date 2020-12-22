function getBeginDay(){
	var myDate = new Date();
	var year = myDate.getFullYear();
	var month = myDate.getMonth() + 1;
	if (month < 10) {
		month = "0" + month;
	}
	// 获取当月第一天
	var firstDay = year + "-" + month + "-" + "01";
	return firstDay;
}

function getEndDay() {
	var myDate = new Date();
	var year = myDate.getFullYear();
	var month = myDate.getMonth() + 1;
	if (month < 10) {
		month = "0" + month;
	}
	// 获取当月最后一天
	myDate = new Date(year, month, 0);
	var lastDay = year + "-" + month + "-" + myDate.getDate();
	return lastDay;
}

