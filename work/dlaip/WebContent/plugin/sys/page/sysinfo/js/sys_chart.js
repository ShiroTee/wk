var data=null;
$(function () 
{
	 setInterval(function(){
		 
	 });
	//获取监控数据
	$
	.ajax(
	{
		url : REQUEST_URL_BASE+'rdp/systemInfoHandler/getSystemInfo?number=' + Math
				.random(),

		type : 'POST',
		dataType : 'json',

		timeout : 30000,

		error : function()
		{
			alert('请求超时');
		},

		success : function(result)
		{
			if(result.success)
			{
				data=result.data
				createRamChart();
				createCpuUsageChart();
				createJVMRamChart();
			}
			else
			{
				alert("服务器异常");
			}
			
		}

	});
})
//创建物理内存监控图表
function createRamChart()
{
	 $('#container').highcharts({
			
		    chart: {
		        type: 'gauge',
		        plotBackgroundColor: null,
		        plotBackgroundImage: null,
		        plotBorderWidth: 0,
		        plotShadow: false
		    },
		    
		    title: {
		        text: '物理内存使用情况'
		    },
		    
		    pane: {
		        startAngle: -150,
		        endAngle: 150,
		        background: [{
		            backgroundColor: {
		                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                stops: [
		                    [0, '#FFF'],
		                    [1, '#333']
		                ]
		            },
		            borderWidth: 0,
		            outerRadius: '109%'
		        }, {
		            backgroundColor: {
		                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                stops: [
		                    [0, '#333'],
		                    [1, '#FFF']
		                ]
		            },
		            borderWidth: 1,
		            outerRadius: '107%'
		        }, {
		            // default background
		        }, {
		            backgroundColor: '#DDD',
		            borderWidth: 0,
		            outerRadius: '105%',
		            innerRadius: '103%'
		        }]
		    },
		       
		    // the value axis
		    yAxis: {
		        min: 0,
		        max:data.totalRam,
		        tickInterval:data.totalRam/10/2,
		        minorTickInterval: 'auto',
		        minorTickWidth: 1,
		        minorTickLength: 10,
		        minorTickPosition: 'inside',
		        minorTickColor: '#666',
		
		        tickPixelInterval:30,
		        tickWidth: 2,
		        tickPosition: 'inside',
		        tickLength: 10,
		        tickColor: '#666',
		        labels: {
		            step:10,
		            rotation: 'auto'
		        },
		        title: {
		            text: '物理内存(M)'
		        },
		        plotBands: [{
		            from: 0,
		            to: data.totalRam*0.5,
		            color: '#55BF3B' // green
		        }, {
		            from: data.totalRam*0.5,
		            to: data.totalRam*0.8,
		            color: '#DDDF0D' // yellow
		        }, {
		            from: data.totalRam*0.8,
		            to: data.totalRam,
		            color: '#DF5353' // red
		        }]        
		    },
		
		    series: [{
		        name: '物理内存已使用',
		        data: [data.useRam],
		        tooltip: {
		            valueSuffix: 'M'
		        }
		    }]
		
		});
}
//创建CPU监控图表
function createCpuUsageChart()
{
	 $('#container1').highcharts({
			
		    chart: {
		        type: 'gauge',
		        plotBackgroundColor: null,
		        plotBackgroundImage: null,
		        plotBorderWidth: 0,
		        plotShadow: false
		    },
		    
		    title: {
		        text: 'CPU使用率'
		    },
		    
		    pane: {
		        startAngle: -150,
		        endAngle: 150,
		        background: [{
		            backgroundColor: {
		                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                stops: [
		                    [0, '#FFF'],
		                    [1, '#333']
		                ]
		            },
		            borderWidth: 0,
		            outerRadius: '109%'
		        }, {
		            backgroundColor: {
		                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                stops: [
		                    [0, '#333'],
		                    [1, '#FFF']
		                ]
		            },
		            borderWidth: 1,
		            outerRadius: '107%'
		        }, {
		            // default background
		        }, {
		            backgroundColor: '#DDD',
		            borderWidth: 0,
		            outerRadius: '105%',
		            innerRadius: '103%'
		        }]
		    },
		       
		    // the value axis
		    yAxis: {
		        min: 0,
		        max:100,
		        tickInterval:10,
		        minorTickInterval: 'auto',
		        minorTickWidth: 1,
		        minorTickLength: 10,
		        minorTickPosition: 'inside',
		        minorTickColor: '#666',
		
		        tickPixelInterval:30,
		        tickWidth: 2,
		        tickPosition: 'inside',
		        tickLength: 10,
		        tickColor: '#666',
		        labels: {
		            step:2,
		            rotation: 'auto'
		        },
		        title: {
		            text: 'CPU使用率(%)'
		        },
		        plotBands: [{
		            from: 0,
		            to: 50,
		            color: '#55BF3B' // green
		        }, {
		            from: 50,
		            to: 80,
		            color: '#DDDF0D' // yellow
		        }, {
		            from: 80,
		            to: 100,
		            color: '#DF5353' // red
		        }]        
		    },
		
		    series: [{
		        name: 'CPU使用率(%)',
		        data: [data.cpuUseage],
		        tooltip: {
		            valueSuffix: '%'
		        }
		    }]
		
		});
}
//创建CPU监控图表
function createJVMRamChart()
{
	 $('#container2').highcharts({
			
		    chart: {
		        type: 'gauge',
		        plotBackgroundColor: null,
		        plotBackgroundImage: null,
		        plotBorderWidth: 0,
		        plotShadow: false
		    },
		    
		    title: {
		        text: 'JVM内存使用情况'
		    },
		    
		    pane: {
		        startAngle: -150,
		        endAngle: 150,
		        background: [{
		            backgroundColor: {
		                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                stops: [
		                    [0, '#FFF'],
		                    [1, '#333']
		                ]
		            },
		            borderWidth: 0,
		            outerRadius: '109%'
		        }, {
		            backgroundColor: {
		                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                stops: [
		                    [0, '#333'],
		                    [1, '#FFF']
		                ]
		            },
		            borderWidth: 1,
		            outerRadius: '107%'
		        }, {
		            // default background
		        }, {
		            backgroundColor: '#DDD',
		            borderWidth: 0,
		            outerRadius: '105%',
		            innerRadius: '103%'
		        }]
		    },
		       
		    // the value axis
		    yAxis: {
		        min: 0,
		        max:data.totalJVMRam,
		        tickInterval:data.totalJVMRam/10/2,
		        minorTickInterval: 'auto',
		        minorTickWidth: 1,
		        minorTickLength: 10,
		        minorTickPosition: 'inside',
		        minorTickColor: '#666',
		
		        tickPixelInterval:30,
		        tickWidth: 2,
		        tickPosition: 'inside',
		        tickLength: 10,
		        tickColor: '#666',
		        labels: {
		            step:10,
		            rotation: 'auto'
		        },
		        title: {
		            text: 'JVM内存已使用(M)'
		        },
		        plotBands: [{
		            from: 0,
		            to:data.totalJVMRam*0.5,
		            color: '#55BF3B' // green
		        }, {
		            from: data.totalJVMRam*0.5,
		            to: data.totalRam*0.8,
		            color: '#DDDF0D' // yellow
		        }, {
		            from: data.totalJVMRam*0.8,
		            to: data.totalRam,
		            color: '#DF5353' // red
		        }]        
		    },
		
		    series: [{
		        name: 'JVM内存使用(M)',
		        data: [data.userJVMRam],
		        tooltip: {
		            valueSuffix: 'M'
		        }
		    }]
		
		});
}