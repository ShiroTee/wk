package com.digitalchina.ldp.app.sps.dao.impl;

import java.util.List;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.sps.dao.OrganizationDao;
import com.digitalchina.ldp.app.ums.bean.OrganizationInfoBean;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import com.digitalchina.ldp.dao.BaseDao;
@Component
public class OrganizationDaoImpl extends BaseDao  implements OrganizationDao {
  @Override
  public List<OrganizationInfoBean> loadAllOrganization() {
    String idOfRoot=BeanDefineConfigue.getProperty("ORG_DEFAULT_ID");
    StringBuilder sb=new StringBuilder();
    sb.append(" SELECT distinct o.org_id,o.org_nm,o.par_org_id,o.org_cd ");
    sb.append(" FROM arch_org o right join asset a on(o.org_id=a.provider) ");
    sb.append(" where (a.provider is not null and a.status=1) ");
    if(idOfRoot!=null){
      sb.append(" or o.org_id='").append(idOfRoot).append("' ");
    }
    else{
      sb.append(" or o.org_cd='00' ");
    }
    sb.append(" order by o.org_cd ");
    return this.createSqlQuery(OrganizationInfoBean.class,sb.toString()).list();
  }

}
