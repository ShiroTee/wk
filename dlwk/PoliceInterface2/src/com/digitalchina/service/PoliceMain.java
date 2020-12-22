package com.digitalchina.service;

import com.digitalchina.util.StaticUtil;

public class PoliceMain {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		String method=StaticUtil.getExcuteMethod();
		if(!"".equals(method)){
			String[] methods = method.split(",");
			for(int i=0;i<methods.length;i++){
				String m=methods[i].toUpperCase();
				new GetData(m).start();
			}
		}
	}
}
