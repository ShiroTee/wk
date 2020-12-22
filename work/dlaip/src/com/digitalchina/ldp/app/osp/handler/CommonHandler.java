package com.digitalchina.ldp.app.osp.handler;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.handler.AbstractHandler;

@Component
public class CommonHandler extends AbstractHandler {

	/**
	 * 文件上传
	 * */
	@HttpService
	public void uploadFile(){
		
	}
	
	/**
	 * 文件下载 
	 */
	@HttpService
	public void downloadFile(){
		
	}
}
