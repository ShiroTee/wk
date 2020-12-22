<%@ page language="java" pageEncoding="UTF-8"%>
<%@include file="../../../common/import-tags.jspf"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script>
    var op="${op}";
</script>
<div class="panel panel-default" style="border: 0px; margin-bottom: 0px;" id="role_from">
    <div class="widget-header widget-header-flat qry-box">
        <div class="widget-toolbar no-border" style="float: left;">
            <c:choose>
                <c:when test="${op=='add' }">
                    <span class="glyphicon glyphicon-plus"></span>添加用户 <input
                        id="groupId" type="hidden">
                </c:when>
                <c:otherwise>
                    <span class="glyphicon glyphicon-plus"></span>删除用户 <input
                        id="groupId" type="hidden">
                </c:otherwise>
            </c:choose>

        </div>
    </div>

    <div id="role_from_box" class="widget-body fw_panel_body">
        <table id="role-list" class="table table-bordered table-hover table-condensed" style="margin-bottom: 0px;">
            <thead>
            <tr>
                <th></th>
                <th>角色</th>
                <th>描述</th>

            </tr>
            </thead>
            <tbody>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            </tbody>
        </table>
        <%@include file="../../../common/admin-pagination.jsp" %>
    </div>
    <div class="panel-footer" style="padding-bottom:0px;text-align:right;">
        <c:choose>
            <c:when test="${op=='add' }">
                <!-- 添加 -->
                <button class="btn btn-info btn-xs" type="button"
                        id="role-save-sbtn">
                    <i class="icon-save"></i>添加
                </button>
            </c:when>
            <c:otherwise>
                <!--删除 -->
                <button class="btn btn-info btn-xs" type="button"
                        id="role-edit-sbtn">
                    <i class="icon-pencil"></i>删除
                </button>
            </c:otherwise>
        </c:choose>
        <button class="btn btn-danger rest-btn btn-xs" id="roleclose"
                type="button" style="margin-right:10px;">
            <i class="icon-refresh"></i>取消
        </button>
    </div>
</div>
<script type="text/javascript" src="${ctx}/page/admin/group/group/js/role_from.js"></script>
