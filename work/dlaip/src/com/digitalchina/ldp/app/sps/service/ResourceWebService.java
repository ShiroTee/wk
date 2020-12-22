package com.digitalchina.ldp.app.sps.service;

import java.util.Date;

import com.digitalchina.ldp.app.sps.bean.AssetInfo;
import com.digitalchina.ldp.bean.PageList;
/**
 * 
* 类描述：资源目录为门户提供的WEB服务接口
* 创建人：python   
* 创建时间：2014-5-27 下午05:55:29   
* 修改人：python   
* 修改时间：2014-5-27 下午05:55:29   
* 修改备注：   
* @version    
*
 */
public interface ResourceWebService
{
	/**
	 * 
	 * @param orgId
	 *        组织机构ID
	 * @param start
	 *        开始行数
	 * @param pageSize
	 *        每页大小
	 * @param assetName
	 *        资产目录名称，该参数可以为空
	 * @param startPubDate
	 *        资源目录发布日期起始时间
	 * @param endPubDate
	 *        资源目录发布日期结束时间
	 * @return
	 */
	public PageList<AssetInfo> queryByOrg(String orgId,int start,int pageSize,String assetName,Date startPubDate,Date endPubDate);
	/**
	 * 
	 * @param orgId
	 *        组织机构ID
	 * @param start
	 *        开始行数
	 * @param pageSize
	 *        每页大小
	 * @param assetName
	 *        资产目录名称，该参数可以为空
	 * @param startPubDate
	 *        资源目录发布日期起始时间
	 * @param endPubDate
	 *        资源目录发布日期结束时间
	 * @param userId
	 *        登录用户ID
	 * @return
	 */
	public PageList<AssetInfo> queryByOrg(String orgId,String userId,int start,int pageSize,String assetName,Date startPubDate,Date endPubDate);
	/**
	 * 
	 * @param subjectId
	 *        分类ID
	 * @param start
	 *        开始行数
	 * @param pageSize
	 *        每页大小
	 * @param assetName
	 *        资产目录名称，该参数可以为空
	 * @param startPubDate
	 *        资源目录发布日期起始时间
	 * @param endPubDate
	 *        资源目录发布日期结束时间
	 * @param userId
	 *        登录用户ID
	 * @return
	 */
	public PageList<AssetInfo> queryBySubject(String subjectId,int start,int pageSize,String assetName,Date startPubDate,Date endPubDate);
	/**
	 * 
	 * @param subjectId
	 *        分类ID
	 * @param userId
	 *        登录用户Id
	 * @param start
	 *        开始行数
	 * @param pageSize
	 *        每页大小
	 * @param assetName
	 *        资产目录名称，该参数可以为空
	 * @param startPubDate
	 *        资源目录发布日期起始时间
	 * @param endPubDate
	 *        资源目录发布日期结束时间
	 * @param userId
	 *        登录用户ID
	 * @return
	 */
	public PageList<AssetInfo> queryBySubject(String subjectId,String userId,int start,int pageSize,String assetName,Date startPubDate,Date endPubDate);
}
