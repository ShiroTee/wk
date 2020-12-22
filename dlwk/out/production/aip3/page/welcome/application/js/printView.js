/**
 * Created by Administrator on 2017/3/1.
 */
var mode = 0; //1代表涉密数据，0代表属性数据
$(function(){
	
	//查询数据
	/**var url=ctx+"/mdp/welcome/print/preview.json";
	$.ajax({url:url,type:"POST",dataType:"json",data:{id:applyId},success:function(data){
		if(data.applySecret)
		{
			mode=1;
		}
		
	}});
	
    if(mode){
        $('.statement').toggleClass('hide');
    }
    initPropData();
    initSecretData();
    initServiceData();**/
})



//打印申请单
var printApplication = function(){
    var oldApplication = $('body').html();
    var printDom = $('#printArea');
    $('body').html('').append(printDom);
    pageSetup_Null();
    window.print();
    $('body').html(oldApplication);
    updateApplyPrintStatus();
}
/**
 * 更新资源申请的打印状态
 */
function updateApplyPrintStatus()
{
	var url=ctx+"/mdp/welcome/print/update/status.json";
	$.ajax({url:url,type:"POST",dataType:"json",data:{id:applyId},success:function(data){
		console.log(applyId+":更新打印状态成功！");
	}});
}
/**
 * 提交暂存申请 
 */
function onSubmitApply()
{
	$.confirm({
	    title: '提示!',
	    content: '确定现在就提交申请吗？',
	    boxWidth: '500px',
	    useBootstrap: false,
	    icon: 'fa fa-warning',
	    type: 'blue',
	    buttons: {
	        确定: function () {
	        	var url=ctx+"/mdp/welcome/apply/update/status.json";
	        	$.ajax({url:url,type:"POST",dataType:"json",data:{id:applyId},success:function(data){
	        		window.location.href=ctx+"/mdp/welcome/applySucess.html?applyId="+applyId;
	        	}});
	        },
	        取消: function () {
	        }
	    }
	});
}
/**
 * 编辑申请
 */
function onEditApply()
{
	
}

// 设置IE页眉页脚为空  
function pageSetup_Null()  
{  
	var hkey_root,hkey_path,hkey_key ; 
	hkey_root="HKEY_CURRENT_USER";  
	hkey_path="\\Software\\Microsoft\\Internet Explorer\\PageSetup\\" ;
	try{  
	 var RegWsh = new ActiveXObject("WScript.Shell") ;  
	 hkey_key="header" ;  
	 RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"") ;  
	 hkey_key="footer" ;  
	 RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"") ;  
	 }  
	catch(e){
		console.log(e);
	}  
}  
/*
* 属性数据资源
* propData 列表 [{no:1,name:'资源名称',mode:'共享方式'，rate:'共享频率'}]
* tableRow格式
*
* <tr>
 <td>2</td>
 <td colspan="2"><input class="full"></td>
 <td><input class="full"></td>
 <td><input class="full"></td>
 </tr>
* */
var initPropData = function(propData){
    if(!propData || propData.length == 0){
        propData = [{no:1,name:'',mode:'',rate:''},{no:2,name:'',mode:'',rate:''}];
    }

    var tableRow = [];
    $.each(propData,function(i,item){
        tableRow.push('<tr><td>' + item.no + '</td>');
        tableRow.push('<td colspan="2"><input class="full" value="' + item.name + '"></td>');
        tableRow.push('<td><input class="full" value="' + item.mode + '"></td>');
        tableRow.push('<td><input class="full" value="' + item.rate + '"></td></tr>');
    })
    $('#propData').after(tableRow.join(''));
}

/*
 * 涉密数据
 * propData 列表 [{no:1,content:'数据内容',range:'数据范围'，format:'数据格式',updateTime:'更新时间'}]
 * tableRow格式
 *
 * <tr>
 <td style="padding: .5em 0">1</td>
 <td><input class="full"></td>
 <td><input class="full"></td>
 <td><input class="full"></td>
 <td><input class="full"></td>
 </tr>
 * */
var initSecretData = function(secretData){
    if(!secretData || secretData.length == 0){
        secretData = [{no:1,content:'',range:'',format:'',updateTime:''},
            {no:2,content:'',range:'',format:'',updateTime:''}];
    }

    var tableRow = [];
    $.each(secretData,function(i,item){
        tableRow.push('<tr><td style="padding: .5em 0">' + item.no + '</td>');
        tableRow.push('<td><input class="full" value="' + item.content + '"></td>');
        tableRow.push('<td><input class="full" value="' + item.range + '"></td>');
        tableRow.push('<td><input class="full" value="' + item.format + '"></td>');
        tableRow.push('<td><input class="full" value="' + item.updateTime + '"></td></tr>');
    })
    $('#secretData').after(tableRow.join(''));
}

/*
 * 空间服务
 * serviceData 列表 [{no:1,name:'数据服务名称'}]
 * tableRow格式
 *
 * <tr>
 <td style="padding: .5em 0">1</td>
 <td colspan="4"><input class="full"></td>
 </tr>
 * */
var initServiceData = function(serviceData){
    if(!serviceData || serviceData.length == 0){
        serviceData = [{no:1,name:''},
            {no:2,name:''}];
    }

    var tableRow = [];
    $.each(serviceData,function(i,item){
        tableRow.push('<tr><td style="padding: .5em 0">' + item.no + '</td>');
        tableRow.push('<td colspan="4"><input class="full" value="' + item.name + '"></td></tr>');
    })
    $('#serviceData').after(tableRow.join(''));
}