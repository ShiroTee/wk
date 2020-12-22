var myDate = new Date();
var myYear = myDate.getFullYear();
var myMonth = myDate.getMonth() + 1;


// 最新支撑应用
function loadZxzcyy() {
    $.ajax({
        url: getGrURL() + "dataOutComeHandler/getSupportApp",
        dataType: 'jsonp',
        data: {pageNo: 1, pageSize: 4},
        jsonp: "jsonpcallback",
        success: function (data) {
            $("#zxzcyy>tbody").html = "";
            var obj = data.data.listBeans.length;
            var tbody = "";
            var array;
            if (obj != undefined && obj > 0) {
                for (var i = 0; i < obj; i++) {
                    array = data.data.listBeans[i];
                    tbody += "<tr><td title='" + array.YYMC + "'>" + array.YYMC + "</td>"
                        + "<td title='" + array.JSDW + "'>" + array.JSDW + "</td>"
                        + "<td title='" + array.SJTGDW + "'>" + array.SJTGDW + "</td><td>" + array.DJFS + "</td>"
                        + "<td>" + array.ZCXXLSL + "</td><td>" + formatDate(array.ZCSJ, 'YYYY-MM-DD') + "</td>"
                        + "<td title='" + array.FWMC + "'>" + array.FWMC + "</td></tr>";
                }
                $("#zxzcyy>tbody").html(tbody);
            }
        },
        error: function (response) {
        },
        timeout: 6000
    });
}

// 委办局数据使用情况
function loadWbjsjsyqk() {
    $.ajax({
        url: getGrURL() + "dataOutComeHandler/getWbjMostUsage",
        dataType: 'jsonp',
        data: {pageNo: 1, pageSize: 5},
        jsonp: "jsonpcallback",
        success: function (data) {
            $("#wbjsjsyqk>tbody").html = "";
            var obj = data.data.listBeans.length;
            var tbody = "";
            var array;
            if (obj != undefined && obj > 0) {
                for (var i = 0; i < obj; i++) {
                    array = data.data.listBeans[i];
                    var date = formatDate(array.PUB_DT, 'YYYY-MM-DD');
                    tbody += "<tr><td title='" + array.DATA_NAME + "'>" + array.DATA_NAME + "</td>"
                        + "<td title='" + array.WBJMC + "'>" + array.WBJMC + "</td>"
                        + "<td title='" + date + "'>" + date + "</td><td title='" + array.SQCS + "'>" + array.SQCS + "</td></tr>";
                }
                $("#wbjsjsyqk>tbody").html(tbody);
            }
        },
        error: function (response) {
        },
        timeout: 6000
    });
}

// 委办局提交各类信息统计
function loadWbjtjglxxtj() {
    $.ajax({
        url: getGrURL() + "dataOutComeHandler/getWbjRecentSubmitInfo",
        dataType: 'jsonp',
        data: {pageNo: 1, pageSize: 9},
        jsonp: "jsonpcallback",
        success: function (data) {
            $("#wbjtjglxxtj>tbody").html = "";
            var obj = data.data.listBeans.length;
            var tbody = "";
            var array;
            if (obj != undefined && obj > 0) {
                for (var i = 0; i < obj; i++) {
                    array = data.data.listBeans[i];
                    tbody += "<tr><td title='" + array.DATA_NAME + "'>" + array.DATA_NAME + "</td>"
                        + "<td title='" + array.WBJMC + "'>" + array.WBJMC + "</td>"
                        + "<td>" + array.DATA_NUM + "</td>"
                        + "<td>" + formatDate(array.SUBMIT_TIME, 'YYYY-MM-DD') + "</td></tr>";
                }
                $("#wbjtjglxxtj>tbody").html(tbody);
            }
        },
        error: function (response) {
        },
        timeout: 6000
    });
}

// 委办局数据使用情况排名
function loadWbjsjsyqkpm() {
    $.ajax({
        url: getGrURL() + "dataOutComeHandler/getWbjUsageData",
        dataType: 'jsonp',
        data: {pageNo: 1, pageSize: 10},
        jsonp: "jsonpcallback",
        success: function (data) {
            $("#wbjsjsyqkpm>ul").html = "";
            var obj = data.data.listBeans.length;
            var tbody = "";
            var array;
            if (obj != undefined && obj > 0) {
                for (var i = 0; i < obj; i++) {
                    array = data.data.listBeans[i];
                    tbody += "<li><p class='dian nv_o_b fl'>" + array.WBJMC + "</p><span class='fr'>" + array.ALL_DATA_NUM + "</span></li>";
                }
                $("#wbjsjsyqkpm>ul").html(tbody);
            }
        },
        error: function (response) {
        },
        timeout: 6000
    });
}

// 数据质量排名
function loadSjzlpm() {
    $.ajax({
        url: getGrURL() + "dataOutComeHandler/getWbjCorrectRate",
        dataType: 'jsonp',
        data: {pageNo: 1, pageSize: 10},
        jsonp: "jsonpcallback",
        success: function (data) {
            $("#sjzlpm>ul").html = "";
            var obj = data.data.listBeans.length;
            var tbody = "";
            var array;
            var rate;
            if (obj != undefined && obj > 0) {
                for (var i = 0; i < obj; i++) {
                    array = data.data.listBeans[i];
                    rate = new Number(array.RATE * 100);
                    tbody += "<li><p class='dian nv_o_b fl'>" + array.ORG_NM + "</p><span class='fr'>" + rate.toFixed(2) + "%正确率</span></li>";
                }
                $("#sjzlpm>ul").html(tbody);
            }
        },
        error: function (response) {
        },
        timeout: 6000
    });
}

// 数据更新情况
function loadSjgxqk() {
    $.ajax({
        url: getGrURL() + "dataOutComeHandler/getWbjRecentSubmitInfo",
        dataType: 'jsonp',
        data: {pageNo: 1, pageSize: 4},
        jsonp: "jsonpcallback",
        success: function (data) {
            $("#sjgxqk>ul").html = "";
            var obj = data.data.listBeans.length;
            var tbody = "<li><div>资源名称</div><div>提供单位</div><div>提交日期</div></li>";
            var array;
            if (obj != undefined && obj > 0) {
                for (var i = 0; i < obj; i++) {
                    array = data.data.listBeans[i];
                    tbody += "<li><div title='" + array.DATA_NAME + "'>" + array.DATA_NAME + "</div>"
                        + "<div title='" + array.WBJMC + "'>" + array.WBJMC + "</div>"
                        + "<div>" + formatDate(array.SUBMIT_TIME, 'YYYY-MM-DD') + "</div></li>";
                }
                $("#sjgxqk>ul").html(tbody);
            }
        },
        error: function (response) {
        },
        timeout: 6000
    });
}

// 数据月报
function loadSjyb() {
    $.ajax({
        url: getGrURL() + "dataOutComeHandler/getMonthlyReport",
        dataType: 'jsonp',
        data: {year: myYear, month: myMonth},
        jsonp: "jsonpcallback",
        success: function (data) {
            if (data.success) {
                simpleFillReport(data.data, myYear, myMonth, "ybSubmit", "ybUsage");
            }
        },
        error: function (response) {
        },
        timeout: 6000
    });
}

// 数据年报
function loadSjnb() {
    $.ajax({
        url: getGrURL() + "dataOutComeHandler/getAnnualReport",
        dataType: 'jsonp',
        data: {year: myYear, month: 0},
        jsonp: "jsonpcallback",
        success: function (data) {
            if (data.success) {
                simpleFillReport(data.data, myYear, 0, "nbSubmit", "nbUsage");
            }
        },
        error: function (response) {
        },
        timeout: 6000
    });
}

function simpleFillReport(data, year, month, submitReport, usageReport) {
    $('#' + submitReport).empty();
    $('#' + usageReport).empty();

    var submitStr = "";
    submitStr += year;
    submitStr += "年";
    if (typeof month != "undefined" && month != 0) {
        submitStr += month;
        submitStr += "月";
    }
    submitStr += "共计";
    submitStr += data.submit.general[0].WBJNM;
    submitStr += "个委办局提交";
    if (typeof data.submit.general[0].DATANM == "undefined") {
        submitStr += 0;
    } else {
        submitStr += data.submit.general[0].DATANM;
    }
    submitStr += "条数据，";

    for (var i = 0; i < data.submit.detail.length; i++) {
        submitStr += "其中";
        submitStr += data.submit.detail[i].dataName;
        submitStr += "库";
        submitStr += data.submit.detail[i].dataNum;
        submitStr += "条，分别为：";
        for (var j = 0; j < data.submit.detail[i].detail.length; j++) {
            submitStr += data.submit.detail[i].detail[j].wbjmc;
            submitStr += "提供的";
            submitStr += data.submit.detail[i].detail[j].dataName;
            if (j == data.submit.detail[i].detail.length - 1) {
                submitStr += "；";
            } else {
                submitStr += "，";
            }
        }
    }
    $('#' + submitReport).append(submitStr);

    var useageStr = "";
    useageStr += year;
    useageStr += "年";
    if (typeof month != "undefined" && month != 0) {
        useageStr += month;
        useageStr += "月";
    }
    useageStr += "共有";
    useageStr += data.useage.general[0].WBJNM;
    useageStr += "个委办局使用";
    if (typeof data.useage.general[0].DATANM == "undefined") {
        useageStr += 0;
    } else {
        useageStr += data.useage.general[0].DATANM;
    }
    useageStr += "条资源，";

    for (var i = 0; i < data.useage.detail.length; i++) {
        useageStr += "其中";
        useageStr += data.useage.detail[i].dataName;
        useageStr += "库";
        useageStr += data.useage.detail[i].dataNum;
        useageStr += "条，分别为：";
        for (var j = 0; j < data.useage.detail[i].detail.length; j++) {
            useageStr += data.useage.detail[i].detail[j].wbjmc;
            useageStr += "提供的";
            useageStr += data.useage.detail[i].detail[j].dataName;
            if (j == data.useage.detail[i].detail.length - 1) {
                useageStr += "；";
            } else {
                useageStr += "，";
            }
        }
    }
    $('#' + usageReport).append(useageStr);
}
 