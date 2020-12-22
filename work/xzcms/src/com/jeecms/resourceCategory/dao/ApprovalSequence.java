package com.jeecms.resourceCategory.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.jeecms.common.security.encoder.PwdEncoder;
import com.jeecms.common.util.StringUtils;
import com.jeecms.core.dao.impl.BaseDaoSupportImpl;

@Component
public class ApprovalSequence extends BaseDaoSupportImpl {

	@Autowired
	private PwdEncoder pwdEncoder;
	
	public String GetApprovalSequence() {
		
	    JdbcTemplate  st= this.getSimpleJdbcTemplate();
		String year=st.queryForList("select to_char(sysdate,'yyyy') year from dual").get(0).get("YEAR")+"";
	    String seq=st.queryForList("select  lpad(seq_approval_printId.nextval,7,0) id  from sys.dual ").get(0).get("ID")+""; 
		return "XZZY–"+year+"–"+seq;
	}
	
	public boolean save(String id,String username, String email, String password){
		 JdbcTemplate  st= this.getSimpleJdbcTemplate();
	
		 String jc_uid=st.queryForList(" select  SEQJC_USER_SITE.nextval  id  from dual ").get(0).get("ID")+""; 
		 String insertJc_user=" insert into jc_user (user_id,group_id,username, email, register_time, register_ip, last_login_time, last_login_ip, login_count, rank, upload_total, upload_size, is_admin, is_viewonly_admin, is_self_admin, is_disabled) "
                                  +" values ("+id+", 1,'"+username+"', '"+email+"',SYSDATE,'127.0.0.1',SYSDATE,'127.0.0.1', 1, 7, 0, 0, 1, 0, 0, 0)";
		 String insertJc_user_site=" insert into jc_user_site (check_step, is_all_channel, user_id, site_id, usersite_id)  "
                                           +" values  (1, 1, "+id+", 1, "+jc_uid+") ";
		 
		 st.execute(insertJc_user);
		 st.execute(insertJc_user_site);
         return true;
	}
	
	public boolean update(String username, String email, String password){
		
		 JdbcTemplate  st= this.getSimpleJdbcTemplate();
		 String updateJc_user=" update jo_user set email = '"+email+"' where username = '"+username+"' ";
		 String updateJo_user=" update jc_user set email = '"+email+"' where username = '"+username+"' ";
		 
		 if(!StringUtils.isEmptyObj(password)){
			String pas=pwdEncoder.encodePassword(password);
		    updateJc_user=" update jo_user set email = '"+email+"', password = '"+pas+"' where username = '"+username+"' ";
		 }
		 st.execute(updateJc_user);
		 st.execute(updateJo_user);
		 return true;
	}
	public boolean del(String username){
		

		 JdbcTemplate  st= this.getSimpleJdbcTemplate();
		 String delJc_user=" delete jo_user where username = '"+username+"' ";
		 String delJo_user=" delete jc_user where username = '"+username+"' ";
		
		 st.execute(delJc_user);
		 st.execute(delJo_user);
		
		 return true;
	}
	
	
}
