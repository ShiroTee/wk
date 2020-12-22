package com.owen.console.xchange;



public final class OWEN_VAR {
	public final static String 	IMOK 				= "OK";
	public final static String 	STR_SEP 			= "##";
	
	public  static String 	    SVR_IP ;
	public final static String 	DEFAULT_INTERVAL 	= "1";
	
	public final static int 	ORP_SIZE 			= 48;
	public final static int		ORP_INITDEALY		= 3;
	public final static int 	ORP_DEFAULTDEALY 	= Integer.parseInt(DEFAULT_INTERVAL)*60;
	
	
	public final static String	SURROUND_BRACES(String name){
		return "<<" + name + ">>";
	}
	
}
