package com.digitalchina.ldp.app.sps.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.digitalchina.ldp.app.sps.service.StatisticService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.handler.AbstractHandler;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;

/**
 * 统计/汇总的Handler
 * @author Gaffer
 *
 */
@Component
public class StatisticHandler extends AbstractHandler{
  
  @Autowired
  private StatisticService statisticService;
  
  /**
   * 资源订阅次数统计
   * @return
   */
  @HttpService
  public PageList<DynamicBean> resourceSubscription(Model model){
    int start = model.getInt("start");
    int pageSize = model.getInt("limit");
    String keyWord= model.getValue("keyWord");
    PageList<DynamicBean> result=statisticService.resourceSubscription(start,pageSize,keyWord);
    return result;
  }
  
  /**
   * 文件下载次数统计
   * @return
   */
  @HttpService
  public PageList<DynamicBean> fileDownload(Model model){
    int start = model.getInt("start");
    int pageSize = model.getInt("limit");
    String keyWord= model.getValue("keyWord");
    return statisticService.fileDownload(start,pageSize,keyWord);
  }
  
  /**
   * 服务调用次数统计
   * @return
   */
  @HttpService
  public PageList<DynamicBean> serviceRequest(Model model){
    int start = model.getInt("start");
    int pageSize = model.getInt("limit");
    String keyWord= model.getValue("keyWord");
    return statisticService.serviceRequest(start,pageSize,keyWord);
  }
}
