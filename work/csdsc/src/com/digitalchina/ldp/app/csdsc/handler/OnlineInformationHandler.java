package com.digitalchina.ldp.app.csdsc.handler;

import com.alibaba.fastjson.JSONObject;
import com.digitalchina.ldp.app.csdsc.bean.*;
import com.digitalchina.ldp.app.csdsc.service.OnlineInformationService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.common.util.DbContextHolder;
import com.digitalchina.ldp.handler.AbstractHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @author 陈超
 * 2014-7-15 下午03:40:54
 */
@Component
public class OnlineInformationHandler extends AbstractHandler{
	
	@Autowired
	private OnlineInformationService onlineInformationService;
	/*
	 * 全员人口
	 */
	@HttpService                   
	public TotalPopulationInfoBean getTotalPopulationInfo(Model model){
		DbContextHolder.setDefaultDbType("csdsc");
		return this.onlineInformationService.getTotalPopulationInfo(model);
		
	}
	/*
	 * 人口基本信息
	 */
	@HttpService                  
	public PopulationBaseInfoBean getPopulationBaseInfo(Model model){
		DbContextHolder.setDefaultDbType("csdsc");
		return this.onlineInformationService.getPopulationBaseInfo(model);
		
	}
	
	/*
	 * 人口详细信息
	 */
	@HttpService                  
	public List<Map<String, Object>>  getPopulationXxInfo(Model model){
		DbContextHolder.setDefaultDbType("csdsc");
		return this.onlineInformationService.getPopulationXxInfo(model);
	}
	
	
	/*
	 * 人口基本信息模糊查询
	 */
	@HttpService                  
	public List<Map<String, Object>> getRkxxmhInfo(Model model){
		DbContextHolder.setDefaultDbType("csdsc");
		return this.onlineInformationService.getRkxxmhInfo(model);
		
	}
	
	
	/*
	 * 人员信息全文检索
	 */
	@HttpService                  
	public List<Map<String, Object>> getRyxxqwjsInfo(Model model){
		DbContextHolder.setDefaultDbType("csdsc");
		return this.onlineInformationService.getRyxxqwjsInfo(model);
		
	}
	
	
	/*
	 * 法人
	 */
	@HttpService
	public LegalPersonInfoBean getLegalPersonInfo(Model model){
		DbContextHolder.setDefaultDbType("csdsc");
		return this.onlineInformationService.getLegalPersonInfo(model);
		
	}
	
	/*
	 * 法人基本信息模糊查询
	 */
	@HttpService
	public List<Map<String, Object>> getFrmhInfo(Model model){
		DbContextHolder.setDefaultDbType("csdsc");
		return this.onlineInformationService.getFrmhInfo(model);
		
	}
	
	
	/*
	 * 宏观经济
	 */
	@HttpService
	public List<MacroeconomicInfoBean> getMacroeconomicInfo(Model model){
		DbContextHolder.setDefaultDbType("csdsc");
		return this.onlineInformationService.getMacroeconomicInfo(model);
		
	}
	/*
	 * 获取码表内容
	 */
	@HttpService
	public List<Map<String, Object>> getMarkTableContentByType(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.onlineInformationService.getMarkTableContentByType(model);
		
	}
	/*
	 * 婚姻登记查询
	 */
	@HttpService
	public MarriageRegisterBean getMarriageRegister(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.onlineInformationService.getMarriageRegister(model);
		
	}
	/*
	 * 获取婚姻登记打印内容
	 */
	@HttpService
	public PrintContentBean getPrintContent(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.onlineInformationService.getPrintContent(model);
		
	}
	/*
	 * 获取行政处罚
	 */
	@HttpService
	public List<Map<String, Object>> getAdministrativePunishment(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.onlineInformationService.getAdministrativePunishment(model);
		
	}
	/*
	 * 获取荣誉
	 */
	@HttpService
	public List<Map<String, Object>> getHonor(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.onlineInformationService.getHonor(model);
		
	}
	/*
	 * 获取公共事业
	 */
	@HttpService
	public List<Map<String, Object>> getPublicUtilities(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.onlineInformationService.getPublicUtilities(model);
		
	}
	/**
	 * 获取公安局数据
	 * @param model
	 * @return
	 */
	@HttpService
	public JSONObject getGajDataInfo(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.onlineInformationService.getGajDataInfo(model);		
	}
	/**
	 * 获取计生委数据
	 * @param model
	 * @return
	 */
	@HttpService
	public JSONObject getJswDataInfo(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");		
		return this.onlineInformationService.getJswDataInfo(model);
		
	}
	
	/*
	 * 获取税务局纳税信息数据
	 */
	@HttpService
	public List<Map<String, Object>> getNsInfo(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");

		return this.onlineInformationService.getNsInfo(model);
		
		
	}
	
	
	/*------------------------------------------------------------------------------------*/
	/*以下为常熟开发*/
	
	/**
	 * 获取组织机构代码数据
	 * @param model
	 * @return
	 */
	@HttpService
	public ZzjgdmBean getZzjgdmDataInfo(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");		
		return this.onlineInformationService.getZzjgdmDataInfo(model);
		
	}
	/**
	 * 获取学校信息数据
	 * @param model
	 * @return
	 */
	@HttpService
	public List<Map<String,Object>> getSchoolDataInfo(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");		
		return this.onlineInformationService.getSchoolDataInfo(model);
		
	}
	/*
	 * 获取人员参保信息数据
	 */
	@HttpService
	public List<Map<String, Object>> getRycbInfo(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.onlineInformationService.getRycbInfo(model);
		
	}
	/*
	 * 获取土地出让信息数据
	 */
	@HttpService
	public List<Map<String, Object>> getTdcrInfo(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.onlineInformationService.getTdcrInfo(model);
		
	}
	/*
	 * 获取税务信息数据
	 */
	@HttpService
	public SwInfoBean getSwInfo(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");

		return this.onlineInformationService.getSwInfo(model);
		
		
	}
	/*
	 * 获取低保信息数据
	 */
	@HttpService
	public DbInfoBean getDbInfo(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		
		return this.onlineInformationService.getDbInfo(model);
		
	}
	
	/*
	 * 提交机动车出入口许可
	 */
	@HttpService
	public void putJdccrkxkInfo(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		
		this.onlineInformationService.putJdccrkxkInfo(model);
		
	}


/*
 * 城市道路开挖许可信息
 */
@HttpService
public void putCsdlkwxkxxInfo(Model model) {
	DbContextHolder.setDefaultDbType("csdsc");
	
	this.onlineInformationService.putCsdlkwxkxxInfo(model);
	
}

/*
 * 店面招牌/户外广告设置信息
 */
@HttpService
public void putHwggszxxInfo(Model model) {
	DbContextHolder.setDefaultDbType("csdsc");
	
	this.onlineInformationService.putHwggszxxInfo(model);
	
}


/*
 * 施工占用城市道路许可信息
 */
@HttpService
public void putSgzycsdlxkxxInfo(Model model) {
	DbContextHolder.setDefaultDbType("csdsc");
	
	this.onlineInformationService.putSgzycsdlxkxxInfo(model);
	
}


/*
 * 经营性占用城市道路许可信息
 */
@HttpService
public void putJyxzycsdlxkxxInfo(Model model) {
	DbContextHolder.setDefaultDbType("csdsc");
	
	this.onlineInformationService.putJyxzycsdlxkxxInfo(model);
	
}

/**
 * 获取教育信息数据
 * @param model
 * @return
 */
@HttpService
public RyxxBean getJyxx(Model model) {
	DbContextHolder.setDefaultDbType("csdsc");
	return this.onlineInformationService.getJyxx(model);
}

/**
 * 获取工作经历数据
 * @param model
 * @return
 */
@HttpService
public RyxxBean getGzjl(Model model) {
	DbContextHolder.setDefaultDbType("csdsc");
	return this.onlineInformationService.getGzjl(model);
}


/**
 * 获取固定资产数据
 * @param model
 * @return
 */
@HttpService
public RyxxBean getGdzc(Model model) {
	DbContextHolder.setDefaultDbType("csdsc");
	return this.onlineInformationService.getGdzc(model);
}


/**
 * 获取资质证书数据
 * @param model
 * @return
 */
@HttpService
public RyxxBean getZzzs(Model model) {
	DbContextHolder.setDefaultDbType("csdsc");
	return this.onlineInformationService.getZzzs(model);
}

/**
 * 获取行政处罚数据
 * @param model
 * @return
 */
@HttpService
public RyxxBean getXzcf(Model model) {
	DbContextHolder.setDefaultDbType("csdsc");
	return this.onlineInformationService.getXzcf(model);
}


/**
 * 获取奖励信息数据
 * @param model
 * @return
 */
@HttpService
public RyxxBean getJlqk(Model model) {
	DbContextHolder.setDefaultDbType("csdsc");
	return this.onlineInformationService.getJlqk(model);
}

/**
 * 获取家庭关系数据
 * @param model
 * @return
 */
@HttpService
public RyxxBean getJtgx(Model model) {
	DbContextHolder.setDefaultDbType("csdsc");
	return this.onlineInformationService.getJtgx(model);
}

//--------------------------大理开发--------------------------
/*
 * 人口全文检索详细信息_关联信息
 * @author jiaoss
 */
@HttpService                  
public  List<Map<String,Object>>  getPopulationRelativeInfo(Model model){
	DbContextHolder.setDefaultDbType("csdsc");
	return this.onlineInformationService.getPopulationRelativeInfo(model);
}

/*
 * 人口全文检索的详细信息
 */
@HttpService 
public List<Map<String, String>> getPopulationDetail(Model model){
	DbContextHolder.setDefaultDbType("csdsc");
	return this.onlineInformationService.getPopulationDetail(model);
}

    /*
 * 人口全文检索的详细信息
 */
    @HttpService
    public List<Map<String, Object>> getRKTPQueryType(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getRKTPQueryType(model);
    }

    /*
    * 低保核查
    */
    @HttpService
    public List<Map<String, Object>> getDBHC(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getDBHC(model);
    }

    /*
  * 低保核查_导出
  */
    @HttpService
    public Map<String,Object> getDBHC_Export(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
       return this.onlineInformationService.getDBHC_Export(model);
    }

    /*
    *旅游分析_入住率分析
    */
    @HttpService
    public List<Map<String,Object>> getRZLFX(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getRZLFX(model);
    }

    /*
   *旅游分析_入住率分析
   */
    @HttpService
    public Map<String,Object> getRZLFX_EXPORT(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getRZLFX_EXPORT(model);
    }

    /*
    * 旅游分析_客源分析
    */
    @HttpService
    public Map<String,Object> getKYTJ(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getKYTJ(model);
    }

    /*
    * 客源分析_年龄性别
    */
    @HttpService
    public Map<String,Object> getKYFX_NLXB(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getKYFX_NLXB(model);
    }

    /*
  * 客源分析_省份人数统计
  */
    @HttpService
    public Map<String,Object> getKYFX_SFRS(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getKYFX_SFRS(model);
    }

    /*
     * 客栈分析
    */
    @HttpService
    public Map<String,Object> getKZFX(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getKZFX(model);
    }

    /*
   * 客栈分析_床位房间
  */
    @HttpService
    public Map<String,Object> getKZFX_tj(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getKZFX_tj(model);
    }

    /*
     * 客栈分析
    */
    @HttpService
    public Map<String,Object> getLYZF(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getLYZF(model);
    }



   /*
     * 车辆信息查询
    */
    @HttpService
    public Map<String,Object> getCLXXCX(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getCLXXCX(model);
    }
   /*
     * 案件审理
    */
    @HttpService
    public Map<String,Object> getAJSL(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getAJSL(model);
    }
   /*
     * 信息核实
    */
    @HttpService
    public Map<String,Object> getXXHS(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getXXHS(model);
    }
   /*
     * 就业核查
    */
    @HttpService
    public Map<String,Object> getJYHC(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getJYHC(model);
    }
   /*
     * 医疗分析
    */
    @HttpService
    public Map<String,Object> getYLFX(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getYLFX(model);
    }
   /*
     * 退伍安置
    */
    @HttpService
    public Map<String,Object> getTWAZ(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getTWAZ(model);
    }
   /*
     * 惠农补贴
    */
    @HttpService
    public Map<String,Object> getHNBT(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getHNBT(model);
    }
   /*
     * 少数民族少儿入园率
    */
    @HttpService
    public Map<String,Object> getSSMZYERYL(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getSSMZYERYL(model);
    }
   /*
     * 宗教教职人员
    */
    @HttpService
    public Map<String,Object> getZJJZRYXX(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getZJJZRYXX(model);
    }
   /*
     * 宗教社团监管
    */
    @HttpService
    public Map<String,Object> getZJSTJG(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getZJSTJG(model);
    }
   /*
     * 特少民族学生管理
    */
    @HttpService
    public Map<String,Object> getTSMZXSGL(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getTSMZXSGL(model);
    }

    /*
   * 特少民族学生管理
  */
    @HttpService
    public Map<String,Object> getTSMZXSGLDetail(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getTSMZXSGLDetail(model);
    }
   /*
     * 流动少数名族管理
    */
    @HttpService
    public Map<String,Object> getLDSSMZGL(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getLDSSMZGL(model);
    }
   /*
     * 少数名族分析
    */
    @HttpService
    public Map<String,Object> getSSMZFX(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getSSMZFX(model);
    }
    /*
       * 流动少数名族分析
      */
    @HttpService
    public Map<String,Object> getLDSSMZFX(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getLDSSMZFX(model);
    }
   /*
     * 招商监管
    */
    @HttpService
    public Map<String,Object> getzsjg(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getzsjg(model);
    }
   /*
     * 教职人员监管
    */
    @HttpService
    public Map<String,Object> getJZRYJG(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getJZRYJG(model);
    }
   /*
     * 空编人员详细信息
    */
    @HttpService
    public Map<String,Object> getKBRYXXXX(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getKBRYXXXX(model);
    }
   /*
     * 处罚详细信息
    */
    @HttpService
    public Map<String,Object> getJZRYJGItem(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getJZRYJGItem(model);
    }
   /*
     * 环评信息查询
    */
    @HttpService
    public Map<String,Object> getHPXXItem(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getHPXXCXItem(model);
    }

    /*
    * 环评信息查询
   */
    @HttpService
    public Map<String,Object> getHPXXCX(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getHPXXCX(model);
    }
   /*
     * 食品安全宣传
    */
    @HttpService
    public Map<String,Object> getSPAQXC(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.getSPAQXC(model);
    }

    /*
    * 添加应用统计查询次数
   */
    @HttpService
    public Map<String,Object> addApplictionTimes(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.addApplictionTimes(model);
    }

    //添加ftp文件上传日志
    @HttpService
    public Map<String,Object> addFtpUploadFileLog(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return this.onlineInformationService.addFtpUploadFile(model);
    }

	/*
	 * 查询应用描述信息
	 */
	@HttpService
	public Map<String,Object> getApplictionInfo(Model model){
		DbContextHolder.setDefaultDbType("csdsc");
		return this.onlineInformationService.getApplictionInfo(model);
	}

}
