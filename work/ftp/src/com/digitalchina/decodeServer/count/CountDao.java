package com.digitalchina.decodeServer.count;

import java.util.Map;

/**
 * Created by dlms on 2016/9/26.
 */
public interface CountDao {
    public boolean insertSubmitData(CountBean bean);
    public Map<String,Object> getCircle(String dataType,String orgName);
}
