package com.digitalchina.decodeServer;


import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import com.digitalchina.common.util.FileUtil;
import com.digitalchina.common.util.StringUtil;
import com.digitalchina.decodeServer.util.ServerPropertiesUtil;
import org.apache.log4j.*;


/**
* 类描述：服务扫描程序   //1、扫描原始文件、2、解密原始文件，放到解密后的文件夹中、3、将原始文件放到历史文件夹中，删除原始文件
* 创建人： luo
* 创建时间：2014-7-10
* @version    
*/

public class encodeJob implements Job { 
	
	Logger log4j = Logger.getLogger(encodeJob.class); 

    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException { 
       
    	  String sourceFolder=ServerPropertiesUtil.getValueBykey("sourceFolder");   //解密源文件夹
    	  String historyFolder=ServerPropertiesUtil.getValueBykey("historyFolder"); //保存历史文件夹
    	  String resultsFolder=ServerPropertiesUtil.getValueBykey("resultsFolder"); //解密后文件夹
    	  if(StringUtil.isEmpty(sourceFolder)||StringUtil.isEmpty(historyFolder)||StringUtil.isEmpty(resultsFolder))
    	  {
    		  log4j.error("解密源文件夹、保存历史文件夹或解密后文件夹配置错误"); 
    	  }else
    	  {
    		  try {
				FileUtil.encodeAllFile(sourceFolder, resultsFolder,historyFolder);
			} catch (Exception e) {
				
				e.printStackTrace();
			}
    	  }
    } 
} 