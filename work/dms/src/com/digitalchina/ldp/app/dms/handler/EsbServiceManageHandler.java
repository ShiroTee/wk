package com.digitalchina.ldp.app.dms.handler;

import com.digitalchina.ldp.app.dms.service.EsbServiceManageService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.handler.AbstractExtHandler;
import java.io.PrintStream;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EsbServiceManageHandler
        extends AbstractExtHandler
{
    @Autowired
    private EsbServiceManageService esbServiceManageService;

    public ViewModel page(Model model)
    {
        ViewModel viewModel = new ViewModel("esblog/esbservicemanage.jsp", "esblog/esbservicemanage.js");
        return viewModel;
    }

    public PageList<Map<String, Object>> getServices(Model model)
    {
        int start = model.getInt("start");
        int end = model.getInt("limit");
        String type_id = model.getValue("typeMax");
        String service_name = model.getValue("param_service_name");
        String service_id = model.getValue("param_service_id");
        Map<String, String> args = new HashMap();
        args.put("type_id", type_id);
        args.put("service_name", service_name);
        args.put("service_id", service_id);
        PageList<Map<String, Object>> pageList = this.esbServiceManageService.find(start, end, args);
        return pageList;
    }

    public String addService(Model model)
    {
        String serid = model.getValueNotEmpty("SERVICE_ID");
        String sername = model.getValueNotEmpty("SERVICE_NAME");
        String typeid = model.getValueNotEmpty("TYPE_ID");
        this.esbServiceManageService.addService(serid, sername, typeid);
        return "{success:true}";
    }

    public String updateService(Model model)
    {
        String serid_old = model.getValueNotEmpty("SERVICE_ID_OLD");
        String sername = model.getValueNotEmpty("SERVICE_NAME");
        String typeid = model.getValueNotEmpty("TYPE_ID");
        this.esbServiceManageService.updateService(serid_old, "", sername, typeid);
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
        this.esbServiceManageService.delService(str);
        return "{success:true}";
    }

    public PageList<Map<String, Object>> getServiceType(Model model)
    {
        int start = model.getInt("start");
        int end = model.getInt("limit");
        String type_name = model.getValue("param_type_name");
        String type_id = model.getValue("param_type_id");
        Map<String, String> args = new HashMap();
        args.put("type_id", type_id);
        args.put("type_name", type_name);
        PageList<Map<String, Object>> pageList = this.esbServiceManageService.findServiceType(start, end, args);
        return pageList;
    }

    public String addServiceType(Model model)
    {
        String typename = model.getValueNotEmpty("TYPE_NAME");
        String typeid = model.getValueNotEmpty("TYPE_ID");
        this.esbServiceManageService.addServiceType(typeid, typename);
        return "{success:true}";
    }

    public String updateServiceType(Model model)
    {
        String typeid_old = model.getValueNotEmpty("TYPE_ID_OLD");
        String typename = model.getValueNotEmpty("TYPE_NAME");
        this.esbServiceManageService.updateServiceType(typeid_old, "", typename);
        return "{success:true}";
    }

    public String delServiceType(Model model)
    {
        String ids = model.getValue("jsonData");
        String reslutStr = ids.replace("[", "(").replace("]", ")").replaceAll("\"", "");
        String shows = reslutStr.substring(1, reslutStr.length() - 1);
        String[] str = shows.split(",");
        this.esbServiceManageService.delServiceType(str);
        return "{success:true}";
    }
}