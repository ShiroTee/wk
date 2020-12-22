<%@ page language="java" pageEncoding="UTF-8"%>
<link href="${ctx}/page/welcome/application/css/city-picker.css"
	rel="stylesheet" type="text/css" />
<div style="position: relative;" id="orgChoose">
	<input id="city-picker3" class="form-control city-picker-input"
		readonly="" type="text" data-toggle="city-picker"><span
		class="city-picker-span exam_input"
		style="width: 100%; text-indent: 5px; height: 34px; line-height: 33px;">
		<span class="placeholder" style="display: none;">请选择省/市/区</span><span
		class="title" style="display: inline;"><span
			class="select-item" data-count="province" name="applyOrgName"
			data-code="460000"> <c:if test="${empty apply.applyOrgName}">请选择单位</c:if>
				<c:if test="${!empty apply.applyOrgName}">${apply.applyOrgName}</c:if>
		</span></span>
		<div class="arrow"></div>
	</span>
	<div class="city-picker-dropdown"
		style="left: 0px; top: 100%; width: 100%; display: none;">
		<div class="city-select-wrap">

			<div class="city-select-tab">
				<div id="goLeftTab" style="cursor: pointer;line-height: 38px;" class="l">&lt;&lt;</div>
				<c:forEach var="orgType" items="${orgTypelist }" varStatus="status">
					<a data-count="${orgType.DICT_VALUE }"
						class="<c:if test="${status.count == 1}">active</c:if>"
						style="display: none;">${orgType.DICT_TEXT }</a>
				</c:forEach>
				<div id="goRightTab" style="cursor: pointer;line-height: 38px;" class="r">&gt;&gt;</div>
			</div>
			<div class="city-select-content">



				<c:forEach var="orgType" items="${orgTypelist }" varStatus="status">
					<div class="city-select province"
						data-count="${orgType.DICT_VALUE }"
						<c:if test="${status.count == 1}">style="display: block;"</c:if>
						<c:if test="${status.count != 1}">style="display: none;"</c:if>>
						<dl class="clearfix">
							<c:forEach var="org" items="${orglist[status.count-1] }">
								<a title="${org.ORG_NAME }" data-code="${org.INFO_CODE }"
									class="">${org.ORG_NAME }</a>
							</c:forEach>
						</dl>
					</div>
				</c:forEach>

			</div>
		</div>
	</div>
</div>
<script type="text/javascript"
	src="${ctx}/page/welcome/application/js/chooseOrg.js"></script>