package com.digitalchina.ldp.app.dms.dao.impl;

import com.digitalchina.ldp.app.dms.bean.EsbTransLogBean;
import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.common.util.PropertiesUtil;
import com.digitalchina.ldp.app.dms.dao.EsbLogManageDao;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.DBPage;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import oracle.jdbc.driver.OracleDriver;
import oracle.sql.BLOB;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.stereotype.Component;

@Component
public class EsbLogManageDaoImpl
        extends BaseDaoSupportImpl
        implements EsbLogManageDao
{
    public Connection conn = null;
    public PreparedStatement stmt = null;
    ResultSet rs = null;

    private ParameterizedRowMapper<EsbTransLogBean> getMapper()
    {
        ParameterizedRowMapper<EsbTransLogBean> mapper = new ParameterizedRowMapper()
        {
            public EsbTransLogBean mapRow(ResultSet rs, int row)
                    throws SQLException
            {
                EsbTransLogBean esbLog = new EsbTransLogBean();
                esbLog.setEsbflowno(rs.getString("esbflowno"));
                esbLog.setOperstamp(rs.getString("operstamp"));
                esbLog.setServiceid(rs.getString("serviceid"));
                esbLog.setChannelid(rs.getString("channelid"));
                esbLog.setRespstatus(rs.getString("respstatus"));
                esbLog.setFlowstepid(rs.getString("flowstepid"));
                return esbLog;
            }
        };
        return mapper;
    }

    public PageList<EsbTransLogBean> find(int pageSize, int limit, Map<String, Object> map)
    {
        String esbflowno = StringUtils.objToString(map.get("esbflowno"));
        String serviceid = StringUtils.objToString(map.get("serviceid"));
        String channelid = StringUtils.objToString(map.get("channelid"));
        String startTime = StringUtils.objToString(map.get("startTime"));
        String endTime = StringUtils.objToString(map.get("endTime"));
        String res_status = StringUtils.objToString(map.get("res_status"));

        StringBuilder param = new StringBuilder();
        StringBuilder sb = new StringBuilder();
        if (esbflowno != "") {
            param.append(" and a.esbflowno like '%" + esbflowno + "%" + "' ");
        }
        if (serviceid != "") {
            param.append(" and a.serviceid like '%" + serviceid + "%" + "' ");
        }
        if (channelid != "") {
            param.append(" and a.channelid like '%" + channelid + "%" + "' ");
        }
        if (startTime != "") {
            param.append(" AND TO_CHAR(a.operstamp, 'YYYY-MM-DD HH24:MI:SS') >= '" +
                    startTime + " 00:00:00' ");
        }
        if (endTime != "") {
            param.append(" AND TO_CHAR(a.operstamp, 'YYYY-MM-DD HH24:MI:SS') <= '" +
                    endTime + " 23:59:59' ");
        }
        if (!StringUtils.isEmpty(res_status)) {
            param.append(" and a.respstatus = '" + res_status + "' ");
        }
        sb.append("select a.esbflowno,TO_CHAR(a.operstamp, 'YYYY-MM-DD HH24:MI:SS') operstamp,a.serviceid,a.channelid,flowstepid, ");
        sb.append(" case when respstatus = 1 then '成功' else '失败' end respstatus ");
        sb.append(" from ESB2_TRANS_LOG a where 1=1 ");
        sb.append(param);
        sb.append(" order by a.operstamp desc");
        String sql = getPage().pageForParams(sb.toString());
        List<EsbTransLogBean> list = getSimpleJdbcTemplate().query(sql,
                getMapper(), new Object[] { Integer.valueOf(pageSize), Integer.valueOf(pageSize + limit) });
        StringBuilder sum = new StringBuilder();
        sum.append(" select count(0) from ( ");
        sum.append(sb.toString());
        sum.append("  )  ");
        int count = getSimpleJdbcTemplate().queryForInt(sum.toString());
        PageList<EsbTransLogBean> pageList = new PageList();
        pageList.setList(list);
        pageList.setCount(count);
        return pageList;
    }

    public List<RDirectoryBean> getDirectoryList()
    {
        Map<String, Object> argsMap = new HashMap();
        argsMap.put("directoryParentId", "0");
        RDirectoryBean bean = new RDirectoryBean();
        bean.setDirectoryId(null);
        bean.setDirectoryName("全部");
        List<RDirectoryBean> list = find(RDirectoryBean.class, argsMap);
        list.add(0, bean);
        return list;
    }

    public String getLogDetail(String esbflowno, String flowstepid)
    {
        String result = "";
        String sql = "select t.pkgcontent from esb2_trans_log_msg t where t.esbflowno =? and t.flowstepid = ?";
        try
        {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            DriverManager.registerDriver(new OracleDriver());
            this.conn = DriverManager.getConnection(PropertiesUtil.getValueBykey("esb_jdbc.url"),
                    PropertiesUtil.getValueBykey("esb_jdbc.username"), PropertiesUtil.getValueBykey("esb_jdbc.password"));
            this.stmt = this.conn.prepareStatement(sql);
            this.stmt.setString(1, esbflowno);
            this.stmt.setString(2, flowstepid);
            this.rs = this.stmt.executeQuery();
            while (this.rs.next())
            {
                BLOB blob = (BLOB)this.rs.getBlob("pkgcontent");
                result = ConvertBLOBtoString(blob);
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
            try
            {
                if (this.rs != null)
                {
                    this.rs.close();
                    this.rs = null;
                }
                if (this.stmt != null)
                {
                    this.stmt.close();
                    this.stmt = null;
                }
                if (this.conn != null)
                {
                    this.conn.close();
                    this.conn = null;
                }
            }
            catch (SQLException ee)
            {
                ee.printStackTrace();
            }
        }
        return result;
    }

    public String ConvertBLOBtoString(BLOB BlobContent)
    {
        byte[] msgContent = BlobContent.getBytes();

        String newStr = "";
        int i = 1;
        try
        {
            long BlobLength = BlobContent.length();
            if ((msgContent == null) || (BlobLength == 0L)) {
                return "";
            }
            while (i < BlobLength)
            {
                byte[] bytes = BlobContent.getBytes(i, 1024);
                i += 1024;
                newStr = newStr + new String(bytes, "utf-8");
            }
            return newStr;
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        return newStr;
    }

    public List<Map<String, Object>> getTypeCombox()
    {
        String sql = "select t.type_id,t.type_name from esb_type_key t ";
        return getSimpleJdbcTemplate().queryForList(sql);
    }

    public List<Map<String, Object>> getServiceComBox(String type_id)
    {
        String sql = "select t.service_id,t.service_name from esb_service_key t where t.type_id = ?";
        return getSimpleJdbcTemplate().queryForList(sql, new Object[] { type_id });
    }

    public PageList<EsbTransLogBean> findByType(int pageSize, int limit, Map<String, String> map)
    {
        String channelids = (String)map.get("channelids");
        String startTime = (String)map.get("startTime");
        String endTime = (String)map.get("endTime");
        StringBuilder param = new StringBuilder();
        StringBuilder sb = new StringBuilder();
        if (!StringUtils.isEmpty(channelids)) {
            param.append(" and a.channelid in (" + channelids + ")");
        } else {
            param.append(" and 1 = 0 ");
        }
        if (!StringUtils.isEmpty(startTime)) {
            param.append(" AND TO_CHAR(a.operstamp, 'YYYY-MM-DD HH24:MI:SS') >= '" +
                    startTime + " 00:00:00' ");
        }
        if (!StringUtils.isEmpty(endTime)) {
            param.append(" AND TO_CHAR(a.operstamp, 'YYYY-MM-DD HH24:MI:SS') <= '" +
                    endTime + " 23:59:59' ");
        }
        sb.append("select  a.esbflowno,TO_CHAR(max(a.operstamp), 'YYYY-MM-DD HH24:MI:SS') operstamp,");
        sb.append("max(a.serviceid) serviceid,max(a.channelid) channelid,max(a.flowstepid) flowstepid,");
        sb.append(" case when count(respstatus) = 4 and min(respstatus) ='1' then '成功' else '失败' end respstatus ");
        sb.append(" from ESB2_TRANS_LOG a where 1=1 ");
        sb.append(param);
        sb.append(" group by a.esbflowno");
        sb.append(" order by max(a.operstamp) desc");
        String sql = getPage().pageForParams(sb.toString());
        List<EsbTransLogBean> list = getSimpleJdbcTemplate().query(sql,
                getMapper(), new Object[] { Integer.valueOf(pageSize), Integer.valueOf(pageSize + limit) });
        StringBuilder sum = new StringBuilder();
        sum.append(" select count(0) from ( ");
        sum.append(sb.toString());
        sum.append("  )  ");
        int count = getSimpleJdbcTemplate().queryForInt(sum.toString());
        PageList<EsbTransLogBean> pageList = new PageList();
        pageList.setList(list);
        pageList.setCount(count);
        return pageList;
    }

    public List<Map<String, Object>> getServiceids(String type_id, String channel_code)
    {
        StringBuilder sql = new StringBuilder();
        sql.append("select sc.service_id,s.service_name,sc.channel_id,c.channel_name,t.type_name,p.protocol_name,t.type_id,sc.channel_code,sc.protocol_id ");
        sql.append("from esb_service_channel sc,esb_service_key s,esb_channel_key c,esb_type_key t,esb_protocol_key p ");
        sql.append("where sc.service_id = s.service_id(+) and s.type_id = t.type_id(+) and sc.channel_code = c.channel_code(+) ");
        sql.append("and sc.protocol_id = p.protocol_id(+) ");
        if (!StringUtils.isEmpty(type_id)) {
            sql.append(" and t.type_id = '" + type_id + "' ");
        }
        if (!StringUtils.isEmpty(channel_code)) {
            sql.append(" and sc.channel_code = '" + channel_code + "' ");
        }
        return getSimpleJdbcTemplate().queryForList(sql.toString());
    }

    public List<Map<String, Object>> getServiceidsByTypeid(int parm, String type_id)
    {
        StringBuilder sql = new StringBuilder("select t.service_id,t.service_name from esb_service_key t where 1=1 ");
        if (parm == 1)
        {
            if (!StringUtils.isEmpty(type_id)) {
                sql.append(" and t.type_id = '" + type_id + "' ");
            }
        }
        else {
            sql.append(" and t.service_id = '" + type_id + "' ");
        }
        return getSimpleJdbcTemplate().queryForList(sql.toString());
    }

    public List<Map<String, Object>> findForPie(Map<String, String> map)
    {
        String channelids = (String)map.get("channelids");
        String startTime = (String)map.get("startTime");
        String endTime = (String)map.get("endTime");
        StringBuilder param = new StringBuilder();
        StringBuilder sb = new StringBuilder();
        if (!StringUtils.isEmpty(channelids)) {
            param.append(" and a.channelid in (" + channelids + ")");
        } else {
            param.append(" and 1 = 0");
        }
        if (!StringUtils.isEmpty(startTime)) {
            param.append(" AND TO_CHAR(a.operstamp, 'YYYY-MM-DD HH24:MI:SS') >= '" +
                    startTime + " 00:00:00' ");
        }
        if (!StringUtils.isEmpty(endTime)) {
            param.append(" AND TO_CHAR(a.operstamp, 'YYYY-MM-DD HH24:MI:SS') <= '" +
                    endTime + " 23:59:59' ");
        }
        sb.append("select b.serviceid,count(b.serviceid) services_count,round(sum(b.respstatus)/count(b.serviceid)*100,2) statusPer1 ");
        sb.append("from (select max(a.serviceid) serviceid, ");
        sb.append("case when count(a.respstatus) = 4 and min(a.respstatus) ='1' then 1 else 0 end respstatus from esb2_trans_log a where 1=1 ");
        sb.append(param);
        sb.append("group by a.esbflowno  ) b group by b.serviceid order by count(b.serviceid) desc");
        String sql = sb.toString();
        List<Map<String, Object>> list = getSimpleJdbcTemplate().queryForList(sql);
        return list;
    }

    public Map<String, Object> findForChannelPie(Map<String, String> map)
    {
        String serviceids = (String)map.get("serviceids");
        String channelids = (String)map.get("channelids");
        String startTime = (String)map.get("startTime");
        String endTime = (String)map.get("endTime");
        StringBuilder param = new StringBuilder();
        StringBuilder sb = new StringBuilder();
        if (!StringUtils.isEmpty(serviceids)) {
            param.append(" and a.serviceid in (" + serviceids + ")");
        } else {
            param.append(" and 1 = 0");
        }
        if (!StringUtils.isEmpty(channelids)) {
            param.append(" and a.channelid in (" + channelids + ")");
        } else {
            param.append(" and 1 = 0");
        }
        if (!StringUtils.isEmpty(startTime)) {
            param.append(" AND TO_CHAR(a.operstamp, 'YYYY-MM-DD HH24:MI:SS') >= '" +
                    startTime + " 00:00:00' ");
        }
        if (!StringUtils.isEmpty(endTime)) {
            param.append(" AND TO_CHAR(a.operstamp, 'YYYY-MM-DD HH24:MI:SS') <= '" +
                    endTime + " 23:59:59' ");
        }
        sb.append("select count(b.serviceid) services_count,round(sum(b.respstatus)/count(b.serviceid)*100,2) statusPer1 ");
        sb.append("from (select max(a.serviceid) serviceid, ");
        sb.append("case when count(a.respstatus) = 4 and min(a.respstatus) ='1' then 1 else 0 end respstatus from esb2_trans_log a where 1=1 ");
        sb.append(param);
        sb.append("group by a.esbflowno  ) b  ");
        String sql = sb.toString();
        Map<String, Object> res = getSimpleJdbcTemplate().queryForMap(sql);
        return res;
    }

    public PageList<Map<String, Object>> getServicesByType(int pageSize, int limit, String type_id, String channel_id, String pro_id)
    {
        StringBuilder param = new StringBuilder();
        StringBuilder sb = new StringBuilder();
        if (!StringUtils.isEmpty(type_id)) {
            param.append(" and t.type_id = '" + type_id + "' ");
        }
        if (!StringUtils.isEmpty(channel_id)) {
            param.append(" and c.channel_code = '" + channel_id + "' ");
        }
        if (!StringUtils.isEmpty(pro_id)) {
            param.append(" and sc.protocol_id = '" + pro_id + "' ");
        }
        sb.append("select sc.service_id,s.service_name,sc.channel_id,c.channel_name,t.type_name,p.protocol_name,t.type_id,sc.channel_code,sc.protocol_id ");
        sb.append("from esb_service_channel sc,esb_service_key s,esb_channel_key c,esb_type_key t,esb_protocol_key p ");
        sb.append("where sc.service_id = s.service_id(+) and s.type_id = t.type_id(+) and sc.channel_code = c.channel_code(+) ");
        sb.append("and sc.protocol_id = p.protocol_id(+) ");
        sb.append(param);
        sb.append(" order by sc.service_id,s.type_id");
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

    public int getCountByServiceid(String service_id, String channel_id)
    {
        String sql = "select count(*) from  (select t.esbflowno,max(t.serviceid) serviceid  from esb2_trans_log t where t.serviceid = ? and t.channelid= ? group by t.esbflowno)";

        return ((Integer)getSimpleJdbcTemplate().queryForObject(sql, Integer.class, new Object[] { service_id, channel_id })).intValue();
    }

    public List<Map<String, Object>> getChannelComBox()
    {
        String sql = "select t.channel_code,t.channel_name from esb_channel_key t";
        return getSimpleJdbcTemplate().queryForList(sql);
    }

    public List<Map<String, Object>> getProtocolComBox()
    {
        String sql = "select t.protocol_id,t.protocol_name from esb_protocol_key t";
        return getSimpleJdbcTemplate().queryForList(sql);
    }

    public void addService(String serid, String channelid, String channelcode, String protocol)
    {
        String sql = "select * from esb_service_channel sc where sc.channel_id = ?";
        List<Map<String, Object>> list = getSimpleJdbcTemplate().queryForList(sql, new Object[] { channelid });
        if (list.size() == 0)
        {
            sql = "insert into esb_service_channel (service_id,channel_id,channel_code,protocol_id) values (?,?,?,?)";
            getSimpleJdbcTemplate().update(sql, new Object[] { serid, channelid, channelcode, protocol });
        }
        else
        {
            throw new ServiceException("渠道ID " + channelid + " 已存在记录。");
        }
    }

    public void updateService(String chanid_old, String serid, String chanid, String chancode, String protocol, String temp)
    {
        String sql = "update esb_service_channel set service_id=?,channel_code=?,protocol_id=? where channel_id =? ";
        getSimpleJdbcTemplate().update(sql, new Object[] { serid, chancode, protocol, chanid_old });
    }

    public void delService(String serid)
    {
        String sql = "delete from esb_service_channel where channel_id =? ";
        getSimpleJdbcTemplate().update(sql, new Object[] { serid });
    }

    public List<Map<String, Object>> getAllChannel()
    {
        String sql = "select t.channel_code,t.channel_name from esb_channel_key t ";
        return getSimpleJdbcTemplate().queryForList(sql);
    }

    public List<Map<String, Object>> getChannelsBypid(String pid)
    {
        String sql = "select t.channel_id from esb_service_channel t where t.channel_code = ?";
        return getSimpleJdbcTemplate().queryForList(sql, new Object[] { pid });
    }
}