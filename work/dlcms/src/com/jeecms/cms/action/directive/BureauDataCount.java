package com.jeecms.cms.action.directive;

import static com.jeecms.common.web.freemarker.DirectiveUtils.OUT_LIST;
import static freemarker.template.ObjectWrapper.DEFAULT_WRAPPER;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONTokener;
import org.springframework.beans.factory.annotation.Autowired;

import com.jeecms.cms.Constants;
import com.jeecms.cms.entity.main.Bureau;
import com.jeecms.common.web.freemarker.DirectiveUtils;
import com.jeecms.common.web.springmvc.RealPathResolver;

import freemarker.core.Environment;
import freemarker.template.TemplateDirectiveBody;
import freemarker.template.TemplateDirectiveModel;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModel;

public class BureauDataCount implements TemplateDirectiveModel {

	public void execute(Environment env, Map params, TemplateModel[] loopVars,
			TemplateDirectiveBody body) throws TemplateException, IOException {
		InputStream in = null ;
		JSONArray bureauData = new JSONArray() ;
		try {
			in = new FileInputStream(realPathResolver.get(Constants.BUREAU_SUBMIT));
			JSONTokener jsonT = new JSONTokener(in) ;
			bureauData = new JSONArray(jsonT) ;
		} catch (FileNotFoundException e) {
			System.out.println("委办局数据文件未找到!");
		} catch (JSONException e){
			System.out.println("数据格式异常或者数据文件为空!");
			bureauData = new JSONArray() ;
		} finally {
			if(in != null){
				try {
					in.close() ;
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		List<Bureau> list = new ArrayList<Bureau>();
		for(int i = 0; i < bureauData.length(); i++){
			Bureau bureau = new Bureau() ;
			bureau.setName(bureauData.getJSONObject(i).getString("name")) ;
			bureau.setShould(bureauData.getJSONObject(i).getInt("should") + "") ;
			bureau.setActually(bureauData.getJSONObject(i).getInt("actually") + "") ;
			list.add(bureau) ;
		}
		Map<String, TemplateModel> paramWrap = new HashMap<String, TemplateModel>(
				params);
		paramWrap.put(OUT_LIST, DEFAULT_WRAPPER.wrap(list));
		Map<String, TemplateModel> origMap = DirectiveUtils
				.addParamsToVariable(env, paramWrap);
		body.render(env.getOut());
		DirectiveUtils.removeParamsFromVariable(env, paramWrap, origMap);
	}
	@Autowired
	private RealPathResolver realPathResolver;
}
