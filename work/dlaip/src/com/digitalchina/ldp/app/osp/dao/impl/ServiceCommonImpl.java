package com.digitalchina.ldp.app.osp.dao.impl;

import com.digitalchina.ldp.app.osp.bean.ServiceCommentBean;
import com.digitalchina.ldp.app.osp.dao.ServiceCommonDao;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.BaseDao;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ServiceCommonImpl extends BaseDao implements ServiceCommonDao {

	@Override
	public PageList<ServiceCommentBean> QueryServiceComment (int start, int pageSize,String comm_simp) {
		// TODO Auto-generated method stub
		PageList<ServiceCommentBean> pageList;
		if(comm_simp.equals("0")){  //comm_simp表示全部评论查看，其他表示其他评论种类的查看
			pageList = this.createBeanQuery(ServiceCommentBean.class).eq("comm_status","1").sortForDesc("comm_time").page(start, pageSize);
		}else{
		 pageList = this.createBeanQuery(ServiceCommentBean.class).eq("comm_simp",comm_simp).eq("comm_status","1").sortForDesc("comm_time").page(start, pageSize);
		}
		return pageList;
	}

	@Override
	public void AddServiceComment(ServiceCommentBean scb) {
		// TODO Auto-generated method stub
		this.createExecuteQuery().insert(scb, false);
	}

	@Override
	public List<DynamicBean> getCommSimp(String serviceId) {
		String sql = "SELECT COMM_SIMP,COUNT(1) AS COMM_SIMP_COUNT FROM USER_ROUTE_COMMENT T WHERE T.RES_ID=? GROUP BY COMM_SIMP";
		return this.createDynamicSqlQuery(sql, serviceId).list();
	}

}
