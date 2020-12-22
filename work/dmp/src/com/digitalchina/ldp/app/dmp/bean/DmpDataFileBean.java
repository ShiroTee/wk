package com.digitalchina.ldp.app.dmp.bean;


import java.util.Date;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;

@Table(name="DMP_DATAFILE")
public class DmpDataFileBean implements java.io.Serializable{
	
	@Column(name="ID")
	private String id;//id
	@Column(name="FILENAME")
	private String fileName;//文件名
	@Column(name="CREATEUSER")
	private String createUser;//创建者
	@Column(name="FILESIZE")
	private String fileSize;//文件大小
	@Column(name="STATUS")
	private String status;//状态
	@Column(name="FILEPATH")
	private String filePath;//文件路径
	@Column(name="PATH")
	private String path;//虚拟文件路径
	@Column(name="MARK")
	private String mark;//备注
	@Column(name="CREATETIME")
	private Date createTime;//创建时间
	@Column(name="CREATEFINISHTIME")
	private Date createFinishTime;//创建完成时间
	@Column(name="DESCRIPTION")
	private String desc;//描述
	
	public DmpDataFileBean() {
	}

	public DmpDataFileBean(String id, String fileName, String createUser, String fileSize, String status, String filePath, String path, String mark, Date createTime, Date createFinishTime, String desc) {
		super();
		this.id = id;
		this.fileName = fileName;
		this.createUser = createUser;
		this.fileSize = fileSize;
		this.status = status;
		this.filePath = filePath;
		this.path = path;
		this.mark = mark;
		this.createTime = createTime;
		this.createFinishTime = createFinishTime;
		this.desc = desc;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getCreateUser() {
		return createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	public String getFileSize() {
		return fileSize;
	}

	public void setFileSize(String fileSize) {
		this.fileSize = fileSize;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getMark() {
		return mark;
	}

	public void setMark(String mark) {
		this.mark = mark;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getCreateFinishTime() {
		return createFinishTime;
	}

	public void setCreateFinishTime(Date createFinishTime) {
		this.createFinishTime = createFinishTime;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	

}
