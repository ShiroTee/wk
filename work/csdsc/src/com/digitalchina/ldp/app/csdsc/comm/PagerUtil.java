package com.digitalchina.ldp.app.csdsc.comm;

/**
 * 分页控件工具类
 * 
 * @author zhuxiaofei
 * @version 1.0
 * @since 2014-7-17
 */
public class PagerUtil {

	/**
	 * 得到分页数据sql
	 * 
	 * @param formsql
	 *            原始sql
	 * @param pageNo
	 *            选择页数
	 * @param pageSize
	 *            每页显示条数
	 * @return
	 */
	public static String getPageDataSql(String formsql, String pageNo, String pageSize) {
		StringBuffer sb = new StringBuffer();
		sb.append(" SELECT * FROM ( SELECT A.*, ROWNUM RN  FROM ( ");
		sb.append(formsql);
		sb.append(" ) A WHERE ROWNUM <= " + pageNo + "*" + pageSize + " ) WHERE RN >= " + pageNo + "*" + pageSize + "-"
				+ pageSize + "+1  ");
		return sb.toString();
	}

	/**
	 * 得到分页数据的总页数和总条数sql
	 * 
	 * @param formsql
	 *            原始sql
	 * @param pageSize
	 *            每页显示条数
	 * @return
	 */
	public static String getPageAndCountsSql(String formsql, String pageSize) {
		StringBuffer sb = new StringBuffer();
		sb.append(" SELECT  CASE WHEN  length(COUNT(*) / "+pageSize+")>=2  THEN TRUNC(COUNT(*) / "+pageSize+") + 1 WHEN  length(COUNT(*) / "+pageSize+")=1  THEN TRUNC(COUNT(*) / "+pageSize+") ELSE 0 END  ALLPAGE, COUNT(*) ALLCOUNTS FROM ( ");
		sb.append(formsql);
		sb.append(" )  ");
		return sb.toString();
	}

}
