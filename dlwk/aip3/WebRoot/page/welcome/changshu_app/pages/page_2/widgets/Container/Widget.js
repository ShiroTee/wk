'use strict';
define("dojo/_base/declare dojo/_base/html dojo/_base/lang dojo/on dijit/_WidgetBase dijit/_TemplatedMixin dojo/text!./widget.html ./../LeftWrap/Widget1/widget ./../LeftWrap/Widget2/widget ./../LeftWrap/Widget3/widget ./../MiddleWrap/TopRow/Widget4/widget ./../MiddleWrap/MidRow/Widget5/widget ./../MiddleWrap/MidRow/Widget6/widget ./../MiddleWrap/MidRow/Widget7/widget ./../MiddleWrap/BotRow/Widget8/widget ./../MiddleWrap/BotRow/Widget9/widget ./../RightWrap/Widget10/widget ./../RightWrap/Widget11/widget ./../RightWrap/Widget12/widget".split(" "),
function(d, z, e, f, g, h, k, l, m, n, p, q, r, t, u, v, w, x, y) {
    var b, c = null;
    b = d([g, h], {
        baseClass: "container",
        templateString: k,
        widgets: [],
        postCreate: function() {
            // this.widgets.push(new l, new m, new n, new p, new q, new r, new t, new u, new v, new w, new x, new y);
            this.widgets.push(new l,new p, new q, new r,new u,new w, new x);
            this.own(f(window, "resize", e.hitch(this, this.resize)))
        },
        startup: function() {
            for (var a = 0; a < this.widgets.length; a++) {
                var b = this.widgets[a];
                b.placeAt(this["refNode_" + a]);
                b.startup()
            }
        },
        resize: function() {
            for (var a = 0; a < this.widgets.length; a++) this.widgets[a].resize()
        }
    });
    b.getInstance = function() {
        null === c && (c = new b);
        return c
    };
    return b
});