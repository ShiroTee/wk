package com.digitalchina.ws;

import com.alibaba.fastjson.JSON;
import com.digitalchina.service.RKTPInformationService;
import com.digitalchina.util.HttpClientManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.jws.WebService;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author jss
 * 2016年8月31日14:02:51
 */
@WebService(endpointInterface = "com.digitalchina.ws.RKTPInformationWS", serviceName = "RKTPInformationWSWebs")
@Component
public class RKTPInformationWSImpl implements RKTPInformationWS {

    @Autowired
    private RKTPInformationService rktpInformationService;

    /**
     * 人口全文检索详细信息_关联信息
     * @author jiaoss
     */
    @Override
    public  String  getPopulationRelativeInfo(String UserName,String PassWord,String queryValue){
        if(!HttpClientManager.checkUser(UserName,PassWord)){
            return "用户名或密码不正确";
        }
        return HttpClientManager.getPopulationRelativeInfo(queryValue);
    }

    /**
     * 人口全文检索的详细信息
     */
    @Override
    public String getPopulationDetail(String UserName,String PassWord,String queryValue,String tableName){
        if(!HttpClientManager.checkUser(UserName,PassWord)){
            return "用户名或密码不正确";
        }
        return HttpClientManager.getPopulationDetail(queryValue,tableName);
    }

    /**
     * 获取数据的查询类型
     */
    @Override
    public String getRKTPQueryType(String UserName,String PassWord){
        if(!HttpClientManager.checkUser(UserName,PassWord)){
            return "用户名或密码不正确";
        }
        return JSON.toJSONString(this.rktpInformationService.getRKTPQueryType());
    }


    @Override
    public String getRelation(String UserName,String PassWord,String queryType,String queryValue) {
        if(!HttpClientManager.checkUser(UserName,PassWord)){
            return "用户名或密码不正确";
        }
        return JSON.toJSONString(this.rktpInformationService.getRelation(queryType,queryValue));
    }

    @Override
    public String getRelationExpand(String UserName,String PassWord,
                                    String father_table_name, String firstQueryType,
                                    String firstQueryValue,String queryValue) {
        if(!HttpClientManager.checkUser(UserName,PassWord)){
            return "用户名或密码不正确";
        }
        Map<String,Object> map =this.rktpInformationService.getRelationExpand(father_table_name,
                                            firstQueryType,firstQueryValue,queryValue);
       List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
        list.add(map);
        return JSON.toJSONString(list);
    }

    @Override
    public String getPopulationMap(String UserName,String PassWord,
                                   String tableName, String firstValue,
                                   String firstType, String value, String fatherTable) {

        if(!HttpClientManager.checkUser(UserName,PassWord)){
            return "用户名或密码不正确";
        }

        List<Object> list = this.rktpInformationService.getPopulationMap(tableName,firstValue,
                firstType,value,fatherTable);
        return JSON.toJSONString(list);
    }

}
