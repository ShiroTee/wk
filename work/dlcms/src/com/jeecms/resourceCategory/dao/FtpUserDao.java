package com.jeecms.resourceCategory.dao;

import java.util.List;
import java.util.Map;

public interface FtpUserDao {
	public List<Map<String,Object>> findByName(String Name);
}