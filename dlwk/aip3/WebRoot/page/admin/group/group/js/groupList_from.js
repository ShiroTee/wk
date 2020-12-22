$(function () {
    var form = new Form("groupList-form");

    $("#group-save-sbtn").click(function () {
        form.submit(
            {
                url:"admin/group/addgroup.json",
                type:"post",
                sucFun : function(data)
                {
                    $.closeModal();
                    $.message("新增用户组成功");
                    workspace.reload("admin/userGroup.html");
                }
            }
        )
    });
    $("#group-edit-sbtn").click(function () {
        form.submit(
            {
                url:"admin/group/editgroup.json",
                type:"post",
                sucFun : function(data)
                {
                    $.closeModal();
                    $.message("修改用户组成功");
                    workspace.reload("admin/userGroup.html");
                }

            }
        )
    })
})