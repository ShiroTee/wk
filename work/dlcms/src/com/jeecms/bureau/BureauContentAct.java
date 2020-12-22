package com.jeecms.bureau;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONTokener;
import org.json.JSONWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jeecms.cms.Constants;
import com.jeecms.cms.entity.main.CmsSite;
import com.jeecms.cms.manager.main.ChannelMng;
import com.jeecms.cms.web.CmsUtils;
import com.jeecms.common.web.springmvc.RealPathResolver;

@Controller
public class BureauContentAct {
	private static final Logger log = LoggerFactory
			.getLogger(BureauContentAct.class);

	/**
	 * 从JSON文件中读取委办局提交数据详情
	 * @param request
	 * @param model
	 * @return
	 * @throws IOException
	 * @throws JSONException
	 */
	@RequestMapping(value = "/bureau/data_read.do")
	public String index(HttpServletRequest request, ModelMap model){
		CmsSite site = CmsUtils.getSite(request);
		model.addAttribute("site", site);
		InputStream in = null ;
		try {
			in = new FileInputStream(realPathResolver.get(Constants.BUREAU_SUBMIT));
			JSONTokener jsonT = new JSONTokener(in) ;
			JSONArray bureauData = new JSONArray(jsonT) ;
			model.addAttribute("bureauData", bureauData) ;
		} catch (FileNotFoundException e) {
			System.out.println("文件未找到!");
		} catch( JSONException e) {
			System.out.println("数据格式异常或者数据文件为空!--后台");
			return "bureau/index";
		} finally {
			if(in != null){
				try {
					in.close() ;
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		
//		List<Channel> topList = channelMng.getTopList(site.getId(), true);
//		List<Channel> channelList = Channel.getListForSelect(topList, null,
//				true);
//		model.addAttribute("channelList", channelList);
		return "bureau/index";
	}

	/**
	 * 将后面设置的数据保存在JSON文件中
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/bureau/data_save.do")
	public String save(String[] bureauNames, String[] bureauShoulds, String[] bureauActuallys, Integer cid, HttpServletRequest request, ModelMap model){
		CmsSite site = CmsUtils.getSite(request);
		model.addAttribute("site", site);
		OutputStreamWriter out = null ;
		try {
			out = new OutputStreamWriter(new FileOutputStream(realPathResolver.get(Constants.BUREAU_SUBMIT))) ;
			if(bureauNames == null){
				out.write("") ;
			}else{
				JSONWriter writer = new JSONWriter(out) ;
				writer.array() ;
				for(int i = 0; i < bureauNames.length; i++){
					writer.object() ;
					writer.key("name").value(bureauNames[i]) ;
					writer.key("should").value(bureauShoulds[i]) ;
					writer.key("actually").value(bureauActuallys[i]) ;
					writer.endObject() ;
				}
				writer.endArray() ;
			}
		} catch (IOException e) {
			e.printStackTrace();
			model.addAttribute("success", "false");
			return index(request, model);
		} finally {
			if(out != null){
				try {
					out.close() ;
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		model.addAttribute("success", "true");
		return index(request, model);
	}
	
//	private JSONArray readBureauJson() throws IOException,JSONException {
//		InputStream in = new FileInputStream(realPathResolver.get(Constants.BUREAU_SUBMIT));
//		JSONArray bureauData = new JSONArray(new JSONTokener(in)) ;
//		return bureauData ;
//	}

	@Autowired
	private ChannelMng channelMng;
	@Autowired
	private RealPathResolver realPathResolver;
}
