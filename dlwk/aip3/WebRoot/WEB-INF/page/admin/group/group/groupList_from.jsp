<%@ page language="java" pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="panel panel-default" style="border: 0px; margin-bottom: 0px;">
    <div class="panel-body">
        <form class="form-horizontal"
              style="margin-left: 20px; margin-right: 20px;" id="groupList-form">
            <div class="form-group">
                <label class="col-lg-2 col-md-3 control-label no-padding-right">用户组名:</label>
                <div class="col-lg-7 col-md-6">
                    <input type="text" placeholder="用户组名" class="col-lg-12 col-md-12" name="groupName"
                           value="${info.groupName}"
                           data='[{"type":"empty","msg":"用户组名不能为空"}]'/>
                </div>
                <div style="color: red; margin-top: 5px;" class="col-lg-3 col-md-3">*</div>
            </div>
            <div class="form-group">
                <label class="col-lg-2 col-md-3 control-label no-padding-right">描述:</label>
                <div class="col-lg-7 col-md-6">
                    <textarea class="form-control" placeholder="描述" name="groupRemark"
                              data='[{"type":"length","maxLength":512,"msg":"描述文本长度"}]'
                              style="max-width: 100%">${info.groupRemark}</textarea>
                </div>
            </div>
            <input type="hidden" value="${info.groupId}" name="groupId"/>
        </form>
    </div>
    <div class="panel-footer" style="padding-bottom:0px;text-align:right;">
        <button class="btn btn-danger rest-btn btn-xs"
                type="button" style="margin-right:10px;">
            <i class="icon-refresh"></i>重置
        </button>
        <c:choose>
            <c:when test="${op=='add' }">
                <!-- 添加 -->
                <button class="btn btn-info btn-xs" type="button"
                        id="group-save-sbtn">
                    <i class="icon-save"></i>保存
                </button>
            </c:when>
            <c:otherwise>
                <!--编辑 -->
                <button class="btn btn-info btn-xs" type="button"
                        id="group-edit-sbtn">
                    <i class="icon-pencil"></i>修改
                </button>
            </c:otherwise>
        </c:choose>
    </div>
</div>
<script type="text/javascript" src="${ctx}/page/admin/group/group/js/groupList_from.js"></script>
