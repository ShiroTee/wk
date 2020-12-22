package com.owen.console.xchange;

import java.rmi.RemoteException;

import com.dataman.remote.RMISupport;

public abstract class AbstractOwenServer extends RMISupport implements IOwenServer {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	
	protected AbstractOwenServer() throws RemoteException {
		super();
	}

	@Override
	public String areYouOK(String str) throws RemoteException {
		return OWEN_VAR.IMOK + OWEN_VAR.STR_SEP + str;
	}

}
