package com.digitalchina.ldp.app.dms.handler;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class Test
{
	public static void main(String[] args)
	{
		File fileIn = new File("C://applicationContext.xml");
		File fileOut = new File("C://applicationContext2.xml");
		FileReader fr=null;
		FileWriter fw=null;
		int b;
		try
		{
			fr = new FileReader(fileIn);
			fw = new FileWriter(fileOut);
			while ((b = fr.read()) != -1)
			{
				fw.write(b);
			}
			fw.write("<context:component-scan base-package=\"com.digitalchina.ldp.ni.nmisdsdsdsdsdsxxcsd\" />");
		} catch (FileNotFoundException e)
		{
			e.printStackTrace();
		} catch (IOException e)
		{
			e.printStackTrace();
		}
		finally
		{
			try
			{
				if(fw!=null)
				{
					fw.flush();
					fw.close();
				}
				if(fr!=null)
				{
					fr.close();
				}
			}
			catch(Exception e)
			{
				
			}
			
		}
	}
}
