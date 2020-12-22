package com.digitalchina.ldp.app.common.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.digitalchina.ldp.app.ums.bean.AppInfoBean;
@Table(name="SERVICE_LOG_INFO")
@SuppressWarnings("serial")
public class ServiceLogBean implements java.io.Serializable
{
	@Id
	@Column(name="SERVICE_ID",nullable=false,length=36)
	private String serviceId;
	@Column(name="SERVICE_NAME",nullable=false,length=100)
	private String serviceName;
	@Column(name="SERVICE_METHOD",nullable=false,length=100)
	private String serviceMethod;
	@Column(name="IN_PARAM",length=1024)
	private String inParam;
	@Column(name="CREATE_DATE",nullable=false)
	private Date createDate;
	@Column(name="CONSUME_TIME")
	private int consumeTime;
	@Column(name="IS_EXCEPTION")
	private int isException;
	@ManyToOne
	@Column(name="SYSTEM_ID",nullable=false,length=36)
	private AppInfoBean systemId;
	@Column(name="OUT_PARAM",length=1024)
    private String outParam;
	public String getServiceId()
	{
		return serviceId;
	}
	public void setServiceId(String serviceId)
	{
		this.serviceId = serviceId;
	}
	public String getServiceName()
	{
		return serviceName;
	}
	public void setServiceName(String serviceName)
	{
		this.serviceName = serviceName;
	}
	public String getServiceMethod()
	{
		return serviceMethod;
	}
	public void setServiceMethod(String serviceMethod)
	{
		this.serviceMethod = serviceMethod;
	}
	public String getInParam()
	{
		return inParam;
	}
	public void setInParam(String inParam)
	{
		this.inParam = inParam;
	}
	public Date getCreateDate()
	{
		return createDate;
	}
	public void setCreateDate(Date createDate)
	{
		this.createDate = createDate;
	}
	public int getConsumeTime()
	{
		return consumeTime;
	}
	public void setConsumeTime(int consumeTime)
	{
		this.consumeTime = consumeTime;
	}
	public int getIsException()
	{
		return isException;
	}
	public void setIsException(int isException)
	{
		this.isException = isException;
	}
	public AppInfoBean getSystemId()
	{
		return systemId;
	}
	public void setSystemId(AppInfoBean systemId)
	{
		this.systemId = systemId;
	}
    /**
     * @return the outParam
     */
    public String getOutParam() {
        return outParam;
    }
    /**
     * @param outParam the outParam to set
     */
    public void setOutParam(String outParam) {
        this.outParam = outParam;
    }
}
