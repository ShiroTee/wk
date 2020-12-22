 1、 提供了两个重载的静态加密方法供使用者调用
      参数：要加密的字节数组   返回加密后的字节数据
     public static byte[] encrypt(byte[] data)  throws Exception
     参数：要加密的字符串       返回加密后的字符串
     public static String encrypt(String s)  throws Exception
     
     
 2、 提供了两个重载的静态加密方法供使用者调用 
     参数：要解密的字节数组   返回解密后的字节数据
     public static byte[] decrypt(byte[] data)    throws Exception
     参数：要解密的字符串       返回解密后的字符串
      public static String decrypt(String s)    throws Exception