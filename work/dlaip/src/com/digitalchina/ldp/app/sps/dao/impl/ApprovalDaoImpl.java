package com.digitalchina.ldp.app.sps.dao.impl;

import java.util.LinkedList;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.sps.bean.ApprovalInfo;
import com.digitalchina.ldp.app.sps.dao.ApprovalDao;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.BaseDao;
import com.digitalchina.ldp.orm.query.Query;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;
@Component
public class ApprovalDaoImpl extends BaseDao implements ApprovalDao {
  private static final String STATUS_ACCEPTION = "等待受理";
  private static final String STATUS_APPROVAL = "等待审批";
  private static final String STATUS_ACCREDITATION = "等待授权";
  private static final String PERCENT="%";
  private static final String QUERY_TODO =
      "SELECT ai.* FROM APPROVAL_COMMENT ac LEFT JOIN APPROVAL_INFO ai "
          + "ON (ac.APPROVAL_INFO=ai.id) WHERE ASSIGNEE=? AND APPROVER_ID is null order by APPLY_TIME desc";

  @Override
  public PageList<ApprovalInfo> getTodoList(String assignee, int start, int pageSize) {
    return this.createSqlQuery(ApprovalInfo.class, QUERY_TODO, assignee).page(start, pageSize);
  }

  @Override
  public PageList<DynamicBean> query(int start, int pageSize, String keyWord, String order,
      String proposerOrgId, String ownerOrgId, String timeStart, String timeEnd) {
    StringBuilder sql = new StringBuilder();
    sql.append("SELECT DISTINCT u.org_id AS \"PROPOSER_ORG_ID\",a.* ");
    sql.append("FROM APPROVAL_INFO a ");
    sql.append("LEFT JOIN USER_INFO u ");
    sql.append("ON(a.proposer_id=u.user_id) ");
    sql.append("WHERE 1=1 ");
    LinkedList<String> params=new LinkedList<String>();
    if (keyWord != null && !"".equals(keyWord)) {
      if (STATUS_ACCEPTION.contains(keyWord) || STATUS_ACCREDITATION.contains(keyWord)
          || STATUS_APPROVAL.contains(keyWord) || ApprovalInfo.SUCCESS.contains(keyWord)
          || ApprovalInfo.FAILED.contains(keyWord)) {
        sql.append("and status like ?");
        params.add(PERCENT+keyWord+PERCENT);
      } else {
        sql.append("and approval_id like ?");
        params.add(PERCENT+keyWord+PERCENT);
      }
    }
    if(proposerOrgId!=null&&!"".equals(proposerOrgId)){
      sql.append("and u.org_id=?");
      params.add(proposerOrgId);
    }
    if(ownerOrgId!=null&&!"".equals(ownerOrgId)){
      sql.append("and ASSET_PROVIDER=?");
      params.add(ownerOrgId);
    }
    if(timeStart!=null&&!"".equals(timeStart)){
      sql.append("and APPLY_TIME>TO_DATE(?,'yyyy-mm-dd')");
      params.add(timeStart);
    }
    if(timeEnd!=null&&!"".equals(timeEnd)){
      sql.append("and APPLY_TIME<TO_DATE(?,'yyyy-mm-dd')");
      params.add(timeEnd);
    }
    if("time".equals(order)){
      sql.append(" order by APPLY_TIME desc");
    }else if("status".equals(order)){
      sql.append(" order by status");
    }
    Query<DynamicBean> query=this.createDynamicSqlQuery(sql.toString(), params.toArray());
    return query.page(start, pageSize);
  }

}
