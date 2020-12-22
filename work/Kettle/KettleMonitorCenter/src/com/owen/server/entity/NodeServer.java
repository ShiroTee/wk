package com.owen.server.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import com.owen.server.constance.HBMetaData;


@Entity(name=HBMetaData.HBMD_SERVER_TABLE_NAME)
public class NodeServer {

	@Id
	@Column(name=HBMetaData.HBMD_SERVER_IP)
	private String server_ip;
	
	@Column(name=HBMetaData.HBMD_SERVER_SERVICE_NAME)
	private String server_name;
	
	@Column(name=HBMetaData.HBMD_SERVER_PORT)
	private String server_port;
	
	@Column(name=HBMetaData.HBMD_SERVER_STATUS)
	private int    server_status;
	
	
	public NodeServer(){}
	
	public NodeServer(String name,String ip,String port){
		server_name = name;
		server_ip = ip;
		server_port = port;
	}
	public String getServer_name() {
		return server_name;
	}
	public void setServer_name(String server_name) {
		this.server_name = server_name;
	}
	public String getServer_ip() {
		return server_ip;
	}
	public void setServer_ip(String server_ip) {
		this.server_ip = server_ip;
	}
	public String getServer_port() {
		return server_port;
	}
	public void setServer_port(String server_port) {
		this.server_port = server_port;
	}
	public int getServer_status() {
		return server_status;
	}
	public void setServer_status(int server_status) {
		this.server_status = server_status;
	}
	
}
