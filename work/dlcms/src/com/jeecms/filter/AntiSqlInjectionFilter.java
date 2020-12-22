package com.jeecms.filter;

import com.jeecms.resourceCategory.util.StringUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;

public class AntiSqlInjectionFilter implements Filter {

    private static final String badStr = "(\\.* and \\.*)|(\\.*exec\\.*)|(\\.*execute\\.*)|(\\.*insert\\.*)|(\\.*select\\.*)|(\\.*delete\\.*)" +
            "|(\\.*update\\.*)|(\\.*count\\.*)|(\\.*drop\\.*)|(\\.*master\\.*)|(\\.*truncate\\.*)" +
            "|(\\.*char\\.*)|(\\.*declare\\.*)|(\\.*sitename\\.*)|(\\.*create\\.*)|(\\.*table\\.*)|(\\.*from\\.*)" +
            "|(\\.*grant\\.*)|(\\.*use\\.*)|(\\.*union\\.*)|(\\.*where\\.*)|(\\.*order\\.*)" +
            "|(\\.*like\\.*)|(\\.*script\\.*)|(\\.*document\\.*)|(\\.*eval\\.*)";
   private static final String badStr2="(^|\\&)|(\\|)|(\\;)|(\\$)|(\\%)|(\\-\\-)|(\\@)|(\\')|(\\\")|(\\>)|(\\<)|(\\))|(\\()|(\\+)|(\\,)|(\\\\)|(\\#|$)";
    public void destroy() {
        // TODO Auto-generated method stub
    }

    public void init(FilterConfig arg0) throws ServletException {
        // TODO Auto-generated method stub
    }

    public void doFilter(ServletRequest req, ServletResponse res,
                         FilterChain chain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest)req;
        HttpServletResponse response = (HttpServletResponse)res;
        String url = request.getRequestURI();
        HashMap map = new HashMap();
        boolean flag=false;
        if(url.indexOf("/submitEncodeFtpFile")>-1 || "/rdplogin_dialog.jspx".equals(url)){
            chain.doFilter(req, res);
        } else {
            Enumeration params = req.getParameterNames();
            while (params.hasMoreElements())
            {
                String name = params.nextElement().toString();

                String[] value = req.getParameterValues(name);
                for (int j = 0; j < value.length; j++) {

                    String result = value[j].replaceAll(badStr, "");
                    String result2 = result.replaceAll(badStr2, "");
                    value[j] = result2;
                    if(!value[j].equals(result2)){
                        flag=true;
                    }
                }
                map.put(name, value);
            }
            if(flag){
                request.getRequestDispatcher("/views/parameterError.jsp").forward(request,response);
                //response.("/views/parameterError.jsp");
                return;
            }
            req = new MyRequestWarpper((HttpServletRequest)req, map);
            chain.doFilter(req, res);
        }
    }
}
