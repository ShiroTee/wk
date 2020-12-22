package com.owen.server.constance;

public final class HBMetaData {

	
	/**
	 * 节点服务器的实体类定义
	 * 
	 * */
	public static final String HBMD_SERVER_TABLE_NAME			= "SERVERS";
	public static final String HBMD_SERVER_IP					= "SERVER_IP";
	public static final String HBMD_SERVER_PORT					= "SERVER_PORT";
	public static final String HBMD_SERVER_SERVICE_NAME			= "SERVICE_NAME";
	public static final String HBMD_SERVER_STATUS				= "STATUS";
	
	
	
	/**
	 * 组织机构的实体类定义
	 * 
	 * */
	public static final String HBMD_ORG_TABLE_NAME				= "ORGNIZATIONS";
	public static final String HBMD_ORG_ORGNAME					= "ORG_NAME";
	public static final String HBMD_ORG_ORGCODE					= "ORG_CODE";
	public static final String HBMD_ORG_ORGDESC					= "ORG_DESC";
	public static final String HBMD_ORG_ORGFULLNAME				= "ORG_FULL_NAME";
	public static final String HBMD_ORG_ORGTYPE					= "ORG_TYPE";
	public static final String HBMD_ORG_ORGMODE					= "XMODE";
	
	
	/**
	 * 组织机构跟节点服务器之间的关系
	 * */
	public static final String HBMD_OSREP_TABLE_NAME			= "ORG_SERVER";
	public static final String HBMD_OSREP_ORGCODE				= "ORG_CODE";
	public static final String HBMD_OSREP_SERVERIP				= "SERVER_IP";
	public static final String HBMD_OSREP_ID					= "ID";
	public static final String HBMD_OSREP_STAGE_NAME			= "STAGE_NAME";
	
	/**
	 *	被修改后任务的实体类定义
	 * */
	public static final String HBMD_TASK_TABLE_NAME				= "TASK";
	public static final String HBMD_TASK_ID						= "TASKID";
	public static final String HBMD_TASK_NAME					= "TASKNAM";
	public static final String HBMD_TASK_ORGCODE				= "ORGCODE";
	public static final String HBMD_TASK_ORGNAME				= "ORGNAME";
	public static final String HBMD_TASK_INTERVAL				= "INTERVAL";
	public static final String HBMD_TASK_STAGE					= "STAGE";
	public static final String HBMD_TASK_STATUS					= "STATUS";
	
	
	/**
	 * 任务运行记录的实体类定义
	 * */
	public static final String HBMD_LOG_TABLE_NAME				= "TASK_LOG";
	public static final String HBMD_LOG_ID						= "ID";
	public static final String HBMD_LOG_SRVIP					= "SRV_IP";
	public static final String HBMD_LOG_ORGNAME					= "ORG_NAME";
	public static final String HBMD_LOG_TASKID					= "TASK_ID";
	public static final String HBMD_LOG_TASKNAME				= "TASK_NAME";
	public static final String HBMD_LOG_START_TIME				= "START_TIME";
	public static final String HBMD_LOG_END_TIME				= "END_TIME";
	public static final String HBMD_LOG_ERROR_NUM				= "ERROR_NUM";
	public static final String HBMD_LOG_ERROR_INFO				= "ERROR_INFO";
	
}
