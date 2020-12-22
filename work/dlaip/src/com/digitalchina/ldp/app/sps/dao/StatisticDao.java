package com.digitalchina.ldp.app.sps.dao;


import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;

public interface StatisticDao {
  /**
   * 资源订阅次数统计
   * 
   * @return
   */
  public PageList<DynamicBean> resourceSubscription(int start,int pageSize,String keyWord);

  /**
   * 文件下载次数统计
   * 
   * @return
   */
  public PageList<DynamicBean> fileDownload(int start,int pageSize,String keyWord);

  /**
   * 服务调用次数统计
   * 
   * @return
   */
  public PageList<DynamicBean> serviceRequest(int start,int pageSize,String keyWord);
}
