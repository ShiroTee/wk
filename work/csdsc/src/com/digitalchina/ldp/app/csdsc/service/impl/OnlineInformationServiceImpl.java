package com.digitalchina.ldp.app.csdsc.service.impl;


import com.alibaba.fastjson.JSONObject;
import com.digitalchina.ldp.app.csdsc.bean.*;
import com.digitalchina.ldp.app.csdsc.comm.ExcelUtils;
import com.digitalchina.ldp.app.csdsc.comm.JsonUtils;
import com.digitalchina.ldp.app.csdsc.dao.OnlineInformationDao;
import com.digitalchina.ldp.app.csdsc.lucene.LuceneUtil;
import com.digitalchina.ldp.app.csdsc.service.OnlineInformationService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.common.util.StringUtils;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author 陈超
 * 2014-7-15 下午03:44:01
 */
@Service
public class OnlineInformationServiceImpl implements	OnlineInformationService {
	@Autowired
	private OnlineInformationDao onlineInformationDao;

	@Override
	public TotalPopulationInfoBean getTotalPopulationInfo(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		int year = model.getInt("year");
		String administrativeRegionId = model.getValue("administrativeRegionId");
		argMap.put(" TJNF = ", year);
		argMap.put(" rk_xzqhmb_id = ","'"+administrativeRegionId+"'");
		return this.onlineInformationDao.findTotalPopulationInfo(argMap);
	}

	@Override
	public PopulationBaseInfoBean getPopulationBaseInfo(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String name = model.getValue("pname");
		int papersType = model.getInt("papersType");
		String papersNum = model.getValue("papersNum");
		argMap.put(" XM = ", "'"+name+"'");
		argMap.put(" b.rk_zjlxmb_id = ",papersType);
		argMap.put(" sfzjh = ","'"+papersNum+"'");
		return this.onlineInformationDao.findPopulationBaseInfo(argMap);
	}

	//获取人口详细信息
	@Override
	public List<Map<String, Object>> getPopulationXxInfo(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String papersNum = model.getValue("papersNum");
		argMap.put(" sfzjh = ","'"+papersNum+"'");
		return this.onlineInformationDao.findPopulationXxInfo(argMap);
	}

	@Override
	public List<Map<String, Object>> getRkxxmhInfo(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String name = model.getValue("pname");
		String count=model.getValue("count").trim();//每页显示数
		String page=model.getValue("page").trim();//当前页码
		argMap.put(" XM = ", "'"+name+"'");


		return this.onlineInformationDao.getRkxxmhInfo(argMap,page,count);
	}

	//获取人员全文检索信息
	@Override
	public List<Map<String, Object>> getRyxxqwjsInfo(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String count=model.getValue("count").trim();//每页显示数
		String page=model.getValue("page").trim();//当前页码
		String name = model.getValue("pname");
		int papersType = model.getInt("papersType");
		String papersNum = model.getValue("papersNum");
		int papersNumLen = papersNum.length();
		int nameLen = name.length();
		System.out.println("==============papersNum================:"+papersNum);
		if (nameLen != 0){
			argMap.put(" XM = ", "'"+name+"'");
		}
		if (papersNumLen !=0){
			argMap.put(" sfzjh = ","'"+papersNum+"'");
		}

		argMap.put(" b.rk_zjlxmb_id = ",papersType);

		System.out.println("————————用于测试的————————："+papersType);

		return this.onlineInformationDao.findRyxxqwjsInfo(argMap);
	}




	@Override
	public List<Map<String, Object>> getFrmhInfo(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String porgName = model.getValue("pname");
		String count=model.getValue("count").trim();//每页显示数
		String page=model.getValue("page").trim();//当前页码
		argMap.put(" FRMC like ", "'%"+porgName+"%'");


		return this.onlineInformationDao.getFrmhInfo(argMap,page,count);
	}




	@Override
	public LegalPersonInfoBean getLegalPersonInfo(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String porgName = model.getValue("porgName");
		String porgCode = model.getValue("porgCode");
		argMap.put(" FRMC = ", "'"+porgName+"'");
		argMap.put(" ZZJGDM = ", "'"+porgCode+"'");
		return this.onlineInformationDao.findLegalPersonInfo(argMap);
	}

	@Override
	public List<MacroeconomicInfoBean> getMacroeconomicInfo(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String time = model.getValue("time");
		String type = model.getValue("type");
		String name = model.getValue("name");
		argMap.put("name", name);
		argMap.put("type", type);
		argMap.put("time", time);
		List<Map<String, Object>> codes =this.onlineInformationDao.findMacroeconomicCode(argMap);
		List<MacroeconomicInfoBean> resultList = new ArrayList<MacroeconomicInfoBean>();
		if(codes.size()>0){
			List<String> paramCode = new ArrayList<String>();
			if("".equals(name)){
				for(Map<String, Object> code : codes){
					String zbdm = code.get("ZBDM").toString();
					paramCode.add(zbdm);
				}
			}else{
				for(Map<String, Object> code : codes){
					String zbdm =code.get("ZBDM").toString();
					int len = zbdm.length();
						if(len>0){
							for(int i=len-4;i>=0; i=i-2){
								paramCode.add(zbdm.substring(0, len-i));
							}
						}
					}
			}
			argMap.put("list", paramCode);
			resultList = this.onlineInformationDao.findMacroeconomicInfo(argMap);
		}

		return resultList;
	}

	@Override
	public List<Map<String, Object>> getMarkTableContentByType(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		int type = model.getInt("tableType");
		return this.onlineInformationDao.findMarkTableContentByType(argMap, type);
	}

	@Override
	public MarriageRegisterBean getMarriageRegister(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String name = model.getValue("pname");
		int papersType = model.getInt("papersType");
		String papersNum = model.getValue("papersNum");
		String papersTypeText = model.getValue("papersTypeText");
		MaritalQueryLog bean = new MaritalQueryLog();
		String name1 = model.getValue("pname1");
		//String papersType1 = model.getValue("papersType1");
		//String papersNum1 = model.getValue("papersNum1");
		String ip = model.getRequest().getRemoteAddr();
		String queryLogId = StringUtils.getPrimarykeyId();
		String userName =model.getValue("userName");
		bean.setId(queryLogId);
		bean.setProxyName(name1);
		//bean.setProxyPapersType(papersType1);
		//bean.setProxyPapersNum(papersNum1);
		bean.setOperateIp(ip);
		bean.setOperatePeople(userName);
		bean.setOperateTime(new Date());
		bean.setOperateContent("成功执行婚姻登记记录查询，查询条件{姓名:"+name+",证件类型:"+papersTypeText+",证件号码:"+papersNum+"}");
		argMap.put(" xm = ", "'"+name+"'");
		argMap.put(" sfzjlx = ",papersType);
		argMap.put(" sfzjh = ","'"+papersNum+"'");
		this.onlineInformationDao.insertMaritalQueryLog(bean);

		Map<String,Object> argMap1 = new HashMap<String,Object>();
		argMap1.put(" XM = ", "'"+name+"'");
		argMap1.put(" b.rk_zjlxmb_id = ",papersType);
		argMap1.put(" sfzjh = ","'"+papersNum+"'");
		List<Map<String, Object>> list= new ArrayList<Map<String, Object>>();
		if(papersType==1){
			 list= this.onlineInformationDao.findMarriageRegister(name,papersNum);
		}

		MarriageRegisterBean rbean = new MarriageRegisterBean();
		rbean.setArgMap(argMap1);
		rbean.setList(list);
		rbean.setQueryLogId(queryLogId);
		return rbean;
	}

	@SuppressWarnings("unchecked")
	@Override
	public PrintContentBean getPrintContent(Model model) {
		String arg = model.getRequest().getParameter("argMap1");
		String queryLogId = model.getRequest().getParameter("queryLogId");
		String mdata = model.getRequest().getParameter("mdata");
		List<Map<String, Object>>  list = JsonUtils.parseJSON2List(mdata);
		Map<String,Object> argMap = JsonUtils.parseJSON2Map(arg);
		PopulationBaseInfoBean baseBean = this.onlineInformationDao.findPopulationBaseInfo(argMap);
		String printNum = this.onlineInformationDao.getPrintNum();
		PrintContentBean bean = new PrintContentBean();
		bean.setList(list);
		bean.setBaseBean(baseBean);

		bean.setPrintNum(printNum);
		SimpleDateFormat f = new SimpleDateFormat("yyyy年MM月dd日");
		String content = "";
		//{登记日期年份}年{登记日期月份}月{登记日期天数}日{当事人姓名}（{当事人证件号码}）与{对方姓名}（{对方证件号码}）办理过{婚姻性质}
		if(list != null && list.size()>0){
			for(int i=0;i<list.size();i++){
				Map<String, Object> map = list.get(i);
				if(map.get("NANZJ").equals(baseBean.getPapersNum())){
					content+=f.format(new Date(Long.parseLong(map.get("DJRQ").toString())))+map.get("NAN").toString()+"("+map.get("NANZJ")+")与"+map.get("NV")+"("+map.get("NVZJ")+")办理过"+map.get("DJXZ")+"</br>";

				}else{
					content+=f.format(new Date(Long.parseLong(map.get("DJRQ").toString())))+map.get("NV")+"("+map.get("NVZJ")+")与"+map.get("NAN").toString()+"("+map.get("NANZJ")+")办理过"+map.get("DJXZ")+"</br>";

				}

			}
		}else{
			content="未发现当事人有结婚或离婚登记记录。";
		}

		PrintLogBean logBean = new PrintLogBean();
		logBean.setId(StringUtils.getPrimarykeyId());
		logBean.setQueryLogId(queryLogId);
		logBean.setPrintTime(new Date());
		logBean.setPrintContent(content);
		logBean.setPrintNum(printNum);
		bean.setCurrentDate(f.format(new Date()));
		this.onlineInformationDao.insertPrintLog(logBean);
		return bean;
	}

	@Override
	public List<Map<String, Object>> getAdministrativePunishment(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		int type = model.getInt("type");
		String name = model.getValue("pname");
		int papersType = model.getInt("papersType");
		String papersNum = model.getValue("papersNum");
		String start = model.getValue("start");
		String end = model.getValue("end");
		argMap.put(" DSRMC = ", "'"+name+"'");
		if(papersType != -1)
			argMap.put(" DSRZJLX = ","'"+papersType+"'");
		if(!"".equals(papersNum))
			argMap.put(" DSRZJHM = ","'"+papersNum+"'");
		if(!"".equals(start))
			argMap.put(" JDRQ >= ","to_date('"+start+"','yyyy-mm-dd')");
		if(!"".equals(end))
			argMap.put(" JDRQ <= ","to_date('"+end+"','yyyy-mm-dd')");
		argMap.put(" DSRLX = ","'"+type+"'");
		return this.onlineInformationDao.findAdministrativePunishment(argMap);
	}

	@Override
	public List<Map<String, Object>> getHonor(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String start = model.getValue("start");
		String end = model.getValue("end");
		String name = model.getValue("pname");
		String papersNum = model.getValue("papersNum");
		int type = model.getInt("type");
		if(!"".equals(start))
			argMap.put(" PDRQ >= ","to_date('"+start+"','yyyy-mm-dd')");
		if(!"".equals(end))
			argMap.put(" PDRQ <= ","to_date('"+end+"','yyyy-mm-dd')");
		if(type == 1){
			int papersType = model.getInt("papersType");
			argMap.put(" XM = ", "'"+name+"'");
			argMap.put(" sfzjlx = ",papersType);
			argMap.put(" sfzjh = ","'"+papersNum+"'");
		}else{
			argMap.put(" FRMC = ", "'"+name+"'");
			argMap.put(" ZZJGDM = ", "'"+papersNum+"'");
		}
		return this.onlineInformationDao.findHonor(argMap,type);
	}

	@Override
	public List<Map<String, Object>> getPublicUtilities(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String start = model.getValue("start");
		String end = model.getValue("end");
		String name = model.getValue("pname");
		String papersNum = model.getValue("papersNum");
		int type = model.getInt("type");
		if(!"".equals(start))
			if(type == 1){
				argMap.put(" to_date(to_char(QFNY,'yyyy-mm'),'yyyy-mm') >= ","to_date('"+start+"','yyyy-mm')");
			}else{
				argMap.put(" to_date(to_char(QFBJRQ,'yyyy-mm'),'yyyy-mm') >= ","to_date('"+start+"','yyyy-mm')");
			}
		if(!"".equals(end))
			if(type == 1){
				argMap.put(" to_date(to_char(QFNY,'yyyy-mm'),'yyyy-mm') <= ","to_date('"+end+"','yyyy-mm')");
			}else{
				argMap.put(" to_date(to_char(QFBJRQ,'yyyy-mm'),'yyyy-mm') <= ","to_date('"+end+"','yyyy-mm')");
			}
		if(type == 1){
			int papersType = model.getInt("papersType");
			if(!"".equals(name))argMap.put(" YHM = ", "'"+name+"'");
			if(!"".equals(papersNum))argMap.put(" ZBH = ","'"+papersNum+"'");

			argMap.put(" t.RK_QFYWZLMB_ID = ","'"+papersType+"'");

		}else{
			argMap.put(" FRMC = ", "'"+name+"'");
			argMap.put(" ZZJGDM = ", "'"+papersNum+"'");
		}
		return this.onlineInformationDao.findPublicUtilities(argMap,type);
	}

	@Override
	public JSONObject getGajDataInfo(Model model) {
		JSONObject json=new JSONObject();
		Map<String,Object> argMap = new HashMap<String,Object>();
		String userName=model.getValue("userName").trim();
		String userIdNo=model.getValue("userIdNo").trim();
		String userSex=model.getValue("userSex").trim();
		String userRace=model.getValue("userRace").trim();
		String count=model.getValue("count").trim();//每页显示数
		String page=model.getValue("page").trim();//当前页码
		if(null!=userName&&!"".equals(userName)){
			argMap.put(" XM like ","'%"+userName+"%'");
		}
		if(null!=userIdNo&&!"".equals(userIdNo)){
			argMap.put(" IDCODE like ","'%"+userIdNo+"%'");
		}
		if(null!=userSex&&!"全部".equals(userSex)){
			argMap.put(" XB = ","'"+userSex+"'");
		}
		if(null!=userRace&&!"".equals(userRace)){
			argMap.put(" MC like ","'%"+userRace+"%'");
		}
		json.put("sum", this.onlineInformationDao.getGajDataInfo_sum(argMap));
		json.put("data", this.onlineInformationDao.getGajDataInfo(argMap,count,page));
		return json;
	}

	@Override
	public JSONObject getJswDataInfo(Model model) {
		JSONObject json=new JSONObject();
		Map<String,Object> argMap = new HashMap<String,Object>();
		String userName=model.getValue("userName").trim();
		String userIdNo=model.getValue("userIdNo").trim();
		String count=model.getValue("count").trim();//每页显示数
		String page=model.getValue("page").trim();//当前页码
		if(null!=userName&&!"".equals(userName)){
			argMap.put(" XM like ","'%"+userName+"%'");
		}
		if(null!=userIdNo&&!"".equals(userIdNo)){
			argMap.put(" IDCODE like ","'%"+userIdNo+"%'");
		}
		json.put("sum", this.onlineInformationDao.getJswDataInfo_sum(argMap));
		json.put("data", this.onlineInformationDao.getJswDataInfo(argMap,count,page));
		return json;
	}

	@Override
	public List<Map<String, Object>> getNsInfo(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String nsrmc = model.getValue("nsrmc");
		String nsrsbh =  model.getValue("nsrsbh");
		String count=model.getValue("count").trim();//每页显示数
		String page=model.getValue("page").trim();//当前页码
		argMap.put(" NSRMC = ", "'"+nsrmc+"'");
		argMap.put(" NSRSBH = ", "'"+nsrsbh+"'");


		return this.onlineInformationDao.findNsInfo(argMap,page,count);
	}

	/*------------------------------------------------------------------------------------*/
	/*一下为常熟开发*/

	@Override
	public ZzjgdmBean getZzjgdmDataInfo(Model model)  {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String jgmc = model.getValue("jgmc");
		String jgdm = model.getValue("jgdm");
    	argMap.put(" JGMC = ", "'"+jgmc+"'");
		argMap.put(" JGDM = ","'"+jgdm+"'");
		return this.onlineInformationDao.findZzjgdmDataInfo(argMap);
	}

	@Override
	public List<Map<String,Object>> getSchoolDataInfo(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String xxmc = model.getValue("xxmc");
    	argMap.put(" XXMC like ", "'%"+xxmc+"%'");
		return this.onlineInformationDao.findSchoolDataInfo(argMap);
	}

	@Override
	public List<Map<String, Object>> getRycbInfo(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String xm = model.getValue("xm");
		String sfzhm = model.getValue("sfzhm");
		String count=model.getValue("count").trim();//每页显示数
		String page=model.getValue("page").trim();//当前页码
		argMap.put(" XM = ", "'"+xm+"'");
		argMap.put(" SFZHM = ", "'"+sfzhm+"'");
		return this.onlineInformationDao.findRycbInfo(argMap,page,count);
	}

	@Override
	public List<Map<String, Object>> getTdcrInfo(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String startdate = model.getValue("startdate");
		String lastdate = model.getValue("lastdate");
		String count=model.getValue("count").trim();//每页显示数
		String page=model.getValue("page").trim();//当前页码
		argMap.put(" HTQDSJ >= ", "to_date('"+startdate+"','yyyy-mm-dd')");
		argMap.put(" HTQDSJ <= ", "to_date('"+lastdate+"','yyyy-mm-dd')");
		return this.onlineInformationDao.findTdcrInfo(argMap,page,count);
	}

	@Override
	public SwInfoBean getSwInfo(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String nsrmc = model.getValue("nsrmc");

		argMap.put(" NSRMC = ", "'"+nsrmc+"'");


		return this.onlineInformationDao.findSwInfo(argMap);
	}

	@Override
	public DbInfoBean getDbInfo(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String xm = model.getValue("hzxm");
		String sfzhm = model.getValue("hzsfzhm");
		argMap.put(" HZXM = ", "'"+xm+"'");
		argMap.put(" HZSFZHM = ", "'"+sfzhm+"'");

		return this.onlineInformationDao.findDbInfo(argMap);

	}

	/**
	 * 机动车永久出入口许可信息
	 */
	@Override
	public void putJdccrkxkInfo(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();

		argMap.put("SQR",model.getValue("sqr"));
		argMap.put("KKDD",model.getValue("kkdd"));
		argMap.put("KKXZ",model.getValue("kkxz"));
		/*argMap.put("KKGG",model.getValue("kkgg"));*/
		argMap.put("SGZDMJ",model.getValue("sgzdmj"));
		argMap.put("SGQSSJ",model.getValue("sgqssj"));
		argMap.put("SGJSSJ",model.getValue("sgjssj"));
		argMap.put("TZQFR",model.getValue("tzqfr"));
		argMap.put("BLSJ",model.getValue("blsj"));
		argMap.put("LXDH",model.getValue("lxdh"));
		argMap.put("BZ",model.getValue("bz"));

		this.onlineInformationDao.putJdccrkxkInfo(argMap);
	}


	/**
	 * 城市道路开挖许可信息
	 */
	@Override
	public void putCsdlkwxkxxInfo(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();

		argMap.put("SQR",model.getValue("sqr"));
		argMap.put("KWYY",model.getValue("kwyy"));
		argMap.put("KWDD",model.getValue("kwdd"));
		argMap.put("KWGGHMJ",model.getValue("kwgghmj"));
		argMap.put("SGZDGGHMJ",model.getValue("sgzdgghmj"));
		argMap.put("SGQSSJ",model.getValue("sgqssj"));
		argMap.put("SGJSSJ",model.getValue("sgjssj"));
		argMap.put("TZQFR",model.getValue("tzqfr"));
		argMap.put("BLSJ",model.getValue("blsj"));
		argMap.put("LXDH",model.getValue("lxdh"));
		argMap.put("BZ",model.getValue("bz"));

		this.onlineInformationDao.putCsdlkwxkxxInfo(argMap);
	}


	/**
	 * 店面招牌/户外广告设置信息
	 */
	@Override
	public void putHwggszxxInfo(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();

		argMap.put("SQR",model.getValue("sqr"));
		argMap.put("SZDD ",model.getValue("szdd"));
		argMap.put("LX",model.getValue("lx"));
		argMap.put("SL",model.getValue("sl"));
	/*	argMap.put("GG1",model.getValue("gg1"));
		argMap.put("GG2",model.getValue("gg2"));
		argMap.put("GG3",model.getValue("gg3"));*/
		argMap.put("ZMJ",model.getValue("zmj"));
		argMap.put("HZSZQSSJ",model.getValue("hzszqssj"));
		argMap.put("HZSZZZSJ",model.getValue("hzszzzsj"));
		argMap.put("TZQFR",model.getValue("tzqfr"));
		argMap.put("BLSJ",model.getValue("blsj"));
		argMap.put("LXDH",model.getValue("lxdh"));
		argMap.put("BZ",model.getValue("bz"));

		this.onlineInformationDao.putHwggszxxInfo(argMap);
	}



/**
 * 施工占用城市道路许可信息
 */
	@Override
	public void putSgzycsdlxkxxInfo(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();

		argMap.put("SQR",model.getValue("sqr"));
		argMap.put("ZDYY ",model.getValue("zdyy"));
		argMap.put("SGZDDD",model.getValue("sgzddd"));
		/*argMap.put("ZDGG1",model.getValue("zdgg1"));
		argMap.put("ZDGG2",model.getValue("zdgg2"));
		argMap.put("ZDGG3 ",model.getValue("zdgg3"));*/
		argMap.put("SGZDZMJ",model.getValue("sgzdzmj"));
		argMap.put("ZDQSSJ",model.getValue("zdqssj"));
		argMap.put("ZDZZSJ",model.getValue("zdzzsj"));
		argMap.put("TZQFR",model.getValue("tzqfr"));
		argMap.put("BLSJ",model.getValue("blsj"));
		argMap.put("LXDH",model.getValue("lxdh"));
		argMap.put("BZ",model.getValue("bz"));

		this.onlineInformationDao.putSgzycsdlxkxxInfo(argMap);
	}


/**
 * 经营性占用城市道路许可信息
 */
	@Override
	public void putJyxzycsdlxkxxInfo(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();

		argMap.put("SQR",model.getValue("sqr"));
		argMap.put("ZDYY ",model.getValue("zdyy"));
		argMap.put("ZDDD",model.getValue("zddd"));
	/*	argMap.put("ZDGG1",model.getValue("zdgg1"));
		argMap.put("ZDGG2",model.getValue("zdgg2"));
		argMap.put("ZDGG3 ",model.getValue("zdgg3"));*/
		argMap.put("ZDZMJ",model.getValue("zdzmj"));
		argMap.put("ZDQSSJ",model.getValue("zdqssj"));
		argMap.put("ZDZZSJ",model.getValue("zdzzsj"));
		argMap.put("ZDSD ",model.getValue("zdsd"));
		argMap.put("TZQFR",model.getValue("tzqfr"));
		argMap.put("BLSJ",model.getValue("blsj"));
		argMap.put("LXDH",model.getValue("lxdh"));
		argMap.put("BZ",model.getValue("bz"));

		this.onlineInformationDao.putJyxzycsdlxkxxInfo(argMap);
	}

	//获取教育信息
	@Override
	public RyxxBean getJyxx(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String papersNum = model.getValue("papersNum");
		argMap.put(" sfzh = ","'"+papersNum+"'");
		return this.onlineInformationDao.getJyxx(argMap);

	}

	//获取工作经历信息
	@Override
	public RyxxBean getGzjl(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String papersNum = model.getValue("papersNum");
		argMap.put(" sfzh = ","'"+papersNum+"'");
		return this.onlineInformationDao.getGzjl(argMap);

	}


	//获取固定资产信息
	@Override
	public RyxxBean getGdzc(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String papersNum = model.getValue("papersNum");
		argMap.put(" sfzh = ","'"+papersNum+"'");
		return this.onlineInformationDao.getGdzc(argMap);

	}

	//获取资质证书信息
	@Override
	public RyxxBean getZzzs(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String papersNum = model.getValue("papersNum");
		argMap.put(" sfzh = ","'"+papersNum+"'");
		return this.onlineInformationDao.getZzzs(argMap);

	}

	//获取行政处罚信息
	@Override
	public RyxxBean getXzcf(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String papersNum = model.getValue("papersNum");
		argMap.put(" sfzh = ","'"+papersNum+"'");
		return this.onlineInformationDao.getXzcf(argMap);

	}

	//获取奖励信息数据
	@Override
	public RyxxBean getJlqk(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String papersNum = model.getValue("papersNum");
		argMap.put(" sfzh = ","'"+papersNum+"'");
		return this.onlineInformationDao.getJlqk(argMap);

	}

	//获取奖励信息数据
	@Override
	public RyxxBean getJtgx(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String papersNum = model.getValue("papersNum");
		argMap.put(" sfzh = ","'"+papersNum+"'");
		return this.onlineInformationDao.getJtgx(argMap);

	}

	/* 查询 人口全文检索详细信息_关联信息(表单)
	 * @author jiaoss
	 */
	@Override
	public List<Map<String,Object>> getPopulationRelativeInfo(Model model) {
        String queryValue = model.getValueNotEmpty("value");//字段的值
        List<Map<String,Object>> configs = this.onlineInformationDao.getFormConfig("");

        return LuceneUtil.multiThreadSearch(queryValue,configs);
	}
	/* 查询 人口全文检索详细信息_关联信息
	 * @author jiaoss
	 */
	@Override
	public List<Map<String, String>> getPopulationDetail(Model model){
        List<Map<String, String>> list = new ArrayList<Map<String, String>>();
        String queryValue = model.getValueNotEmpty("value");
        String tableName = model.getValueNotEmpty("tableName");
        List<Map<String,Object>> configs = this.onlineInformationDao.getFormConfig(tableName);
        if(configs.size()==1) {
            String[] fields = StringUtils.objToString(configs.get(0).get("TABLE_FIELD")).toUpperCase().split(",");
            int len=fields.length;
            for(int i=0; i<len;i++ ){
                fields[i] = tableName +"__"+ fields[i];
            }
           list = LuceneUtil.seacher(queryValue, fields);
        }

		return list;
	}

    @Override
    public List<Map<String, Object>> getRKTPQueryType(Model model){

        return this.onlineInformationDao.getRKTPQueryType();
    }

    //在线信息服务__定制应用__低保核查
    @Override
    public List<Map<String, Object>> getDBHC(Model model){
        HttpServletRequest request = model.getRequest();
        String type = request.getParameter("type");
        String start = request.getParameter("start");
        String end = request.getParameter("end");
        List<String> list = new ArrayList<String>();
        if(type.equals("single")){
            String sfzjh = model.getValueNotEmpty("sfzjh");
            list.add(sfzjh);
        }else{
            list = ExcelUtils.getDBHCExcelData(request);
        }
        List<Map<String, Object>> result = this.onlineInformationDao.getDBHCData(list,start,end);

        return result;
    }


    //在线信息服务__定制应用__低保核查_导出低保核查数据
    @Override
    public Map<String,Object> getDBHC_Export(Model model){
        String start = model.getValueNotEmpty("start");
        String end = model.getValueNotEmpty("end");
        String sfzjhs = model.getValueNotEmpty("list");
        List<String> userList = Arrays.asList(sfzjhs.split("-"));
        List<Map<String, Object>> list= this.onlineInformationDao.getDBHCData(userList,start,end);
        Map<String,Object> map = new HashMap<String, Object>();
        map.put("dbhc",list);
       return map;
    }

    @Override
    public Map<String,Object> getKYTJ(Model model){
        String start = model.getValueNotEmpty("start");
        String end = model.getValueNotEmpty("end");
        Map<String,Object> map =new HashMap<String, Object>();
        List<Map<String,Object>> sftjrs = this.onlineInformationDao.getKYTJ_TJRS_SF(start,end);
        List<Map<String,Object>> yftjrs = this.onlineInformationDao.getKYTJ_TJRS_TJYF(start,end);

        map.put("sftjrs",sftjrs);
        map.put("yftjrs",yftjrs);

        return map;
    }

    @Override
    public Map<String,Object> getKYFX_NLXB(Model model){
        String tjyf = model.getValueNotEmpty("tjyf");
        String name = model.getValueNotEmpty("name");
        Map<String,Object> map =new HashMap<String, Object>();
        List<Map<String,Object>> nl = this.onlineInformationDao.getKYTJ_TJNL(tjyf,name);
        List<Map<String,Object>> xb = this.onlineInformationDao.getKYTJ_TJXB(tjyf,name);

        map.put("nl",nl);
        map.put("xb",xb);

        return map;
    }


    public Map<String,Object> getKYFX_SFRS(Model model){
        String start = model.getValueNotEmpty("start");
        String end = model.getValueNotEmpty("end");
        String name = model.getValueNotEmpty("name");
        Map<String,Object> map =new HashMap<String, Object>();
        List<Map<String,Object>> sftjrs = this.onlineInformationDao.getKYTJ_SFTJ(start,end,name);
        List<Map<String,Object>> tjrs = this.onlineInformationDao.getKYTJ_TJRS_TJYF(start,end);

        map.put("tjrs",tjrs);
        map.put("sftjrs",sftjrs);

        return map;
    }

    @Override
    public List<Map<String,Object>> getRZLFX(Model model){
        String start = model.getValueNotEmpty("start");
        String end = model.getValueNotEmpty("end");

        List<Map<String,Object>> rzl = this.onlineInformationDao.getLYFX_RZL(start,end);
        return rzl;
    }


    //在线信息服务__定制应用__低保核查_导出低保核查数据
    @Override
    public Map<String,Object> getRZLFX_EXPORT(Model model){
        String start = model.getValueNotEmpty("start");
        String end = model.getValueNotEmpty("end");
        List<Map<String,Object>> rzl = this.onlineInformationDao.getLYFX_RZL_EXPORT(start,end);
        Map<String,Object> map = new HashMap<String, Object>();
        map.put("rzl",rzl);
        return map;
    }


    @Override
    public Map<String,Object> getKZFX(Model model){
        String start = model.getValueNotEmpty("start");
        String end = model.getValueNotEmpty("end");

        List<Map<String,Object>> hotels = this.onlineInformationDao.getKZFX(start,end);
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("hotels",hotels);
        return map;
    }

    @Override
    public Map<String,Object> getKZFX_tj(Model model){
        String type = model.getValueNotEmpty("type");
        String tjyf = model.getValueNotEmpty("tjyf");

        List<Map<String,Object>> hotels = this.onlineInformationDao.getKZFX_tj(type,tjyf);
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("hotels",hotels);
        return map;
    }


    @Override
    public Map<String,Object> getLYZF(Model model){
        String name = model.getValueNotEmpty("name");

        List<Map<String,Object>> hotels = this.onlineInformationDao.getLYZF(name);
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("hotels",hotels);
        return map;
    }
   @Override
    public Map<String,Object> getCLXXCX(Model model){
        
        String cph= model.getValueNotEmpty("cph");
        List<Map<String,Object>> list = this.onlineInformationDao.getCLXXCX(cph);
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("CLXXCX",list);
        return map;
    }

   @Override
    public Map<String,Object> getAJSL(Model model){
        
        String sfzjh= model.getValueNotEmpty("sfzjh");
        Map<String,Object> map =new HashMap<String, Object>();
        List<Map<String,Object>> sfzhs = this.onlineInformationDao.getJTCYSFZH(sfzjh);
       if(sfzhs.size()>0) {
           List<Map<String, Object>> clxx = this.onlineInformationDao.getCLXX(sfzhs);
           List<Map<String, Object>> fcxx = this.onlineInformationDao.getFCXX(sfzhs);
           List<Map<String, Object>> hyxx = this.onlineInformationDao.getHYXX(sfzhs);
           List<Map<String, Object>> jtgx = this.onlineInformationDao.getJTRYXX(sfzhs);
           List<Map<String, Object>> gszcxx = this.onlineInformationDao.getGSZCXX(sfzhs);
           List<Map<String, Object>> nsxx = this.onlineInformationDao.getNSXX(sfzhs);

           map.put("clxx", clxx);
           map.put("fcxx", fcxx);
           map.put("hyxx", hyxx);
           map.put("jtgx", jtgx);
           map.put("gszcxx", gszcxx);
           map.put("nsxx", nsxx);
       }

        return map;
    }
   @Override
    public Map<String,Object> getXXHS(Model model){
        
        String name= model.getValueNotEmpty("name");
        String sfzjh= model.getValueNotEmpty("sfzjh");
        List<Map<String,Object>> list = this.onlineInformationDao.getXXHS(name,sfzjh);

       Map<String,Object> sfzhs =new HashMap<String, Object>();
       sfzhs.put("SFZH",sfzjh);
       ArrayList<Map<String, Object>>  listSfzh= new ArrayList<Map<String, Object>>();
       listSfzh.add(sfzhs);
       List<Map<String, Object>> gszcxx = this.onlineInformationDao.getGSZCXX(listSfzh);

        Map<String,Object> map =new HashMap<String, Object>();
        map.put("XXHS",list);
        map.put("GSZCXX",gszcxx);
        return map;
    }
   @Override
    public Map<String,Object> getJYHC(Model model){
        
        String name= model.getValueNotEmpty("name");
        String sfzjh= model.getValueNotEmpty("sfzjh");
        List<Map<String,Object>> list = this.onlineInformationDao.getJYHC(name,sfzjh);
       Map<String,Object> sfzhs =new HashMap<String, Object>();
       sfzhs.put("SFZH",sfzjh);
       ArrayList<Map<String, Object>>  listSfzh= new ArrayList<Map<String, Object>>();
       listSfzh.add(sfzhs);
       List<Map<String, Object>> gszcxx = this.onlineInformationDao.getGSZCXX(listSfzh);
       List<Map<String, Object>> hyxx = this.onlineInformationDao.getHYXX(listSfzh);
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("JYHC",list);
        map.put("GSZCXX",gszcxx);
        map.put("HYXX",hyxx);
        return map;
    }
   @Override
    public Map<String,Object> getYLFX(Model model){
        
        String startDate= model.getValueNotEmpty("startDate");
        String endDate= model.getValueNotEmpty("endDate");
        List<Map<String,Object>> list = this.onlineInformationDao.getYLFX(startDate,endDate);
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("YLFX",list);
        return map;
    }
   @Override
    public Map<String,Object> getTWAZ(Model model){
        
        String dwmc= model.getValueNotEmpty("dwmc");
        String gwlb= model.getValue("gwlb");
        String ryfl= model.getValue("ryfl");
        List<Map<String,Object>> TWAZ = this.onlineInformationDao.getTWAZ(dwmc,gwlb,ryfl);
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("TWAZ",TWAZ);
        return map;
    }
   @Override
    public Map<String,Object> getHNBT(Model model){
        
        String sfzjh= model.getValueNotEmpty("sfzjh");
        String name= model.getValueNotEmpty("name");
        List<Map<String,Object>> HNBT = this.onlineInformationDao.getHNBT(sfzjh,name);
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("HNBT",HNBT);
        return map;
    }
   @Override
    public Map<String,Object> getSSMZYERYL(Model model){
        
        String endDate= model.getValueNotEmpty("endDate");
        String startDate= model.getValueNotEmpty("startDate");
        List<Map<String,Object>> SSMZYERYL = this.onlineInformationDao.getSSMZYERYL(endDate,startDate);
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("SSMZYERYL",SSMZYERYL);
        return map;
    }
   @Override
    public Map<String,Object> getZJJZRYXX(Model model){
        
        String sfzjh= model.getValueNotEmpty("sfzjh");
        String name= model.getValueNotEmpty("name");
        List<Map<String,Object>> YLBX = this.onlineInformationDao.getYLBX(sfzjh,name);
        List<Map<String,Object>> YILBX = this.onlineInformationDao.getYILBX(sfzjh,name);
        List<Map<String,Object>> SYBX = this.onlineInformationDao.getSYBX(sfzjh,name);
       List<Map<String,Object>> jzry = this.onlineInformationDao.getJZRY(sfzjh,name);
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("YLBX",YLBX);
        map.put("YILBX",YILBX);
        map.put("SYBX",SYBX);
        map.put("JZRY",jzry);
        return map;
    }
   @Override
    public Map<String,Object> getZJSTJG(Model model){
        
        String stname= model.getValueNotEmpty("stname");
        List<Map<String,Object>> ZJSTJG = this.onlineInformationDao.getZJSTJG(stname);
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("ZJSTJG",ZJSTJG);
        return map;
    }
   @Override
    public Map<String,Object> getTSMZXSGL(Model model){
        
        String xxname= model.getValueNotEmpty("xxname");
        List<Map<String,Object>> TSMZXSGL = this.onlineInformationDao.getTSMZXSGL(xxname);
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("TSMZXSGL",TSMZXSGL);
        return map;
    }

    @Override
    public Map<String,Object> getTSMZXSGLDetail(Model model){

        String xxname= model.getValueNotEmpty("xxname");
        List<Map<String,Object>> TSMZXSGL = this.onlineInformationDao.getTSMZXSGLDetail(xxname);
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("Detail",TSMZXSGL);
        return map;
    }
   @Override
    public Map<String,Object> getLDSSMZGL(Model model){
        
        String sfzjh= model.getValueNotEmpty("sfzjh");
        String name= model.getValueNotEmpty("name");
        List<Map<String,Object>> LDSSMZGL = this.onlineInformationDao.getLDSSMZGL(sfzjh,name);
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("LDSSMZGL",LDSSMZGL);
        return map;
    }
   @Override
    public Map<String,Object> getSSMZFX(Model model){
        
        List<Map<String,Object>> SSMZFX = this.onlineInformationDao.getSSMZFX();
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("SSMZFX",SSMZFX);
        return map;
    }

    @Override
    public Map<String,Object> getLDSSMZFX(Model model){

        List<Map<String,Object>> LDSSMZFX = this.onlineInformationDao.getLDSSMZFX();
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("LDSSMZFX",LDSSMZFX);
        return map;
    }

   @Override
    public Map<String,Object> getzsjg(Model model){
        
        String srr= model.getValueNotEmpty("srr");
        List<Map<String,Object>> zsjg = this.onlineInformationDao.getzsjg(srr);
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("zsjg",zsjg);
        return map;
    }
   @Override
    public Map<String,Object> getJZRYJG(Model model){
        
        String sfzjh= model.getValueNotEmpty("sfzjh");
        String name= model.getValueNotEmpty("name");
        List<Map<String,Object>> JZRYJG = this.onlineInformationDao.getJZRYJG(sfzjh,name);
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("JZRYJG",JZRYJG);
        return map;
    }
   @Override
    public Map<String,Object> getKBRYXXXX(Model model){
        
        String name= model.getValueNotEmpty("name");
        List<Map<String,Object>> KBRYXXXX = this.onlineInformationDao.getKBRYXXXX(name);
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("KBRYXXXX",KBRYXXXX);
        return map;
    }
   @Override
    public Map<String,Object> getJZRYJGItem(Model model){
        
        String sfzjh= model.getValueNotEmpty("sfzjh");
        List<Map<String,Object>> GSXZCF = this.onlineInformationDao.getGSXZCF(sfzjh);
        List<Map<String,Object>> FYZFRY = this.onlineInformationDao.getFYZFRY(sfzjh);
        List<Map<String,Object>> GONGSXZCF = this.onlineInformationDao.getGONGSXZCF(sfzjh);
        List<Map<String,Object>> AJXZCF = this.onlineInformationDao.getAJXZCF(sfzjh);
        List<Map<String,Object>> CXZDXZCF = this.onlineInformationDao.getCXZDXZCF(sfzjh);
        List<Map<String,Object>> ZJZDXZCF = this.onlineInformationDao.getZJZDXZCF(sfzjh);
        List<Map<String,Object>> FZZDXZCF = this.onlineInformationDao.getFZZDXZCF(sfzjh);
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("GSXZCF",GSXZCF);
        map.put("FYZFRY",FYZFRY);
        map.put("GONGSXZCF",GONGSXZCF);
        map.put("AJXZCF",AJXZCF);
        map.put("CXZDXZCF",CXZDXZCF);
        map.put("ZJZDXZCF",ZJZDXZCF);
        map.put("FZZDXZCF",FZZDXZCF);
        return map;
    }
   @Override
    public Map<String,Object> getHPXXCX(Model model){
        
        String dwmc= model.getValueNotEmpty("dwmc");
        List<Map<String,Object>> HPXXCX = this.onlineInformationDao.getHPXXCX(dwmc);
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("HPXXCX",HPXXCX);
        return map;
    }

    @Override
    public Map<String,Object> getHPXXCXItem(Model model){

        String dwmc= model.getValueNotEmpty("dwmc");
        List<Map<String,Object>> HPXXCX = this.onlineInformationDao.getHPXXCXItem(dwmc);
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("HPXXCX",HPXXCX);
        return map;
    }
   @Override
    public Map<String,Object> getSPAQXC(Model model){
        
        String stmc= model.getValueNotEmpty("stmc");
        List<Map<String,Object>> SPAQXC = this.onlineInformationDao.getSPAQXC(stmc);
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("SPAQXC",SPAQXC);
        return map;
    }

    public Map<String,Object> addApplictionTimes(Model model){
        String rdpUserName= model.getValueNotEmpty("rdpUserName");
        String rdpUserOrg= model.getValueNotEmpty("rdpUserOrg");
        String rdpUserOrgId= model.getValueNotEmpty("rdpUserOrgId");
        String rdploginName= model.getValueNotEmpty("rdploginName");
        String useCount= model.getValueNotEmpty("useCount");
        String useTime= model.getValueNotEmpty("useTime");
        String applicationName= model.getValueNotEmpty("applicationName");
        int flag = this.onlineInformationDao.addApplictionTimes(rdpUserName,rdpUserOrg,
                rdpUserOrgId, rdploginName,useCount,useTime,applicationName);
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("flag",flag);
        return map;
    }

	public Map<String,Object> getApplictionInfo(Model model){
		String type= model.getValueNotEmpty("type");
		List<Map<String,Object>> desc = this.onlineInformationDao.getApplictionDesc(type);
		List<Map<String,Object>> dataType = this.onlineInformationDao.getApplictionDataType(type);
		Map<String,Object> map =new HashMap<String, Object>();
		map.put("desc",desc);
		map.put("type",dataType);
		return map;
	}

    public Map<String, Object> submitFtpFile(Model model){
        HttpServletRequest request=model.getRequest();
        String path=request.getParameter("path");
        System.out.println("name====>"+request.getParameter("name"));
        DiskFileItemFactory factory = new DiskFileItemFactory();
        // 设置内存缓冲区，超过后写入临时文件
        factory.setSizeThreshold(10240000);
        // 设置临时文件存储位置
        String base = "d:/uploadFiles";
        File file = new File(base);
        if(!file.exists())
            file.mkdirs();
        factory.setRepository(file);
        ServletFileUpload upload = new ServletFileUpload(factory);
        // 设置单个文件的最大上传值
        upload.setFileSizeMax(10002400000l);
        // 设置整个request的最大值
        upload.setSizeMax(10002400000l);
        upload.setHeaderEncoding("UTF-8");

        try {
            List<?> items = upload.parseRequest(request);
            FileItem item = null;
            String fileName = null;
            for (int i = 0 ;i < items.size(); i++){
                item = (FileItem) items.get(i);
                fileName = base + File.separator + item.getName();
                // 保存文件
                if (!item.isFormField() && item.getName().length() > 0) {
                    item.write(new File(fileName));
                }
            }
        } catch (FileUploadException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new HashMap<String, Object>();
    }

	public Map<String,Object> addFtpUploadFile(Model model){
		String uuid= model.getValueNotEmpty("uuid");
		String webUserName= model.getValueNotEmpty("webUserName");
		String uploadTime= model.getValueNotEmpty("uploadTime");
		String desc= model.getValueNotEmpty("operate_desc");
		String type= model.getValueNotEmpty("operate_type");
		String ftpUserName= model.getValueNotEmpty("ftpUserName");
		int flag = this.onlineInformationDao.addFtpUploadFileLog(uuid,webUserName, uploadTime,
				desc,
				type, ftpUserName);
		Map<String,Object> map =new HashMap<String, Object>();
		map.put("flag",flag);
		return map;
	}


}
