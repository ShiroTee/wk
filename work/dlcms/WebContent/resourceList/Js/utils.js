var formatRQ="YYYY-MM-DD";

function formatDate(value, format) {
  var date = new Date(value);
  if (arguments.length < 2 && !date.getTime) {
    format = date;
    date = new Date();
  }
  typeof format != 'string' && (format = 'YYYY年MM月DD日 hh时mm分ss秒');
  var week = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
      'Friday', 'Saturday', '日', '一', '二', '三', '四', '五', '六' ];
  return format.replace(/YYYY|YY|MM|DD|hh|mm|ss|星期|周|www|week/g, function(a) {
    switch (a) {
    case "YYYY":
      return date.getFullYear();
    case "YY":
      return (date.getFullYear() + "").slice(2);
    case "MM":
      return date.getMonth() + 1;
    case "DD":
      return date.getDate();
    case "hh":
      return date.getHours();
    case "mm":
      return date.getMinutes();
    case "ss":
      return date.getSeconds();
    case "星期":
      return "星期" + week[date.getDay() + 7];
    case "周":
      return "周" + week[date.getDay() + 7];
    case "week":
      return week[date.getDay()];
    case "www":
      return week[date.getDay()].slice(0, 3);
    }
  });
}

function getParameter(name) { 
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r!=null) return unescape(r[2]); return null;
}

function   isUnsignedInteger(strInteger)   {   
	  var   newPar=/^\d+$/   
	  return   newPar.test(strInteger);   
}

var year = new Date().getFullYear();

function formatNumber(num, precision, separator) {
    var parts;
    // 判断是否为数字
    if (!isNaN(parseFloat(num)) && isFinite(num)) {
        // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
        // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
        // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
        // 的值变成了 12312312.123456713
        num = Number(num);
        // 处理小数点位数
        num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
        // 分离数字的小数部分和整数部分
        parts = num.split('.');
        // 整数部分加[separator]分隔, 借用一个著名的正则表达式
        parts[0] = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));

        return parts.join('.');
    }
    return NaN;
}
