package com.owen.server.service;

public interface ServiceCallback<T> {

	public void setResult(T data);
	
	public T getParam();
}
