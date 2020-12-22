package com.digitalchina.ldp.app.csdsc.service.impl;

import com.digitalchina.ldp.app.csdsc.comm.StringUtils;
import com.digitalchina.ldp.app.csdsc.dao.StatisticChartDaoSJTJ;
import com.digitalchina.ldp.app.csdsc.service.StatisticChartServiceSJTJ;
import com.digitalchina.ldp.bean.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StatisticChartServiceSJTJImpl implements StatisticChartServiceSJTJ {

	@Autowired
	private StatisticChartDaoSJTJ statisticChartDao;

	@Override
	public List<Map<String, Object>> getXzqh() {
		return this.statisticChartDao.getXzqh();
	}

	@Override
	public List<Map<String, Object>> getFrDqfbtj(Model model) {
		String tjnf = model.getValueNotEmpty("tjnf");
		return statisticChartDao.getSqlResult(
				"select t.xzqh qhmc,t.qysl num from tjfx_frdqfbtj t where t.nd=?", new Object[]{tjnf});
	}

	@Override
    public List getSletrxtjList(Model model) {
        int startYear = model.getInt("startYear");
        int endYear = model.getInt("endYear");
        String sql = "select * from JTYSLKZZLTJ_TJFX  WHERE 1 = 1 \n" +
                "                  and to_number(TJNF) >= ?\n" +
                "                      AND to_number(TJNF)<=?\n" +
                "                ORDER BY to_number(TJNF)";
        return statisticChartDao.getSqlResult(sql, new Object[]{startYear, endYear});
    }
	
	@Override
    public List getRkzzqdList(Model model) {
        int startYear = model.getInt("startYear");
        int endYear = model.getInt("endYear");
        String sql = "select * from TG_RKZZQD_TJFX  WHERE 1 = 1 and to_number(TJNF) >= ?"+
        "AND to_number(TJNF)<= ? ORDER BY to_number(TJNF)";
        return statisticChartDao.getSqlResult(sql, new Object[]{ startYear, endYear});
    }

	@Override
    public List getSwrkjsyList(Model model) {
        int startYear = model.getInt("startYear");
        int endYear = model.getInt("endYear");
        String sql = "SELECT TJNF,SWRSNAN,SWRSNV,ZRSWL,SGSWL,BBSWL  FROM TG_SWRKJSY_TJFX WHERE 1 = 1 " +
                "and to_number(TJNF) >= ? AND to_number(TJNF)<= ?  ORDER BY to_number(TJNF)";
        return statisticChartDao.getSqlResult(sql, new Object[]{startYear, endYear});
    }

	@Override
    public List getRkxbnljgList(Model model) {
        Map<String, Object> argMap = new HashMap<String, Object>();
        String tjnf = model.getValueNotEmpty("tjnf");
        argMap.put(" TGNF = ", tjnf);
        return statisticChartDao.getRkxbnljgList(argMap);
    }

	@Override
    public Map getHgjjbyXzqhs(Model model) {
        String zbdms = model.getValueNotEmpty("zbdms");
        String xzqhs = model.getValueNotEmpty("xzqhs");
        int type = model.getInt("type");
        return getMap(statisticChartDao.getHgjjbyXzqhs(type, zbdms, xzqhs));
	}

    @Override
    public Map getHgjjbyNd(Model model) {
        String zbdms = model.getValueNotEmpty("zbdms");
        String xzqh = model.getValueNotEmpty("xzqh");
        String nd = model.getValue("nd");

        return getMap(statisticChartDao.getHgjjbyNd(zbdms, xzqh, nd));
    }

    private Map getMap(List<Map<String, Object>> sqlResult) {
        Map<String, Map> resultMap = new HashMap<String, Map>();
        String qhdm, qhmc, zbdm, zbmc, zbdw, dqz, nd;
        for (Map map : sqlResult) {
            qhdm = (String) map.get("QHDM");
            qhmc = (String) map.get("QHMC");
            zbdm = (String) map.get("ZBDM");
            zbmc = (String) map.get("ZBMC");
            zbdw = (String) map.get("ZBDW");
            dqz = (String) map.get("DQZ");
            nd = (String) map.get("ND");
            if (!resultMap.containsKey(qhdm)) {
                resultMap.put(qhdm, new HashMap());
            }
            if (!resultMap.get(qhdm).containsKey("QHMC")) {
                resultMap.get(qhdm).put("QHMC", qhmc);
            }
            if (!resultMap.get(qhdm).containsKey(zbdm)) {
                resultMap.get(qhdm).put(zbdm, new HashMap());
            }
            if (!((Map) resultMap.get(qhdm).get(zbdm)).containsKey("QHMC")) {
                ((Map) resultMap.get(qhdm).get(zbdm)).put("ZBMC", zbmc);
                ((Map) resultMap.get(qhdm).get(zbdm)).put("ZBDW", zbdw);
                ((Map) resultMap.get(qhdm).get(zbdm)).put("ND", nd);
                ((Map) resultMap.get(qhdm).get(zbdm)).put("DQZ", dqz);
            }
        }

        return resultMap;
    }

	@Override
	public Map getHgjjZbpm(Model model) {
		String xzqh = model.getValue("xzqh");
		String nf = model.getValue("nf");

		Map resultMap = new HashMap();

		String sql_pm_tb = "select t.*,ROWNUM nm from （SELECT t0.ZBSSDQ," +
                "       t0.zbmc," +
                "       t0.ZBSJDW," +
                "       nvl(t0.zbsj, 0) zbsj," +
                "       t0.sjrq," +
                "       rank() OVER(PARTITION BY t0.zbdm ORDER BY nvl(t0.zbsj, 0) DESC) pm" +
                "  FROM MACRO_DATA t0\n" +
                " where  t0.zblx = '年度'" +
                "   AND t0.SJRQ = ? ） t where t.zbssdq = ?" +
                "   and ROWNUM<6 ";
		resultMap.put("指标数值排名", statisticChartDao.getSqlResult(sql_pm_tb, new Object[]{nf, xzqh}));

		return resultMap;
	}

	@Override
	public Map getHgjjDqpm(Model model) {
		String xzqh = model.getValueNotEmpty("xzqh");
		String nf = model.getValue("nf");
		String zbdm = model.getValueNotEmpty("zbdm");

        if("init".equals(nf)){
            String sqlNf="SELECT max(sjrq) sjrq  FROM MACRO_DATA data  WHERE data.zbdm =?  AND data.zblx = '年度' ";
            List<Map<String,Object>> list =statisticChartDao.getSqlResult(sqlNf, new Object[]{zbdm});
            if(list.size()>=1){
               nf= StringUtils.objToString(list.get(0).get("SJRQ"));
            }else{
              int year= new Date().getYear()-1;
                nf=year+"";
            }
        }

		Map resultMap = new HashMap();
		String sql_dq_tb="SELECT t.*, ROWNUM pm" +
                "  FROM (SELECT nvl(data.zbsj, 0) zbsj, data.zbssdq qhmc, data.ZBSSDQ, data.ZBSJDW,data.sjrq" +
                "          FROM MACRO_DATA data" +
                "         WHERE data.zbdm =? " +
                "           AND data.zblx = '年度'" +
                "           AND data.SJRQ = ?" +
                "         ORDER BY nvl(data.zbsj, 0) DESC) t";

		System.out.println(sql_dq_tb);
		resultMap.put(xzqh, statisticChartDao.getSqlResult(sql_dq_tb, new Object[]{zbdm, nf}));

		return resultMap;
	}

    @Override
    public List getSksjzjsltj(Model model) {
        String sql = "SELECT\n" +
                "  sbj_nm,\n" +
                "  sum(ZXQZ_CURRENT_MONTH_COUNT)                         ZXQZ_CURRENT_MONTH_COUNT,\n" +
                "  sum(ZXQZ_TOTAL_COUNT) - sum(ZXQZ_CURRENT_MONTH_COUNT) ZXQZ_TOTAL_COUNT\n" +
                "FROM V_STAT_CATEGORY\n" +
                "GROUP BY SBJ_NM";
        return statisticChartDao.getSqlResult(sql);
    }

    @Override
    public List getGwbjsjtjltj(Model model) {
        String wbjmc = model.getValue("wbjmc");
        if(wbjmc.isEmpty()){
            String sql = "select t.*,ROWNUM AS rn from (SELECT  ORG_NM, sum(ZXQZ_CURRENT_MONTH_COUNT) ZXQZ_CURRENT_MONTH_COUNT, \n" +
                    " sum(ZXQZ_TOTAL_COUNT) - sum(ZXQZ_CURRENT_MONTH_COUNT) ZXQZ_TOTAL_COUNT\n" +
                    "                    FROM V_STAT_CATEGORY_TJFX \n" +
                    "                    GROUP BY ORG_NM order by ZXQZ_TOTAL_COUNT desc) t  where ROWNUM<9";
            return statisticChartDao.getSqlResult(sql);
        }else {
            String sql = "SELECT\n" +
                    "  ORG_NM,\n" +
                    "  sum(ZXQZ_CURRENT_MONTH_COUNT)                         ZXQZ_CURRENT_MONTH_COUNT,\n" +
                    "  sum(ZXQZ_TOTAL_COUNT) - sum(ZXQZ_CURRENT_MONTH_COUNT) ZXQZ_TOTAL_COUNT\n" +
                    "FROM V_STAT_CATEGORY_TJFX\n" +
                    "WHERE ORG_NM LIKE ?\n" +
                    "GROUP BY ORG_NM\n";
            return statisticChartDao.getSqlResult(sql, new Object[]{"%"+wbjmc+"%"});
        }
    }

    @Override
    public List getGwbjsjtjlxxtj(Model model) {
        String wbjmc = model.getValueNotEmpty("wbjmc");
        String sql = "SELECT\n" +
                "  ASSET_NAME,\n" +
                "  ZXQZ_CURRENT_MONTH_COUNT,\n" +
                "  ZXQZ_TOTAL_COUNT - ZXQZ_CURRENT_MONTH_COUNT ZXQZ_TOTAL_COUNT\n" +
                "FROM V_STAT_CATEGORY_TJFX\n" +
                "WHERE ORG_NM LIKE ?";
        return statisticChartDao.getSqlResult(sql, new Object[]{"%"+wbjmc+"%"});
    }

    @Override
    public List getGwbjsjtjzltj(Model model) {
        String wbjmc = model.getValueNotEmpty("wbjmc");
        String sql = "SELECT\n" +
                "  ASSET_NAME,\n" +
                "  round(TOTAL_COUNT / ZXQZ_TOTAL_COUNT, 3) TOTAL_RATE\n" +
                "FROM V_STAT_CATEGORY_TJFX\n" +
                "WHERE ORG_NM LIKE ? and ZXQZ_TOTAL_COUNT>0 ";
        return statisticChartDao.getSqlResult(sql, new Object[]{"%"+wbjmc+"%"});
    }

    @Override
    public List getGwbjsjsyltj(Model model) {
        String yymc = model.getValue("yymc");
        SimpleDateFormat format=new SimpleDateFormat("yyyy-MM");
        String time =format.format(new Date());
        if(yymc.isEmpty()){
            String sql="select t.*,ROWNUM as rn from (select c.applicationname nm, c.sum, d.sum monthly_sum " +
                    "  from (select count(*) sum, t.applicationname from yy_yysytj t group by t.applicationname) c left " +
                    "  join (select b.applicationname, decode(a.sum, '', b.sum, a.sum) sum " +
                    "  from (select count(*) sum, t.applicationname from yy_yysytj t " +
                    "  where t.usetime >= ? group by t.applicationname) a right " +
                    "  join (select 0 sum, t.applicationname from yy_yysytj t " +
                    "  group by t.applicationname) b on a.applicationname = b.applicationname) d " +
                    "  on c.applicationname = d.applicationname order by c.sum desc ) t " +
                    "   where ROWNUM<9";
            return statisticChartDao.getSqlResult(sql, new Object[]{time});
        }
        else{
            String sql="select c.applicationname nm,c.sum,d.sum monthly_sum from (" +
                    " select count(*) sum,t.applicationname from yy_yysytj t group by t.applicationname) c " +
                    " left join " +
                    " (select b.applicationname,decode(a.sum,'',b.sum,a.sum) sum from (" +
                    " select count(*) sum,t.applicationname from yy_yysytj t where t.usetime>=? group by t.applicationname ) a " +
                    " right join " +
                    " (select 0 sum,t.applicationname from yy_yysytj t group by t.applicationname ) b " +
                    " on a.applicationname= b.applicationname) d on c.applicationname=d.applicationname "+
                    " where c.applicationname like ?";
            return statisticChartDao.getSqlResult(sql, new Object[]{time,"%"+yymc+"%"});
        }
    }

    @Override
    public List getGwbjsjsylxxtj(Model model) {
        String wbjmc = model.getValueNotEmpty("wbjmc");
        String sql="select a.proposer_org_name users," +
                "       a.asset_name RESOURCES," +
                "       a.asset_provider_name provider" +
                "  from APPROVAL_INFO@ASSET a" +
                " where a.proposer_org_name like ? and" +
                "   status = '申请成功'";
        return statisticChartDao.getSqlResult(sql, new Object[]{"%"+wbjmc+"%"});
    }	

	@Override
	public List getGrtp(Model model) {
		String sfzh=model.getValue("sfzh");
		String sql="SELECT DA.XXLB,DA.XXMC,DA.XXZSNR,MAN.NAME,MAN.SEX,MAN.AGE," +
				   "MAN.ADDRESS,MAN.HOSPITAL FROM BUSINESS_MAN_DATA DA 	" +
				   "LEFT JOIN BUSINESS_MAN MAN ON DA.ID_CARD=MAN.ID_CARD " +
				   "WHERE DA.ID_CARD='"+sfzh+"'";
		return statisticChartDao.getGrtp(sql);
	}

	@Override
	public List getSytp(Model model) {
		String gszch=model.getValue("gszch");
		String sql="SELECT TA.QYMC,TA.XXLB,TA.XXMC,TA.XXZSNR,TO_CHAR(FO.ZCRJ,'yyyy-mm-dd') AS ZCRJ," +
				   "FO.ZCZB,FO.ZCZBBZ,FO.FDDBR,FO.SSHY,FO.GSDZ FROM BUSINESS_COMPANY_DATA_SJFX TA " +
		           "LEFT JOIN COMPANY_INFO_SJFX FO ON TA.GSZCH=FO.QYZCH " +
				   "WHERE TA.GSZCH='"+gszch+"'  and TA.QYMC is not null";
		return statisticChartDao.getSytp(sql);
	}
    @Override
    public List getGDP(Model model){
        String nd=model.getValueNotEmpty("nd");
        String qhmc=model.getValueNotEmpty("qhmc");

        StringBuilder sql = new StringBuilder();
        sql.append(" SELECT cs as qhmc, '第一产业增加值'as zbmc, '万元' as zbdw," +
                "         listagg(nvl(DYCYZJZ, 0), ',')" +
                "         WITHIN GROUP (" +
                "           ORDER BY to_date(nd, 'yyyy')) DQZ," +
                "         listagg(nd, ',')" +
                "         WITHIN GROUP (" +
                "           ORDER BY to_date(nd, 'yyyy')) ND" +
                "       FROM sjfx_gdp where nd='"+nd+"' and cs ='"+qhmc+"' GROUP BY cs" +
                " union " +
                "        SELECT cs as qhmc, '第一产业增加值-同比增加'as zbmc, '%' as zbdw," +
                "         listagg(nvl(DYCYZJZTBZJ, 0), ',')" +
                "         WITHIN GROUP (" +
                "           ORDER BY to_date(nd, 'yyyy')) DQZ," +
                "         listagg(nd, ',')" +
                "         WITHIN GROUP (" +
                "           ORDER BY to_date(nd, 'yyyy')) ND" +
                "       FROM sjfx_gdp where  nd='"+nd+"' and cs ='"+qhmc+"' GROUP BY cs" +
                " union " +
                "        SELECT cs as qhmc," +
                "         '第二产业增加值'as zbmc," +
                "         '万元' as zbdw," +
                "         listagg(nvl(DECYZJZ, 0), ',')" +
                "         WITHIN GROUP (" +
                "           ORDER BY to_date(nd, 'yyyy')) DQZ," +
                "         listagg(nd, ',')" +
                "         WITHIN GROUP (" +
                "           ORDER BY to_date(nd, 'yyyy')) ND" +
                "       FROM sjfx_gdp where  nd='"+nd+"' and cs ='"+qhmc+"' GROUP BY cs" +
                "union " +
                "        SELECT cs as qhmc," +
                "         '第二产业增加值-同比增加'as zbmc," +
                "         '%' as zbdw," +
                "         listagg(nvl(DECYZJZTBZJ, 0), ',')" +
                "         WITHIN GROUP (" +
                "           ORDER BY to_date(nd, 'yyyy')) DQZ," +
                "         listagg(nd, ',')" +
                "         WITHIN GROUP (" +
                "           ORDER BY to_date(nd, 'yyyy')) ND" +
                "       FROM sjfx_gdp where  nd='"+nd+"' and cs ='"+qhmc+"' GROUP BY cs" +
                "union " +
                "        SELECT cs as qhmc," +
                "         '第三产业增加值'as zbmc," +
                "         '万元' as zbdw," +
                "         listagg(nvl(DSCYZJZ, 0), ',')" +
                "         WITHIN GROUP (" +
                "           ORDER BY to_date(nd, 'yyyy')) DQZ," +
                "         listagg(nd, ',')" +
                "         WITHIN GROUP (" +
                "           ORDER BY to_date(nd, 'yyyy')) ND" +
                "       FROM sjfx_gdp where  nd='"+nd+"' and cs ='"+qhmc+"' GROUP BY cs" +
                "union " +
                "        SELECT cs as qhmc," +
                "         '第三产业增加值-同比增加'as zbmc," +
                "         '%' as zbdw," +
                "         listagg(nvl(DSCYZJZTBZJ, 0), ',')" +
                "         WITHIN GROUP (" +
                "           ORDER BY to_date(nd, 'yyyy')) DQZ," +
                "         listagg(nd, ',')" +
                "         WITHIN GROUP (" +
                "           ORDER BY to_date(nd, 'yyyy')) ND" +
                "       FROM sjfx_gdp where  nd='"+nd+"' and cs ='"+qhmc+"' GROUP BY cs" +
                "union " +
                "        SELECT cs as qhmc,'gdp总值同比增加'as zbmc,'%' as zbdw,listagg(nvl(GDPZZTBZJ, 0), ',')" +
                "         WITHIN GROUP (ORDER BY to_date(nd, 'yyyy')) DQZ,listagg(nd, ',')" +
                "         WITHIN GROUP (ORDER BY to_date(nd, 'yyyy')) ND" +
                "       FROM sjfx_gdp where  nd='"+nd+"' and cs ='"+qhmc+"' GROUP BY cs");

        return statisticChartDao.getZB(sql.toString());
    }
    @Override
    public List getZB(Model model){
        String qxmc=model.getValueNotEmpty("qxmc");
        String nd=model.getValueNotEmpty("nd");
        String sql="select '规模以上工业增加值（万元）' ZBMC,GMYSGYZJZ ZBSJ,nd SJRQ,cs from  sjfx_zb where cs='"+qxmc+"' and nd='" +nd+"'"+
                "union" +
                "select '规模以上工业增加值-同比增加' ZBMC,GMYSGYZJZTBZJ ZBSJ,nd SJRQ,cs from sjfx_zb where  cs='"+qxmc+"' and nd='" +nd+"'"+
                "union" +
                "select '地区生产总值（万元）' ZBMC,DQSCZZ ZBSJ,nd SJRQ,cs from  sjfx_zb where  cs='"+qxmc+"' and nd='" +nd+"'"+
                "union" +
                "select '地区生产总值-同比增加' ZBMC,DQSCZZTBZJ ZBSJ,nd SJRQ,cs from  sjfx_zb where  cs='"+qxmc+"' and nd='" +nd+"'"+
                "union" +
                "select '第一产业增加值（万元）' ZBMC,DYCYZJZ ZBSJ,nd SJRQ,cs from  sjfx_zb where  cs='"+qxmc+"' and nd='" +nd+"'";
        return statisticChartDao.getZB(sql);
    }

    @Override
    public List getDQSCZZ(Model model){
        String nd=model.getValueNotEmpty("nd");
        String sql= "select '地区生产总值（万元）' ZBMC,DQSCZZ ZBSJ,nd SJRQ,cs qhmc from  sjfx_zb where nd='" +nd+"'  order by zbsj";
        return statisticChartDao.getDQSCZZ(sql);
    }

    @Override
    public List getNewDate(Model model) {
        String index = model.getValueNotEmpty("index");
        if ("1".equals(index)) {
            return this.statisticChartDao.getNewDate("select max(nd) maxDate from tjfx_frdqfbtj where nd is not null order by nd desc");
        }
        if ("2".equals(index)) {
            return this.statisticChartDao.getNewDate("select max(tjnf) maxDate from TG_RKZZQD_TJFX where tjnf is not null order by tjnf");
        }
        if ("3".equals(index)) {
            return this.statisticChartDao.getNewDate("SELECT max(tjnf) maxDate FROM TG_SWRKJSY_TJFX where tjnf is not null order by tjnf desc");
        }
        if ("4".equals(index)) {
            return this.statisticChartDao.getNewDate("SELECT max(tgnf) maxDate FROM tjfx_rkxbnljgfb where tgnf is not null order by tgnf desc");
        }
        if ("5".equals(index)) {
            return this.statisticChartDao.getNewDate("select max(tjnf) maxDate from JTYSLKZZLTJ_TJFX where tjnf is not null order by tjnf desc");
        }

        return null;
    }
}
