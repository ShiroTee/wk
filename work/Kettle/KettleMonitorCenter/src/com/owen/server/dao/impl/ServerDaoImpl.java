package com.owen.server.dao.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.ResourceBundle;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Example;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import com.owen.console.xchange.OwenTask;
import com.owen.console.xchange.OwenTaskLog;
import com.owen.server.dao.ServerDao;
import com.owen.server.entity.NodeServer;
import com.owen.server.entity.OSRelationShip;
import com.owen.server.entity.Orgnization;
import com.owen.server.entity.StatusTasks;
import com.owen.server.entity.TasksLogs;
import com.owen.server.util.OwenHelper;

public class ServerDaoImpl implements ServerDao {
	private  SessionFactory sessionFactory;

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	@Override
	public List<NodeServer> getServers() throws Exception {
		
		Session session = sessionFactory.openSession();

		Criteria c = session.createCriteria(NodeServer.class);
		
		List<NodeServer> list = c.list();
		
		session.close();
		
		return list;
	}
	
	@Override
	public boolean getKettle(String ip){
		Session session = sessionFactory.openSession();
		List kettleList= session.createCriteria(NodeServer.class)
					  .add(Restrictions.eq("server_ip", ip)).list();
		session.close();
		return kettleList.size()==0?true:false;
	}
	
	@Override
	public void saveNewKettle(String ip) {
		if(getKettle(ip)){
			ResourceBundle bundle = ResourceBundle.getBundle("property");
			String service_name = bundle.getString("service_name");
			String server_port = bundle.getString("server_port");
			int status = Integer.parseInt(bundle.getString("status"));
			Session session = sessionFactory.openSession();
			Transaction tran = session.beginTransaction();
			NodeServer node = new NodeServer();
			node.setServer_name(service_name);
			node.setServer_ip(ip);
			node.setServer_port(server_port);
			node.setServer_status(status);
			session.save(node);
			tran.commit();
			session.close();
		}
	}
	
	@Override
	public void deleteKettle(String ip) {
		ResourceBundle bundle = ResourceBundle.getBundle("property");
		String service_name = bundle.getString("service_name");
		String server_port = bundle.getString("server_port");
		int status = Integer.parseInt(bundle.getString("status"));
		Session session = sessionFactory.openSession();
		Transaction tran = session.beginTransaction();
		NodeServer node = new NodeServer(service_name, ip, server_port);
		node.setServer_status(status);
		//NodeServer node = (NodeServer)session.load(NodeServer.class, ip);
		session.delete(node);
		tran.commit();
		session.close();
	}

	@Override
	public List<Orgnization> getOrgnizations() throws Exception {
		
		Session session = sessionFactory.openSession();

		Criteria c = session.createCriteria(Orgnization.class);
		
		List<Orgnization> list = c.list();
		
		session.close();
		
		return list;
	}

	@Override
	public List<OSRelationShip> getOrgSrvRelations() throws Exception {
		
		Session session = sessionFactory.openSession();

		Criteria c = session.createCriteria(OSRelationShip.class);
		
		List<OSRelationShip> list = c.list();
		
		session.close();
		
		return list;
	}

	@Override
	public void updateDBTasks(List<OwenTask> list) throws Exception {
		Session session = sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		for(OwenTask oTask:list){
			StatusTasks st=OwenHelper.OwentaskToStatusTasks(oTask);
			st.setStatus("未执行");
			session.saveOrUpdate(st);
		}
		tx.commit();
		session.close();
	}

	@Override
	public List<OwenTask> getLastSavedTasks() throws Exception {
		List<OwenTask> olist=new ArrayList<OwenTask>();
		Session session = sessionFactory.openSession();
		Criteria c = session.createCriteria(StatusTasks.class);
		List<StatusTasks> list = c.list();
		for(StatusTasks st:list){
			olist.add(OwenHelper.tasksToOwentask(st));
		}
		session.close();
		return olist;
	}

	@Override
	public void saveTasksLog(List<OwenTaskLog> list) throws Exception {
		Session session = sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		for(OwenTaskLog otaskLog:list){
			TasksLogs taskLog=OwenHelper.owenTaskLogTotaskLog(otaskLog);
			session.saveOrUpdate(taskLog);
		}
		tx.commit();
		session.close();
		
	}

	@Override
	public List<TasksLogs> getTasksLogs(String param) throws Exception {
		Session session = sessionFactory.openSession();
		@SuppressWarnings("unchecked")
		List<TasksLogs> logList=(List<TasksLogs>) session.createCriteria(TasksLogs.class)
			.add(Restrictions.eq("task_id", param))
			.addOrder(Order.desc("start_time") ) 
			.setFirstResult(0) 
			.setMaxResults(5).list();
		session.close();
		return logList;
	}

}
