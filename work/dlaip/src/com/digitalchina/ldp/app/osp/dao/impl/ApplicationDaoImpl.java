package com.digitalchina.ldp.app.osp.dao.impl;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.osp.bean.ApplicationBean;
import com.digitalchina.ldp.app.osp.bean.UserAppSubmitBean;
import com.digitalchina.ldp.app.osp.dao.ApplicationDao;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.BaseDao;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;

@Component
public class ApplicationDaoImpl extends BaseDao implements ApplicationDao {

    /**
     * 显示相应appid应用
     */
    public ApplicationBean listApplication(String appId) {
    	return this.createBeanQuery(ApplicationBean.class).eq("appId",appId).uniqueResult();
    }
    
    public Boolean updateApplication(String subId) {
		String sql = "update user_app_submit set sub_status='0' where sub_id='" + subId + "'";
		this.createJdbcTemplate().execute(sql);
		return true;
    }
    
    public int getNumApplication(){
    	return this.createBeanQuery(UserAppSubmitBean.class).count();
    };
    /**
     * 显示最新应用
     */
    public PageList<UserAppSubmitBean> listAppSubmit(int start, int size){
    	return this.createBeanQuery(UserAppSubmitBean.class).eq("subStatus",1).sortForDesc("subTime").page(start, size);
    };
    
    /**
     * 显示用户应用
     */
    public PageList<UserAppSubmitBean> listUserAppSubmit(int start, int size, String userId){
    	return this.createBeanQuery(UserAppSubmitBean.class).eq("subStatus",1).eq("userId", userId).page(start, size);
    };  
    
    /**
     * 提交应用
     */
    public void AddUserApplicatio(UserAppSubmitBean uasb,ApplicationBean ab){
    	this.createExecuteQuery().insert(ab, false);
    	this.createExecuteQuery().insert(uasb, false);
    }

	@Override
	public PageList<DynamicBean> queryAppRank(int start, int pageSize) {
		String sql="select u.user_name,(SELECT COUNT(t.APP_ID) FROM USER_APP_SUBMIT t WHERE T.USER_ID=U.USER_ID and t.sub_status=1 ) as appcount from osp_user_info u where (SELECT COUNT(t.APP_ID) FROM USER_APP_SUBMIT t WHERE T.USER_ID=U.USER_ID and t.sub_status=1 ) > 0 order by appcount desc";
		return this.createDynamicSqlQuery(sql).page(start, pageSize);
	}; 
}
