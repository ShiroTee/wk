<%@page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset="UTF-8" />
</head>
<style>
input{
width:300px;
display:block;
}
</style>
<body>
	
	<form method="post" action="${pageContext.request.contextPath}/app/http/sps/approvalHandler/apply">
		资产ID: <input type="text" value="-MTuIIa-EeK16tZNlCYbWQ" name="assetId"/>"
		资产名称: <input type="text" value="公积金支取明细信息" name="assetName"/>
		资产持有者: <input type="text" value="_NlIoYOznEeGGd9tXrm-Mbg" name="assetProvider"/>
		资产持有者姓名: <input type="text" value="公积金中心" name="assetProviderName"/>
		申请说明: <input type="text" value="街道办需要查询社区人员公积金使用信息" name="comment"/>
		
		<input type="submit"/>"
	</form>
</body>
</html>