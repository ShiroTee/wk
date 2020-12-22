package com.digitalchina.ldp.app.dmp.service.impl;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.digitalchina.ldp.app.dmp.dao.OlapWbjqzZxqzaDao;
import com.digitalchina.ldp.app.dmp.service.OlapWbjqzZxqzaService;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.StringUtils;

@Service
public class OlapWbjqzZxqzaServiceImpl implements OlapWbjqzZxqzaService{
	@Autowired
	private OlapWbjqzZxqzaDao olapWbjqzZxqzaDao;

	@SuppressWarnings("unchecked")
	public PageList<String> geOlapWbjqzZxqzaList(int start, int end, Map<String, Object> map){
		try
		{
			//委办局编号
			String wbjbm = StringUtils.objToString(map.get("wbjCode"));
			//获取表汉字说明
			String bm = StringUtils.objToString(map.get("tableNameEn"));
			//获取对账时间起
			String dztime=StringUtils.objToString(map.get("dztime"));
			//获取对账时间止
			
			String dzendtime=StringUtils.objToString(map.get("dzendtime"));
			StringBuffer sql1 = new StringBuffer();
			if (!StringUtils.isEmptyObj(wbjbm)) {
				sql1.append(" and o.WBJBM = '"+ wbjbm +"'");
			}
			if (!StringUtils.isEmptyObj(bm)) {
				sql1.append(" and d.BM = '"+ bm +"'");
			}
			if (!StringUtils.isEmptyObj(dztime) ) {
					sql1.append(" and to_char(o.COMPAREDATE, 'yyyy-MM-DD') > = '"+ dztime +"' ");
			}
			if (!StringUtils.isEmptyObj(dzendtime)) {
				sql1.append("  AND  to_char(o.COMPAREDATE, 'yyyy-MM-DD') <='" +dzendtime+ "'");
		}
		// 查询的SQL
		StringBuffer sql = new StringBuffer();
		sql.append("  SELECT o.wbjbm, ");
		sql.append("          d.wbjjc, ");
		sql.append("          	d.bhzmc, ");
		sql.append("          	TO_CHAR(o.COMPAREDATE, 'YYYY-MM-DD') COMPAREDATE, ");
		sql.append("          	o.WBJAFFODSUM ,");
		sql.append("         	o.WBJPUTSUM ,");
		sql.append("         	(o.WBJAFFODSUM - o.WBJPUTSUM) CY ");
		sql.append("    		FROM OLAP_WBJQZ_ZXQZ o inner join DMP_WBJ_TABLE d on o.wbjbm=d.wbjbm and o.bm=d.bm ");
		sql.append("    		WHERE 1=1 ");	
		sql.append(sql1);
		//sql.append("			GROUP BY ROLLUP((o.wbjbm, d.wbjjc, d.bhzmc, o.COMPAREDATE))");
		List list = olapWbjqzZxqzaDao.findByPage(start, end, sql.toString());
		
		// 计数的SQL
		StringBuffer countSql = new StringBuffer();
		countSql.append(" select count(0) from ( ");
		countSql.append(" select count(0) cn from OLAP_WBJQZ_ZXQZ o inner join DMP_WBJ_TABLE d on o.wbjbm=d.wbjbm and o.bm=d.bm  where 1=1 ");
		countSql.append(sql1);
		countSql.append(" GROUP BY ROLLUP((o.wbjbm, d.wbjjc, d.bhzmc, o.COMPAREDATE)) ");
		countSql.append(" )");
		int count = olapWbjqzZxqzaDao.getTotal(countSql.toString());
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
}
