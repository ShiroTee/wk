package com.digitalchina.ldp.app.dms.dao.impl;

import com.digitalchina.ldp.app.dms.dao.EsbChannelManageDao;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.DBPage;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;
import java.util.List;
import java.util.Map;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class EsbChannelManageDaoImpl
        extends BaseDaoSupportImpl
        implements EsbChannelManageDao
{
    public PageList<Map<String, Object>> find(int pageSize, int limit, Map<String, String> map)
    {
        StringBuilder param = new StringBuilder();
        StringBuilder sb = new StringBuilder();
        String channel_code = (String)map.get("channel_code");
        String channel_name = (String)map.get("channel_name");
        if (!StringUtils.isEmpty(channel_code)) {
            param.append(" and upper(t.channel_code) like '%" + channel_code.toUpperCase() + "%' ");
        }
        if (!StringUtils.isEmpty(channel_name)) {
            param.append(" and t.channel_name like '%" + channel_name + "%' ");
        }
        sb.append("select t.channel_code,t.channel_name ");
        sb.append("from esb_channel_key t where 1=1 ");
        sb.append(param);
        sb.append(" order by t.channel_code");
        String sql = getPage().pageForParams(sb.toString());
        List<Map<String, Object>> list = getSimpleJdbcTemplate().queryForList(sql, new Object[] { Integer.valueOf(pageSize), Integer.valueOf(pageSize + limit) });
        StringBuilder sum = new StringBuilder();
        sum.append(" select count(0) from ( ");
        sum.append(sb.toString());
        sum.append("  )  ");
        int count = getSimpleJdbcTemplate().queryForInt(sum.toString());
        PageList<Map<String, Object>> pageList = new PageList();
        pageList.setList(list);
        pageList.setCount(count);
        return pageList;
    }

    public void addChannel(String chancode, String channame)
    {
        String sql = "select count(*) from esb_channel_key where channel_code = ?";
        int count = ((Integer)getSimpleJdbcTemplate().queryForObject(sql, Integer.class, new Object[] { chancode })).intValue();
        if (count == 0)
        {
            sql = "insert into esb_channel_key (channel_code,channel_name) values (?,?)";
            getSimpleJdbcTemplate().update(sql, new Object[] { chancode, channame });
        }
        else
        {
            throw new ServiceException("录入的渠道代码<" + chancode + ">已存在，请修改后保存添加。");
        }
    }

    public void updateChannel(String chancode_old, String chancode, String channame)
    {
        String sql = "";
        sql = "update esb_channel_key set channel_name=? where channel_code =? ";
        getSimpleJdbcTemplate().update(sql, new Object[] { channame, chancode_old });
    }

    public void delChannel(String chancode)
    {
        String sql = "select * from esb_service_channel sc,esb_channel_key c where sc.channel_code = c.channel_code(+) and  sc.channel_code = ?";
        List<Map<String, Object>> list = getSimpleJdbcTemplate().queryForList(sql, new Object[] { chancode });
        if (list.size() == 0)
        {
            sql = "delete from esb_channel_key where channel_code =? ";
            getSimpleJdbcTemplate().update(sql, new Object[] { chancode });
        }
        else
        {
            throw new ServiceException("渠道<" + ((Map)list.get(0)).get("channel_name") + ">在<渠道服务关联表>中已存在，请先删除渠道服务信息。");
        }
    }
}