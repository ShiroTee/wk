package com.jeecms.filter;

import javax.servlet.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;


/**
 * author: jiao
 * date:   2017/7/24 16:56
 * note:
 */
public class CookieFilter implements Filter {
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse resp = (HttpServletResponse) response;

        Cookie[] cookies = req.getCookies();

        if (cookies != null) {
            Cookie cookie = cookies[0];
            if (cookie != null) {
	            	/*cookie.setMaxAge(3600);
	            	cookie.setSecure(true);
	            	resp.addCookie(cookie);*/

                //Servlet 2.5不支持在Cookie上直接设置HttpOnly属性
                String value = cookie.getValue();
                StringBuilder builder = new StringBuilder();
                builder.append("JSESSIONID=" + value + "; ");
                builder.append("Secure; ");
                builder.append("HttpOnly; ");
                Calendar cal = Calendar.getInstance();
                cal.add(Calendar.HOUR, 1);
                Date date = cal.getTime();
                Locale locale = Locale.CHINA;
                SimpleDateFormat sdf =
                        new SimpleDateFormat("dd-MM-yyyy HH:mm:ss",locale);
                builder.append("Expires=" + sdf.format(date));
                resp.setHeader("Set-Cookie", builder.toString());
            }
        }
        chain.doFilter(req, resp);
    }

    public void destroy() {
    }

    public void init(FilterConfig arg0) throws ServletException {
    }
}
