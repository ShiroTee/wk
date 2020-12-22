/**
 * 页面加载完成处理
 */
$(function (e) {
    var groupId = $("#user_group_list_box .tableTrBackGroundColor:eq(0)").find("td:eq(0)").attr("groupid");

    qry(groupId);

    $("#role_from #q_listPagination").removeAttr("style");
    $("#role_from #q_listPagination").css('float', 'right');


    $("#role-save-sbtn").click(function () {
        add(groupId);
    });

    $("#role-edit-sbtn").click(function () {
        del(groupId);
    });

    $("#roleclose").click(function () {
        $.closeModal();
    });

})
/**
 * 查询信息
 */
function qry(e) {
    var params = {};
    params.op = op;
    params.groupId = e;
    var d = new Date();
    updatePagination("admin/group/role.json?time=" + d.getTime(), params, 100, 15,
        function (data, pageIndex) {
            $("#role-list tbody").empty();
            var list = data.list;
            var html = "";
            if (list.length > 0) {
                for (var i = 0; i < list.length; i++) {
                    var item = list[i];
                    var tr = '<tr>';
                    tr += '<td><label class="position-relative">' +
                        '	<input type="checkbox" class="ace" roleId="' + item.roleid + '">' +
                        '	<span class="lbl"></span>' +
                        '</label></td>';
                    tr += '<td class="table-td">' + item.rolename + '</td>';
                    tr += '<td class="table-td">'
                    if (item.roleremark != undefined) {
                        tr += item.roleremark;
                    }
                    ;
                    tr += '</td>';
                    tr += '</tr>';
                    html += tr;
                }
            }
            else {
                html = '<tr><td colspan="3" style="color: red; text-align: center;">暂无角色信息</td></tr>';
            }
            $("#role-list tbody").html(html);

        }, "#role_from_box");
}
/**
 * 增加角色
 */
function add(e) {
    var groupId = e;
    var roleId = new Array();
    $("#role_from_box input:checked").each(function () {
        roleId.push($(this).attr("roleId"));
    });
    var d = new Date();
    if (roleId.length > 0) {
        $.ajax(
            {
                url: "admin/group/addroles.json?time=" + d.getTime(),
                type: "POST",
                dataType: "json",
                data: {
                    groupId: groupId,
                    roleId: roleId.join(",")
                },
                success: function (data) {
                    $.closeModal();
                    $.alert("新增角色成功！", function (e) {
                        //刷新列表
                        qryGroup();
                    });
                    $.closeModal();
                }
            }
        )
    } else {
        $.alert("请选择要添加的角色！");
    }
}

function del(e) {
    var groupId = e;
    var roleId = new Array();
    $("#role_from_box input:checked").each(function () {
        roleId.push($(this).attr("roleId"));
    });
    var d = new Date();
    if (roleId.length > 0) {
        $.confirm("你确认要删除选中的角色吗？", function (e) {
                $.ajax(
                    {
                        url: "admin/group/delroles.json?time="+ d.getTime(),
                        type: "POST",
                        dataType: "json",
                        data: {
                            groupId: groupId,
                            roleId: roleId.join(",")
                        },
                        success: function (data) {
                            $.alert("删除角色成功！", function (e) {
                                //刷新列表
                                qryGroup();
                            });
                            $.closeModal();
                        }
                    }
                )
            },
            function (e) {
                $.closeModal();
            });
    } else {
        $.alert("请选择要添加的角色！");
    }

}