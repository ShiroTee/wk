package com.jeecms.resourceCategory.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class FtpUserImpl implements
        FtpUserDao {

    @Autowired
    private JdbcTemplate simpleJdbcTemplate;

    @Override
	public  List<Map<String,Object>> findByName(String name) {
        String sql = "select * from ftp_user ";
        if(name.equals("admin")){//用户名为管理员查询ftp用户(admin)
            sql = sql+ " where ftp_user_name = '"
                    + name + "'";
        }else{
            sql = sql+ " where web_user_name LIKE '%"
                    + name + "%'";
        }

        List<Map<String,Object>> list = simpleJdbcTemplate.queryForList(sql);

        return list;
	}

}