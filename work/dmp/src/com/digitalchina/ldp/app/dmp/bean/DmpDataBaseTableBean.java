package com.digitalchina.ldp.app.dmp.bean;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;
 @Table(name="DMP_DATABASE_TABLE")
public class DmpDataBaseTableBean implements java.io.Serializable{
		@Column(name="SJKLX")
		private String sjklx;
		@Column(name="SJKMC")   
		private String sjkmc;      	 //基础库
		@Column(name="BM")
		private String bm;			//表名
		@Column(name="BHZMC")
		private String bhzmc;		//表说明
		@Column(name="ZDTCOUNT")
		private Integer zdtcount;  //字段总计
		public String getSjklx() {
			return sjklx;
		}
		public void setSjklx(String sjklx) {
			this.sjklx = sjklx;
		}
		public String getSjkmc() {
			return sjkmc;
		}
		public void setSjkmc(String sjkmc) {
			this.sjkmc = sjkmc;
		}
		public String getBm() {
			return bm;
		}
		public void setBm(String bm) {
			this.bm = bm;
		}
		public String getBhzmc() {
			return bhzmc;
		}
		public void setBhzmc(String bhzmc) {
			this.bhzmc = bhzmc;
		}
		public Integer getZdtcount() {
			return zdtcount;
		}
		public void setZdtcount(Integer zdtcount) {
			this.zdtcount = zdtcount;
		}
		public DmpDataBaseTableBean(String sjklx, String sjkmc, String bm,
				String bhzmc, Integer zdtcount) {
			super();
			this.sjklx = sjklx;
			this.sjkmc = sjkmc;
			this.bm = bm;
			this.bhzmc = bhzmc;
			this.zdtcount = zdtcount;
		}
		public DmpDataBaseTableBean() {
			super();
		}
		 
}
