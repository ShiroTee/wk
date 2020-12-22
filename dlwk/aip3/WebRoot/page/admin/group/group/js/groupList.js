/**
 * 页面加载完成处理
 */
$(function (e) {
	AutoLayout.exec([$('#user_group_list_box'),$('#userGroup-table')],62+15);
    qryGroup();
    $("#grouplist #q_listPagination").removeAttr("style");
    $("#grouplist #q_listPagination").css('float', 'right');

    $("#grouplist #select-group-name").click(qryGroup);
    $("#grouplist #group-add").click(addgroup);
    $("#grouplist #group-alter").click(editgroup);
    $("#grouplist #group-delete").click(deletegroup);
    $("#grouplist #addrole").click(addrole);
    $("#grouplist #deleterole").click(delrole);
})
/**
 * 查询所有组
 */
function qryGroup() {
    var params = {};
    params.groupName = $("#grouplist #group-name").val();
    var d = new Date();
    updatePagination("admin/group/qryGroup.json?time=" + d.getTime(), params, 100, 15,
        function (data, pageIndex) {
            $("#group-list tbody").empty();
            var list = data.list;
            var html = "";
            if (list.length > 0) {
                for (var i = 0; i < list.length; i++) {
                    var item = list[i];
                    var tr = '<tr>';
                    tr += '<td class="table-td" groupid="' + item.groupid + '">' + item.groupname + '</td>';
                    tr += '<td class="table-td">';
                    if (item.groupremark != undefined) {
                        tr += item.groupremark;
                    }
                    tr += '</td>';
                    tr += '<td class="table-td">';
                    if (item.rolename != undefined) {
                        tr += item.rolename;
                    }
                    tr += '</td>';
                    tr += '</tr>';
                    html += tr;
                }
            }
            else {
                html = '<tr><td colspan="4" style="color: red; text-align: center;">暂无用户组信息</td></tr>';
            }
            $("#group-list tbody").html(html);

        }, "#user_group_list_box");
}
/**
 * 添加用户组
 */
function addgroup() {
    $.modal(
        {
            url: "admin/group/groupListfrom.html",
            title: "新增用户组",
            data: {
                op: "add"
            }
        }
    )

}

/**
 * 修改用户组
 */
function editgroup() {
    var groupId = $("#user_group_list_box .tableTrBackGroundColor:eq(0)").find("td:eq(0)").attr("groupid");
    if ($("#user_group_list_box .tableTrBackGroundColor").size() > 0) {
        $.modal({
            url: "admin/group/groupListfrom.html",
            title: "修改用户组",
            data: {
                op: "edit",
                groupId: groupId,
            }
        });
    } else {
        $.alert("请先选择用户组！");
        return;
    }
}
/**
 * 删除用户组
 */
function deletegroup() {
    var groupId = $("#user_group_list_box .tableTrBackGroundColor:eq(0)").find("td:eq(0)").attr("groupid");
    var d = new Date();
    if ($("#user_group_list_box .tableTrBackGroundColor").size() > 0) {
        $.confirm("你确认要删除选中的用户组吗？", function (e) {
                $.ajax(
                    {
                        url: "admin/group/deletegroup.json?time=" + d.getTime(),
                        type: "POST",
                        dataType: "json",
                        data: {
                            groupId: groupId
                        },
                        success: function (data) {
                            $.alert("删除用户组成功！", function (e) {
                                //刷新列表
                                qryGroup();
                                getGroupUser(groupId);
                            });
                            $.closeModal();
                        }
                    });
            },
            function (e) {
                $.closeModal();
            });
    } else {
        $.alert("请先选择用户组！");
        return;
    }

}
/**
 * 增加角色
 */
function addrole() {
    var groupId = $("#user_group_list_box .tableTrBackGroundColor:eq(0)").find("td:eq(0)").attr("groupid");
    if ($("#user_group_list_box .tableTrBackGroundColor").size() > 0) {
        $.modal(
            {
                url: "admin/group/addrole.html",
                title: "选择角色",
                data: {
                    op: "add",
                    groupId: groupId
                }
            }
        )
    } else {
        $.alert("请先选择用户组！");
        return;
    }

}
/**
 * 删除角色
 */
function delrole() {
    var groupId = $("#user_group_list_box .tableTrBackGroundColor:eq(0)").find("td:eq(0)").attr("groupid");
    if ($("#user_group_list_box .tableTrBackGroundColor").size() > 0) {
        $.modal(
            {
                url: "admin/group/addrole.html",
                title: "选择角色",
                data: {
                    op: "del",
                    groupId: groupId
                }
            }
        )
    } else {
        $.alert("请先选择用户组！");
        return;
    }

}