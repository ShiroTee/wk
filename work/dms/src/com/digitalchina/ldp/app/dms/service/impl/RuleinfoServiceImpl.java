package com.digitalchina.ldp.app.dms.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.dms.bean.RuleinfoBean;
import com.digitalchina.ldp.app.dms.dao.RuleinfoDao;
import com.digitalchina.ldp.app.dms.service.RuleinfoService;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.StringUtils;

@SuppressWarnings({ "rawtypes", "unchecked" })
@Service
public class RuleinfoServiceImpl implements RuleinfoService
{

	@Autowired
	private RuleinfoDao	ruleinfoDao;

	public void deleteRuleinfo(String ids)
	{
		this.ruleinfoDao.deleteListById(RuleinfoBean.class, "id", ids);

	}

	public PageList<String> getaddRuleinfoList(int start, int end, Map<String, Object> map)
	{
		try
		{
			String rulename = StringUtils.objToString(map.get("RULENAME"));
			String ruletype = StringUtils.objToString(map.get("RULETYPE"));
			System.out.println(ruletype);
			String addtime = StringUtils.objToString(map.get("ADDTIME"));
			String addtimeend = StringUtils.objToString(map.get("ADDTIMEEND"));

			StringBuffer sql1 = new StringBuffer();
			if (!StringUtils.isEmptyObj(rulename))
			{
				sql1.append(" and RULENAME like '%" + rulename + "%'");
			}
			if (!StringUtils.isEmptyObj(ruletype) && !("全部").equals(ruletype))
			{
				sql1.append(" and RULETYPE = '" + ruletype + "'");
			}
			if (!StringUtils.isEmptyObj(addtime))
			{
				sql1.append(" AND to_char(ADDTIME, 'yyyy-MM-DD') > = '" + addtime + "' ");
			}
			if (!StringUtils.isEmptyObj(addtimeend))
			{
				sql1.append("  AND  to_char(ADDTIME, 'yyyy-MM-DD') <='" + addtimeend + "'");
			}

			// 查询的SQL
			StringBuffer sql = new StringBuffer();
			sql.append("  SELECT ID,RULENAME,RULETYPE,STATUS,OPERATOR,THRESHOLD, OPERATOR || ' ' || THRESHOLD THRESHOLDOPERATOR, to_char(ADDTIME, 'yyyy-MM-DD') ADDTIME, MEMO FROM RULEINFO WHERE 1=1 ");
			sql.append(sql1);
			sql.append("			order by ADDTIME desc");
			List list = ruleinfoDao.findByPage(start, end, sql.toString());

			// 计数的SQL
			StringBuffer countSql = new StringBuffer();
			countSql.append(" select count(distinct id) from RULEINFO  where 1=1 ");
			countSql.append(sql1);
			int count = ruleinfoDao.getTotal(countSql.toString());
			PageList<String> pageList = new PageList<String>();
			pageList.setList(list);
			pageList.setCount(count);

			list = null;
			return pageList;
		}
		catch (Exception e)
		{
			e.printStackTrace();
			throw new ServiceException("", e);
		}
	}

	/**
	 * 查询某条数据
	 */
	public RuleinfoBean getaddRuleinfo(String ids)
	{
		return this.ruleinfoDao.find(RuleinfoBean.class, ids);
	}

	/**
	 * 增加数据
	 */
	public void insertRuleinfoList(RuleinfoBean bean)
	{
		this.ruleinfoDao.insert(bean);

	}

	/**
	 * 修改某条数据
	 */

	public void upateRuleinfo(Map<String, Object> map, String id)
	{
		this.ruleinfoDao.update(new RuleinfoBean(), map, id);

	}

	/**
	 * 修改数据状态
	 */
	public void updateRuleinfoStatus(Map<String, Object> map)
	{
		String jsonString = StringUtils.objToString(map.get("jsonData"));
		System.out.println(jsonString);
		String qryState = StringUtils.objToString(map.get("qryState"));
		System.out.println(qryState);
		if (jsonString != null)
		{
			String inStr = jsonString.replace("[", "(").replace("]", ")").replace("\"", "'");
			if (qryState != null)
			{
				String sql = "UPDATE RULEINFO SET STATUS='" + qryState + "' WHERE ID IN " + inStr;
				this.ruleinfoDao.updateBySql(sql);
			}
			else
			{
				throw new ServiceException("操作失败");
			}
		}
	}

}