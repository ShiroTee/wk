package com.digitalchina.ldp.app.dmp.handler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.digitalchina.ldp.app.dmp.bean.DmWBJBean;
import com.digitalchina.ldp.app.dmp.bean.DmpWbjBean;
import com.digitalchina.ldp.app.dmp.bean.WBJTableBean;
import com.digitalchina.ldp.app.dmp.bean.WBJTableColumnBean;
import com.digitalchina.ldp.app.dmp.service.DmpWbjService;
import com.digitalchina.ldp.bean.BaseBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.CreateJson;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;

@Component
public class WbjHandler extends AbstractExtHandler {

	@Autowired
	private DmpWbjService dmpWbjService;

	/**
	 * 获取委办局数据交换表
	 * 
	 * @param argsMap
	 * @return
	 */
	public PageList<DmpWbjBean> getDmpWbjList(Model argsMap) {
		int start = argsMap.getInt("start"), end = argsMap.getInt("limit");
		PageList<DmpWbjBean> dmpWbjList = dmpWbjService.getDmpWbjList(start,
				end, argsMap);
		return dmpWbjList;
	}

	/**
	 * 获取所有委办局
	 * 
	 * @param argsMap
	 * @return
	 */
	public String getRootData(Model argsMap) {
		List<DmWBJBean> list = dmpWbjService.getWBJList();
		CreateJson json = new CreateJson();
		for (int i = 0; i < list.size(); i++) {
			json.add("wbjCode", list.get(i).getWbjCode());
			json.add("wbjShortName", list.get(i).getWbjShortName());
			json.addToList();
		}
		return json.getResultJson();
	}

	/**
	 * 根据委办局获取表
	 * 
	 * @param argsMap
	 * @return
	 */
	public String getTableNameListByWBJ(Model argsMap) {
		String wbjCode = argsMap.getValue("wbjCode");
		WBJTableBean tableBean = new WBJTableBean();
		tableBean.setWBJBm(wbjCode);
		List<WBJTableBean> list = dmpWbjService
				.getTableNameListByWBJBM(tableBean);
		CreateJson json = new CreateJson();
		for (int i = 0; i < list.size(); i++) {
			json.add("tableNameEn", list.get(i).getTableNameEn());
			json.add("tableNameZh", list.get(i).getTableNameZh());
			json.addToList();
		}
		return json.getResultJson();
	}

	/**
	 * 根据表名获取表的列名
	 * 
	 * @param argsMap
	 * @return
	 */
	public String getTableColumnNameByTName(Model argsMap) {
		String tableCode = argsMap.getValue("tableCode");
		WBJTableColumnBean columnBean = new WBJTableColumnBean();
		columnBean.setTableName(tableCode);
		List<WBJTableColumnBean> list = dmpWbjService
				.getTableColumnByTableCode(columnBean);
		CreateJson json = new CreateJson();
		for (int i = 0; i < list.size(); i++) {
			if (!StringUtils.isEmpty(list.get(i).getComments())) {
				json.add("columnNameEn", list.get(i).getColumnName());
				json.add("columnNameZh", list.get(i).getComments());
				json.addToList();
			}
		}
		return json.getResultJson();
	}

	public String addDmpWbj(Model argsMap) {
		// 获取委办局名称
		String wbjbm = argsMap.getValue("wbjCode");
		String wbjjc = argsMap.getValue("addFormHiddenWBJName");
		// 获取委办局表名
		String bm = argsMap.getValue("bm");
		List<DmpWbjBean> bmBean=this.dmpWbjService.getDataInfoByBm(bm);
		if(bmBean.size()>0){
			throw new ServiceException("此表已存在！");
		}
		String bhzmc = argsMap.getValue("bhzmc");
		Integer zdzj = Integer.parseInt(argsMap.getValue("zdzj"));
		DmpWbjBean bean = new DmpWbjBean();
		bean.setWbjbm(wbjbm);
		bean.setWbjjc(wbjjc);
		bean.setBm(bm);
		bean.setBhzmc(bhzmc);
		bean.setZdzj(zdzj);
		this.dmpWbjService.insert(bean);
		return "{success:true}";
	}
	/**
	 * 删除选择的数据
	 * @param argsMap
	 * @return
	 */
	public String deleteDmpWbj(Model argsMap){
		String ids = argsMap.getValue("jsonData");
		String reslutStr = ids.replace("[", "(").replace("]", ")").replaceAll("\"","\'");
		dmpWbjService.deleteDmpWbj(reslutStr);
		return "{success:true}";
	}
	

	/**
	 * 获取某条数据信息
	 * @param argsMap
	 * @return
	 */
	public String getConfigInfo(Model argsMap){
		String wbjbm = argsMap.getValue("dataId");
		DmpWbjBean bean = new DmpWbjBean();
		bean.setWbjbm(wbjbm);
		bean = dmpWbjService.getDataInfoById(bean);
		BaseBean baseBean=new BaseBean();
		baseBean.setData(bean);
		baseBean.setSuccess(true);
		String responseData=JSON.toJSONString(baseBean);
		return responseData;
	}
	
	/**
	 * 修改某条数据
	 * @param argsMap
	 * @return
	 */
	public String updateDataConfig(Model argsMap){
		DmpWbjBean bean = new DmpWbjBean();
		Map<String, Object> map = new HashMap<String, Object>();
		String wbjbm = argsMap.getValue("wbjbm");
		String wbjjc = argsMap.getValue("addFormHiddenWBJName");
		String bm = argsMap.getValue("wbbm");
		String bhzmc = argsMap.getValue("bhzmc");
		Integer zdzj = Integer.parseInt(argsMap.getValue("zdzj"));
		bean.setWbjbm(wbjbm);
		bean.setWbjjc(wbjjc);
		bean.setBm(bm);
		bean.setBhzmc(bhzmc);
		bean.setZdzj(zdzj);
		//map.put("wbjbm", wbjbm);
		//map.put("wbjjc", wbjjc);
		//map.put("bm", bm);
		map.put("bhzmc", bhzmc);
		map.put("zdzj", zdzj);
		this.dmpWbjService.upateBean(map,bean.getBm());
		return "{success:true}";
	}
}
