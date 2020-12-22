<%@ page language="java" pageEncoding="UTF-8"%>
<%@include file="/common/header_ace.jsp"%>
<script>
var ctx="${ctx}";
</script>
<script type="text/javascript" src="${ctx}/webapp/resources/plugins/webuploader/webuploader.min.js"></script>
<script type="text/javascript" src="${ctx}/webapp/javascript/common.js"></script>
<script type="text/javascript" src="${ctx}/webapp/resources/plugins/echarts/echarts.js"></script>
<script type="text/javascript" src="${ctx}/webapp/javascript/base64.js"></script>
<script type="text/javascript" src="${ctx}/webapp/javascript/import.js"></script>
<body style="width:100%;position:relative;overflow-y:auto;overflow-x:hidden;background-size:100% 100%;" paras="
Expression webInfo is undefined on line 11, column 114 in webapp.tpl.
The problematic instruction:
----------
==> ${webInfo } [on line 11, column 112 in webapp.tpl]
----------

Java backtrace for programmers:
----------
freemarker.core.InvalidReferenceException: Expression webInfo is undefined on line 11, column 114 in webapp.tpl.
	at freemarker.core.TemplateObject.assertNonNull(TemplateObject.java:124)
	at freemarker.core.Expression.getStringValue(Expression.java:118)
	at freemarker.core.Expression.getStringValue(Expression.java:93)
	at freemarker.core.DollarVariable.accept(DollarVariable.java:76)
	at freemarker.core.Environment.visit(Environment.java:210)
	at freemarker.core.MixedContent.accept(MixedContent.java:92)
	at freemarker.core.Environment.visit(Environment.java:210)
	at freemarker.core.Environment.process(Environment.java:190)
	at freemarker.template.Template.process(Template.java:237)
	at com.digitalchina.ldp.app.webapp.util.Ftl2HtmlUtil.geneHtmlFile(Ftl2HtmlUtil.java:62)
	at com.digitalchina.ldp.app.webapp.handler.WebAppInfoHandler.saveWebAppInfo(WebAppInfoHandler.java:172)
	at sun.reflect.GeneratedMethodAccessor570.invoke(Unknown Source)
	at java.lang.reflect.Method.invoke(Method.java:601)
	at com.digitalchina.ldp.common.util.CallMethod.invok(CallMethod.java:88)
	at com.digitalchina.ldp.common.util.CallMethod.call(CallMethod.java:31)
	at com.digitalchina.ldp.handler.AbstractHandler.execute(AbstractHandler.java:52)
	at com.digitalchina.ldp.action.FacadeAction.handleRequest(FacadeAction.java:29)
	at org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter.handle(SimpleControllerHandlerAdapter.java:48)
	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:925)
	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:856)
	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:936)
	at org.springframework.web.servlet.FrameworkServlet.doGet(FrameworkServlet.java:827)
	at javax.servlet.http.HttpServlet.service(HttpServlet.java:620)
	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:812)
	at javax.servlet.http.HttpServlet.service(HttpServlet.java:727)
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:303)
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:208)
	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:52)
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:241)
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:208)
	at org.apache.shiro.web.servlet.ProxiedFilterChain.doFilter(ProxiedFilterChain.java:61)
	at org.apache.shiro.web.servlet.AdviceFilter.executeChain(AdviceFilter.java:108)
	at org.apache.shiro.web.servlet.AdviceFilter.doFilterInternal(AdviceFilter.java:137)
	at org.apache.shiro.web.servlet.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:125)
	at org.apache.shiro.web.servlet.ProxiedFilterChain.doFilter(ProxiedFilterChain.java:66)
	at org.apache.shiro.web.servlet.AdviceFilter.executeChain(AdviceFilter.java:108)
	at org.apache.shiro.web.servlet.AdviceFilter.doFilterInternal(AdviceFilter.java:137)
	at org.apache.shiro.web.servlet.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:125)
	at org.apache.shiro.web.servlet.ProxiedFilterChain.doFilter(ProxiedFilterChain.java:66)
	at org.apache.shiro.web.servlet.AbstractShiroFilter.executeChain(AbstractShiroFilter.java:449)
	at org.apache.shiro.web.servlet.AbstractShiroFilter$1.call(AbstractShiroFilter.java:365)
	at org.apache.shiro.subject.support.SubjectCallable.doCall(SubjectCallable.java:90)
	at org.apache.shiro.subject.support.SubjectCallable.call(SubjectCallable.java:83)
	at org.apache.shiro.subject.support.DelegatingSubject.execute(DelegatingSubject.java:383)
	at org.apache.shiro.web.servlet.AbstractShiroFilter.doFilterInternal(AbstractShiroFilter.java:362)
	at org.apache.shiro.web.servlet.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:125)
	at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:346)
	at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:259)
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:241)
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:208)
	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:220)
	at org.apache.catalina.core.StandardContextValve.__invoke(StandardContextValve.java:122)
	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java)
	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:501)
	at org.apache.catalina.core.StandardHostValve.__invoke(StandardHostValve.java:171)
	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java)
	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:102)
	at org.apache.catalina.valves.AccessLogValve.invoke(AccessLogValve.java:950)
	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:116)
	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:408)
	at org.apache.coyote.http11.AbstractHttp11Processor.process(AbstractHttp11Processor.java:1040)
	at org.apache.coyote.AbstractProtocol$AbstractConnectionHandler.process(AbstractProtocol.java:607)
	at org.apache.tomcat.util.net.JIoEndpoint$SocketProcessor.run(JIoEndpoint.java:316)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1145)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)
	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61)
	at java.lang.Thread.run(Thread.java:722)
