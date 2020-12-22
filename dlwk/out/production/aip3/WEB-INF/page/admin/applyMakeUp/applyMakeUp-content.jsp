<%@ page language="java" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<%@ taglib prefix="dms" tagdir="/WEB-INF/tags"%>
<div>
	<div class="row" style="height: 30px">
		<div class="col-md-offset-2 col-sm-8">您选择的资源（共&nbsp;<font style="font-size: 20px;" class="red" id="amu_totalRes">0</font>&nbsp;个）：</div>
	</div>
	<div class="row" style="height: 42px">
		<div class="col-md-offset-2 col-sm-8">
			<button id="amu_chooseResource" type="button" class="btn btn-info">选择资源目录</button>
			<span id="amu_noResource">您还没有选择资源！</span>
		</div>
	</div>




</div>
<div class="row">
	<form class="form-horizontal" role="form" id="amu_applyForm">
		<!-- 属性数据资源 列表-->
		<div id="amu_resources">
			<div class="row">
				<div class="col-md-offset-2 col-sm-8">
					<div class="widget-box" id="amu_Catalog" style="display: none">
						<div class="widget-header widget-header-flat">
							<h4 class="widget-title smaller">
								属性数据资源（共&nbsp;<span class="red">0</span>&nbsp;个）
							</h4>

							<div class="widget-toolbar">
								<i style="cursor: pointer; color: red;"
									class="ace-icon glyphicon glyphicon-remove"></i>
							</div>
						</div>

						<div class="widget-body">
							<div class="widget-main">

								<!-- <div class="widget-box">
								<div class="widget-header widget-header-flat">
									<h4 class="widget-title smaller">Definition List</h4>
									<span class="col-md-offset-3"><input type="radio"
										name="amu_CaFruquency2" />数据服务&nbsp;<input type="radio"
										name="amu_CaFruquency2" /> 数据交换（更新频率：每天 ） </span>
									<div class="widget-toolbar">
										<i style="cursor: pointer; color: red;"
											class="ace-icon glyphicon glyphicon-remove"></i>
									</div>
								</div>
							</div> -->

							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 空间数据资源 列表-->
			<div class="row">
				<div class="col-md-offset-2 col-sm-8">
					<div class="widget-box" id="amu_Space" style="display: none">
						<div class="widget-header widget-header-flat">
							<h4 class="widget-title smaller">
								空间数据资源（共&nbsp;<span class="red">0</span>&nbsp;个）
							</h4>

							<div class="widget-toolbar">
								<i style="cursor: pointer; color: red;"
									class="ace-icon glyphicon glyphicon-remove"></i>
							</div>
						</div>

						<div class="widget-body">
							<div class="widget-main">
								<!-- <div class="widget-box">
								<div class="widget-header widget-header-flat">
									<h4 class="widget-title smaller">水库水位监测数据2</h4>
									<span class="col-md-offset-3"> <input type="checkbox"
										name="amu_SpService" />空间服务&nbsp; <input type="checkbox"
										name="amu_SpData" /> 空间数据
									</span>
									<div class="widget-toolbar">
										<i style="cursor: pointer; color: red;"
											class="ace-icon glyphicon glyphicon-remove"></i>
									</div>
								</div>
								<div class="widget-body" style="display: none;">
									<div class="widget-main">
										<div class="row" style="margin-bottom: 10px;">
											<label class="col-sm-2 control-label no-padding-right"
												for="form-field-1"> 数据范围：</label>

											<div class="col-sm-10">
												<input type="text" class="form-control">
											</div>
										</div>
										<div class="row">
											<label class="col-sm-2 control-label no-padding-right"
												for="form-field-1"> 数据格式：</label>

											<div class="col-sm-4">
												<input type="text" class="form-control">
											</div>

											<label class="col-sm-2 control-label no-padding-right"
												for="form-field-1"> 更新时间：</label>

											<div class="col-sm-4">
												<input type="text" class="form-control">
											</div>
										</div>
									</div>
								</div>
							</div> -->
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-offset-2 col-sm-8">


				<div id="amu_secret" style="display: none">
					<div class="con_tit">
						<span class="con_tit_ico"></span>
						<h3>
							<b>涉密数据使用方式、期限信息：</b>
						</h3>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right"
							for="form-field-1"> 数据使用方式：</label>

						<div class="col-sm-9">
							<span><input type="radio" name="useType"
								class="validate[funcCall[checkCustomRadio]]" value="1">副本独立环境存放使用。存放环境：
								<input type="text" disabled="disabled"
								class="validate[required,funcCall[wordLimitInput]]"></span> <br> <span> <input
								type="radio" name="useType" value="2">其它（请注明）： <input
								type="text" style="margin-top: 2px;" disabled="disabled"
								class="validate[required,funcCall[wordLimitInput]]"></span>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right"
							for="form-field-1"> 数据使用期限：</label>

						<div class="col-sm-9">
							<span><input type="radio"
								class="validate[funcCall[checkCustomRadio]]" name="dateType"
								value="1">无固定期 &nbsp;</span> <span><input type="radio"
								name="dateType" value="2" >固定期（请注明）： <input type="text"
								id="amu_secretStartTime" disabled="disabled"  class="validate[required] text-input datepicker hasDatepicker"/>- <input
								type="text" id="amu_secretEndTime" disabled="disabled"  class="validate[required] text-input datepicker hasDatepicker"/></span>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right"
							for="form-field-1"> 数据涉密类型：</label>

						<div class="col-sm-9">
							<span><input type="radio"
								class="validate[funcCall[checkCustomRadio]]" name="secretType"
								value="1">涉及国家秘密（密级： <select name="secretTypeLevel"
								id="select1" disabled="disabled"
								class="validate[funcCall[checkCustomSelect]]">
									<option value="-1">请选择</option>
									<option value="1">秘密</option>
									<option value="2">机密</option>
									<option value="3">绝密</option>
							</select>&nbsp;)</span><span> <input type="radio" name="secretType"
								value="2">涉及商业秘密或个人隐私
							</span> <span><input type="radio" name="secretType" value="3">其它</span>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right"
							for="form-field-1"> 数据衍生成果描述 </br>及完成时间：
						</label>

						<div class="col-sm-9">
							<textarea rows="3" class="form-control validate[funcCall[wordLimitArea]]" name="describe"></textarea>
						</div>
					</div>



				</div>


				<div class="con_tit">
					<span class="con_tit_ico"></span>
					<h3>
						<b>申请单位基本信息:</b>
					</h3>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right"
						for="form-field-1"> </label>

					<div class="col-sm-9">
						<input type="radio" class="validate[funcCall[checkCustomRadio]]"
							name="unitType" value="1">局内单位 <input type="radio"
							name="unitType" value="2">局外单位
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right"
						for="form-field-1"> <span class="red">*</span>申请单位名称：
					</label>

					<div class="col-sm-9" >
						<input type="text" name="applyOrgName"
							class="form-control validate[required,funcCall[wordLimitInput]]">
						
					</div>
				</div>


				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right"
						for="form-field-1"> <span class="red">*</span>申请联系人姓名：
					</label>

					<div class="col-sm-9">
						<input type="text" name="applyUser"
							class="form-control validate[required,funcCall[wordLimitInput]]">
					</div>
				</div>
				<div class="form-group" >
					<label class="col-sm-3 control-label no-padding-right"
						for="form-field-1"> <span class="red">*</span>电话：
					</label>

					<div class="col-sm-9" style="position:relative">
						<input type="text" name="applyPhone"
							class="form-control validate[required,funcCall[phcall]]">
							<div id="amu_call" class="right">
                                <img style="margin-right: 20px;" src="${ctx}/resources/images/Question.png" alt="" class="calls" align="right">
                            </div>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right"
						for="form-field-1"> 电子邮箱：</label>

					<div class="col-sm-9">
						<input type="text" name="applyEmail"
							class="form-control validate[custom[email]]">
					</div>
				</div>

				<div class="con_tit">
					<span class="con_tit_ico"></span>
					<h3>
						<b>数据应用情况信息：</b>
					</h3>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right"
						for="form-field-1"> 应用项目名称：</label>

					<div class="col-sm-9">
						<input type="text" name="applyProjectName" class="form-control validate[funcCall[wordLimitInput]]">
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right"
						for="form-field-1"> 系统开发(数据再加工)单位：</label>

					<div class="col-sm-9">
						<input name="applyDevOrg" type="text" class="form-control validate[funcCall[wordLimitInput]]">
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right"
						for="form-field-1"> 系统用户：</label>

					<div class="col-sm-9">
						<input name="applySysUser" type="text" class="form-control validate[funcCall[wordLimitInput]]">
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right"
						for="form-field-1"> 项目来源：</label>

					<div class="col-sm-9">
						<input name="applyProjectSource" type="text" class="form-control validate[funcCall[wordLimitInput]]">
					</div>
				</div>

				<div class="space-4"></div>

				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right"
						for="form-field-2"> 投资总额： </label>

					<div class="col-sm-9">
						<input name="applyInvestTotal" class="col-xs-10 col-sm-5 validate[custom[number]]">
						<span class="help-inline col-xs-12 col-sm-7"> <span
							class="middle">万元</span>
						</span>
					</div>
				</div>

				<div class="space-4"></div>

				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right"
						for="form-input-readonly"> 完成时间： </label>

					<div class="col-sm-9">
						<input name="applyFinishDate" type="text" id="data-startTime"
							value="${startTime}" class="col-xs-10 col-sm-5" />
					</div>
				</div>

				<div class="space-4"></div>

				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right"
						for="form-field-2"> 应用项目简介： </label>

					<div class="col-sm-9">
						<textarea name="applyRemark" rows="3" class="form-control validate[funcCall[wordLimitArea]]"></textarea>
					</div>
				</div>

				<div class="clearfix form-actions">
					<div class="col-md-offset-3 col-md-9">
						<input class="btn btn-info" type="submit" value="保存申请">


					</div>
				</div>
			</div>
	</form>


</div>

</div>