package com.digitalchina.ldp.app.dms.dao.impl;

import com.digitalchina.ldp.app.dms.dao.ExtractMonitorDao;
import com.digitalchina.ldp.common.util.DBPage;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;
import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class ExtractMonitorDaoImpl
        extends BaseDaoSupportImpl
        implements ExtractMonitorDao
{
    public List findByPage(int start, int end, String sql)
    {
        String sb = getPage().pageForParams(sql);
        List list = getSimpleJdbcTemplate().queryForList(sb, new Object[] { Integer.valueOf(start), Integer.valueOf(start + end) });

        return list;
    }

    public int getTotal(String sql)
    {
        int count = getSimpleJdbcTemplate().queryForInt(sql);

        return count;
    }

    public List findBySql(String sql)
    {
        List list = getSimpleJdbcTemplate().queryForList(sql);

        return list;
    }

    public void updateBySql(String sql)
    {
        getSimpleJdbcTemplate().update(sql);
    }

    public void insertBySql(String sql, Object[] args)
    {
        getSimpleJdbcTemplate().update(sql, args);
    }
}
