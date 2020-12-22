<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<link rel="stylesheet" href="${ctx }/page/welcome/index/css/index.css"/>
<mdp:mdpHeader title="信息资产管理平台V3.0" curItem="home"/>
<style>
	html{	
    	background:url(${ctx }/page/welcome/index/images/p2_background@2x.png);
    	background-size: 100%;
    	background-repeat: no-repeat;
    	background-attachment: fixed;
    	background-position: top 60px left;
	}
	body{
		background:rgba(255,255,255,0) !important;
	}
</style>
<section>
	<div class="right_nav">
		<ul>
			<li>
				<a href="javascript:void(0);" data-target="head"><i></i></a>
				<span>信息资源目录</span>				
			</li>
			<li>
				<a href="javascript:void(0);" data-target="information"><i></i></a>
				<span>信息资源实体数据</span>				
			</li>
			<li>
				<a href="javascript:void(0);" data-target="management"><i></i></a>
				<span>信息资源数据监控</span>				
			</li>
			<li>				
				<a href="javascript:void(0);" data-target="api"><i></i></a>
				<span>API数据服务</span>				
			</li>
		</ul>
	</div>
	<!-- 第一屏 -->
    <div id="mulu" class="block banner">
        <i class="prev"></i>
        <i class="next"></i>
        <div class="banner_pagination">
            <ul>
                <li data-item="1" class="cur">
                	<div id="banner_pagination_process"></div>
                </li>
                <li data-item="2"></li>
                <li data-item="3"></li>
                <li data-item="4"></li>
            </ul>
        </div>
        <ul class="banner_main">
            <li data-item="1" class="banner_1 cur">
            	<section>
                    <div>
                        <div class="float_two">
                        	<div>
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
                            <a class="btn_default" target="_blank" href="${ctx }/mdp/amp/cvpTotalHandler/index"><span>了解更多</span></a>
                            </div>
                        </div>
                        <div class="float_two">
                        	<div>
                            <img src="${ctx }/page/welcome/index/images/banner_1.png" style="margin-right:-40px;min-height:398px;">
                            </div>
                        </div>
                    </div>
                </section>
            </li>
            <li data-item="2" class="banner_2">
                <section>
                    <div>
                        <div class="float_two">
                        <div>
                            <h2>资源梳理成果<br>可视化</h2>
                            <p>
                           		信息资源梳理是信息资源中心建设的前提。
                           		<br><br>
								通过对全市范围的信息资源梳理，实现对各类信息资产的注册与编目，
								掌握信息资源家底，达到心中有数。
                           	</p>
                            <a class="btn_default" href="${ctx }/mdp/welcome/achievements_view/index.html"><span>了解更多</span></a>
                        </div>
                        </div>
                        <div class="float_two">
                        <div>
                            <img src="${ctx }/page/welcome/index/images/banner_2.png">
                        </div>
                        </div>
                    </div>
                </section>
            </li>
            <li data-item="3" class="banner_3">
            	<section>
                    <div>
                        <div class="float_two">
                        <div>
                            <h2>信息资源应用<br>模型库</h2>
                            <p>
                           		信息资源应用模型库是将信息资源中心建设中，通过互联互通资源共享，
                           		整合、应用信息资源形成信息资源应用样例，以模型库的方式呈现给用户。
                           	</p>
                            <a class="btn_default" href="${ctx }/mdp/welcome/model/index.html"><span>了解更多</span></a>
                        </div>
                        </div>
                        <div class="float_two">
                        <div>
                            <img src="${ctx }/page/welcome/index/images/banner_3.png">
                        </div>
                        </div>
                    </div>
                </section>
            </li>
            <li data-item="4" class="banner_4">
            	<section>
                    <div>
                        <div class="float_two">
                        <div>
                            <h2>资源梳理成果<br>示范</h2>
                            <p>
                           		信息资源梳理是信息资源中心建设的前提。
                           		<br><br>
                           		通过对全市范围的信息资源梳理，实现对各类信息资产的注册与编目，
                           		掌握信息资源家底，达到心中有数。
                           	</p>
                            <a class="btn_default" href="${ctx }/mdp/welcome/achievements_view/list.html">
                            	<span>了解更多</span>
                            </a>
                        </div>
                        </div>
                        <div class="float_two">
                        <div>
                            <img src="${ctx }/page/welcome/index/images/banner_4.png">
                        </div>
                        </div>
                    </div>
                </section>
            </li>
        </ul>
    </div>
    <!-- 第二屏 -->
    <div id="information"  class="page2">
    	<div class="content" >
    		<h2>信息资源实体数据</h2>
    		<div class="content_line">
    			<div class="img_box l">
    				<img src="${ctx }/page/welcome/index/images/entity_store.png">
    			</div>
    			<div class="description_box r">
    				<div class="entity_store title">应用仓库</div>
    				<p>
    					汇集了多个建设项目的成果积累并加以分类挖掘。
    					以城市特色、人口领域、法人领域、宏观经济领域、征信领域、
    					数据综合等多领域多主题多维度进行可视化展示，方便用户快速构建部署应用呈现。
    				</p>
    				<a class="about" href="${ctx }/mdp/welcome/entity_store/index.html">
    					<span>了解更多</span>
    				</a>
    			</div>
    		</div>
    		<div class="content_line">    		
    			<div class="description_box l">
    				<h1 class="achievements title">成果示范</h1>
    				<p>
    					应用成果视角以典型的实际案例入手，汇报现阶段信息资源实体数据可视化建设情况，
    					以此为例达到应用示范效果。
    				</p>
    				<a class="about"  href="${ctx }/mdp/welcome/entity_store/list.html">
    					<span>了解更多</span>
    				</a>
    			</div>
    			<div class="r">
    				<img src="${ctx }/page/welcome/index/images/achievements.png">
    			</div>
    		</div>
    	</div>
    </div>   
    
    <!-- 第三屏 -->
    <div id="management" class="block management">    	
    	<div id="data_management" class="content">
    		<h2>数据治理</h2>
    		<div>		
    		<div class="float_two">
	    		<a id="meta_data" href="${ctx }/mdp/welcome/erRelation/erRelation.html" class="cover atvImg">
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
				</a>
			</div>
			<div class="float_two">
	    		<a href="${ctx }/mdp/welcome/dataManagementAndMonitor/dataExchangeOverall.html" class="cover atvImg">
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
				</a>
			</div>
			</div>
    	</div>
    	<div id="api" class="api">
    		<canvas id="apibg"></canvas>
	    	<div class="content">
		    	<h2>API数据服务</h2>		    	
	    		<p>
	    			信息资源中心建设的最终目的是为政务数据能够更好的应用。
	    			我们通过API数据服务的方式将资源发布，供外部用户使用。
	    			<a style="color: #2096F3;opacity: .8;" href="${ctx }/mdp/welcome/api/index.html" >查看更多<i class="fa fa-angle-right icon-angle-right"></i></a>
	    		</p>
	    		
	    		<div>
	    			<div class="float_four api01">
	    				<div class="title">API 01</div>
			    		<p>
			    			为了确保您在电池更换时能够获得一块正品 Apple 电池，
			    			我们建议您前往一家 Apple Store 商店或 Apple 授权服务提供商。
			    			如果您需要更换一个新的适配器来为您的 
			   			</p>
			    		<a href="${ctx }/mdp/welcome/api/details.html" >试用</a>
	    			</div>
	    			<div class="float_four api02">
	    				<div class="title">API 02</div>
			    		<p>
			    			为了确保您在电池更换时能够获得一块正品 Apple 电池，
			    			我们建议您前往一家 Apple Store 商店或 Apple 授权服务提供商。
			    			如果您需要更换一个新的适配器来为您的 
			   			</p>
			    		<a href="${ctx }/mdp/welcome/api/details.html" >试用</a>
	    			</div>
	    			<div class="float_four api03">
	    				<div class="title">API 03</div>
			    		<p>
			    			为了确保您在电池更换时能够获得一块正品 Apple 电池，
			    			我们建议您前往一家 Apple Store 商店或 Apple 授权服务提供商。
			    			如果您需要更换一个新的适配器来为您的 
			   			</p>
			    		<a href="${ctx }/mdp/welcome/api/details.html" >试用</a>
	    			</div>
	    			<div class="float_four api04">
	    				<div class="title">API 04</div>
			    		<p>
			    			为了确保您在电池更换时能够获得一块正品 Apple 电池，
			    			我们建议您前往一家 Apple Store 商店或 Apple 授权服务提供商。
			    			如果您需要更换一个新的适配器来为您的 
			   			</p>
			    		<a href="${ctx }/mdp/welcome/api/details.html" >试用</a>
	    			</div>
	    		</div>
	   		</div>
	    </div>
    </div>
    <!-- 第四屏 -->
    
</section>
<script src="${ctx }/page/welcome/index/js/index.js"></script>
<script src="${ctx }/resources/radialIndicator/js/radialIndicator.js"></script>

<mdp:mdpFooter />
<script type="text/javascript">
<!--

//-->
   var validateLicense = '${validateLicense}';
   var  endDate = '${endDate}';
   if(validateLicense&&parseInt(validateLicense)==1 ){
	   var msg ="产品将于"+endDate+"到期，请尽快联系售后获取授权文件。";
	   $.confirm(msg, function(e) {
		   var url = ctx+'/mdp/welcome/license.html';	
			 top.location.href = url;//在最顶层页面跳转
		});
   }
</script>