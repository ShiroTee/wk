package com.digitalchina.ldp.app.sps.handler;

import com.digitalchina.ldp.app.sps.bean.AssetWithApplyStatistics;
import com.digitalchina.ldp.app.sps.bean.ResourceCatalogueInfo;
import com.digitalchina.ldp.app.sps.service.ResourceCatalogueService;
import com.digitalchina.ldp.app.sps.service.ServiceManager;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import com.digitalchina.ldp.handler.AbstractHandler;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class ResourceCatalogueInfoHandler extends AbstractHandler {
    @Autowired
    private ResourceCatalogueService resourceCatalogueService;
    @Autowired
    private ServiceManager serviceManager;

    /**
     * 获取资源目录列表
     *
     * @param model
     * @return
     */
    public PageList<ResourceCatalogueInfo> getPageList(Model model) {
        int start = model.getInt("start");
        int pageSize = model.getInt("limit");
        String orgId = model.getValue("orgId");
        String archCateId = model.getValue("archCateId");
        String sm_flag = model.getValue("sm_flag");
        if (BeanDefineConfigue.getProperty("ORG_DEFAULT_ID").equals(orgId)) {
            orgId = "";
        }
        String aseetName = model.getValue("assetName");
        return resourceCatalogueService.getSearch(start, pageSize, orgId, aseetName, archCateId, sm_flag);
    }

    //更新资源发布状态
    public String updaeRdStatus(Model model) {
        String resourceIds = model.getValueNotEmpty("resourceIds");
        int status = model.getInt("status");
        this.resourceCatalogueService.updateResourceCatalogueInfo(resourceIds, status);

        return "{success:true}";
    }

    //获取资源目录接口，按不同纬度进行查询
    public PageList<ResourceCatalogueInfo> query(Model model) {
        return null;
    }

    @HttpService
    public List<ResourceCatalogueInfo> getResourceDetail(Model model) {
        String resourceId = model.getValueNotEmpty("resourceId");
        List<ResourceCatalogueInfo> list = new ArrayList<ResourceCatalogueInfo>(1);
        list.add(this.resourceCatalogueService.getByResourceId(resourceId));
        return list;
    }

    @HttpService
    public List<AssetWithApplyStatistics> getResourceDetailWithStatistics(Model model) {
        String resourceId = model.getValueNotEmpty("resourceId");
        List<AssetWithApplyStatistics> list = new ArrayList<AssetWithApplyStatistics>(1);
        list.add(this.resourceCatalogueService.getByResourceIdWithStatistics(resourceId));
        return list;
    }

    /**
     * 根据主题分类加载该分类下的所有信息资源条目.
     *
     * @param model
     * @return
     */
    @HttpService
    public PageList<ResourceCatalogueInfo> getResourceByType(Model model) {
        int start = model.getInt("start");
        int pageSize = model.getInt("limit");
        String typId = model.getValue("typId");
        String isRoot = model.getValue("isRoot");
        Map<String, String> args = new HashMap<String, String>();
        args.put("type", typId);
        args.put("isRoot", isRoot);
        return resourceCatalogueService.queryByType(start, pageSize, args);
    }

    /**
     * 根据主题分类加载该分类下的所有信息资源条目.
     *
     * @param model
     * @return
     */
    @HttpService
    public PageList<DynamicBean> getResourceByTypeForLiuZhou(Model model) {
        int start = model.getInt("start");
        int pageSize = model.getInt("limit");
        String typId = model.getValue("typId");
        String isRoot = model.getValue("isRoot");
        Map<String, String> args = new HashMap<String, String>();
        args.put("type", typId);
        args.put("isRoot", isRoot);
        return resourceCatalogueService.queryByTypeForLiuZhou(start, pageSize, args);
    }

    /**
     * 关联资源目录与服务的关系
     *
     * @param model
     * @return
     */
    public String saveWebServiceInto(Model model) {
        String resourceId = model.getValueNotEmpty("resourceId");
        String[] arrays = model.getArrays("serviceIds");
        this.serviceManager.editServiceByResouce(arrays, resourceId);
        return SUCCESS_JSON;
    }

    /**
     * 删除与资源目录相关联的web服务
     *
     * @param model
     * @return
     */
    public String deleteServiceInfo(Model model) {
        String routeId = model.getValueNotEmpty("routeId");
        this.serviceManager.updateResouceIsNull(routeId);
        return SUCCESS_JSON;
    }

    /**
     * 获取授权Key绑定的资产目录列表
     *
     * @param model
     * @return
     */
    public PageList<ResourceCatalogueInfo> getPageListByAuthKey(Model model) {
        String key = model.getValueNotEmpty("key");
        String start = model.getValueNotEmpty("start");
        String limit = model.getValueNotEmpty("limit");
        return resourceCatalogueService.getPageListByAuthKey(key, start, limit);
    }

    /**
     * 删除一条关系数据
     *
     * @param model
     * @return
     */
    public String deleteData(Model model) {
        try {
            Boolean b = this.resourceCatalogueService.deleteData(model.getValueNotEmpty("assetId"),
                    model.getValueNotEmpty("authId"));
            if (!b) {
                return "{success:false,msg:'删除失败，请稍后重试！'}";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "{success:false,msg:'发生错误，删除失败'}";
        }
        return "{success:true}";
    }

    /**
     * 修改一条资源组成的启用状态
     *
     * @param model
     * @return
     */
    public String updateStatus(Model model) {
        try {
            Boolean b = this.resourceCatalogueService.updateStatus(model.getValueNotEmpty("id"),
                    model.getValueNotEmpty("tableName"), model.getValueNotEmpty("value"));
            if (!b) {
                return "{success:false,msg:'操作失败，请稍后重试！'}";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "{success:false,msg:'发生错误，操作失败'}";
        }
        return "{success:true}";
    }

    /**
     * 修改若干条资源组成的启用状态
     *
     * @param model
     * @return
     */
    public String updateAllStopOrStart(Model model) {
        try {
            Boolean b = this.resourceCatalogueService.updateAllStopOrStart(model.getValueNotEmpty("ids"),
                    model.getValueNotEmpty("tableNames"), model.getValueNotEmpty("value"));
            if (!b) {
                return "{success:false,msg:'操作失败，请稍后重试！'}";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "{success:false,msg:'发生错误，操作失败'}";
        }
        return SUCCESS_JSON;
    }

    public String editRate(Model model) {
        String resourceId = model.getValueNotEmpty("resourceId");
        Integer updateRate = model.getInt("updateRate");
        if (!model.getValue("finalUpdateDate").equals("")) {
            model.getDate("finalUpdateDate");
        }
        ResourceCatalogueInfo r = new ResourceCatalogueInfo();
        r.setFinalUpdateDate(model.getValue("finalUpdateDate"));
        r.setResourceId(resourceId);
        r.setUpdateRate(updateRate);
        this.resourceCatalogueService.editRate(r);
        return SUCCESS_JSON;
    }

    @HttpService
    public PageList<ResourceCatalogueInfo> queryByAssetName(Model model) {
        int start = model.getInt("start");
        int pageSize = model.getInt("limit");
        String keyWord = model.getValue("kw");
        return resourceCatalogueService.laodResourceByOrg(start, pageSize, "", keyWord);
    }

    @HttpService
    public PageList<DynamicBean> queryByAssetNameForLiuZhou(Model model) {
        int start = model.getInt("start");
        int pageSize = model.getInt("limit");
        String keyWord = model.getValue("kw");
        return resourceCatalogueService.laodResourceByOrgForLiuZhou(start, pageSize, keyWord);
    }
}

