/*
 * 创建日期 2013-4-25
 */
package com.digitalchina.ldp.app.dms.bean;

import com.digitalchina.ldp.bean.PageList;

/**
 * 重新构造页面结果参数
 * 
 * @author xiaojun
 * @version 1.0
 * @since 2013-4-25
 */
public class SpecilPageList<E> extends PageList<E> implements java.io.Serializable
{
	private String	currColParam;
	private String	nextColParam;
	private String	nextParam;
	private String	nextGroupField;
	private Integer	currStep;
	private Integer	lastStep;
	private Integer	nextStep;

	public String getCurrColParam()
	{
		return currColParam;
	}

	public void setCurrColParam(String currColParam)
	{
		this.currColParam = currColParam;
	}

	public Integer getCurrStep()
	{
		return currStep;
	}

	public void setCurrStep(Integer currStep)
	{
		this.currStep = currStep;
	}

	public Integer getLastStep()
	{
		return lastStep;
	}

	public void setLastStep(Integer lastStep)
	{
		this.lastStep = lastStep;
	}

	public Integer getNextStep()
	{
		return nextStep;
	}

	public void setNextStep(Integer nextStep)
	{
		this.nextStep = nextStep;
	}

	public String getNextColParam()
	{
		return nextColParam;
	}

	public void setNextColParam(String nextColParam)
	{
		this.nextColParam = nextColParam;
	}

	public String getNextGroupField()
	{
		return nextGroupField;
	}

	public void setNextGroupField(String nextGroupField)
	{
		this.nextGroupField = nextGroupField;
	}

	public String getNextParam()
	{
		return nextParam;
	}

	public void setNextParam(String nextParam)
	{
		this.nextParam = nextParam;
	}

}
