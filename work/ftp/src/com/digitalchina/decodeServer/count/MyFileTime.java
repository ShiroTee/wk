package com.digitalchina.decodeServer.count;


public final class MyFileTime {

	/**
	 * @param args
	 */
	static {
        System.loadLibrary("MyFileTime");
    }


    private static native String getFileCreationTime(String fileName);


    public static String getCreationTime(String fileName) {
        return getFileCreationTime(fileName);
    }

    public static void main(String[] args) {
        System.out.println(MyFileTime.getCreationTime("D:\\ftpFile\\解密\\大理市地税局\\01 文件上传\\人口库表.xls"));
    }

}