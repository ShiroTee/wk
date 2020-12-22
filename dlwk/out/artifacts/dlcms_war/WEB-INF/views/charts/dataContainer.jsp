<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script>
    $(function(){
        $(".btns").show();
        //showStartTime();
        showNewtartTime(0,true);
        showEndTime();
        <c:if test="${param.index==1}">
            showNewtartTime(1,false);
			$('.tj-zsjs').html('反映在某一时间内，该地区法人的分布情况。');
		    $('.tj-tjfw').html('全部常住本地的户籍人口，除离开本地半年以上（不包括在国外工作或学习的人）的；户口在外地，但在本地居住半年以上者，或离开户口地半年以上而调查时在本地居住的人口；调查时居住在本地，但在任何地方都没有登记常住户口，如手持户口迁移证、出生证、退伍证、劳改劳教释放证等尚未办理常住户口的人，即所谓“口袋户口”的人。');
			$('.tj-dcff').html('人口普查、非普查年份的全国1%人口抽样调查和全国人口变动情况抽样调查，推算总人口和其他人口指标数据。');
			$('.tj-fbsj').html('一般于次年1月底2月初发布');
            $('.startTime').change(function () {
                $("#tjfxmodal2").empty();
                init_frdqfbtj('tjfxmodal2',$(this).val());
            });
        </c:if>
        <c:if test="${param.index==2}">
        //显示最大年份
            //showStartTime(true);
            showEndTime(true);
            showNewtartTime(2,false);
			$('.tj-zsjs').html('人口增长强度变化结构图，反映在某一时间内，该地区的出生、死亡人数数据，迁入、迁出人数数据，及自增率、净迁移率的变化趋势。');
		    $('.tj-tjfw').html('全部常住本地的户籍人口，除离开本地半年以上（不包括在国外工作或学习的人）的；户口在外地，但在本地居住半年以上者，或离开户口地半年以上而调查时在本地居住的人口；调查时居住在本地，但在任何地方都没有登记常住户口，如手持户口迁移证、出生证、退伍证、劳改劳教释放证等尚未办理常住户口的人，即所谓“口袋户口”的人。');
			$('.tj-dcff').html('人口普查、非普查年份的全国1%人口抽样调查和全国人口变动情况抽样调查，推算总人口和其他人口指标数据。');
			$('.tj-fbsj').html('一般于次年1月底2月初发布');
             $('.startTime').change(function () {
                 $("#tjfxmodal2").empty();
                 init_rkzzqdbh('tjfxmodal2', 320300000000, $(this).val(), $(".endTime").val());
            });
            $('.endTime').change(function () {
                $("#tjfxmodal2").empty();
                init_rkzzqdbh('tjfxmodal2', 320300000000, $(".startTime").val(), $(this).val());
            });
        </c:if>
        <c:if test="${param.index==3}">
            showEndTime(true);
            showNewtartTime(3,false);
			$('.tj-zsjs').html('死亡人口及死因统计分析结构图，反映在某一时间内，该地区的死亡人口男女比例，以及死亡原因的统计分析。');
		    $('.tj-tjfw').html('全部常住本地的户籍人口，除离开本地半年以上（不包括在国外工作或学习的人）的；户口在外地，但在本地居住半年以上者，或离开户口地半年以上而调查时在本地居住的人口；调查时居住在本地，但在任何地方都没有登记常住户口，如手持户口迁移证、出生证、退伍证、劳改劳教释放证等尚未办理常住户口的人，即所谓“口袋户口”的人。');
			$('.tj-dcff').html('人口普查、非普查年份的全国1%人口抽样调查和全国人口变动情况抽样调查，推算总人口和其他人口指标数据。');
			$('.tj-fbsj').html('一般于次年1月底2月初发布');
            $('.startTime').change(function () {
                $("#tjfxmodal2").empty();
                init_swrkjsytj('tjfxmodal2', 320300000000, $(this).val(), $(".endTime").val());
            });
            $('.endTime').change(function () {
                $("#tjfxmodal2").empty();
                init_swrkjsytj('tjfxmodal2', 320300000000, $(".startTime").val(), $(this).val());
            });
        </c:if>
        <c:if test="${param.index==4}">
            showNewtartTime(4,false);
            //showStartTime(true);
            showEndTime(true);
			$('.tj-zsjs').html('人口性别比例分布，反映在某一时间内，该地区人口在各年龄段下男女比例分布情况。');
		    $('.tj-tjfw').html('全部常住本地的户籍人口，除离开本地半年以上（不包括在国外工作或学习的人）的；户口在外地，但在本地居住半年以上者，或离开户口地半年以上而调查时在本地居住的人口；调查时居住在本地，但在任何地方都没有登记常住户口，如手持户口迁移证、出生证、退伍证、劳改劳教释放证等尚未办理常住户口的人，即所谓“口袋户口”的人。');
			$('.tj-dcff').html('人口普查、非普查年份的全国1%人口抽样调查和全国人口变动情况抽样调查，推算总人口和其他人口指标数据。');
			$('.tj-fbsj').html('一般于次年1月底2月初发布');
        //$('.startTime').val(2015);
        $(".startTime").change(function(){
            $("#tjfxmodal2").empty();
            init_rkxbnljgfb('tjfxmodal2', 320300000000, $(this).val());
        });
        </c:if>
        <c:if test="${param.index==5}">
            showNewtartTime(5,false);
            //showStartTime(true);
            showEndTime(true);
			$('.tj-zsjs').html('交通运输旅客周转量统计分析');
		    $('.tj-tjfw').html('');
			$('.tj-dcff').html('');
			$('.tj-fbsj').html('');
            $('.startTime').change(function () {
                $("#tjfxmodal2").empty();
                init_sletrxtj('tjfxmodal2', 320300000000, $(this).val(), $(".endTime").val(),1);
            });
            $('.endTime').change(function () {
                $("#tjfxmodal2").empty();
                init_sletrxtj('tjfxmodal2', 320300000000, $(".startTime").val(), $(this).val(),1);
            });
        </c:if>
        <c:if test="${param.index==6}">
			$('.tj-zsjs').html('大理市信息资源中心各委办局之间数据交换的统计分析。');
		    $('.tj-tjfw').html('共享交换平台');
			$('.tj-dcff').html('数据监控平台');
			$('.tj-fbsj').html('实时');
            init_sjlsjszltj('tjfxmodal2', 1, 6);
        </c:if>
        <c:if test="${param.index==7}">
			$('.tj-zsjs').html('大理市信息资源中心四库数据统计。');
		    $('.tj-tjfw').html('共享交换平台');
			$('.tj-dcff').html('数据监控平台');
			$('.tj-fbsj').html('实时');
            init_sksjzltjt('tjfxmodal2');
        </c:if>
        <c:if test="${param.index==8}">
			$('.tj-zsjs').html('大理市信息资源中心各委办局数据提交统计。');
		    $('.tj-tjfw').html('共享交换平台');
			$('.tj-dcff').html('数据监控平台');
			$('.tj-fbsj').html('实时');
            init_gwbjsjtiltj('tjfxmodal2');
            $("#sjtjBtn").click(function(){
                init_gwbjsjtiltj('tjfxmodal2',$("#sjtj").val());
            });
        </c:if>
        <c:if test="${param.index==9}">
			$('.tj-zsjs').html('大理市信息资源中心各委办局之间数据交换的统计分析。');
		    $('.tj-tjfw').html('共享交换平台');
			$('.tj-dcff').html('数据监控平台');
			$('.tj-fbsj').html('实时');
            $("#xxtj").val(${param.name!=null}?'${param.name}':'公安局');
            init_gwbjsjtjlxxtj('tjfxmodal2',${param.name!=null}?'${param.name}':'公安局');
            $("#xxtjBtn").click(function(){
                init_gwbjsjtjlxxtj('tjfxmodal2',$("#xxtj").val());
            });
        </c:if>
        <c:if test="${param.index==10}">
			$('.tj-zsjs').html('大理市信息资源中心各委办局之间数据交换的统计分析。');
		    $('.tj-tjfw').html('共享交换平台');
			$('.tj-dcff').html('数据监控平台');
			$('.tj-fbsj').html('实时');
            $("#zltj").val(${param.name!=null}?'${param.name}':'公安局');
            init_gwbjsjtjzltj('tjfxmodal2',${param.name!=null}?'${param.name}':'公安局');
            $("#zltjBtn").click(function(){
                init_gwbjsjtjzltj('tjfxmodal2',$("#zltj").val());
            });
        </c:if>
        <c:if test="${param.index==11}">
			$('.tj-zsjs').html('大理市信息资源中心各委办局之间数据交换的统计分析。');
		    $('.tj-tjfw').html('共享交换平台');
			$('.tj-dcff').html('数据监控平台');
			$('.tj-fbsj').html('实时');
            init_gwbjsjsyltj('tjfxmodal2','');
			$("#syltjBtn").click(function(){
                init_gwbjsjsyltj('tjfxmodal2',$("#syltj").val());
            });
        </c:if>
        <c:if test="${param.index==12}">
			$('.tj-zsjs').html('大理市信息资源中心各委办局之间数据交换的统计分析。');
		    $('.tj-tjfw').html('共享交换平台');
			$('.tj-dcff').html('数据监控平台');
			$('.tj-fbsj').html('');
			$("#syxxtj").val(${param.name!=null}?'${param.name}':'公安局')
            init_gwbjsjsylxxtj('tjfxmodal2',${param.name!=null}?'${param.name}':'公安局');
			$("#syxxtjBtn").click(function(){
                init_gwbjsjsylxxtj('tjfxmodal2',$("#syxxtj").val());
            });
        </c:if>
       <c:if test="${param.index!=1}">
		    if(${param.name!=null}){
				$(".btnleft a").attr("href","dataContainer.jhtml?index=${param.index-1}&name=${param.name}");
			}else{
                $(".btnleft a").attr("href","dataContainer.jhtml?index=${param.index-1}");
			}
       </c:if>
        <c:if test="${param.index!=12}">
	        if(${param.name!=null}){
				$(".btnright a").attr("href","dataContainer.jhtml?index=${param.index+1}&name=${param.name}");
			}else{
				$(".btnright a").attr("href","dataContainer.jhtml?index=${param.index+1}");
			}
       </c:if>


    })
    function showStartTime(maxYear) {
        $(".startTime").html('');
        var option = '';
        if(maxYear==true){//当前年份
            option += "<option value='" + year + "'>" + year + "</option>";
        }
        for (var i = year - 1; i >= 1978; i--) {
            option += "<option value='" + i + "'>" + i + "</option>";
        }

        $(".startTime").html(option);
    }

    //获取数据库中的最新时间
    function showNewtartTime(index,maxYear){
        var option="";
        var maxDate="";
        if(maxYear==true){
            option += "<option value='" + year + "'>" + year + "</option>";
            for (var i = year - 1; i >= 1978; i--) {
                option += "<option value='" + i + "'>" + i + "</option>";
            }
            $(".startTime").html(option);
        }else{
            $.ajax({
                url:getGrURL()+"statisticChartSJTJHandler/getNewDate",
                dataType: 'jsonp',
                data: {index:index},
                jsonp: "jsonpcallback",
                success: function (data) {
                    if(data!=null&&data!=undefined){
                        $(".startTime").html('');
                        maxDate=data[0].MAXDATE;
                        for (var i =maxDate; i >= 1978; i--) {
                            option += "<option value='" + i + "'>" + i + "</option>";
                        }
                        $(".startTime").html(option);
                    }
                },
                complete:function(){
                    if(index==1){
                        if(maxDate!=""){
                            init_frdqfbtj('tjfxmodal2',maxDate);
                        }
                    }else if(index==2){
                        init_rkzzqdbh('tjfxmodal2', 320300000000,maxDate, year);
                        //$(".startTime").val(year-6);
                    }else if(index==3){
                        init_swrkjsytj('tjfxmodal2', 320300000000,maxDate, year);
                        //$(".startTime").val(year-6);
                    }else if(index==4){
                        init_rkxbnljgfb('tjfxmodal2', 320300000000, maxDate);
                    }else if(index==5){
                        init_sletrxtj('tjfxmodal2', 320300000000,maxDate, year, 1);
                        //$(".startTime").val(year-6);
                    }
                },
                timeout: 6000
            });
        }
    }

    function showEndTime(maxYear) {
        $(".endTime").html('');
        var option = '';
        if(maxYear==true){//当前年份
            option += "<option value='" + year + "'>" + year + "</option>";
        }
        for (var i = year - 1; i >= 1978; i--) {
            option += "<option value='" + i + "'>" + i + "</option>";
        }

        $(".endTime").html(option);
    }
</script>

<div>
    <c:if test="${param.index==1}">
        <b class=" ml20">统计年份：</b><select class="startTime ml10 mt10"></select>
    </c:if>
    <c:if test="${param.index==2}">
        <b class=" ml20">统计年份：</b><select class="startTime ml10 mt10"></select>
        <b class=" ml10">—</b><select class="endTime ml10 mt10"></select>
    </c:if>
    <c:if test="${param.index==3}">
        <b class=" ml20">统计年份：</b><select class="startTime ml10 mt10"></select>
        <b class=" ml10">—</b><select class="endTime ml10 mt10"></select>
    </c:if>
    <c:if test="${param.index==4}">
        <b class=" ml20">统计年份：</b><select class="startTime ml10 mt10"></select>
    </c:if>
    <c:if test="${param.index==5}">
        <b class=" ml20">统计年份：</b><select class="startTime ml10 mt10"></select>
        <b class=" ml10">—</b><select class="endTime ml10 mt10"></select>
    </c:if>
    <c:if test="${param.index==8}">
        <b class="ml20 ">委办局名称：</b><input type="text"style="margin-bottom: 0;width: 120px" id="sjtj" /><button type="button" class="btn ml10" id="sjtjBtn">查询</button>
    </c:if>
    <c:if test="${param.index==9}">
        <b class="ml20 ">委办局名称：</b><input type="text"style="margin-bottom: 0;width: 120px" id="xxtj" /><button type="button" class="btn ml10" id="xxtjBtn">查询</button>
    </c:if>
    <c:if test="${param.index==10}">
        <b class="ml20 ">委办局名称：</b><input type="text"style="margin-bottom: 0;width: 120px" id="zltj" value="建设局"/><button type="button" class="btn ml10" id="zltjBtn">查询</button>
    </c:if>
    <c:if test="${param.index==11}">
        <b class="ml20 ">应用名称：</b><input type="text"style="margin-bottom: 0;width: 120px" id="syltj"/><button type="button" class="btn ml10" id="syltjBtn">查询</button>
    </c:if>
    <c:if test="${param.index==12}">
        <b class="ml20 ">委办局名称：</b><input type="text"style="margin-bottom: 0;width: 120px" id="syxxtj"/><button type="button" class="btn ml10" id="syxxtjBtn">查询</button>
    </c:if>
    <a href="../../tjfx/0/index.jhtml" style="float: right;margin-right: 31px;line-height: 48px;height: 48px;font-size: 18px;margin-top: -30px;">返回</a>
</div>
<div id="tjfxmodal2" style="width: 990px">

</div>
<!--右悬浮-->
<div class="right-fix">
    <div class="right-fix-list">
        <div class="right-fix-ico">
            <img src="/${res}/img/righ.jpg">
        </div>
        <ul class="fix-tab">
            <li class="active">指示解释</li>
            <li>统计范围</li>
            <li>调查方法</li>
            <li>建立数据</li>
            <li>发布时间</li>
        </ul>
        <ul class="fix-intro">
             <li style="display: block;">
                <p class='tj-zsjs'></p>
            </li>
            <li>
                <p class='tj-tjfw'></p>
            </li>
            <li>
                <p class='tj-dcff'></p>
            </li>
            <li>
                <p class='tj-jlsj'></p>
            </li>
            <li>
                <p class='tj-fbsj'></p>
            </li>
        </ul>
    </div>
</div>
