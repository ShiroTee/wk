package com.digitalchina.ldp.app.csdsc.dao.impl;

import com.digitalchina.ldp.app.csdsc.bean.WbjDataSubmitInfoBean;
import com.digitalchina.ldp.app.csdsc.comm.Pager;
import com.digitalchina.ldp.app.csdsc.comm.PagerUtil;
import com.digitalchina.ldp.app.csdsc.comm.StringUtils;
import com.digitalchina.ldp.app.csdsc.dao.DataOutComeDao;
import com.digitalchina.ldp.dao.BaseDao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by zhanglei on 15/7/16.
 */
@Component
public class DataOutComeDaoImpl extends BaseDao implements DataOutComeDao {

    @Override
    public Pager getUpdateList(int pageNo, int pageSize) {
        String sql = "select id,wbjmc,data_name,submit_time from wbj_data_submit_info where 1=1 and submit_time is not null order by submit_time desc";
        //分页数据sql
        String topicsSql = PagerUtil.getPageDataSql(sql, Integer.toString(pageNo), Integer.toString(pageSize));
        //分页总页数和总条数sql
        String topicPageAndCountsSql = PagerUtil.getPageAndCountsSql(sql, Integer.toString(pageSize));

        //分页数据
        List<WbjDataSubmitInfoBean> results = new ArrayList<WbjDataSubmitInfoBean>();
        List<Map<String, Object>> list = this.createJdbcTemplate().queryForList(topicsSql);
        if (list != null && list.size() > 0) {
            for (Map<String, Object> aList : list) {
                WbjDataSubmitInfoBean bean = new WbjDataSubmitInfoBean();
                bean.setId(Integer.parseInt(aList.get("ID").toString()));
                bean.setWbjmc(StringUtils.objToString(aList.get("wbjmc")));
                bean.setDataName(StringUtils.objToString(aList.get("data_name")));
                bean.setSubmitTime(new Date(((Timestamp) aList.get("submit_time")).getTime()));
                results.add(bean);
            }

        }

        Pager pager = new Pager();
        //分页总页数和总条数
        List<Map<String, Object>> listCouts = this.createJdbcTemplate().queryForList(topicPageAndCountsSql);
        if (listCouts != null && listCouts.size() > 0) {
            pager.setAllpage(StringUtils.objToString(listCouts.get(0).get("ALLPAGE")));
            pager.setAllcounts(StringUtils.objToString(listCouts.get(0).get("ALLCOUNTS")));
        }
        pager.setListBeans(results);

        return pager;
    }

    @Override
    public WbjDataSubmitInfoBean getUpdateInfoById(int id) {
        String sql = "select * from wbj_data_submit_info where 1=1 and submit_time is not null and id=?";
        WbjDataSubmitInfoBean result = (WbjDataSubmitInfoBean) this.createJdbcTemplate().queryForObject(sql, new Object[]{id}, new BeanPropertyRowMapper(WbjDataSubmitInfoBean.class));
        return result;
    }
    
    @Override
    public List<Map<String, Object>> getOlapWbjSubmitData(String start,String end) {

    	StringBuilder dataSql = new StringBuilder();
    	dataSql.append("select  wbj org_name,xxlmc data_type,gxzq circle,sjssq belong_circle,tjsjrq submit_date,sjtjl data_count from sjcg_sjtjpm  ");
    	dataSql.append(" where tjsjrq > '"+ start +"' AND tjsjrq < '"+ end +"' order by tjsjrq desc");

    	System.out.println(dataSql.toString());
    	
    	return this.createJdbcTemplate().queryForList(dataSql.toString());
    }

    @Override
    public List<Map<String, Object>> getOlapWbjApplicationData(String start,String end) {

        StringBuilder sql = new StringBuilder();
        sql.append("select t.userorg, t.applicationname,sum(t.usecount) sum,substr(max(usetime),0,11) usetime" +
                "  from yy_yysytj t" +
                " where t.usetime > '"+start+"'" +
                "   and t.usetime <'"+end+"'" +
                " group by t.applicationname, t.userorg order by sum desc");
        System.out.println(sql.toString());

        return this.createJdbcTemplate().queryForList(sql.toString());
    }
    
    @Override
    public List<Map<String, Object>> getOlapWdkData() {
        String sql = "select t.kmc dbname,to_number(t.data_num) nm from TJFX_SKSJZLTJ t  order by data_num";
        System.out.println(sql.toString());
        return this.createJdbcTemplate().queryForList(sql);
    }

    public List<Map<String, Object>> getAddDataByMonth(int year, int month){
        StringBuilder sql = new StringBuilder();
        if(month<10) {
            sql.append("select wbj,xxlmc sjl,sjtjl gxsjl,tjrqq,tjrqz from sjcg_sjtjpm t where t.tjyf='" + year + "-0" + month + "'");
        }else{
            sql.append("select wbj,xxlmc sjl,sjtjl gxsjl,tjrqq,tjrqz from sjcg_sjtjpm t where t.tjyf='" + year + "-" + month + "'");
        }
        System.out.println(sql.toString());
        return this.createJdbcTemplate().queryForList(sql.toString());
    }
    public List<Map<String, Object>> getNotAddDataByMonth(int year, int month){
        StringBuilder sql = new StringBuilder();
        if(month<10) {
            sql.append(" select wbj,xxlmc sjl,tjsjq tjrqq,tjsjz tjrqz from sjcg_yqwtjsj_jl  t where t.tjyf='" + year + "-0" + month + "'");
        }else{
            sql.append(" select wbj,xxlmc sjl,tjsjq tjrqq,tjsjz tjrqz from sjcg_yqwtjsj_jl t where t.tjyf='" + year + "-" + month + "'");
        }
        System.out.println(sql.toString());

        return  this.createJdbcTemplate().queryForList(sql.toString());
    }
    public List<Map<String, Object>> getApplicationTimesByMonth(int year, int month){
        StringBuilder sql = new StringBuilder();
        if(month<9){
        sql.append("select t.userorg, t.applicationname,sum(t.usecount) sum" +
                "  from yy_yysytj t" +
                " where t.usetime > '"+year+"-0"+month+"'" +
                "   and t.usetime <'"+year+"-0"+(month+1)+"' and loginname <> 'development' and loginname <> 'admin' " +
                " group by t.applicationname, t.userorg order by sum desc");
        }else if(month==9){
            sql.append("select t.userorg, t.applicationname,sum(t.usecount) sum" +
                    "  from yy_yysytj t" +
                    " where t.usetime > '"+year+"-0"+month+"'" +
                    "   and t.usetime <'"+year+"-"+(month+1)+"'   and loginname <> 'development' and loginname <> 'admin' " +
                    " group by t.applicationname, t.userorg order by sum desc");
        }else{
            sql.append("select t.userorg, t.applicationname,sum(t.usecount) sum" +
                    "  from yy_yysytj t" +
                    " where t.usetime > '"+year+"-"+month+"'" +
                    "   and t.usetime <'"+year+"-"+(month+1)+"'  and loginname <> 'development' and loginname <> 'admin' " +
                    " group by t.applicationname, t.userorg order by sum desc");
        }
        System.out.println(sql.toString());

        return this.createJdbcTemplate().queryForList(sql.toString());
    }
    public List<Map<String, Object>> getAddDataByYear(int year){
        StringBuilder sql = new StringBuilder();
        sql.append("select t.* from yy_nb_gxsjtj t where t.tjnf='"+year+"' order by gxsl desc");
        System.out.println(sql.toString());

        return this.createJdbcTemplate().queryForList(sql.toString());
    }
    public List<Map<String, Object>> getDataByYear(int year){
        StringBuilder sql = new StringBuilder();
        sql.append("select t.* from yy_nb_gxsjtj_lb t where t.tjnd='"+year+"'");
        System.out.println(sql.toString());

        return this.createJdbcTemplate().queryForList(sql.toString());
    }
    public List<Map<String, Object>> getApplicationTimesByYear(int year){
        StringBuilder sql = new StringBuilder();
        sql.append("select t.userorg, t.applicationname,sum(t.usecount) sum" +
                "  from yy_yysytj t" +
                " where t.usetime > '"+year+"'" +
                "   and t.usetime <'"+(year+1)+"' and loginname <> 'development' and loginname <> 'admin' " +
                " group by t.applicationname, t.userorg order by sum desc");
        System.out.println(sql.toString());
        return this.createJdbcTemplate().queryForList(sql.toString());
    }

    @Override
    public Pager queryForList(String sql, int pageNo, int pageSize) {
        Pager pager = new Pager();

        //分页数据sql
        String topicsSql = PagerUtil.getPageDataSql(sql, Integer.toString(pageNo), Integer.toString(pageSize));
        //分页总页数和总条数sql
        String topicPageAndCountsSql = PagerUtil.getPageAndCountsSql(sql, Integer.toString(pageSize));

        List<Map<String, Object>> list = this.createJdbcTemplate().queryForList(topicsSql);
        pager.setListBeans(list);

        //分页总页数和总条数
        List<Map<String, Object>> listCouts = this.createJdbcTemplate().queryForList(topicPageAndCountsSql);
        if (listCouts != null && listCouts.size() > 0) {
            pager.setAllpage(StringUtils.objToString(listCouts.get(0).get("ALLPAGE")));
            pager.setAllcounts(StringUtils.objToString(listCouts.get(0).get("ALLCOUNTS")));
        }

        return pager;
    }
}
