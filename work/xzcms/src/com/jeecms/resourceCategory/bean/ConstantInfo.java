package com.jeecms.resourceCategory.bean;

import java.util.ArrayList;
import java.util.List;

public class ConstantInfo {
	//低保人员
	public static final String name1="低保人员";
    public static final String params1[]={"姓名", "身份证号码", "性别", "出生年月", "住址"};
    public static final String keys1[]={"xm","sfzhm","xb","csny","zz"};
    //老龄人员
    public static final String name2="老龄人员";
    public static final String params2[]={"姓名","身份证号码","性别","出生年月","年龄"};
    public static final String keys2[]={"xm","sfzhm","xb","csny","nl"};
    //残疾人员
    public static final String name3="残疾人员";
    public static final String params3[]={"姓名","身份证号码","性别","残疾等级","残疾类型"};
    public static final String keys3[]={"xm","sfzhm","xb","cjdj","cjlx"};
    //死亡证明
    public static final String name4="死亡证明";
    public static final String params4[]={"姓名","身份证号码","性别","出生年月","死亡时间"};
    public static final String keys4[]={"xm","sfzhm","xb","csny","swsj"};
    //火化证明
    public static final String name5="火化证明";
    public static final String params5[]={"姓名","身份证号码","性别","出生年月","死亡时间","火化时间"};
    public static final String keys5[]={"xm","sfzhm","xb","csny","swsj","hhsj"};
    //亲属信息
    public static final String name6="亲属信息";
    public static final String params6[]={"姓名","身份证号码","性别","出生年月","亲属关系"};
    public static final String keys6[]={"xm","sfzhm","xb","csny","swsj","hhsj"};
    //常住人口
    public static final String name7="常住人口";
    public static final String params7[]={"人员编号","行政区划","民族","文化程度","婚姻状况","兵役状况","住址","注销标识","户号","户口类型","人员状态","迁入地","姓名","身份证号码","性别","出生日期"};
    public static final String keys7[]={"rybh","xzqh","mz","whcd","hyzk","byzk","zz","zxbs","hh","hklx","ryzt","qrd","xm","sfzhm","xb","csrq"};
    //暂住人口
    public static final String name8="暂住人口";
    public static final String params8[]={"人员编号","所属省市县（区）","曾用名","民族","文化程度","婚姻状况","兵役状况","户口所在地地址","注销标识","暂住证编号","户口类型","人员状态","暂住证签发日期","姓名","身份证号码","性别","出生日期","有效期限","注销日期","注销原因","到达时间","暂住地址"};
    public static final String keys8[]={"rybh","ssssxq","zym","mz","whcd","hyzk","byzk","hkszddz","zxbs","zzzbh","hklx","ryzt","zzzqfrq","xm","sfzhm","xb","csrq","yxqx","zxrq","zxyy","ddsj","zzdz"};
    //出生证明
    public static final String name9="出生证明";
    public static final String params9[]={"姓名","出生证编号","性别","出生日期"};
    public static final String keys9[]={"xm","cszbh","xb","csrq"};
    //法人企业登记信息
    public static final String name10="法人企业登记信息";
    public static final String params10[]={"行政区划名称","纳税人识别号","注册号","组织机构代码","统一信用代码","企业名称","法人代表/负责人","法人身份证号","住所","现注册资本（万元）","开业登记日期","登记机关","联系电话","许可经营项目","一般经营项目","备注"};
    public static final String keys10[]={"xzqhmc","nsrsbh","zch","zzjgdm","tyxydm","qymc","frdb","frsfzh","zs","xzczb","kydjrq","djjg","lxdh","xkjyxm","ybjyxm","bz"};
    //法人企业登记注销信息
    public static final String name11="法人企业登记注销信息";
    public static final String params11[]={"纳税人识别号","注册号","组织机构代码","统一信用代码","企业名称","法人代表/负责人","法人身份证号","住所","现注册资本（万元）","开业登记日期","注销核准日期","登记机关","联系电话","许可经营项目","一般经营项目","备注"};
    public static final String keys11[]={"nsrsbh","zch","zzjgdm","tyxydm","qymc","frdb","frsfzh","zs","xzczb","kydjrq","zxhzrq","djjg","lxdh","xkjyxm","ybjyxm","bz"};
    //犯罪记录
    public static final String name12="犯罪记录";
    public static final String params12[]={"姓名","犯罪记录","身份证号"};
    public static final String keys12[]={"xm","fzjl","sfzhm"};
    //就业岗位劳动信息
    public static final String name13="就业岗位劳动信息";
    public static final String params13[]={"姓名","性别","身份证号","就业单位","在岗情况"};
    public static final String keys13[]={"xm","xb","sfzhm","jydw","zgqk"};
    //单位基本信息
    public static final String name14="单位基本信息";
    public static final String params14[]={"单位名称","参保组织管理码","组织机构代码","统一信用代码","社会保险登记证编码","单位类型","单位状态","法定代表人姓名","法定代表人电话","地址","邮政编码","经济类型","隶属关系","行业代码","主管部门或主管机构","工商登记执照种类","工商登记执照号码","联系人","单位坐落区","人员规模","注册资金","产业类别","备注","经办日期","经办人","经办机构"};
    public static final String keys14[]={"dwmc","cbzzglm","zzjgdm","tyxydm","shbxdjzbm","dwlx","dwzt","fddbrxm","fddbrdh","dz","yzbm","jjlx","lsgx","hydm","zgbmhzgjg","gsdjzzzl","gsdjzzhm","lxr","dwzlq","rygm","zczj","cylb","bz","jbrq","jbr","jbjg"};
    //单位参保信息
    public static final String name15="单位参保信息";
    public static final String params15[]={"单位名称","参保组织管理码","组织机构代码","统一信用代码","社会保险登记证编码","单位类型","单位状态","法定代表人姓名","法定代表人电话","地址","邮政编码","经济类型","隶属关系","行业代码","主管部门或主管机构","工商登记执照种类","工商登记执照号码","联系人","单位坐落区","人员规模","注册资金","产业类别","备注","经办日期","经办人","经办机构","经办机构编码","险种类型","参保日期","缴费方式","开始年月","终止年月","单位参保状态"};
    public static final String keys15[]={"DWMC","CBZZGLM","ZZJGDM","TYXYDM","SHBXDJZBM","DWLX","DWZT","FDDBRXM","FDDBRDH","DZ","YZBM","JJLX","LSGX","HYDM","ZGBMHZGJG","GSDJZZZL","GSDJZZHM","LXR","DWZLQ","RYGM","ZCZJ","CYLB","BZ","JBRQ","JBR","JBJG","JBJGBM","XZLX","CBRQ","JFFS","KSNY","ZZNY","DWCBZT"};
    //人员基本信息
    public static final String name16="人员基本信息";
    public static final String params16[]={"公民身份号码","姓名","民族","性别","出生日期","办公电话","户口性质","就业状态","联系人姓名","婚姻状况","移动电话","就业失业登记证号码","文化程度","户籍地址名称","居住地址名称","所学专业","毕业学校","毕业时间","专业技术职务","职业（工种）资格名称","国家职业资格等级（工人技术等级）","经办日期","经办人","经办机构"};
    public static final String keys16[]={"sfzhm","xm","mz","xb","csrq","bgdh","hkxz","jyzt","lxrxm","hyzk","yddh","jysydjzhm","whcd","hjdzmc","jzdzmc","sxzy","byxx","bysj","zyjszw","zyzgmc","gjzyzgdj","jbrq","jbr","jbjg"};
    //人员参保信息
    public static final String name17="人员参保信息";
    public static final String params17[]={"公民身份号码","姓名","民族","性别","出生日期","办公电话","户口性质","就业状态","联系人姓名","婚姻状况","移动电话","就业失业登记证号码","文化程度","户籍地址名称","居住地址名称","所学专业","毕业学校","毕业时间","专业技术职务","职业（工种）资格名称","国家职业资格等级（工人技术等级）","经办日期","经办人","经办机构","经办机构编码","险种类型","参保日期","单位名称","个人缴费状态","参保终止日期","视同缴费月数","实际缴费月数","账户建立年月"};
    public static final String keys17[]={"SFZHM","XM","MZ","XB","CSRQ","BGDH","HKXZ","JYZT","LXRXM","HYZK","YDDH","JYSYDJZHM","WHCD","HJDZMC","JZDZMC","SXZY","BYXX","BYSJ","ZYJSZW","ZYZGMC","GJZYZGDJ","JBRQ","JBR","JBJG","JBJGBM","XZLX","CBRQ","DWMC","GRJFZT","CBZZRQ","STJFYS","SJJFYS","ZHJLNY"};
    //人员征缴明细
    public static final String name18="人员征缴明细";
    public static final String params18[]={"公民身份号码","姓名","民族","性别","出生日期","办公电话","户口性质","就业状态","联系人姓名","婚姻状况","移动电话","就业失业登记证号码","文化程度","户籍地址名称","居住地址名称","所学专业","毕业学校","毕业时间","专业技术职务","职业（工种）资格名称","国家职业资格等级（工人技术等级）","经办机构编码","险种类型","单位名称","参保身份","费款所属期","对应费款所属期","缴费类型","缴费标志","缴费人员类别","缴费方式","工资","单位缴费比例","单位应缴金额","单位实缴金额","缴纳滞纳金","人员缴费基数","个人缴费比例","个人应缴金额","个人实缴金额","核销标志","核销年月"};
    public static final String keys18[]={"SFZHM","XM","MZ","XB","CSRQ","BGDH","HKXZ","JYZT","LXRXM","HYZK","YDDH","JYSYDJZHM","WHCD","HJDZMC","JZDZMC","SXZY","BYXX","BYSJ","ZYJSZW","ZYZGMC","GJZYZGDJ","JBJGBM","XZLX","DWMC","CBSF","FKSSQ","DYFKSSQ","JFLX","JFBZ","JFRYLB","JFFS","GZ","DWJFBL","DWYJJE","DWSJJE","JNZNJ","RYJFJS","GRJFBL","GRYJJE","GRSJJE","HXBZ","HXNY"};
    //在职人员养老帐户
    public static final String name19="在职人员养老帐户";
    public static final String params19[]={"公民身份号码","姓名","民族","性别","出生日期","办公电话","户口性质","就业状态","联系人姓名","婚姻状况","移动电话","就业失业登记证号码","文化程度","户籍地址名称","居住地址名称","所学专业","毕业学校","毕业时间","专业技术职务","职业（工种）资格名称","国家职业资格等级（工人技术等级）","经办日期","经办人","经办机构","缴费类型","费款所属期","单位名称","基本养老保险个人缴费基数","基本养老保险个人缴费金额","个人缴费到帐日期","个人缴费部分的缴费标志","单位缴费到帐日期","单位缴费部分的缴费标志","应补缴个人跨年利息","应补缴个人本年利息","缴费人员类别","对应费款所属期","经办机构编号"};
    public static final String keys19[]={"SFZHM","XM","MZ","XB","CSRQ","BGDH","HKXZ","JYZT","LXRXM","HYZK","YDDH","JYSYDJZHM","WHCD","HJDZMC","JZDZMC","SXZY","BYXX","BYSJ","ZYJSZW","ZYZGMC","GJZYZGDJ","JBRQ","JBR","JBJG","JFLX","FKSSQ","DWMC","JBYLBXGRJFJS","JBYLBXGRJFJE","GRJFDZRQ","GRJFBFDJFBZ","DWJFDZRQ","DWJFBFDJFBZ","YBJGRKNLX","YBJGRBNLX","JFRYLB","DYFKSSQ","JBJGBH"};
    
    

}
