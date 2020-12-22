package com.digitalchina.ldp.app.osp.handler;

import com.digitalchina.ldp.app.osp.bean.QuickCommentBean;
import com.digitalchina.ldp.app.osp.bean.ServiceBean;
import com.digitalchina.ldp.app.osp.bean.ServiceCommentBean;
import com.digitalchina.ldp.app.osp.defination.BS_PARAM;
import com.digitalchina.ldp.app.osp.service.LogService;
import com.digitalchina.ldp.app.osp.service.ServiceCoreService;
import com.digitalchina.ldp.app.osp.util.AuthUtil;
import com.digitalchina.ldp.app.osp.util.BSUitl;
import com.digitalchina.ldp.app.smp.bean.ResponseTemplateInfo;
import com.digitalchina.ldp.app.smp.bean.ServiceParameterInfo;
import com.digitalchina.ldp.app.smp.service.ConfigResponseService;
import com.digitalchina.ldp.app.smp.service.ServiceParameterService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.handler.AbstractHandler;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * 处理服务详情的Handler
 * */
@Component
public class ServiceDetailHandler extends AbstractHandler {
	private static Logger logger = Logger.getLogger(ServiceDetailHandler.class.getName());
	@Autowired
	private ServiceCoreService serviceCoreService;
	@Autowired
	private LogService logService;
	@Autowired
	private ServiceParameterService serviceParameterService;
	@Autowired
	private ConfigResponseService configResponseService;
	
	/**
	 * 通过服务id查服务详情
	 */
	@HttpService 
	public ServiceBean getServiceDetail(Model model){
		AuthUtil.writeInfo(model, logger);
		logService.saveServiceAccessLog(model);
		String serviceId = model.getValue(BS_PARAM.BS_SERVICE_ID_STR);
		return serviceCoreService.getServiceDetail(serviceId);
	}
	
	/**
	 * 收藏服务
	 * */
	@HttpService
	public String saveFavoriteService(Model model){
		AuthUtil.writeInfo(model, logger);
		
		String result = "{\"success\":false}";
		
		String serviceId = model.getValue(BS_PARAM.BS_SERVICE_ID_STR);
		String userId = BSUitl.getSessionUserId(model);
		
		if(null != userId){
			serviceCoreService.saveFavoriteService(userId, serviceId);
			
			result = "{\"success\":true}";
		}
		return result;
	}

	/**
	 * 查询服务是否收藏
	 */
	@HttpService
	public String isServiceFavorited(Model model) {
		AuthUtil.writeInfo(model, logger);
		String result = "{\"success\":false}";
		
		String serviceId = model.getValue(BS_PARAM.BS_SERVICE_ID_STR);
		String userId = BSUitl.getSessionUserId(model);
		if(null != userId){
			result = serviceCoreService.isServiceFavorited(userId, serviceId);
		}
		
		return result;
	}

	/**
	 * 查询用户是否登录
	 */
	@HttpService
	public String isUserLogin(Model model) {
		AuthUtil.writeInfo(model, logger);
		String userId = BSUitl.getSessionUserId(model);
		if (null != userId) {
			return "{\"success\":true}";
		}
		return "{\"success\":false}";
	}

	/**
	 * 通过服务id查寻服务参数
	 */
	@HttpService
	public List<ServiceParameterInfo> getServiceParam(Model model) {
		AuthUtil.writeInfo(model, logger);
		String serviceId = model.getValue(BS_PARAM.BS_SERVICE_ID_STR);
		return serviceParameterService.getParameterList(serviceId);
	}
	
	
	@HttpService
	public ResponseTemplateInfo getServiceResponse(Model model){
		AuthUtil.writeInfo(model, logger);
		String serviceId = model.getValue(BS_PARAM.BS_SERVICE_ID_STR);
		return configResponseService.getResponseTemplateByRouteId(serviceId);
	}
	
	
	/**
	 * 保存评论
	 * */
	@HttpService
	public String saveComment(Model model){
		AuthUtil.writeInfo(model, logger);
		String userId = BSUitl.getSessionUserId(model);
		if(null != userId){
			String serviceId = model.getValueNotEmpty(BS_PARAM.BS_SERVICE_ID_STR);
			String qcFlag = model.getValueNotEmpty(BS_PARAM.BS_QUICK_COMMENT_FLAG);

			String content = model.getValue(BS_PARAM.BS_SERVICE_COMMENT_TEXT);
			
			return serviceCoreService.saveComment(userId, serviceId, qcFlag,content);
		}

		return BS_PARAM.BS_RET_FAILED;
	}
	
		
	/**
	 * 读取服务的快捷评论
	 * */
	@HttpService
	public PageList<QuickCommentBean> getQuickComment(Model model){
		AuthUtil.writeInfo(model, logger);
		String serviceId = model.getValue(BS_PARAM.BS_SERVICE_ID_STR);
		
		List<QuickCommentBean> list = serviceCoreService.getQuickCommentByServiceId(serviceId);
		
		PageList<QuickCommentBean> pageList = new PageList<QuickCommentBean>();
		
		pageList.setCount(list.size());
		pageList.setList(list);
		
		return pageList;
	}
	
	/**
	 * 依据快速评论的标签读取详细的评论列表
	 * */
	@HttpService
	public PageList<ServiceCommentBean> getCommentByFlag(Model model){
		AuthUtil.writeInfo(model, logger);
		
		String serviceId = model.getValue(BS_PARAM.BS_SERVICE_ID_STR);
		String qcFlag	 = model.getValue(BS_PARAM.BS_QUICK_COMMENT_FLAG);
		int start 		 = Integer.parseInt(model.getValue(BS_PARAM.BS_START_STR));
		int size 		 = Integer.parseInt(model.getValue(BS_PARAM.BS_LIMIT_STR));
		
		return serviceCoreService.getComment(serviceId, qcFlag, start, size);
	}
	
	/**
	 * 依据快速评论的标签读取评论总数
	 * */
	@HttpService
	public int getCommentCountByFlag(Model model){
		AuthUtil.writeInfo(model, logger);
		
		String serviceId = model.getValue(BS_PARAM.BS_SERVICE_ID_STR);
		String qcFlag	 = model.getValue(BS_PARAM.BS_QUICK_COMMENT_FLAG);
		
		return serviceCoreService.getCommentCountByFlag(serviceId, qcFlag);
	}
}
