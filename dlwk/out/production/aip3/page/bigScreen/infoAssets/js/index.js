var width = 500,
      height = 500,
      start = 0,
      end = 2.25,
      numSpirals = 3
      margin = {top:0,bottom:0,left:0,right:0};

    var theta = function(r) {
      return numSpirals * Math.PI * r;
    };

    // used to assign nodes color by group
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var r = d3.min([width, height]) / 2 - 40;

    var radius = d3.scaleLinear()//进行柱子的宽度
      .domain([start, end])
      .range([40, r]);

    var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.left + margin.right)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var points = d3.range(start, end + 0.001, (end - start) / 1000);

    var spiral = d3.radialLine()
      .curve(d3.curveCardinal)
      .angle(theta)
      .radius(radius);

    var path = svg.append("path")
      .datum(points)
      .attr("id", "spiral")
      .attr("d", spiral)
      .style("fill", "none")
      .style("stroke", "steelblue");

    var spiralLength = path.node().getTotalLength();
       var  N = 400;
     
    var someData = [];
    var childs = [];
    var busis = [];
    var sys = [];
    var assets = [];
    var d = new Date();
    //var address=window.location.href;
  //  thisDLoc   =   document.location;  
    var hostport=document.location.host;
	
	$.ajax({
		
		url :ctx + "/mdp/welcome/infoAssets/infoAssets.json?time=" + d.getTime(),
		//url:hostport+"/mdp/welcome/infoAssets/infoAssets.json" ,
		//url:"http://10.6.10.6:7878/service/getBaseAssets",
		type : "POST",
		dataType:'JSON', //如果需要跨域请求请改为JSONP
		// jsonp:'callback',  
		async : false,// 取消异步请求
		 //contentType : "application/json",
		data : {
			
		},
		success : function(data) {
			var json  = data;
			 var result = json.data;
			if(result){
				N = result.length;
			 var k=N;
			 var q=N*2;
			 var m=N*3;
			
			for(var j = 0; j < N; j++){
				
			      
				childs.push({
			        date: j,
			        value: result[j].org_childs,
					name:"机构",
					partMent:result[j].org_nm,
			        group: 0
			     });
			   k++;
			   busis.push({
			        date: k,
			        value: result[j].org_busis,
					name:"业务",
					partMent:result[j].org_nm,
			        group: 1
			     });
			   q++;
			   sys.push({
			        date: q,
			        value: result[j].org_sys,
					name:"系统",
					partMent:result[j].org_nm,
			        group: 2
			     });
			   m++;
			   assets.push({
			        date: m,
			        value: result[j].org_assets,
					name:"资源",
					partMent:result[j].org_nm,
			        group: 3
			     });
			}
			

			
			someData.push.apply(someData,childs);
			someData.push.apply(someData,busis);
			someData.push.apply(someData,sys);
			someData.push.apply(someData,assets);
		 }
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			
		}
	});

	  var  barWidth = (spiralLength / (N*4)) - 1;
	
	console.log(someData);
    var timeScale = d3.scaleTime()
      .domain(d3.extent(someData, function(d){
        return d.date;
      }))
      .range([0, spiralLength]);
	  
    // yScale for the bar height
    var yScale0 = d3.scaleLinear()
      .domain([0, d3.max(childs, function(d){
        return d.value;
      })])
      .range([0, (r / numSpirals) - 30]);
    
    // yScale for the bar height
    var yScale1 = d3.scaleLinear()
      .domain([0, d3.max(busis, function(d){
        return d.value;
      })])
      .range([0, (r / numSpirals) - 30]);
    
    // yScale for the bar height
    var yScale2 = d3.scaleLinear()
      .domain([0, d3.max(sys, function(d){
        return d.value;
      })])
      .range([0, (r / numSpirals) - 30]);
    
    // yScale for the bar height
    var yScale3 = d3.scaleLinear()
      .domain([0, d3.max(assets, function(d){
        return d.value;
      })])
      .range([0, (r / numSpirals) - 30]);

    svg.selectAll("rect")
      .data(someData)
      .enter()
      .append("rect")
      .attr("x", function(d,i){
       
        var linePer = timeScale(d.date);
			
           var posOnLine = path.node().getPointAtLength(linePer);
           var   angleOnLine = path.node().getPointAtLength(linePer - barWidth);
		
        d.linePer = linePer; // % distance are on the spiral
        d.x = posOnLine.x; // x postion on the spiral
        d.y = posOnLine.y; // y position on the spiral
        
        d.a = (Math.atan2(angleOnLine.y, angleOnLine.x) * 180 / Math.PI) - 90; //angle at the spiral position

        return d.x;
      })
	  

      .attr("y", function(d){
        return d.y;
      })
	  .attr("data-partMent", function(d){
        return d.partMent;
      })
      .attr("width", function(d){
        return barWidth;
      })
      .attr("height", function(d){
    	  if(d.group==0){
    		  return yScale0(d.value);
    	  }
    	  if(d.group==1){
    		  return yScale1(d.value);
    	  }
    	  if(d.group==2){
    		  return yScale2(d.value);
    	  }
    	  if(d.group==3){
    		  return yScale3(d.value);
    	  }
      })
      .style("fill", function(d){return color(d.group);})
      .style("stroke", "none")
      .attr("transform", function(d){
        return "rotate(" + d.a + "," + d.x  + "," + d.y + ")"; // rotate the bar
      });
    
    // add date labels
    var tF = d3.timeFormat("%b %Y"),
        firstInMonth = {};

    svg.selectAll("text")
      .data(someData)
      .enter()
      .append("text")
      .attr("dy", 20)
      .style("text-anchor", "start")
      .style("font", "10px arial")
      .append("textPath")
      // only add for the first of each month
      .filter(function(d){
        var sd = d.name;
        if (!firstInMonth[sd]){
          firstInMonth[sd] = 1;
          return true;
        }
        return false;
      })
      .text(function(d){
        return d.name;
      })
      // place text along spiral
      .attr("xlink:href", "#spiral")
      .style("fill", "grey")
      .attr("startOffset", function(d){
        return ((d.linePer / spiralLength) * 100) + "%";
      })


    var tooltip = d3.select("#chart")
    .append('div')
    .attr('class', 'tooltip');

    tooltip.append('div')
    .attr('class', 'date');
    tooltip.append('div')
    .attr('class', 'value');

    svg.selectAll("rect")
    .on('mouseover', function(d) {
		var partments = new Array();
		var sibling = d3.selectAll("rect").selectAll(function(d1,i) {
			if(d1.partMent==d.partMent){				
				partments[partments.length]=d1;
				 d3.select(this)
                .style("fill","#FFFFFF")
				.style("stroke","#000000")
				.style("stroke-width","2px");
			}

		});
		var values = function fs(){
			var html = '';
			for(var i=0;i<partments.length;i++){
				html +=partments[i].name+":<b>" +partments[i].value  + "</b><br>";
			}
			return html;
		}

        tooltip.select('.date').html("部门名称: <b>" + d.partMent + "</b>");
        tooltip.select('.value').html(values);
		
		


       

        tooltip.style('display', 'block');
        tooltip.style('opacity',2);

    })
    
    .on('mouseout', function(d) {
        d3.selectAll("rect")
        .style("fill", function(d){return color(d.group);})
        .style("stroke", "none")

        tooltip.style('display', 'none');
        tooltip.style('opacity',0);
    });