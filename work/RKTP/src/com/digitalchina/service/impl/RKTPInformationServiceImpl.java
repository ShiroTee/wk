package com.digitalchina.service.impl;


import com.digitalchina.dao.RKTPInformationDao;
import com.digitalchina.service.RKTPInformationService;
import com.digitalchina.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author jss
 * 2016年8月31日14:46:35
 */
@Service
public class RKTPInformationServiceImpl implements RKTPInformationService {
	@Autowired
	private RKTPInformationDao rktpInformationDao;

    @Override
    public List<Object> getRelation(String queryType,String queryValue) {
        List<Object> lo = new ArrayList<Object>();

        Map<String,Object> configInfo = this.rktpInformationDao.getRKTPType(queryType);
        String query_field_name = StringUtils.objToString(configInfo.get("QUERY_FIELD_NAME"));

        //查询条件的信息
        Map<String, Object> centerinfo = new HashMap<String, Object>();
        centerinfo.put("name",query_field_name);
        centerinfo.put("value",queryValue);
        lo.add(centerinfo);

        //查询字段类型存在的表的配置信息
        List<Map<String,Object>> configs = this.rktpInformationDao.getRKTPConfig(queryType);
        //配置个数
        int size = configs.size();
        if(size>0){
            Map<String, Object> datas = this.rktpInformationDao.getRelation(configs,queryType,queryValue);
            // 节点信息集合
            List<Map<String, Object>> lNodes = new ArrayList<Map<String, Object>>();
            List<Map<String, Object>> lLinks = new ArrayList<Map<String, Object>>();

            //添加主节点
            Map<String, Object> Node = new HashMap<String, Object>();
            Node.put("name", query_field_name);
            Node.put("query_type", queryType);
            Node.put("query_value", queryValue);
            lNodes.add(Node);

            for (Map<String, Object> config : configs) {
                String table_name = StringUtils.objToString(config.get("TABLE_NAME"));
                String table_desc =   StringUtils.objToString(config.get("TABLE_DESC"));
                List<Map<String, Object>> data = (List<Map<String, Object>>) datas.get(table_name);
                int sum = data.size();//获得查询数据的条数
                if (sum > 0) {
                    for (int i = 0; i < sum; i++) {
                        Map<String, Object> dNodes = new HashMap<String, Object>();
                        Map<String,Object> map = data.get(i);
                        String value = map.get("VALUE").toString();

                        dNodes.put("name", map.get("NAME").toString());
                        dNodes.put("table_name", table_name);
                        dNodes.put("table_desc", table_desc);
                        dNodes.put("query_type", queryType);
                        dNodes.put("query_value", queryValue);
                        dNodes.put("uuid", map.get("UUID").toString());
                        dNodes.put("value", value);
                        lNodes.add(dNodes);

                        Map<String, Object> links = new HashMap<String, Object>();
                        links.put("source", map.get("NAME").toString());
                        links.put("target", query_field_name);
                        links.put("weight", value);
                        links.put("name", map.get("RELATION").toString());
                        lLinks.add(links);
                    }
                }
            }
            lo.add(lLinks);
            lo.add(lNodes);
        }
        return lo;
    }

    /*
     *点击节点的数据查询
     * 查询类别 firstQueryType
     * 字段的值 firstQueryValue
     * 数据查询字段 queryValue
     */
    @Override
    public Map<String,Object> getRelationExpand(String father_table_name, String firstQueryType,String firstQueryValue,String queryValue) {
        Map<String,Object> result = new HashMap<String,Object>();

        //查询节点的详细信息
        Map<String,Object> table = this.rktpInformationDao.getRKTPTableConfig(father_table_name,firstQueryType);
        List<Object> Detail = this.rktpInformationDao.getPopulationMap(table, queryValue);
        result.put("detail",Detail);

        //查询出相关表信息
        List<Map<String,Object>> configs = this.rktpInformationDao.getRKTPByFatherTableConfig(father_table_name,firstQueryType);
        //关联表的个数
        int size = configs.size();
        if(size>0){
            List<Object>  subjects = new ArrayList<Object>();
            // 节点信息集合
            for (Map<String, Object> config : configs) {

                String table_name =   StringUtils.objToString(config.get("TABLE_NAME"));
                String table_desc =   StringUtils.objToString(config.get("TABLE_DESC"));
                String father_link_field =   StringUtils.objToString(config.get("FATHER_LINK_FIELD"));
                String value = firstQueryValue;
                if(father_link_field.split(",").length>1){
                    value=queryValue;
                }
                List<Object> data =  this.rktpInformationDao.getPopulationMap(config, value);
                if(data !=null && data.size()>=2) {
                    List<Map<String, Object>> lines = (List<Map<String, Object>>) data.get(0);
                    int sum = lines.size();//获得查询数据的条数
                    if (sum > 0) {
                        Map<String, String> subject = new HashMap<String, String>();
                        subject.put("table_name", table_name);
                        subject.put("table_desc", table_desc);
                        subject.put("queryvalue", queryValue);
                        subjects.add(subject);
                    }
                }
            }
            result.put("subject",subjects);
        }
        return result;
    }

    @Override
    public List<Map<String, Object>> getRKTPQueryType(){

        return this.rktpInformationDao.getRKTPQueryType();
    }

    public List<Object> getPopulationMap(String tableName, String firstValue, String firstType, String value, String fatherTable){
        List<Object> result = new ArrayList<Object>();
        // 查询人基础信息

        Map<String, Object> config = this.rktpInformationDao.getRKTPTableLinkConfig(tableName,fatherTable,firstType);
        if(!config.isEmpty()){
            String father_link_field =   StringUtils.objToString(config.get("FATHER_LINK_FIELD"));
            String queryvalue = firstValue;
            if(father_link_field.split(",").length>1){
                queryvalue=value;
            }
            result = this.rktpInformationDao.getPopulationMap(config, queryvalue);
        }

        return result;
    }

}
