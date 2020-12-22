package com.digitalchina.ldp.app.osp.defination;

public class BS_PARAM {

	/**
	 * json 格式返回结果
	 */
	public static final String BS_RET_SUCCESS			= "{\"success\":true}";
	public static final String BS_RET_FAILED			= "{\"success\":false}";
	public static final String BS_RET_FAILED_DUPLICATE = "{\"success\":\"duplicate\"}";

	public static final String BS_ECODE_SUCCESS				= "{\"error_code\":0}";
	public static final String BS_ECODE_FAILED				= "{\"error_code\":1}";
	public static final String BS_ECODE_FAILED_DUPLICATE	= "{\"error_code\":2}";
	
	/**
	 * 分页
	 */
	public static final String BS_START_STR 	    	= "start";
	public static final String BS_LIMIT_STR 	    	= "limit";

    /**
     * ServiceListHandler
     */
    public static final String BS_SERVICE_TYPE_STR 		= "serviceType";
    public static final String BS_SEARCH_KEY_WORD_STR 	= "keyWord";
    public static final String BS_PARENT_TYPE_ID_STR    = "parentType";

    
    public static final String BS_QUICK_COMMENT_FLAG	= "qcFlag";
    public static final String BS_SERVICE_COMMENT_TEXT	= "srvComment";

	public static final String BS_SERVICE_ID_STR 		= "serviceId";
	public static final String BS_USER_ID_STR			= "userId";
	public static final String BS_USER_ISLOGIN_STR		= "isLogin";
	public static final String BS_USER_LOGIN_NAME_STR	= "loginName";
	public static final String BS_USER_NAME_STR			= "userName";
	public static final String BS_USER_LOGIN_PASSWORD_STR	= "loginPassword";
	public static final String BS_USER_LEVEL			= "userLevel";
	public static final String BS_USER_VIP_FLAG			= "Y";
	public static final int    D_USER_DEFAULT_SCORE		= 10000;
	public static final String D_USER_STATUS_OK			= "0";
	public static final String D_USER_STATUS_NG			= "1";
	public static final int	   D_USER_COMMON_LEVEL		= 0;//普通用户
	public static final int	   D_USER_VIP_LEVEL			= 1;//VIP用户 
	public static final int	   D_USER_ADMIN_LEVEL		= 8888;//管理员用户
	
	public static final String D_SESSION_USER_INFO		="LOGIN_USER_ID";
	public static final String D_TRUE					="TRUE";

	
	
	
	
	public static final String BS_RESTYPE_SERVICE		="SERVICE";
	public static final String BS_COLLECT_TIME			= "collectTime";
	public static final String BS_JOIN_TIME			    = "joinTime";
	public static final String BS_SUB_TIME			    = "subTime";
	public static final String BS_CREATE_TIME			    = "createTime";
	
	
	//活动
	public static final String BS_ACTIVITY_ID_STR		="actId";
	
	
	public static final String BS_SERVICE_PARAM_STR 	= "serviceParamStr";
	public static final String BS_SERVICE_REQ_TYPE = "requestType";
	public static final String BS_SERVICE_RESP_FORMAT = "responseFormat";
	public static final String BS_SERVICE_REQ_URL = "reqUrl";
	public static final String BS_SERVICE_AUTHKEY = "authKey";
	public static final String BS_SERVICE_JSONP_CB = "jsonpcallback";
	
	public static final String BS_SERVICE_HTTP_POST = "post";
	public static final String BS_SERVICE_HTTP_GET = "get";
}
