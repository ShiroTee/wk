package com.digitalchina.common.util;


import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import com.digitalchina.common.util.PropertiesUtil;
/**
* 类描述：java 执行命令工具类
* 创建人：luo
* 创建时间：2014-7-3
* @version    
*/
public class processUtil{
	private static String INPUT_STREAM = "INPUTSTREAM";
	private static String ERROR_STREAM = "ERRORSTREAM";

	public static void writerLine(String path, String contents) {
		try {
			FileWriter fileWriter = new FileWriter(path, true);
			BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);
			bufferedWriter.write(contents);
			bufferedWriter.newLine();
			bufferedWriter.flush();
			bufferedWriter.close();
			fileWriter.close();
		} catch (IOException ioe) {
		}
	}
	/**
	 * 返回命令执行结果信息串
	 * @param command 要执行的命令
	 * @return 第一个为标准信息，第二个为错误信息，如果不存在则相应为空
	 * @throws Throwable String[]
	 */
	public static String[] exec() throws Throwable {

		Process process = null;
		Runtime runtime = Runtime.getRuntime();
		String FileName = PropertiesUtil.USER_DIR+"temp.vbs";
		File vbsFile = new File(FileName);
		if(vbsFile.exists()){
			vbsFile.delete();
		}
		vbsFile.createNewFile();
		
		writerLine(FileName,"Dim   MyIAccount");
		writerLine(FileName,"set   MyIAccount=CreateObject(\"IAccount.DeskEngine\")");
		
		writerLine(FileName,"MyIAccount.SetManager \""+PropertiesUtil.getValueBykey("AAAAServer")+"\",\""+PropertiesUtil.getValueBykey("ApplyID")+"\",\""+PropertiesUtil.getValueBykey("ApplyKey")+"\" ");
		writerLine(FileName,"Dim  bFlag ");
		writerLine(FileName,"bFlag = MyIAccount.CheckCertLogin() ");
		writerLine(FileName,"If bFlag Then");
		writerLine(FileName,"  Wscript.Echo  MyIAccount.UserID & \"-\",MyIAccount.DefaultUserName & \"-\",MyIAccount.Unit & \"-\",MyIAccount.Organize ");
		writerLine(FileName,"Else ");
		writerLine(FileName,"  Wscript.Echo  0");
		writerLine(FileName,"End If");
		
		String[] cpCmd  = new String[]{"cscript ", FileName};  
		process = runtime.exec(" cscript  //nologo "+FileName); 
		 
		String result[] = new String[2];

		Object mutexInstream = new Object();
		Object mutexErrorstream = new Object();
		new ReadThread(process.getInputStream(), INPUT_STREAM, result, mutexInstream).start();
		new ReadThread(process.getErrorStream(), ERROR_STREAM, result, mutexErrorstream).start();
		
		Thread.sleep(20);
		
		synchronized (mutexInstream) {
			synchronized (mutexErrorstream) {
				if (process.waitFor() != 0) {
					result[0] = null;
				} else {
					result[1] = null;
				}
			}
		}
		return result;
	}


	/*
	 * 标准流与错误流读取线程
	 */
	private static class ReadThread extends Thread {
		private InputStream is;
		private String[] resultArr;
		private String type;
		private Object mutex;

		public ReadThread(InputStream is, String type, String[] resultArr, Object mutex) {
			this.is = is;
			this.type = type;
			this.resultArr = resultArr;
			this.mutex = mutex;
		}

		public void run() {
			synchronized (mutex) {
				try {
					int readInt = is.read();
					ArrayList result = new ArrayList();
					while (readInt != -1) {
						result.add(Byte.valueOf(String.valueOf((byte) readInt)));
						readInt = is.read();
					}

					byte[] byteArr = new byte[result.size()];
					for (int i = 0; i < result.size(); i++) {
						byteArr[i] = ((Byte) result.get(i)).byteValue();
					}
					if (ERROR_STREAM.equals(this.type)) {
						resultArr[1] = new String(byteArr);
					} else {
						resultArr[0] = new String(byteArr,"GBK");
					}

				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}
}