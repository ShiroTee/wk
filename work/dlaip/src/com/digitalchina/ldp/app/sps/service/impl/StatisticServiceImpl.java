package com.digitalchina.ldp.app.sps.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.sps.dao.StatisticDao;
import com.digitalchina.ldp.app.sps.service.StatisticService;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;
import com.digitalchina.ldp.service.BaseService;
@Service
public class StatisticServiceImpl extends BaseService implements StatisticService {
  @Autowired
  private StatisticDao statisticDao;

  @Override
  public PageList<DynamicBean> resourceSubscription(int start,int pageSize,String keyWord) {
    return statisticDao.resourceSubscription(start,pageSize,keyWord);
  }

  @Override
  public PageList<DynamicBean> fileDownload(int start,int pageSize,String keyWord) {
    return statisticDao.fileDownload(start,pageSize,keyWord);
  }

  @Override
  public PageList<DynamicBean> serviceRequest(int start,int pageSize,String keyWord) {
    return statisticDao.serviceRequest(start,pageSize,keyWord);
  }

}
