package com.digitalchina.ldp.app.csdsc.dao.impl;

import com.digitalchina.ldp.app.csdsc.comm.StringUtils;
import com.digitalchina.ldp.app.csdsc.dao.SubmitTaskDao;
import com.digitalchina.ldp.dao.BaseDao;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Component
public class SubmitTaskDaoImpl extends BaseDao implements SubmitTaskDao {
    @Override
    public int addYQResult(Map map) {
        UUID uuid = UUID.randomUUID();
        String sql = "INSERT INTO sjcg_yqwtjsj_jl (id,wbj,xxlmc,zq,tjsjq,tjsjz,tjyf) values ('"+ uuid+"','"+StringUtils.objToString(map.get("wbj"))
                +"','"+StringUtils.objToString(map.get("xxlmc"))+"','"+StringUtils.objToString(map.get("zq"))+
                "','"+StringUtils.objToString(map.get("tjrqq"))+"','"+StringUtils.objToString(map.get("tjrqz"))+
                "','"+StringUtils.objToString(map.get("tjyf"))+"')";

        System.out.println(sql);

        return this.createJdbcTemplate().update(sql);
    }

    @Override
    public int updateData(Map map) {
        String sql = "update sjcg_sjtjpm set tjrqq='"+StringUtils.objToString(map.get("tjrqq"))+
                "',tjrqz='"+StringUtils.objToString(map.get("tjrqz"))+
                "' where  wbj='"+StringUtils.objToString(map.get("wbj"))+
                "' and xxlmc='"+StringUtils.objToString(map.get("xxlmc"))+
                "' and tjsjrq='"+StringUtils.objToString(map.get("tjsj"))+"'";
        System.out.println(sql);

        return this.createJdbcTemplate().update(sql);
    }

    @Override
    public List<Map<String,Object>> findDataZQ() {
        String sql = "select * from SJCG_WBJTJSJL_JCB";
        System.out.println(sql);
        return this.createJdbcTemplate().queryForList(sql);
    }

    @Override
    public List<Map<String,Object>> findSubmitData(String wbj,String xxlmc) {
        String sql= "select max(tjsjrq) tjsjrq from sjcg_sjtjpm where wbj='"+wbj+"' and xxlmc='"+xxlmc+"'";
        System.out.println(sql);
        return this.createJdbcTemplate().queryForList(sql);
    }

    @Override
    public List<Map<String,Object>> findSubmitDatas(String wbj,String xxlmc,String sjssqDesc) {
        String sql= "select * from sjcg_sjtjpm where wbj='"+wbj+"' and xxlmc='"+xxlmc+"'";
        if(sjssqDesc!=null && !"".equals(sjssqDesc)){
            sql = "select * from sjcg_sjtjpm where wbj='"+wbj+"' and xxlmc='"+xxlmc+"' and sjssq='"+sjssqDesc+"'";
        }

        System.out.println(sql);
        return this.createJdbcTemplate().queryForList(sql);
    }


    @Override
    /**
     * 查找没在数据跟踪表里面的数据
     */
    public List<Map<String,Object>> findDatasNotInSjgzb(String sjssqDesc) {

          String  sql = "select * from sjcg_sjtjpm t WHERE t.xxlmc NOT IN(SELECT XXLMC FROM SJCG_WBJTJSJL_JCB) and sjssq='"+sjssqDesc+"'";

        System.out.println(sql);
        return this.createJdbcTemplate().queryForList(sql);
    }

    @Override
    public Map<String,String> getYQMap(String id,String wbj,String xxlmc,String zq,String tjrqq,
                                       String tjrqz,String tjyf){
        Map<String,String> yq=new HashMap<String, String>();
        yq.put("pid",id);
        yq.put("wbj",wbj);
        yq.put("xxlmc",xxlmc);
        yq.put("zq",zq);
        yq.put("tjrqq",tjrqq);
        yq.put("tjrqz",tjrqz);
        yq.put("tjyf",tjyf);

        return yq;
    }

    @Override
    public Map<String,String> getUpdateMap(String wbj,String xxlmc,String tjrqq,String tjrqz,
                                           String tjsj,String tjyf){
        Map<String,String> yq=new HashMap<String, String>();
        yq.put("wbj",wbj);
        yq.put("xxlmc",xxlmc);
        yq.put("tjrqq",tjrqq);
        yq.put("tjrqz",tjrqz);
        yq.put("tjsj",tjsj);
        yq.put("tjyf",tjyf);

        return yq;
    }
}