package com.digitalchina.ldp.app.csdsc.handler;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.csdsc.bean.AssetBean;
import com.digitalchina.ldp.app.csdsc.service.GisServiceAutoRegService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.common.util.DbContextHolder;
import com.digitalchina.ldp.handler.AbstractHandler;

/**
 * 地图服务自动注册接口
 * @author MagicChu
 *
 */
@Component
public class GisServiceAutoRegHandler extends AbstractHandler{
	
	@Autowired
	private GisServiceAutoRegService gisServiceAutoRegService;
	
	
	/**
	 * 地图服务自动注册接口
	 * @param model
	 * @return
	 */
	@HttpService
	public void doGisServiceAutoReg(Model model) {
		DbContextHolder.setDefaultDbType("rdp");
		gisServiceAutoRegService.registerGisServiceAutoReg(model);
	}
	
	
	/**
	 * 查询信息资产数据
	 * @param model
	 * @return
	 */
	@HttpService
	public List<AssetBean> qryGisServiceAutoReg(Model model) {
		DbContextHolder.setDefaultDbType("rdp");
		return gisServiceAutoRegService.qGisServiceAutoReg(model);
	}
	
}

