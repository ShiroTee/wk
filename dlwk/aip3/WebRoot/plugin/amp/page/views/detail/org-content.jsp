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
			    <td class="desc-laebl">组织机构编码：</td>
			    <td class="desc-content"><span id="org_cd"></span></td>
			    <td class="desc-laebl">组织机构名称：</td>
			    <td class="desc-content"><span id="org_nm"></span></td>
			    <td class="desc-laebl">类别：</td>
			    <td class="desc-content"><span id="orgtypename"></span></td>
			</tr>
			<tr>
			    <td class="desc-laebl">级别：</td>
			    <td class="desc-content"><span id="orglvname"></span></td>
			    <td class="desc-laebl">上级机构组织：</td>
			    <td class="desc-content"><span id="parentorgname"></span></td>
			    <td class="desc-laebl">负责人：</td>
			    <td class="desc-content"><span id="leader"></span></td>
			</tr>
			<tr>
			    <td class="desc-laebl">成立日期：</td>
			    <td class="desc-content"><span id="found_date"></span></td>
			    <td class="desc-laebl">地址：</td>
			    <td class="desc-content"><span id="org_addr"></span></td>
			    <td class="desc-laebl">联系人：</td>
			    <td class="desc-content"><span id="ctc_psn"></span></td>
			</tr>
			<tr class="text-area-tr">
			    <td class="desc-laebl">描述：</td>
			    <td class="desc-content"  colspan="5"><span class="txtArea" id="org_desc"></span></td>
			</tr>
			<tr class="text-area-tr">
			    <td class="desc-laebl">职责范围：</td>
			    <td class="desc-content"  colspan="5"><span class="txtArea" id="org_duty"></span></td>
			</tr>
		</tbody>
	</table>
</div>
<script type="text/javascript" src="${ctx}/plugin/amp/page/views/detail/js/org-content.js"></script>