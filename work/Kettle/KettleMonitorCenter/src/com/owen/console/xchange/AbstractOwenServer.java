package com.owen.console.xchange;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

public abstract class AbstractOwenServer extends UnicastRemoteObject implements IOwenServer {

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
