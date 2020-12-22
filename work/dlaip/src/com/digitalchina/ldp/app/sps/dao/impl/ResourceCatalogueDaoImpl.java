package com.digitalchina.ldp.app.sps.dao.impl;

import java.util.Map;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.sps.bean.ResourceCatalogueInfo;
import com.digitalchina.ldp.app.sps.dao.ResourceCatalogueDao;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.BaseDao;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;

@Component
public class ResourceCatalogueDaoImpl extends BaseDao implements ResourceCatalogueDao {
  @Override
  public PageList<ResourceCatalogueInfo> queryByType(int start, int pageSize,
      Map<String, String> args) {
    StringBuilder sb = new StringBuilder();
    sb.append("SELECT * FROM ");
    sb.append(" (SELECT * FROM asset a left join DICT_PUB_LV p on(a.pub_lv=p.typ_cd)) a");
    sb.append(" RIGHT JOIN  asset_cate c ON ");
    sb.append(" (c.asset_id=a.asset_id) LEFT JOIN arch_org o ON(a.provider=o.ORG_ID) WHERE ");
    sb.append(" a.asset_id is not null and ");
    sb.append(" a.status='1' and ");
    String type = null;
    if ("root".equals(args.get("isRoot"))) {
      sb.append(" c.typ_cate=?");
      type = args.get("type");
    } else {
      sb.append(" c.typ_id like ?");
      type = args.get("type") + "%";
    }
    return this.createSqlQuery(ResourceCatalogueInfo.class, sb.toString(), type).page(start, pageSize);
  }
  
  @Override
  public PageList<DynamicBean> queryByTypeForLiuZhou(int start, int pageSize,
      Map<String, String> args) {
    StringBuilder sql=new StringBuilder();
    sql.append("    SELECT a1.*,    ");
    sql.append("      c.quantity    ");
    sql.append("    FROM    ");
    sql.append("      (SELECT a.ASSET_ID AS resourceId, ");
    sql.append("      a.ASSET_NAME    AS resourceName,  ");
    sql.append("      p.typ_nm        AS publicLvName,   ");
    sql.append("      a.PUB_DT        AS pubDate,   ");
    sql.append("      o.org_nm        AS orgName,    ");
    sql.append("      a.STATUS        AS status,    ");
    sql.append("      s.typ_nm        AS secrTypeName, ");
    sql.append("      a.provider    ");
    sql.append("    FROM asset a    ");
    sql.append("    LEFT JOIN arch_org o    ");
    sql.append("    ON (a.provider =o.org_id)   ");
    sql.append("    LEFT JOIN DICT_PUB_LV p ");
    sql.append("    ON (a.pub_lv =p.typ_cd) ");
    sql.append("    LEFT JOIN dict_secure_class s   ");
    sql.append("    ON (a.secr_lv =s.typ_cd)    ");
    sql.append("    RIGHT JOIN asset_cate c ");
    sql.append("    ON (c.asset_id=a.asset_id)  ");
    sql.append("    WHERE a.status='1'  ");
    String type = null;
    if ("root".equals(args.get("isRoot"))) {
      sql.append(" AND c.typ_cate=?");
      type = args.get("type");
    } else {
      sql.append(" AND c.typ_id like ?");
      type = args.get("type") + "%";
    }
    sql.append("      ) a1  ");
    sql.append("    LEFT JOIN   ");
    sql.append("      (SELECT asset_id, ");
    sql.append("        COUNT(1) AS quantity    ");
    sql.append("      FROM ESB_ROUTE_INFO   ");
    sql.append("      WHERE res_typ='http'  ");
    sql.append("      OR res_typ   ='soap'  ");
    sql.append("      GROUP BY asset_id ");
    sql.append("      ) c   ");
    sql.append("    ON (a1.resourceId=c.asset_id)   ");

    return this.createDynamicSqlQuery(sql.toString(),type).page(start, pageSize);
  }

  /**
   * 获取调用最多的 服务
   */
  @Override
  public PageList<DynamicBean> hotInvoking(int start, int limit) {
    StringBuilder sb = new StringBuilder();
    sb.append("SELECT b . *, a.* from ");
    sb.append("   (SELECT route_id, count(*) quantity FROM");
    sb.append("    ESB_ROUTE_LOG group by ROUTE_ID) b");
    sb.append("        left join ");
    sb.append("     ESB_ROUTE_INFO a ON (b.ROUTE_ID = a.RES_ID)");
    sb.append(" where a.ASSET_ID is not null and RES_TYP='http'");
    sb.append(" order by b.quantity desc");

    return this.createDynamicSqlQuery(sb.toString()).page(start, limit);
  }

  /**
   * 获取最新的 信息资源
   */
  @Override
  public PageList<DynamicBean> latest(int start, int limit) {
    String sql =
        "SELECT a.ABSTRACT des,a.asset_name,a.pub_dt,p.typ_nm,a.asset_id FROM "+
        " ASSET a left join DICT_PUB_LV p on (a.pub_lv=p.typ_cd) where a.STATUS='1' order by a.PUB_DT desc";
    return this.createDynamicSqlQuery(sql).page(start, limit);
  }

@Override
public PageList<ResourceCatalogueInfo> find(String assetId, int start,int pageSize) {
	String sql="select a.ASSET_ID,a.ASSET_NAME,a.PUB_DT,a.STATUS,o.ORG_NM provider " +
			"from ESB_AUTH_ROUTE_INFO e inner join ASSET a on e.asset_ID=a.asset_ID inner join " +
			"esb_auth_info es on e.auth_id=es.auth_Id inner join ARCH_ORG o on o.ORG_ID=a.PROVIDER where es.auth_id='"+assetId+"'";
	return this.createSqlQuery(ResourceCatalogueInfo.class, sql).page(start, pageSize);
}

@Override
public Boolean deleteData(String assetId, String authId) {
	String sql="delete from ESB_AUTH_ROUTE_INFO where AUTH_ID='"+authId+"' and ASSET_ID='"+assetId+"'";
	this.createJdbcTemplate().execute(sql);
	return true;
}

@Override
public Boolean updateStatus(String id, String tableName, String status) {
	String idName="";
	if(tableName.equals("Arch_busi_uview")){
		tableName="arch_busi_uview_str";
		idName="UVIEWSTR_ID";
	}else if(tableName.equals("Arch_dm_phdb")){
		tableName="Arch_dm_entitystr";
		idName="ENTSTR_ID";
	}else{
		return false;
	}
	String sql="update "+tableName+" set ENT_STATUS="+status+" where "+idName+"='"+id+"'";
	this.createJdbcTemplate().execute(sql);
	return true;
}

@Override
public PageList<DynamicBean> getSearch(int start, int pageSize,
		String orgId, String assetName, String archCateId, String sm_flag) {
	String sql="select a.FINAL_UPDATE_DATE,a.UPDATE_RATE,a.ASSET_ID,a.ASSET_NAME,a.PUB_DT,a.ARCH_CATE,a.PROVIDER," +
			"a.STATUS,a.PUB_LV,a.SECR_LV,dia.TYP_NM,ar.ORG_NM,dip.TYP_NM as publicLv " +
			"FROM Asset a left join dict_secure_class dict on a.SECR_LV=dict.TYP_CD " +
			"left join dict_arch_cate dia on a.ARCH_CATE=dia.TYP_CD " +
			"left join arch_org ar on a.PROVIDER=ar.ORG_ID " +
			"left join DICT_PUB_LV dip on a.PUB_LV=dip.TYP_CD where 1=1";
	if(!"".equals(orgId)){
		sql+=" and ar.org_cd like '"+orgId+"%'";
    }
	if(assetName!=null&&!"".equals(assetName)){
		sql+=" and a.asset_name like '%"+assetName+"%'";
	}
	if(!"".equals(archCateId)){
		sql+=" and a.arch_cate='"+archCateId+"'";
	}
	if("空间".equals(sm_flag)){
		sql+=" and a.sm_flag=1";
	}else if("非空间".equals(sm_flag)){
		sql+=" and (a.sm_flag!=1 or a.sm_flag is null)";
	}
	sql+=" order by pub_dt desc";
	System.out.println(sql);
	return this.createDynamicSqlQuery(sql).page(start, pageSize);
}

    @Override
    public PageList<DynamicBean> loadResourceByOrgForLiuZhou(int start, int pageSize, String orgId) {
      StringBuilder sql=new StringBuilder();
      sql.append("  SELECT a1.*,    ");
      sql.append("      c.quantity    ");
      sql.append("    FROM    ");
      sql.append("      (SELECT a.ASSET_ID AS resourceId, ");
      sql.append("      a.ASSET_NAME    AS resourceName,  ");
      sql.append("      p.typ_nm        AS publicLvName,   ");
      sql.append("      a.PUB_DT        AS pubDate,   ");
      sql.append("      o.org_nm        AS orgName,    ");
      sql.append("      a.STATUS        AS status,    ");
      sql.append("      s.typ_nm        AS secrTypeName, ");
      sql.append("      a.provider    ");
      sql.append("    FROM asset a    ");
      sql.append("    LEFT JOIN arch_org o    ");
      sql.append("    ON (a.provider =o.org_id)   ");
      sql.append("    LEFT JOIN DICT_PUB_LV p ");
      sql.append("    ON (a.pub_lv =p.typ_cd) ");
      sql.append("    LEFT JOIN dict_secure_class s   ");
      sql.append("    ON (a.secr_lv =s.typ_cd)    ");
      sql.append("    WHERE a.status='1'  ");
      if (!"".equals(orgId))
      {
        sql.append("    AND a.provider= ?    ");
      }
      sql.append("      ) a1  ");
      sql.append("    LEFT JOIN   ");
      sql.append("      (SELECT asset_id, ");
      sql.append("        COUNT(1) AS quantity    ");
      sql.append("      FROM ESB_ROUTE_INFO   ");
      sql.append("      WHERE res_typ='http'  ");
      sql.append("      OR res_typ   ='soap'  ");
      sql.append("      GROUP BY asset_id ");
      sql.append("      ) c   ");
      sql.append("    ON (a1.resourceId=c.asset_id)  ");
      if(!"".equals(orgId))
      {
        return this.createDynamicSqlQuery(sql.toString(),orgId).page(start, pageSize);
      }else{
        return this.createDynamicSqlQuery(sql.toString()).page(start, pageSize);
      }
    }
    
    @Override
    public PageList<DynamicBean> laodResourceByOrgForLiuZhou(int start, int pageSize, String keyWord) {
      StringBuilder sql = new StringBuilder();
      sql.append("  SELECT a1.*,    ");
      sql.append("      c.quantity    ");
      sql.append("    FROM    ");
      sql.append("      (SELECT a.ASSET_ID AS resourceId, ");
      sql.append("      a.ASSET_NAME    AS resourceName,  ");
      sql.append("      p.typ_nm        AS publicLvName,   ");
      sql.append("      a.PUB_DT        AS pubDate,   ");
      sql.append("      o.org_nm        AS orgName,    ");
      sql.append("      a.STATUS        AS status,    ");
      sql.append("      s.typ_nm        AS secrTypeName, ");
      sql.append("      a.provider    ");
      sql.append("    FROM asset a    ");
      sql.append("    LEFT JOIN arch_org o    ");
      sql.append("    ON (a.provider =o.org_id)   ");
      sql.append("    LEFT JOIN DICT_PUB_LV p ");
      sql.append("    ON (a.pub_lv =p.typ_cd) ");
      sql.append("    LEFT JOIN dict_secure_class s   ");
      sql.append("    ON (a.secr_lv =s.typ_cd)    ");
      sql.append("    WHERE a.status='1'  ");
      sql.append("    AND a.ASSET_NAME like  ?    ");
      sql.append("      ) a1  ");
      sql.append("    LEFT JOIN   ");
      sql.append("      (SELECT asset_id, ");
      sql.append("        COUNT(1) AS quantity    ");
      sql.append("      FROM ESB_ROUTE_INFO   ");
      sql.append("      WHERE res_typ='http'  ");
      sql.append("      OR res_typ   ='soap'  ");
      sql.append("      GROUP BY asset_id ");
      sql.append("      ) c   ");
      sql.append("    ON (a1.resourceId=c.asset_id)  ");
      return this.createDynamicSqlQuery(sql.toString(), "%"+keyWord+"%").page(start, pageSize);
    }
}
