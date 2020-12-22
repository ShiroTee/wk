package com.digitalchina.ldp.app.dms.dao.impl;

import com.digitalchina.ldp.app.dms.dao.EsbServiceManageDao;
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
public class EsbServiceManageDaoImpl
        extends BaseDaoSupportImpl
        implements EsbServiceManageDao
{
    public PageList<Map<String, Object>> find(int pageSize, int limit, Map<String, String> map)
    {
        StringBuilder param = new StringBuilder();
        StringBuilder sb = new StringBuilder();
        String type_id = (String)map.get("type_id");
        String service_name = (String)map.get("service_name");
        String service_id = (String)map.get("service_id");
        if (!StringUtils.isEmpty(type_id)) {
            param.append(" and s.type_id = '" + type_id + "' ");
        }
        if (!StringUtils.isEmpty(service_name)) {
            param.append(" and s.service_name like '%" + service_name + "%' ");
        }
        if (!StringUtils.isEmpty(service_id)) {
            param.append(" and upper(s.service_id) like '%" + service_id.toUpperCase() + "%' ");
        }
        sb.append("select s.service_id,s.service_name,s.type_id,t.type_name ");
        sb.append("from esb_service_key s,esb_type_key t where s.type_id = t.type_id(+) ");
        sb.append(param);
        sb.append(" order by s.type_id");
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

    public void addService(String serid, String sername, String sertype)
    {
        String sql = "select count(*) from esb_service_key where service_id = ?";
        int count = ((Integer)getSimpleJdbcTemplate().queryForObject(sql, Integer.class, new Object[] { serid })).intValue();
        if (count == 0)
        {
            sql = "insert into esb_service_key (service_id,service_name,type_id) values (?,?,?)";
            getSimpleJdbcTemplate().update(sql, new Object[] { serid, sername, sertype });
        }
        else
        {
            throw new ServiceException("录入的服务ID " + serid + " 已存在，请修改后保存添加。");
        }
    }

    public void updateService(String serid_old, String serid, String sername, String sertype)
    {
        String sql = "update esb_service_key set service_name=?,type_id=? where service_id =? ";
        getSimpleJdbcTemplate().update(sql, new Object[] { sername, sertype, serid_old });
    }

    public void delService(String serid)
    {
        String sql = "select * from esb_service_channel sc,esb_service_key s where sc.service_id = s.service_id  and sc.service_id = ?";
        List<Map<String, Object>> list = getSimpleJdbcTemplate().queryForList(sql, new Object[] { serid });
        if (list.size() == 0)
        {
            sql = "delete from esb_service_key where service_id =? ";
            getSimpleJdbcTemplate().update(sql, new Object[] { serid });
        }
        else
        {
            throw new ServiceException("服务<" + ((Map)list.get(0)).get("service_name") + ">在<渠道服务关联表>中已存在，请先删除渠道服务信息。");
        }
    }

    public PageList<Map<String, Object>> findServiceType(int pageSize, int limit, Map<String, String> map)
    {
        StringBuilder param = new StringBuilder();
        StringBuilder sb = new StringBuilder();
        String type_id = (String)map.get("type_id");
        String type_name = (String)map.get("type_name");
        if (!StringUtils.isEmpty(type_id)) {
            param.append(" and upper(t.type_id) like '%" + type_id.toUpperCase() + "%' ");
        }
        if (!StringUtils.isEmpty(type_name)) {
            param.append(" and t.type_name like '%" + type_name + "%' ");
        }
        sb.append("select t.type_id,t.type_name ");
        sb.append("from esb_type_key t where 1=1 ");
        sb.append(param);
        sb.append(" order by t.type_id");
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

    public void addServiceType(String typeid, String typename)
    {
        String sql = "select count(*) from esb_type_key where type_id = ?";
        int count = ((Integer)getSimpleJdbcTemplate().queryForObject(sql, Integer.class, new Object[] { typeid })).intValue();
        if (count == 0)
        {
            sql = "insert into esb_type_key (type_id,type_name) values (?,?)";
            getSimpleJdbcTemplate().update(sql, new Object[] { typeid, typename });
        }
        else
        {
            throw new ServiceException("录入的分类ID<" + typeid + ">已存在，请修改后保存添加。");
        }
    }

    public void updateServiceType(String typeid_old, String typeid, String typename)
    {
        String sql = "update esb_type_key set type_name=? where type_id =? ";
        getSimpleJdbcTemplate().update(sql, new Object[] { typename, typeid_old });
    }

    public void delServiceType(String typeid)
    {
        String sql = "select * from esb_service_key s,esb_type_key t where s.type_id = t.type_id(+)  and s.type_id = ?";
        List<Map<String, Object>> list = getSimpleJdbcTemplate().queryForList(sql, new Object[] { typeid });
        if (list.size() == 0)
        {
            sql = "delete from esb_type_key where type_id =? ";
            getSimpleJdbcTemplate().update(sql, new Object[] { typeid });
        }
        else
        {
            throw new ServiceException("服务分类<" + ((Map)list.get(0)).get("type_name") + ">在<服务表>中已存在，请先删除服务信息。");
        }
    }
}