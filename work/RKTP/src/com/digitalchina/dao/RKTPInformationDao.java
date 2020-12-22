package com.digitalchina.dao;

import java.util.List;
import java.util.Map;

/**
 * @author jss 2016年8月31日11:26:06
 */
public interface RKTPInformationDao {

    public Map<String, Object> getRKTPType(String type);

    public List<Map<String, Object>> getRKTPConfig(String type);

    public Map<String, Object> getRelation(List<Map<String, Object>> configs,String queryType,String queryValue);

    public Map<String, Object> getRKTPTableConfig(String tableName,String queryType);

    public List<Map<String, Object>> getRKTPByFatherTableConfig(String tableName,String queryType);

    public List<Object> getPopulationMap(Map<String,Object> config, String name);

    public List<Map<String, Object>> getRKTPQueryType();

    public Map<String, Object> getRKTPTableLinkConfig(String tableName,String fatherTable,String firsttype);

}
