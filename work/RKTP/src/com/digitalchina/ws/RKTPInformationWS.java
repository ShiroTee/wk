package com.digitalchina.ws;

import javax.jws.WebParam;
import javax.jws.WebService;

/**
 * @author jss
 * 2016年8月31日14:02:51
 */
@WebService
public interface RKTPInformationWS {

    /**
     * 人口全文检索详细信息_关联信息
     * @author jiaoss
     */

    public  String  getPopulationRelativeInfo(@WebParam(name="userName") String userName,
                                              @WebParam(name="passWord") String passWord,
                                              @WebParam(name="queryValue") String queryValue);

    /**
     * 人口全文检索的详细信息
     */

    public String getPopulationDetail(@WebParam(name="userName") String userName,
                                      @WebParam(name="passWord") String passWord,
                                      @WebParam(name="queryValue")String queryValue,
                                      @WebParam(name="tableName")String tableName);

    /**
    * 人口全文检索的详细信息
    */
    public String getRKTPQueryType(@WebParam(name="userName") String userName,
                                   @WebParam(name="passWord") String passWord);


    public String getRelation(@WebParam(name="userName") String userName,
                              @WebParam(name="passWord") String passWord,
                              @WebParam(name="queryType")String queryType,
                              @WebParam(name="queryValue")String queryValue) ;

    public String getRelationExpand(@WebParam(name="userName") String userName,
                                    @WebParam(name="passWord") String passWord,
                                    @WebParam(name="tableName")String tableName,
                                    @WebParam(name="firstQueryType")String firstQueryType,
                                    @WebParam(name="firstQueryValue")String firstQueryValue,
                                    @WebParam(name="queryValue")String queryValue) ;

    public String getPopulationMap(@WebParam(name="userName") String userName,
                                   @WebParam(name="passWord") String passWord,
                                   @WebParam(name="tableName")String tableName,
                                   @WebParam(name="firstValue")String firstValue,
                                   @WebParam(name="firstType")String firstType,
                                   @WebParam(name="value")String value,
                                    @WebParam(name="fatherTable")String fatherTable);
}
