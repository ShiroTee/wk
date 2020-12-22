package com.jeecms.rdp.manager.impl;

import com.jeecms.common.email.EmailSendTool;
import com.jeecms.common.email.EmailSender;
import com.jeecms.common.email.MessageTemplate;
import com.jeecms.common.page.Pagination;
import com.jeecms.common.security.BadCredentialsException;
import com.jeecms.common.security.UsernameNotFoundException;
import com.jeecms.common.security.encoder.PwdEncoder;
import com.jeecms.common.util.PropertiesUtil;
import com.jeecms.common.util.jsonUtils;
import com.jeecms.core.dao.UnifiedUserDao;
import com.jeecms.core.entity.Config.ConfigLogin;
import com.jeecms.core.entity.UnifiedUser;
import com.jeecms.core.manager.ConfigMng;
import com.jeecms.core.manager.UnifiedUserMng;
import com.jeecms.rdp.common.RdpUtils;
import com.jeecms.rdp.manager.RdpUnifiedUserMng;
import org.apache.commons.lang.RandomStringUtils;
import org.apache.commons.lang.StringUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.sql.Timestamp;
import java.util.*;

@Service
@Transactional
public class RdpUnifiedUserMngImpl implements RdpUnifiedUserMng {
	public UnifiedUser passwordForgotten(Integer userId, EmailSender email,
			MessageTemplate tpl) {
		UnifiedUser user = findById(userId);
		String uuid = StringUtils.remove(UUID.randomUUID().toString(), '-');
		user.setResetKey(uuid);
		String resetPwd = RandomStringUtils.randomNumeric(10);
		user.setResetPwd(resetPwd);
		senderEmail(user.getId(), user.getUsername(), user.getEmail(),
				user.getResetKey(), user.getResetPwd(), email, tpl);
		return user;
	}

	private void senderEmail(final Integer uid, final String username,
			final String to, final String resetKey, final String resetPwd,
			final EmailSender email, final MessageTemplate tpl) {
		JavaMailSenderImpl sender = new JavaMailSenderImpl();
		sender.setHost(email.getHost());
		sender.setUsername(email.getUsername());
		sender.setPassword(email.getPassword());
		sender.send(new MimeMessagePreparator() {
			public void prepare(MimeMessage mimeMessage)
					throws MessagingException, UnsupportedEncodingException {
				MimeMessageHelper msg = new MimeMessageHelper(mimeMessage,
						false, email.getEncoding());
				msg.setSubject(tpl.getForgotPasswordSubject());
				msg.setTo(to);
				msg.setFrom(email.getUsername(), email.getPersonal());
				String text = tpl.getForgotPasswordText();
				text = StringUtils.replace(text, "${uid}", String.valueOf(uid));
				text = StringUtils.replace(text, "${username}", username);
				text = StringUtils.replace(text, "${resetKey}", resetKey);
				text = StringUtils.replace(text, "${resetPwd}", resetPwd);
				msg.setText(text);
			}
		});
	}

	private void senderEmail(final String username, final String to,
			final String activationCode, final EmailSender email,
			final MessageTemplate tpl) throws UnsupportedEncodingException,
			MessagingException {
		String text = tpl.getRegisterText();
		text = StringUtils.replace(text, "${username}", username);
		text = StringUtils.replace(text, "${activationCode}", activationCode);
		EmailSendTool sendEmail = new EmailSendTool(email.getHost(),
				email.getUsername(), email.getPassword(), to,
				tpl.getRegisterSubject(), text, email.getPersonal(), "", "");
		sendEmail.send();
	}

	public UnifiedUser resetPassword(Integer userId) {
		UnifiedUser user = findById(userId);
		user.setPassword(pwdEncoder.encodePassword(user.getResetPwd()));
		user.setResetKey(null);
		user.setResetPwd(null);
		return user;
	}

	public Integer errorRemaining(String username) {
		if (StringUtils.isBlank(username)) {
			return null;
		}
		UnifiedUser user = getByUsername(username);
		if (user == null) {
			return null;
		}
		long now = System.currentTimeMillis();
		ConfigLogin configLogin = configMng.getConfigLogin();
		int maxErrorTimes = configLogin.getErrorTimes();
		int maxErrorInterval = configLogin.getErrorInterval() * 60 * 1000;
		Integer errorCount = user.getErrorCount();
		Date errorTime = user.getErrorTime();
		if (errorCount <= 0 || errorTime == null
				|| errorTime.getTime() + maxErrorInterval < now) {
			return maxErrorTimes;
		}
		return maxErrorTimes - errorCount;
	}
 
	public UnifiedUser login1(HttpServletRequest request, String username,
			String password, String ip,String loginType) throws UsernameNotFoundException,
			BadCredentialsException{
		UnifiedUser user = new UnifiedUser();
		String rdpLoginURL = "/getUserInfo" ;
		Map<String, String> paraMap = new HashMap<String, String>();
		paraMap.put("loginName", username);
		paraMap.put("password", password);
		JSONObject rdpLoginJSON = new JSONObject();
		try {
			rdpLoginJSON = new JSONObject(RdpUtils.readRdpInterfacePost(
					request, rdpLoginURL, "json", paraMap));
		} catch (Exception e) {
			e.printStackTrace();
			throw new BadCredentialsException("通讯异常，请稍候再试");
		}
		
		if (!rdpLoginJSON.getBoolean("success")) {
			throw new BadCredentialsException("用户名或密码错误");
		} else {
			rdpLoginJSON = rdpLoginJSON.getJSONObject("data") ;
			user.setId((int)(Math.random()*900000000+99999999));//随机生成一个9位ID
			user.setRdpUserId(rdpLoginJSON.getString("id")) ;
			user.setRdpPhoneNumber(rdpLoginJSON.getJSONObject("organizationBean").getString("phoneNumber")) ;
			user.setRdpUserOrg(rdpLoginJSON.getJSONObject("organizationBean").getString("shortName")) ;
			user.setRdpUserOrgId(rdpLoginJSON.getJSONObject("organizationBean").getString("id")) ;
			user.setUsername(rdpLoginJSON.getString("name"));
			user.setPassword(rdpLoginJSON.getString("loginPassword"));
			user.setRegisterTime(new java.util.Date());
			user.setRegisterIp("6.6.6.6");
			user.setLastLoginTime(new java.util.Date());
			user.setLastLoginIp("7.7.7.7");
			user.setLoginCount(0);
			user.setResetKey("xx");
			user.setResetPwd("xx");
			user.setErrorTime(new java.util.Date());
			user.setErrorCount(0);
			user.setErrorIp("8.8.8.8");
			user.setActivation(true);
			user.setActivationCode("xxx");
		}
		return user;
	
	}
 	
	public UnifiedUser login(HttpServletRequest request, String username,
			String password, String ip,String loginType) throws UsernameNotFoundException,
			BadCredentialsException{
		UnifiedUser user = new UnifiedUser();
		
		String platformAdd=PropertiesUtil.getValueBykey("platformAdd");//"http://10.6.10.187:8080/aip";//
		
		String rdpLoginURL = platformAdd+"/service/api/csdsc/userInfoHandler/getUserInfo?loginName="+username+"&password="+password ;
		if("0".equals(loginType))//CA认证 只用用户名即可
			  rdpLoginURL = platformAdd+"/service/api/csdsc/userInfoHandler/getUserInfoNotPassword?loginName="+username;
		String  html=PropertiesUtil.getHtmlByUrl(rdpLoginURL);
		if (html!=null&&!"".equals(html)) {  
			JSONObject rdpLoginJSON = new JSONObject(html);
		
		if (!rdpLoginJSON.getBoolean("success")) {
			throw new BadCredentialsException("用户名或密码错误");
		} else {
		 
			rdpLoginJSON = rdpLoginJSON.getJSONObject("data") ;
			user.setId((int)(Math.random()*900000000+99999999));//随机生成一个9位ID
			user.setRdpUserId(rdpLoginJSON.getString("userId")) ;
			user.setUsername(rdpLoginJSON.getString("name"));
			user.setRdploginName(rdpLoginJSON.getString("loginName"));
			 
			String  rlsesList=rdpLoginJSON.getJSONArray("roles").toString();
			
			List<Map<String, Object>>  rolseArray=jsonUtils.getList(rlsesList);
			 
			String integralRole="常熟市信息资源中心系统管理员";
			String promptRole="委办局领导";
			
			if(PropertiesUtil.getValueBykey("integralRole")!=null||PropertiesUtil.getValueBykey("integralRole")!="")
				integralRole=PropertiesUtil.getValueBykey("integralRole");
			if(PropertiesUtil.getValueBykey("promptRole")!=null||PropertiesUtil.getValueBykey("promptRole")!="")
				promptRole=PropertiesUtil.getValueBykey("promptRole");
			
			String tempRole="00";
			for(int i=0;i<rolseArray.size();i++){
				if(integralRole.equals(rolseArray.get(i).get("roleName")))
				{
					tempRole="1".concat(tempRole.substring(1, 2));
				}
				if(promptRole.equals(rolseArray.get(i).get("roleName")))
				{
					tempRole=tempRole.substring(0, 1).concat("1");
				}
			}
			user.setRdpRole(tempRole);
			
		 	user.setPassword(password);
		 		
			try {user.setRdpPhoneNumber(rdpLoginJSON.getString("phone"));} catch (JSONException e) {}
			try {user.setAuthKey(rdpLoginJSON.getString("authKey"));} catch (JSONException e) {}/* "'宏观经济查询,个人行政处罚记录查询,法人荣誉信息,法人行政处罚记录查询'"*/
			try {
				String  resourcesList=rdpLoginJSON.getJSONArray("resources").toString();
				 
				if(resourcesList.length()>2)
				{
				  String resourcesRes=resourcesList.replaceAll("\"", "'");
				  resourcesRes=resourcesRes.substring(1, resourcesRes.length()-1); 
				  user.setResources(resourcesRes);  
				}  
			} catch (JSONException e) {}
			
			user.setRdpUserOrgId(rdpLoginJSON.getJSONObject("orgInfo").getString("orgId")) ;
			user.setRdpUserOrg(rdpLoginJSON.getJSONObject("orgInfo").getString("shortName"));
			
			user.setRegisterTime(new java.util.Date());
			user.setRegisterIp("6.6.6.6");
			user.setLastLoginTime(new java.util.Date());
			user.setLastLoginIp("7.7.7.7");
			user.setLoginCount(0);
			user.setResetKey("xx");
			user.setResetPwd("xx");
			user.setErrorTime(new java.util.Date());
			user.setErrorCount(0);
			user.setErrorIp("8.8.8.8");
			user.setActivation(true);
			user.setActivationCode("xxx");
		} 
		}
		return user;
 	}
	
	public void updateLoginSuccess(Integer userId, String ip) {
		UnifiedUser user = findById(userId);
		Date now = new Timestamp(System.currentTimeMillis());

		user.setLoginCount(user.getLoginCount() + 1);
		user.setLastLoginIp(ip);
		user.setLastLoginTime(now);

		user.setErrorCount(0);
		user.setErrorTime(null);
		user.setErrorIp(null);
	}

	public void updateLoginError(Integer userId, String ip, UnifiedUser userPara) {
		UnifiedUser user = userPara;
		Date now = new Timestamp(System.currentTimeMillis());
		ConfigLogin configLogin = configMng.getConfigLogin();
		int errorInterval = configLogin.getErrorInterval();
		Date errorTime = user.getErrorTime(); // 获得上次登陆错误的时间

		user.setErrorIp(ip);
		if (errorTime == null
				|| errorTime.getTime() + errorInterval * 60 * 1000 < now // 登陆错误时间+30分钟<当前系统时间，则允许再次登录。
						.getTime()) {
			user.setErrorTime(now);
			user.setErrorCount(1);
		} else {
			user.setErrorCount(user.getErrorCount() + 1);
		}
	}

	public boolean usernameExist(String username) {
		return getByUsername(username) != null;
	}

	public boolean emailExist(String email) {
		return dao.countByEmail(email) > 0;
	}

	public UnifiedUser getByUsername(String username) {
		return dao.getByUsername(username);
	}

	public List<UnifiedUser> getByEmail(String email) {
		return dao.getByEmail(email);
	}

	@Transactional(readOnly = true)
	public Pagination getPage(int pageNo, int pageSize) {
		Pagination page = dao.getPage(pageNo, pageSize);
		return page;
	}

	@Transactional(readOnly = true)
	public UnifiedUser findById(Integer id) {
		UnifiedUser entity = dao.findById(id);
		return entity;
	}

	public UnifiedUser save(String username, String email, String password,
			String ip) {
		Date now = new Timestamp(System.currentTimeMillis());
		UnifiedUser user = new UnifiedUser();
		user.setUsername(username);
		user.setEmail(email);
		user.setPassword(pwdEncoder.encodePassword(password));
		user.setRegisterIp(ip);
		user.setRegisterTime(now);
		user.setLastLoginIp(ip);
		user.setLastLoginTime(now);
		// 不强制验证邮箱直接激活
		user.setActivation(true);
		user.init();
		dao.save(user);
		return user;
	}

	public UnifiedUser save(String username, String email, String password,
			String ip, Boolean activation, EmailSender sender,
			MessageTemplate msgTpl) throws UnsupportedEncodingException,
			MessagingException {
		Date now = new Timestamp(System.currentTimeMillis());
		UnifiedUser user = new UnifiedUser();
		user.setUsername(username);
		user.setEmail(email);
		user.setPassword(pwdEncoder.encodePassword(password));
		user.setRegisterIp(ip);
		user.setRegisterTime(now);
		user.setLastLoginIp(ip);
		user.setLastLoginTime(now);
		user.setActivation(activation);
		user.init();
		dao.save(user);
		if (!activation) {
			String uuid = StringUtils.remove(UUID.randomUUID().toString(), '-');
			user.setActivationCode(uuid);
			senderEmail(username, email, uuid, sender, msgTpl);
		}
		return user;
	}

	/**
	 * @see UnifiedUserMng#update(Integer, String, String)
	 */
	public UnifiedUser update(Integer id, String password, String email) {
		UnifiedUser user = findById(id);
		if (!StringUtils.isBlank(email)) {
			user.setEmail(email);
		} else {
			user.setEmail(null);
		}
		if (!StringUtils.isBlank(password)) {
			user.setPassword(pwdEncoder.encodePassword(password));
		}
		return user;
	}

	public boolean isPasswordValid(Integer id, String password) {
		UnifiedUser user = findById(id);
		return pwdEncoder.isPasswordValid(user.getPassword(), password);
	}

	public UnifiedUser deleteById(Integer id) {
		UnifiedUser bean = dao.deleteById(id);
		return bean;
	}

	public UnifiedUser[] deleteByIds(Integer[] ids) {
		UnifiedUser[] beans = new UnifiedUser[ids.length];
		for (int i = 0, len = ids.length; i < len; i++) {
			beans[i] = deleteById(ids[i]);
		}
		return beans;
	}

	public UnifiedUser active(String username, String activationCode) {
		UnifiedUser bean = getByUsername(username);
		bean.setActivation(true);
		bean.setActivationCode(null);
		return bean;
	}

	public UnifiedUser activeLogin(UnifiedUser user, String ip) {
		updateLoginSuccess(user.getId(), ip);
		return user;
	}

	private ConfigMng configMng;
	private PwdEncoder pwdEncoder;
	private UnifiedUserDao dao;

	@Autowired
	public void setConfigMng(ConfigMng configMng) {
		this.configMng = configMng;
	}

	@Autowired
	public void setPwdEncoder(PwdEncoder pwdEncoder) {
		this.pwdEncoder = pwdEncoder;
	}

	@Autowired
	public void setDao(UnifiedUserDao dao) {
		this.dao = dao;
	}

}