package com.digitalchina.service.impl;

import com.digitalchina.dao.UserDao;
import com.digitalchina.service.UserDaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by zhanglei on 15/11/2.
 */
@Service
public class UserDaoServiceImpl implements UserDaoService {

    @Autowired
    public UserDao userDao;

    /**
     * 判断密钥是否有效
     *
     * @return true 有效
     */
   public boolean checkUser(String UserName, String PassWord){
       return userDao.checkUser(UserName,PassWord);
    }
    
}
