package com.owen.server;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.pentaho.di.core.KettleEnvironment;
import org.pentaho.di.core.database.DatabaseMeta;
import org.pentaho.di.core.exception.KettleException;
import org.pentaho.di.job.Job;
import org.pentaho.di.job.JobMeta;
import org.pentaho.di.repository.RepositoryDirectoryInterface;
import org.pentaho.di.repository.RepositoryElementMetaInterface;
import org.pentaho.di.repository.StringObjectId;
import org.pentaho.di.repository.kdr.KettleDatabaseRepository;
import org.pentaho.di.repository.kdr.KettleDatabaseRepositoryMeta;

import com.owen.console.publish.Communication;
import com.owen.console.xchange.OWEN_VAR;
import com.owen.console.xchange.OwenOrgnization;
import com.owen.console.xchange.OwenRunnablePool;
import com.owen.console.xchange.OwenTask;
import com.owen.env.KettleEnv;

/**
 * @author owen
 *
 *	Kettle服务类的真正实现
 *
 */
public class KetterServerServiceImpl implements IKetterServerService {

	
	private static Logger logger = Logger.getLogger(KetterServerServiceImpl.class);
	
	
	
	/**
	 * Kettle资源库的环境配置类
	 */
	private KettleEnv kettleEnv;
	
	
	/**
	 * 数据库类型的Kettle资源库实体类
	 */
	private KettleDatabaseRepository repository;

	
	/**
	 * 当前节点服务器所负责的委办局列表
	 */
	private List<OwenOrgnization> 		orgList;
	
	
	/**
	 * 当前节点服务器所负责的每个委办局所对应的任务列表
	 */
	private Map<String, List<OwenTask>> taskMap;
	
	/**
	 * 委办局与其对应的资源库实例
	 */
	private HashMap<HashMap<String, String>, KettleDatabaseRepository> kettleMap;
	
	
	/**
	 * 启动，停止，重启任务的控制列表
	 * 
	 * 启动时，将任务ID及任务实例PUT到该队列中
	 * 
	 * 停止时，此任务ID从该队列中删除任务实例
	 * 
	 * 重启时，先以任务ID从该队列中删除任务实例，然后再从资源库中加载任务实例，最后再将新的任务实例添加到该队列中
	 */
	private Map<String, Job>			jobMap;
	
	
	/**
	 * 运行Kettle任务时的线程池，此类内部同样会对相关任务的停止与启动以队列的形式进行控制
	 */
	private OwenRunnablePool			runnablePool;
	
	
	/**
	 * 
	 * SPRING注入Kettle环境配置的set方法
	 * 
	 * @param kettleEnv
	 */
	public void setKettleEnv(KettleEnv kettleEnv) {
		this.kettleEnv = kettleEnv;
	}

	/**
	 * SPRING注入线程池的set方法
	 * 
	 * @param runnablePool
	 */
	public void setRunnablePool(OwenRunnablePool runnablePool) {
		this.runnablePool = runnablePool;
	}

	
	/**
	 * Kettle服务类的初始化方法
	 * 
	 * 一，初始化资源库信息
	 * 
	 * 二，获取当前节点服务器所负责的委办局列表
	 * 
	 * 三，获取每个委办局下属的任务列表
	 * 
	 * 四，将当前节点服务器所控制的任务列表回传给中心服务器
	 * 
	 * 
	 * @return
	 * @throws Exception
	 */
	public String sys_init() throws Exception {
		
		String ret = OWEN_VAR.IMOK;
		// 初始化资源库
		ret = initRepository();

		List<OwenOrgnization> duty;

		if(OWEN_VAR.IMOK.equals(ret)){
			
			List<OwenTask> rebackList = new ArrayList<OwenTask>();
			//初始化当前服务器内部的存储空间
			initMember();
			//从中心服务器获取当前节点服务器所管辖的机构列表
			duty = getDistOrgnization();
			
			if(null != duty && duty.size() > 0){
				
				for (OwenOrgnization org : duty) {
					String orgName = org.getOrgName();
					
					List<OwenTask> orgTaskList = getOrgTasks(orgName);
					
					taskMap.put(orgName,orgTaskList);
					
					rebackList.addAll(orgTaskList);
				}
			}
			//向中心控制器回传当前节点服务器所控制的所有任务
			putDistTasks(rebackList);
		}
		
		return ret;
	}
	
	/**
	 * 更新任务列表
	 * @throws Exception 
	 * 
	 * */
	public String getNewTask() throws Exception{
		String ret = OWEN_VAR.IMOK;
		//System.out.println("------------getNewTask---------------");
		List<OwenTask> rebackList = new ArrayList<OwenTask>();
		List<OwenOrgnization> duty = getDistOrgnization();
		
		if(null != duty && duty.size() > 0){
			
			for (OwenOrgnization org : duty) {
				String orgName = org.getOrgName();
				//System.out.println("rebackList1------"+rebackList.size());
				List<OwenTask> orgTaskList = getOrgTasks(orgName);
				
				taskMap.put(orgName,orgTaskList);
				
				rebackList.addAll(orgTaskList);
				//System.out.println("rebackList2------"+rebackList.size());
			}
		}
		//向中心控制器回传当前节点服务器所控制的所有任务
		putDistTasks(rebackList);
		return ret;
	}
	
	/**
	 * 初始化当前服务器内部的存储空间
	 * 
	 */
	private void initMember(){
		orgList = new ArrayList<OwenOrgnization>();
		
		taskMap = new HashMap<String, List<OwenTask>>();
		
		jobMap = new HashMap<String, Job>();
		
		//<<委办局 ,阶段>,资源库实例>
		kettleMap = new HashMap<HashMap<String, String>, KettleDatabaseRepository>();
	}
	
	
	/**
	 * 初始化Kettle资源库
	 * 
	 * 一，初始化Kettle资源库
	 * 
	 * 二，默认用户密码的方式连接该资源库
	 * 
	 * @return
	 * @throws Exception
	 */
	private String initRepository() throws Exception{
		logger.info("开始初始化Kettle环境....");

		KettleEnvironment.init();

		logger.info("Kettle环境初始化成功!");
		
		
		

		logger.info("开始创建Kettle资源库元数据.....");

		repository = new KettleDatabaseRepository();

		DatabaseMeta dbMeta = new DatabaseMeta(
														kettleEnv.getRepName(),
														kettleEnv.getRepType(), 
														kettleEnv.getRepAccess(),
														kettleEnv.getRepHost(), 
														kettleEnv.getRepSid(),
														kettleEnv.getRepPort(), 
														kettleEnv.getRepDBUser(),
														kettleEnv.getRepDBPassword());

		KettleDatabaseRepositoryMeta keMeta = 
				new KettleDatabaseRepositoryMeta("temp_id", "temp_name", "temp_desc", dbMeta);

		logger.info("Kettle资源库创建成功！");
		
		
		

		logger.info("开始初始化Kettle资源库....");

		repository.init(keMeta);

		logger.info("Kettle资源库初始化成功!");
		
		

		logger.info("开始使用用户名[" + kettleEnv.getRepLginUser() + "]连接资源库...");

		repository.connect(kettleEnv.getRepLginUser(),kettleEnv.getRepLginPassword());

		logger.info("Kettle资源库连接成功!");
		
		
		return OWEN_VAR.IMOK;
	}
	
	
	/**
	 * 向中心控制器回传当前节点服务器所控制的所有任务
	 * 
	 * @param rebackList
	 * @throws Exception
	 */
	private void putDistTasks(List<OwenTask> rebackList) throws Exception{
		//System.out.println("----putDistTasks--"+rebackList.size());
		Communication console = OWEN_VAR.getConsole();
		
		if(null != console){
			console.pushTasksByServerId(OWEN_VAR.SVR_IP, rebackList);
		}
	}
	
	
	/**
	 * 从中心服务器获取当前节点服务器所管辖的机构列表
	 * 
	 * @return
	 * @throws Exception
	 */
	private List<OwenOrgnization> getDistOrgnization() throws Exception{
		List<OwenOrgnization> orgList = new ArrayList<OwenOrgnization>();
		
		Communication console =  OWEN_VAR.getConsole();
		 
		if(null != console){
			
			//List<OwenOrgnization> taskList = console.getOrgnizationsByServerId(OWEN_VAR.SVR_IP);
			Map<OwenOrgnization, String> taskMap = console.getOrgnizationsByServerId(OWEN_VAR.SVR_IP);
			
			if(null != taskMap && !taskMap.isEmpty()){
				List<OwenOrgnization> taskList = new ArrayList<OwenOrgnization>();
				Iterator iter = taskMap.entrySet().iterator();
					while (iter.hasNext()) {
						boolean flag=false;
						Map.Entry entry = (Map.Entry) iter.next();
						OwenOrgnization org = (OwenOrgnization)entry.getKey();
						for(OwenOrgnization o : taskList){
							if(o.getOrgCode().equals(org.getOrgCode())){
								flag=true;
								break;
							}
						}
						if(!flag){
							taskList.add(org);
						}
					}
				
				orgList.addAll(taskList);
			}else {
				logger.info("中心服务器未分配任何机构............");
			}
		}
		
		return orgList;
	}

	
	/**
	 * 删除在当前节点服务器所失效的机构
	 * 
	 * @param orgName
	 */
	private void removeInvalideOrg(String orgName){
		for (OwenOrgnization org : orgList) {
			if(orgName.equals(org.getOrgName())){
				orgList.remove(org);
				break;
			}
		}
	}
	
	
	/**
	 * 获取每个委办局下所管理的每个任务的核心信息
	 * 
	 * @param orgName
	 * @return
	 * @throws Exception
	 */
	private List<OwenTask> getPrimaryInfo(String orgName) throws Exception{
		List<OwenTask> kl = new ArrayList<OwenTask>();
		
		if (null != repository && repository.isConnected()) {
			
			String dirPath = "/" + orgName;
			RepositoryDirectoryInterface rDirectoryInterface = repository.findDirectory(dirPath);
			if(null == rDirectoryInterface){
				removeInvalideOrg(orgName);
			}else {
				List<RepositoryDirectoryInterface> stageList = rDirectoryInterface.getChildren();
				for (RepositoryDirectoryInterface rdi : stageList) {
					
					List<RepositoryElementMetaInterface> jobList = repository.getJobObjects(rdi.getObjectId(), false);
					
					for (RepositoryElementMetaInterface job : jobList) {
						OwenTask kt = new OwenTask();
						
						kt.setOrgName(orgName);
						kt.setStage(rdi.getName());
						kt.setTaskId(job.getObjectId().getId());
						kt.setTaskName(job.getName());
						kt.setInterval(String.valueOf(OWEN_VAR.ORP_DEFAULTDEALY));
						kt.setStatus("未执行");
						
						kl.add(kt);
					}

				}
			}
		}
		
		return kl;
	}
	
	
	/**
	 * 获取每个委办局下属的所有任务信息，包括核心信息及扩展信息（待定）
	 * 
	 * @param orgName
	 * @return
	 * @throws Exception
	 */
	private List<OwenTask> getOrgTasks(String orgName) throws Exception{
		
		List<OwenTask> kl = getPrimaryInfo(orgName);

		return kl;
	}

	/**
	 * 
	 * 同目录的实例化新的资源库
	 * @throws KettleException 
	 */
	private KettleDatabaseRepository getKettleDatabaseRepository() throws KettleException{
		
		KettleEnvironment.init();

		KettleDatabaseRepository repository = new KettleDatabaseRepository();

		DatabaseMeta dbMeta = new DatabaseMeta(
														kettleEnv.getRepName(),
														kettleEnv.getRepType(), 
														kettleEnv.getRepAccess(),
														kettleEnv.getRepHost(), 
														kettleEnv.getRepSid(),
														kettleEnv.getRepPort(), 
														kettleEnv.getRepDBUser(),
														kettleEnv.getRepDBPassword());

		KettleDatabaseRepositoryMeta keMeta = 
				new KettleDatabaseRepositoryMeta("temp_id", "temp_name", "temp_desc", dbMeta);


		repository.init(keMeta);

		repository.connect(kettleEnv.getRepLginUser(),kettleEnv.getRepLginPassword());
		
		return repository;
	}

	/**
	 * 
	 * 启动任务指定任务列表中的所有任务
	 * 
	 * */
	public String runTask(List<OwenTask> taskList) throws Exception {
		String ret = OWEN_VAR.IMOK;
		int initDealy = OWEN_VAR.ORP_INITDEALY;
		System.out.println("Ketter开始执行runTask--------");
		if(null != taskList && !taskList.isEmpty()){
			
			for (OwenTask owenTask : taskList) {
					String jobId = owenTask.getTaskId();
					String orgName = owenTask.getOrgName();
					String stage = owenTask.getStage();
					HashMap<String , String> tmpMap = new HashMap<String, String>();
					tmpMap.put(orgName, stage);
					Job jobInstance = null;
					if(jobMap.containsKey(jobId)){
						jobInstance = jobMap.get(jobId);
					}else {
						//同目录的不能同时运行,不同委办局也不能运行的解决
						KettleDatabaseRepository repository = null;
						boolean flag=true;
						
						if(kettleMap.get(tmpMap) == null){
							for(HashMap<String , String> map : kettleMap.keySet()){
								for(String name : map.keySet()){
									if(name.equals(orgName)){
										flag=false;
										HashMap<String,String> m = new HashMap<String, String>();
										m.put(name, map.get(name));
										repository=kettleMap.get(m);
									}
								}
							}
							
							if(flag){
								repository=getKettleDatabaseRepository();
								kettleMap.put(tmpMap, repository);
							}
							
						}else{
							repository=getKettleDatabaseRepository();
							HashMap<String,String> m = new HashMap<String, String>();
							m.put(orgName, stage);
							kettleMap.put(m, repository);
						}

						JobMeta jobMeta = repository.loadJob(new StringObjectId(jobId), null);
						jobInstance = new Job(repository, jobMeta);
						
						jobMap.put(jobId, jobInstance);
					}
					
					KettleRunnableJob kt = new KettleRunnableJob(jobInstance,Integer.parseInt(owenTask.getInterval()),runnablePool);
					
					runnablePool.schdule(jobInstance.getObjectId().getId(),kt,initDealy,kt.getInterval());	
					
					initDealy += OWEN_VAR.ORP_INITDEALY;
			}
		}
		System.out.println("Ketter执行完成runTask--------");
		return ret;
	}


	/**
	 * 停止任务列表中的所有任务
	 * 
	 * */
	public String stopTask(List<OwenTask> taskList) throws Exception {
		String ret = OWEN_VAR.IMOK;
		if(null != taskList && !taskList.isEmpty()){
			
			for (OwenTask owenTask : taskList) {
				
				String jobId = owenTask.getTaskId();
				Job jobInstance = null;
				
				if(jobMap.containsKey(jobId)){
					
					jobInstance = jobMap.get(jobId);
					runnablePool.shutdown(jobInstance.getObjectId().getId());
				}		
			}
		}
				
		return ret;
	}


	/**
	 * 重启任务列表中的所有任务
	 * 
	 * */
	public String restartTask(List<OwenTask> taskList) throws Exception {
		String ret = OWEN_VAR.IMOK;
		
		int initDealy = OWEN_VAR.ORP_INITDEALY;
		if(null != taskList && !taskList.isEmpty()){
			
			for (OwenTask owenTask : taskList) {
				
				String jobId = owenTask.getTaskId();
				Job jobInstance = null;
				
				if(jobMap.containsKey(jobId)){
					
					jobInstance = jobMap.get(jobId);

					runnablePool.shutdown(jobInstance.getObjectId().getId());
					
					jobMap.remove(jobId);
				}		
				
				KettleDatabaseRepository repository =getKettleDatabaseRepository();
				
				JobMeta jobMeta = repository.loadJob(new StringObjectId(jobId), null);
				jobInstance = new Job(repository, jobMeta);
				
				jobMap.put(jobId, jobInstance);
				
				KettleRunnableJob kt = new KettleRunnableJob(jobInstance,Integer.parseInt(owenTask.getInterval()),runnablePool);
				
				runnablePool.schdule(jobInstance.getObjectId().getId(),kt,initDealy,kt.getInterval());	
				
				initDealy += OWEN_VAR.ORP_INITDEALY;
			}
		}
				
		return ret;
	}
	
}
