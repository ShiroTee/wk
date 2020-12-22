/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
  
 * http://www.sencha.com/licensef
 */

/**
 * @class Ext.ux.desktop.Desktop
 * @extends Ext.panel.Panel
 * <p>This class manages the wallpaper, shortcuts and taskbar.</p>
 */
var selectedId="";
var app_=null;
var store_=null;
Ext.define('Ext.ux.desktop.Desktop', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.desktop',

    uses: [
        'Ext.util.MixedCollection',
        'Ext.menu.Menu',
        'Ext.view.View', // dataview
        'Ext.window.Window',

        'Ext.ux.desktop.TaskBar',
        'Ext.ux.desktop.Wallpaper'
    ],

    activeWindowCls: 'ux-desktop-active-win',
    inactiveWindowCls: 'ux-desktop-inactive-win',
    lastActiveWindow: null,

    border: false,
    html: '&#160;',
    layout: 'fit',

    xTickSize: 1,
    yTickSize: 1,

    app: null,

    /**
     * @cfg {Array|Store} shortcuts
     * The items to add to the DataView. This can be a {@link Ext.data.Store Store} or a
     * simple array. Items should minimally provide the fields in the
     * {@link Ext.ux.desktop.ShorcutModel ShortcutModel}.
     */
    shortcuts: null,

    /**
     * @cfg {String} shortcutItemSelector
     * This property is passed to the DataView for the desktop to select shortcut items.
     * If the {@link #shortcutTpl} is modified, this will probably need to be modified as
     * well.
     */
    shortcutItemSelector: 'div.ux-desktop-shortcut',

    /**
     * @cfg {String} shortcutTpl
     * This XTemplate is used to render items in the DataView. If this is changed, the
     * {@link shortcutItemSelect} will probably also need to changed.
     */
    shortcutTpl: [
        '<tpl for=".">',
            '<div class="ux-desktop-shortcut" id="{id}-shortcut" <tpl if="this.isLength(folderName)">data-qtip="{folderName}" data-qwidth="100" data-qalign="tl-br"</tpl>>',
                '<div class="ux-desktop-shortcut-icon {iconCls}">',
                    '<img src="',Ext.BLANK_IMAGE_URL,'" title="{folderName}">',
                '</div>',
                '<span class="ux-desktop-shortcut-text" id="{id}-span-text">{[values.folderName.length>4?values.folderName.substring(0,4):values.folderName]}</span>',
            '</div>',
        '</tpl>',
        '<div class="x-clear"></div>'
   ,{
        	isLength:function(resourceName)
        	{
        		if(resourceName.length>4)
        		{
        			return true;
        		}
        		return false;
        	},
        	getResourceName:function(resourceName)
        	{
        		return resourceName.substring(0,2)+".";
        	}
        }],

    /**
     * @cfg {Object} taskbarConfig
     * The config object for the TaskBar.
     */
    taskbarConfig: null,

    windowMenu: null,

    initComponent: function () {
        var me = this;

        me.windowMenu = new Ext.menu.Menu(me.createWindowMenu());

        me.bbar = me.taskbar = new Ext.ux.desktop.TaskBar(me.taskbarConfig);
        me.taskbar.windowMenu = me.windowMenu;

        me.windows = new Ext.util.MixedCollection();

        me.contextMenu = new Ext.menu.Menu(me.createDesktopMenu());

        me.items = [
            { xtype: 'wallpaper', id: me.id+'_wallpaper' },
            me.createDataView()
        ];

        me.callParent();

        me.shortcutsView = me.items.getAt(1);
       // me.shortcutsView.on('itemmouseenter', me.onMouseOver, me);
       // me.shortcutsView.on('itemclick', me.test_, me);
        me.shortcutsView.on('itemdblclick', me.onShortcutItemClick, me);
        me.shortcutsView.on('itemclick', me.onChangeBackColor)
        me.shortcutsView.on('itemcontextmenu', me.onDisplayDesktopIconClick, me);
		me.shortcutsView.on('render', me.onRenderShortcut, me);
		   me.wallpaper = me.items.getAt(0);
	        if (wallpaper) {
	            me.setWallpaper(wallpaper, me.wallpaperStretch);
	        }
        
		
    },

    afterRender: function () {
        var me = this;
        me.callParent();
        me.el.on('contextmenu', me.onDesktopMenu, me);
        Ext.Function.defer(me.initShortcut,1);
    },

    //------------------------------------------------------
    // Overrideable configuration creation methods

    createDataView: function () {
        var me = this;
        return {
            xtype: 'dataview',
            overItemCls: 'x-view-over',
            trackOver: true,
            id:'desktopMainPannelDiv',
            itemSelector: me.shortcutItemSelector,
            store: me.shortcuts,
            style: {
                position: 'absolute'
            },
            x: 0, y: 0,
            tpl: new Ext.XTemplate(me.shortcutTpl),
            listeners:{

                resize:me.initShortcut

             }
        };
    },

    createDesktopMenu: function () {
        var me = this, ret = {
            items: me.contextMenuItems || []
        };

        if (ret.items.length) {
            ret.items.push('-');
        }

        ret.items.push(
               // { text: '标题', handler: me.tileWindows, scope: me, minWindows: 1 },
                { text: '层叠窗口', handler: me.cascadeWindows, scope: me, minWindows: 1 })

        return ret;
    },
    addShortcut:function(record)
    {
    	Ext.getCmp("desktopMainPannelDiv").getStore().insert(0,record);
    	//initShortcut();
    },
    createWindowMenu: function () {
        var me = this;
        return {
            defaultAlign: 'br-tr',
            items: [
                { text: '还原', handler: me.onWindowMenuRestore, scope: me },
                { text: '最小化', handler: me.onWindowMenuMinimize, scope: me },
                { text: '最大化', handler: me.onWindowMenuMaximize, scope: me },
                '-',
                { text: '关闭', handler: me.onWindowMenuClose, scope: me }
            ],
            listeners: {
                beforeshow: me.onWindowMenuBeforeShow,
                hide: me.onWindowMenuHide,
                scope: me
            }
        };
    },

    //------------------------------------------------------
    // Event handler methods

    onDesktopMenu: function (e) {
        var me = this, menu = me.contextMenu;
        e.stopEvent();
        if (!menu.rendered) {
            menu.on('beforeshow', me.onDesktopMenuBeforeShow, me);
        }
        menu.showAt(e.getXY());
        menu.doConstrain();
    },

    onDesktopMenuBeforeShow: function (menu) {
        var me = this, count = me.windows.getCount();

        menu.items.each(function (item) {
            var min = item.minWindows || 0;
            item.setDisabled(count < min);
        });
    },
	onRenderShortcut : function(v) { 
		var me = this; 
		me.shortcutsView.dragZone = new Ext.dd.DragZone(v.getEl(), { 
		getDragData: function(e) { 
			var sourceEl = e.getTarget(v.itemSelector,10); 
			if (sourceEl) { 
                d = sourceEl.cloneNode(true); 
                d.id = Ext.id(); 
                return { 
                    ddel: d, 
                    sourceEl: sourceEl, 
                    sourceStore: v.store, 
                    draggedRecord: v.getRecord(sourceEl) 
                } 
            } 
		}, 
        getRepairXY: function() { 
			
            return this.dragData.repairXY; 
        }, 
        onMouseUp : function(e){ 
        	
			var currDom = Ext.fly(this.dragData.sourceEl); 
			var oldXY = currDom.getXY(); 
			var newXY = e.getXY(); 
			var width = currDom.getWidth(); 
			var height = currDom.getHeight(); 
			if(Math.abs(oldXY[0]-newXY[0]) > width || Math.abs(oldXY[1]-newXY[1]) > height){ 
			currDom.setXY(newXY); 
			Ext.get(this.dragData.sourceEl).frame('#8db2e3', 1); 
        } 

	} 
	}); 
	}, 
	
	onDisplayDesktopIconClick : function(view,record, item, index, e, eOpts){
		//禁用浏览器其他的的右键事件 
        e.stopEvent();
        var me = this, win;
        if(Ext.getCmp("rightMenuRemove_"+ record.data.id) != undefined){
	        Ext.getCmp("rightMenuRemove_"+ record.data.id).destroy();
        }
        var menu = new Ext.menu.Menu({   
            //控制右键菜单位置   
            float:true,   
             items:[{   
                    text:"打开",   
                    iconCls:'leaf',   
                    handler:function(){   
                        //点击右键打开桌面菜单
		            	me.onShortcutItemClick(view,record);
                    } 
             },{   
	                 text:"移除",   
	                 iconCls:'leaf', 
	                 id:'rightMenuRemove_'+record.data.id,
	                 handler:function(){   
	            	 	me.removeDestopAppLink(view,record);
	                 } 
          }]
        }).showAt(e.getXY());//让右键菜单跟随鼠标位置
        if(record.data.isOnDesktop=='1'){
			Ext.getCmp("rightMenuRemove_"+ record.data.id).disable();
		}
	},

	removeDestopAppLink: function (dateView, record){
		var jsonData = record.data.id;
		if (jsonData.length != 0)
		{
			Ext.Msg.confirm("提示", "确定要移除吗？", function(btn, text)
			{
				if (btn == "yes")
				{
					var url=getContextPath()+"app/http/ums/userFolderHandler/deleteUserFolder?folderId="+jsonData;
					
					search4_(url,"删除桌面快捷方式异常",function(){
						Ext.getCmp("desktopMainPannelDiv").getStore().remove(record);
					});
				}
			});
		} 
	},
	
    onShortcutItemClick: function (dataView, record) {
    	if (record.data.module == '') {
            var me = this, win;
                  
            win = me.createMyWindow(record.data); 

            if (win) {

                me.restoreWindow(win);

            }

        } else {

              //原始事件

            var me = this, module = me.app.getModule(record.data.module),

            win = module && module.createWindow();

 

            if (win) {

                me.restoreWindow(win);

            }

        }
    },
    onChangeBackColor:function(dataView, record)
    {
    	var divId=record.data.id+"-shortcut";
    	if(selectedId!="")
    	{
    		document.getElementById(selectedId).style.background="";
    	}
    	
    	document.getElementById(divId).style.background="#BDBDBD";
    	//{id}-span-text
    	//document.getElementById(record.get("id")+"-span-text").innerHTML=record.get("folderName");
    	selectedId=divId;
    	
    	
    },
   
    
    createMyWindow: function (win_data) {
    	
        var desktop = this.app.getDesktop();
		app_=this;
        var win = desktop.getWindow('bogus'+win_data.id);
		
        if (!win) {
			var url=win_data.url;
			var title=win_data.folderName;
			
			if(win_data.type==0)
			{
				//var X = $('#').offset().top;
				//var Y = $('#img1').offset().left;
				var Y=jQuery("#"+win_data.id+"-shortcut").offset().left;
				var X=jQuery("#"+win_data.id+"-shortcut").offset().top;
				url=contextPath+"/plugin/ums/page/resource_info/icon_list.jsp?appId="+win_data.appId+"&pid="+win_data.id;
				
				var html = "<iframe id='"
					+ win_data.id
					+ "' name='"
					+ win_data.id
					+ "' src='";
			html = html
					+ url
					+ "' frameborder='0' height='100%' width='100%' style='overflow:hidden;' onload='skipToLogin(\""+url+"\",\""+win_data.id+"\");'>iframe>";
				
				win = desktop.createWindow({
					id:"bogus"+win_data.id,
					title: title,
					html:html,
					iconCls: 'bogus',
					animCollapse: false,
					constrainHeader: true,
					shim:true,
					constrainHeader : true,
					height:475,
					width:760,
					x:X,
					y:Y,
					
					animateTarget :document.getElementById(win_data.resourceId+"-shortcut"),
					maximizable:false
				});
			}
			else
			{
				var html = "<iframe id='"
					+ win_data.id
					+ "' name='"
					+ win_data.id
					+ "' src='";
			html = html
					+ url
					+ "' frameborder='0' height='100%' width='100%' style='overflow:hidden;' onload='skipToLogin(\""+url+"\",\""+win_data.id+"\");'>iframe>";
				win = desktop.createWindow({
					id:"bogus"+win_data.id,
					title: title,
					html:html,
					iconCls: 'bogus',
					animCollapse: false,
					constrainHeader: true,
					shim:true,
					animCollapse :false,
					constrainHeader : true,
					maximized:true,
					maximizable:false
				});
			}
        	
		
				
        }

        win.show();

        //return win;

    },
    onWindowClose: function(win) {
    	
        var me = this;
        me.windows.remove(win);
        me.taskbar.removeTaskButton(win.taskButton);
        me.updateActiveWindow();
    },

    onWindowMenuBeforeShow: function (menu) {
        var items = menu.items.items, win = menu.theWin;
        items[0].setDisabled(win.maximized !== true && win.hidden !== true); // Restore
        items[1].setDisabled(win.minimized === true); // Minimize
        items[2].setDisabled(win.maximized === true || win.hidden === true); // Maximize
    },

    onWindowMenuClose: function () {
        var me = this, win = me.windowMenu.theWin;

        win.close();
    },

    onWindowMenuHide: function (menu) {
        menu.theWin = null;
    },

    onWindowMenuMaximize: function () {
        var me = this, win = me.windowMenu.theWin;

        win.maximize();
        win.toFront();
    },

    onWindowMenuMinimize: function () {
    
        var me = this, win = me.windowMenu.theWin;

        win.minimize();
    },

    onWindowMenuRestore: function () {
        var me = this, win = me.windowMenu.theWin;

        me.restoreWindow(win);
    },

    //------------------------------------------------------
    // Dynamic (re)configuration methods

    getWallpaper: function () {
        return this.wallpaper.wallpaper;
    },

    setTickSize: function(xTickSize, yTickSize) {
        var me = this,
            xt = me.xTickSize = xTickSize,
            yt = me.yTickSize = (arguments.length > 1) ? yTickSize : xt;

        me.windows.each(function(win) {
            var dd = win.dd, resizer = win.resizer;
            dd.xTickSize = xt;
            dd.yTickSize = yt;
            resizer.widthIncrement = xt;
            resizer.heightIncrement = yt;
        });
    },

    setWallpaper: function (wallpaper_, stretch) {
        this.wallpaper.setWallpaper(wallpaper_, stretch);
        return this;
    },

    cascadeWindows: function() {
        var x = 0, y = 0,
            zmgr = this.getDesktopZIndexManager();

        zmgr.eachBottomUp(function(win) {
            if (win.isWindow && win.isVisible() && !win.maximized) {
                win.setPosition(x, y);
                x += 20;
                y += 20;
            }
        });
    },

    createWindow: function(config, cls) {
        var me = this, win, cfg = Ext.applyIf(config || {}, {
                stateful: false,
                isWindow: true,
                constrainHeader: true,
                minimizable: true,
                maximizable: true
            });

        cls = cls || Ext.window.Window;
        win = me.add(new cls(cfg));

        me.windows.add(win);

        win.taskButton = me.taskbar.addTaskButton(win);
        win.animateTarget = win.taskButton.el;

        win.on({
            activate: me.updateActiveWindow,
            beforeshow: me.updateActiveWindow,
            deactivate: me.updateActiveWindow,
            minimize: me.minimizeWindow,
            destroy: me.onWindowClose,
            scope: me
        });

        win.on({
            boxready: function () {
                win.dd.xTickSize = me.xTickSize;
                win.dd.yTickSize = me.yTickSize;

                if (win.resizer) {
                    win.resizer.widthIncrement = me.xTickSize;
                    win.resizer.heightIncrement = me.yTickSize;
                }
            },
            single: true
        });

        // replace normal window close w/fadeOut animation:
        win.doClose = function ()  {
            win.doClose = Ext.emptyFn; // dblclick can call again...
            win.el.disableShadow();
            win.el.fadeOut({
                listeners: {
                    afteranimate: function () {
                        win.destroy();
                    }
                }
            });
        };
       
        return win;
    },

    getActiveWindow: function () {
        var win = null,
            zmgr = this.getDesktopZIndexManager();

        if (zmgr) {
            // We cannot rely on activate/deactive because that fires against non-Window
            // components in the stack.

            zmgr.eachTopDown(function (comp) {
                if (comp.isWindow && !comp.hidden) {
                    win = comp;
                    return false;
                }
                return true;
            });
        }

        return win;
    },

    getDesktopZIndexManager: function () {
        var windows = this.windows;
        // TODO - there has to be a better way to get this...
        return (windows.getCount() && windows.getAt(0).zIndexManager) || null;
    },

    getWindow: function(id) {
        return this.windows.get(id);
    },

    minimizeWindow: function(win) {
    	
        win.minimized = true;
        win.hide();
    },

    restoreWindow: function (win) {
        if (win.isVisible()) {
            win.restore();
            win.toFront();
        } else {
            win.show();
        }
        return win;
    },

    tileWindows: function() {
        var me = this, availWidth = me.body.getWidth(true);
        var x = me.xTickSize, y = me.yTickSize, nextY = y;

        me.windows.each(function(win) {
            if (win.isVisible() && !win.maximized) {
                var w = win.el.getWidth();

                // Wrap to next row if we are not at the line start and this Window will
                // go off the end
                if (x > me.xTickSize && x + w > availWidth) {
                    x = me.xTickSize;
                    y = nextY;
                }

                win.setPosition(x, y);
                x += w + me.xTickSize;
                nextY = Math.max(nextY, y + win.el.getHeight() + me.yTickSize);
            }
        });
    },

    updateActiveWindow: function () {
        var me = this, activeWindow = me.getActiveWindow(), last = me.lastActiveWindow;
        if (activeWindow === last) {
            return;
        }

        if (last) {
            if (last.el.dom) {
                last.addCls(me.inactiveWindowCls);
                last.removeCls(me.activeWindowCls);
            }
            last.active = false;
        }

        me.lastActiveWindow = activeWindow;

        if (activeWindow) {
            activeWindow.addCls(me.activeWindowCls);
            activeWindow.removeCls(me.inactiveWindowCls);
            activeWindow.minimized = false;
            activeWindow.active = true;
        }

        me.taskbar.setActiveButton(activeWindow && activeWindow.taskButton);
    },
   initShortcut :function(){

         var btnHeight =64;

         var btnWidth =64;

         var btnPadding =30;

         var col ={index :1,x : btnPadding};

         var row ={index :1,y : btnPadding};

         var bottom;

         var numberOfItems =0;

         var taskBarHeight = Ext.query(".ux-taskbar")[0].clientHeight +40;

         var bodyHeight = Ext.getBody().getHeight()- taskBarHeight;

         var items = Ext.query(".ux-desktop-shortcut");

 

        for(var i =0, len = items.length; i < len; i++){
             numberOfItems +=1;

             bottom = row.y + btnHeight;

             if(((bodyHeight < bottom)?true:false)&& bottom >(btnHeight + btnPadding)){

                 numberOfItems =0;

                 col ={index : col.index++,x : col.x + btnWidth + btnPadding};

                 row ={index :1,y : btnPadding};

             }

             Ext.fly(items[i]).setXY([col.x, row.y]);

             row.index++;

             row.y = row.y + btnHeight + btnPadding;

         }

     }
});