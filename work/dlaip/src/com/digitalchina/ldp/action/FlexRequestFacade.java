package com.digitalchina.ldp.action;

import java.util.Map;
import java.util.Map.Entry;


import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.digitalchina.ldp.bean.ExceptionInfoBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.common.constant.Constant;
import com.digitalchina.ldp.handler.Handler;
import com.digitalchina.ldp.handler.HandlerContainer;
import com.thoughtworks.xstream.XStream;

public class FlexRequestFacade
{
	private HandlerContainer handlerContainer;
	// 是否验证用户session信息

	
	public void setHandlerContainer(HandlerContainer handlerContainer)
	{
		this.handlerContainer = handlerContainer;
	}

	private boolean isPrint = false;
	private static final Log log = LogFactory.getLog(FlexRequestFacade.class);

	public void setPrint(boolean isPrint)
	{
		this.isPrint = isPrint;
	}

	public String proxy(Map<String, Object> argsMap)
	{
		Model model=Constant.threadLocalModel.get();
		/*
		if (this.isCheckSession)
		{
			Subject currentUser = SecurityUtils.getSubject();
			// HttpSession session=request.getSession();
			// user = (UserInfoBean)
			// session.getAttribute(Constant.USER_SESSION_ID);
			Session session = currentUser.getSession();
			if (null != session)
			{
				user = (UserInfoBean) session
						.getAttribute(Constant.USER_SESSION_ID);
			}
			if (user == null)
			{
				String msg = "用户会话已过期";
				HttpServletRequest request=model.getRequest();
				String url="http://"+request.getLocalAddr()+":"+request.getLocalPort()+request.getSession().getServletContext().getContextPath();
				String responseData = "{\"success\":false,\"msg\":" + "\""+ msg + "\",\"url\":" + "\""+ url + "\",\"forward\":true}";
				model.getSystemModel().setErrorMsg(msg);
				return responseData;
			
			}
			model.getSystemModel().setUser(user);

		}
		*/
		String handler = (String) argsMap.get("handler");
		String method = (String) argsMap.get("method");
		String dataType = (String) argsMap.get("dataType");
		if (StringUtils.isEmpty(dataType))
		{
			dataType = "xml";
			argsMap.remove("dataType");
		}
		if (StringUtils.isEmpty(handler) || StringUtils.isEmpty(method))
		{
			model.getSystemModel().setErrorMsg("核心参数不能为空");
			return this.toErrorMsg("核心参数不能为空");
		}
		argsMap.remove("handler");
		argsMap.remove("method");
		model.getSystemModel().setDataType(dataType);
		model.getSystemModel().setHandler(handler);
		model.getSystemModel().setMethod(method);
		model.getSystemModel().setAppCode("amp");
		for (Entry<String, Object> entry : argsMap.entrySet())
		{
			model.add(entry.getKey(), entry.getValue().toString());
		}
		Handler<String> hand = handlerContainer.getHandler(handler, model
				.getSystemModel().getAppCode());
		if (hand == null)
		{
			model.getSystemModel()
					.setErrorMsg("未找到对应的Handler[" + handler + "]");
			return this.toErrorMsg("未找到对应的Handler[" + handler + "]");

		}
		String responseData = hand.execute(model);
		if (this.isPrint)
		{
			log.info(responseData);
		}
		return responseData;
	}

	/**
	 * 构建Flex调用异常消息
	 * 
	 * @return
	 */
	private String toErrorMsg(String msg)
	{
		ExceptionInfoBean bean = new ExceptionInfoBean();
		bean.setMsg(msg);
		bean.setSuccess(false);
		XStream xStream = new XStream();
		return xStream.toXML(bean);
	}
}
