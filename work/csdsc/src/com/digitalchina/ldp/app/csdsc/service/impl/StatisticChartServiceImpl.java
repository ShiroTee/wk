package com.digitalchina.ldp.app.csdsc.service.impl;

import com.digitalchina.ldp.app.csdsc.comm.Pager;
import com.digitalchina.ldp.app.csdsc.comm.StringUtils;
import com.digitalchina.ldp.app.csdsc.dao.StatisticChartDao;
import com.digitalchina.ldp.app.csdsc.service.StatisticChartService;
import com.digitalchina.ldp.bean.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StatisticChartServiceImpl implements StatisticChartService {

	@Autowired
	private StatisticChartDao statisticChartDao;

	private final String imagePrefixUrl =  "image:///r/cms/Images/rktp/";

	@Override
	public Pager getIndexChartsCatogary(Model model) {
		return this.statisticChartDao.getIndexChartsCatogary(null, "1", "10");
	}

	@Override
	public List<Map<String, Object>> getRktjCount(String starDate, String stopDate) {
		return this.statisticChartDao.getRktjCount(starDate, stopDate);
	}

	@Override
	public List<Map<String, Object>> getFrxxCount(String xzqh) {
		return this.statisticChartDao.getFrxxCount(xzqh);
	}

	@Override
	public List<Map<String, Object>> getShxfpCount() {
		return this.statisticChartDao.getHgjjCount();
	}

	@Override
	public List<Map<String, Object>> getJjsjCount(String zblx, String zbnd) {
		return this.statisticChartDao.getHgjjCount(zblx, zbnd);
	}

	@Override
	public List<Map<String, Object>> getJjsjCount(String zblx) {
		return this.statisticChartDao.getHgjjCount(zblx);
	}

	@Override
	public List<Map<String, Object>> getJjsjCountGroupbyYear(String zblx) {
		return this.statisticChartDao.getJjsjCountGroupbyYear(zblx);
	}

	/*
	 * @Override public List<Map<String, Object>> getRjsrzcCount() {
	 * StringBuilder sql = new StringBuilder(); sql.append(
	 * "WHERE ZBQC LIKE '%人均%' "); return
	 * this.statisticChartDao.getRjsrzcCount(sql.toString()); }
	 */

	@Override
	public List<Map<String, Object>> getRjsrzcCount() {
		return this.statisticChartDao.getRjsrzcCount();
	}

	@Override
	public List<Map<String, Object>> getXzqh() {
		return this.statisticChartDao.getXzqh();
	}

	@Override
	public List<Map<String, Object>> getZbnd() {
		return this.statisticChartDao.getZbnd();
	}

	@Override
	public List<Map<String, Object>> getLknd() {
		return this.statisticChartDao.getLknd();
	}

	@Override
	public List<Map<String, Object>> getRknltj() {
		// TODO Auto-generated method stub
		return this.statisticChartDao.getRknltjCount();
	}

	@Override
	public List<Map<String, Object>> getRkqrqc() {
		return this.statisticChartDao.getRkqrqc();
	}

	@Override
	public List<Map<String, Object>> getSletzxs() {
		return this.statisticChartDao.getSletzxs();
	}

	@Override
	public List<Object> getRelation(Model model) {
		 List<Object> lo = new ArrayList<Object>();

		String queryType = model.getValueNotEmpty("type");//查询类别
		String queryValue = model.getValueNotEmpty("value");//字段的值
		Map<String,Object> configInfo = this.statisticChartDao.getRKTPType(queryType);
		String image =imagePrefixUrl+ StringUtils.objToString(configInfo.get("IMAGE"));
		String query_field_name = StringUtils.objToString(configInfo.get("QUERY_FIELD_NAME"));

		//查询条件的信息
		Map<String, Object> centerinfo = new HashMap<String, Object>();
		centerinfo.put("name",query_field_name);
		centerinfo.put("value",queryValue);
		lo.add(centerinfo);

        //查询字段类型存在的表的配置信息
		List<Map<String,Object>> configs = this.statisticChartDao.getRKTPConfig(queryType);
        //配置个数
        int size = configs.size();
        if(size>0){
            Map<String, Object> datas = this.statisticChartDao.getRelation(configs,queryType,queryValue);
            // 节点信息集合
            List<Map<String, Object>> lNodes = new ArrayList<Map<String, Object>>();
            List<Map<String, Object>> lLinks = new ArrayList<Map<String, Object>>();

			//添加主节点
            Map<String, Object> Node = new HashMap<String, Object>();
            Node.put("category", 50);
            Node.put("name", query_field_name);
            Node.put("value", 50);
            Node.put("query_type", queryType);
            Node.put("query_value", queryValue);
            Node.put("symbol", image);
            Node.put("itemStyle", getItemStyle());
            lNodes.add(Node);

            for (Map<String, Object> config : configs) {
                String table_name = StringUtils.objToString(config.get("TABLE_NAME"));
                String table_desc =   StringUtils.objToString(config.get("TABLE_DESC"));
                String subject_image = imagePrefixUrl+  StringUtils.objToString(config.get("SUBJECT_IMAGE"));
				List<Map<String, Object>> data = (List<Map<String, Object>>) datas.get(table_name);
                int sum = data.size();//获得查询数据的条数
                if (sum > 0) {
					for (int i = 0; i < sum; i++) {
						Map<String, Object> dNodes = new HashMap<String, Object>();
						Map<String,Object> map = data.get(i);
						String value = map.get("VALUE").toString();
						dNodes.put("category", map.get("CATEGORY").toString());
						dNodes.put("name", map.get("NAME").toString());
						dNodes.put("table_name", table_name);
                        dNodes.put("table_desc", table_desc);
						dNodes.put("query_type", queryType);
						dNodes.put("query_value", queryValue);
						dNodes.put("uuid", map.get("UUID").toString());
						dNodes.put("value", value);
						dNodes.put("symbol", subject_image);
						dNodes.put("itemStyle", getItemStyle());
						lNodes.add(dNodes);

						Map<String, Object> links = new HashMap<String, Object>();
						links.put("source", map.get("NAME").toString());
						links.put("target", query_field_name);
						links.put("weight", value);
						links.put("name", map.get("RELATION").toString());
						lLinks.add(links);
					}
				}
            }
			lo.add(lLinks);
			lo.add(lNodes);
        }
	    return lo;
	}

    /*
     *点击节点的数据查询
     */
    @Override
    public Map<String,Object> getRelationExpand(Model model) {
        Map<String, Object> result = new HashMap<String, Object>();

        //参数组装
        String father_table_name = model.getValueNotEmpty("tablename");
        String firstQueryType = model.getValueNotEmpty("firsttype");//查询类别
        String firstQueryValue = model.getValueNotEmpty("firstvalue");//字段的值
        String queryValue = model.getValueNotEmpty("value");//数据查询字段

        //查询节点的详细信息
        Map<String, Object> table = this.statisticChartDao.getRKTPTableConfig(father_table_name,firstQueryType);
        List<Object> Detail = this.statisticChartDao.getPopulationMap(table, queryValue);
        result.put("detail",Detail);

        //查询出相关表信息
        List<Map<String,Object>> configs = this.statisticChartDao.getRKTPByFatherTableConfig(father_table_name,firstQueryType);
        //关联表的个数
        int size = configs.size();
        if(size>0){
            List<Object>  subjects = new ArrayList<Object>();
            // 节点信息集合
            for (Map<String, Object> config : configs) {

                String table_name =   StringUtils.objToString(config.get("TABLE_NAME"));
                String table_desc =   StringUtils.objToString(config.get("TABLE_DESC"));
                String father_link_field =   StringUtils.objToString(config.get("FATHER_LINK_FIELD"));
                String image =  imagePrefixUrl+ StringUtils.objToString(config.get("SUBJECT_IMAGE"));
                String value = firstQueryValue;
                if(father_link_field.split(",").length>1){
                    value=queryValue;
                }
                List<Object> data =  this.statisticChartDao.getPopulationMap(config, value);
				if(data !=null && data.size()>=2) {
					List<Map<String, Object>> lines = (List<Map<String, Object>>) data.get(0);
					int sum = lines.size();//获得查询数据的条数
					if (sum > 0) {
						Map<String, String> subject = new HashMap<String, String>();
						subject.put("table_name", table_name);
						subject.put("table_desc", table_desc);
						subject.put("queryvalue", queryValue);
                        subject.put("suject_image", image);
						subjects.add(subject);
					}
				}
            }
            result.put("subject",subjects);
        }
        return result;
    }

	public Map<String, Object> getItemStyle() {
		Map<String, String> mss1 = new HashMap<String, String>();
		mss1.put("color", "black");
		Map<String, Object> mso2 = new HashMap<String, Object>();
		mso2.put("position", "right");
		mso2.put("textStyle", mss1);
		Map<String, Object> mso3 = new HashMap<String, Object>();
		mso3.put("label", mso2);
		Map<String, Object> mso4 = new HashMap<String, Object>();
		mso4.put("normal", mso3);
		return mso4;
	}

	@Override
	public List<Map<String, Object>> getQyfbxx(String ys, String nf) {
		return this.statisticChartDao.getQyfbxx(ys, nf);
	}

	@Override
	public List<Map<String, Object>> getqyfbxxnd() {
		return this.statisticChartDao.getqyfbxxnd();
	}

	@Override
	public List<Map<String, Object>> getqyfbdl() {
		return this.statisticChartDao.getqyfbdl();
	}

	@Override
	public List<Map<String, Object>> getlkzdlgxx(Model model) {
		String type = model.getValueNotEmpty("type");
		String xzqh = model.getValueNotEmpty("xzqh");
		String start = model.getValueNotEmpty("start");
		String end = model.getValueNotEmpty("end");
		return this.statisticChartDao.getlkzdlgxx(type, xzqh, start, end);
	}

	@Override
	public List<Object> getPopulationMap(Model model) {
        List<Object> result = new ArrayList<Object>();
		// 查询人基础信息
		String value = model.getValueNotEmpty("value");
        String firstValue =  model.getValueNotEmpty("firstValue");
		String table_name = model.getValueNotEmpty("tablename");
        String father_table = model.getValueNotEmpty("fathertable");
        String firstType =  model.getValueNotEmpty("firstType");

		Map<String, Object> config = this.statisticChartDao.getRKTPTableLinkConfig(table_name,father_table,firstType);
        if(!config.isEmpty()){
            String father_link_field =   StringUtils.objToString(config.get("FATHER_LINK_FIELD"));
            String queryvalue = firstValue;
            if(father_link_field.split(",").length>1){
                queryvalue=value;
            }
            result = this.statisticChartDao.getPopulationMap(config, queryvalue);
        }
		
		return result;
	}
}
