package com.digitalchina.ldp.app.dmp.bean;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;
@Table(name="DMP_DM_WBJ")
public class DmpDmJhmodeBean implements java.io.Serializable{	
		@Column(name="WBJBM")
		//委办局编码
		private String wbjbm;
		//委办局简称
		@Column(name="WBJJC")
		private String wbjjc;
		//委办局全称
		@Column(name="WBJQC")
		private String wbjqc;
		//交换模式
		@Column(name="JHMODE")
		private String jhmode;
		public DmpDmJhmodeBean(String wbjbm, String wbjjc, String wbjqc,
				String jhmode) {
			super();
			this.wbjbm = wbjbm;
			this.wbjjc = wbjjc;
			this.wbjqc = wbjqc;
			this.jhmode = jhmode;
		}
		public DmpDmJhmodeBean() {
			super();
		}
		public String getWbjbm() {
			return wbjbm;
		}
		public void setWbjbm(String wbjbm) {
			this.wbjbm = wbjbm;
		}
		public String getWbjjc() {
			return wbjjc;
		}
		public void setWbjjc(String wbjjc) {
			this.wbjjc = wbjjc;
		}
		public String getWbjqc() {
			return wbjqc;
		}
		public void setWbjqc(String wbjqc) {
			this.wbjqc = wbjqc;
		}
		public String getJhmode() {
			return jhmode;
		}
		public void setJhmode(String jhmode) {
			this.jhmode = jhmode;
		}
		
}
