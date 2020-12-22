<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script src="/${res}/js/echarts-all.js" type="text/javascript"></script>
<!--<script>
    function init_chd() {
        var myChart = echarts.init(document.getElementById('container'));
        var option = {
        	    title : {
        	        text: '个人图谱：张三',
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
        	                    name: '个人中心',
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
        	                {category:1, name: '张三', value : 12, label: '张三\n（主要）'},
        	                
        	                {category:0, name: '基本信息',value : 1},
        	                {category:0, name: '亲属信息',value : 1},
        	                {category:0, name: '财产信息',value : 1},
        	                {category:0, name: '税务信息',value : 1},
        	                {category:0, name: '证照信息',value : 1},
        	                {category:0, name: '工作信息',value : 1},
        	                
        	                
        	                {category:2, name: '行医资格证',value : 2},
        	                {category:2, name: '护士资格证',value : 2},
        	                {category:2, name: '教师资格证',value : 2},
        	                {category:2, name: '律师资格证',value : 2},
        	                
        	                {category:2, name: '名下汽车',value : 3},
        	                {category:2, name: '名下房产',value : 3},
        	                {category:2, name: '持投公司',value : 3},
        	                
        	                
        	                {category:2, name: '性别',value : 4},
        	                {category:2, name: '年龄',value : 4},
        	                {category:2, name: '家庭住址',value : 4},
        	                {category:2, name: '出生医院',value : 4},
        	                {category:2, name: '宗教信息',value : 4},
        	                {category:2, name: '残疾人信息',value :4},
        	                
        	                {category:2, name: '父母',value : 6},
        	                {category:2, name: '子女',value : 6},
        	                {category:2, name: '配偶',value : 6},
        	                
        	                {category:2, name: '国税纳税信息',value : 5},
        	                {category:2, name: '地税纳税信息',value : 5},
        	                
        	                {category:2, name: '工作单位',value : 7},
        	                {category:2, name: '职工保险',value : 7},
        	                
        	            ],
        	            links : [
        	                
							{source : '基本信息', target : '张三', weight : 1},
							{source : '亲属信息', target : '张三', weight : 1},
							{source : '财产信息', target : '张三', weight : 1},
							{source : '税务信息', target : '张三', weight : 1},
							{source : '证照信息', target : '张三', weight : 1},
							{source : '工作信息', target : '张三', weight : 1},
							
							{source : '工作单位', target : '工作信息', weight : 2},
							{source : '职工保险', target : '工作信息', weight : 2},
        	                     
        	                {source : '行医资格证', target : '证照信息', weight : 2},
        	                {source : '教师资格证', target : '证照信息', weight : 2},
        	                {source : '律师资格证', target : '证照信息', weight : 2},
        	                {source : '护士资格证', target : '证照信息', weight : 2},
        	                
        	                {source : '国税纳税信息', target : '税务信息', weight : 3},
        	                {source : '地税纳税信息', target : '税务信息', weight : 3},
        	                
        	                {source : '名下汽车', target : '财产信息', weight : 4},
        	                {source : '名下房产', target : '财产信息', weight : 4},
        	                {source : '持投公司', target : '财产信息', weight : 4},
        	                
        	                {source : '性别',target : '基本信息', weight : 5},
        	                {source : '年龄',target : '基本信息', weight : 5},
        	                {source : '家庭住址', target : '基本信息', weight : 5},
        	                {source : '出生医院', target : '基本信息', weight : 5},
        	                {source : '宗教信息', target : '基本信息', weight : 5},
        	                {source : '残疾人信息',target : '基本信息', weight : 5},
        	                
        	                {source : '父母', target : '亲属信息', weight : 6},
        	                {source : '子女', target : '亲属信息', weight : 6},
        	                {source : '配偶', target : '亲属信息', weight : 6}
        	                
        	            ]
        	        }
        	    ]
        	};
        myChart.setOption(option);
    }



    $(function () {
        init_chd();
        $("#myTab li").removeClass("active");
        $("#myTab li").eq(0).addClass("active");
    });
    
</script>-->


<script>
    $(function () {
        init_chd();
        $("#myTab li").removeClass("active");
        $("#myTab li").eq(1).addClass("active");
    });
</script>
<div class="tab-content nbn_a" >

    <div class="tab-pane active" id="home">
        <div style="margin-top: 10px;">
            <b class="ml20 " >身份证号码：</b>
            <input type="text"style="margin-bottom: 0;width: 180px" id="sjtj" value="320302195105010413" />
            <button type="button" class="btn ml10" id="sjtjBtn" onclick="findGrtp()">查询</button></div>
        <div id="container" style="width:100%;height: 550px;float: left" ></div>
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
