package com.jeecms.rdp.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class TestabcAct {

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(value = "/tes", method = {RequestMethod.GET,RequestMethod.POST})
	public String test(HttpServletRequest request,HttpServletResponse response)
	{
		List list=new ArrayList<Map<String,String>>();
		Map map=new HashMap<String,String>();
		map.put("11", "小张");
		map.put("12", "小王");
		map.put("11", "小李");
		Map map1=new HashMap<String,String>();
		map1.put("1月", "100");
		map1.put("2月", "200");
		map1.put("3月", "300");
		list.add(map);
		list.add(map1);
		
		request.setAttribute("lis",list );
		
		return "login";
	}
}
