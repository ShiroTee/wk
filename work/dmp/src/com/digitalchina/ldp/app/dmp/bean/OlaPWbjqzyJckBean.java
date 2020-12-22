package com.digitalchina.ldp.app.dmp.bean;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;

@Table(name="OLAP_WBJTOBASE_COMPARE")	//委办局中心前置与基础库对账
public class OlaPWbjqzyJckBean implements java.io.Serializable{
	//委办局别名
	@Column(name="WBJBM")
	private String wbjbm;
	//表名
	@Column(name="BM")
	private String bm;
	//委办局提供的总数据量
	@Column(name="SUPPLYCOUNT")
	private String supplycount;
	//基础库接收到的总数据量
	@Column(name="ACCEPTCOUNT")	
	private String acceptount;
	//对账日期
	@Column(name="COMPAREDATE")		
	private String comparedate;	
	private String endtimes;//结束时间
	private String wbjsjcy;//数据总量差异
	
	

}
