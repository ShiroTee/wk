package com.digitalchina.gaInterface;

public interface GAInterface {
    /*
     * 数据查询适配器
     * 信息查询服务
     * @param condition 查询条件
     * @return XML接口数据
     */
    public String commonDataQuery(String condition,String queryItem,String method,String queryType);

    /**
     * 数据查询适配器
     * 查询strItem指定的库中信息
     * @param strItem 查询项目名称
     * @param condition 查询条件
     * @return  XML接口数据
     */
    public String dataQuery(String strItem,String condition);

    /**
     * 小批量数据比对适配器
     * @return  String
     */
    public String dataMatching();
    /**
     * 信息交换适配器
     * @return  String
     */
    public String infoExchange();
    /**
     * 信息布控适配器
     * @return  String
     */
    public String infoTracking();
}
