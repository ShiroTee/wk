/**
 * 页面加载完成
 */
$(function () {
    var UserView = BaseView.extend(
        {
            el: "#resources-apply",
            url: "admin/resourcesApply/manage.html",
            multiple: true,
            initialize: function () {
                this.constructor.__super__.initialize.apply(this);
                this.doSearch(this.search);
            },
            pageCallback: function (searchWord) {
                $.extend(searchWord, getRespurces());
                /* console.log(searchWord); */
                workspace.reload("admin/resourcesApply/manage.html", searchWord);
            },
            events: {
                'click .btn-qry': 'selest',
                'click .btn-reset': 'new',
                'click a#show-delete': 'delete',
                'click a#show-add': 'add',
                'click table tbody td a.green': 'details',
                'click table tbody td a.blue': 'alter'
            },
            // 查询
            selest: function () {
                workspace.reload("admin/resourcesApply/manage.html", getRespurces());
            },
            // 重置
            new: function () {
                $("#number").val("");
                $("#applyOrgName").val("");
                $("#applyIsHandle").val("");
                $("#resources-startTime").val("");
                $("#resources-endTime").val("")
            },
            //删除
            delete:function () {
                var $selects = $("#resources-apply").find("input[type='checkbox']:checked");
                var applyIds=[];
                $selects.each(function () {
                    applyIds.push($(this).val());
                });
                if(applyIds.length>0){
                    $.confirm("确认删除吗？",function () {
                        $.submitData(
                            {
                                url: "admin/resourcesApply/dels.json",
                                data: {
                                    applyIds: applyIds.join(",")
                                },
                                sucFun: function (data) {
                                    $.closeModal();
                                    $.message("删除成功");
                                    workspace.reload("admin/resourcesApply/manage.html");
                                }
                            });

                    });
                }else {
                    $.message("请选择需要删除申请项！");
                }
            },
            //补录
            add:function () {
                var node=
                    {
                        nodeId:new Date().getTime()+"",
                        text:"补录申请",
                        href:"admin/applyMakeUp/index.html"
                    };
                workspace.addPage(node);
            },
            //详情
            details:function (e) {
                var applyId = $(e.target).parent().attr("applyId");
                window.open(CTX+"/mdp/welcome/apply/detail.html?id="+applyId);
            },
            //处理
            alter:function (e) {
                var applyId = $(e.target).parent().attr("applyId");
                $.modal(
                    {
                        url: "admin/resourcesApply/resourcesApply.html",
                        title: " 处理资源申请",
                        data:{
                            applyId:applyId
                        }
                    });
            }
        });
    var userView = new UserView();
    $("#resources-apply #resources--id").click(visCheck);
});
function getRespurces() {
    var number =$("#number").val();
    var applyOrgName = $("#applyOrgName").val();
    var applyIsHandle = $("#applyIsHandle").val();
    var startTime = $("#resources-startTime").val();
    var endTime = $("#resources-endTime").val();
    return {number:number,applyOrgName: applyOrgName,applyIsHandle:applyIsHandle, startTime: startTime, endTime: endTime};
}

/**
 * 表格全选/不选
 * @param {} e
 */
function visCheck(e) {
    var check = $(this).is(":checked");
    if(check)
    {
        $("#resources-apply #resources-apply-box").find('input').each(function () {
            this.checked=true;
        });
    }else {
        $("#resources-apply #resources-apply-box").find('input').each(function () {
            this.checked=false;
        });
    }
}

