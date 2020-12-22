package com.digitalchina.dao.impl;

import com.digitalchina.dao.RKTPInformationDao;
import com.digitalchina.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author 陈超 2014-7-15 下午03:44:57
 */
@Component
public class RKTPInformationDaoImpl implements RKTPInformationDao {

    public final static String QUERY_CONDITION  = "query_code";

    @Autowired
    private JdbcTemplate cmsJdbcTemplate;
    /*
    * 获得人口图谱的配置信息
    * 包括：sql,描述等
    * */
    public List<Map<String, Object>> getRKTPConfig(String type){
        StringBuilder sql = new StringBuilder();
        sql.append("select t.* from RKTP_QUERY_CONFIG t where t.query_field = '"+type+"'");
        List<Map<String, Object>> config  = cmsJdbcTemplate.queryForList(sql.toString());

        return config;
    }

    /*
    * 获得人口图谱的查询字段的信息
    * 包括：sql,描述等
    * */
    public Map<String, Object> getRKTPType(String type){
        StringBuilder sql = new StringBuilder();
        sql.append("select t.* from RKTP_QUERY_VALUE t where t.query_field = '"+type+"'");
        Map<String, Object> config  = cmsJdbcTemplate.queryForMap(sql.toString());

        return config;
    }

    /*
    * 获得人口图谱的查询字段的信息
    * 包括：sql,描述等
    * */
    @Override
    public Map<String, Object> getRKTPTableConfig(String tableName,String queryType){
        StringBuilder sql = new StringBuilder();
        Map<String, Object> config = new HashMap<String, Object>();
        if(!"".equals(tableName)) {
            sql.append("select t.* from RKTP_QUERY_CONFIG t where t.table_name = '" + tableName + "' and t.query_field='"+queryType+"'");
            System.out.println(sql.toString());
            config = cmsJdbcTemplate.queryForMap(sql.toString());
        }

        return config;
    }


    /*
    * 获得人口图谱的查询字段的信息
    * 包括：sql,描述等
    * */

    @Override
    public List<Map<String, Object>> getRKTPByFatherTableConfig(String tableName,String queryType){
        StringBuilder sql = new StringBuilder();
        List<Map<String, Object>> config = new  ArrayList<Map<String, Object>>();
        if(!"".equals(tableName)) {
            sql.append("select t.* from RKTP_QUERY_LINK t where t.father_table = '" + tableName + "' and query_type ='" + queryType+"'");
            System.out.println(sql.toString());
            config = cmsJdbcTemplate.queryForList(sql.toString());
        }

        return config;
    }


    /*
     * 人口图谱查询_查询第一层的主题数据
     */
    @Override
    public Map<String, Object> getRelation(List<Map<String, Object>> configs,String queryType,String queryValue) {
        Map<String, Object> result = new HashMap<String, Object>();
        for(Map<String, Object> config : configs ){
            String sql = config.get("SUBJECT_SQL").toString();
            //电话号码的时候：座机（没加区号的）则加0872
            if(queryType.equals("dhhm") && !queryValue.startsWith("0872") && !queryValue.startsWith("1")){
                String temp = sql.split("where")[1];
                temp = temp.replaceAll(QUERY_CONDITION,"0872-"+queryValue);
                sql = sql + " or " + temp;
            }
            sql = sql.replaceAll(QUERY_CONDITION,queryValue);
            String table_name =  config.get("TABLE_NAME").toString();
            System.out.println(sql.toString());
            List<Map<String, Object>> data = cmsJdbcTemplate.queryForList(sql.toString());
            result.put(table_name,data);
        }

        return result;
    }

    /*
* 获得人口图谱的查询字段的信息
* 包括：sql,描述等
* */
    @Override
    public Map<String, Object> getRKTPTableLinkConfig(String tableName,String fatherTable,String firsttype){
        StringBuilder sql = new StringBuilder();
        Map<String, Object> config = new  HashMap<String, Object>();
        if(!"".equals(tableName)) {
            sql.append("select t.* from rktp_query_link t where t.table_name = '" + tableName + "' and t.father_table='"+fatherTable+"' and t.query_type='"+firsttype+"'");
            System.out.println(sql.toString());
            config = cmsJdbcTemplate.queryForMap(sql.toString());
        }

        return config;
    }


    @Override
    public List<Map<String, Object>> getRKTPQueryType(){
        String Sql ="select * from rktp_query_value ";
        List<Map<String,Object>> list = cmsJdbcTemplate.queryForList(Sql);
        return list;
    }

    @Override
    public List<Object> getPopulationMap(Map<String,Object> config,String name){
        String sql = StringUtils.objToString(config.get("DETAIL_SQL"));
        String detail_desc = StringUtils.objToString(config.get("DETAIL_FIELD_DESC"));

        List<Object> result = new ArrayList<Object>();
        if(!"".equals(sql)){
            sql = sql.replaceAll(QUERY_CONDITION,name);
            System.out.println(sql.toString());
            List<Map<String, Object>>  value= cmsJdbcTemplate.queryForList(sql);

            if(!value.isEmpty()){
                result.add(value);
                result.add(detail_desc);
            }
        }

        return result;
    }
}
