$(document).ready(function () {
    var form = new Form("resourcesApplyfrom");
    $("#rNew").click(function () {
        var $browsers = $("input[name=applyResultType]");
        var $box = $("#applyResultDesc");
        $browsers.attr("checked", false);
        $box.val("");
    })
    $("#resourcesApply-sbtn").click(function () {
        var $browsers = $("input[name=applyResultType]:checked");
        var applyId=$("input[name=applyId]");
        var $box = $("#applyResultDesc");
        if($browsers.length>0)
        {
            $.confirm("意见提交后则不能修改，确定立即提交吗？",function () {
                form.submit(
                    {
                        url: "admin/resourcesApply/edit.json",
                        type: "post",
                        data:{
                            applyId:applyId.val(),
                            applyResultType:$browsers.val(),
                            applyResultDesc:$box.val()
                        },
                        sucFun: function (data) {
                            $.closeModal();
                            $.message("修改成功");
                            workspace.reload("admin/resourcesApply/manage.html");
                        }
                    });
            });
        }else {
            $.message("请选择处理结果!");
        }
    });
});