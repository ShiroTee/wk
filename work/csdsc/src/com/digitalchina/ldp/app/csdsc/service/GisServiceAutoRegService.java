package com.digitalchina.ldp.app.csdsc.service;


import java.util.List;

import com.digitalchina.ldp.app.csdsc.bean.AssetBean;
import com.digitalchina.ldp.bean.Model;

/**
 * 地图服务自动注册接口
 * @author MagicChu
 * 
 */
public interface GisServiceAutoRegService {
	
	/**
	 * 地图服务自动注册接口
	 * 
	 * @param model
	 * @return
	 */
	public void registerGisServiceAutoReg(Model model);
	
	
	/**
	 * 查询信息资产数据
	 * @param model
	 * @return
	 */
	public List<AssetBean> qGisServiceAutoReg(Model model);

}
