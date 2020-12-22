package com.digitalchina.ldp.app.dms.dao;
import org.springframework.stereotype.Component;
import com.digitalchina.ldp.app.dms.bean.LogJob;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.BaseDaoSupport;
@Component
public interface JobExcuteDao extends BaseDaoSupport

{
	public PageList<LogJob> find(int start,int pageSize,Model model);
	//public PageList<LogJob> getLogJobList(Map<String, Object> fieldsAndValue,int start,int pageSize);
}
