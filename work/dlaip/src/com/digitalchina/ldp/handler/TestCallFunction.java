package com.digitalchina.ldp.handler;



import org.springframework.stereotype.Component;

import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.callback.CallBackFunction;
@Component
public class TestCallFunction implements CallBackFunction
{

	@Override
	public void callback(Model model)
	{
		System.out.println("你妹!!!");
	}
	public static void main(String[] args)
	{
		new TestCallFunction().callback(null);
	}

}
