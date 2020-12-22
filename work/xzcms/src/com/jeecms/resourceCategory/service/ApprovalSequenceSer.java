package com.jeecms.resourceCategory.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import com.jeecms.cms.dao.main.CmsUserDao;
import com.jeecms.cms.entity.main.CmsUser;
import com.jeecms.common.security.encoder.PwdEncoder;
import com.jeecms.core.entity.UnifiedUser;
import com.jeecms.core.manager.UnifiedUserMng;
import com.jeecms.resourceCategory.dao.ApprovalSequence;

@Service
@Transactional
public class ApprovalSequenceSer {
	
	@Autowired
	private ApprovalSequence approvalSequence;
	@Autowired
	private UnifiedUserMng unifiedUserMng; 
	
	@Transactional(isolation = Isolation.READ_COMMITTED)
	public String GetApprovalSequence() {
		return approvalSequence.GetApprovalSequence();
	}
	
	public boolean save(String username, String email, String password){
		
		UnifiedUser unifiedUser = unifiedUserMng.save(username, email,password, "127.0.0.1");
		return approvalSequence.save(unifiedUser.getId().toString(),username,email,password);
	}
	
	public boolean update(String username, String email, String password){
		
		return approvalSequence.update(username,email,password);
	}
	
	public boolean del(String username){
		return approvalSequence.del(username);
	}
}
