package com.digitalchina.ldp.app.dmp.handler;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.digitalchina.ldp.app.dmp.bean.DataConfigBean;
import com.digitalchina.ldp.app.dmp.bean.WBJTableBean;
import com.digitalchina.ldp.app.dmp.service.ICleanDataManService;
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
public class CleanDataManHandler extends AbstractExtHandler {

	@Autowired
	private ICleanDataManService cleanDataManService ;
	

	//根据委办局别名、表名、字段名，查询出此字段相应的清洗规则集合
	public List<DataConfigBean> getDataRule(Model argsMap){
		List<DataConfigBean> list = cleanDataManService.getDataRule(argsMap) ;
		return list ;
	}
	//根据清洗规则查询出某时间段里所有清洗统计结果
	public PageList<Map<String, Object>> getCleanResult(Model argsMap) {
		String startDate = argsMap.getValue("starttime_date");
		String endDate = argsMap.getValue("endtime_date");
		PageList<Map<String, Object>> pageList = cleanDataManService.getCleanResultInfo(argsMap) ;
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
		List<Map<String, Object>> respList = new ArrayList<Map<String, Object>>() ;
		Map<String, Object> respMap = new HashMap<String, Object>() ;
		if(!StringUtils.isBlank(DataRuleCode)){
			respList = cleanDataManService.getErrorFieldAndName(argsMap, DataRuleCode) ;
			//查询到字段和字段名数据
			if(respList.size() > 0 ){
				respMap.put("success", true);
				List<String> fieldList = new ArrayList<String>() ;
				fieldList.add("ID") ;
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
				map1.put("dataIndex", "ID") ;
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
				map4.put("header", "<font color='red'>"+respList.get(0).get("COLUMNNAMEVALUE").toString() + "(异常字段)</font>") ;
				map4.put("width", 10) ;
				map4.put("dataIndex", respList.get(0).get("COLUMNNAMEVALUE").toString()) ;
				map4.put("sortable", true) ;
				map4.put("hidden", false) ;
//				map4.put("renderer", "failedOper_dataclean") ;
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
		list = cleanDataManService.getOneDayFailedInfo(argsMap);
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
	public ViewModel page(Model model)
	{
		ViewModel viewModel=new ViewModel("dataproduce/dataCleanMan.jsp");
		return viewModel;
	}
}
