package com.owen.env;

/**
 * @author owen
 *
 *	连接KETTLE资源库时所需要的配置信息，此信息配置在spring的配置文件中
 *
 */
public class KettleEnv {
	private String repName;
	private String repType;
	private String repAccess;
	private String repHost;
	private String repSid;
	private String repPort;
	private String repDBUser;
	private String repDBPassword;
	private String repLginUser;
	private String repLginPassword;
	
	
	
	
	public String getRepName() {
		return repName;
	}
	public void setRepName(String repName) {
		this.repName = repName;
	}
	public String getRepType() {
		return repType;
	}
	public void setRepType(String repType) {
		this.repType = repType;
	}
	public String getRepAccess() {
		return repAccess;
	}
	public void setRepAccess(String repAccess) {
		this.repAccess = repAccess;
	}
	public String getRepHost() {
		return repHost;
	}
	public void setRepHost(String repHost) {
		this.repHost = repHost;
	}
	public String getRepSid() {
		return repSid;
	}
	public void setRepSid(String repSid) {
		this.repSid = repSid;
	}
	public String getRepPort() {
		return repPort;
	}
	public void setRepPort(String repPort) {
		this.repPort = repPort;
	}
	public String getRepDBUser() {
		return repDBUser;
	}
	public void setRepDBUser(String repDBUser) {
		this.repDBUser = repDBUser;
	}
	public String getRepDBPassword() {
		return repDBPassword;
	}
	public void setRepDBPassword(String repDBPassword) {
		this.repDBPassword = repDBPassword;
	}
	public String getRepLginUser() {
		return repLginUser;
	}
	public void setRepLginUser(String repLginUser) {
		this.repLginUser = repLginUser;
	}
	public String getRepLginPassword() {
		return repLginPassword;
	}
	public void setRepLginPassword(String repLginPassword) {
		this.repLginPassword = repLginPassword;
	}
}
