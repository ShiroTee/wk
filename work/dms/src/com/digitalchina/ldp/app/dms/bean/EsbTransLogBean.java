package com.digitalchina.ldp.app.dms.bean;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;
import java.io.Serializable;

@Table(name="ESB2_TRANS_LOG")
public class EsbTransLogBean
        implements Serializable
{
    @Column(name="ESBFLOWNO")
    private String esbflowno;
    @Column(name="FLOWSTEPID")
    private String flowstepid;
    @Column(name="ESBSERVICEFLOWNO")
    private String serviceflowno;
    @Column(name="ESBSERVSEQU")
    private String esbservsequ;
    @Column(name="REQFLOWNO")
    private String reqflowno;
    @Column(name="RESPFLOWNO")
    private String respflowno;
    @Column(name="SERVICETYPE")
    private String servicetype;
    @Column(name="TRANSTAMP")
    private String transtamp;
    @Column(name="LOCATIONID")
    private String locationid;
    @Column(name="CHANNELID")
    private String channelid;
    @Column(name="SERVICEID")
    private String serviceid;
    @Column(name="RESPSTATUS")
    private String respstatus;
    @Column(name="RESPCODE")
    private String respcode;
    @Column(name="RESPMSG")
    private String respmsg;
    @Column(name="OPERSTAMP")
    private String operstamp;
    private String service_name;
    private String channel_name;
    private String type_name;

    public String getEsbflowno()
    {
        return this.esbflowno;
    }

    public void setEsbflowno(String esbflowno)
    {
        this.esbflowno = esbflowno;
    }

    public String getFlowstepid()
    {
        return this.flowstepid;
    }

    public void setFlowstepid(String flowstepid)
    {
        this.flowstepid = flowstepid;
    }

    public String getServiceflowno()
    {
        return this.serviceflowno;
    }

    public void setServiceflowno(String serviceflowno)
    {
        this.serviceflowno = serviceflowno;
    }

    public String getEsbservsequ()
    {
        return this.esbservsequ;
    }

    public void setEsbservsequ(String esbservsequ)
    {
        this.esbservsequ = esbservsequ;
    }

    public String getReqflowno()
    {
        return this.reqflowno;
    }

    public void setReqflowno(String reqflowno)
    {
        this.reqflowno = reqflowno;
    }

    public String getRespflowno()
    {
        return this.respflowno;
    }

    public void setRespflowno(String respflowno)
    {
        this.respflowno = respflowno;
    }

    public String getServicetype()
    {
        return this.servicetype;
    }

    public void setServicetype(String servicetype)
    {
        this.servicetype = servicetype;
    }

    public String getTranstamp()
    {
        return this.transtamp;
    }

    public void setTranstamp(String transtamp)
    {
        this.transtamp = transtamp;
    }

    public String getLocationid()
    {
        return this.locationid;
    }

    public void setLocationid(String locationid)
    {
        this.locationid = locationid;
    }

    public String getChannelid()
    {
        return this.channelid;
    }

    public void setChannelid(String channelid)
    {
        this.channelid = channelid;
    }

    public String getServiceid()
    {
        return this.serviceid;
    }

    public void setServiceid(String serviceid)
    {
        this.serviceid = serviceid;
    }

    public String getRespstatus()
    {
        return this.respstatus;
    }

    public void setRespstatus(String respstatus)
    {
        this.respstatus = respstatus;
    }

    public String getRespcode()
    {
        return this.respcode;
    }

    public void setRespcode(String respcode)
    {
        this.respcode = respcode;
    }

    public String getRespmsg()
    {
        return this.respmsg;
    }

    public void setRespmsg(String respmsg)
    {
        this.respmsg = respmsg;
    }

    public String getOperstamp()
    {
        return this.operstamp;
    }

    public void setOperstamp(String operstamp)
    {
        this.operstamp = operstamp;
    }

    public String getService_name()
    {
        return this.service_name;
    }

    public void setService_name(String serviceName)
    {
        this.service_name = serviceName;
    }

    public String getType_name()
    {
        return this.type_name;
    }

    public void setType_name(String typeName)
    {
        this.type_name = typeName;
    }

    public String getChannel_name()
    {
        return this.channel_name;
    }

    public void setChannel_name(String channelName)
    {
        this.channel_name = channelName;
    }
}