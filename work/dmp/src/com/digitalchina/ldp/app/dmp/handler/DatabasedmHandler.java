package com.digitalchina.ldp.app.dmp.handler;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dmp.bean.DatabasedmBean;
import com.digitalchina.ldp.app.dmp.service.DatabasedmServce;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.common.util.CreateJson;
import com.digitalchina.ldp.handler.AbstractExtHandler;

@Component
public class DatabasedmHandler extends AbstractExtHandler {
	@Autowired
	private DatabasedmServce databasedmServce;
	public String getDBtList(Model argsMap) {
		List<DatabasedmBean> list = databasedmServce.getDBtList();
		CreateJson json = new CreateJson();
		for (int i = 0; i < list.size(); i++) {
			json.add("sjklx", list.get(i).getSjklx());
			json.add("sjkmc", list.get(i).getSjkmc());
			json.addToList();
		}
		return json.getResultJson();
	}
}
