package com.digitalchina.ldp.app.sps.dao.impl;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.sps.dao.StatisticDao;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.BaseDao;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;

@Component
public class StatisticDaoImpl extends BaseDao implements StatisticDao {

  @Override
  public PageList<DynamicBean> resourceSubscription(int start, int pageSize, String keyWord) {
    StringBuilder sql = new StringBuilder();
    sql.append("select a.ASSET_NAME,b.ASSET_PROVIDER_NAME,a.PUB_DT,b.quantity  ");
    sql.append(" from ");
    sql.append(" (select ASSET_ID,ASSET_NAME,ASSET_PROVIDER_NAME,count(*) quantity ");
    sql.append(" from approval_info ");
    sql.append(" group by ASSET_ID,ASSET_NAME,ASSET_PROVIDER_NAME ");
    sql.append(" ) b left join ");
    sql.append(" ASSET a ON (b.ASSET_ID=a.ASSET_ID) ");
    if (!"".equals(keyWord.trim())) {
      sql.append(" where a.asset_name like ?");
    }
    sql.append(" order by b.quantity desc ");
    return getResult(sql.toString(), start, pageSize, keyWord);
  }



  @Override
  public PageList<DynamicBean> fileDownload(int start, int pageSize, String keyWord) {
    StringBuilder sql = new StringBuilder();
    sql.append("    SELECT   ");
    sql.append("        o.ORG_NM, r.FILE_NAME, r.file_size,r.crt_dt, l.quantity   ");
    sql.append("    FROM     ");
    sql.append("        (SELECT      ");
    sql.append("            route_id, count(*) quantity  ");
    sql.append("        FROM     ");
    sql.append("            esb_route_log    ");
    sql.append("        group by route_id    ");
    sql.append("        order by count(*) desc) l    ");
    sql.append("            left join    ");
    sql.append("        esb_route_info r ON (l.route_id = r.res_id)  ");
    sql.append("            left join    ");
    sql.append("        arch_org o ON (o.ORG_ID = r.provider)    ");
    sql.append("    where    ");
    sql.append("        r.res_typ = 'ftp'     ");
    if (!"".equals(keyWord.trim())) {
      sql.append(" and r.FILE_NAME like ?");
    }
    sql.append("  order by l.quantity desc ");
    return getResult(sql.toString(), start, pageSize, keyWord);
  }

  @Override
  public PageList<DynamicBean> serviceRequest(int start, int pageSize, String keyWord) {
    StringBuilder sql = new StringBuilder();
    sql.append("    SELECT   ");
    sql.append("        o.ORG_NM, r.res_nm, r.res_desc,r.crt_dt, l.quantity    ");
    sql.append("    FROM     ");
    sql.append("        (SELECT      ");
    sql.append("            route_id, count(*) quantity  ");
    sql.append("        FROM     ");
    sql.append("            esb_route_log    ");
    sql.append("        group by route_id    ");
    sql.append("        order by count(*) desc) l    ");
    sql.append("            left join    ");
    sql.append("        esb_route_info r ON (l.route_id = r.res_id)  ");
    sql.append("            left join    ");
    sql.append("        arch_org o ON (o.ORG_ID = r.provider)    ");
    sql.append("    where    ");
    sql.append("        r.res_typ = 'http'   ");
    if (!"".equals(keyWord.trim())) {
      sql.append(" and r.res_nm like ? ");
    }
    sql.append("  order by l.quantity desc ");
    return getResult(sql.toString(), start, pageSize, keyWord);
  }

  /**
   * 指定sql 做分页查询
   * 
   * @param sql
   * @param start
   * @param pageSize
   * @return
   */
  private PageList<DynamicBean> getResult(String sql, int start, int pageSize, String keyWord) {
    if (!"".equals(keyWord.trim())) {
      StringBuilder param=new StringBuilder();
      param.append("%").append(keyWord).append("%");
      return this.createDynamicSqlQuery(sql, param.toString()).page(start, pageSize);
    } else {
      return this.createDynamicSqlQuery(sql).page(start, pageSize);
    }
  }
}
