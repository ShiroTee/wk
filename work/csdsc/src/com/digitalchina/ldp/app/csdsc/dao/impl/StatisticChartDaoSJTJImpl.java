package com.digitalchina.ldp.app.csdsc.dao.impl;

import com.digitalchina.ldp.app.csdsc.comm.StringUtils;
import com.digitalchina.ldp.app.csdsc.dao.StatisticChartDaoSJTJ;
import com.digitalchina.ldp.dao.BaseDao;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class StatisticChartDaoSJTJImpl extends BaseDao implements StatisticChartDaoSJTJ {

    @Override
    public List<Map<String, Object>> getXzqh() {
        String sql = "select t2.QHMC,t2.RK_XZQHMB_ID from rk_xzqhmb t1,rk_xzqhmb t2	WHERE t1.RK_XZQHMB_ID = t2.PID AND t1.PID IS NULL AND t1.SFYX=0 AND t2.SFYX=0";
        return this.createJdbcTemplate().queryForList(sql);
    }

    @Override
    public List<Map<String, Object>> getSqlResult(String sql) {
        return this.createJdbcTemplate().queryForList(sql);
    }

    @Override
    public List<Map<String, Object>> getSqlResult(String sql, Object[] objects) {
        return this.createJdbcTemplate().queryForList(sql, objects);
    }

    @Override
    public List getRkxbnljgList(Map<String, Object> argMap) {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT XB,RKS FROM tjfx_rkxbnljgfb where 1=1 ");
        for(String key:argMap.keySet()){
            sql.append(" AND " + key +argMap.get(key));
        }
        sql.append(" order by to_number(nld)");
        return this.createJdbcTemplate().queryForList(sql.toString());
    }

    @Override
    public List<Map<String, Object>> getHgjjbyXzqhs(int type, String zbdms, String xzqhs) {
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        String[] zbdm = zbdms.split(",");
        String[] xzqh = xzqhs.split(",");

        StringBuilder sql = new StringBuilder();
        sql.append("SELECT t.*\n" +
                " FROM (SELECT \n" +
                "               data.zbssdq qhmc," +
                "               data.zbssdq qhdm," +
                "               data.ZBDM,\n" +
                "               data.ZBMC,\n" +
                "               data.zbsjdw zbdw,\n" +
                "               listagg(nvl(data.ZBSJ, 0), ',') WITHIN GROUP(ORDER BY to_date(data.SJRQ, 'yyyy')) DQZ,\n" +
                "               listagg(data.SJRQ, ',') WITHIN GROUP(ORDER BY to_date(data.SJRQ, 'yyyy')) ND\n" +
                "          FROM MACRO_DATA data\n" +
                "         GROUP BY data.zbssdq, data.ZBDM, data.ZBMC, data.zbsjdw) t\n" +
                "                WHERE (");
        for (int i = 0; i < zbdm.length; i++) {
            if (i != 0) {
                sql.append(" OR ");
            }
            sql.append("t.zbdm = ?");
        }
        sql.append(")") ;
        if(!"全部".equals(xzqhs)) {
            sql.append("      AND (");
            for (int i = 0; i < xzqh.length; i++) {
                if (i != 0) {
                    sql.append(" OR ");
                }

                sql.append("t.qhmc = ?");
            }
            sql.append(")");


            String[] objs = Arrays.copyOf(zbdm, zbdm.length + xzqh.length);
            System.arraycopy(xzqh, 0, objs, zbdm.length, xzqh.length);

            list=this.createJdbcTemplate().queryForList(sql.toString(), objs);
        }else{
            list = this.createJdbcTemplate().queryForList(sql.toString(), zbdm);
        }


        System.out.println(sql.toString());

        return list;
    }

    @Override
    public List<Map<String, Object>> getHgjjbyNd(String zbdms, String xzqh, String nd) {
        String[] zbdm = zbdms.split(",");

        if("init".equals(nd)){

            StringBuilder sql = new StringBuilder();
            sql.append("SELECT   max(data.SJRQ) ND" +
                    "  FROM MACRO_DATA data where " +
                    "   1=1 ");
            if (!"全部".equals(xzqh)) {
                sql.append(" AND data.zbssdq = '"+xzqh+"'");
            }
            sql.append("      AND (");
            for (int i = 0; i < zbdm.length; i++) {
                if (i != 0) {
                    sql.append(" OR ");
                }
                sql.append(" data.zbdm = ?");
            }
            sql.append(")");

            List<Map<String,Object>> list =this.getSqlResult(sql.toString(), zbdm);
            if(list.size()>=1){
                nd= StringUtils.objToString(list.get(0).get("ND"));
            }else{
                int year= new Date().getYear()-1;
                nd=year+"";
            }
        }

        String[] objs = Arrays.copyOf(new String[]{nd}, 1 + zbdm.length);
        System.arraycopy(zbdm, 0, objs, 1, zbdm.length);

        StringBuilder sql = new StringBuilder();
        sql.append("SELECT data.zbssdq qhdm," +
                "       data.zbssdq QHMC," +
                "       data.ZBDM," +
                "       data.ZBMC," +
                "       data.zbsjdw zbdw," +
                "       to_char(nvl(data.ZBSJ, 0)) DQZ," +
                "       data.SJRQ ND\n" +
                "  FROM MACRO_DATA data where " +
                "   data.SJRQ = ? ");
        if (!"全部".equals(xzqh)) {
            sql.append(" AND data.zbssdq = '"+xzqh+"'");
        }
        sql.append("      AND (");
        for (int i = 0; i < zbdm.length; i++) {
            if (i != 0) {
                sql.append(" OR ");
            }
            sql.append(" data.zbdm = ?");
        }
        sql.append(")");

        System.out.println(sql.toString());

        return this.createJdbcTemplate().queryForList(sql.toString(), objs);
    }

    @Override
    public List<Map<String, Object>> getHgjjbyXzqhs(String zbdms) {
        String[] zbdm = zbdms.split(",");

        StringBuilder sql = new StringBuilder();
        sql.append("SELECT t.* " +
                " FROM (SELECT " +
                "               data.zbssdq qhmc, " +
                "               data.zbssdq qhdm, " +
                "               data.ZBDM," +
                "               data.ZBMC," +
                "               data.zbsjdw zbdw," +
                "               listagg(nvl(data.ZBSJ, 0), ',') WITHIN GROUP(ORDER BY to_date(data.SJRQ, 'yyyy')) DQZ," +
                "               listagg(data.SJRQ, ',') WITHIN GROUP(ORDER BY to_date(data.SJRQ, 'yyyy')) ND" +
                "          FROM MACRO_DATA data " +
                "         GROUP BY data.zbssdq, data.ZBDM, data.ZBMC, data.zbsjdw) t " +
                "                WHERE (");
        for (int i = 0; i < zbdm.length; i++) {
            if (i != 0) {
                sql.append(" OR ");
            }
            sql.append("t.zbdm = ?");
        }
        sql.append(")");

        System.out.println(sql.toString());
        System.out.println(zbdms.toString());

        return this.createJdbcTemplate().queryForList(sql.toString(), zbdms);
    }

    @Override
    public List<Map<String, Object>> getGrtp(String sql) {
        return this.createJdbcTemplate().queryForList(sql.toString());
    }

    @Override
    public List<Map<String, Object>> getSytp(String sql) {
        return this.createJdbcTemplate().queryForList(sql.toString());
    }

    @Override
    public List getGDP(String sql){
        return this.createJdbcTemplate().queryForList(sql);
    }

    @Override
    public List getZB(String sql){
        return this.createJdbcTemplate().queryForList(sql);
    }

    @Override
    public List getDQSCZZ(String sql){
        return this.createJdbcTemplate().queryForList(sql);
    }
    @Override
    public List getNewDate(String sql)
    {
        return createJdbcTemplate().queryForList(sql);
    }


}
