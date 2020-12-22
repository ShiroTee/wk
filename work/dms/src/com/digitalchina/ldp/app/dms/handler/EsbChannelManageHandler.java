package com.digitalchina.ldp.app.dms.handler;

import com.digitalchina.ldp.app.dms.service.EsbChannelManageService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.handler.AbstractExtHandler;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EsbChannelManageHandler
        extends AbstractExtHandler
{
    @Autowired
    private EsbChannelManageService esbChannelManageService;

    public ViewModel page(Model model)
    {
        ViewModel viewModel = new ViewModel("esblog/esbchannelmanage.jsp", "esblog/esbchannelmanage.js");
        return viewModel;
    }

    public PageList<Map<String, Object>> getChannel(Model model)
    {
        int start = model.getInt("start");
        int end = model.getInt("limit");
        String channel_name = model.getValue("param_channel_name");
        String channel_code = model.getValue("param_channel_code");
        Map<String, String> args = new HashMap();
        args.put("channel_code", channel_code);
        args.put("channel_name", channel_name);
        PageList<Map<String, Object>> pageList = this.esbChannelManageService.find(start, end, args);
        return pageList;
    }

    public String add(Model model)
    {
        String channame = model.getValueNotEmpty("CHANNEL_NAME");
        String chancode = model.getValueNotEmpty("CHANNEL_CODE");
        this.esbChannelManageService.addChannel(chancode, channame);
        return "{success:true}";
    }

    public String update(Model model)
    {
        String chancode_old = model.getValueNotEmpty("CHANNEL_CODE_OLD");
        String channame = model.getValueNotEmpty("CHANNEL_NAME");
        this.esbChannelManageService.updateChannel(chancode_old, "", channame);
        return "{success:true}";
    }

    public String delete(Model model)
    {
        String ids = model.getValue("jsonData");
        String reslutStr = ids.replace("[", "(").replace("]", ")").replaceAll("\"", "");
        String shows = reslutStr.substring(1, reslutStr.length() - 1);
        String[] str = shows.split(",");
        this.esbChannelManageService.delChannel(str);
        return "{success:true}";
    }
}
