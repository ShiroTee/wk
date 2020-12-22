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

};