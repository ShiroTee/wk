package com.digitalchina.ldp.app.sps.dao.impl;

import java.util.List;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.sps.bean.MetaInfo;
import com.digitalchina.ldp.app.sps.dao.MetaInfoDao;
import com.digitalchina.ldp.dao.BaseDao;

@Component
public class MetaInfoDaoImpl extends BaseDao implements MetaInfoDao
{

	
	@Override
	public List<MetaInfo> find(String resourceId, int start, int pageSize)
	{
		StringBuilder sql=new StringBuilder();
		sql.append(" select a.ENT_STATUS,b.arch_cate,b.asset_id ent_id, b.asset_name,a.ele_id,c.ele_nm, c.py_cd, c.data_typ, c.remark,a.data_len,a.dec_len,a.entstr_id");
		sql.append(" from (select abu.uview_id assetId, abu.ele_id,abu.data_len,abu.dec_len,abu.uviewstr_id entstr_id,abu.ENT_STATUS from arch_busi_uview_str abu union ");
		sql.append("select ade.ent_id assetId, ade.ele_id,ade.data_len,ade.dec_len,ade.entstr_id entstr_id,ade.ENT_STATUS from Arch_dm_entitystr ade) a,asset b,dataele c");
		sql.append(" where  a.assetid = b.asset_id and a.ele_id = c.ele_id  and b.asset_id =?");
		List<MetaInfo> list=this.createSqlQuery(MetaInfo.class,sql.toString(),resourceId).list();
		return list;
	}

	 @Override
	  public List<MetaInfo> findPublished(String resourceId, int start, int pageSize) {
	    StringBuilder sql=new StringBuilder();
	    sql.append("   SELECT a.ENT_STATUS,    ");
	    sql.append("   b.arch_cate,  ");
	    sql.append("   b.asset_id ent_id,    ");
	    sql.append("   b.asset_name, ");
	    sql.append("   a.ele_id, ");
	    sql.append("   c.ele_nm, ");
	    sql.append("   c.py_cd,  ");
	    sql.append("   c.data_typ,   ");
	    sql.append("   c.remark, ");
	    sql.append("   a.data_len,   ");
	    sql.append("   a.dec_len,    ");
	    sql.append("   a.entstr_id   ");
	    sql.append(" FROM    ");
	    sql.append("   (SELECT abu.uview_id assetId, ");
	    sql.append("     abu.ele_id, ");
	    sql.append("     abu.data_len,   ");
	    sql.append("     abu.dec_len,    ");
	    sql.append("     abu.uviewstr_id entstr_id,  ");
	    sql.append("     abu.ENT_STATUS  ");
	    sql.append("   FROM arch_busi_uview_str abu  ");
	    sql.append("   where (ENT_STATUS IS NULL OR ENT_STATUS=1)    ");
	    sql.append("   UNION ");
	    sql.append("   SELECT ade.ent_id assetId,    ");
	    sql.append("     ade.ele_id, ");
	    sql.append("     ade.data_len,   ");
	    sql.append("     ade.dec_len,    ");
	    sql.append("     ade.entstr_id entstr_id,    ");
	    sql.append("     ade.ENT_STATUS  ");
	    sql.append("   FROM Arch_dm_entitystr ade    ");
	    sql.append("   where (ENT_STATUS IS NULL OR ENT_STATUS=1)    ");
	    sql.append("   ) a,  ");
	    sql.append("   asset b,  ");
	    sql.append("   dataele c ");
	    sql.append(" WHERE a.assetid = b.asset_id    ");
	    sql.append(" AND a.ele_id    = c.ele_id  ");
	    sql.append(" AND b.asset_id  =?  ");
	    List<MetaInfo> list=this.createSqlQuery(MetaInfo.class,sql.toString(),resourceId).list();
	    return list;
	  }
}
