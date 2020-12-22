package com.digitalchina.ldp.app.dms.handler;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.digitalchina.ldp.app.dms.bean.RuleinfoBean;
import com.digitalchina.ldp.app.dms.service.RuleinfoService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;

@Component
public class RuleinfoHandler extends AbstractExtHandler
{
	@Autowired
	private RuleinfoService	ruleinfoService;

	@Override
	public ViewModel page(Model model)
	{
		ViewModel viewModel = new ViewModel("hostmonitor/ruleinfo.jsp", "hostmonitor/ruleinfo.js");
		return viewModel;
	}

	public PageList<String> getRuleinfoList(Model model)
	{
		int start = StringUtils.toNum(model.get("start").toString());
		int end = StringUtils.toNum(model.get("limit").toString());
		PageList<String> list = ruleinfoService.getaddRuleinfoList(start, end, model);
		return list;
	}

	public String insertRuleinfoList(Model model)
	{
		String id = UUID.randomUUID().toString();
		System.out.println(id);
		String rulename = model.getValue("RULENAME");
		System.out.println(rulename);
		String ruletype = model.getValue("RULETYPE");
		System.out.println(ruletype);
		String status = model.getValue("STATUS");
		System.out.println(status);
		String operator = model.getValue("OPERATOR");
		String threshold = model.getValue("THRESHOLD");
		String memo = model.getValue("MEMO");
		System.out.println(memo);
		RuleinfoBean beans = new RuleinfoBean();
		beans.setId(id);
		beans.setRulename(rulename);
		beans.setRuletype(ruletype);
		beans.setStatus("Y");
		beans.setOperator(operator);
		beans.setThreshold(threshold);
		beans.setAddtme(new Date());
		beans.setMemo(memo);
		this.ruleinfoService.insertRuleinfoList(beans);
		return "{success:true}";
	}

	public String deleteRuleinfo(Model model)
	{
		String jsonData = model.getValue("jsonData");
		String ids = jsonData.replace("[", "(").replace("]", ")").replaceAll("\"", "\'");
		System.out.println(ids);
		this.ruleinfoService.deleteRuleinfo(ids);
		return "{success:true}";
	}

	public String selectRuleinfo(Model model)
	{
		String ids = model.getValue("id");
		System.out.println(ids);
		RuleinfoBean beans = new RuleinfoBean();
		beans = this.ruleinfoService.getaddRuleinfo(ids);
		String responseData = JSON.toJSONString(beans);
		return responseData;
	}

	public String upateRuleinfo(Model model)
	{
		String ids = model.getValue("ID");
		String rulename = model.getValue("RULENAME");
		String ruletype = model.getValue("RULETYPE");
		String operator = model.getValue("OPERATOR");
		String threshold = model.getValue("THRESHOLD");
		String memo = model.getValue("MEMO");
		RuleinfoBean rbean = new RuleinfoBean();
		rbean = this.ruleinfoService.getaddRuleinfo(ids);
		rbean.setRulename(rulename);
		rbean.setRuletype(ruletype);
		rbean.setOperator(operator);
		rbean.setThreshold(threshold);
		rbean.setStatus("Y");
		rbean.setMemo(memo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("rulename", rulename);
		map.put("ruletype", ruletype);
		map.put("operator", operator);
		map.put("threshold", threshold);
		map.put("memo", memo);
		map.put("addtme", new Date());
		this.ruleinfoService.upateRuleinfo(map, rbean.getId());
		return "{success:true}";
	}

	/**
	 * 方法描述：状态的开启和关闭
	 */
	public String updateRuleinfoStatus(Model model)
	{
		this.ruleinfoService.updateRuleinfoStatus(model);
		return "{\"success\":true,\"msg\":\"成功\"}";
	}

}
