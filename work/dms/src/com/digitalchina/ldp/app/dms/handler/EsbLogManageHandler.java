package com.digitalchina.ldp.app.dms.handler;

import com.digitalchina.ldp.app.dms.bean.EsbTransLogBean;
import com.digitalchina.ldp.app.dms.service.EsbLogManageService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.common.util.DbContextHolder;
import com.digitalchina.ldp.handler.AbstractExtHandler;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EsbLogManageHandler
        extends AbstractExtHandler
{
    @Autowired
    private EsbLogManageService esbLogManageService;

    public ViewModel page(Model model)
    {
        ViewModel viewModel = new ViewModel("esblog/esblogManage.jsp", "esblog/esblogManage.js");
        return viewModel;
    }

    public PageList<EsbTransLogBean> getEsbLogManageList(Model model)
    {
        int start = model.getInt("start");
        int end = model.getInt("limit");
        DbContextHolder.setDefaultDbType("esb");
        PageList<EsbTransLogBean> list = this.esbLogManageService.find(start, end, model);
        return list;
    }

    public String getLogDetail(Model model)
    {
        String esbflowno = model.getValueNotEmpty("esbflowno");
        String flowstepid = model.getValueNotEmpty("flowstepid");
        DbContextHolder.setDefaultDbType("esb");
        String detialLog = this.esbLogManageService.getLogDetail(esbflowno, flowstepid);
        Base64 base64 = new Base64();
        byte[] enbytes = base64.encode(detialLog.getBytes());
        detialLog = new String(enbytes);
        return "{\"success\":true,\"detialLog\":'" + detialLog + "'}";
    }
}