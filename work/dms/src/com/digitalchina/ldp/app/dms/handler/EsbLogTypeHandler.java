package com.digitalchina.ldp.app.dms.handler;

import com.digitalchina.ldp.app.dms.bean.EsbTransLogBean;
import com.digitalchina.ldp.app.dms.service.EsbLogManageService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.common.util.CreateJson;
import com.digitalchina.ldp.common.util.DbContextHolder;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EsbLogTypeHandler
        extends AbstractExtHandler
{
    @Autowired
    private EsbLogManageService esbLogManageService;

    public ViewModel page(Model model)
    {
        ViewModel viewModel = new ViewModel("esblog/esblogtype.jsp", "esblog/esblogtype.js");
        return viewModel;
    }

    public PageList<EsbTransLogBean> getEsbLogTypeList(Model model)
    {
        int start = model.getInt("start");
        int end = model.getInt("limit");
        String type_id = model.getValue("typeMax");
        String channel_id = model.getValue("channel");
        String startTime = model.getValue("startTime");
        String endTime = model.getValue("endTime");

        Map<String, String> args = new HashMap();
        args.put("startTime", startTime);
        args.put("endTime", endTime);

        Map<String, String> servicesMap = new HashMap();

        String channelids = "";
        List<Map<String, Object>> serviceList = this.esbLogManageService.getServiceids(type_id, channel_id);
        for (Map<String, Object> map : serviceList)
        {
            String channelId = StringUtils.objToString(map.get("channel_id"));
            servicesMap.put(channelId, StringUtils.objToString(map.get("service_name")));
            servicesMap.put(channelId + "_channel", StringUtils.objToString(map.get("channel_name")));
            servicesMap.put(channelId + "_type", StringUtils.objToString(map.get("type_name")));
            channelids = channelids + "'" + channelId + "',";
        }
        if (channelids.length() > 0)
        {
            channelids = channelids.substring(0, channelids.length() - 1);
            args.put("channelids", channelids);
        }
        DbContextHolder.setDefaultDbType("esb");
        PageList<EsbTransLogBean> pageList = this.esbLogManageService.findByType(start, end, args);
        Object list = pageList.getList();
        for (Object esbTransLogBean : (List)list)
        {
            EsbTransLogBean bean= (EsbTransLogBean)esbTransLogBean;
           bean.setService_name((String)servicesMap.get(bean.getChannelid()));
            bean.setChannel_name((String)servicesMap.get(bean
                    .getChannelid() + "_channel"));
            bean.setType_name((String)servicesMap.get(bean
                    .getChannelid() + "_type"));
        }
        return pageList;
    }

    public PageList getEsbLogPieData(Model model)
    {
        String type_id = model.getValue("typeMax");
        String channel_id = model.getValue("channel");
        String startTime = model.getValue("startTime");
        String endTime = model.getValue("endTime");

        Map<String, String> args = new HashMap();
        args.put("startTime", startTime);
        args.put("endTime", endTime);

        Map<String, String> servicesMap = new HashMap();

        String channelids = "";
        List<Map<String, Object>> serviceList = this.esbLogManageService.getServiceids(type_id, channel_id);
        String channelid;
        for (Map<String, Object> map : serviceList)
        {
            channelid = StringUtils.objToString(map.get("channel_id"));
            String serviceid = StringUtils.objToString(map.get("service_id"));
            servicesMap.put(serviceid, StringUtils.objToString(map.get("service_name")));
            channelids = channelids + "'" + channelid + "',";
        }
        if (channelids.length() > 0)
        {
            channelids = channelids.substring(0, channelids.length() - 1);
            args.put("channelids", channelids);
        }
        DbContextHolder.setDefaultDbType("esb");
        List<Map<String, Object>> list = this.esbLogManageService.findByPie(args);
        for (Object tmpMap : list) {
            ((Map)tmpMap).put("service_name", servicesMap.get(((Map)tmpMap).get("serviceid")));
        }
        Object pageList = new PageList();
        ((PageList)pageList).setList(list);
        ((PageList)pageList).setCount(list.size());

        return (PageList)pageList;
    }

    public PageList<Map<String, Object>> getEsbChannelPieData(Model model)
    {
        String type_id = model.getValue("typeMax");
        String serviceId = model.getValue("service");
        String startTime = model.getValue("startTime");
        String endTime = model.getValue("endTime");

        Map<String, String> args = new HashMap();
        args.put("startTime", startTime);
        args.put("endTime", endTime);

        Map<String, String> servicesMap = new HashMap();

        String serviceids = "";

        List<Map<String, Object>> serviceList = new ArrayList();
        if (StringUtils.isEmpty(serviceId)) {
            serviceList = this.esbLogManageService.getServiceidsByTypeid(1, type_id);
        } else {
            serviceList = this.esbLogManageService.getServiceidsByTypeid(2, serviceId);
        }
        for (Map<String, Object> map : serviceList)
        {
            String serviceid = StringUtils.objToString(map.get("service_id"));
            servicesMap.put(serviceid, StringUtils.objToString(map.get("service_name")));
            serviceids = serviceids + "'" + serviceid + "',";
        }
        if (serviceids.length() > 0)
        {
            serviceids = serviceids.substring(0, serviceids.length() - 1);
            args.put("serviceids", serviceids);
        }
        List<Map<String, Object>> channelTypeList = this.esbLogManageService.getAllChannel();
        Object channeList = new ArrayList();
        Map<String, Object> channelMap = new HashMap();
        List<Map<String, Object>> resultList = new ArrayList();
        String channelids = "";
        String channel_code = "";
        for (Map<String, Object> map : channelTypeList)
        {
            channelids = "";
            DbContextHolder.setDefaultDbType("dms");
            channel_code = StringUtils.objToString(map.get("channel_code"));
            System.out.println("====渠道code：" + channel_code);
            channeList = this.esbLogManageService.getChannelsBypid(channel_code);
            for (Object channelid : (List)channeList) {
                Map<String,Object> channelId=(Map<String,Object>)channelid;
                channelids = channelids + "'" + channelId.get("channel_id") + "',";
            }
            args.remove("channelids");
            if (channelids.length() > 0)
            {
                channelids = channelids.substring(0, channelids.length() - 1);
                System.out.println("======channelids:" + channelids);
                args.put("channelids", channelids);
            }
            DbContextHolder.setDefaultDbType("esb");
            channelMap = this.esbLogManageService.findForChannelPie(args);
            System.out.println("=====次数：" + channelMap.get("SERVICES_COUNT"));
            System.out.println("====渠道：" + map.get("channel_name"));
            channelMap.put("channel_code", channel_code);
            channelMap.put("channel_name", map.get("channel_name"));
            if ((!StringUtils.isEmptyObj(channelMap.get("SERVICES_COUNT"))) &&
                    (Integer.parseInt(StringUtils.objToString(channelMap.get("SERVICES_COUNT"))) > 0)) {
                resultList.add(channelMap);
            }
        }
        DbContextHolder.setDefaultDbType("dms");
        PageList<Map<String, Object>> pageList = new PageList();
        pageList.setList(resultList);
        pageList.setCount(resultList.size());
        return pageList;
    }

    public PageList<Map<String, Object>> getTypeComBoxForJ(Model model)
    {
        List<Map<String, Object>> list = this.esbLogManageService.getTypeCombox();
        PageList<Map<String, Object>> pageList = new PageList();
        pageList.setList(list);
        pageList.setCount(list.size());
        return pageList;
    }

    public PageList<Map<String, Object>> getChannelComBoxForJ(Model model)
    {
        List<Map<String, Object>> list = this.esbLogManageService.getChannelComBox();
        PageList<Map<String, Object>> pageList = new PageList();
        pageList.setList(list);
        pageList.setCount(list.size());
        return pageList;
    }

    public PageList<Map<String, Object>> getServiceComBoxForJ(Model model)
    {
        String type_id = model.getValue("pid");
        List<Map<String, Object>> list = this.esbLogManageService.getServiceComBox(type_id);
        PageList<Map<String, Object>> pageList = new PageList();
        pageList.setList(list);
        pageList.setCount(list.size());
        return pageList;
    }

    public String getTypeComBox(Model model)
    {
        List<Map<String, Object>> list = this.esbLogManageService.getTypeCombox();
        CreateJson json = new CreateJson();
        for (Map<String, Object> map : list)
        {
            json.add("id", StringUtils.objToString(map.get("type_id")));
            json.add("name", StringUtils.objToString(map.get("type_name")));
            json.addToList();
        }
        return json.getResultJson();
    }

    public String getChannelComBox(Model model)
    {
        List<Map<String, Object>> list = this.esbLogManageService.getChannelComBox();
        CreateJson json = new CreateJson();
        for (Map<String, Object> map : list)
        {
            json.add("id", StringUtils.objToString(map.get("channel_code")));
            json.add("name", StringUtils.objToString(map.get("channel_name")));
            json.addToList();
        }
        return json.getResultJson();
    }

    public String getProtocolComBox(Model model)
    {
        List<Map<String, Object>> list = this.esbLogManageService.getProtocolComBox();
        CreateJson json = new CreateJson();
        for (Map<String, Object> map : list)
        {
            json.add("id", StringUtils.objToString(map.get("protocol_id")));
            json.add("name", StringUtils.objToString(map.get("protocol_name")));
            json.addToList();
        }
        return json.getResultJson();
    }

    public String getServiceComBox(Model model)
    {
        String type_id = model.getValue("pid");
        List<Map<String, Object>> list = this.esbLogManageService.getServiceComBox(type_id);
        CreateJson json = new CreateJson();
        for (Map<String, Object> map : list)
        {
            json.add("id", StringUtils.objToString(map.get("service_id")));
            json.add("name", StringUtils.objToString(map.get("service_name")));
            json.addToList();
        }
        return json.getResultJson();
    }
}