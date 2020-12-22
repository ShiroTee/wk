package com.jeecms.common;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletResponse;


import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFClientAnchor;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFPatriarch;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRichTextString;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;



/**
 * POI导出报表的工具类
 * 
 * @author
 * 
 */
public class ExportExcelUtil
{

	private XSSFWorkbook wb = null;
	private XSSFSheet sheet = null;
	// 记录Excel表格的总列数
	private Integer colNumber = 0;

	/**
	 * @param wb
	 * @param sheet
	 */
	public ExportExcelUtil(XSSFWorkbook wb, XSSFSheet sheet, Integer colNumber)
	{
		super();
		this.wb = wb;
		this.sheet = sheet;
		this.colNumber = colNumber;
	}

	/**
	 * @return the sheet
	 */
	public XSSFSheet getSheet()
	{
		return sheet;
	}

	/**
	 * @param sheet
	 *            the sheet to set
	 */
	public void setSheet(XSSFSheet sheet)
	{
		this.sheet = sheet;
	}

	/**
	 * @return the wb
	 */
	public XSSFWorkbook getWb()
	{
		return wb;
	}

	/**
	 * @param wb
	 *            the wb to set
	 */
	public void setWb(XSSFWorkbook wb)
	{
		this.wb = wb;
	}

	
	/**
	 * 根据List<Map<String, Object>>格式数据导出Excel
	 * @param params:Excel列标题
	 * @param mapping:与标题列相映射的mapList键
	 * @param maplist元数据
	 * @return
	 * 前端调用方法：window.location.href = expUrlHandler;
	 */
	public static HSSFWorkbook exportForExcel(String[] columnTitle, String[] mapping,
			List<Map<String, Object>> mapList)
	{
		HSSFWorkbook hssfwb = new HSSFWorkbook();
		if (mapList != null)
		{
			HSSFSheet aSheet = hssfwb.createSheet();
			// 记录行和列
			HSSFRow rowCH = null;
			// 标题
			rowCH = aSheet.createRow(0);
			HSSFCell cell = null;
			for (int it = 0; it < columnTitle.length; it++)
			{
				cell = rowCH.createCell(it);
				cell.setCellType(XSSFCell.CELL_TYPE_STRING);
				cell.setCellValue(new HSSFRichTextString(columnTitle[it]));
				addSyteml(hssfwb, cell);
			}
			int i = 0;
			String valueName = "";
			for (Map<String, Object> map : mapList)
			{
				i++;
				aSheet.autoSizeColumn(i);	//自动列宽
				rowCH = aSheet.createRow(i);
				int k = 0;
				for(String keyName : mapping){
					cell = rowCH.createCell(k++);
					cell.setCellType(XSSFCell.CELL_TYPE_STRING);
				    valueName = StringUtils.objToString(map.get(keyName));
                    cell.setCellValue(new HSSFRichTextString(valueName));
					//addSyteml(hssfwb, cell);
				}
			}
		}
		return hssfwb;
	}
	
	/**
	 * 设置动态数据的样式
	 * 
	 */
	private static void addSyteml(HSSFWorkbook workbook, HSSFCell cell_temp)
	{
		HSSFCellStyle cloneStyle = workbook.createCellStyle();
		HSSFFont f  = workbook.createFont();      
		f.setFontHeightInPoints((short) 11);// 字号   
		f.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL);// 加粗   
		f.setFontName("黑体"); //字体 
		cloneStyle.setFont(f);
		cloneStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
//		cloneStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("yy-m-d"));
//		cloneStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
//		cloneStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
//		cloneStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
//		cloneStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
		cell_temp.setCellStyle(cloneStyle);
	}
}
