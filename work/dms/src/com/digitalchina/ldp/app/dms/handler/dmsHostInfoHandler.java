package com.digitalchina.ldp.app.dms.handler;

import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.handler.AbstractExtHandler;

public class dmsHostInfoHandler extends AbstractExtHandler {
    @Override
    public ViewModel page(Model model)
    {
        ViewModel viewModel = new ViewModel("hostmonitor/hostinfo.jsp",
                "hostmonitor/hostinfo.js");
        model.getRequest().setAttribute("id",model.get("id"));
        model.getRequest().setAttribute("type",model.getValue("type"));
        return viewModel;
    }
}
