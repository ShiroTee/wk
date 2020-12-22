<%@ page language="java" pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div class="panel panel-default" style="border: 0px; margin-bottom: 0px;">

    <form class="form-horizontal"
          style="margin-left: 20px; margin-right: 20px;" id="resourcesApplyfrom">
        <div class="widget-box">
            <div class="widget-header header-color-blue">
                <h5 class="bigger lighter">申请编号：${info.applySerialNumString}</h5>
            </div>

            <div class="widget-body">
                <div class="widget-main">
                    <ul class="list-unstyled spaced2">
                        <li>
                            <div class="profile-user-info profile-user-info-striped">
                                <div class="profile-info-row">
                                    <div class="profile-info-name"> 申请单位：</div>

                                    <div class="profile-info-value">
                                        <span class="editable">${info.applyOrgName}</span>
                                    </div>
                                </div>

                                <div class="profile-info-row">
                                    <div class="profile-info-name"> 申请联系人：</div>

                                    <div class="profile-info-value">
                                        <span class="editable">${info.applyUser}</span>
                                    </div>
                                </div>

                                <div class="profile-info-row">
                                    <div class="profile-info-name">申请时间：</div>

                                    <div class="profile-info-value">
                    <span class="editable"><fmt:formatDate value="${info.applyDate}"
                                                           pattern="yyyy-MM-dd HH:mm"/></span>
                                    </div>
                                </div>

                                <div class="profile-info-row">
                                    <div class="profile-info-name">请选择处理结果:</div>

                                    <div class="profile-info-value">
                    <span class="editable">
                        <input type="radio" name="applyResultType" id="radio1"
                               value="1"> 已移交数据
                        <input type="radio" name="applyResultType" id="radio2"
                               value="0"> 不予提供
                    </span>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                    <textarea class="form-control" placeholder="备注说明" name="applyResultDesc" id="applyResultDesc"
                              data='[{"type":"length","maxLength":1024,"msg":"备注说明文本长度"}]'
                              style="max-width: 100%"></textarea>
                        </li>


                    </ul>

                </div>
            </div>
        </div>
        <input type="hidden" value="${info.applyId}" name="applyId"/>
    </form>
    <div class="panel-footer" style="padding-bottom:0px;text-align:right;">
        <button class="btn btn-danger rest-btn btn-xs"
                type="button" style="margin-right:10px;" id="rNew">
            <i class="icon-refresh"></i>重置
        </button>
        <!-- 添加 -->
        <button class="btn btn-info btn-xs" type="button"
                id="resourcesApply-sbtn">
            <i class="icon-save"></i>保存
        </button>
    </div>
</div>
<script type="text/javascript" src="${ctx }/page/admin/resourcesApplyManage/js/resourcesApplyManage-from.js"></script>

