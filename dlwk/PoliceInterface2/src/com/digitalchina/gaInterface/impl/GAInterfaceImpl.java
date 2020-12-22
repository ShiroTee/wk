package com.digitalchina.gaInterface.impl;

import com.digitalchina.gaInterface.GAInterface;
import com.digitalchina.gaInterface.GAInterfaceUtil;
import com.digitalchina.gaInterface.error.RKIServiceException;
import com.dragonsoft.pci.exception.InvokeServiceException;

public class GAInterfaceImpl implements GAInterface {

    @Override
    public String dataQuery(String strItem, String condition) {
        String strReturns = null;
        try {
            strReturns = GAInterfaceUtil.dataQuery(strItem, condition);
        } catch (InvokeServiceException e) {
            e.printStackTrace();
            System.out.println(strItem+"---"+e.getErrorCode() + " ## "
                    + RKIServiceException.ShowException(e.getErrorCode())
                    + " # " + e.getErrorMessage());
        }
        return strReturns;
    }

    public String commonDataQuery(String condition,String queryItem,String method,String queryType){
        String queryCondition = "(" + queryItem +"='" + condition + "')";
        if(queryType.equals("like")){
            queryCondition = "(" + queryItem +" like '%" + condition + "%')";
        }

        return dataQuery("Query"+method, queryCondition);
    }

    @Override
    public String dataMatching() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public String infoExchange() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public String infoTracking() {
        // TODO Auto-generated method stub
        return null;
    }
}
