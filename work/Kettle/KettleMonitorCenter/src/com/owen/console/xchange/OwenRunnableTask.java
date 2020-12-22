package com.owen.console.xchange;


public abstract class OwenRunnableTask implements Runnable{

	protected int 	 interval;
	
	protected OwenRunnablePool holder;
	
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

	protected abstract void execute() throws Exception;
	
	protected abstract void writeLog(OwenTaskLog log) throws Exception;
	
	protected abstract void dealException(OwenTaskLog log,Exception e) throws Exception;

	@Override
	public void run() {	
		try {
			
			execute();	
			
		} catch (Exception e) {
			
			holder.shutdown(runLog.getTask_id());
			
			try {
				dealException(runLog,e);
			} catch (Exception e1) {
				e1.printStackTrace();
			}
		}finally{
			
			if(null!=runLog && runLog.getError_number() > 0){
				holder.shutdown(runLog.getTask_id());
			}
			
			try {
				writeLog(runLog);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
}
