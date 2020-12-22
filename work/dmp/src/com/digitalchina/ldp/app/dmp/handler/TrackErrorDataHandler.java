package com.digitalchina.ldp.app.dmp.handler;

import java.io.IOException;
import java.io.OutputStream;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.CellRangeAddress;
import org.apache.poi.hssf.util.HSSFColor;
import org.jbpm.pvm.internal.query.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dmp.bean.DataConfigBean;
import com.digitalchina.ldp.app.dmp.bean.OlapDataReportBean;
import com.digitalchina.ldp.app.dmp.bean.WBJTableBean;
import com.digitalchina.ldp.app.dmp.bean.vo.ErrorDataBean;
import com.digitalchina.ldp.app.dmp.common.CommonDataUtil;
import com.digitalchina.ldp.app.dmp.service.DataConfigService;
import com.digitalchina.ldp.app.dmp.service.TrackErrorDataService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.constant.Constant;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.DbContextHolder;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;

@Component
public class TrackErrorDataHandler extends AbstractExtHandler {

    @Autowired
    private TrackErrorDataService trackErrorDataService;

    @Autowired
    private DataConfigService     dataConfigService;

    
    
    
    public List<WBJTableBean> find(Class cla,String fieldName,Object value)
	{
		return trackErrorDataService.find(WBJTableBean.class,fieldName,value);
	}
	
	
	public List<WBJTableBean> find(Class cla,Map<String,Object> fieldsAndValeMap)
	{
		
		return trackErrorDataService.find(WBJTableBean.class,fieldsAndValeMap);
	}
	
	public  List<WBJTableBean> find(Class cla)
	{
		
		return trackErrorDataService.find(WBJTableBean.class);
	}
	
	
	public Map<String, Object> queryExceptionTableCount(String tableName,String startTime,String endTime)
	{
		//切换成lds数据源
		//DbContextHolder.setDbType((Constant.DATE_SOURCE_KEY.lzyc).toString());
		
		return trackErrorDataService.queryExceptionTableCount(tableName,startTime, endTime);
	}
	
	
	public List<Map<String, Object>> getExceptionTableInfo(String sql, int start, int pageSize)
	{
		//切换成lds数据源
		//DbContextHolder.setDbType((Constant.DATE_SOURCE_KEY.lzyc).toString());
		
		return this.trackErrorDataService.getExceptionTableInfo(sql.toString(),
				start, pageSize);
	}
	
	public List<Map<String, Object>> getExceptionTableInfo(Model argsMap,
			String param) {
    	//切换成lds数据源
		//DbContextHolder.setDbType((Constant.DATE_SOURCE_KEY.lzyc).toString());
		
    	return trackErrorDataService.getExceptionTableInfo(argsMap,param);
    }
    
    
    /**
     * 获取异常数据列表
     * 
     * @param argsMap
     * @return
     */
    public PageList<ErrorDataBean> getErrorDataList(Model argsMap) {
    	
    	int start = argsMap.getInt("start"), end = argsMap.getInt("limit");
		PageList<ErrorDataBean> pageList = new PageList<ErrorDataBean>();
		int count = 0;
		// 获取页面传入查询条件的值
		String wbjName = argsMap.getValue("wbjCode");
		String ruleType = argsMap.getValue("comboRuleName");
		if (!StringUtils.isEmpty(ruleType)) {
			ruleType = CommonDataUtil.getRuleFlag(ruleType);
		}

		String startTime = argsMap.getValue("startTime_date");
		String endTime = argsMap.getValue("endTime_date");

		// 重新组装返回的list
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		List<ErrorDataBean> list = new ArrayList<ErrorDataBean>();
		Map<String, Object> map = null;
		// 有条件查询
		if (!StringUtils.isEmpty(wbjName) || !StringUtils.isEmpty(ruleType)
				|| !StringUtils.isEmpty(startTime)
				|| !StringUtils.isEmpty(endTime)) {

			String tableName = argsMap.getValue("tableNameEn");
			Set<String> set = new java.util.HashSet<String>();

				List<WBJTableBean> wbjList = null;
				if (!StringUtils.isEmptyObj(tableName)) {
					Map<String, Object> contintMap = new HashMap<String, Object>();
					contintMap.put("WBJBm", wbjName);
					contintMap.put("tableNameEn", tableName);
					wbjList = find(WBJTableBean.class,
							contintMap);
					
					//切换成lds数据源
					//DbContextHolder.setDbType((Constant.DATE_SOURCE_KEY.dmp).toString());
					
				} else {
					wbjList = find(WBJTableBean.class,
							"WBJBm", wbjName);
					
					//切换成lds数据源
					//DbContextHolder.setDbType((Constant.DATE_SOURCE_KEY.dmp).toString());
				}
				for (int j = 0; j < wbjList.size(); j++) {
					ErrorDataBean bean = new ErrorDataBean();
					bean.setTableName(wbjList.get(j).getTableNameZh());
					if (StringUtils.isEmpty(startTime)
							&& StringUtils.isEmpty(endTime)) {
						SimpleDateFormat sdfTemp = new SimpleDateFormat(
								"yyyy-MM");
						bean.setStartTime(sdfTemp.format(new Date()) + "-01");
						bean.setEndTime(sdf.format(new Date()));
					} else {
						bean.setStartTime(startTime);
						bean.setEndTime(endTime);
					}
					bean.setWbjName(wbjList.get(j).getWBJJc());
					bean.setTableCode(wbjList.get(j).getExceptionBm());
					bean.setExceptionTableCode(wbjList.get(j).getTableNameEn());

					map = queryExceptionTableCount(wbjList
							.get(j).getExceptionBm(), startTime, endTime);
					if (!"0".equals(String.valueOf(map.get("COUNT")))) {
						bean.setErrorCount(String.valueOf(map.get("COUNT")));
						bean.setExceptionCount(String.valueOf(map
								.get("EXCECOUNT")));
						list.add(bean);
					}
				}
				
				//切换成lds数据源
				//DbContextHolder.setDbType((Constant.DATE_SOURCE_KEY.dmp).toString());
			
		} else {
			// 无条件查询
			List<WBJTableBean> currPageList = find(WBJTableBean.class);
			
			
			//切换成lds数据源
			//DbContextHolder.setDbType((Constant.DATE_SOURCE_KEY.dmp).toString());
			
			
			// 获取委办局表的list
			List<WBJTableBean> wbjTableList = currPageList;

			
			for (int i = 0; i < wbjTableList.size(); i++) {
				String tableName = wbjTableList.get(i).getExceptionBm();
				// String tableName = "RKW_RKJBB";
				
				map = queryExceptionTableCount(tableName,
						startTime, endTime);

				ErrorDataBean bean = new ErrorDataBean();
				bean.setWbjName(wbjTableList.get(i).getWBJJc());
				bean.setTableName(wbjTableList.get(i).getTableNameZh());
				bean.setTableCode(tableName);
				bean.setExceptionTableCode(wbjTableList.get(i).getTableNameEn());
				SimpleDateFormat sdfTemp = new SimpleDateFormat("yyyy-MM");
				bean.setStartTime(sdfTemp.format(new Date()) + "-01");
				bean.setEndTime(sdf.format(new Date()));
				if (!"0".equals(String.valueOf(map.get("COUNT")))) {
					bean.setErrorCount(String.valueOf(map.get("COUNT")));
					bean
							.setExceptionCount(String.valueOf(map
									.get("EXCECOUNT")));
					list.add(bean);
				}

			}
			
			//切换成lds数据源
			//DbContextHolder.setDbType((Constant.DATE_SOURCE_KEY.dmp).toString());
			
			count = list.size();
		}
		
		
		List<ErrorDataBean> returnList = new ArrayList<ErrorDataBean>();
		for (int i = start; i < end+start; i++) {
			if(i<list.size()){
				returnList.add(list.get(i));
			}
		}
		
		pageList.setList(returnList);
		pageList.setCount(count);
		return pageList;
    }
    
    
    

    /**
     * 获取异常表的详细信息
     * 
     * @param argsMap
     * @return
     */
    public PageList<Map<String, Object>> getExceptionTableInfo(Model argsMap) {
        
    	
        PageList<Map<String, Object>> pageList = new PageList<Map<String,Object>>();
        String tableName = argsMap.getValue("detailTableName");
        List<Map<String, Object>> list = getExceptionTableInfo(argsMap,
            "page");
        
        //切换成lds数据源
		//DbContextHolder.setDbType((Constant.DATE_SOURCE_KEY.dmp).toString());
		

        int count = argsMap.getInt("count");
        String tableCode = argsMap.getValue("tableCode");
        DataConfigBean configBean = new DataConfigBean();
        configBean.setTableNameValue(tableCode);
        List<DataConfigBean> dataConfigColumnByTablelist = dataConfigService
            .getColumnByTableCode(configBean);

        for (int i = 0; i < list.size(); i++) {
            Map<String, Object> map = list.get(i);
            if ("N".equals(map.get("DOFLAG"))) {
                map.put("DOFLAG", "否");
            } else {
                map.put("DOFLAG", "是");
            }
            map.put("INTIME", map.get("INTIME")==null?null:CommonDataUtil.format(map.get("INTIME")));
            if (!"null".equals(String.valueOf(map.get("DOTIME")))) {
                map.put("DOTIME", CommonDataUtil.format(map.get("DOTIME")));
            }
            for (int j = 0; j < dataConfigColumnByTablelist.size(); j++) {
                Object obj = map.get(dataConfigColumnByTablelist.get(j).getColumnNameValue());
                // 根据异常代码规则显示错误的字段进行特殊显示
                String exception_code = map.get("EXCEPITION_CODE").toString();
                if (!StringUtils.isEmptyObj(obj)
                    && exception_code.contains(dataConfigColumnByTablelist.get(j)
                        .getColumnNameValue())) {
                    map.put(dataConfigColumnByTablelist.get(j).getColumnNameValue(),
                        "<font color='red'>" + obj + "</font>");
                }
            }
            map.put("tableName", tableName);
        }
        pageList.setList(list);
        pageList.setCount(count);
        return pageList;
    }

    /**
     * 获取明细列表的columnName信息
     * 
     * @param argsMap
     * @return
     */
    public String getTableColumnInfo(Model argsMap) {
    	
        String tableName = argsMap.getValue("exceptionTableCode");
        List<DataConfigBean> dataConfigList = trackErrorDataService.getDataConfigTableColumn(
        		tableName, 1);

        StringBuffer columnCodeStr = new StringBuffer();
        StringBuffer columnNameStr = new StringBuffer();
        for (int i = 0; i < dataConfigList.size(); i++) {
            if (!columnNameStr.toString().contains(dataConfigList.get(i).getColumnName())) {
                columnNameStr.append("<font color=\"red\">"+dataConfigList.get(i).getColumnNameValue() + "(异常字段)</font>&");
                columnCodeStr.append(dataConfigList.get(i).getColumnNameValue() + "&");
            }
        }

        String resultColumnNameStr = "表名" + "&" + "异常数据错误标志" + "&" + columnNameStr.toString()
                                     + "异常原因" + "&" + "是否处理" + "&" + "处理日期" + "&" + "入异常库时间";
        String resultColumnIndexStr = "tableName" + "&" + "ID" + "&"
                                      + columnCodeStr.toString() + "EXCEPITION_INFO" + "&"
                                      + "DOFLAG" + "&" + "DOTIME" + "&" + "INTIME";

        String jsonStr = "{'columnModelName':'" + resultColumnNameStr + "','columnModelIndex':'"
                         + resultColumnIndexStr + "'}";
        return jsonStr;
    }
    
    

    /**
     * 将某张异常数据表导出EXCEL
     */
    public void exprotExcel(Model argsMap) {
        String tableCode = argsMap.getValue("tableCode");
        List<Map<String, Object>> reslutList = getExceptionTableInfo(argsMap,
            "all");
        HSSFWorkbook workBook = new HSSFWorkbook();
        // 拿到sheet
//        HSSFSheet sheet = workBook.createSheet("EXCEPTION_" + tableCode);
        
        
        HSSFSheet sheet = workBook.createSheet(tableCode);

//        List<Map<String, Object>> listCloumnName = trackErrorDataService
//            .getExceptionTableColumnComments(tableCode);
//        if (listCloumnName.isEmpty()) {
//            throw new ServiceException("没有找到相应的异常数据表，请联系管理员");
//        }

        Set<String> set = new TreeSet<String>();
//        for (int k = 0; k < listCloumnName.size(); k++) {
//            Map<String, Object> map = listCloumnName.get(k);
//            set.add(StringUtils.isEmptyObj(map.get("COLUMN_NAME")) ? "" : map.get("COLUMN_NAME")
//                .toString());
//        }

        HSSFRow row = sheet.createRow(0);
        
        /*如果没有中文的表头，就选择英文的表头*/
        //if(listCloumnName.isEmpty()){
            set = reslutList.get(0).keySet();
        //}
        
        Iterator iterator = set.iterator();
        int t = 0;
        while (iterator.hasNext()) {// 遍历
            HSSFCell cell = row.createCell(t);
            sheet.setColumnWidth(t, 8000);
            Object obj = iterator.next();
            
            //对异常库表的系统字段进行转义，原字段不用管
            String str = obj.toString();
            str = str.replaceAll("INTIME", "INTIME（入异常库时间）");
            str = str.replaceAll("DOTIME", "DOTIME（处理时间）");
            str = str.replaceAll("DOFLAG", "DOFLAG（处理标志）");
            str = str.replaceAll("EXCEPITION_INFO", "EXCEPITION_INFO（异常原因）");
            str = str.replaceAll("ID", "ID（异常标识）");
            str = str.replaceAll("RKSJ", "RKSJ（入库时间）");
            str = str.replaceAll("RN", "RN（编号）");
            
            //设置第一行的每个单元的列明
            cell.setCellValue(str);
            //然后添加到list,以后需要在list里取key
            t++;
        }
        
        
        // 设置单元格样式
        // HSSFCellStyle style = workBook.createCellStyle();

        Set<String> setColumnNameEn = reslutList.get(0).keySet();
        Iterator iteratorColumnEn = setColumnNameEn.iterator();
        List<Object> keyList = new ArrayList<Object>();
        while (iteratorColumnEn.hasNext()) {// 遍历
            Object obj = iteratorColumnEn.next();
            keyList.add(obj);
        }

        for (int j = 0; j < reslutList.size(); j++) {
            HSSFRow rowData = sheet.createRow(j + 1);
            int k = 0;
            Map<String, Object> valueMap = reslutList.get(j);
            for (int i = 0; i < keyList.size(); i++) {
                HSSFCell cell = rowData.createCell(k);
                //获取值放到每个对应的单元格中
                Object valueObj = valueMap.get(keyList.get(i));
                if (!StringUtils.isEmptyObj(valueObj)) {
                	String str = String.valueOf(valueObj.toString());
                	//转义
                	if("DOFLAG".equals(keyList.get(i).toString()))
                	{
                		str = str.replaceAll("N", "否");
                		str = str.replaceAll("Y", "是");
                	}
                    cell.setCellValue(str);
                } else {
                    cell.setCellValue("");
                }
                k++;
            }
        }

        // 通过Response把数据以Excel格式保存
        HttpServletResponse response = argsMap.getResponse();
        response.reset();
        OutputStream out = null;
        response.setContentType("application/msexcel;charset=UTF-8");
        try {
            //设置导出EXCEL的名字和编码格式
            response
                .addHeader("Content-Disposition", "attachment;filename=\""
                                                  + new String((tableCode + ".xls")
                                                      .getBytes("GBK"), "ISO8859_1") + "\"");
            out = response.getOutputStream();
            workBook.write(out);
            out.flush();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (out != null) {
                try {
                    out.close();
                } catch (IOException e) {
                    throw new ServiceException("到处文件流出错");
                }
            }
        }
    }

    /**
     * 获取数据报告列表
     * 
     * @param argsMap
     * @return
     */
    public PageList<OlapDataReportBean> getDataReportList(Model argsMap) {
        PageList<OlapDataReportBean> list = this.trackErrorDataService.getDataReportList(argsMap);
        return list;
    }

    /**
     * 导出数据质量报告
     * @throws ParseException 
     */
    public void exportReportExcel(Model argsMap) {
        String type = argsMap.getValue("type");
        List<OlapDataReportBean> reportBeanList = this.trackErrorDataService
            .getDataReportBeanList(argsMap);
        HSSFWorkbook workBook = new HSSFWorkbook();
        // 拿到sheet
        String excelName = "1".equals(type) ? "数据质量报告文件模式" : "数据质量报告数据库模式";
        HSSFSheet sheet = "1".equals(type) ? workBook.createSheet(excelName) : workBook
            .createSheet(excelName);

        // 创建第一行数据
        HSSFRow row = sheet.createRow(0);

        // 设置委办局名称相似单元格格式
        HSSFCellStyle style = workBook.createCellStyle(); // 样式对象
        style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 垂直
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 水平
        style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
        style.setFillForegroundColor(HSSFColor.YELLOW.index);

        style.setBorderBottom(HSSFCellStyle.BORDER_THIN); // 下边框
        style.setBorderLeft(HSSFCellStyle.BORDER_THIN);// 左边框
        style.setBorderTop(HSSFCellStyle.BORDER_THIN);// 上边框
        style.setBorderRight(HSSFCellStyle.BORDER_THIN);// 右边框

        String[] fileArrayName = { "解析文件（个）", "入中心前置库（条数）", "数据清洗（条数）", "数据转换（条数）", "数据对比（条数）", "数据加载（条数）" };
        String[] databaseArrayName = { "入中心前置库(条数)", "数据清洗(条数)", "数据转换(条数)", "数据对比(条数)", "数据加载(条数)" };
        String[] secondRow = { "总量", "失败", "成功率" };

        
        HSSFCell cell = row.createCell(0);
        cell.setCellValue("报告时间");
        cell.setCellStyle(style);
        sheet.setColumnWidth(0, 8000);
        // 设置向下合并单元格
        sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
        
        HSSFCell cell2 = row.createCell(1);
        cell2.setCellValue("委办局");
        cell2.setCellStyle(style);
        sheet.setColumnWidth(0, 8000);
        // 设置向下合并单元格
        sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));

        if ("1".equals(type)) {

            HSSFCell cell1 = row.createCell(2);
            cell1.setCellValue("交换文件个数（个）");
            cell1.setCellStyle(style);
            // 设置向下合并单元格
            sheet.setColumnWidth(0, 8000);
            //合并单元格，第一列两行
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            
          
          

            int k = 0;
            for (int i = 3; i < 21; i = i + 3) {
                HSSFCell cellrow0 = row.createCell(i);
                cellrow0.setCellValue(fileArrayName[k]);
                cellrow0.setCellStyle(style);
                sheet.addMergedRegion(new CellRangeAddress(0, 0, i, i + 2));
                sheet.setColumnWidth(1, 8000);
                k++;
            }

            HSSFRow row1 = sheet.createRow(1);
            HSSFCell cell1_2 = row1.createCell(3);
            cell1_2.setCellValue("总数");
            cell1_2.setCellStyle(style);

            HSSFCell cell1_3 = row1.createCell(4);
            cell1_3.setCellValue("格式有误");
            cell1_3.setCellStyle(style);

            HSSFCell cell1_4 = row1.createCell(5);
            cell1_4.setCellValue("成功率");
            cell1_4.setCellStyle(style);

            int j = 0;
            for (int i = 6; i < 21; i++) {
                HSSFCell celltemp = row1.createCell(i);
                celltemp.setCellValue(secondRow[j]);
                celltemp.setCellStyle(style);
                j++;
                j = j == 3 ? j = 0 : j;
            }
        } else {

            HSSFCell cell1 = row.createCell(2);
            cell1.setCellValue("前置库记录总数（条数）");
            cell1.setCellStyle(style);
            sheet.setColumnWidth(1, 8000);
            // 设置向下合并单元格
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));

            int k = 0;
            for (int i = 3; i < 18; i = i + 3) {
                HSSFCell cellrow0 = row.createCell(i);
                cellrow0.setCellValue(databaseArrayName[k]);
                cellrow0.setCellStyle(style);
                sheet.addMergedRegion(new CellRangeAddress(0, 0, i, i + 2));
                sheet.setColumnWidth(1, 8000);
                k++;
            }

            // 设置第二行数据
            HSSFRow row1 = sheet.createRow(1);
            int j = 0;
            for (int i = 3; i < 18; i++) {
                HSSFCell celltemp = row1.createCell(i);
                celltemp.setCellValue(secondRow[j]);
                celltemp.setCellStyle(style);
                j++;
                j = j == 2 ? j = 0 : j;
            }
        }

        //组装好每列的列头信息后，开始放入数据
        for (int n = 0; n < reportBeanList.size(); n++) {
            HSSFRow rowData = sheet.createRow(n + 2);
            // 获取得到reportBean
            OlapDataReportBean reportBean = reportBeanList.get(n);
            // 讲reportBean放到map里面
            Map<String, String> map = "1".equals(type) ? this.getReportBeanToMap(reportBean) : this
                .getReportDataBeanToMap(reportBean);
            int count = "1".equals(type) ? 21 : 18;
            for (int i = 0; i < count; i++) {
                // 创建数据的第N行的第几个单元格数据
                HSSFCell Cellrow = rowData.createCell(i);
                // 获取map里面对应Bean的值
                String valueObj = map.get(i + "");
                if (!StringUtils.isEmptyObj(valueObj)) {
                    Cellrow.setCellValue(String.valueOf(valueObj.toString()));
                } else {
                    Cellrow.setCellValue("");
                }
            }
        }

        // 通过Response把数据以Excel格式保存
        HttpServletResponse response = argsMap.getResponse();
        response.reset();
        response.setContentType("application/msexcel;charset=UTF-8");
        try {
            response.addHeader("Content-Disposition", "attachment;filename=\""
                                                      + new String((excelName + ".xls")
                                                          .getBytes("GBK"), "ISO8859_1") + "\"");
            OutputStream out = response.getOutputStream();
            workBook.write(out);
            out.flush();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 组装javabean的map
     * @param reportBean
     * @return
     * @throws ParseException 
     */
    private Map<String, String> getReportBeanToMap(OlapDataReportBean reportBean) {
        Map<String, String> map = new HashMap<String, String>();
        
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        
		map.put("0", sdf.format(reportBean.getReportTime()));
		
        map.put("1", reportBean.getWbjName());
        map.put("2", reportBean.getChangeFileCount());

        map.put("3", reportBean.getParseFileCount());
        map.put("4", reportBean.getParsefilefail());
        String reslut = this.getSuccessRates(reportBean.getParseFileCount(), reportBean
            .getParsefilefail());
        map.put("5", reslut);

        map.put("6", reportBean.getParseIncenterCount());
        map.put("7", reportBean.getParseIncenterFail());
        reslut = this.getSuccessRates(reportBean.getParseIncenterCount(), reportBean
            .getParseIncenterFail());
        map.put("8", reslut);

        map.put("9", reportBean.getDataCleanCount());
        map.put("10", reportBean.getDataCleanFail());
        reslut = this
            .getSuccessRates(reportBean.getDataCleanCount(), reportBean.getDataCleanFail());
        map.put("11", reslut);

        map.put("12", reportBean.getDataTranCount());
        map.put("13", reportBean.getDataTranFail());
        reslut = this.getSuccessRates(reportBean.getDataTranCount(), reportBean.getDataTranFail());
        map.put("14", reslut);

        map.put("15", reportBean.getDataCompCount());
        map.put("16", reportBean.getDataCompFail());
        reslut = this.getSuccessRates(reportBean.getDataCompCount(), reportBean.getDataCompFail());
        map.put("17", reslut);

        map.put("18", reportBean.getDataLoadCount());
        map.put("19", reportBean.getDataLoadFail());
        reslut = this.getSuccessRates(reportBean.getDataLoadCount(), reportBean.getDataLoadFail());
        map.put("20", reslut);

        return map;
    }

    /**
     * 组装数据库交换模式的map
     * @param reportBean
     * @return
     */
    private Map<String, String> getReportDataBeanToMap(OlapDataReportBean reportBean) {
        Map<String, String> map = new HashMap<String, String>();

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		map.put("0", sdf.format(reportBean.getReportTime()));
        map.put("1", reportBean.getWbjName());
        map.put("2", reportBean.getWbjPrefixdatabaseCount());

        map.put("3", reportBean.getParseIncenterCount());
        map.put("4", reportBean.getParseIncenterFail());
        String reslut = this.getSuccessRates(reportBean.getParseIncenterCount(), reportBean
            .getParseIncenterFail());
        map.put("5", reslut);

        map.put("6", reportBean.getDataCleanCount());
        map.put("7", reportBean.getDataCleanFail());
        reslut = this
            .getSuccessRates(reportBean.getDataCleanCount(), reportBean.getDataCleanFail());
        map.put("8", reslut);

        map.put("9", reportBean.getDataTranCount());
        map.put("10", reportBean.getDataTranFail());
        reslut = this.getSuccessRates(reportBean.getDataTranCount(), reportBean.getDataTranFail());
        map.put("11", reslut);

        map.put("12", reportBean.getDataCompCount());
        map.put("13", reportBean.getDataCompFail());
        reslut = this.getSuccessRates(reportBean.getDataCompCount(), reportBean.getDataCompFail());
        map.put("14", reslut);

        map.put("15", reportBean.getDataLoadCount());
        map.put("16", reportBean.getDataLoadFail());
        reslut = this.getSuccessRates(reportBean.getDataLoadCount(), reportBean.getDataLoadFail());
        map.put("17", reslut);

        return map;
    }

    /**
     * 计算成功率，保留四位小数
     * @param count
     * @param fail
     * @return
     */
    private String getSuccessRates(String count, String fail) {
        String resultDub = "";
        // 如果总数和失败数不为空，则算出成功率
        if (!StringUtils.isEmpty(count) && !StringUtils.isEmpty(fail)) {
            int countNum = Integer.valueOf(count);
            int failNum = Integer.valueOf(fail);
            float f = ((float) (countNum - failNum) / (float) countNum) * 100;
            // 保留四位小数
            DecimalFormat df = new DecimalFormat("0.00");//
            resultDub = df.format(f);
        }
        return resultDub + "%";
    }

}
