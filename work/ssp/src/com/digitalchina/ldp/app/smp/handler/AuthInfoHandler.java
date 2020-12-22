/*    */
package com.digitalchina.ldp.app.smp.handler;
/*    */ 


import com.digitalchina.ldp.app.smp.bean.AuthInfo;
import com.digitalchina.ldp.app.smp.service.AuthInfoService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.handler.AbstractHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
/*    */ public class AuthInfoHandler extends AbstractHandler
/*    */ {
    /*    */
/*    */
    @Autowired
/*    */ private AuthInfoService authInfoService;

    /*    */
/*    */
    public PageList<AuthInfo> getPageList(Model model)
/*    */ {
/* 18 */
        int start = model.getInt("start");
/* 19 */
        int pageSize = model.getInt("limit");
/* 20 */
        return this.authInfoService.getAuthList(start, pageSize);
/*    */
    }

    /*    */
/*    */
    public String stop(Model model)
/*    */ {
/* 25 */
        String authId = model.getValueNotEmpty("authId");
/* 26 */
        AuthInfo auth = new AuthInfo();
/* 27 */
        auth.setAuthId(authId);
/* 28 */
        auth.setStatus(0);
/* 29 */
        this.authInfoService.updateAuthInfo(auth);
/* 30 */
        return "{success:true}";
/*    */
    }

    /*    */
/*    */
    public String start(Model model)
/*    */ {
/* 35 */
        String authId = model.getValueNotEmpty("authId");
/* 36 */
        AuthInfo auth = new AuthInfo();
/* 37 */
        auth.setAuthId(authId);
/* 38 */
        auth.setStatus(1);
/* 39 */
        this.authInfoService.updateAuthInfo(auth);
/* 40 */
        return "{success:true}";
/*    */
    }

    /*    */
/*    */
    public String deleteAuthInfo(Model model)
{

        String authId = model.getValueNotEmpty("authId");

        this.authInfoService.deleteAuthInfo(authId);

        return "{success:true}";

    }

}

