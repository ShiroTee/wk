package com.digitalchina.decodeServer;


import com.digitalchina.common.util.FileUtil;
import com.digitalchina.decodeServer.util.ServerPropertiesUtil;
import org.apache.log4j.Logger;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;


/**
* 类描述：服务扫描程序   //1、扫描原始文件、2、解密原始文件，放到解密后的文件夹中、3、将原始文件放到历史文件夹中，删除原始文件
* 创建人： luo
* 创建时间：2014-7-10
* @version    
*/

public class decodeJob implements Job { 
	
	Logger log4j = Logger.getLogger(decodeJob.class); 

    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException { 
       
    	  String sourceFolders=ServerPropertiesUtil.getValueBykey("sourceFolder");   //解密源文件夹
    	  String historyFolders=ServerPropertiesUtil.getValueBykey("historyFolder"); //保存历史文件夹
    	  String resultsFolders=ServerPropertiesUtil.getValueBykey("resultsFolder"); //解密后文件夹
          String[] sourceFolderlist =sourceFolders.split(",");
          String[] historyFolderlist =historyFolders.split(",");
          String[] resultsFolderlist =resultsFolders.split(",");
            int len1=sourceFolderlist.length;
            int len2=historyFolderlist.length;
            int len3=resultsFolderlist.length;
    	  if(len1==0 || len2==0 || len3==0  ||
                  len1!=len2 ||len2!=len3 || len1!=len3) {
    		  log4j.error("解密源文件夹、保存历史文件夹或解密后文件夹配置错误"); 
    	  }else {
                  for (int i = 0; i <len1 ; i++) {
                      try {
                          FileUtil.decodeAllFile(sourceFolderlist[i],resultsFolderlist[i],historyFolderlist[i]);
                      } catch (Exception e) {
                          e.printStackTrace();
                      }
                  }
              log4j.info("本次文件处理完成");
    	  }
    } 
} 