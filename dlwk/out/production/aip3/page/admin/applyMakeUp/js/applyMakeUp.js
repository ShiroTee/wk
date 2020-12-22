//被确认选择过得资源目录id
var selectResources=[];

$(function(){

	
	  // mouse-on examples
    $('#amu_call').data('powertipjq', $([
        '<p><b>*电话格式:<b></p>',
        '<p><b>&nbsp;&nbsp;手机电话:11位电话号码<b></p>',
        '<p><b>&nbsp;&nbsp;固定电话:区号-电话号码-分机号<b></p>',
        '<p><b>&nbsp;&nbsp;(分机号和分机号前“-”可不填写，其他必须填写“-”)<b></p>',
    ].join('\n')));
    $('#amu_call').powerTip({
        placement: 'e',
        smartPlacement: true
    });
	
	//时间插件初始化
	$("#data-startTime").datepicker({
        language: 'zh-CN',
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        pickerPosition: "bottom-left",
        minView: 'month'
    });
	$("#amu_secretStartTime").datepicker({
		language: 'zh-CN',
		format: "yyyy-mm-dd",
		autoclose: true,
		todayBtn: true,
		pickerPosition: "bottom-left",
		minView: 'month'
	});
	$("#amu_secretEndTime").datepicker({
		language: 'zh-CN',
		format: "yyyy-mm-dd",
		autoclose: true,
		todayBtn: true,
		pickerPosition: "bottom-left",
		minView: 'month'
	});
	
	
	//涉密数据使用方式、期限信息 radio点击事件
	$("#amu_secret").delegate("input[type=radio]", "click", function(){
		$(this).parents(".col-sm-9").find("input[type!=radio]").attr("disabled",true);
		$(this).parents(".col-sm-9").find("input[type!=radio]").val("");
		
		$(this).parents(".col-sm-9").find("select").attr("disabled",true);
		$(this).parents(".col-sm-9").find("select").val(-1);
		
		$(this).parent().find("input[type=text]").attr("disabled",false);
		$(this).parent().find("select").attr("disabled",false);
	});
	
	
	//选择资源按钮点击事件
	$("#amu_chooseResource").click(function(){
		$.modal({
			url : "admin/applyMakeUp/chooseResource.html",
			title : "选择资源",
			data : {},
			size:"modal-lg"
		});
	});
	
	//属性数据资源列表框与空间数据资源列表框小红叉点击事件
	$("#amu_resources").delegate(".widget-toolbar .glyphicon-remove","click",function(){
		if($(this).parents(".widget-box").length>1){
			selectResources.remove($(this).parent().parent().parent().attr("resourceid"));
			$(this).parents(".widget-box").find(".red").html($(this).parents(".widget-box").find(".red").text()-1);
			if($(this).parents(".widget-box").find(".red").html()==0){
				$(this).parents(".widget-box").find(".red").parents(".widget-box").hide();
			}
			$(this).parents(".widget-box:eq(0)").remove();
		}else{
			$(this).parents(".widget-box:eq(0)").find(".widget-box").each(function(){
				selectResources.remove($(this).attr("resourceid"));
			});
			$(this).parents(".widget-box:eq(0)").hide();
			$(this).parents(".widget-box:eq(0)").find(".widget-main").html("");
			$(this).parents(".widget-box:eq(0)").find(".red").html(0);
			
		}
		if($(this).parents("#amu_Space").find(".widget-box").length==0){
			cleanSecret();
		}
		$("#amu_totalRes").html(selectResources.length);
		if(selectResources.length==0){
			$("#amu_noResource").html("您还没有选择资源！");
		}
	});
	
	//空间数据资源列表-空间数据checkbox点击事件
	$("#amu_Space").delegate("input[name='amu_SpData']","click",function(){
		if($(this).is(':checked')){
			$(this).parents(".widget-box:eq(0)").find(".widget-body").show();
		}else{
			$(this).parents(".widget-box:eq(0)").find(".widget-body").hide();
			$(this).parents(".widget-box:eq(0)").find(".widget-body").find("input[type=text]").val("");
		}
		
		if($("#amu_Space .widget-header").find("input[name='amu_SpData']:checked").length>0){
			$("#amu_secret").show();
		}else{
			$("#amu_secret").hide();
			cleanSecret();
		}
		
	});
	
	//jquery validation验证方法
	$('#amu_applyForm').validationEngine('attach', {
        showOneMessage: true,
	    onValidationComplete: function(form, status){
	    	
	    	//没选中字段返回方法
	    	$(".res_mod[modelcode=Catalog]").each(function(){
	    		 if($(this).find(".res_field_sel").length==0){
	    			 $.alert("请选择【"+$(this).find(".res_mod_tit").text()+"】的字段！")
	    			 status=false;
	    			 return false;
	    		 }
	    	});
	    	
	    	if(status){
	    		if(selectResources.length==0){
	    			$.alert("请至少选择一个资源!");
	    			return;
	    		}
	    		$.confirm("确定现在就提交申请吗？",function(){
	    			/////////////////////////////////

                	//属性数据资源数组
    		    	var rIdArray = [];
    		    	//空间数据资源数组
    		    	var spaceIdArray=[];
    	
    		    	var returnFlag=false;
    		    	//属性数据资源数组添加元素
    		    	$("#amu_Catalog").find(".widget-box").each(function(){
    		    		 rIdArray.push($(this).attr("resourceId")+"~"+$(this).attr("resourceName")+"~"+$(this).attr("resourceCode")+"~"+$(this).find(".widget-header").find("input:checked").val());
    		    	});
    		    	
    		    	//空间数据资源数组添加元素
    		    	$("#amu_Space").find(".widget-box").each(function(){
    		    		var oneSpace=$(this).attr("resourceId")+"~"+$(this).attr("resourceName")+"~"+$(this).attr("resourceCode")+"~"+($(this).find("input[type=checkbox]:eq(0)").is(':checked')?1:0)+"~"+($(this).find("input[type=checkbox]:eq(1)").is(':checked')?1:0);
    		    		if($(this).find("input[type=checkbox]:eq(1)").is(':checked')){
    		    			oneSpace+="~"+($(this).find(".widget-body").find("input[type=text]:eq(0)").val()==""?" ":$(this).find(".widget-body").find("input[type=text]:eq(0)").val())+"~"+
    		    			($(this).find(".widget-body").find("input[type=text]:eq(1)").val()==""?" ":$(this).find(".widget-body").find("input[type=text]:eq(1)").val())+"~"+
    		    			($(this).find(".widget-body").find("input[type=text]:eq(2)").val()==""?" ":$(this).find(".widget-body").find("input[type=text]:eq(2)").val());
    		    		}
    		    		spaceIdArray.push(oneSpace);
    		    	});
    		    	
    		    	
    		    	//申请单位基本信息 参数
    		    	var unitType=$("input[name='unitType']").val();
    		    	var applyOrgName=$("input[name='applyOrgName']").val();
    		    	var applyUser=$("input[name='applyUser']").val();
    		    	var applyPhone=$("input[name='applyPhone']").val();
    		    	var applyEmail=$("input[name='applyEmail']").val();
    		    	
    		    	//申请单位基本信息 参数
    		    	var applyProjectName=$("input[name='applyProjectName']").val();
    		    	var applyDevOrg=$("input[name='applyDevOrg']").val();
    		    	var applySysUser=$("input[name='applySysUser']").val();
    		    	var applyProjectSource=$("input[name='applyProjectSource']").val();
    		    	var applyInvestTotal=$("input[name='applyInvestTotal']").val();
    		    	var applyFinishDate=$("input[name='applyFinishDate']").val();
    		    	var applyRemark=$("textarea[name='applyRemark']").val();   	
    		    	
    		    	//涉密数据使用方式、期限信息 参数
    		    	
    		    	//是否选中空间数据资源 空间数据选项
    		    	var spaceChecked=0;  //0没有 选中空间数据资源  空间数据选项 1有
    		    	if($("#amu_Space .widget-box .widget-header").find("input[name='amu_SpData']:checked").length>0){
    		    		spaceChecked=1;
    		    	}
    		    	//数据获取方式
    		    	var useType=$("#amu_secret").find("input[name=useType]:checked").val();
    		    	//数据获取方式描述
    		    	var useDescribe=$("#amu_secret").find("input[name=useType]:checked").parent().find("input[type=text]").val();
    		    	//数据使用期限类型
    		    	var dateType=$("#amu_secret").find("input[name=dateType]:checked").val();
    		    	//数据使用期限起始时间
    		    	var dateStart=$("#amu_secret").find("input[name=dateType]:checked").parent().find("input[type=text]:eq(0)").val();
    		    	//数据使用期限结束时间
    		    	var dateEnd=$("#amu_secret").find("input[name=dateType]:checked").parent().find("input[type=text]:eq(1)").val();
    		    	//数据涉密类型
    		    	var secretType=$("#amu_secret").find("input[type=radio]:checked").val();
    		    	//涉密数据类型 密级
    		    	var secretTypeLevel=$("#amu_secret").find("input[type=radio]:checked").parent().find("select").val();
    		    	//数据衍生成果描述 及完成时间：
    		    	var describe=$("#amu_secret").find("textarea[name=describe]").val();
    		    	
    		    	///////////////////////////params///////////////////////
    			    	$.ajax({
    						cache : true,
    						type : "POST",
    						url : CTX + "/mdp/welcome/resourceApplySubmit.json",
    						data : {rIdArray:rIdArray.join(","),spaceIdArray:spaceIdArray.join(","),unitType:unitType,applyOrgName:applyOrgName,applyUser:applyUser,applyPhone:applyPhone,applyEmail:applyEmail,
    							applyProjectName:applyProjectName,applyDevOrg:applyDevOrg,applySysUser:applySysUser,applyProjectSource:applyProjectSource,applyInvestTotal:applyInvestTotal,applyFinishDate:applyFinishDate,
    							applyRemark:applyRemark,useType:useType,useDescribe:useDescribe,dateType:dateType,dateStart:dateStart,dateEnd:dateEnd,
    							secretType:secretType,secretTypeLevel:secretTypeLevel,describe:describe,spaceChecked:spaceChecked,applyType:1,applyStatus:0},// 你的formid
    						async : false,
    						error : function(request) {
    							$.alert("资源申请失败!"+request.data);
    						},
    						success : function(data) {

    							if(data.success){
    								
    								$.alert("资源申请保存成功，申请编号："+data.serialNum,function(){
    									var node=
    									{
    											nodeId:new Date().getTime()+"",
    											text:"资源申请管理",
    											href:"admin/resourcesApply/manage.html"
    									};
    									workspace.closeTab("admin/applyMakeUp/index.html");
    									workspace.addPage(node);
    								});
    							
    							}else{
    								$.alert("资源申请失败!"+data.msg);
    							}
    							
    						}
    					});
                	
                
	    			///////////////////////////////////
	    		});
	    	}
	    },
	    promptPosition: 'topRight',
	    scroll: false
	  });
	
});

//清空涉密数据
function cleanSecret(){
	$("#amu_secret").find("input").val("");
	$("#amu_secret").find("textarea").val("");
	$("#amu_secret").find("select").val(-1);
	$("#amu_secret").find("input[type=text]").attr("disabled",true);
	$("#amu_secret input[type=radio]:checked").removeAttr("checked");
	$("#amu_secret").hide();
}

function checkCustomRadio(field, rules, i, options){
	var cName=$(field).attr("name");
	var cElement=$(field).parent().parent().find("input:checked");
	if (cElement.length==0) {
		return options.allrules.customRadio.alertText;
	}
}

function checkCustomSelect(field, rules, i, options){
	var value=$(field).val();
	if(value==-1){
		return options.allrules.customSecretLevel.alertText;
	}
}
