package com.digitalchina.ldp.app.dmp.bean;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;
@Table(name="OLAP_WBJQZ_ZXQZ")
public class OlapWbjqzZxqzaBean implements java.io.Serializable{
	
	@Column(name="WBJBH")
	private String wbjbh;//委办局编码
	@Column(name="WBJ")
	private String wbj;//委办局
	@Column(name="BM")
	private String bm;//表名
	@Column(name="WBJAFFODSUM")
	private String wbjaffodsum;//提供数据总量
	@Column(name="WBJPUTSUM")
	private String wbjputsum;//插入库数据总量
	@Column(name="DZTIME")
	private String dztime;//对账日期起
	private String endtime;//结束时间
	private String wbjsjcy;//数据总量差异
	public String getWbjbh() {
		return wbjbh;
	}
	public void setWbjbh(String wbjbh) {
		this.wbjbh = wbjbh;
	}
	public String getWbj() {
		return wbj;
	}
	public void setWbj(String wbj) {
		this.wbj = wbj;
	}
	public String getBm() {
		return bm;
	}
	public void setBm(String bm) {
		this.bm = bm;
	}
	public String getWbjaffodsum() {
		return wbjaffodsum;
	}
	public void setWbjaffodsum(String wbjaffodsum) {
		this.wbjaffodsum = wbjaffodsum;
	}
	public String getWbjputsum() {
		return wbjputsum;
	}
	public void setWbjputsum(String wbjputsum) {
		this.wbjputsum = wbjputsum;
	}
	public String getDztime() {
		return dztime;
	}
	public void setDztime(String dztime) {
		this.dztime = dztime;
	}
	public String getEndtime() {
		return endtime;
	}
	public void setEndtime(String endtime) {
		this.endtime = endtime;
	}
	public String getWbjsjcy() {
		return wbjsjcy;
	}
	public void setWbjsjcy(String wbjsjcy) {
		this.wbjsjcy = wbjsjcy;
	}
	public OlapWbjqzZxqzaBean(String wbjbh, String wbj, String bm,
			String wbjaffodsum, String wbjputsum, String dztime,
			String endtime, String wbjsjcy) {
		super();
		this.wbjbh = wbjbh;
		this.wbj = wbj;
		this.bm = bm;
		this.wbjaffodsum = wbjaffodsum;
		this.wbjputsum = wbjputsum;
		this.dztime = dztime;
		this.endtime = endtime;
		this.wbjsjcy = wbjsjcy;
	}
	public OlapWbjqzZxqzaBean() {
		super();
	}
	
}
