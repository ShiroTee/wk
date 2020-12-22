<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<link rel="stylesheet" href="${ctx }/page/welcome/index/css/index.css"/>
<mdp:mdpHeader />
<div class="head">
    <div class="logo">信息资产管理平台V3.0</div>
    <ul class="head_right">
    	<li>
    		<img src="${ctx }/resources/images/menu_close.png" onclick="closeMenu();">
    	</li>
        <li class="join_us" >
            <a href="javascript:void(0)">加入我们</a>
        </li>
        <li class="login">
            <a href="${ctx }/mdp/login.html" target="_blank">登录</a>
        </li>
    </ul>
    <img class="menu" src="${ctx }/resources/images/menu.png" onclick="showMenu();">
</div>
<nav>
    <ul>
        <li class="cur">
        	<i></i>
        	<a href="javascript:document.body.scrollTop = 0">首页</a>
       		<i></i>
       	</li>        	
        <li>
        	<i></i>
        	<a href="#mulu">政务信息资源目录</a>
        	<ul>
        		<li class="sec">
        			资源申请与可视化
        			<i class="fa fa-angle-double-right" style="position: absolute;right: 0;top: 22px;"></i>
        			<ul>
        				<li><a target="_blank" href="javascript:void(0);">信息资源查询</a></li>
        				<li>        					
        					<a target="_blank" href="${ctx }/mdp/amp/cvpTotalHandler/index">资源目录可视化</a>
       					</li>
        			</ul>
       			</li>
        		<li  class="sec">
        			资源申请成果可视化
        			<i class="fa fa-angle-double-right" style="position: absolute;right: 0;top: 22px;"></i>
        			<ul>
        				<li><a target="_blank" href="javascript:void(0);">全部</a></li>
        				<li><a target="_blank" href="javascript:void(0);">信息化建设现状</a></li>
        				<li><a target="_blank" href="javascript:void(0);">部门信息资源应用情况</a></li>
        				<li><a target="_blank" href="javascript:void(0);">部门信息资源共享供需</a></li>
        				<li><a target="_blank" href="javascript:void(0);">信息资源对外开放情况</a></li>
        				<li><a target="_blank" href="javascript:void(0);">信息资源对外服务情况</a></li>
        			</ul>
       			</li>
        		<li class="sec">资源梳理成果示范</li>
        		<li class="sec">信息资源应用模型库</li>
        	</ul>
        	<i></i>        	
       	</li>
        <li>
        	<i></i>
        	<a href="#information">信息资源实体数据</a>
        	<i></i>
       	</li>
        <li>
        	<i></i>
        	<a href="#api">API数据服务</a>
        	<i></i>
       	</li>
        <li>
        	<i></i>
        	<a href="#information">信息资源数据监控</a>
        	<i></i>
        </li>
    </ul>
</nav>
<section>
	<!-- 第一屏 -->
    <div id="mulu" class="block banner">
        <i class="prev" style="display:none;"></i>
        <i class="next"></i>
        <div class="banner_pagination">
            <ul>
                <li data-item="1" class="cur"></li>
                <li data-item="2"></li>
                <li data-item="3"></li>
                <li data-item="4"></li>
            </ul>
        </div>
        <ul class="banner_main">
            <li data-item="1" class="cur">
            	<section>
                    <div>
                        <div class="float_two">
                            <h2>信息资产可视化</h2>
                            <p>
                           		信息资产是政府应用架构的核心构成和基础，
                           		对信息资产的梳理和编目是政府整个信息化工作的灵魂和基石。
                           		<br><br>
                       		<!-- </p>
                       		<p> -->
                            	信息资产可视化以信息资源目录梳理为基础，
                            	通过可视化的技术手段，展现全域范围内与政务信息资源相关的核心资产，
                            	包括域内总体组织架构、业务、信息系统与信息资源关联情况，
                            	面向服务对象的业务与资源支撑情况，
                            	各职能部门信息资源所属情况以及信息资源共享与供需情况等。
                           	</p>
                            <a class="btn_default" target="_blank" href="${ctx }/mdp/amp/cvpTotalHandler/index">了解更多</a>
                        </div>
                        <div class="float_two">
                            <img src="${ctx }/page/welcome/index/images/banner_1.png">
                        </div>
                    </div>
                </section>
            </li>
            <li data-item="2">
                <section>
                    <div>
                        <div class="float_two">
                            <h2>资源梳理成果<br>可视化</h2>
                            <p>
                           		信息资源梳理是信息资源中心建设的前提。
                           		<br><br>
								通过对全市范围的信息资源梳理，实现对各类信息资产的注册与编目，
								掌握信息资源家底，达到心中有数。
                           	</p>
                            <a class="btn_default" target="_blank" href="javascript:void(0)">了解更多</a>
                        </div>
                        <div class="float_two">
                            <img src="${ctx }/page/welcome/index/images/banner_2.png">
                        </div>
                    </div>
                </section>
            </li>
            <li data-item="3">
            	<section>
                    <div>
                        <div class="float_two">
                            <h2>信息资源应用<br>模型库</h2>
                            <p>
                           		信息资源应用模型库是将信息资源中心建设中，通过互联互通资源共享，
                           		整合、应用信息资源形成信息资源应用样例，以模型库的方式呈现给用户。
                           	</p>
                            <a class="btn_default" target="_blank" href="javascript:void(0)">了解更多</a>
                        </div>
                        <div class="float_two">
                            <img src="${ctx }/page/welcome/index/images/banner_3.png">
                        </div>
                    </div>
                </section>
            </li>
            <li data-item="4">
            	<section>
                    <div>
                        <div class="float_two">
                            <h2>资源梳理成果<br>示范</h2>
                            <p>
                           		信息资源梳理是信息资源中心建设的前提。
                           		<br><br>
                           		通过对全市范围的信息资源梳理，实现对各类信息资产的注册与编目，
                           		掌握信息资源家底，达到心中有数。
                           	</p>
                            <a class="btn_default" target="_blank" href="${ctx }/page/welcome/sample/index.html">了解更多</a>
                        </div>
                        <div class="float_two">
                            <img src="${ctx }/page/welcome/index/images/banner_4.png">
                        </div>
                    </div>
                </section>
            </li>
        </ul>
    </div>
    <!-- 第二屏 -->
    <div id="information" class="block information">
    	<p class="background_text information_resource">信息资源</p>  
    	<p class="background_text data">实体数据</p>  	
    	<div class="content">
	    	<div class="float_two">
	    		<div class="title">应用仓库</div>
	    		<p>
	    			应用仓库经过沉淀多年的信息资源中心建设项目经验，汇集了多个建设项目的成果积累并加以分类挖掘。
	    			以城市特色、人口领域、法人领域、宏观经济领域、征信领域、数据综合等多领域多主题多维度进行可视化展示，
	    			方便用户快速构建部署应用呈现。
	   			</p>
	    		<a class="more" target="_blank" href="javascript:void(0);">了解更多</a>
	    	</div>
	    	<div class="float_two">
	    		<div class="title">应用成果</div>
	    		<p>
	    			应用成果视角以典型的实际案例入手，汇报现阶段信息资源实体数据可视化建设情况，以此为例达到应用示范效果。
	   			</p>
				<a class="more" target="_blank" href="${ctx }/page/welcome/xuzhou_app/index.html">了解更多</a>	    			
	    	</div>
    	</div>    	
    </div>
    <!-- 第三屏 -->
    <div id="management" class="block management">
    	<div class="content">
    		<div class="float_two">
	    		<div class="cover atvImg">
					<div class="atvImg-layer">
						<div class="background_container"></div>
					</div>
					<div class="atvImg-layer">
						<div style="padding: 48px;">
							<div class="title">•	元数据管理</div>
				    		<p>
				    			元数据管理是数据治理的核心内容，通过对元数据关系的管理，实现对底层数据建设情况的统一管理，
				    			并通过可视化手段，分析、展现数据间的关联关系。元数据管理包括元数据管理和元模型管理。
				   			</p>
				    		<div class="more">
								了解更多
								<i></i>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="float_two">
	    		<div class="cover atvImg">
					<div class="atvImg-layer">
						<div class="background_container"></div>
					</div>
					<div class="atvImg-layer">
						<div style="padding: 48px;">
							<div class="title">•	数据监控</div>
				    		<p>
				    			数据监控对信息资源中心建设中，数据交换共享过程、数据比对整合处理过程进行监控，
		    					实现对信息资源中心数据汇聚过程的总体把控。
				   			</p>
				    		<div class="more">
								了解更多
								<i></i>
							</div>
						</div>
					</div>
				</div>
			</div>
    		<!-- <div class="float_two ">
		    		<div class="title">•	元数据管理</div>
		    		<p>
		    			元数据管理是数据治理的核心内容，通过对元数据关系的管理，实现对底层数据建设情况的统一管理，
		    			并通过可视化手段，分析、展现数据间的关联关系。元数据管理包括元数据管理和元模型管理。
		   			</p>
		    		<div class="more">
						了解更多
						<i></i>
					</div>
	    	</div>
	    	<div class="float_two">
		    		<div class="title">•	数据监控</div>
		    		<p>
		    			数据监控对信息资源中心建设中，数据交换共享过程、数据比对整合处理过程进行监控，
		    			实现对信息资源中心数据汇聚过程的总体把控。
		   			</p>
		    		<div class="more">
						了解更多
		    			<i></i>
					</div>
	    	</div> -->
    	</div>
    </div>
    <!-- 第四屏 -->
    <div id="api" class="block api">
    	<div class="content">
	    	<h2>API数据服务</h2>
	    	
    		<p>
    			信息资源中心建设的最终目的是为政务数据能够更好的应用。我们通过API数据服务的方式将资源发布，供外部用户使用。
    		</p>
    		
    		<div>
    			<div class="float_four api01">
    				<div class="title">API 01</div>
		    		<p>
		    			为了确保您在电池更换时能够获得一块正品 Apple 电池，
		    			我们建议您前往一家 Apple Store 商店或 Apple 授权服务提供商。
		    			如果您需要更换一个新的适配器来为您的 
		   			</p>
		    		<a href="javascript:void(0);" >试用</a>
    			</div>
    			<div class="float_four api02">
    				<div class="title">API 02</div>
		    		<p>
		    			为了确保您在电池更换时能够获得一块正品 Apple 电池，
		    			我们建议您前往一家 Apple Store 商店或 Apple 授权服务提供商。
		    			如果您需要更换一个新的适配器来为您的 
		   			</p>
		    		<a href="javascript:void(0);" >试用</a>
    			</div>
    			<div class="float_four api03">
    				<div class="title">API 03</div>
		    		<p>
		    			为了确保您在电池更换时能够获得一块正品 Apple 电池，
		    			我们建议您前往一家 Apple Store 商店或 Apple 授权服务提供商。
		    			如果您需要更换一个新的适配器来为您的 
		   			</p>
		    		<a href="javascript:void(0);" >试用</a>
    			</div>
    			<div class="float_four api04">
    				<div class="title">API 04</div>
		    		<p>
		    			为了确保您在电池更换时能够获得一块正品 Apple 电池，
		    			我们建议您前往一家 Apple Store 商店或 Apple 授权服务提供商。
		    			如果您需要更换一个新的适配器来为您的 
		   			</p>
		    		<a href="javascript:void(0);" >试用</a>
    			</div>
    		</div>
   		</div>
    </div>
</section>
<script src="${ctx }/page/welcome/index/js/index.js"></script>
<mdp:mdpFooter />