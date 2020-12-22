package com.digitalchina.ldp.app.osp.handler;

import com.digitalchina.ldp.app.osp.bean.ServiceBean;
import com.digitalchina.ldp.app.osp.bean.ServiceTypeBean;
import com.digitalchina.ldp.app.osp.defination.BS_PARAM;
import com.digitalchina.ldp.app.osp.service.ServiceCoreService;
import com.digitalchina.ldp.app.osp.service.ServiceStatisticService;
import com.digitalchina.ldp.app.osp.util.AuthUtil;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.handler.AbstractHandler;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * 读取服务列表的Handler
 */
@Component
public class ServiceListHandler extends AbstractHandler {
    private static Logger logger = Logger.getLogger(ServiceListHandler.class.getName());
    @Autowired
    private ServiceCoreService serviceCoreService;
    
    @Autowired
    private ServiceStatisticService serviceStatisticService;

    /**
     * 从高到低，依据点击量获取服务列表
     */
    @HttpService
    public PageList<ServiceBean> listServiceByAccessing(Model model) {
        AuthUtil.writeInfo(model, logger);
    	 int start = model.getInt(BS_PARAM.BS_START_STR);
         int size = model.getInt(BS_PARAM.BS_LIMIT_STR);
        return serviceStatisticService.listServiceByAccessing(start, size);
    }
    
    /**
     * 从高到低，依据收藏数获取服务列表
     */
    @HttpService
    public PageList<ServiceBean> listServiceByCollect(Model model) {
        AuthUtil.writeInfo(model, logger);
    	 int start = model.getInt(BS_PARAM.BS_START_STR);
         int size = model.getInt(BS_PARAM.BS_LIMIT_STR);
        return serviceStatisticService.listServiceByCollect(start, size);
    }

    /**
     * 从近到远，依据服务发布时间获取服务列表
     */
    @HttpService
    public PageList<ServiceBean> listFreshService(Model model) {
        AuthUtil.writeInfo(model, logger);
        int start = model.getInt(BS_PARAM.BS_START_STR);
        int size = model.getInt(BS_PARAM.BS_LIMIT_STR);
        String parentType = model.getValue(BS_PARAM.BS_PARENT_TYPE_ID_STR);
        return serviceCoreService.listFreshService(start, size, parentType);
    }

    /**
     * 从高到低，依据调用次数获取服务列表
     */
    @HttpService
    public PageList<ServiceBean> listServiceByInvoking(Model model) {
        AuthUtil.writeInfo(model, logger);
        int start = model.getInt(BS_PARAM.BS_START_STR);
        int size = model.getInt(BS_PARAM.BS_LIMIT_STR);
        return serviceStatisticService.listServiceByInvoking(start, size);
    }

    /**
     * 依据指定的类别获取服务列表
     */
    @HttpService
    public PageList<ServiceBean> listServiceByType(Model model) {
        AuthUtil.writeInfo(model, logger);
        String serviceType = model.getValue(BS_PARAM.BS_SERVICE_TYPE_STR);
        int start = model.getInt(BS_PARAM.BS_START_STR);
        int size = model.getInt(BS_PARAM.BS_LIMIT_STR);
        String keyWord = model.getValue(BS_PARAM.BS_SEARCH_KEY_WORD_STR);
        return serviceCoreService.listServiceByType(start, size, serviceType, keyWord);
    }


    /**
     * 获取服务类别列表
     */
    @HttpService
    public PageList<ServiceTypeBean> listServiceType(Model model) {
        AuthUtil.writeInfo(model, logger);
        String parentType = model.getValue(BS_PARAM.BS_PARENT_TYPE_ID_STR);
        int start = model.getInt(BS_PARAM.BS_START_STR);
        int size = model.getInt(BS_PARAM.BS_LIMIT_STR);
        String keyWord = model.getValue(BS_PARAM.BS_SEARCH_KEY_WORD_STR);
        return serviceCoreService.listServiceType(start, size, parentType, keyWord);
    }

    /**
     * 搜索服务
     */
    @HttpService
    public PageList<ServiceBean> searchService(Model model) {
        AuthUtil.writeInfo(model, logger);
        int start = model.getInt(BS_PARAM.BS_START_STR);
        int size = model.getInt(BS_PARAM.BS_LIMIT_STR);
        String keyWord = model.getValueNotEmpty(BS_PARAM.BS_SEARCH_KEY_WORD_STR);
        String parentType = model.getValue(BS_PARAM.BS_PARENT_TYPE_ID_STR);
        return serviceCoreService.searchService(start, size, keyWord, parentType);
    }

    /**
     * 依据收藏数查询服务列表
     */
    @HttpService
    public PageList<ServiceBean> listServiceByCollectCount(Model model) {
        AuthUtil.writeInfo(model, logger);
        int start = model.getInt(BS_PARAM.BS_START_STR);
        int size = model.getInt(BS_PARAM.BS_LIMIT_STR);
        String parentType = model.getValue(BS_PARAM.BS_PARENT_TYPE_ID_STR);
        return serviceStatisticService.listServiceByCollectCount(start, size, parentType);
    }


    /**
     * 根据服务类型、关键字(可选)查询服务
     * 并按一定条件排序
     */
    @HttpService
    public PageList<ServiceBean> listService(Model model) {
        AuthUtil.writeInfo(model, logger);
        int start = model.getInt(BS_PARAM.BS_START_STR);
        int size = model.getInt(BS_PARAM.BS_LIMIT_STR);
        String serviceType = model.getValueNotEmpty(BS_PARAM.BS_SERVICE_TYPE_STR);
        String keyWord = model.getValue(BS_PARAM.BS_SEARCH_KEY_WORD_STR);
        int sortType = model.getInt("sortType");
        return serviceCoreService.listService(start, size, serviceType, keyWord, sortType);
    }
}
