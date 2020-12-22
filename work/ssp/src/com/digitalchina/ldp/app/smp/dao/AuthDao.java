package com.digitalchina.ldp.app.smp.dao;

import com.digitalchina.ldp.app.smp.bean.AuthInfo;

public abstract interface AuthDao
{
  public abstract AuthInfo get(String paramString1, String paramString2);
}

/* Location:           C:\Users\dlms\Desktop\smp-0.0.1-SNAPSHOT.jar
 * Qualified Name:     com.digitalchina.ldp.app.smp.dao.AuthDao
 * JD-Core Version:    0.6.2
 */