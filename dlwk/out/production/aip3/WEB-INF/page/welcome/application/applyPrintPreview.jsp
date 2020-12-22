<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>资源申请表在线打印_信息资源目录1</title>
    <link type="text/css" rel="stylesheet" href="${ctx }/resources/font-awesome-4.3.0/css/font-awesome.min.css" />
    <link type="text/css" rel="stylesheet" href="${ctx }/page/welcome/application/css/printPreview.css" />
    <link type="text/css" rel="stylesheet" href="${ctx }/resources/css/style.css" />
    <script src="${ctx }/resources/jquery/jquery-1.11.2.min.js" type="text/javascript"></script>
    <%@include file="../../common/import-jquery-confirm.jspf"%>
    <script src="${ctx }/page/welcome/application/js/printView.js" type="text/javascript"></script>
    <script type="text/javascript">
    	var applyId="${applyId}";
    	var ctx="${ctx}";
    </script>
</head>
<body>
<div id="btnArea">
    <c:choose>
    	<c:when test="${apply.applyIsHandle==2 }">
    		<a href="javascript:void(0);" class="res_detail_btn btn_blue" onclick="onSubmitApply()"><i class="ico submitIcon"></i>提交申请</a>
            <a href="${ctx }/mdp/welcome/resourceModify.html?applyId=${applyId}" class="res_detail_btn btn_blue"><i class="ico editIcon"></i>编辑申请</a>
    	</c:when>
    	<c:otherwise>
    		<a href="javascript:void(0);" class="res_detail_btn btn_blue" onclick="printApplication();"><i class="ico printIcon"></i>打印申请</a>
    	</c:otherwise>
    </c:choose>
</div>
<div id="printArea">
    <style media="print">
	    @page {
	      size: auto A4 landscape;  /* auto is the initial value */
	      margin: 0mm; /* this affects the margin in the printer settings */
	      padding: 20px 10px;
	      margin-top: 20px;
	      margin-bottom: 20px;
	    }
	    tr.header td{
		    font-weight: bold;
		    background: #D9D9D9 !important;
		}
	</style>
    <h1>信息资源申请表</h1>
 <!--    <div class="application-date" style="text-align:right;">备案号：<span>CSZY–2017-0000013</span></div> -->
    <table>
       <!--  <tr>
            <td>申请部门：</td>
            <td colspan="3"><div id="applyDepName" class="full">公安局</div></td>
        </tr> -->
        <tr>
            <td>申请人：</td>
            <td><div id="applyUserName" class="full">${user.name}</div></td>
            <td>申请日期：</td>
            <td><div id="applyDate" class="full">${histTasks[0].createTime }</div></td>
        </tr>
        <tr>
            <td>申请资源名称：</td>
            <td colspan="3"><div id="resourceName" class="full">${catalogueInfo.resourceName }</div></td>
        </tr>        
        <tr>
            <td>申请说明：</td>
            <td colspan="3"><div id="description" class="full justify">
            	 ${applyResource.variableMap["resourceApply.describe"] } 
            </div></td>
        </tr>
         <c:if test="${not empty adminApprovalNode and not empty adminApproval}">
        <tr>
            <td>受理意向：</td>
            <td colspan="3"><div id="recDepName" class="full">${adminApproval.variableMap.method==0?"同意":"不同意" }</div></td>
        </tr> 
       
        <tr>
            <td>受理意见：</td>
            <td colspan="3"><div id="recDesc" class="full justify">
            	${adminApproval.variableMap.acceptanceOpinion }
            </div></td>
        </tr>        
        <tr>
            <td>受理人：</td>
            <td><div id="recUserName" class="full">${adminApprovalUser.name}</div></td>
            <td>受理日期：</td>
            <td><div id="recDate" class="full">${adminApproval.finishTime }</div></td>
        </tr>
        </c:if>
        
        <c:if test="${not empty reousrceOwnerApprovalNode and not empty reousrceOwnerApproval}">
         <tr>
            <td>审批意向：</td>
            <td colspan="3"><div id="approveDepName" class="full">${reousrceOwnerApproval.variableMap.method==0?"同意":"不同意" }</div></td>
        </tr>  
        <tr>
            <td>审批意见：</td>
            <td colspan="3"><div id="approveDesc" class="full justify">
            	${reousrceOwnerApproval.variableMap.ownerOpinion}
            </div></td>
        </tr>        
        <tr>
            <td>审批人：</td>
            <td><div id="approveUserName" class="full">${reousrceOwnerApprovalUser.name}</div></td>
            <td>审批日期：</td>
            <td><div id="approveDate" class="full">${reousrceOwnerApproval.finishTime }</div></td>
        </tr>
        </c:if>
        
        <c:if test="${not empty grantAuthorizationNode and not empty grantAuthorization }">
         <tr>
            <td>授权意向：</td>
            <td colspan="3"><div id="approveDepName" class="full">${grantAuthorization.variableMap.method==0?"同意":"不同意" }</div></td>
        </tr>  
        <tr>
            <td>授权意见：</td>
            <td colspan="3"><div id="approveDesc" class="full justify">
            	${grantAuthorization.variableMap.ownerOpinion}
            </div></td>
        </tr>        
        <tr>
            <td>授权人：</td>
            <td><div id="approveUserName" class="full">${grantAuthorizationUser.name}</div></td>
            <td>授权日期：</td>
            <td><div id="approveDate" class="full">${grantAuthorization.finishTime }</div></td>
        </tr>
        </c:if>
        
    </table>
    <div  style="page-break-after: always;"></div>
    <h1>字段申请清单</h1>
    <div class="application-date">资源名称：<span>${catalogueInfo.resourceName }</span></div>
    <table style="    margin-bottom: 120px;">
        <tr>
            <td>审批环节</td>
            <td colspan="2">字段名称</td>
            <td>审批状态</td>
        </tr>
        <tr>
            <td>申请</td>
            <td colspan="2"> 
            	<c:forEach var="metaInfo" items="${list}">
            	${metaInfo.field.fieldName } ( ${metaInfo.field.pyName})
            	</c:forEach>
           </td>
            <td>申请 </td>
        </tr>
        <c:if test="${not empty reousrceOwnerApprovalNode and not empty reousrceOwnerApproval}">
        <tr>
            <td rowspan="2" style="border-bottom: 1px solid #000;">审批</td>
            <td colspan="2"> <c:forEach var="metaInfo" items="${list}">
            ${metaInfo.field.fieldName }( ${metaInfo.field.pyName})
            </c:forEach></td>
            <td>${reousrceOwnerApproval.variableMap.method==0?"同意":"不同意" }</td>
        </tr>
        </c:if>
        
    </table>    
</div>
</body>
</html>