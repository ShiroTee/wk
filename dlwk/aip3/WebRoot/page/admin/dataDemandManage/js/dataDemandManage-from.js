$(document).ready(function () {
    var form = new Form("dataDemandfrom");
    $("#aDNew").click(function () {
        var $browsers = $("input[name=dapplyResultType]");
        var $box = $("#dapplyResultDesc");
        $browsers.attr("checked", false);
        $box.val("");
    })
    $("#dataDemand-sbtn").click(function () {
        var $browsers = $("input[name=dapplyResultType]:checked");
        var dapplyId=$("input[name=dapplyId]");
        var $box = $("#dapplyResultDesc");
        if($browsers.length>0)
        {
            $.confirm("意见提交后则不能修改，确定立即提交吗？",function () {
                form.submit(
                    {
                        url: "admin/dataDemand/edit.json",
                        type: "post",
                        data:{
                            dapplyId:dapplyId.val(),
                            dapplyResultType:$browsers.val(),
                            dapplyResultDesc:$box.val()
                        },
                        sucFun: function (data) {
                            $.closeModal();
                            $.message("修改成功");
                            workspace.reload("admin/dataDemand/manage.html");
                        }
                    });
            });
        }else {
            $.message("请选择处理结果!");
        }
    });
});