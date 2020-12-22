package com.digitalchina.ldp.app.dmp.handler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.digitalchina.ldp.app.dmp.bean.DmpDmJhmodeBean;
import com.digitalchina.ldp.app.dmp.service.DmpDmJhmodeSevice;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.CreateJson;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;
@Component
public class DmJhmodeHandler extends AbstractExtHandler{
	@Autowired
	private DmpDmJhmodeSevice dmpDmJhmodeSevice;
	public PageList<String> getDmpDmJhmodeList(Model model)
	{
		int start = StringUtils.toNum(model.get("start").toString());
		int end = StringUtils.toNum(model.get("limit").toString());
		PageList<String> list = dmpDmJhmodeSevice.getDmpDmJhmodeList(start, end, model);
		return list;
	}
	
public String getJhmodeListByDBtBM(Model argsMap) {
		
		String wbjbm = argsMap.getValue("wbjbm");
		DmpDmJhmodeBean tableBean = new DmpDmJhmodeBean();
		tableBean.setWbjbm(wbjbm);
		List<DmpDmJhmodeBean> list = dmpDmJhmodeSevice
				.getJhmodeListByDBtBM(tableBean);
		CreateJson json = new CreateJson();
		for (int i = 0; i < list.size(); i++) {
			json.add("wbjbm", list.get(i).getWbjbm());
			json.add("jhmode", list.get(i).getJhmode());
			json.addToList();
		}
		return json.getResultJson();
	}
public String getaddDmpDmJhmode(Model argsMap){
	String wbjbm = argsMap.getValue("WBJBM");
	DmpDmJhmodeBean dmpDmJhmodeBean=new DmpDmJhmodeBean();
	dmpDmJhmodeBean= this.dmpDmJhmodeSevice.getaddDmpDmJhmode(wbjbm);
	String dmpDmJhmode=JSON.toJSONString(dmpDmJhmodeBean);
	return dmpDmJhmode;
	
}
public String addDmpDmJhmode(Model argsMap) {
	String wbjbm = argsMap.getValue("WBJBM");
	String wbjqc = argsMap.getValue("WBJQC");
	String wbjjc = argsMap.getValue("WBJJC");
	String jhmode = argsMap.getValue("JHMODE");	
	//DmpDmJhmodeBean bean=this.dmpDmJhmodeSevice.getaddDmpDmJhmode(wbjbm);
	//if(bean!=null){
	//	throw new ServiceException("委办局编码已存在！");
	//}else if(bean==null){
	DmpDmJhmodeBean beans=new DmpDmJhmodeBean();	
			beans.setWbjbm(wbjbm);
			beans.setWbjqc(wbjqc);
			beans.setWbjjc(wbjjc);
			beans.setJhmode(jhmode);
			this.dmpDmJhmodeSevice.insert(beans);
	//		}	
	return "{success:true}";
}
public String selectJhmode(Model argsMap){
	String wbjbm = argsMap.getValue("WBJBM");
	DmpDmJhmodeBean bean=new DmpDmJhmodeBean();
	bean=this.dmpDmJhmodeSevice.getaddDmpDmJhmode(wbjbm);
	String responseData=JSON.toJSONString(bean);
	return responseData;
	
}
public String deleteDmpDmJhmode(Model argsMap){
	String ids = argsMap.getValue("jsonData");
	String reslutStr = ids.replace("[", "(").replace("]", ")").replaceAll("\"","\'");
	this.dmpDmJhmodeSevice.deleteDmpDmJhmode(reslutStr);
	return "{success:true}";
}
public String updateJhmode(Model argsMap){
	String wbjbm = argsMap.getValue("wbjbm");
	String wbjqc = argsMap.getValue("WBJQC");
	String wbjjc = argsMap.getValue("WBJJC");
	String jhmode = argsMap.getValue("JHMODE");
	DmpDmJhmodeBean bean=new DmpDmJhmodeBean();
	bean=this.dmpDmJhmodeSevice.getaddDmpDmJhmode(wbjbm);
	bean.setWbjqc(wbjqc);
	bean.setWbjjc(wbjjc);
	bean.setJhmode(jhmode);
	Map<String, Object> map = new HashMap<String, Object>();
	map.put("wbjqc", wbjqc);
	map.put("wbjjc", wbjjc);
	map.put("jhmode", jhmode);
	this.dmpDmJhmodeSevice.upateBean(map, bean.getWbjbm());
	return "{success:true}";
	
 }
}
