package com.digitalchina.ldp.app.osp.dao;

import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;

public interface ServiceStatisticDao {

	//依据调用量从高到低读取服务列表
	public PageList<DynamicBean> listServiceByInvoking(int start, int size);

	//依据点击量从高到低读取服务列表
	public PageList<DynamicBean> listServiceByAccessing(int start, int size);

	public PageList<DynamicBean> listServiceByCollectCount(int start, int size, String parentType);

	public PageList<DynamicBean> listServiceByCollect(int start, int size);
}
