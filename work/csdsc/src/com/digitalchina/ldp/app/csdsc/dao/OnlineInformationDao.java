package com.digitalchina.ldp.app.csdsc.dao;

import com.digitalchina.ldp.app.csdsc.bean.*;

import java.util.List;
import java.util.Map;

/**
 * @author 陈超 2014-7-15 下午03:44:38
 */
public interface OnlineInformationDao {
	public TotalPopulationInfoBean findTotalPopulationInfo(Map<String, Object> argMap);
	public PopulationBaseInfoBean findPopulationBaseInfo(Map<String, Object> argMap);
	public LegalPersonInfoBean findLegalPersonInfo(Map<String, Object> argMap);
	public List<Map<String, Object>> findMacroeconomicCode(Map<String, Object> argMap);
	public List<MacroeconomicInfoBean> findMacroeconomicInfo(Map<String, Object> argMap);
	public List<Map<String, Object>>  findMarkTableContentByType(Map<String, Object> argMap,int type);
	public List<Map<String, Object>>  findMarriageRegister(String name, String papersNum);
	public void insertMaritalQueryLog(MaritalQueryLog bean);
	public void insertPrintLog(PrintLogBean bean);
	public String getPrintNum();
	public List<Map<String, Object>> findAdministrativePunishment(Map<String, Object> argMap);
	public List<Map<String, Object>> findHonor(Map<String, Object> argMap,int type);
	public List<Map<String, Object>> findPublicUtilities(Map<String, Object> argMap, int type);
	public int getGajDataInfo_sum(Map<String, Object> argMap);
	public List<Map<String, Object>> getGajDataInfo(Map<String, Object> argMap,String count,String page);
	public int getJswDataInfo_sum(Map<String, Object> argMap);
	public List<Map<String, Object>> getJswDataInfo(Map<String, Object> argMap,String count,String page);
	
	public List<Map<String, Object>> findNsInfo (Map<String, Object> argMap,String page,String count);
	
	public void putCsdlkwxkxxInfo(Map<String, Object> argMap);
	public void putHwggszxxInfo(Map<String, Object> argMap);
	public void putSgzycsdlxkxxInfo(Map<String, Object> argMap);
	public void putJyxzycsdlxkxxInfo(Map<String, Object> argMap);
	
	public List<Map<String, Object>> getRkxxmhInfo (Map<String, Object> argMap,String page,String count);
	public List<Map<String, Object>> getFrmhInfo (Map<String, Object> argMap,String page,String count);
	
	public List<Map<String, Object>> findRyxxqwjsInfo (Map<String, Object> argMap);
	
	
	public List<Map<String, Object>> findPopulationXxInfo(Map<String, Object> argMap);
	public List<Map<String, Object>> getFormConfig(String table);
	public RyxxBean getJyxx(Map<String, Object> argMap);
	public RyxxBean getGzjl(Map<String, Object> argMap);
	public RyxxBean getGdzc(Map<String, Object> argMap);
	public RyxxBean getZzzs(Map<String, Object> argMap);
	public RyxxBean getXzcf(Map<String, Object> argMap);
	public RyxxBean getJlqk(Map<String, Object> argMap);
	public RyxxBean getJtgx(Map<String, Object> argMap);

	/*常熟开发*/
	public ZzjgdmBean findZzjgdmDataInfo(Map<String, Object> argMap);
	public List<Map<String,Object>> findSchoolDataInfo(Map<String, Object> argMap);
	public List<Map<String, Object>> findRycbInfo(Map<String, Object> argMap,String page,String count);
	public List<Map<String, Object>> findTdcrInfo(Map<String, Object> argMap,String page,String count);
	public SwInfoBean findSwInfo(Map<String, Object> argMap);
	public DbInfoBean findDbInfo(Map<String, Object> argMap);
	public void putJdccrkxkInfo(Map<String, Object> argMap);

    public List<Map<String, Object>> getRKTPQueryType();
    public List<Map<String, Object>> getDBHCData(List<String> list,String start,String end);
    public List<Map<String, Object>> getLYFX_RZL(String start,String end);
    public List<Map<String, Object>> getLYFX_RZL_EXPORT(String start,String end);
    public List<Map<String, Object>> getKYTJ_TJXB(String tjyf,String name);
    public List<Map<String, Object>> getKYTJ_TJNL(String tjyf,String name);
    public List<Map<String, Object>> getKYTJ_TJRS_SF(String start,String end);
    public List<Map<String, Object>> getKYTJ_SFTJ(String start,String end,String name);
    public List<Map<String, Object>> getKYTJ_TJRS_TJYF(String start,String end);
    public List<Map<String, Object>> getKZFX(String start,String end);
    public List<Map<String, Object>> getKZFX_tj(String type,String tjyf);
    public List<Map<String, Object>> getLYZF(String name);

    public List<Map<String, Object>> getCLXXCX(String cph);
    public List<Map<String, Object>> getJTCYSFZH(String sfzjh);
    public List<Map<String, Object>> getJTRYXX( List<Map<String,Object>> sfzjh);
    public List<Map<String, Object>> getCLXX(List<Map<String,Object>> sfzjh);
    public List<Map<String, Object>> getFCXX(List<Map<String,Object>> sfzjh);
    public List<Map<String, Object>> getHYXX(List<Map<String,Object>> sfzjh);
    public List<Map<String, Object>> getGSZCXX(List<Map<String,Object>> sfzjh);
    public List<Map<String, Object>> getNSXX(List<Map<String,Object>> sfzjh);
    public List<Map<String, Object>> getXXHS(String name,String sfzjh);
    public List<Map<String, Object>> getJYHC(String name,String sfzjh);
    public List<Map<String, Object>> getYLFX(String startDate,String endDate);
    public List<Map<String, Object>> getTWAZ(String dwmc,String gwlb,String ryfl);
    public List<Map<String, Object>> getHNBT(String sfzjh,String name);
    public List<Map<String, Object>> getSSMZYERYL(String endDate,String startDate);
    public List<Map<String, Object>> getYLBX(String sfzjh,String name);
    public List<Map<String, Object>> getYILBX(String sfzjh,String name);
    public List<Map<String, Object>> getSYBX(String sfzjh,String name);
    public List<Map<String, Object>> getJZRY(String sfzjh,String name);
    public List<Map<String, Object>> getZJSTJG(String stname);

    public List<Map<String, Object>> getTSMZXSGL(String xxname);
    public List<Map<String, Object>> getTSMZXSGLDetail(String xxname);

    public List<Map<String, Object>> getLDSSMZGL(String sfzjh,String name);
    public List<Map<String, Object>> getSSMZFX();
    public List<Map<String, Object>> getLDSSMZFX();
    public List<Map<String, Object>> getzsjg(String srr);
    public List<Map<String, Object>> getJZRYJG(String sfzjh,String name);
    public List<Map<String, Object>> getKBRYXXXX(String name);
    public List<Map<String, Object>> getGSXZCF(String sfzjh);
    public List<Map<String, Object>> getFYZFRY(String sfzjh);
    public List<Map<String, Object>> getGONGSXZCF(String sfzjh);
    public List<Map<String, Object>> getAJXZCF(String sfzjh);
    public List<Map<String, Object>> getCXZDXZCF(String sfzjh);
    public List<Map<String, Object>> getZJZDXZCF(String sfzjh);
    public List<Map<String, Object>> getFZZDXZCF(String sfzjh);
    public List<Map<String, Object>> getHPXXCX(String dwmc);
    public List<Map<String, Object>> getHPXXCXItem(String dwmc);
    public List<Map<String, Object>> getSPAQXC(String stmc);
    public List<Map<String, Object>> getApplictionDesc(String type);
    public List<Map<String, Object>> getApplictionDataType(String type);
    public int addApplictionTimes(String  rdpUserName, String rdpUserOrg, String rdpUserOrgId,
                                               String rdploginName, String useCount, String useTime, String applicationName);

    public int addFtpUploadFileLog(String uuid,String  webUserName, String uploadTime,
                                   String desc,
                                   String type, String ftpUserName);
}
