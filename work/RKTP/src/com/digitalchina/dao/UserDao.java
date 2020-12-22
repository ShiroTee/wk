package com.digitalchina.dao;

/**
 * Created by zhanglei on 15/11/2.
 */
public interface UserDao {
    /**
     * 判断密钥是否有效
     *
     * @return true 有效
     */
   public boolean checkUser(String UserName, String PassWord);

}
