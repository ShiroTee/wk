package com.jeecms.core.dao.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.jeecms.core.dao.BaseDaoSupport;


@Component
public class BaseDaoSupportImpl implements BaseDaoSupport
{
	
	@Autowired
	private JdbcTemplate simpleJdbcTemplate;
	
	
	public JdbcTemplate getSimpleJdbcTemplate()
	{
		
		return simpleJdbcTemplate;
	}
	
	
}
