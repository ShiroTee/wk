package com.digitalchina.ldp.app.csdsc.dao.impl;

import com.digitalchina.ldp.app.csdsc.bean.CategoryRelationBean;
import com.digitalchina.ldp.app.csdsc.bean.StatCategory;
import com.digitalchina.ldp.app.csdsc.dao.StatisticsTaskDao;
import com.digitalchina.ldp.dao.BaseDao;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Component
public class StatisticsTaskDaoImpl extends BaseDao implements StatisticsTaskDao {
    @Override
    public int addCategoryResult(StatCategory statCategory) {
        String sql = "UPDATE STAT_CATEGORY_TJFX set CURRENT_MONTH_COUNT=?,TOTAL_COUNT=?,ZXQZ_CURRENT_MONTH_COUNT=?,ZXQZ_TOTAL_COUNT=? " +
                " where CONF_ID=?";

        return this.createJdbcTemplate().update(sql, statCategory.toArray());
    }

    @Override
   public int addSubmitDataCountByTimeResult(Map<String,String> map){
        StringBuilder sql1=new StringBuilder();
        StringBuilder sqlParameter=new StringBuilder();
        sql1.append("insert into sjcg_sjtjpm (");
        sqlParameter.append(") values (");
        int i=0;
        for (String key : map.keySet()) {
            if(i==0){
                sql1.append(key);
                sqlParameter.append("'" + map.get(key) + "'");
            }else {
                sql1.append("," + key);
                sqlParameter.append(",'" + map.get(key) + "'");
            }
           i=i+1;
        }

        String sql = sql1.toString() + sqlParameter.toString() + ")";

        return this.createJdbcTemplate().update(sql);
    }


    @Override
    public List<CategoryRelationBean> findRelation() {
        String sql = "SELECT * FROM CONFIG_CATEGORY_RELATION_TJFX";
        return this.createSqlQuery(CategoryRelationBean.class, sql).list();
    }

    @Override
    public Object getSqlResult(String sql) {
        List<Map<String, Object>> maps = this.createJdbcTemplate().queryForList(sql);
        if(maps.size()>0){
			return maps.get(0).values().toArray()[0];
		}else{
			return 0;
		}
    }
}