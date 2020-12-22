<%@ page language="java" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>    
<style>

circle {
  fill: #999;
}

text {
  font: 10px sans-serif;
}

.node--internal circle {
  fill: #555;
}

.node--internal text {
  text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;
}

.link {
  fill: none;
  stroke: #555;
  stroke-opacity: 0.4;
  stroke-width: 1.5px;
}
.link2{
   display: none;
}

</style>
<script type="text/javascript">
var ctx = '<%=request.getContextPath()%>';
</script>
 
<svg width="960" height="900"  style="border:solid 1px yellow;">

</svg>

<script  src="${ctx }/resources/jquery/jquery-1.11.2.min.js" ></script>
<script  src="${ctx }/page/admin/datamodel/jsrender.min.js" ></script>
<script  src="${ctx }/page/admin/datamodel/d3.min.js" ></script>
<script  src="${ctx }/page/admin/datamodel/businessPortrait2.js" ></script>
 

 