package com.digitalchina.ldp.app.osp.util;

import java.security.MessageDigest;
import java.util.Calendar;

public class CommonUtil {

	public static String getCurrentTime(){
		Calendar c = Calendar.getInstance();
		
		return c.get(Calendar.YEAR) 
					+ "-"
					+ c.get(Calendar.MONTH) 
					+ "-"
					+ c.get(Calendar.DATE) 
					+ " "
					+ c.get(Calendar.HOUR_OF_DAY) 
					+ ":"
					+ c.get(Calendar.MINUTE) 
					+ ":"
					+ c.get(Calendar.SECOND);
	}

	public static String sha256(String base) {
		try {
			MessageDigest digest = MessageDigest.getInstance("SHA-256");
			byte[] hash = digest.digest(base.getBytes("UTF-8"));
			StringBuilder hexString = new StringBuilder();

			for (byte aHash : hash) {
				String hex = Integer.toHexString(0xff & aHash);
				if (hex.length() == 1) hexString.append('0');
				hexString.append(hex);
			}

			return hexString.toString();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
