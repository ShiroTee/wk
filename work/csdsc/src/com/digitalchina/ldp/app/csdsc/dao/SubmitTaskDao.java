package com.digitalchina.ldp.app.csdsc.dao;

import java.util.List;
import java.util.Map;

/**
 * @Author zhanglei
 * @Date 16/7/6 下午4:54
 */
public interface SubmitTaskDao {

    int addYQResult(Map map);
    int updateData(Map map);

    List<Map<String,Object>> findDataZQ();
    List<Map<String,Object>> findDatasNotInSjgzb(String sjssqDesc);

    List<Map<String,Object>> findSubmitData(String wbj,String xxlmc);

    List<Map<String,Object>> findSubmitDatas(String wbj,String xxlmc,String sjssqDesc);


    Map<String,String> getUpdateMap(String wbj,String xxlmc,String tjrqq,String tjrqz,
                                           String tjsj,String tjyf);

    Map<String,String> getYQMap(String id,String wbj,String xxlmc,String zq,String tjrqq,
                                       String tjrqz,String tjyf);

}
