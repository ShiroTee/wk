/**
 * 页面加载完成
 */
$(function () {
    var UserView = BaseView.extend(
        {
            el: "#data-demand",
            url: "admin/dataDemand/manage.html",
            multiple: true,
            initialize: function () {
                this.constructor.__super__.initialize.apply(this);
                this.doSearch(this.search);
            },
            pageCallback: function (searchWord) {
                $.extend(searchWord, getDemand());
                /* console.log(searchWord); */
                workspace.reload("admin/dataDemand/manage.html", searchWord);
            },
            events: {
                'click .btn-qry': 'selest',
                'click .btn-reset': 'new',
                'click a#show-delete': 'delete',
                'click table tbody td a.green': 'details',
                'click table tbody td a.blue': 'alter'
            },
            // 查询
            selest: function () {
                workspace.reload("admin/dataDemand/manage.html", getDemand());
            },
            // 重置
            new: function () {
                $("#dapplyOrgName").val("");
                $("#dapplyType").val("");
                $("#data-startTime").val("");
                $("#data-endTime").val("")
            },
            //删除
            delete:function () {
                var $selects = $("#data-demand").find("input[type='checkbox']:checked");
                var dapplyIds=[];
                $selects.each(function () {
                    dapplyIds.push($(this).val());
                });
                if(dapplyIds.length>0){
                    $.confirm("确认删除吗？",function () {
                        $.submitData(
                            {
                                url: "admin/dataDemand/dels.json",
                                data: {
                                    dapplyIds: dapplyIds.join(",")
                                },
                                sucFun: function (data) {
                                    $.closeModal();
                                    $.message("删除成功");
                                    workspace.reload("admin/dataDemand/manage.html");
                                }
                            });

                    });
                }else {
                    $.message("请选择需要删除申请项！");
                }
            },
            //详情
            details:function (e) {
                var dapplyId = $(e.target).parent().attr("dapplyId");
                window.open(CTX+"/mdp/welcome/demand/demandDetails.html?id="+dapplyId);
            },
            //处理
            alter:function (e) {
                var dapplyId = $(e.target).parent().attr("dapplyId");
                $.modal(
                    {
                        url: "admin/dataDemand/dataDemand.html",
                        title: "处理数据需求",
                        data:{
                            dapplyId:dapplyId
                        }
                    });
            }
        });
    var userView = new UserView();
    $("#data-demand #data-demand-id").click(visCheck);
});
function getDemand() {
    var dapplyOrgName = $("#dapplyOrgName").val();
    var dapplyType = $("#dapplyType").val();
    var startTime = $("#data-startTime").val();
    var endTime = $("#data-endTime").val();
    return {dapplyOrgName: dapplyOrgName,dapplyType:dapplyType, startTime: startTime, endTime: endTime};
}

/**
 * 表格全选/不选
 * @param {} e
 */
function visCheck(e) {
    var check = $(this).is(":checked");
    if(check)
    {
        $("#data-demand #data-demand-box").find('input').each(function () {
            this.checked=true;
        });
    }else {
        $("#data-demand #data-demand-box").find('input').each(function () {
            this.checked=false;
        });
    }
}
