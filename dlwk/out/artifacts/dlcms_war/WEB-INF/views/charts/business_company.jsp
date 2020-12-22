<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script src="/${res}/js/echarts-all.js" type="text/javascript"></script>
<script>
    function init_chd() {
        var myChart = echarts.init(document.getElementById('container'));
        var option = {
        	    title : {
        	        text: '商业图谱：测试公司',
        	        x:'center',
        	        y:'30',
        	        padding:50
        	    },
        	    tooltip : {
        	        trigger: 'item',
        	        formatter: function (params, ticket, callback){
        	        	switch (params.name){
	    	        		case  "名下汽车":
	    	        			return "宝马X5-苏C123456";
							case  "名下房产":
	    	        			return "绿地世纪城三期14栋1201";
							case  "宗教信息":
	    	        			return "无宗教信息";
							case  "婚姻信息":
								return "2000年成婚,配偶:李四";
							case  "家庭住址":
								return "江苏徐州";
							case  "个人案件信息":
								return "无个人案件信息";
							case  "残疾人信息":
	    	        			return "无残疾人信息";
							case  "教师资格证":
								return "无教师资格证信息";
							case  "出生医院":
	    	        			return "徐州市第四人民医院";
							case  "行医资格证":
								return "无行医资格证信息";
							default:
								return params.name;
	    	        	}
        	        }
        	    },
        	    series : [
        	        {
        	            type:'force',
        	            ribbonType: false,
        	            categories : [
        	                {
        	                	name: '信息类别',
        	                    name: '企业中心',
        	                    name: '详细信息'
        	                }
        	            ],
        	            itemStyle: {
        	            	normal: {
        	                    label: {
        	                        show: true,
        	                        textStyle: {
        	                            color: '#333'
        	                        }
        	                    },
        	                    nodeStyle : {
        	                        brushType : 'both',
        	                        borderColor : '#DDDDDD',
        	                        borderWidth : 1
        	                    },
        	                    linkStyle: {
        	                        type: 'curve'
        	                    }
        	                },
        	            },
        	            useWorker: false,
        	            minRadius : 20,
        	            maxRadius : 30,
        	            gravity: 0.6,
        	            scaling: 1.1,
        	            nodes:[
        	                {category:1, name: '测试公司', value : 12, label: '测试公司\n（主要）'},
        	                
        	                {category:0, name: '基本信息',value : 1},
        	                {category:0, name: '纳税信息',value : 1},
                            {category:0, name: '税务登记信息',value : 1},
        	                {category:0, name: '行政处罚信息',value : 1},
                            {category:0, name: '行政许可信息',value : 1},

        	                {category:2, name: '国税纳税信息',value : 3},
        	                {category:2, name: '地税纳税信息',value : 3},
        	                
        	                {category:2, name: '国税行政处罚信息',value : 3},
        	                {category:2, name: '地税行政处罚信息',value : 3},
        	               
        	                
        	                {category:2, name: '注册时间',value : 6},
        	                {category:2, name: '注册资本',value : 6},
        	                {category:2, name: '法定代表人',value : 6},
        	                {category:2, name: '所属行业',value : 6},
        	                {category:2, name: '公司地址',value : 6}
        	                
        	            ],
        	            links : [
        	                
							{source : '基本信息', target : '测试公司', weight : 1},
							{source : '纳税信息', target : '测试公司', weight : 1},
							{source : '行政处罚信息', target : '测试公司', weight : 1},
                            {source : '行政许可信息', target : '测试公司', weight : 1},
                            {source : '税务登记信息', target : '测试公司', weight : 1},


                            {source : '注册时间', target : '基本信息', weight : 2},
        	                {source : '注册资本', target : '基本信息', weight : 2},
        	                {source : '法定代表人', target : '基本信息', weight : 2},
        	                {source : '所属行业', target : '基本信息', weight : 2},
        	                {source : '公司地址', target : '基本信息', weight : 2},

        	                {source : '国税纳税信息', target : '纳税信息', weight : 3},
        	                {source : '地税纳税信息', target : '纳税信息', weight : 3},
        	                
        	                {source : '国税行政处罚信息', target : '行政处罚信息', weight : 3},
        	                {source : '地税行政处罚信息', target : '行政处罚信息', weight : 3}
        	                
        	            ]
        	        }
        	    ]
        	};
        myChart.setOption(option);
    }
    
</script>
<script>
$(function () {
   // init_chd();
$("#myTab li").removeClass("active");
$("#myTab li").eq(0).addClass("active");
});
</script>
<div class="tab-content nbn_a" >

    <div class="tab-pane active" id="home">
        <div style="margin-top: 10px;"><b class="ml20 " >工商注册号：</b>
            <input type="text" style="margin-bottom: 0;width: 180px" id="sjtj" value="532901100014816" />
            <button type="button" class="btn ml10" id="sjtjBtn" onclick="findSytp()">查询</button>
        </div>
        <div id="container" style="width:90%;height: 550px;magin-top:20px;margin-bottom: 20px;" ></div>
    </div>
    <!--右悬浮-->
    <div class="right-fix">
        <div class="right-fix-list">
            <div class="right-fix-ico">
                <img src="/${res}/img/righ.jpg">
            </div><%--
            <ul class="fix-tab">
                <li class="active">指示解释</li>
                <li>统计范围</li>
                <li>调查方法</li>
                <li>建立数据</li>
                <li>发布时间</li>
            </ul>
            <ul class="fix-intro">
                <li style="display: block;">
                    <p>    常住人口指经常居住在某一地区的人口。目前在我国，常住人口是指实际经常居住在某地区半年以上的人口。以乡（镇、街道）为例，一个乡（镇、街道）的常住人口具体包括：①居住在本乡（镇、街道），并已在本乡（镇、街道）办理常住户口登记的人；②户口在本乡（镇、街道），外出不满半年的人；③已在本乡（镇、街道）居住半年以上，常住户口在本乡（镇、街道）以外的人；④在本乡（镇、街道）居住不满半年，但已离开常住户口地半年以上的人；⑤居住在本乡（镇、街道），常住户口待定的人；⑥原住本乡（镇、街道），目前在国外工作或者学习，暂无所在国永久居住权的人。
                    </p>
                </li>
                <li>
                    <p>      全部常住本地的户籍人口，除离开本地半年以上（不包括在国外工作或学习的人）的；户口在外地，但在本地居住半年以上者，或离开户口地半年以上而调查时在本地居住的人口；调查时居住在本地，但在任何地方都没有登记常住户口，如手持户口迁移证、出生证、退伍证、劳改劳教释放证等尚未办理常住户口的人，即所谓“口袋户口”的人。
                    </p>
                </li>
                <li>
                    <p>人口普查、非普查年份的全国1%人口抽样调查和全国人口变动情况抽样调查，推算总人口和其他人口指标数据。</p>
                </li>
                <li>
                    <p></p>
                </li>
                <li>
                    <p>一般于次年1月底2月初发布。</p>
                </li>
            </ul>--%>
        </div>
    </div>

</div>
