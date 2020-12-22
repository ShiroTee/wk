package com.digitalchina.ldp.app.osp.dao.impl;

import com.digitalchina.ldp.app.osp.bean.*;
import com.digitalchina.ldp.app.osp.dao.ServiceCoreDao;
import com.digitalchina.ldp.app.osp.defination.*;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import com.digitalchina.ldp.dao.BaseDao;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Component
public class ServiceCoreDaoImpl extends BaseDao implements ServiceCoreDao {
	private static Logger logger = Logger.getLogger(ServiceCoreDaoImpl.class.getName());
	/**
	 * 根据服务类别显示服务
	 */
	@Override
	public PageList<ServiceBean> listServiceByType(int start, int size,
			String serviceType, String keyWord) {
		if (keyWord == null || keyWord.isEmpty()) {
			return this.createBeanQuery(ServiceBean.class)
					.eq(SERVICE_COLUMN_DEF.COLUMN_SERV_TYPE_ID, serviceType)
					.page(start, size);
		} else {
			return this.createBeanQuery(ServiceBean.class)
					.eq(SERVICE_COLUMN_DEF.COLUMN_SERV_TYPE_ID, serviceType)
					.like(SERVICE_COLUMN_DEF.COLUMN_RES_NM, keyWord)
					.page(start, size);
		}
	}

	/**
	 * 获取服务分类
	 */
	@Override
	public PageList<ServiceTypeBean> listServiceType(int start, int size,
			String parentType) {
		if (parentType == null || parentType.isEmpty()) {
			return this.createBeanQuery(ServiceTypeBean.class)
					.isNull(SERVICE_TYPE_COLUMN_DEF.COLUMN_PARANT_TYPE_ID)
					.eq(SERVICE_TYPE_COLUMN_DEF.COLUMN_TYPE_STATUS, "1")
					.sortForAsc(SERVICE_TYPE_COLUMN_DEF.COLUMN_SERV_TYPE_ID)
					.page(start, size);
		} else {
			return this
					.createBeanQuery(ServiceTypeBean.class)
					.eq(SERVICE_TYPE_COLUMN_DEF.COLUMN_PARANT_TYPE_ID,
							parentType)
					.eq(SERVICE_TYPE_COLUMN_DEF.COLUMN_TYPE_STATUS, "1")
					.sortForAsc(SERVICE_TYPE_COLUMN_DEF.COLUMN_SERV_TYPE_ID)
					.page(start, size);
		}
	}

	/**
	 * 获取最新的服务
	 */
	@Override
	public PageList<ServiceBean> listFreshService(int start, int size, String parentType) {
		if (parentType == null || parentType.isEmpty()) {
			return this.createBeanQuery(ServiceBean.class)
					.notIsNull(SERVICE_COLUMN_DEF.COLUMN_CRT_DT)
					.sortForDesc(SERVICE_COLUMN_DEF.COLUMN_CRT_DT)
					.page(start, size);
		} else {
			return this.createBeanQuery(ServiceBean.class)
					.notIsNull(SERVICE_COLUMN_DEF.COLUMN_CRT_DT)
					.afterLike(SERVICE_COLUMN_DEF.COLUMN_SERV_TYPE_ID, parentType + "_")
					.sortForDesc(SERVICE_COLUMN_DEF.COLUMN_CRT_DT)
					.page(start, size);
		}
	}

	/**
	 * 根据关键字、父分类搜索服务
	 * 按时间倒序排序
	 */
	@Override
	public PageList<ServiceBean> searchService(int start, int size,
											   String keyWord, String parentType) {
		return this.createBeanQuery(ServiceBean.class)
				.like(SERVICE_COLUMN_DEF.COLUMN_RES_NM, keyWord)
				.afterLike(SERVICE_COLUMN_DEF.COLUMN_SERV_TYPE_ID, parentType + "_")
				.notIsNull(SERVICE_COLUMN_DEF.COLUMN_CRT_DT)
				.sortForDesc(SERVICE_COLUMN_DEF.COLUMN_CRT_DT)
				.page(start, size);
	}

	@Override
	public ServiceBean getServiceById(String id) {
		return this.createBeanQuery(ServiceBean.class)
				.eq(SERVICE_COLUMN_DEF.COLUMN_RES_ID, id).uniqueResult();
	}

	@Override
	public ServiceUrlBean getServiceUrlById(String id) {
		return this.createBeanQuery(ServiceUrlBean.class)
				.eq(SERVICE_COLUMN_DEF.COLUMN_RES_ID, id).uniqueResult();
	}

	@Override
	public int getServiceInvokingCount(String serviceId) {
		return this.createBeanQuery(UserInvokedService.class).eq("serviceId", serviceId).count();
	}

	@Override
	public int getServiceAccessCount(String serviceId) {
		return this.createBeanQuery(AccessLogBean.class).eq("resId", serviceId).eq("resType", "SERVICE").count();
	}

	@Override
	public int getServiceCount(String serviceType, String keyWord) {
		if (keyWord == null || keyWord.isEmpty()) {
			return this.createBeanQuery(ServiceBean.class).eq(SERVICE_COLUMN_DEF.COLUMN_SERV_TYPE_ID, serviceType).count();
		} else {
			return this.createBeanQuery(ServiceBean.class).eq(SERVICE_COLUMN_DEF.COLUMN_SERV_TYPE_ID, serviceType).like(SERVICE_COLUMN_DEF.COLUMN_RES_NM, keyWord).count();
		}
	}

	/**
	 * 用户收藏服务
	 */
	@Override
	public void saveFavoriteService(UserCollectService us) {
		this.createExecuteQuery().insert(us, false);
	}

	@Override
	public String isServiceFavorited(String userId, String serviceId) {
		PageList<UserCollectService> pageList = this
				.createBeanQuery(UserCollectService.class)
				.eq(USER_COLLECT_SERVICE_COLUMN_DEF.COLUMN_USER_ID, userId)
				.eq(USER_COLLECT_SERVICE_COLUMN_DEF.COLUMN_RES_ID, serviceId)
				.sortForDesc(
						USER_COLLECT_SERVICE_COLUMN_DEF.COLUMN_COLLECT_TIME)
				.selectFields(
						USER_COLLECT_SERVICE_COLUMN_DEF.COLUMN_COLLECT_STATUS)
				.page(0, 1);
		if (!pageList.getList().isEmpty()) {
			if (pageList.getList().get(0).getCollectStatus().equals("1")) {
				return "{\"success\":true}";
			}
		}
		return "{\"success\":false}";
	}

	@Override
	public int getServiceCollectCount(String serviceId) {

		return this.createBeanQuery(UserCollectService.class)
				.eq(USER_COLLECT_SERVICE_COLUMN_DEF.COLUMN_RES_ID, serviceId)
				.count();
	}

	@Override
	public int getServiceCommentCount(String serviceId) {

		return this.createBeanQuery(ServiceCommentBean.class)
				.eq(SERVICE_COMMENT_DEF.COLUMN_RES_ID, serviceId).count();
	}

	@Override
	public ServiceCodeTable getServiceCodeTable(int code) {
		return this.createBeanQuery(ServiceCodeTable.class)
				.eq(SERVICE_CODE_TABLE_DEF.SCT_CODE, code).uniqueResult();
	}

	@Override
	public QuickCommentBean getQuickCommentByFlag(String flag) {
		return this.createBeanQuery(QuickCommentBean.class)
				.eq(SERVICE_COMMENT_DEF.COLUMN_QUICK_COMMENT_FLAG, flag)
				.uniqueResult();
	}

	@Override
	public String saveServiceComment(ServiceCommentBean scb) {
		this.createExecuteQuery().insert(scb, false);
		return BS_PARAM.BS_RET_SUCCESS;
	}

	@Override
	public ServiceCommentBean getServiceComment(String userId,
			String serviceId, int qcId) {
		return this.createBeanQuery(ServiceCommentBean.class)
				.eq(SERVICE_COMMENT_DEF.COLUMN_RES_ID, serviceId).setJoin(true)
				.eq(SERVICE_COMMENT_DEF.COLUMN_USER_ID, userId).setJoin(true)
				.eq(SERVICE_COMMENT_DEF.COLUMN_QC_ID, qcId).uniqueResult();
	}

	@Override
	public List<ServiceCommentBean> getAllComment(String serviceId) {
		return this.createBeanQuery(ServiceCommentBean.class).eq(SERVICE_COMMENT_DEF.COLUMN_RES_ID, serviceId).list();
	}

	@Override
	public PageList<ServiceBean> listService(int start, int size, String serviceType, String keyWord, int sortType) {
		StringBuilder sqlData = new StringBuilder();
		StringBuilder sqlCount = new StringBuilder();

		sqlData.append("SELECT T1.*, ");
		sqlData.append("T6.PRICE, T6.COUNT, T6.FREE_COUNT2, ");
		sqlData.append("(SELECT COUNT(1) FROM ESB_ROUTE_LOG T3 WHERE T1.RES_ID=T3.ROUTE_ID) INVOKINGCOUNT, ");
		sqlData.append("(SELECT COUNT(1) FROM RES_ACCESS_LOG T4 WHERE T1.RES_ID=T4.RES_ID) CLICKINGCOUNT, ");
		sqlData.append("(SELECT COUNT(1) FROM USER_ROUTE_COMMENT T5 WHERE T1.RES_ID=T5.RES_ID) COMMENTCOUNT, ");
		sqlData.append("(SELECT COUNT(1) FROM USER_ROUTE_COLLECT T2 WHERE T1.RES_ID=T2.RES_ID) COLLECTCOUNT ");
		sqlData.append("FROM ESB_ROUTE_INFO T1 ");
		sqlData.append("LEFT JOIN SERVICE_FEE_TABLE T6 ON T1.RES_ID=T6.RES_ID ");
		sqlData.append("WHERE 1=1 ");

		sqlCount.append("SELECT COUNT(1) ");
		sqlCount.append("FROM ESB_ROUTE_INFO T1 ");
		sqlCount.append("WHERE 1=1 ");

		if (keyWord != null && !keyWord.isEmpty()) {
			sqlData.append("AND T1.RES_NM LIKE '%").append(keyWord).append("%' ");
			sqlCount.append("AND T1.RES_NM LIKE '%").append(keyWord).append("%' ");
		}
		if (serviceType.length() == 1) {
			sqlData.append("AND T1.SERV_TYPE_ID LIKE '").append(serviceType).append("_%' ");
			sqlCount.append("AND T1.SERV_TYPE_ID LIKE '").append(serviceType).append("_%' ");
		} else {
			sqlData.append("AND T1.SERV_TYPE_ID ='").append(serviceType).append("' ");
			sqlCount.append("AND T1.SERV_TYPE_ID ='").append(serviceType).append("' ");
		}

		//分页+排序
		String url = BeanDefineConfigue.getProperty("url");
		if (url.startsWith("jdbc:oracle")) {
			sqlData.insert(0, "SELECT * FROM ( SELECT A.*, ROWNUM RN FROM (");
			sqlData.append("AND ROWNUM <=").append(start + size).append(" ");
			switch (sortType) {
				case 0:
					sqlData.append("ORDER BY T1.RES_NM");
					break;
				case 1:
					sqlData.append("ORDER BY T1.CRT_DT DESC");
					break;
				case 2:
					sqlData.append("ORDER BY COLLECTCOUNT DESC");
					break;
			}
			sqlData.append(") A ) WHERE RN > ").append(start);
		} else if (url.startsWith("jdbc:mysql")) {
			switch (sortType) {
				case 0:
					sqlData.append("ORDER BY T1.RES_NM");
					break;
				case 1:
					sqlData.append("ORDER BY T1.CRT_DT DESC");
					break;
				case 2:
					sqlData.append("ORDER BY COLLECTCOUNT DESC");
					break;
			}
			sqlData.append(" LIMIT ").append(start).append(",").append(size);
		}

		List<Map<String, Object>> maps = this.createJdbcTemplate().queryForList(sqlData.toString());
		PageList<ServiceBean> pageList = new PageList<ServiceBean>();
		pageList.setCount(this.createJdbcTemplate().queryForObject(sqlCount.toString(), Integer.class));
		List<ServiceBean> list = new ArrayList<ServiceBean>();
		for (Map<String, Object> map : maps) {
			ServiceBean bean = new ServiceBean();
			bean.setResId((String) map.get("RES_ID"));
			bean.setServTypeId((String) map.get("SERV_TYPE_ID"));
			bean.setResNm((String) map.get("RES_NM"));
			bean.setSrvPhotoPath((String) map.get("SRV_PHOTO_PATH"));
			bean.setIsFree(((BigDecimal) map.get("IS_FREE")).intValue());
			bean.setIsAuth(((BigDecimal) map.get("IS_AUTH")).intValue());
			bean.setPlatType((String) map.get("PLAT_TYPE"));
			bean.setRouteStatus(((BigDecimal) map.get("ROUTE_STATUS")).intValue());
			bean.setPublishUrl((String) map.get("PUBLISH_URL"));
			bean.setResTyp((String) map.get("RES_TYP"));
			bean.setCrtDt((Date) map.get("CRT_DT"));
			bean.setServProv((String) map.get("SERV_PROV"));
			bean.setServDesc((String) map.get("SERV_DESC"));
			bean.setServFeat((String) map.get("SERV_FEAT"));
			bean.setAssocRecom((String) map.get("ASSOC_RECOM"));
			bean.setServScore(((BigDecimal) map.get("SERV_SCORE")).intValue());
			bean.setFreeCount(((BigDecimal) map.get("FREE_COUNT")).intValue());
			if (url.startsWith("jdbc:oracle")) {
				bean.setInvokingCount(((BigDecimal) map.get("INVOKINGCOUNT")).intValue());
				bean.setClickingCount(((BigDecimal) map.get("CLICKINGCOUNT")).intValue());
				bean.setCommentCount(((BigDecimal) map.get("COMMENTCOUNT")).intValue());
				bean.setCollectCount(((BigDecimal) map.get("COLLECTCOUNT")).intValue());
			} else if (url.startsWith("jdbc:mysql")) {
				bean.setInvokingCount(((Long) map.get("INVOKINGCOUNT")).intValue());
				bean.setClickingCount(((Long) map.get("CLICKINGCOUNT")).intValue());
				bean.setCommentCount(((Long) map.get("COMMENTCOUNT")).intValue());
				bean.setCollectCount(((Long) map.get("COLLECTCOUNT")).intValue());
			}
//			bean.setIsFreeStr((String) map.get(""));
//			bean.setIsAuthStr((String) map.get(""));
//			bean.setApiUrl((String) map.get(""));
//			bean.setSrvUrl((String) map.get(""));

			if (((BigDecimal) map.get("IS_FREE")).intValue() == 101) {//101收费
				try {
					bean.setPrice((String) map.get("PRICE"));
					bean.setCount((String) map.get("COUNT"));
					bean.setTrueFreeCount((String) map.get("FREE_COUNT2"));
				} catch (Exception e) {
					logger.warn(map.get("RES_ID") + "服务收费，但没有(正确)配置收费表");
				}
			}

			list.add(bean);
		}
		pageList.setList(list);
		return pageList;
	}

	@Override
	public List<QuickCommentBean> getAllQuickComment() {
		return this.createBeanQuery(QuickCommentBean.class).list();
	}

	@Override
	public PageList<ServiceCommentBean> getServiceComment(String serviceId,
			int qcId, int start, int size) {

		return this.createBeanQuery(ServiceCommentBean.class).eq(SERVICE_COMMENT_DEF.COLUMN_RES_ID, serviceId).setJoin(true).eq(SERVICE_COMMENT_DEF.COLUMN_QC_ID, qcId).page(start, size);
	}

	@Override
	public int getCommentCountByFlag(String serviceId, int qcId) {
		return this.createBeanQuery(ServiceCommentBean.class).eq(SERVICE_COMMENT_DEF.COLUMN_RES_ID, serviceId).setJoin(true).eq(SERVICE_COMMENT_DEF.COLUMN_QC_ID, qcId).count();
	}
}
