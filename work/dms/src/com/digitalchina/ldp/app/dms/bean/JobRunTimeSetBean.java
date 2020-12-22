package com.digitalchina.ldp.app.dms.bean;

import java.io.Serializable;

public class JobRunTimeSetBean
        implements Serializable
{
    private String chouquvalue;
    private String qingxivalue;
    private String zhuanhuanvalue;
    private String biduivalue;
    private String jiazaivalue;

    public String getChouquvalue()
    {
        return this.chouquvalue;
    }

    public void setChouquvalue(String chouquvalue) {
        this.chouquvalue = chouquvalue;
    }

    public String getQingxivalue() {
        return this.qingxivalue;
    }

    public void setQingxivalue(String qingxivalue) {
        this.qingxivalue = qingxivalue;
    }

    public String getZhuanhuanvalue() {
        return this.zhuanhuanvalue;
    }

    public void setZhuanhuanvalue(String zhuanhuanvalue) {
        this.zhuanhuanvalue = zhuanhuanvalue;
    }

    public String getBiduivalue() {
        return this.biduivalue;
    }

    public void setBiduivalue(String biduivalue) {
        this.biduivalue = biduivalue;
    }

    public String getJiazaivalue() {
        return this.jiazaivalue;
    }

    public void setJiazaivalue(String jiazaivalue) {
        this.jiazaivalue = jiazaivalue;
    }
}