package com.digitalchina.ldp.app.osp.filter;

import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import org.apache.log4j.Logger;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**
 * 防盗链filter
 * Created by zhanglei on 15/6/1.
 */
public class PreventLinkFilter implements Filter {

    private static Logger logger = Logger.getLogger(PreventLinkFilter.class.getName());
    public static final Set<String> allowIP = new HashSet<String>(Arrays.asList(BeanDefineConfigue.getProperty("allowHost").split("&")));

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        //过滤器初始化代码
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        //在这里可以对客户端请求进行检查
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        URI uri;
        try {
            String referer = request.getHeader("Referer");
            logger.info("referer = " + referer);
            uri = new URI(referer);
        } catch (URISyntaxException e) {
            return;
        } catch (NullPointerException e) {
            // Referer 为空时
            return;
        }
        String host = uri.getHost();
        if (!allowIP.contains(host)) {
            logger.info("已拒绝来自host= " + host + " 的访问");
            return;
        }
        //沿过滤器链将请求传递到下一个过滤器。
        filterChain.doFilter(servletRequest, servletResponse);
        //在这里可以对响应进行处理
    }

    @Override
    public void destroy() {
        //过滤器被销毁时执行的代码
    }
}
