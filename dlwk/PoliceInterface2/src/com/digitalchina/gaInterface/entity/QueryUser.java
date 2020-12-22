package com.digitalchina.gaInterface.entity;
/**
 * FileEncodeing : GBK
 * RBSPAdapter适配中接入方查询等操作的请求方应用的用户信息
 * @author Hadis_sha
 *
 */
public class QueryUser {
    String userCardId;//用户身份证号
    String userName;//用户名
    String userDept;//用户单位
    public QueryUser(){}
    public QueryUser(String userCardId, String userName, String userDept) {
        super();
        this.userCardId = userCardId;
        this.userName = userName;
        this.userDept = userDept;
    }
    public String getUserCardId() {
        return userCardId;
    }
    public void setUserCardId(String userCardId) {
        this.userCardId = userCardId;
    }
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public String getUserDept() {
        return userDept;
    }
    public void setUserDept(String userDept) {
        this.userDept = userDept;
    }

}
