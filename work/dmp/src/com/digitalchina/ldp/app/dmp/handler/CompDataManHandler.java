package com.digitalchina.ldp.app.dmp.handler;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.digitalchina.ldp.app.dmp.bean.DataConfigBean;
import com.digitalchina.ldp.app.dmp.bean.WBJTableColumnBean;
import com.digitalchina.ldp.app.dmp.service.DataConfigService;
import com.digitalchina.ldp.app.dmp.service.ICompDataManService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.handler.AbstractExtHandler;

/**
 * 数据清洗管理
 * @author zhangyg
 * 
 */

@Component
public class CompDataManHandler extends AbstractExtHandler {

	@Autowired
	private ICompDataManService compDataManService ;
	
	@Autowired
	private DataConfigService dataConfigService;

	//根据委办局别名、表名、字段名，查询出此字段相应的清洗规则集合
	public List<DataConfigBean> getDataRule(Model argsMap){
		List<DataConfigBean> list = compDataManService.getDataRule(argsMap) ;
		return list ;
	}
	//根据清洗规则查询出某时间段里所有清洗统计结果
	public PageList<Map<String, Object>> getCompResult(Model argsMap) {
		String startDate = argsMap.getValue("starttime_date");
		String endDate = argsMap.getValue("endtime_date");
		PageList<Map<String, Object>> pageList = compDataManService.getCompResultInfo(argsMap) ;
		List<Map<String, Object>> list = pageList.getList() ;
		for (Map<String, Object> map : list) {
			String addDate = new SimpleDateFormat("yyyy-MM-dd").format(map.get("INSERTDATE")) ;
			map.put("INSERTDATE", addDate) ;
			if (!StringUtils.isBlank(startDate)
					&& !StringUtils.isBlank(endDate)) {
				map.put("startDate", startDate);
				map.put("endDate", endDate);
			} else {
				map.put("startDate", "无");
				map.put("endDate", "无");
			}
		}
		return pageList;
	}
	
	//根据清洗规则代号，查询出异常详情需要显示的列字段
	public String getErrorFiledAndName(Model argsMap){
		StringBuffer respFiledStr = new StringBuffer();
		String DataRuleCode = argsMap.getValue("DataRuleCode") ;
		List<Map<String, Object>> respList = null;
		Map<String, Object> respMap = new HashMap<String, Object>() ;
		if(!StringUtils.isBlank(DataRuleCode)){
			respList = compDataManService.getErrorFieldAndName(argsMap, DataRuleCode) ;
			//查询到字段和字段名数据
			if(respList.size() > 0 ){
				respMap.put("success", true);
				List<String> fieldList = new ArrayList<String>() ;
				fieldList.add("EXCEPTION_ID") ;
				fieldList.add("TABLENAME") ;
				fieldList.add("TABLENAMEVALUE") ;
				fieldList.add(respList.get(0).get("COLUMNNAMEVALUE").toString()) ;
				fieldList.add("EXCEPITION_INFO") ;
				fieldList.add("DOFLAG") ;
				fieldList.add("DOTIME") ;
				fieldList.add("INTIME") ;
				//装入字段
				respMap.put("field", fieldList) ;

				//组装各GridPanel各字段属性值
				List<Map<String,Object>> fieldNameList = new ArrayList<Map<String,Object>>() ;
				Map<String,Object> map1 = new HashMap<String,Object>() ;
				map1.put("header", "异常数据标志") ;
				map1.put("width", 10) ;
				map1.put("dataIndex", "EXCEPTION_ID") ;
				map1.put("sortable", true) ;
				map1.put("hidden", false) ;
				fieldNameList.add(map1) ;
				
				Map<String,Object> map2 = new HashMap<String,Object>() ;
				map2.put("header", "数据表表名") ;
				map2.put("width", 8) ;
				map2.put("dataIndex", "TABLENAME") ;
				map2.put("sortable", true) ;
				map2.put("hidden", false) ;
				fieldNameList.add(map2) ;
				
				Map<String,Object> map3 = new HashMap<String,Object>() ;
				map3.put("header", "表名代码") ;
				map3.put("width", 5) ;
				map3.put("dataIndex", "TABLENAMEVALUE") ;
				map3.put("sortable", true) ;
				map3.put("hidden", true) ;
				fieldNameList.add(map3) ;
				
				Map<String,Object> map4 = new HashMap<String,Object>() ;
				map4.put("header", respList.get(0).get("COLUMNNAME").toString() + "(异常字段)") ;
				map4.put("width", 10) ;
				map4.put("dataIndex", respList.get(0).get("COLUMNNAMEVALUE").toString()) ;
				map4.put("sortable", true) ;
				map4.put("hidden", false) ;
				fieldNameList.add(map4) ;
				
				Map<String,Object> map5 = new HashMap<String,Object>() ;
				map5.put("header", "异常原因") ;
				map5.put("width", 10) ;
				map5.put("dataIndex", "EXCEPITION_INFO") ;
				map5.put("sortable", true) ;
				map5.put("hidden", false) ;
				fieldNameList.add(map5) ;
				
				Map<String,Object> map6 = new HashMap<String,Object>() ;
				map6.put("header", "是否处理") ;
				map6.put("width", 5) ;
				map6.put("dataIndex", "DOFLAG") ;
				map6.put("sortable", true) ;
				map6.put("hidden", false) ;
				fieldNameList.add(map6) ;
				
				Map<String,Object> map7 = new HashMap<String,Object>() ;
				map7.put("header", "处理时间") ;
				map7.put("width", 10) ;
				map7.put("dataIndex", "DOTIME") ;
				map7.put("sortable", true) ;
				map7.put("hidden", true) ;
				fieldNameList.add(map7) ;
				
				Map<String,Object> map8 = new HashMap<String,Object>() ;
				map8.put("header", "入异常库时间") ;
				map8.put("width", 10) ;
				map8.put("dataIndex", "INTIME") ;
				map8.put("sortable", true) ;
				map8.put("hidden", false) ;
				fieldNameList.add(map8) ;
				//装入字段名
				respMap.put("fieldName", fieldNameList) ;
				respFiledStr.append(JSON.toJSONString(respMap)) ;
			}else{
				respMap.put("success", false) ;
				respMap.put("msg", "获取字段及字段名失败") ;
				respFiledStr.append(JSON.toJSONString(respMap)) ;
			}
		}else{
			respMap.put("success", false) ;
			respMap.put("msg", "获取字段及字段名失败") ;
			respFiledStr.append(JSON.toJSONString(respMap)) ;
		}
		return respFiledStr.toString() ;
	}

	public PageList<Map<String, Object>> getOneDayFailedInfo(Model argsMap) {
		PageList<Map<String, Object>> list = null;
		list = compDataManService.getOneDayFailedInfo(argsMap);
		List<Map<String, Object>> temp_list = list.getList();
		for(Map<String, Object> temp_map : temp_list){
			if(StringUtils.equals("Y", temp_map.get("DOFLAG").toString())){
				temp_map.put("DOFLAG", "是") ;
			}else{
				temp_map.put("DOFLAG", "否") ;
			}
			String addDate = new SimpleDateFormat("yyyy-MM-dd").format(temp_map.get("INTIME")) ;
			temp_map.put("INTIME", addDate) ;
			if(temp_map.get("DOTIME") != null){
				String doDate = new SimpleDateFormat("yyyy-MM-dd").format(temp_map.get("DOTIME")) ;
				temp_map.put("DOTIME", doDate) ;
			}
		}
		return list;
	}
	
	@SuppressWarnings("unchecked")
	public String getCompDetailInfo(Model argsMap){
		String tableCode = argsMap.getValue("DataRuleCode");
		String[] DataRuleCodeStr = tableCode.split("_") ;
		WBJTableColumnBean columnBean = new WBJTableColumnBean();
		columnBean.setTableName(DataRuleCodeStr[2] + "_" + DataRuleCodeStr[3]);
		List<WBJTableColumnBean> list = dataConfigService.getTableColumnByTableCode(columnBean);
		
		Map<String, Object> errorMap = compDataManService.getErrorExceptionInfo(argsMap,list).get(0);
		List<Map<String, Object>> rigthList = compDataManService.getRightDataInfo(argsMap);
		Map<String, Object> map = rigthList.get(0);
		Set<String> set = map.keySet();
		Iterator iterator = set.iterator();
		StringBuffer sb = new StringBuffer("<div>");
		StringBuffer leftSb = new StringBuffer("<div style='width: 200px;'>");
		StringBuffer rightSb = new StringBuffer("<div style='float: left; width: 200px;'>");
		while (iterator.hasNext()) {
			String keyStr = (String) iterator.next();
			for (int i = 0; i < list.size(); i++) {
				if(keyStr.equals(list.get(i).getColumnName())&&!StringUtils.isEmpty(list.get(i).getComments())){
					String cloumnCommentStr = list.get(i).getComments();
					leftSb.append("<div style='margin: 5px; padding: 5px;'>");
					rightSb.append("<div style='margin: 5px; padding: 5px;'>");
					if(DataRuleCodeStr[4].equals(list.get(i).getColumnName())){
						leftSb.append(cloumnCommentStr+"：&nbsp; <font color='red'>"+errorMap.get(keyStr)+"</font><br>");
					}else{
						leftSb.append(cloumnCommentStr+"：&nbsp;"+errorMap.get(keyStr)+"<br>");
					}
					rightSb.append(cloumnCommentStr+"：&nbsp;"+map.get(keyStr)+"<br>");
					leftSb.append("</div>");
					rightSb.append("</div>");
				}
			}
		}
		leftSb.append("</div>");
		rightSb.append("</div>");
		sb.append(leftSb);
		sb.append(rightSb);
		sb.append("</div>");
		String reslut = "{\"leftData\":\""+leftSb.toString()+"\",\"rightData\":\""+rightSb.toString()+"\"}";
		return reslut;
	}
	public ViewModel page(Model model)
	{
		ViewModel viewModel=new ViewModel("dataproduce/dataCompMan.jsp");
		return viewModel;
	}
}
