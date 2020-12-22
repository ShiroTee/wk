package com.digitalchina.ldp.app.dmp.handler;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.digitalchina.ldp.app.dmp.bean.DmpDataBaseTableBean;
import com.digitalchina.ldp.app.dmp.bean.RecordBean;
import com.digitalchina.ldp.app.dmp.service.DmpDataBaseTableService;
import com.digitalchina.ldp.app.dmp.service.RecordService;
import com.digitalchina.ldp.bean.BaseBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.CreateJson;
import com.digitalchina.ldp.handler.AbstractExtHandler;
@Component
public class DataBaseTableHandler extends AbstractExtHandler {
	@Autowired
	private DmpDataBaseTableService dmpDataBaseTableService;
	@Autowired
	private RecordService recordService;
	public PageList<DmpDataBaseTableBean> getDmpDataBaseTableList(Model argsMap) {
		int start = argsMap.getInt("start"), end = argsMap.getInt("limit")+ start;
		PageList<DmpDataBaseTableBean> dmpDBtList = dmpDataBaseTableService.getDmpDataBaseTableList(start,
				end, argsMap);
		return dmpDBtList;
	}

	/**
	 * 鑾峰彇鎵�鏈夊熀纭�搴�
	 * 
	 * @param argsMap
	 * @return
	 */
	public String getDBtList(Model argsMap) {
		List<DmpDataBaseTableBean> list = dmpDataBaseTableService.getDBtList();
		CreateJson json = new CreateJson();
		for (int i = 0; i < list.size(); i++) {
			json.add("sjklx", list.get(i).getSjklx());
			json.add("sjkmc", list.get(i).getSjkmc());
			json.addToList();
		}
		return json.getResultJson();
	}

	/**
	 * 鏍规嵁鍩虹搴撹幏鍙栬〃
	 * 
	 * @param argsMap
	 * @return
	 */
	public String getTableNameListByDBt(Model argsMap) {
		
		String sjklx = argsMap.getValue("sjklx");
		DmpDataBaseTableBean tableBean = new DmpDataBaseTableBean();
		tableBean.setSjklx(sjklx);
		List<DmpDataBaseTableBean> list = dmpDataBaseTableService
				.getTableNameListByDBtBM(tableBean);
		CreateJson json = new CreateJson();
		for (int i = 0; i < list.size(); i++) {
			json.add("bm", list.get(i).getBm());
			json.add("bhzmc", list.get(i).getBhzmc());
			json.addToList();
		}
		return json.getResultJson();
	}



	public String addDmpDataBaseTable(Model argsMap) {
		// 鑾峰彇鍩虹鍚嶇О
		String sjklx = argsMap.getValue("sjklx");
		String sjkmc = argsMap.getValue("sjkmc");
		// 鑾峰彇鍩虹琛ㄥ悕
		String bm = argsMap.getValue("bm");
		List<DmpDataBaseTableBean> listdate=this.dmpDataBaseTableService.getWbjbm(bm);
		if(listdate.size()>0){
			throw new ServiceException("姝よ〃宸插瓨鍦紒");
		}
		String bhzmc = argsMap.getValue("bhzmc");
		Integer zdtcount=Integer.parseInt(argsMap.getValue("zdtcount"));
		DmpDataBaseTableBean bean = new DmpDataBaseTableBean();
		bean.setSjklx(sjklx);
		bean.setSjkmc(sjkmc);
		bean.setBm(bm);
		bean.setBhzmc(bhzmc);
		bean.setZdtcount(zdtcount);
		this.dmpDataBaseTableService.insert(bean);
		
		RecordBean recordBean=new RecordBean();
		recordBean.setSjklx(sjklx);
		recordBean.setDatabasetype(sjkmc);
		recordBean.setDatacount("0");
		recordBean.setTablename(bm);
		recordBean.setStartDate(new Date());
		this.recordService.insert(recordBean);
		return "{success:true}";
	}
	/**
	 * 鍒犻櫎閫夋嫨鐨勬暟鎹�
	 * @param argsMap
	 * @return
	 */
	public String deleteDmpDataBaseTable(Model argsMap){
		String ids = argsMap.getValue("jsonData");
		String reslutStr = ids.replace("[", "(").replace("]", ")").replaceAll("\"","\'");
		dmpDataBaseTableService.deleteDmpDataBaseTable(reslutStr);
		return "{success:true}";
	}
	

	/**
	 * 鑾峰彇鏌愭潯鏁版嵁淇℃伅
	 * @param argsMap
	 * @return
	 */
	public String getConfigInfo(Model argsMap){
		String sjklx = argsMap.getValue("dataId");
		DmpDataBaseTableBean bean = new DmpDataBaseTableBean();
		bean.setSjklx(sjklx);
		bean = dmpDataBaseTableService.getDataInfoById(bean);
		BaseBean baseBean=new BaseBean();
		baseBean.setData(bean);
		baseBean.setSuccess(true);
		String responseData=JSON.toJSONString(baseBean);
		return responseData;
	}
	
	/**
	 * 淇敼鏌愭潯鏁版嵁
	 * @param argsMap
	 * @return
	 */
	public String updateDmpDataBaseTable(Model argsMap){
		DmpDataBaseTableBean bean = new DmpDataBaseTableBean();
		Map<String, Object> map = new HashMap<String, Object>();
		String sjklx = argsMap.getValue("sjklx");
		String sjkmc = argsMap.getValue("sjkmc");
		String bm = argsMap.getValue("bmText");
		String bhzmc = argsMap.getValue("bhzmc");
		Integer zdtcount=Integer.parseInt(argsMap.getValue("zdtcount"));
		bean.setSjklx(sjklx);
		bean.setSjkmc(sjkmc);
		bean.setBm(bm);
		bean.setBhzmc(bhzmc);
		bean.setZdtcount(zdtcount);
		//map.put("sjklx", sjklx);
		//map.put("sjkmc", sjkmc);
		//map.put("bm", bm);
		map.put("bhzmc", bhzmc);
		map.put("zdtcount", zdtcount);
		this.dmpDataBaseTableService.upateBean(map,bean.getBm());
		return "{success:true}";
	}
}
