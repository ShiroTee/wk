package com.owen.console.xchange;

import java.net.MalformedURLException;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.owen.console.publish.Communication;


public abstract class OwenRunnableTask implements Runnable{

	protected int 	 interval;
	
	private OwenRunnablePool holder;
	
	protected OwenTaskLog runLog;
	
	public OwenRunnableTask(OwenRunnablePool pool){
		
		holder = pool;
	}
	
	public int getInterval() {
		return interval;
	}

	public void setInterval(int interval) {
		this.interval = interval;
	}

	protected abstract void execute(int statusCode) throws Exception;

	@Override
	public void run() {	
		System.out.println("Task开始执行run方法-------");
		int sCode=1;
		try {
				execute(sCode);	
			
		} catch (Exception e) {
			sCode=2;
			
			try {
				holder.shutdown(runLog.getTask_id());
			} catch (Exception e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			
			runLog.setEnd_time(new Date());
			
			runLog.setError_number(1);
			e.printStackTrace();
			
			String error_info = e.getMessage()+ "\r\n";
			
			StackTraceElement[] trace = e.getStackTrace();
	        for (StackTraceElement s : trace) {
	        	error_info += "\tat " + s + "\r\n";
	        }
			runLog.setError_info(error_info);
			runLog.setTask_ststus(sCode);
		}finally{
			if(runLog.getError_number() > 0){
				try {
					holder.shutdown(runLog.getTask_id());
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			
			List<OwenTaskLog> taskLogs=new ArrayList<OwenTaskLog> ();
			taskLogs.add(runLog);
			
			try {
				Communication console = OWEN_VAR.getConsole();
				
				if(null != console){
					console.pushTaskLog(OWEN_VAR.SVR_IP, taskLogs);
				}
			} catch (MalformedURLException e1) {
				e1.printStackTrace();
			} catch (RemoteException e1) {
				e1.printStackTrace();
			} catch (NotBoundException e1) {
				e1.printStackTrace();
			}
		}
		System.out.println("Task执行完毕run方法-------");
	}
}
