package com.digitalchina.ldp.app.csdsc.dao.impl;

import com.digitalchina.ldp.app.csdsc.bean.*;
import com.digitalchina.ldp.app.csdsc.dao.OnlineInformationDao;
import com.digitalchina.ldp.dao.BaseDao;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * @author 陈超 2014-7-15 下午03:44:57
 */
@Component
public class OnlineInformationDaoImpl extends BaseDao implements
		OnlineInformationDao {

	@Override
	public TotalPopulationInfoBean findTotalPopulationInfo(
			Map<String, Object> argMap) {
		StringBuilder sql = new StringBuilder();
		sql.append("select * from nqytjb t where 1=1 ");
		for (String key : argMap.keySet()) {
			sql.append(" and " + key + argMap.get(key));
		}
		return this.createSqlQuery(TotalPopulationInfoBean.class,
				sql.toString()).uniqueResult();
	}

	@Override
	public PopulationBaseInfoBean findPopulationBaseInfo(
			Map<String, Object> argMap) {
		StringBuilder sql = new StringBuilder();
		//sql.append("select t.*,a.*,b.zjlxmc zjlx,c.hkxzlxmc hkxz,d.qhmc DQHMC  from rk_rkjcxxb t  join rk_zjrksjb a on t.rkbs = a.rkbs  join rk_zjlxmb b on a.rk_zjlxmb_id = b.rk_zjlxmb_id  join rk_hkxzlxmb c on t.rk_hkxzlxmb_id = c.rk_hkxzlxmb_id left join  rk_xzqhmb d on t.rk_xzqhmb_id = d.Rk_Xzqhmb_Id where 1=1");
		sql.append("select t.*, a.*, b.zjlxmc zjlx, c.hkxzlxmc hkxz, d.qhmc DQHMC" +
				"  from rk_rkjcxxb t" +
				"  join rk_zjrksjb a" +
				"    on t.GMSFZH = a.SFZJH" +
				"  join rk_zjlxmb b" +
				"    on a.rk_zjlxmb_id = b.rk_zjlxmb_id" +
				"  join rk_hkxzlxmb c" +
				"    on t.rk_hkxzlxmb_id = c.rk_hkxzlxmb_id" +
				"  left join rk_xzqhmb d" +
				"    on t.rk_xzqhmb_id = d.Rk_Xzqhmb_Id" +
				" where 1 = 1");
		for (String key : argMap.keySet()) {
			sql.append(" and " + key + argMap.get(key));
		}
		return this
				.createSqlQuery(PopulationBaseInfoBean.class, sql.toString())
				.uniqueResult();
	}
	
	
	
	//获取人口详细信息
		@Override
		public List<Map<String, Object>> findPopulationXxInfo(Map<String, Object> argMap) {
			StringBuilder sql = new StringBuilder();
			sql.append("select t.*,a.*,b.zjlxmc zjlx,c.hkxzlxmc hkxz,d.qhmc DQHMC  from rk_rkjcxxb t  join rk_zjrksjb a on t.rkbs = a.rkbs  join rk_zjlxmb b on a.rk_zjlxmb_id = b.rk_zjlxmb_id  join rk_hkxzlxmb c on t.rk_hkxzlxmb_id = c.rk_hkxzlxmb_id left join  rk_xzqhmb d on t.rk_xzqhmb_id = d.Rk_Xzqhmb_Id where 1=1");	
			for (String key : argMap.keySet()) {
				sql.append(" and " + key + argMap.get(key));
			}

			return this.createJdbcTemplate().queryForList(sql.toString());
			
		}
	
	
	/**
	 
	@Override
	public PopulationBaseInfoBean getRkxxmhInfo(
			Map<String, Object> argMap) {
		StringBuilder sql = new StringBuilder();
		sql.append("select t.*,a.*,b.zjlxmc zjlx,c.hkxzlxmc hkxz,d.qhmc DQHMC  from rk_rkjcxxb t  join rk_zjrksjb a on t.rkbs = a.rkbs  join rk_zjlxmb b on a.rk_zjlxmb_id = b.rk_zjlxmb_id  join rk_hkxzlxmb c on t.rk_hkxzlxmb_id = c.rk_hkxzlxmb_id left join  rk_xzqhmb d on t.rk_xzqhmb_id = d.Rk_Xzqhmb_Id where 1=1");
		for (String key : argMap.keySet()) {
			sql.append(" and " + key + argMap.get(key));
		}
		System.out.println("------" + sql.toString());
		return this
				.createSqlQuery(PopulationBaseInfoBean.class, sql.toString())
				.uniqueResult();
	}
	* 
	 */
	
	@Override
	public List<Map<String, Object>> getRkxxmhInfo(Map<String, Object> argMap,
			String page, String count) {
		// 得到起始查询开始的位置
		int start = (Integer.parseInt(page) - 1) * Integer.parseInt(count) + 1;
		// 得到查询结束的位置
		int end = Integer.parseInt(page) * Integer.parseInt(count);
		// 得到起始查询开始的位置
		StringBuilder sql = new StringBuilder();
		//sql.append("select t.*,a.*,b.zjlxmc zjlx,c.hkxzlxmc hkxz,d.qhmc DQHMC from rk_rkjcxxb t  join rk_zjrksjb a on t.rkbs = a.rkbs  join rk_zjlxmb b on a.rk_zjlxmb_id = b.rk_zjlxmb_id  join rk_hkxzlxmb c on t.rk_hkxzlxmb_id = c.rk_hkxzlxmb_id left join  rk_xzqhmb d on t.rk_xzqhmb_id = d.Rk_Xzqhmb_Id where 1=1");
		sql.append("select t.*, a.*, b.zjlxmc zjlx, c.hkxzlxmc hkxz, d.qhmc DQHMC" +
				"  from rk_rkjcxxb t" +
				"  join rk_zjrksjb a" +
				"    on t.GMSFZH = a.SFZJH" +
				"  join rk_zjlxmb b" +
				"    on a.rk_zjlxmb_id = b.rk_zjlxmb_id" +
				"  join rk_hkxzlxmb c" +
				"    on t.rk_hkxzlxmb_id = c.rk_hkxzlxmb_id" +
				"  left join rk_xzqhmb d" +
				"    on t.rk_xzqhmb_id = d.Rk_Xzqhmb_Id" +
				" where 1 = 1");
		for (String key : argMap.keySet()) {
			sql.append(" and " + key + argMap.get(key));
		}
		
		/*for (String key : argMap.keySet()) {
			sql.append( key + argMap.get (key));
			sql.append("or " + key + argMap.get(key));
		}*/
		String sql1 = "select t1.xm,t1.cym,t1.xb,t1.mc,t1.ZJLX,t1.SFZJH,t1.DQHMC,t1.XZZ,t1.hyzk,t1.GLZT,t1.HKXZ,t1.csrr from (" + sql.toString()
				+ " order by sfzjh) t1 " ;
		System.out.println(sql1);
		return this.createJdbcTemplate().queryForList(sql1);
	}
	
	//人员信息全文检索
	@Override
	public List<Map<String, Object>> findRyxxqwjsInfo(Map<String, Object> argMap) {
		StringBuilder sql = new StringBuilder();
		sql.append("select t.*,a.*,b.zjlxmc zjlx,c.hkxzlxmc hkxz,d.qhmc DQHMC  from rk_rkjcxxb t  join rk_zjrksjb a on t.rkbs = a.rkbs  join rk_zjlxmb b on a.rk_zjlxmb_id = b.rk_zjlxmb_id  join rk_hkxzlxmb c on t.rk_hkxzlxmb_id = c.rk_hkxzlxmb_id left join  rk_xzqhmb d on t.rk_xzqhmb_id = d.Rk_Xzqhmb_Id where 1=1");
			for (String key : argMap.keySet()) {
			sql.append(" and " + key + argMap.get(key));
		}
		System.out.println(sql.toString());
		return this.createJdbcTemplate().queryForList(sql.toString());
		
	}
	
	
	
	
	@Override
	//法人信息模糊查询
	public List<Map<String, Object>> getFrmhInfo(Map<String, Object> argMap,
			String page, String count) {
		// 得到起始查询开始的位置
		int start = (Integer.parseInt(page) - 1) * Integer.parseInt(count) + 1;
		// 得到查询结束的位置
		int end = Integer.parseInt(page) * Integer.parseInt(count);
		// 得到起始查询开始的位置
		StringBuilder sql = new StringBuilder();
		sql.append("select * from fr_frjcb t where 1=1");
		for (String key : argMap.keySet()) {
			sql.append("and " + key + argMap.get(key));
		}

		String sql1 = "select * from (" + sql.toString()
				+ " order by ZZJGDM) t1 " ;
		System.out.println(sql1);
		return this.createJdbcTemplate().queryForList(sql1);
	}

	@Override
	public LegalPersonInfoBean findLegalPersonInfo(Map<String, Object> argMap) {
		StringBuilder sql = new StringBuilder();
		sql.append("select * from fr_frjcb t where 1=1");
		for (String key : argMap.keySet()) {
			sql.append(" and " + key + argMap.get(key));
		}
		return this.createSqlQuery(LegalPersonInfoBean.class, sql.toString())
				.uniqueResult();
	}

	@Override
	public List<Map<String, Object>> findMacroeconomicCode(
			Map<String, Object> argMap) {
		StringBuilder sql = new StringBuilder();
		sql.append("select zbdm from hg_hgjjtjb t where 1=1 ");
		String type = argMap.get("type")==null?"":argMap.get("type").toString();
		String time = argMap.get("time")==null?"":argMap.get("time").toString();
		String name = argMap.get("name")==null?"":argMap.get("name").toString();
		if("month".equals(type)){
			String[] times = time.split("-");
			int year =Integer.parseInt(times[0]);
			int month =Integer.parseInt(times[1]);
			sql.append(" and zbnd ="+year+" and zbjd is null and zbyf ='"+month+"'");
		}else if("year".equals(type)){
			int  year = Integer.parseInt(time);
			sql.append(" and zbnd ="+year+" and zbjd is null and zbyf is null");
		}
		if(!"".equals(name)){
			sql.append(" and zbqc like '%"+name+"%'");
		}
		sql.append(" order by zbdm");
		return this.createJdbcTemplate().queryForList(sql.toString());
	}
	
	@Override
	public List<MacroeconomicInfoBean> findMacroeconomicInfo(
			Map<String, Object> argMap) {
		List<String> list = (List<String>) argMap.get("list");
		String type = argMap.get("type")==null?"":argMap.get("type").toString();
		String time = argMap.get("time")==null?"":argMap.get("time").toString();
		StringBuilder sql = new StringBuilder();
		sql.append("select * from hg_hgjjtjb t where zbdm in ( ");
		for(String zbdm : list){
			sql.append("'"+zbdm+"',");
		}
		String  condition ="";
		if("month".equals(type)){
			String[] times = time.split("-");
			int year =Integer.parseInt(times[0]);
			int month =Integer.parseInt(times[1]);
			condition = " and zbnd ="+year+" and zbjd is null and zbyf ='"+month+"'";
		}else if("year".equals(type)){
			int  year = Integer.parseInt(time);
			condition = " and zbnd ="+year+" and zbjd is null and zbyf is null";
		}
		String allSql = sql.substring(0, sql.length()-1)+")"+condition+" order by zbdm";
		return this.createSqlQuery(MacroeconomicInfoBean.class, allSql).list();
	}

	/**
	 * 获取码表信息根据类型 1：身份证件类型 2：统计日期 3：行政区划
	 */
	@Override
	public List<Map<String, Object>> findMarkTableContentByType(
			Map<String, Object> argMap, int type) {
		StringBuilder sql = new StringBuilder();
		switch (type) {
		case 1:
			sql.append("select RK_ZJLXMB_ID dm,ZJLXMC mc from RK_ZJLXMB where SFYX = 0");
			break;
		case 2:
			sql.append("select * from V_TJNF ");
			break;
		case 3:
			sql.append("select tt.rk_xzqhmb_id DM,tt.qhmc MC from rk_xzqhmb tt where tt.pid is null union all "
					+ "select t.rk_xzqhmb_id DM,t.qhmc MC from rk_xzqhmb t where t.pid in (select tt.rk_xzqhmb_id from rk_xzqhmb tt where tt.pid is null)");
			break;
		case 4:
			sql.append("select t.rk_qfywzlmb_id dm,t.mc mc from rk_qfywzlmb t where SFYX = 0");
			break;

		}
		for (String key : argMap.keySet()) {
			sql.append(" and " + key + argMap.get(key));
		}
		return this.createJdbcTemplate().queryForList(sql.toString());
	}

	/**
	 * 婚姻登记查询
	 */
	@Override
	public List<Map<String, Object>> findMarriageRegister(String name, String papersNum) {
		StringBuilder sql = new StringBuilder();

		sql.append("select * from (" +
				"SELECT T.LHZZH ZZH," +
				"       T.LHDJRQ DJRQ," +
				"       T.ZFXM NAN," +
				"       T.ZFSFZJH NANZJ," +
				"       T.QZXM NV," +
				"       T.QZSFZJH NVZJ," +
				"       '离婚' DJXZ" +
				"  FROM RK_LHDJXX@jzk T" +
				" UNION ALL" +
				" SELECT T.JHZZH ZZH," +
				"       T.JHDJRQ DJRQ," +
				"       T.ZFXM NAN," +
				"       T.ZFSFZJH NANZJ," +
				"       T.QZXM NV," +
				"       T.QZSFZJH NVZJ," +
				"       '结婚' DJXZ" +
				"  FROM RK_JHDJXX@jzk T ) a" +
				" WHERE 1 = 1 ");

		sql.append("and ((NAN='"+name+"' and NANZJ='"+papersNum+"') or (NV='"+name+"' and NVZJ='"+papersNum+"'))");

		sql.append(" order by djrq desc");
		return this.createJdbcTemplate().queryForList(sql.toString());
	}

	@Override
	public void insertMaritalQueryLog(MaritalQueryLog bean) {
		this.createExecuteQuery().insert(bean, false);

	}

	@Override
	public void insertPrintLog(PrintLogBean bean) {
		this.createExecuteQuery().insert(bean, false);

	}

	@Override
	public String getPrintNum() {
		Calendar cal = Calendar.getInstance();
		int currentYear = cal.get(Calendar.YEAR);
		int year = this.createJdbcTemplate().queryForObject(
				"select year from current_year", Integer.class);
		if (currentYear > year) {
			this.createJdbcTemplate().execute(
					"update current_year set year=" + currentYear);
			this.createJdbcTemplate().execute("drop SEQUENCE SEQ_NUM ");
			this.createJdbcTemplate().execute("create SEQUENCE SEQ_NUM ");

		}
		String num = this.createJdbcTemplate().queryForObject(
				"select SEQ_NUM.nextval  from  dual", String.class);
		String str = "ZCS-" + currentYear + "-";
		String z = "";
		for (int i = num.length(); i < 5; i++) {
			z += "0";

		}
		str += z + num;
		return str;
	}

	@Override
	public List<Map<String, Object>> findAdministrativePunishment(
			Map<String, Object> argMap) {
		StringBuilder sql = new StringBuilder();
		sql.append("select * from XY_XZCFJLB where 1=1 ");
		for (String key : argMap.keySet()) {
			sql.append(" and " + key + argMap.get(key));
		}
		return this.createJdbcTemplate().queryForList(sql.toString());
	}

	@Override
	public List<Map<String, Object>> findHonor(Map<String, Object> argMap,
			int type) {
		StringBuilder sql = new StringBuilder();
		if (type == 1) {
			sql.append("select * from xy_yyxxbgr t join v_rkjc_sfzj x on t.rkbs = x.rkbs where 1=1 ");
		} else {
			sql.append("select * from xy_yyxxbfr t join fr_frjcb x on t.qybs = x.frbs where 1=1 ");
		}
		for (String key : argMap.keySet()) {
			sql.append(" and " + key + argMap.get(key));
		}
		return this.createJdbcTemplate().queryForList(sql.toString());
	}

	@Override
	public List<Map<String, Object>> findPublicUtilities(
			Map<String, Object> argMap, int type) {
		StringBuilder sql = new StringBuilder();// 江苏常熟农村商业银行股份有限公司大义支行
												// X3227479-4
		if (type == 1) {
			sql.append("select t.*,r.mc from xy_ggsyqfxxbgr t join rk_qfywzlmb r on t.rk_qfywzlmb_id = r.rk_qfywzlmb_id ");
		} else {
			sql.append("select * from xy_ggsyqfxxbfr t join fr_frjcb x on t.qybs = x.frbs where 1=1 ");
		}
		for (String key : argMap.keySet()) {
			sql.append(" and " + key + argMap.get(key));
		}
		return this.createJdbcTemplate().queryForList(sql.toString());
	}

	@Override
	public int getGajDataInfo_sum(Map<String, Object> argMap) {
		StringBuilder sql = new StringBuilder();
		sql.append("select count(*) as count from GAJSJB where 1=1");
		for (String key : argMap.keySet()) {
			sql.append(" and " + key + argMap.get(key));
		}
		Map<String, Object> map = this.createJdbcTemplate().queryForMap(
				sql.toString());
		return Integer.parseInt("" + map.get("count"));
	}

	@Override
	public List<Map<String, Object>> getGajDataInfo(Map<String, Object> argMap,
			String count, String page) {
		// 得到起始查询开始的位置
		int start = (Integer.parseInt(page) - 1) * Integer.parseInt(count) + 1;
		// 得到查询结束的位置
		int end = Integer.parseInt(page) * Integer.parseInt(count);
		StringBuilder sql = new StringBuilder();
		sql.append("select GAJSJB_ID,XM,IDCODE,MC,XB,TO_CHAR(CSRR,'yyyy-mm-dd hh24:mi:ss') CSRR,rownum as rowno from GAJSJB where 1=1");
		for (String key : argMap.keySet()) {
			sql.append(" and " + key + argMap.get(key));
		}
		String sql1 = "select * from (" + sql.toString()
				+ " order by GAJSJB.gajsjb_id) t1 where t1.rowno>=" + start
				+ " AND t1.rowno<=" + end;
		return this.createJdbcTemplate().queryForList(sql1);
	}

	@Override
	public int getJswDataInfo_sum(Map<String, Object> argMap) {
		StringBuilder sql = new StringBuilder();
		sql.append("select count(*) as count from JSWSJB where 1=1");
		for (String key : argMap.keySet()) {
			sql.append(" and " + key + argMap.get(key));
		}
		Map<String, Object> map = this.createJdbcTemplate().queryForMap(
				sql.toString());
		return Integer.parseInt("" + map.get("count"));
	}

	@Override
	public List<Map<String, Object>> getJswDataInfo(Map<String, Object> argMap,
			String count, String page) {
		// 得到起始查询开始的位置
		int start = (Integer.parseInt(page) - 1) * Integer.parseInt(count) + 1;
		// 得到查询结束的位置
		int end = Integer.parseInt(page) * Integer.parseInt(count);
		StringBuilder sql = new StringBuilder();
		sql.append("select t.*,rownum as rowno from JSWSJB t where 1=1");
		for (String key : argMap.keySet()) {
			sql.append(" and " + key + argMap.get(key));
		}
		String sql1 = "select * from (" + sql.toString()
				+ " order by t.JSWSJB_ID) t1 where t1.rowno>=" + start
				+ " AND t1.rowno<=" + end;
		return this.createJdbcTemplate().queryForList(sql1);
	}

	/*------------------------------------------------------------------------------------*/
	/* 一下为常熟开发 */

	@Override
	public ZzjgdmBean findZzjgdmDataInfo(Map<String, Object> argMap) {
		StringBuilder sql = new StringBuilder();
		sql.append("select *  from ZZJGDM   where 1=1");
		for (String key : argMap.keySet()) {
			sql.append(" and " + key + argMap.get(key));
		}
		System.out.println(sql.toString());
		return this.createSqlQuery(ZzjgdmBean.class, sql.toString())
				.uniqueResult();
	}

	@Override
	public List<Map<String,Object>> findSchoolDataInfo(Map<String, Object> argMap) {
		StringBuilder sql = new StringBuilder();
		sql.append("select XXMC,XXBSM,XXDM,ZGBM,JXNY,DWLB,XJ,XC,LXDH,WZ,DZ,YB from fr_jiaoyj_xxxx  where 1=1 ");
		for (String key : argMap.keySet()) {
			sql.append(" and " + key + argMap.get(key));
		}
		System.out.println(sql.toString());

		return this.createJdbcTemplate().queryForList(sql.toString());
	}

	@Override
	public List<Map<String, Object>> findRycbInfo(Map<String, Object> argMap,
			String page, String count) {
		// 得到起始查询开始的位置
		int start = (Integer.parseInt(page) - 1) * Integer.parseInt(count) + 1;
		// 得到查询结束的位置
		int end = Integer.parseInt(page) * Integer.parseInt(count);
		StringBuilder sql = new StringBuilder();
		sql.append("select t.* ,rownum as rowno from rk_rensj_rysbxx t where 1=1");
		for (String key : argMap.keySet()) {
			sql.append(" and " + key + argMap.get(key));
		}
		String sql1 = "select * from (" + sql.toString()
				+ " order by JFSD) t1 where t1.rowno>=" + start
				+ " AND t1.rowno<=" + end;
		System.out.println(sql1);
		return this.createJdbcTemplate().queryForList(sql1);
	}

	@Override
	public List<Map<String, Object>> findTdcrInfo(Map<String, Object> argMap,
			String page, String count) {
		// 得到起始查询开始的位置
		int start = (Integer.parseInt(page) - 1) * Integer.parseInt(count) + 1;
		// 得到查询结束的位置
		int end = Integer.parseInt(page) * Integer.parseInt(count);
		StringBuilder sql = new StringBuilder();
		sql.append("select t.* ,rownum as rowno from tdcrxx t where 1=1");
		for (String key : argMap.keySet()) {
			sql.append(" and " + key + argMap.get(key));
		}
		String sql1 = "select * from (" + sql.toString()
				+ " order by HTQDSJ) t1 where t1.rowno>=" + start
				+ " AND t1.rowno<=" + end;
		System.out.println(sql1);
		return this.createJdbcTemplate().queryForList(sql1);
	}

	@Override
	public SwInfoBean findSwInfo(Map<String, Object> argMap) {
		// 得到起始查询开始的位置
		StringBuilder sql = new StringBuilder();
		sql.append("select * from fr_guosj_swxx where 1=1 ");
		for (String key : argMap.keySet()) {
			sql.append("and " + key + argMap.get(key));
		}

		System.out.println(sql.toString());
		return this.createSqlQuery(SwInfoBean.class, sql.toString())
				.uniqueResult();
	}

	@Override
	public List<Map<String, Object>> findNsInfo(Map<String, Object> argMap,
			String page, String count) {
		// 得到起始查询开始的位置
		int start = (Integer.parseInt(page) - 1) * Integer.parseInt(count) + 1;
		// 得到查询结束的位置
		int end = Integer.parseInt(page) * Integer.parseInt(count);
		// 得到起始查询开始的位置
		StringBuilder sql = new StringBuilder();
		sql.append("select t.* ,rownum as rowno from swjnsxx t where 1=1 ");
		for (String key : argMap.keySet()) {
			sql.append("and " + key + argMap.get(key));
		}

		String sql1 = "select * from (" + sql.toString()
				+ " order by SJJE) t1 where t1.rowno>=" + start
				+ " AND t1.rowno<=" + end;
		System.out.println(sql1);
		return this.createJdbcTemplate().queryForList(sql1);
	}

	@Override
	public DbInfoBean findDbInfo(Map<String, Object> argMap) {
		StringBuilder sql = new StringBuilder();
		sql.append("select *  from DBXX   where 1=1");
		for (String key : argMap.keySet()) {
			sql.append(" and " + key + argMap.get(key));
		}
		System.out.println(sql.toString());
		return this.createSqlQuery(DbInfoBean.class, sql.toString())
				.uniqueResult();
	}

	@Override
	public void putJdccrkxkInfo(Map<String, Object> argMap) {
		StringBuilder sql1 = new StringBuilder();
		StringBuilder sql2 = new StringBuilder();
		sql1.append("insert into fr_jdccrkxk (ID");
		sql2.append(") values ('" + UUID.randomUUID() + "'");
		for (String key : argMap.keySet()) {
			sql1.append("," + key);
			sql2.append(",'" + argMap.get(key) + "'");
		}

		String sql = sql1.toString() + sql2.toString() + ")";

		System.out.println(sql);

		this.createJdbcTemplate().execute(sql);
	}

	@Override
	public void putCsdlkwxkxxInfo(Map<String, Object> argMap) {
		StringBuilder sql1 = new StringBuilder();
		StringBuilder sql2 = new StringBuilder();
		sql1.append("insert into fr_csdlkwxkxx (ID");
		sql2.append(") values ('" + UUID.randomUUID() + "'");
		for (String key : argMap.keySet()) {
			sql1.append("," + key);
			sql2.append(",'" + argMap.get(key) + "'");
		}

		String sql = sql1.toString() + sql2.toString() + ")";

		System.out.println(sql);

		this.createJdbcTemplate().execute(sql);
	}
	
	
	@Override
	public void putHwggszxxInfo(Map<String, Object> argMap) {
		StringBuilder sql1 = new StringBuilder();
		StringBuilder sql2 = new StringBuilder();
		sql1.append("insert into FR_HWGGSZXX (ID");
		sql2.append(") values ('" + UUID.randomUUID() + "'");
		for (String key : argMap.keySet()) {
			sql1.append("," + key);
			sql2.append(",'" + argMap.get(key) + "'");
		}

		String sql = sql1.toString() + sql2.toString() + ")";

		System.out.println(sql);

		this.createJdbcTemplate().execute(sql);
	}
	
	
	@Override
	public void putSgzycsdlxkxxInfo(Map<String, Object> argMap) {
		StringBuilder sql1 = new StringBuilder();
		StringBuilder sql2 = new StringBuilder();
		sql1.append("insert into FR_SGZYCSDLXKXX (ID");
		sql2.append(") values ('" + UUID.randomUUID() + "'");
		for (String key : argMap.keySet()) {
			sql1.append("," + key);
			sql2.append(",'" + argMap.get(key) + "'");
		}

		String sql = sql1.toString() + sql2.toString() + ")";

		System.out.println(sql);

		this.createJdbcTemplate().execute(sql);
	}
	
	@Override
	public void putJyxzycsdlxkxxInfo(Map<String, Object> argMap) {
		StringBuilder sql1 = new StringBuilder();
		StringBuilder sql2 = new StringBuilder();
		sql1.append("insert into FR_JYXZYCSDLXKXX (ID");
		sql2.append(") values ('" + UUID.randomUUID() + "'");
		for (String key : argMap.keySet()) {
			sql1.append("," + key);
			sql2.append(",'" + argMap.get(key) + "'");
		}

		String sql = sql1.toString() + sql2.toString() + ")";

		System.out.println(sql);

		this.createJdbcTemplate().execute(sql);
	}
	

	//全文检索_教育信息
	@Override
	public RyxxBean getJyxx(Map<String, Object> argMap) {
		StringBuilder sql = new StringBuilder();
		RyxxBean bean = new RyxxBean();
		sql.append(" SELECT * FROM EDUCATION_INFO T WHERE 1 = 1 ");
		for (String key : argMap.keySet()) {
			sql.append(" and " + key + argMap.get(key));
		}
		List<Map<String,Object>> zero = this.createJdbcTemplate().queryForList(sql.toString());
		bean.setZero(zero);
		return bean;
	}
	
	//全文检索_工作经历
	@Override
	public RyxxBean getGzjl(Map<String, Object> argMap) {
		StringBuilder sql = new StringBuilder();
		RyxxBean bean = new RyxxBean();
		sql.append(" SELECT * FROM WORK_INFO T WHERE 1 = 1 ");
		for (String key : argMap.keySet()) {
			sql.append(" and " + key + argMap.get(key));
		}
		List<Map<String,Object>> zero = this.createJdbcTemplate().queryForList(sql.toString());
		bean.setZero(zero);
		return bean;
	}
	
	//全文检索_固定资产
		@Override
		public RyxxBean getGdzc(Map<String, Object> argMap) {
			StringBuilder sql = new StringBuilder();
			RyxxBean bean = new RyxxBean();
			sql.append(" SELECT * FROM ASSET_INFO T WHERE 1 = 1 ");
			for (String key : argMap.keySet()) {
				sql.append(" and " + key + argMap.get(key));
			}
			List<Map<String,Object>> zero = this.createJdbcTemplate().queryForList(sql.toString());
			bean.setZero(zero);
			return bean;
		}

		//全文检索_资质证书
		@Override
		public RyxxBean getZzzs(Map<String, Object> argMap) {
			StringBuilder sql = new StringBuilder();
			RyxxBean bean = new RyxxBean();
			sql.append(" SELECT * FROM CERTIFICATE_INFO T WHERE 1 = 1 ");
			for (String key : argMap.keySet()) {
				sql.append(" and " + key + argMap.get(key));
			}
			List<Map<String,Object>> zero = this.createJdbcTemplate().queryForList(sql.toString());
			bean.setZero(zero);
			return bean;
		}

		//全文检索_行政处罚
		@Override
		public RyxxBean getXzcf(Map<String, Object> argMap) {
			StringBuilder sql = new StringBuilder();
			RyxxBean bean = new RyxxBean();
			sql.append(" SELECT * FROM PUNISH_INFO T WHERE 1 = 1 ");
			for (String key : argMap.keySet()) {
				sql.append(" and " + key + argMap.get(key));
			}
			List<Map<String,Object>> zero = this.createJdbcTemplate().queryForList(sql.toString());
			bean.setZero(zero);
			return bean;
		}

		//全文检索_奖励信息
		@Override
		public RyxxBean getJlqk(Map<String, Object> argMap) {
			StringBuilder sql = new StringBuilder();
			RyxxBean bean = new RyxxBean();
			sql.append(" SELECT * FROM REAWRD_INFO T WHERE 1 = 1 ");
			for (String key : argMap.keySet()) {
				sql.append(" and " + key + argMap.get(key));
			}
			List<Map<String,Object>> zero = this.createJdbcTemplate().queryForList(sql.toString());
			bean.setZero(zero);
			return bean;
		}
		
		
		//全文检索_家庭关系信息
        @Override
        public RyxxBean getJtgx(Map<String, Object> argMap) {
            StringBuilder sql = new StringBuilder();
            RyxxBean bean = new RyxxBean();
            sql.append(" SELECT * FROM FAMILY_INFO T WHERE 1 = 1 ");
            for (String key : argMap.keySet()) {
                sql.append(" and " + key + argMap.get(key));
            }
            List<Map<String,Object>> zero = this.createJdbcTemplate().queryForList(sql.toString());
            bean.setZero(zero);
            return bean;
        }
    /*
     * 全文检索_相关信息(人口，法人，征信)
     * @see
     */
	@Override
	public List<Map<String, Object>> getFormConfig(String table) {
        String Sql="";
		if("".equals(table)){
            Sql = "select * from RKTP_FORM_CONFIG t";
        }else{
            Sql = "select * from RKTP_FORM_CONFIG t where t.table_name = '" +table+"'";
        }
        List<Map<String,Object>> config = this.createJdbcTemplate().queryForList(Sql);

		return config;
	}

    @Override
    public List<Map<String, Object>> getRKTPQueryType(){
        String Sql ="select * from rktp_query_value ";
        List<Map<String,Object>> list = this.createJdbcTemplate().queryForList(Sql);
        return list;
    }

    @Override
    public List<Map<String, Object>> getDBHCData(List<String> list,String start,String end){
        String Sql ="select t.hh,t.xm,t.sfzh, t.yhzgx, t.hjxz,t.hjdz,t.jtzz,t.dbbzlb,t.sczs,t.xb,t.nl,t.mz,t.zzmm, t.jyzk," +
                "t.ldnl, t.jkzk, t.yjgjjse, t.gszczj, t.fclx, t.fcjg, t.fcmj, t.fcwz,t.yxssbje, t.sfycl, t.nsqk" +
                " from  DLSMZHJ_DBHC@sjyy t where t.hh in (select hh "+
                "  from DLSMZHJ_DBHC@sjyy t where ((t.zxrq <'"+end+"' and t.kyrq > '"+start+"') " +
                "   or (t.zxrq is null and t.kyrq is null) or (t.zxrq ='未知' and t.kyrq ='未知')) ";
        if(list.size()>=1) {
            int i = 0;
            for (String str : list) {
                if (i == 0) {
                    Sql = Sql + " and (sfzh='" + str + "'";
                } else {
                    Sql = Sql + " or sfzh='" + str + "'";
                }
                i++;
            }
            Sql = Sql + ")";
        }
        Sql = Sql + ") ORDER  by t.hh";
        System.out.println(Sql);
        List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
        return reslut;
    }

    @Override
    public List<Map<String, Object>> getLYFX_RZL(String start,String end){

        String Sql ="select * from rk_kyfx_rzl@sjyy where ";
        Sql = Sql+ " tjyf >= '"+start+"' AND tjyf <= '" +end +"' order by tjyf";
        System.out.println(Sql);
        List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
        return reslut;
    }


    @Override
    public List<Map<String, Object>> getLYFX_RZL_EXPORT(String start,String end){

        String Sql ="select tjyf,tsmjkzrzl,xjjdrzl,jjxjdrzl from rk_kyfx_rzl@sjyy where ";
        Sql = Sql+ " tjyf >= '"+start+"' AND tjyf <= '" +end +"' order by tjyf";
        System.out.println(Sql);
        List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
        return reslut;
    }

    @Override
    public List<Map<String, Object>> getKYTJ_TJXB(String tjyf,String name){
        String Sql ="select xb,sum(gs) sum from rk_kyfx_tjxb@sjyy where tjyf='"+tjyf+"'";
        if(!name.equals("总数")){
           Sql=Sql+ "and sf='"+name+"'";
        }
        Sql=Sql+" group by xb";
        System.out.println(Sql);
        List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
        return reslut;
    }

    @Override
    public List<Map<String, Object>> getKYTJ_TJNL(String tjyf,String name){
        String Sql ="select nl,sum(gs) sum from rk_kyfx_tjnl@sjyy where tjyf='"+tjyf+"'";
        if(!name.equals("总数")){
            Sql=Sql+ "and sf='"+name+"'";
        }
        Sql=Sql+" group by nl order by nl";
        System.out.println(Sql);
        List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
        return reslut;
    }

    @Override
    public List<Map<String, Object>> getKYTJ_TJRS_SF(String start,String end){
        String Sql ="select  sf name,sum(gs) value from rk_kyfx_tjsf@sjyy where ";
        Sql = Sql+ " tjyf >= '"+start+"' AND tjyf <= '" +end +"' group by sf order by value";
        System.out.println(Sql);
        List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
        return reslut;
    }

    @Override
    public List<Map<String, Object>> getKYTJ_SFTJ(String start,String end,String name){
        String Sql ="select  sf name,gs value,tjyf from rk_kyfx_tjsf@sjyy where ";
        Sql = Sql+ " tjyf >= '"+start+"' AND tjyf <= '" +end +"' and sf='"+name+"' order by value";
        System.out.println(Sql);
        List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
        return reslut;
    }

    @Override
    public List<Map<String, Object>> getKYTJ_TJRS_TJYF(String start,String end){
        String Sql ="select tjyf,sum(gs) sum from rk_kyfx_tjsf@sjyy where ";
        Sql = Sql+ " tjyf >= '"+start+"' AND tjyf <= '" +end +"'  group by tjyf order by tjyf";
        System.out.println(Sql);
        List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
        return reslut;
    }

    @Override
    public List<Map<String, Object>> getKZFX(String start,String end){
        String Sql ="select * from rk_kzfx@sjyy where ";
        Sql = Sql+ " tjyf >= '"+start+"' AND tjyf <= '" +end +"' and wz is not null order by tjyf";
        System.out.println(Sql);
        List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
        return reslut;
    }

    public List<Map<String, Object>> getKZFX_tj(String type,String tjyf){
        String Sql ="select * from rk_kzfx@sjyy where ";
        Sql = Sql+ " tjyf = '"+tjyf+"' AND type = '" +type +"' and wz is not null order by wz";
        System.out.println(Sql);
        List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
        return reslut;
    }


    @Override
    public List<Map<String, Object>> getLYZF(String name){
        String Sql ="select lgmc,lgdz,fr,lgdh from v_fr_lgjbxx@jzk where ";
        Sql = Sql+ " lgmc like '%"+name+"%'";
        System.out.println(Sql);
        List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
        return reslut;
    }
   @Override
   public List<Map<String, Object>> getCLXXCX(String cph){
       String Sql ="select * from v_rktp_vehicle where cphm like '%"+cph+"%'";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }

    //获取家庭成员的身份证号
    @Override
    public List<Map<String, Object>> getJTCYSFZH(String sfzjh) {
        String Sql ="select sfzh from v_rktp_rkjbxx where hh in(select hh from v_rktp_rkjbxx where sfzh ='"+sfzjh+"')";
        System.out.println(Sql);
        List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
        return reslut;
    }

    //常住人口信息
  @Override
   public List<Map<String, Object>> getJTRYXX(List<Map<String,Object>> sfzjh){
       String condition = "";
       int len=sfzjh.size();
       for(int i=0;i<len;i++){
           condition=condition+"'"+sfzjh.get(i).get("SFZH")+"',";
       }
      condition=condition.substring(0,condition.length()-1);
       String Sql ="select * from v_rktp_rkjbxx where sfzh in("+condition+")";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }

    //车辆信息
    @Override
    public List<Map<String, Object>> getCLXX(List<Map<String,Object>> sfzjh){
        String condition = "";
        int len=sfzjh.size();
        for(int i=0;i<len;i++){
            condition=condition+"'"+sfzjh.get(i).get("SFZH")+"',";
        }
        condition=condition.substring(0,condition.length()-1);
        String Sql ="select t.jdcsyr,t.sfzh,t.hphm,t.fdjh from dlsgaj_clxx@jzk t  where t.sfzh in ("+condition+")";
        System.out.println(Sql);
        List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
        return reslut;
    }

    //房产信息
    @Override
    public List<Map<String, Object>> getFCXX(List<Map<String,Object>> sfzjh){
        String condition = "";
        int len=sfzjh.size();
        for(int i=0;i<len;i++){
            condition=condition+"'"+sfzjh.get(i).get("SFZH")+"',";
        }
        condition=condition.substring(0,condition.length()-1);
        String Sql ="select t.xm,t.sfzh,t.mj,t.zl  from  v_rktp_fcxx t  where t.sfzh in ("+condition+")";
        System.out.println(Sql);
        List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
        return reslut;
    }

    //婚姻信息
    @Override
    public List<Map<String, Object>> getHYXX(List<Map<String,Object>> sfzjh){
        String condition = "";
        int len=sfzjh.size();
        for(int i=0;i<len;i++){
            condition=condition+"'"+sfzjh.get(i).get("SFZH")+"',";
        }
        condition=condition.substring(0,condition.length()-1);
        String Sql ="select * from  v_rktp_hydjxx t  where t.zfsfzjh in ("+condition+") or t.qzsfzjh in ("+condition+")";
        System.out.println(Sql);
        List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
        return reslut;
    }

    //工商注册信息
    @Override
    public List<Map<String, Object>> getGSZCXX(List<Map<String,Object>> sfzjh){
        String condition = "";
        int len=sfzjh.size();
        for(int i=0;i<len;i++){
            condition=condition+"'"+sfzjh.get(i).get("SFZH")+"',";
        }
        condition=condition.substring(0,condition.length()-1);
        String Sql ="select * from  v_ajcx_gszcxx t  where t.sfzh in ("+condition+")";
        System.out.println(Sql);
        List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
        return reslut;
    }

    //纳税信息
    @Override
    public List<Map<String, Object>> getNSXX(List<Map<String,Object>> sfzjh){
        String condition = "";
        int len=sfzjh.size();
        for(int i=0;i<len;i++){
            condition=condition+"'"+sfzjh.get(i).get("SFZH")+"',";
        }
        condition=condition.substring(0,condition.length()-1);
        String Sql ="select * from  v_ajcx_nsxx t  where t.sfzh in ("+condition+")";
        System.out.println(Sql);
        List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
        return reslut;
    }

   @Override
   public List<Map<String, Object>> getXXHS(String name,String sfzjh){
       String Sql ="select * from RK_JSRYXX where sfzh ='"+sfzjh+"'";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }
   @Override
   public List<Map<String, Object>> getJYHC(String name,String sfzjh){
       String Sql ="select * from v_rktp_rkjbxx where sfzh ='"+sfzjh+"'";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }
   @Override
   public List<Map<String, Object>> getYLFX(String startDate,String endDate){
       String Sql =" select * from hgjj_ylfx t where tjyf >='"+startDate+"' and tjyf <='"+endDate+"' ";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }
   @Override
   public List<Map<String, Object>> getTWAZ(String dwmc,String gwlb,String ryfl){
       String Sql ="select * from V_FR_SYDWRYBZ where mc like '%"+dwmc+"%'";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }
   @Override
   public List<Map<String, Object>> getHNBT(String sfzjh,String name){
       String Sql ="select * from v_rk_hnbt where xm like '%"+name+"%' and sfzh='"+sfzjh+"'";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }
   @Override
   public List<Map<String, Object>> getSSMZYERYL(String endDate,String startDate){
       String Sql ="select * from rk_ssmzyeryl t where tjyf >= '"+startDate+"' and tjyf<='"+endDate+"' order by tjyf";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);

       return reslut;
   }
   @Override
   public List<Map<String, Object>> getYLBX(String sfzjh,String name){
       String Sql ="select t.grbh,to_char(t.csrq,'yyyy-mm-dd') csrq,t.xm,t.dwbh,t.dwmc,to_char(t.cbsj,'yyyy-mm-dd') cbsj,to_char(t.cjgzrq,'yyyy-mm-dd') cjgzrq from RK_RSJDWZGYLBXCBDJXX@jzk t where t.gmsfhm='"+sfzjh+"' and t.xm='"+name+"'";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }
   @Override
   public List<Map<String, Object>> getYILBX(String sfzjh,String name){
       String Sql ="select * from RK_RSJDWZGYLBXJBXX@jzk t where t.zjzl='111' and t.zjhm='"+sfzjh+"' and t.xm='"+name+"'";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }
   @Override
   public List<Map<String, Object>> getSYBX(String sfzjh,String name){
       String Sql ="select * from RK_RSJRYSYBXCBDJXX@jzk t where t.zjlx='111' and t.zjhm='"+sfzjh+"' and t.xm='"+name+"'";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }

    @Override
    public List<Map<String, Object>> getJZRY(String sfzjh,String name){
        String Sql ="select * from rk_jzry@jzk t where t.sfzhm ='"+sfzjh+"' and t.xm='"+name+"'";
        System.out.println(Sql);
        List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
        return reslut;
    }

    @Override
   public List<Map<String, Object>> getZJSTJG(String stname){
       String Sql ="select * from V_FR_ZJTT@jzk t where t.mc like '%"+stname+"%'";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }
   @Override
   public List<Map<String, Object>> getTSMZXSGL(String xxname){
       String Sql ="select DISTINCT t.xxmc from rk_tssmzxsgl t where t.xxmc like '%"+xxname+"%'";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }

    public List<Map<String, Object>> getTSMZXSGLDetail(String xxname){
        String Sql ="select * from rk_tssmzxsgl t where t.xxmc = '"+xxname+"'";
        System.out.println(Sql);
        List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
        return reslut;
    }

   @Override
   public List<Map<String, Object>> getLDSSMZGL(String sfzjh,String name){
       String Sql ="select t.xm,t.xb,t.sfzhm,t.mz,t.dbsrq,t.dbsyy,t.lxdh,t.jzdz from RK_LDRKXX@jzk t where t.mz<>'汉族' and t.xm = '"+name+"' and t.sfzhm = '"+sfzjh+"'";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }
   @Override
   public List<Map<String, Object>> getSSMZFX(){
       String Sql ="select * from rk_yy_ssmzfx t";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }

    @Override
    public List<Map<String, Object>> getLDSSMZFX(){
        String Sql ="select * from rk_yy_ldssmzfx t";
        System.out.println(Sql);
        List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
        return reslut;
    }
   @Override
   public List<Map<String, Object>> getzsjg(String srr){
       String Sql ="select * from fr_zsjg t where t.srr like '%"+srr+"%'";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }
   @Override
   public List<Map<String, Object>> getJZRYJG(String sfzjh,String name){
       String Sql ="select * from RK_JZRYJG t where t.xm = '"+name+"' and t.sfzhm=  '"+sfzjh+"'";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }
   @Override
   public List<Map<String, Object>> getKBRYXXXX(String name){
       String Sql ="select * from fr_yy_twazkbry t where t.dwmc= '"+name+"'";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }
   @Override
   public List<Map<String, Object>> getGSXZCF(String sfzjh){
       String Sql ="select * from zx_gsjxzcfxx_mh t where t.sfzh= '"+sfzjh+"'";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }
   @Override
   public List<Map<String, Object>> getFYZFRY(String sfzjh){
       String Sql ="select * from rk_fyzxry_mh t where t.sfzh= '"+sfzjh+"'";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }
   @Override
   public List<Map<String, Object>> getGONGSXZCF(String sfzjh){
       String Sql ="select * from zx_gongsjxzcf_mh t where t.sfzh= '"+sfzjh+"'";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }
   @Override
   public List<Map<String, Object>> getAJXZCF(String sfzjh){
       String Sql ="select * from zx_ajjxzcfxx_mh t where t.sfzh= '"+sfzjh+"'";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }
   @Override
   public List<Map<String, Object>> getCXZDXZCF(String sfzjh){
       String Sql ="select * from zx_cxgyyqgjswjxzcfxx_mh t where t.sfzh= '"+sfzjh+"'";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }
   @Override
   public List<Map<String, Object>> getZJZDXZCF(String sfzjh){
       String Sql ="select * from zx_ajjzdxzcfxx_mh t where t.sfzh= '"+sfzjh+"'";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }
   @Override
   public List<Map<String, Object>> getFZZDXZCF(String sfzjh){
       String Sql ="select * from zx_fzjzdxzcfajxx_mh t where t.sfzh= '"+sfzjh+"'";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }
   @Override
   public List<Map<String, Object>> getHPXXCX(String dwmc){
       String Sql ="select * from fr_hpxxcx t where t.dwmc = '"+dwmc+"'";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }

    @Override
    public List<Map<String, Object>> getHPXXCXItem(String dwmc){
        String Sql ="select distinct dwmc from fr_hpxxcx t where t.dwmc like '%"+dwmc+"%'";
        System.out.println(Sql);
        List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
        return reslut;
    }

   @Override
   public List<Map<String, Object>> getSPAQXC(String stmc){
       String Sql ="select * from FR_YY_SPAQXC t where t.stmc like '%"+stmc+"%'";
       System.out.println(Sql);
       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
       return reslut;
   }



    public int addApplictionTimes(String  rdpUserName, String rdpUserOrg,
                                  String rdpUserOrgId, String rdploginName,
                                  String useCount, String useTime, String applicationName){
        String Sql ="insert into yy_yysytj (username,userorg,userorgid,usecount,usetime,loginname,applicationname) " +
                    "values ('"+rdpUserName+"','"+rdpUserOrg+"','"+rdpUserOrgId+"','"+useCount+"'," +
                     "'"+useTime+"','"+rdploginName+"','"+applicationName+"')";

        System.out.println(Sql);
        int reslut = this.createJdbcTemplate().update(Sql);
        return reslut;
    }


	public List<Map<String, Object>> getApplictionDesc(String type){
		String Sql ="select * from application_desc t where t.name = '"+type+"'";
		System.out.println(Sql);
		List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
		return reslut;
	}
	public List<Map<String, Object>> getApplictionDataType(String type){
		String Sql ="select * from application_data_type t where t.name = '"+type+"'";
		System.out.println(Sql);
		List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);
		return reslut;
	}

	public int addFtpUploadFileLog(String uuid,String  webUserName, String uploadTime,
								  String desc,
								  String type, String ftpUserName){
		String Sql ="insert into ftp_submit_file_log (uuid,web_user_name,operate_time,operate_desc,type,ftp_user_name) " +
				"values ('"+uuid+"','"+webUserName+"','"+uploadTime+"','"+desc+"'," +
				"'"+type+"','"+ftpUserName+"')";

		System.out.println(Sql);
		int reslut = this.createJdbcTemplate().update(Sql);
		return reslut;
	}

}
