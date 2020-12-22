/*window.document.oncontextmenu = function(event) {

	event.returnValue = false;
	return false;
};*/

/*******************************************************************************
 * 操作说明
 */
$(".caozuoshuoming-div").hide();
$(".caozuoshuoming").bind(
		{
			mouseenter : function() {
				var position = $(this).position().left + 30;
				$(".caozuoshuoming-div").stop(true, true).css("position",
						"absolute").css("left", position).show("blind", {
					direction : "horizontal"
				}, 500);
			},
			mouseleave : function() {
				$(".caozuoshuoming-div").stop(false, false).fadeOut();
			}

		});

/*******************************************************************************
 * 悬浮详情
 */
$(".widget-box .widget-header").bind(
		{
			dblclick : function() {
				$(this).closest(".widget-box").find(".widget-collapse")
						.trigger("click");
			}
		});

$.app = {
	openFullScreen : function(url) {
		var sheight = screen.height;
		var swidth = screen.width;
		var winoption = "left=0,top=0,height="
				+ sheight
				+ ",width="
				+ swidth
				+ ",toolbar=yes,menubar=yes,location=yes,status=yes,scrollbars=yes,resizable=yes";
		var tmp = window.open(url, '', winoption);
		return tmp;

	},
	location:function(url){
		window.location.href=url;
	},
	bindTableData:function (id,data){
		$(id+'>tbody').empty();
		
		for(var i = 0; i < data.length; i++ ){
			var item=data[i];
			var html="<tr>";
			
			$(id+'>thead th').each(function(i) {
				
				var field = $(this).attr('field');
				var labelFunction=$(this).attr('labelFunction');
				if(labelFunction!=null && labelFunction!=""){
					var result=eval(labelFunction)(field,item);
					result=(result==null?"":result);
					html+="<td>"+result+"</td>";
				}else{
					var result=item[field];
					result=(result==null?"":result);
					html+="<td>"+result+"</td>";
				}			
			});
			html+="</tr>";
			
			var obj=$(html);
			obj.data("data",item);
			obj.appendTo(id+">tbody");
		}
		
	},
	confirm : function(options) {
        var defaults = {
                title : "确认执行操作",
                message : "确认执行操作吗？",
                cancelTitle : '取消',
                okTitle : '确定',
                cancel : $.noop,
                ok : $.noop,
                alert : false
            };

            if(!options) {
                options = {};
            }
            options = $.extend({}, defaults, options);

            var template =
                '<div class="modal fade confirm" data-backdrop="static" tabindex="-1" style="z-index:10000;" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                    '<div class="modal-dialog" style="width:480px;margin:180px auto 0 auto;"><div class="modal-content"><div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                    '<h4 class="modal-title" style="color: #bd362f;">{title}</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '<div>{message}</div>' +
                    '</div>' +
                    '<div class="modal-footer" style="background-color: white">' +
                    '<a href="#" class="btn btn-ok btn-danger" data-dismiss="modal">{okTitle}</a>' +
                    '<a href="#" class="btn btn-default btn-cancel" data-dismiss="modal">{cancelTitle}</a>'+
                    '</div>' +
                    '</div>';

            var modalDom =
                $(template
                    .replace("{title}", options.title)
                    .replace("{message}", options.message)
                    .replace("{cancelTitle}", options.cancelTitle)
                    .replace("{okTitle}", options.okTitle));


            var hasBtnClick = false;
            if(options.alert) {
                modalDom.find(".modal-footer > .btn-cancel").remove();
            } else {
                modalDom.find(".modal-footer > .btn-cancel").click(function() {
                    hasBtnClick = true;
                    options.cancel();
                });
            }
            modalDom.find(".modal-footer > .btn-ok").click(function() {
                hasBtnClick = true;
                options.ok();
            });

//            modalDom.on("shown.bs.modal", function(e,t) {
//            	if($(".modal-backdrop ").length>1){
//            		$(".modal-backdrop:last ").css("z-index",9999);
//            	}
//            }).modal('toggle');
            var modal = modalDom.modal("show");
            modal.on("hidden", function() {
                modal.remove();//移除掉 要不然 只是hidden
                if(hasBtnClick) {
                    return true;
                }
                if(options.alert) {
                    options.ok();
                } else {
                    options.cancel();
                }
            });

            return modal;
        },
        alert : function(options) {
            if(!options) {
                options = {};
            }
            var defaults = {
                title : "警告",
                message : "非法的操作",
                okTitle : "关闭",
                ok : $.noop
            };
            options.alert = true;
            options = $.extend({}, defaults, options);
            this.confirm(options);
        }
}
$.widget={
		show:function(jexp){
			$(jexp).removeClass("hide");
		},
		hide:function(jexp){
			$(jexp).addClass("hide");
		},
		max:function(jexp){
			var hide=$(jexp).hasClass("hide");
			var collapsed=$(jexp+" .widget-box").hasClass("collapsed");
			if(hide){
				$(jexp).removeClass("hide");
			}
			if(collapsed){
				$(jexp+" .widget-box").find(".widget-collapse").trigger("click");
			}
		},
		min:function(jexp){
			var hide=$(jexp).hasClass("hide");
			var collapsed=$(jexp+" .widget-box").hasClass("collapsed");
			if(hide){
				$(jexp).removeClass("hide");
			}
			if(!collapsed){
				$(jexp+" .widget-box").addClass("collapsed");
			}
		}
}