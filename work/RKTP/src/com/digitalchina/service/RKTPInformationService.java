package com.digitalchina.service;

import java.util.List;
import java.util.Map;

/**
 * @author jss
 * 2014-7-15 下午03:43:22
 */
public interface RKTPInformationService {
    public List<Object> getRelation(String queryType,String queryValue);
    public Map<String,Object> getRelationExpand(String father_table_name, String firstQueryType,String firstQueryValue,String queryValue);
    public List<Map<String, Object>> getRKTPQueryType();

    public List<Object> getPopulationMap(String tableName, String firstValue, String firstType, String value, String fatherTable);
}
