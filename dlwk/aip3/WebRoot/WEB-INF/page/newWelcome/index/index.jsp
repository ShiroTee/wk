<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<link rel="stylesheet" href="${ctx }/page/newWelcome/index/css/index.css"/>
<mdp:newHeader title="信息资产管理平台V3.0" curItem="home"/>
<section>
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
    
    <div style="position: absolute;width: 100%;">
    	<!-- 第二屏 -->
    	<div id="information"  class="block">
    		<img src="${ctx }/page/newWelcome/index/images/information_background.svg" style="position: absolute;width: 1227px;margin:24px 0 24px 60px;">
    		<div class="title">
    			信息资源<br>
    			实体数据
    			<div><i></i></div>
    		</div>
    		<div class="content">
    			<ul class="tab_head">
    				<li data-item="store" data-slide="slide00" class="cur"><span>应用仓库</span></li>
    				<li data-item="view" data-slide="slide01"><span>成果示范</span></li>
    			</ul>
    			<div class="tab_container">
    				<div class="tab_pane" >    						
    					<span class="timeline"></span>
    					<div class="img_content">
    						<div class="img_box">
    							<div>
    								<img class="cur" data-item="store" src="${ctx }/page/newWelcome/index/images/entity.png" style="width:742px;"/>
    								<img src="${ctx }/page/newWelcome/index/images/achievements_demo.png" style="width:742px;"/>
    							</div>
    						</div>
    					</div>
    					<div class="desc cur" data-item="store">
    						<p>汇集了多个建设项目的成果积累并加以分类挖掘。 以城市特色、人口领域、法人领域、宏观经济领域、征信领域、 数据综合等多领域多主题多维度进行可视化展示，方便用户快速构建部署应用呈现。</p>
    						<a href="${ctx}/mdp/welcome/entity_store/index.html" class="about_more"><span>了解更多</span><i></i></a>
    					</div>
    					<div class="desc" data-item="view">
    						<p>应用成果视角以典型的实际案例入手，汇报现阶段信息资源实体数据可视化建设情况， 以此为例达到应用示范效果。</p>
    						<a href="${ctx}/mdp/welcome/entity_store/list.html" class="about_more"><span>了解更多</span><i></i></a>
    					</div>
    				</div>
    			</div>
    		</div>
    	</div>
    	<!-- 第三屏 -->
    	<div id="management" class="block management">    	
    		<img src="${ctx }/page/newWelcome/index/images/management_background.svg" style="position: absolute;">
    		<div class="title">
    			数据治理
    			<div><i></i></div>
    		</div>
    		<div class="content">
    			<ul class="tab_head">
    				<li data-item="store" data-slide="slide00" class="cur"><span>元数据管理</span></li>
    				<li data-item="view" data-slide="slide01"><span>数据监控</span></li>
    			</ul>
    			<div class="tab_container">
    				<div class="tab_pane" >
    					<span class="timeline"></span>
    					<div class="img_content">
    						<div class="img_box">
    							<div>
    								<img class="cur" data-item="store" src="${ctx }/page/newWelcome/index/images/meta_data.png" style="width:742px;"/>
    								<img src="${ctx }/page/newWelcome/index/images/meta_data_monitor.png" style="width:742px;"/>
    							</div>
    						</div>
    					</div>
    					<div class="desc cur" data-item="store">
    						<p>元数据管理是数据治理的核心内容，通过对元数据关系的管理，实现对底层数据建设情况的统一管理，并通过可视化手段，分析、展现数据间的关联关系。元数据管理包括元数据管理和元模型管理。</p>
    						<a href="${ctx}/mdp/welcome/erRelation/erRelation.html" class="about_more"><span>了解更多</span><i></i></a>
    					</div>
    					<div class="desc" data-item="view">
    						<p>数据监控对信息资源中心建设中，数据交换共享过程、数据比对整合处理过程进行监控，实现对信息资源中心数据汇聚过程的总体把控。</p>
    						<a href="${ctx}/mdp/welcome/dataManagementAndMonitor/dataExchangeOverall.html" class="about_more"><span>了解更多</span><i></i></a>
    					</div>
    				</div>
    			</div>
			</div>
    	</div>
    	<!-- 第四屏 -->
    	<div id="api" class="block api">
    		<img src="${ctx }/page/newWelcome/index/images/api_background.svg" style="position: absolute;">
    		<div class="title">
    			API数据服务
    			<div><i></i></div>
    		</div>
    		<div class="content">
    			<ul class="hot_api">
    				<li>
    					<img src="${ctx }/page/newWelcome/index/images/api@2x.png">
    					<div class="name">API 01</div>
    					<div class="desc">为了确保您在电池更换时能够获得一块正品 Apple 电池， 我们建议您前往一家 Apple Store 商店或 Apple 授权服务提供商。 如果您需要更换一个新的适配器来为您的</div>
    					<a href="${ctx}/mdp/welcome/api/details.html"><span>了解更多</span></a>
					</li>
    				<li>
    					<img src="${ctx }/page/newWelcome/index/images/api@2x.png">
    					<div class="name">API 02</div>
    					<div class="desc">为了确保您在电池更换时能够获得一块正品 Apple 电池， 我们建议您前往一家 Apple Store 商店或 Apple 授权服务提供商。 如果您需要更换一个新的适配器来为您的</div>
    					<a href="${ctx}/mdp/welcome/api/details.html"><span>了解更多</span></a>
					</li>
    				<li>
    					<img src="${ctx }/page/newWelcome/index/images/api@2x.png">
    					<div class="name">API 03</div>
    					<div class="desc">为了确保您在电池更换时能够获得一块正品 Apple 电池， 我们建议您前往一家 Apple Store 商店或 Apple 授权服务提供商。 如果您需要更换一个新的适配器来为您的</div>
    					<a href="${ctx}/mdp/welcome/api/details.html"><span>了解更多</span></a>
					</li>
    				<li>
    					<img src="${ctx }/page/newWelcome/index/images/api@2x.png">
    					<div class="name">API 04</div>
    					<div class="desc">为了确保您在电池更换时能够获得一块正品 Apple 电池， 我们建议您前往一家 Apple Store 商店或 Apple 授权服务提供商。 如果您需要更换一个新的适配器来为您的</div>
    					<a href="${ctx}/mdp/welcome/api/details.html"><span>了解更多</span></a>
					</li>
    			</ul>
			</div>
	    </div>	    
		<mdp:mdpFooter />
    </div>
</section>
<script src="${ctx }/page/newWelcome/index/js/index.js"></script>
<script src="${ctx }/resources/radialIndicator/js/radialIndicator.js"></script>