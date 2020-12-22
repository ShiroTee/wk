package com.digitalchina.ldp.app.csdsc.service;

import com.alibaba.fastjson.JSONObject;
import com.digitalchina.ldp.app.csdsc.bean.*;
import com.digitalchina.ldp.bean.Model;

import java.util.List;
import java.util.Map;

/**
 * @author 陈超
 * 2014-7-15 下午03:43:22
 */
public interface OnlineInformationService {
	public TotalPopulationInfoBean getTotalPopulationInfo(Model model);
	public PopulationBaseInfoBean getPopulationBaseInfo(Model model);
	public LegalPersonInfoBean getLegalPersonInfo(Model model);
	public List<MacroeconomicInfoBean> getMacroeconomicInfo(Model model);
	public List<Map<String, Object>>  getMarkTableContentByType(Model model);
	public MarriageRegisterBean getMarriageRegister(Model model);
	public PrintContentBean getPrintContent(Model model);
	public List<Map<String, Object>> getAdministrativePunishment(Model model);
	public List<Map<String, Object>> getHonor(Model model);
	public List<Map<String, Object>> getPublicUtilities(Model model);
	public JSONObject getGajDataInfo(Model model);
	public JSONObject getJswDataInfo(Model model);
	
	public List<Map<String, Object>> getNsInfo(Model model);
	
	public void putCsdlkwxkxxInfo(Model model);
	public void putHwggszxxInfo(Model model);
	public void putSgzycsdlxkxxInfo(Model model);
	public void putJyxzycsdlxkxxInfo(Model model);
	
	public List<Map<String, Object>> getRkxxmhInfo(Model model);
	public List<Map<String, Object>> getFrmhInfo(Model model);
	
	public List<Map<String, Object>> getRyxxqwjsInfo(Model model);
	
	public List<Map<String, Object>> getPopulationXxInfo(Model model);
	public  List<Map<String,Object>> getPopulationRelativeInfo(Model model);
	public List<Map<String, String>> getPopulationDetail(Model model);
	
	public RyxxBean getJyxx(Model model);
	public RyxxBean getGzjl(Model model);
	public RyxxBean getGdzc(Model model);
	public RyxxBean getZzzs(Model model);
	public RyxxBean getXzcf(Model model);
	public RyxxBean getJlqk(Model model);
	public RyxxBean getJtgx(Model model);
	/*一下为常熟开发*/
	public ZzjgdmBean getZzjgdmDataInfo(Model model);
	public List<Map<String,Object>> getSchoolDataInfo(Model model);
	public List<Map<String, Object>> getRycbInfo(Model model);
	public List<Map<String, Object>> getTdcrInfo(Model model);
	public SwInfoBean getSwInfo(Model model);
	public DbInfoBean getDbInfo(Model model);
	public void putJdccrkxkInfo(Model model);

    public List<Map<String, Object>> getRKTPQueryType(Model model);

    public List<Map<String, Object>> getDBHC(Model model);
    public Map<String,Object> getDBHC_Export(Model model);
    public List<Map<String,Object>> getRZLFX(Model model);
    public Map<String,Object> getRZLFX_EXPORT(Model model);
    public Map<String,Object> getKYTJ(Model model);
    public Map<String,Object> getKZFX(Model model);
    public Map<String,Object> getLYZF(Model model);
    public Map<String,Object> getKYFX_NLXB(Model model);
    public Map<String,Object> getKYFX_SFRS(Model model);

    public Map<String,Object> getCLXXCX(Model model);
    public Map<String,Object> getAJSL(Model model);
    public Map<String,Object> getXXHS(Model model);
    public Map<String,Object> getJYHC(Model model);
    public Map<String,Object> getYLFX(Model model);
    public Map<String,Object> getTWAZ(Model model);
    public Map<String,Object> getHNBT(Model model);
    public Map<String,Object> getSSMZYERYL(Model model);
    public Map<String,Object> getZJJZRYXX(Model model);
    public Map<String,Object> getZJSTJG(Model model);
    public Map<String,Object> getTSMZXSGL(Model model);
    public Map<String,Object> getTSMZXSGLDetail(Model model);

    public Map<String,Object> getLDSSMZGL(Model model);
    public Map<String,Object> getSSMZFX(Model model);
    public Map<String,Object> getLDSSMZFX(Model model);
    public Map<String,Object> getzsjg(Model model);
    public Map<String,Object> getJZRYJG(Model model);
    public Map<String,Object> getKBRYXXXX(Model model);
    public Map<String,Object> getJZRYJGItem(Model model);
    public Map<String,Object> getHPXXCX(Model model);
    public Map<String,Object> getHPXXCXItem(Model model);
    public Map<String,Object> getSPAQXC(Model model);
    public Map<String,Object> addApplictionTimes(Model model);
	public Map<String,Object> getApplictionInfo(Model model);
    public Map<String,Object> getKZFX_tj(Model model);

	public Map<String,Object> addFtpUploadFile(Model model);
}
