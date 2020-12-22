
/**
 * ----------------------
 * Demo ComboBoxTree
 * ----------------------
 */
 /*-------------------------------------------------*
 treecombo = {
            xtype:'combotree',
            fieldLabel:'部门',
            name:'department_id',
            allowUnLeafClick:false,
            treeHeight:200,
            ,
            onSelect:function(id){
            }
 }
*-----------------------------------------------------*/
var root = new Ext.tree.AsyncTreeNode(
			{
				text : '目录树',
				draggable : false,
				id : '-1',
				expanded : true,
				url : '#',
				loader : new Ext.tree.TreeLoader(
						{
							dataUrl : REQUEST_URL_BASE
									+ "handler=serviceCatalogueHandler&method=getCatalogueTreeByPid"
						})
			});
ComboBoxTree = Ext.extend(Ext.form.ComboBox, {
    treeHeight : 180,
    allowUnLeafClick:false,
    setFieldValue:function(id,text){
        this.setValue(text);
        this.hiddenField.value = id;
    },
    onSelect:function(id){
    },
    store : new Ext.data.SimpleStore({
            fields : [],
            data : [[]]
    }),
    //Default
    editable : false, // 禁止手写及联想功能
    mode : 'local',
    triggerAction : 'all',
    maxHeight : 500,
    selectedClass : '',
    onSelect : Ext.emptyFn,
    emptyText : '请选择...',
    /**
     * 初始化
     * Init
     */
    initComponent : function() {
        ComboBoxTree.superclass.initComponent.call(this);
        this.tplId = Ext.id();
        this.tpl = '<div id="' + this.tplId + '" style="height:' + this.treeHeight + 'px;overflow:hidden;"></div>';
        var tree = new Ext.tree.TreePanel({
            root:root,
            autoScroll:true,
            height:this.treeHeight,
            rootVisible:false,
            border:false
        });
        var combo = this;
        tree.on('click',function(node){
            if (combo.allowUnLeafClick == true)
            {
            	return;
                combo.setValue(node.text);
                combo.hiddenField.value = node.id;
                combo.collapse();
                combo.onSelect(node.id);
            }
            else if (node.leaf == true){
                combo.setValue(node.text);
                combo.hiddenField.value = node.id;
                combo.collapse();
                combo.onSelect(node.id);
            }
        });
        this.tree = tree;
    },
    /**
     * ------------------
     * 事件监听器 
     * Listener
     * ------------------
     */
    listeners : {
        'expand' : {
            fn: function() {
                if (!this.tree.rendered && this.tplId) {
                    this.tree.render(this.tplId);
                    this.tree.root.expand();
                    this.tree.root.select();
                }
                this.tree.show();
            }
        },
        'render':{
            fn:function(){
                this.hiddenField = this.el.insertSibling({
                    tag:'input',
                    type:'hidden',
                    name:this.getName()
                },'before',true);
                this.el.dom.removeAttribute('name');
            }
        }
    }
});
/**
 * --------------------------------- 
 * 将ComboBoxTree注册为Ext的组件,以便使用
 * Ext的延迟渲染机制，xtype:'combotree' 
 * ---------------------------------
 */
Ext.reg('combotree', ComboBoxTree);
