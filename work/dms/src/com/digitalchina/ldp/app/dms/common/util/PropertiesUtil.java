package com.digitalchina.ldp.app.dms.common.util;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;

public class PropertiesUtil
{
    private static Map map;

    private static void init()
    {
        try
        {
            InputStream in = PropertiesUtil.class.getResourceAsStream("/jdbc.properties");
            Properties props = new Properties();
            props.load(in);
            map = new HashMap();
            Set<Map.Entry<Object, Object>> entrySet = props.entrySet();
            for (Map.Entry<Object, Object> entry : entrySet) {
                if (!entry.getKey().toString().startsWith("#")) {
                    map.put(((String)entry.getKey()).trim(), ((String)entry.getValue()).trim());
                }
            }
        }
        catch (IOException localIOException) {}
    }

    public static String getValueBykey(String key)
    {
        String res = "";
        if (map == null) {
            synchronized (PropertiesUtil.class)
            {
                if (map == null)
                {
                    init();
                    res = (String)map.get(key);
                }
            }
        }
        res = (String)map.get(key);

        return res;
    }

    public static void main(String[] args)
    {
        System.out.println(getValueBykey("审批系统账号同步接口地址:spxtOperatorAccount"));
    }
}