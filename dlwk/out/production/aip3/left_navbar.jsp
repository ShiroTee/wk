<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!-- 左边树导航 -->
<div class="sidebar menu-min" id="sidebar">
	<script type="text/javascript">
		try
		{
			ace.settings.check('sidebar', 'fixed')
		} catch (e)
		{
		}
	</script>

	<div class="sidebar-shortcuts" id="sidebar-shortcuts">

	</div>
	<!-- #sidebar-shortcuts -->
	${html }
	<!-- /.nav-list -->
	<script type="text/javascript">
		try
		{
			ace.settings.check('sidebar', 'collapsed')
		} catch (e)
		{
		}
	</script>
</div>