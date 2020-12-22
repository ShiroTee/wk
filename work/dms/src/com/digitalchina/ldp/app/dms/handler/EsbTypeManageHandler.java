package com.digitalchina.ldp.app.dms.handler;

import com.digitalchina.ldp.app.dms.service.EsbLogManageService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.common.util.DbContextHolder;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;
import java.io.PrintStream;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EsbTypeManageHandler
        extends AbstractExtHandler
{
    @Autowired
    private EsbLogManageService esbLogManageService;

    public ViewModel page(Model model)
    {
        ViewModel viewModel = new ViewModel("esblog/esbtypemanage.jsp", "esblog/esbtypemanage.js");
        return viewModel;
    }

    public PageList<Map<String, Object>> getServicesByType(Model model)
    {
        int start = model.getInt("start");
        int end = model.getInt("limit");
        String type_id = model.getValue("typeMax");
        String channel_id = model.getValue("channel");
        String pro_id = model.getValue("protocol");
        PageList<Map<String, Object>> pageList = this.esbLogManageService
                .getServicesByType(start, end, type_id, channel_id, pro_id);
        List<Map<String, Object>> list = pageList.getList();
        DbContextHolder.setDefaultDbType("esb");
        for (Map<String, Object> map : list) {
            map.put("SERVICE_COUNT",
                    Integer.valueOf(this.esbLogManageService.getCountByServiceid(StringUtils.objToString(map.get("SERVICE_ID")), StringUtils.objToString(map.get("CHANNEL_ID")))));
        }
        return pageList;
    }

    public String addService(Model model)
    {
        String channel = model.getValueNotEmpty("CHANNEL_ID");
        String channelcode = model.getValueNotEmpty("CHANNEL_CODE");
        String serid = model.getValueNotEmpty("SERVICE_ID");
        String protocol = model.getValueNotEmpty("PROTOCOL_ID");
        this.esbLogManageService.addService(serid, channel, channelcode, protocol);
        return "{success:true}";
    }

    public String updateService(Model model)
    {
        String chanid_old = model.getValueNotEmpty("CHANNEL_ID_OLD");
        String serid = model.getValueNotEmpty("SERVICE_ID");

        String chancode = model.getValueNotEmpty("CHANNEL_CODE");
        String protocol = model.getValueNotEmpty("PROTOCOL_ID");
        this.esbLogManageService.updateService(chanid_old, serid, "", chancode, protocol, "");
        return "{success:true}";
    }

    public String delService(Model model)
    {
        String ids = model.getValue("jsonData");
        String reslutStr = ids.replace("[", "(").replace("]", ")").replaceAll("\"", "");
        System.out.println(reslutStr);
        String shows = reslutStr.substring(1, reslutStr.length() - 1);
        System.out.println(shows);
        String[] str = shows.split(",");
        this.esbLogManageService.delService(str);
        return "{success:true}";
    }
}