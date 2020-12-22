package com.digitalchina.dao.impl;

import com.digitalchina.dao.UserDao;
import org.springframework.stereotype.Component;

/**
 * Created by zhanglei on 15/11/2.
 */
@Component
public class UserDaoImpl implements UserDao {
    /**
     * 判断密钥是否有效
     *
     * @return true 有效
     */
   @Override
   public boolean checkUser(String UserName, String PassWord){
        if(UserName.equals("admin") && PassWord.equals("admin")){
            return true;
        }else{
            return false;
        }
    }
    
}
