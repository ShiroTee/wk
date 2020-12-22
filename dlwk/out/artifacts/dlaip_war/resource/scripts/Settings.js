/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.Settings', {
    extend: 'Ext.window.Window',

    uses: [
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.form.field.Checkbox',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Border',

        'Ext.ux.desktop.Wallpaper',

        'MyDesktop.WallpaperModel'
    ],

    layout: 'anchor',
    title: '桌面背景设置',
    modal: true,
    width: 640,
    height: 480,
    border: false,

    initComponent: function () {
        var me = this;

        me.selected = me.desktop.getWallpaper();
        var cookieWallpaper = Ext.util.Cookies.get("ext-wallpaper");
        if(cookieWallpaper != null){
        	var cookieWallpapers = cookieWallpaper.split(':');
        	if(cookieWallpapers[1]){
        		me.selected = cookieWallpapers[1];
        	}
        }
        me.stretch = me.desktop.wallpaper.stretch;
        var cookieWallpaperStretch = Ext.util.Cookies.get("ext-wallpaperStretch");
        if(cookieWallpaperStretch != null){
        	var cookieWallpaperStretches = cookieWallpaperStretch.split(':');
        	if(cookieWallpaperStretches[1]){
        		wallpaperStretch = cookieWallpaperStretches[1] == 1?true : false;
        		me.stretch = wallpaperStretch;
        	}
        }


        me.preview = Ext.create('widget.wallpaper');
        me.preview.setWallpaper(me.selected);
        me.tree = me.createTree();

        me.buttons = [
            { text: '确定', handler: me.onOK, scope: me },
            { text: '取消', handler: me.close, scope: me }
        ];

        me.items = [
            {
                anchor: '0 -30',
                border: false,
                layout: 'border',
                items: [
                    me.tree,
                    {
                        xtype: 'panel',
                        title: '预览',
                        region: 'center',
                        layout: 'fit',
                        items: [ me.preview ]
                    }
                ]
            },
            {
                xtype: 'checkbox',
                boxLabel: '拉伸',
                checked: me.stretch,
                listeners: {
                    change: function (comp) {
                        me.stretch = comp.checked;
                    }
                }
            }
        ];

        me.callParent();
    },

    createTree : function() {
        var me = this;

        function child (img,text) {
            return { img: img, text: text, iconCls: '', leaf: true };
        }

        var tree = new Ext.tree.Panel({
            title: '背景',
            rootVisible: false,
            lines: false,
            autoScroll: true,
            width: 150,
            region: 'west',
            split: true,
            minWidth: 100,
            listeners: {
                afterrender: { fn: this.setInitialSelection, delay: 100 },
                select: this.onSelect,
                scope: this
            },
            store: new Ext.data.TreeStore({
                model: 'MyDesktop.WallpaperModel',
                root: {
                    text:'Wallpaper',
                    expanded: true,
                    children:[
                    		{text: "经典", iconCls: 'tree_gnome', leaf:false,children:
                        	[
		                        child('Blue-Sencha.jpg','蓝色一'),
		                        child('Dark-Sencha.jpg','黑色'),
		                        child('Wood-Sencha.jpg','木色'),
		                        child('blue.jpg','蓝色二'),
		                        child('desk.jpg','蓝色三'),
		                        child('desktop.jpg','蓝色四'),
		                        child('desktop2.jpg','蓝色五')
                        	]
                        },
                        {text: "护眼", iconCls: 'tree_eye', leaf:false,children:
                        	[
		                        child('forest.jpg','森林'),   
		                        child('lawn.jpg','草地'),
		                        child('lawnto.jpg','绿草地'),
		                        child('prairie.jpg','草原'),
		                        child('hyan.jpg','护眼一'),
		                        child('hyan2.jpg','护眼二'),
		                        child('hyan3.jpg','护眼三'),
		                        child('hyan4.jpg','护眼四'),
		                        child('hyan5.jpg','护眼五'),
		                        child('hyan6.jpg','护眼六'),
		                        child('hyan7.jpg','护眼七')
		                        
                        	]
                        },
                        {text: "风景", iconCls: 'tree_icq', leaf:false,children:
                        [
	                        child('road.jpg','路'),
	                        child('shore.jpg','海'),
	                        child('skys.jpg','天与地'),
	                        child('snowberg.jpg','雪山'),
	                        child('snowfield.jpg','雪'),
                       		child('sky.jpg','天空色'),
                       	 	child('waterfall.jpg','瀑布'),
                       	 	child('bottle.jpg','瓶子')
                        ]
                        },
                        {text: "建筑", iconCls: 'tree_folder_home', leaf:false,children:
                        [
	                        child('view-villa.jpg','风景房子'),
	                        child('villaone.jpg','别墅'),
	                        child('villato.jpg','小别墅'),
	                        child('glass-house.jpg','玻璃房子'),
                        	child('glass-houseto.jpg','玻璃小房子')
                        ]
                        },
                        {text: "动物", iconCls: 'tree_dog', leaf:false,children:
                        [
	                        child('dog.jpg','猫咪和鸡'),
	                        child('dog-three.jpg','怪狗狗'),
	                        child('dogto.jpg','乖狗狗'),
	                        child('rabbit.jpg','兔子')
                        ]
                        },
                        {text: "人物", iconCls: 'tree_people', leaf:false,children:[]},
                        {text: "中国", iconCls: 'tree_wall_brick', leaf:false,children:[]} 
                   ]
                }
            })
        });

        return tree;
    },

    getTextOfWallpaper: function (path) {
        var text = path, slash = path.lastIndexOf('/');
        if (slash >= 0) {
            text = text.substring(slash+1);
        }
        var dot = text.lastIndexOf('.');
        text = Ext.String.capitalize(text.substring(0, dot));
        text = text.replace(/[-]/g, ' ');
        return text;
    },

    onOK: function () {
        var me = this;
        if (me.selected) {
            me.desktop.setWallpaper(me.selected, me.stretch);
            //获取背景图片，放cookie中
            var cookie = new Ext.state.CookieProvider({
            	   expires: new Date(new Date().getTime()+(1000*60*60*24*365))//1 year from now
            	}); 
            //cookie.clear('wallpaper');
           
            cookie.set('wallpaper',this.desktop.getWallpaper()); 
            Ext.state.Manager.setProvider(cookie); 
            //获取背景图片拉伸属性，放cookie中
            var cookieStretch = new Ext.state.CookieProvider({
            	   expires: new Date(new Date().getTime()+(1000*60*60*24*365))//1 year from now
            	}); 
            cookieStretch.set('wallpaperStretch',me.stretch); 
            Ext.state.Manager.setProvider(cookieStretch); 
        }
        me.destroy();
    },

    onSelect: function (tree, record) {
        var me = this;

        if (record.data.img) {
            me.selected = 'wallpapers/' + record.data.img;
        } else {
            me.selected = Ext.BLANK_IMAGE_URL;
        }
       
        me.preview.setWallpaper(me.selected);
    },

    setInitialSelection: function () {
        var s = this.desktop.getWallpaper();
        if (s) {
            var path = 'Wallpaper/' + this.getTextOfWallpaper(s);
            this.tree.selectPath(path, 'text');
        }
    }
});
