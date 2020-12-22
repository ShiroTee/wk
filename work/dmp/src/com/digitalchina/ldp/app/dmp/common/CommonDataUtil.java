package com.digitalchina.ldp.app.dmp.common;

import java.text.SimpleDateFormat;

public class CommonDataUtil {
	
	public static String getRuleFlag(String ruleType){
		String ruleCode = "";
		if("1".equals(ruleType)){
			ruleCode = "C";
		}else if("2".equals(ruleType)){
			ruleCode = "R";
		}else if("3".equals(ruleType)){
			ruleCode = "T";
		}else if("4".equals(ruleType)){
			ruleCode = "L";
		}else if("5".equals(ruleType)){
			ruleCode = "E";
		}
		return ruleCode;
	}
	
	public static String getDataRuleCode(String ruleType, String wbjCode, String tableCode, String columnCode,String ruleNameId) {
		String ruleCode = "";
		if("1".equals(ruleType)){
			ruleCode = "C_"+wbjCode+"_"+tableCode+"_"+columnCode+"_"+ruleNameId;
		}else if("2".equals(ruleType)){
			ruleCode = "R_"+wbjCode+"_"+tableCode+"_"+columnCode+"_"+ruleNameId;
		}else if("3".equals(ruleType)){
			ruleCode = "T_"+wbjCode+"_"+tableCode+"_"+columnCode+"_"+ruleNameId;
		}else if("4".equals(ruleType)){
			ruleCode = "L_"+wbjCode+"_"+tableCode+"_"+columnCode+"_"+ruleNameId;
		}else if("5".equals(ruleType)){
			ruleCode = "E_"+wbjCode+"_"+tableCode+"_"+columnCode+"_"+ruleNameId;
		}
		return ruleCode;
	}
	
	/**
	 * 获取规则类型
	 * @param ruleType
	 * @return
	 */
	public static String getRuleTypeStr(Integer ruleType) {
		String reslut = "";
		switch (ruleType) {
		case 1:
			reslut = "清洗规则";
			break;
		case 2:
			reslut = "比对规则";
			break;
		case 3:
			reslut = "转换规则";
			break;
		case 4:
			reslut = "加载规则";
			break;
		case 5:
			reslut = "抽取规则";
			break;
		}
		return reslut;
	}
	
	/**
	 * 返回规则类型NUM
	 * @param ruleType
	 * @return
	 */
	public static int getRuleNum(String ruleType) {
		int reslut = 0;
		if("清洗规则".equals(ruleType)){
			reslut = 1;
		}else if("比对规则".equals(ruleType)){
			reslut = 2;
		}else if("转换规则".equals(ruleType)){
			reslut = 3;
		}else if("加载规则".equals(ruleType)){
			reslut = 4;
		}else{
			reslut = 5;
		}
		return reslut;
	}

	public static String format(Object object) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String value = sdf.format(object);
		return value;
	}

	public static String getDataFrom(String dataFrom) {
		String result = "";
		if("1".equals(dataFrom)){
			result = "委办局用户";
		}else if("2".equals(dataFrom)){
			result = "运维人员";
		}else{
			result = "未知";
		}
		return result;
	}
}
