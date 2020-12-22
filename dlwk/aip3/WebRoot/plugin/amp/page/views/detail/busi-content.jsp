<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<style>
 .content-box span
 {
 	word-wrap:break-word;
 }
 .content-box
 {
 	border: solid 1px #D5D5D5;
 	height: 240px;
 	overflow-y: auto;
 	overflow-x:hidden;
 	margin-right: 10px;
 	padding-left: 10px;
 }
</style>
<div class="content-box">
 <table class="table table-bordered widget-table-desc">
		<tbody>
			<tr>
			    <td class="desc-laebl">业务序号：</td>
			    <td class="desc-content"><span id="busiCode"></span></td>
			    <td class="desc-laebl">应用系统：</td>
			    <td class="desc-content"><span id="appsysId"></span></td>
			    <td class="desc-laebl">应用功能：</td>
			    <td class="desc-content"><span id="appfunId"></span></td>
			</tr>
			<tr>
			    <td class="desc-laebl">业务名称：</td>
			    <td class="desc-content"><span id="busiName"></span></td>
			    <td class="desc-laebl">上级业务：</td>
			    <td class="desc-content"><span id="parbusiId"></span></td>
			    <td class="desc-laebl">办理主体：</td>
			    <td class="desc-content"><span id="mainBody"></span></td>
			</tr>
			<tr>
			    <td class="desc-laebl">办理主体类型：</td>
			    <td class="desc-content"><span id="mainbodyTyp"></span></td>
			    <td class="desc-laebl">事项类型：</td>
			    <td class="desc-content"><span id="busiTyp"></span></td>
			    <td class="desc-laebl">事项编号：</td>
			    <td class="desc-content"><span id="busiitemNo"></span></td>
			</tr>
			<tr>
			    <td class="desc-laebl">重要程度：</td>
			    <td class="desc-content"><span id="importantname"></span></td>
			    <td class="desc-laebl">优先级：</td>
			    <td class="desc-content"><span id="priority"></span></td>
			    <td class="desc-laebl">业务机构：</td>
			    <td class="desc-content"><span id="orgName"></span></td>
			</tr>
			<tr>
			    <td class="desc-laebl">规模：</td>
			    <td class="desc-content" colspan="1"><span id="scale"></span></td>
			    <td class="desc-laebl">复杂程度：</td>
			    <td class="desc-content" colspan="3"><span id="complex"></span></td>
			</tr>
			<tr class="text-area-tr">
			    <td class="desc-laebl">业务描述：</td>
			    <td class="desc-content"  colspan="5"><span class="txtArea" id="busiDesc"></span></td>
			</tr>
		</tbody>
	</table>
</div>
<script type="text/javascript" src="${ctx}/plugin/amp/page/views/detail/js/busi-content.js"></script>