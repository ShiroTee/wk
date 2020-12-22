Ext.ux.ThemeChange = Ext.extend(Ext.form.ComboBox, {
	editable : false,
	displayField : 'theme',
	valueField : 'css',
	typeAhead : true,
	mode : 'local',
	triggerAction : 'all',
	selectOnFocus : true,
	initComponent : function() {
		var themes = [
				['默认', '../../js/theme/css/ext-all.css'],
				['黑色', '../../js/theme/css/xtheme-black.css'],
				['淡黄色', '../../js/theme/css/xtheme-calista.css'],
				['深灰色', '../../js/theme/css/xtheme-darkgray.css'],
				['浅灰色', '../../js/theme/css/xtheme-gray.css'],
				['绿色', '../../js/theme/css/xtheme-green.css'],
				['靛蓝色', '../../js/theme/css/xtheme-indigo.css'],
				['漆黑色', '../../js/theme/css/xtheme-midnight.css'],
				['橄榄色', '../../js/theme/css/xtheme-olive.css'],
				['粉色', '../../js/theme/css/xtheme-pink.css'],
				['紫红色', '../../js/theme/css/xtheme-purple.css'],
				['石板蓝色', '../../js/theme/css/xtheme-slate.css'],
				['深夜', '../../js/theme/css/xtheme-slickness.css']
		];
		this.store = new Ext.data.SimpleStore( {
			fields : ['theme', 'css'],
			data : themes
		});
		this.value = '默认';
	},
	initEvents : function() {
		this.on('collapse', function() {
			Ext.util.CSS.swapStyleSheet('theme', 'resource/ext/resource/css/'+ this.getValue());
		});
	}
});
Ext.reg('themeChange', Ext.ux.ThemeChange);