package com.digitalchina.ldp.app.csdsc.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.csdsc.bean.WbjDataSubmitBean;
import com.digitalchina.ldp.app.csdsc.comm.Pager;
import com.digitalchina.ldp.app.csdsc.dao.IntegralManagerDetailDao;
import com.digitalchina.ldp.app.csdsc.service.IntegralManagerDetailService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;

/**
 * 各委办局积分统计
 * @author MagicChu
 *
 */
@Service
public class IntegralManagerDetailServiceImpl implements	IntegralManagerDetailService {
	@Autowired
	private IntegralManagerDetailDao integralManagerDetailDao;

	/**
	 * 各委办局积分统计查询
	 * 
	 * @param model
	 * @return
	 */
	public Pager getWbjIntegralData(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String startDate = model.getValue("startDate");
		String endDate = model.getValue("endDate");
		
		//选择页数和每页显示数量
		String pageNo = model.getValue("pageNo");
		String pageSize =BeanDefineConfigue.getProperty("pageSize_");
		
		argMap.put(" SUBMIT_DATE >= ","TO_DATE('"+startDate+"', 'yyyy/mm/dd')");
		argMap.put(" SUBMIT_DATE <= ","TO_DATE('"+endDate+"', 'yyyy/mm/dd')");
		return this.integralManagerDetailDao.getWbjIntegralData(argMap,pageNo,pageSize);
	}
	
	
	/**
	 * 查询委办局积分统计内容，组织表格
	 * 
	 * @param model
	 * @return
	 */
	public String getWbjIntegralDataTable(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String startDate = model.getValue("startDate");
		String endDate = model.getValue("endDate");
		
		argMap.put(" SUBMIT_DATE >= ","TO_DATE('"+startDate+"', 'yyyy/mm/dd')");
		argMap.put(" SUBMIT_DATE <= ","TO_DATE('"+endDate+"', 'yyyy/mm/dd')");
		
		List<WbjDataSubmitBean> datas = this.integralManagerDetailDao.getWbjIntegralDataTable(argMap);
		
		//开始
		String str1 = "<center><table style='BORDER-COLLAPSE: collapse;' borderColor='#000000' height='40' cellPadding='1' width='665' align='center' border='1'><tr><th style='text-align: center;'>" +
				"委办局名称</th><th style='text-align: center;''>贡献积分</th>"+
                "<th style='text-align: center;'>使用积分</th>" +
                "<th style='text-align: center;'>质量不合格积分</th></tr><tbody>";
		//中间
		String str2 = "";
		if (datas != null && datas.size() > 0) {
			for (int i = 0; i < datas.size(); i++) {
				str2 +="<tr>"+"<td style='text-align: center;'>"+datas.get(i).getOrgName()+"</td>"+"<td style='text-align: center;'>"+datas.get(i).getContributionIntegral()+"</td>"+"<td style='text-align: center;'>"+datas.get(i).getUseIntegral()+"</td>"+"<td style='text-align: center;'>"+datas.get(i).getRejectIntegral()+"</td></tr>";
			}
		}
		//最后
		String str3 = "</tbody></table></center>";
		
		String rtnTable = str1+str2+str3;
		
		return rtnTable;
	}

}

