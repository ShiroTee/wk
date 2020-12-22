package com.digitalchina.dao.impl;

import com.digitalchina.dao.InterceptorDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * Created by zhanglei on 15/11/2.
 */
@Component
public class InterceptorDaoImpl implements InterceptorDao {
    @Autowired
    private JdbcTemplate confJdbcTemplate;

    // 调用次数减1
    @Override
    public void cutNum(String key, String id) {
        confJdbcTemplate
                .update("UPDATE KEY_LIST SET NUM=NUM-1 WHERE 1=1 AND KEY=? AND SQL_ID=?",
                        new Object[]{key, id});
    }

    // 判断调用次数是否达到上限
    @Override
    public boolean isLimted(String key, String id) {
        int num = confJdbcTemplate.queryForInt(
                "SELECT NUM FROM KEY_LIST WHERE 1=1 AND KEY=? AND SQL_ID=?",
                new Object[]{key, id});
        return num <= 0;
    }

    // 判断密钥是否有效
    @Override
    public boolean isValidKey(String key, String id) {
        List<Map<String, Object>> list = confJdbcTemplate.queryForList(
                "SELECT SFYX FROM KEY_LIST WHERE 1=1 AND KEY=? AND SQL_ID=?",
                new Object[]{key, id});
        return !list.isEmpty() && "0".equals(list.get(0).get("SFYX"));
    }

    // 判断服务是否有效
    @Override
    public boolean isValidService(String id) {
        int isValid = confJdbcTemplate.queryForInt(
                "SELECT SFYX FROM SERVICE_LIST WHERE SQL_ID=?",
                new Object[]{id});
        return isValid != 1;
    }

}
