package com.digitalchina.gaInterface;

import com.digitalchina.gaInterface.entity.QueryUser;
import com.digitalchina.util.StaticUtil;
import com.dragonsoft.adapter.service.ExchangeAdapterSend;
import com.dragonsoft.adapter.service.MatchingAdapterSend;
import com.dragonsoft.adapter.service.QueryAdapterSend;
import com.dragonsoft.adapter.service.TrackingAdapterSend;
import com.dragonsoft.pci.exception.InvokeServiceException;

public class GAInterfaceUtil {

    /**
     * 数据查询适配器
     * @return String
     * @throws InvokeServiceException
     */
    public static String dataQuery(String strItem,String condition) throws InvokeServiceException {
        QueryUser user=StaticUtil.getRandomUser();
        System.out.println("使用查询人："+user.getUserCardId()+"---"+user.getUserDept()+"---"+user.getUserName());
        return dataQuery(strItem, condition, user);
    }
    /**
     * 数据查询适配器
     * @return String
     * @throws InvokeServiceException
     */
    public static String dataQuery(String strItem,String condition,QueryUser user) throws InvokeServiceException {
        return dataQuery(strItem, condition, user.getUserCardId(), user.getUserName(), user.getUserDept());
    }
    /**
     * 数据查询适配器
     * @return String
     * @throws InvokeServiceException
     */
    public static String dataQuery(String strItem,String condition,String userCardId, String userName, String userDept) throws InvokeServiceException {
        String strReturns = null;
        QueryAdapterSend adapter = new QueryAdapterSend();
        strReturns = adapter.sendQuery(strItem, condition, userCardId, userName, userDept);
        return strReturns;
    }
    /**
     * 小批量数据比对适配器
     * @return  String
     * @throws InvokeServiceException
     */
    public static String dataMatching(String strItem, String[][] sourceDataSet) throws InvokeServiceException{
        return dataMatching(strItem, sourceDataSet,StaticUtil.getRandomUser());
    }
    /**
     * 小批量数据比对适配器
     * @return  String
     * @throws InvokeServiceException
     */
    public static String dataMatching(String strItem, String[][] sourceDataSet,QueryUser user) throws InvokeServiceException{
        return dataMatching(strItem, sourceDataSet, user.getUserCardId(), user.getUserName(), user.getUserDept());
    }
    /**
     * 小批量数据比对适配器
     * @return  String
     * @throws InvokeServiceException
     */
    public static String dataMatching(String strItem, String[][] sourceDataSet, String userCardId, String userName, String userDept) throws InvokeServiceException{
        String strReturns = null;
        MatchingAdapterSend adapter = new MatchingAdapterSend ();
        strReturns = adapter. dataMatching(strItem, sourceDataSet, userCardId, userName, userDept);
        return strReturns;
    }
    /**
     * 信息交换适配器
     * @return  String
     * @throws InvokeServiceException
     */
    public static String infoExchange(String strItem, String[][] aryInfoSet) throws InvokeServiceException{
        return infoExchange(strItem, aryInfoSet, StaticUtil.getRandomUser());
    }
    /**
     * 信息交换适配器
     * @return  String
     * @throws InvokeServiceException
     */
    public static String infoExchange(String strItem, String[][] aryInfoSet,QueryUser user) throws InvokeServiceException{
        return infoExchange(strItem, aryInfoSet, user.getUserCardId(), user.getUserName(), user.getUserDept());
    }
    /**
     * 信息交换适配器
     * @return  String
     * @throws InvokeServiceException
     */
    public static String infoExchange(String strItem, String[][] aryInfoSet, String userCardId, String userName, String userDept) throws InvokeServiceException{
        String strReturns = null;
        ExchangeAdapterSend adapter = new ExchangeAdapterSend ();
        strReturns = adapter.infoExchange(strItem, aryInfoSet, userCardId, userName, userDept);
        return strReturns;
    }
    /**
     * 信息布控适配器
     * @return  String
     * @throws InvokeServiceException
     */
    public static String infoTracking(String strItem, String verifiedCode, String[][] bkInfoSet) throws InvokeServiceException{
        return infoTracking(strItem, verifiedCode, bkInfoSet,StaticUtil.getRandomUser());
    }
    /**
     * 信息布控适配器
     * @return  String
     * @throws InvokeServiceException
     */
    public static String infoTracking(String strItem, String verifiedCode, String[][] bkInfoSet, QueryUser user) throws InvokeServiceException{
        return infoTracking(strItem, verifiedCode, bkInfoSet, user.getUserCardId(), user.getUserName(), user.getUserDept());
    }
    /**
     * 信息布控适配器
     * @return  String
     * @throws InvokeServiceException
     */
    public static String infoTracking(String strItem, String verifiedCode, String[][] bkInfoSet, String userCardId, String userName, String userDept) throws InvokeServiceException{
        String strReturns = null;
        TrackingAdapterSend adapter = new TrackingAdapterSend();
        strReturns = adapter. infoTracking(strItem, verifiedCode, bkInfoSet, userCardId, userName, userDept);
        return strReturns;
    }
}
