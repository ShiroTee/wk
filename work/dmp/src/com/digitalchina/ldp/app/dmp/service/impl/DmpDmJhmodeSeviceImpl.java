package com.digitalchina.ldp.app.dmp.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.dmp.bean.DmpDmJhmodeBean;
import com.digitalchina.ldp.app.dmp.dao.DmpDmJhmodeDao;
import com.digitalchina.ldp.app.dmp.service.DmpDmJhmodeSevice;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.StringUtils;

@Service
public class DmpDmJhmodeSeviceImpl implements DmpDmJhmodeSevice {
	@Autowired
	private DmpDmJhmodeDao dmpDmJhmodeDao;

	public PageList<String> getDmpDmJhmodeList(int start, int end, Map<String, Object> map) {
		try {
			String wbjbm = StringUtils.objToString(map.get("wbjCode"));
			String jhmode = StringUtils.objToString(map.get("jhmode"));

			StringBuffer sql = new StringBuffer();
			sql.append("select * from DMP_DM_WBJ where 1=1 ");
			if (!StringUtils.isEmptyObj(wbjbm)) {
				sql.append(" and WBJBM = '" + wbjbm + "'");
			}
			if (!StringUtils.isEmptyObj(jhmode)) {
				sql.append(" and JHMODE = '" + jhmode + "'");
			}
			List list = dmpDmJhmodeDao.findByPage(start, end, sql.toString());

			// 计数的SQL
			StringBuffer countSql = new StringBuffer();
			countSql.append("select count(*) from DMP_DM_WBJ where 1=1");
			if (!StringUtils.isEmptyObj(wbjbm)) {
				sql.append(" and WBJBM = '" + wbjbm + "'");
			}
			if (!StringUtils.isEmptyObj(jhmode)) {
				sql.append(" and JHMODE = '" + jhmode + "'");
			}
			int count = dmpDmJhmodeDao.getTotal(countSql.toString());
			PageList<String> pageList = new PageList<String>();
			pageList.setList(list);
			pageList.setCount(count);

			list = null;
			return pageList;
		} catch (Exception e) {
			e.printStackTrace();
			throw new ServiceException("", e);
		}
	}

	// 获取交换模式
	public List<DmpDmJhmodeBean> getJhmodeListByDBtBM(DmpDmJhmodeBean bean) {
		List<DmpDmJhmodeBean> list = dmpDmJhmodeDao.find(DmpDmJhmodeBean.class, "wbjbm", bean.getWbjbm());
		return list;
	}

	// 增加
	public void insert(DmpDmJhmodeBean bean) {
		this.dmpDmJhmodeDao.insert(bean);

	}

	// 删除
	public void deleteDmpDmJhmode(String ids) {
		this.dmpDmJhmodeDao.deleteListById(DmpDmJhmodeBean.class, "wbjbm", ids);

	}

	// 修改
	public void upateBean(Map<String, Object> map, String id) {
		this.dmpDmJhmodeDao.update(new DmpDmJhmodeBean(), map, id);

	}
	public DmpDmJhmodeBean getaddDmpDmJhmode(String ids){	
		return this.dmpDmJhmodeDao.find(DmpDmJhmodeBean.class, ids);
			
	}

}
