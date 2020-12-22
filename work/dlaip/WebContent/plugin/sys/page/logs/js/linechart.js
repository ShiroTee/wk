Ext.chart.Chart.CHART_URL = getContextPath()
		+ 'resource/ext/resources/charts.swf';
Ext.onReady(function()
{
	var zxstore = new Ext.data.JsonStore({
        fields:['name', 'visits', 'views'],
        data: [
            {name:'00:00:00', visits: 245000, views: 300000},
            {name:'00:01:00', visits: 240000, views: 350000},
            {name:'00:01:10', visits: 355000, views: 400000},
            {name:'00:01:20', visits: 375000, views: 420000},
            {name:'Nov 07', visits: 490000, views: 450000},
            {name:'Dec 07', visits: 495000, views: 580000},
            {name:'Jan 08', visits: 520000, views: 600000},
            {name:'Feb 08', visits: 620000, views: 750000}
        ]
    });

    // extra extra simple
    var ndtjPanel =  new Ext.Panel({
        title: '2014-08-09 HTTP请求响应时间',
        renderTo:document.body,
        width:500,
        height:300,
        layout:'fit',

        items: {
            xtype: 'linechart',
            store: zxstore,
            xField: 'name',            
            series:[  
		                {type:'line',displayName:'平均响应时间',yField:'visits',style:{color:0x0033FF}},  
		                {type:'line',displayName:'最大响应时间',yField:'views',style:{color:0x66CC00}}  
		            ],  
		            
		     extraStyle:  
		            {  
		                legend:  
		                {  
		                    display: 'bottom',  
		                    padding: 5,  
		                    font:  
		                    {  
		                        family: 'Tahoma',  
		                        size: 13  
		                    }  
		                }  
		            },         
            
			listeners: {
				itemclick: function(o){
					var rec = store.getAt(o.index);
					Ext.example.msg('Item Selected', 'You chose {0}.', rec.get('name'));
				}
			}
        }
    });


});