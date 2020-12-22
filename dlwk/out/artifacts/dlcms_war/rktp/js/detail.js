/**
 * Created by dlms on 2016/6/2.
 */
$(function() {
    $(".circle").addClass("open");
    var data = parent.transferData
    var query = parent.trabsferQueryConditon;
    var fathertable = query.fathertable;
    var firsttype = query.firsttype;
    var firstvalue = query.firstvalue;
    var detail = data['data']['detail'];
    var thead='';
    var labelnames = detail[1].split(",");
    var namelen = labelnames.length;
    var values = detail[0];
    for (var a=0; a<values.length; a++){
        var value = values[a];
        var show ='style="display:block"';
        if(a>0){
            show ='style="display:none"';
        }
        thead=thead+'<li id="centertable_'+(a+1)+'" '+show+'>';
        for (var n = 0; n < namelen; n++) {
            var isShow =' style="display:block" ';
            if(n>6){
                isShow =' style="display:none" ';
            }
            thead=thead+'<dl id="dl_'+n+'" '+isShow+'>';
            var names =labelnames[n].split(":");
            var va =  value[names[0]];
            if(va==undefined){
                va = '-';
            }

            var alltitle = names[1];
            var title = getshortvalue(alltitle,16);
            thead = thead + '<dt title="'+alltitle+'">' + title+'</dt>';

            var showvalue = getshortvalue(va,24);
            thead = thead + '<dd title="'+va+'">' + showvalue+'</dd>';

            thead = thead + "</dl>";
        }
        if(namelen>7){
            thead=thead+"<a id='show"+(a+1)+"' style='cursor: pointer;color:blue' onclick='showmore("+(a+1)+",\"show\")'>更多</a><a id='hide"+(a+1)+"'  style='display: none;cursor: pointer;color:blue' onclick='showmore("+(a+1)+",\"hide\")'>收缩</a>"
        }
        thead = thead + "</li>";
    }
    var sum =values.length;
    if(sum>1){
        thead = "<div style='display: none' class='left_img' onclick='clickimg("+sum+",0,\"left\")' title='0/"+sum+"'></div>"
                + thead+
                "<div  class='right_img' onclick='clickimg("+sum+",2,\"right\")' title='"+sum+"/"+sum+"'></div>";
    }
    $("#detail").html(thead);

    //关联信息
    var subject = data.data.subject;
    if(subject != undefined){
        var points='';
        for(var i=0; i<subject.length; i++){
            var image = subject[i]['suject_image'];
            image=String(image).substring(8);
            points = points +'<a class="item" data-hover-tablename="'+subject[i]['table_name']+'" data-hover-queryvalue="'+subject[i]['queryvalue']+'"><img src="'+image+'">'+subject[i]['table_desc']+'</a>'
        }
        $("#ring").append(points);
    }
    var items = document.querySelectorAll('.item');
    for (var i = 0, l = items.length; i < l; i++) {
        items[i].style.left = (53 - 50 * Math.cos(-1 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
        items[i].style.top = (52 + 50 * Math.sin(-1 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
    }

    //$('.item').mouseover(function(){
    $('.item').click(function(event){
        var x=event.pageX;
        var y=event.pageY;
        $('.left').find('li').stop(false,true).animate({
            left:(0-$("li[class='active']").width()-50),
        });
        $('#close').stop(false,true).animate({
            left:(0-$("li[class='active']").width()-50),
        })
        var tablename = $(this).attr("data-hover-tablename");
        var queryvalue = $(this).attr("data-hover-queryvalue");
        var close = '<a id="close" href="javascript:goback();" class="close" style="top:-8px;"><img src="/r/cms/Images/close.png" height="10px" width="10px"></a>';
        $.ajax({
            url: encodeURI(parent.globalInterfaceDomain+"/csdsc/statisticChartHandler/getPopulationMap?tablename="+tablename+"&firstValue="+firstvalue+"&firstType="+firsttype+"&value="+queryvalue+"&fathertable="+fathertable+"&"+parent.t),
            dataType : 'jsonp',
            jsonp : "jsonpcallback",
            success : function(data) {
                if(data != undefined && data.length==2) {
                    var thead = "<tr>";
                    var labelnames = data[1].split(",");
                    var namelen = labelnames.length;
                    var values = data[0];
                    var tbody = "";
                    var len = values.length;
                    if(len==1){
                        var content ="";
                        for (var n = 0; n < namelen; n++) {
                            var names =labelnames[n].split(":");
                            var va =  values[0][names[0]];
                            if(va==undefined){
                                va = '-';
                            }
                            content =content + "<dl><dt >" + names[1] + "</dt>" + "<dd >" + va+ "</dd></dl>";
                        }
                        $("#subjectdetail").html('<li class="active" style="width:400px;">'+close+content+'</li>');
                        setlocation(x,y);
                    }else{
                        for (var a = 0; a < len; a++) {
                            if(a>5){
                                tbody = tbody + "<tr id='p20subjectdetailtr"+a+"' style='display:none'>";
                            }else{
                                tbody = tbody + "<tr id='p20subjectdetailtr"+a+"'>";
                            }
                            var value = values[a];
                            if(a==0){
                                for (var n = 0; n < namelen; n++) {
                                    var names =labelnames[n].split(":");
                                    var va =  value[names[0]];
                                    if(va==undefined){
                                        va = '-';
                                    }
                                    thead = thead + "<td style='text-align:center;white-space: nowrap;width:100px;padding-left:4px;'>" + names[1] + "</td>";
                                    tbody = tbody + "<td style='text-align:center;white-space: nowrap;width:100px;padding-left:4px;'>" + va+ "</td>";
                                }
                                thead = thead + "</tr>";
                            }else{
                                for (var n = 0; n < namelen; n++) {
                                    var name = labelnames[n].split(":")[0];
                                    var va =  value[name];
                                    if(va==undefined){
                                        va = '-';
                                    }
                                    tbody = tbody + "<td style='text-align:center;white-space: nowrap;width:100px;padding-left:4px;'>" + va + "</td>";
                                }
                            }
                            tbody = tbody + "</tr>";
                        }
                        if(len>5){//添加分页
                            $("#subjectdetail").html('<li class="active">'+close+'<table id="p20subjectdetail" style="width:550px;"><thead>' + thead + '</thead><tbody>' + tbody + '</tbody></table><div id="kkpagerGis" ></div></li>');
                            kkpagerinitbyId('p20subjectdetail',1,len,6);
                            $("li[class='active']").height($("li[class='active']").height()+20);
                            var tablewidth = $("#p20subjectdetail").width();
                            if(tablewidth>550){
                                $("li[class='active']").width(tablewidth);
                            }
                            setlocation(x,y);
                        }else{
                            $("#subjectdetail").html('<li class="active">'+close+'<table id="p20subjectdetail" style="width:550px;"><thead>' + thead + '</thead><tbody>' + tbody + '</tbody></table></li>');
                            var tablewidth = $("#p20subjectdetail").width();
                            if(tablewidth>550){
                                $("li[class='active']").width(tablewidth);
                            }
                            setlocation(x,y);
                        }
                    }

                   // $('#subjectdetail').stop(false,true).animate({left:"20px"})
                }else{
                    alert("没有查询到信息");
                }
            },
            error : function(response) {
                alert(response);
            },
            timeout:6000
        });
    })
});


function kkpagerinitbyId(id,pno,totalRecords,limit){

    var total=parseInt((totalRecords-1)/limit)+1;
    kkpagerGis.pagetableid = id;
    kkpagerGis.total=total;
    kkpagerGis.totalRecords=totalRecords;
    kkpagerGis.pagelimit = limit;
    //生成分页控件
    kkpagerGis.generPageHtml({

        pno: pno,
        mode : 'click', //可选，默认就是link
        //总页码
        total: total,
        //总数据条数
        totalRecords: totalRecords,
        //链接算法
        click: function (n,sum,pagelimit,tid) {
            //获取第n页数据
            var small = pagelimit*(n-1);
            var large = pagelimit*n-1;

            for(var i=0;i<sum;i++){
                var tr = $("#"+tid+"tr"+i);
                if(i>=small && i<=large){
                    tr.css("display","table-row");
                }else{
                    tr.css("display","none");
                }
            }
            this.selectPage(n);//页码跳转
        }
    },true);
}

function goback(){
    $('.left').find('li').stop(false,true).animate({
        left:(0-$("li[class='active']").width()-50),
    });
    $('#close').stop(false,true).animate({
        left:(0-$("li[class='active']").width()-50),
    })
}

var lenArray = new Array();
function strlen(str){
    lenArray = new Array();
    var len = 0;
    for (var i=0; i<str.length; i++) {
        var c = str.charCodeAt(i);
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
            len++;
            lenArray.push(1);
        }
        else {
            len+=2;
            lenArray.push(2);
        }
    }
    return len;
}

function getshortvalue(str,len){
    var showvalue = str;
    var valuelen = strlen(showvalue);
    var num=0;
    var location =0;
    if(valuelen>len){
        for(var i=0;i<lenArray.length;i++){
            num=num+lenArray[i];
            if(num>len){
                location=i;
                if(lenArray[i-1]==1){
                    location=location-1;
                }
                break;
            }
        }
        showvalue = String(showvalue).substring(0, location-1) + "...";
    }
    return showvalue;
}

function clickimg(sum,num,type){
    showmore(num,'hide');
    if(type=='left'){
        $("[id^=centertable_]").hide();
        $("#centertable_"+num).show();
        if(num==1){
            $(".left_img").hide();
        }else{
            $(".left_img").attr("onclick","clickimg("+sum+","+(num-1)+",'left')");
            $(".left_img").attr("title",num+"/"+sum);
            $(".left_img").show();
        }
        $(".right_img").attr("onclick","clickimg("+sum+","+(num+1)+",'right')");
        $(".right_img").attr("title",num+"/"+sum);
        $(".right_img").show();
    }else{
        $("[id^=centertable_]").hide();
        $("#centertable_"+num).show();
        if(num==sum){
            $(".right_img").hide();
        }else{
            $(".right_img").attr("onclick","clickimg("+sum+","+(num+1)+",'right')");
            $(".right_img").attr("title",num+"/"+sum);
            $(".right_img").show();
        }
        $(".left_img").attr("onclick","clickimg("+sum+","+(num-1)+",'left')");
        $(".left_img").attr("title",num+"/"+sum);
        $(".left_img").show();
    }
}

function showmore(num,type){
    if(type=='show'){
        $("li[id=centertable_"+num+"] > dl[id^=dl_]").show();
        $("[id^=show]").hide();
        $("[id^=hide]").hide();
        $("#show"+num).hide();
        $("#hide"+num).show();
    }else{
        $("li[id=centertable_"+num+"] > dl[id^=dl_]").hide();
        for(var i=0;i<7;i++){
            $("li[id=centertable_"+num+"] > dl[id=dl_"+i).show();
        }
        $("[id^=show]").hide();
        $("[id^=hide]").hide();
        $("#hide"+num).hide();
        $("#show"+num).show();
    }
}

function setlocation(x,y){
    var pointy =y- $("li[class='active']").height();
    var pointx =x-$("li[class='active']").width();
    if(pointx<0){
        pointx=6;
    }
    if(pointy<0){
        pointy = 6;
    }
    $("li[class='active']").css('top',pointy);
    $("li[class='active']").stop(false,true).animate({left:pointx+'px',});
}