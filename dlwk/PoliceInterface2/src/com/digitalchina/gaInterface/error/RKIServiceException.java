package com.digitalchina.gaInterface.error;
import com.digitalchina.util.InitProperties;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import com.digitalchina.util.InitProperties;

/**
*FileEncodeing:utf-8
*接口错误
*
*@authorHadis_sha
*/
public class RKIServiceException{
//	privatestaticPropertiesprop=InitProperties.getProperties("error.ini");
private static Properties prop = InitProperties.initeErrorProperties();
public static Map<String,String> errorMap=new HashMap<String,String>();

static{
    errorMap.put("0201","消息过期,超过了请求报文的有效传输时间");
    errorMap.put("0202","死信，目的服务方已经被禁用或无法找到其所挂接的调度节点");
    errorMap.put("0203","持久化消息过期，超过了响应报文的有效传输时间");
    errorMap.put("0204","无法转发请求报文到目的服务方所挂接的调度节点");
    errorMap.put("0205","请求方未被授权访问服务方");
    errorMap.put("0206","超过调度节点的最大并发访问数，无法处理请求任务");
    errorMap.put("0207","请求报文不符合规范");
    errorMap.put("0208","请求方接入许可证校验不通过");
    errorMap.put("0209","请求节点流量过大，无法处理请求任务");
    errorMap.put("0210","目标服务方近期多次访问异常，暂时限制访问");
    errorMap.put("0211","请求报文解析出的SOAP报文不符合服务方WSDL要求");
    errorMap.put("0212","请求任务等待调度节点处理超时(系统繁忙)");
    errorMap.put("0213","调度节点已被停用，无法处理请求任务");
    errorMap.put("0214","接入的请求方编号及服务方编号不是有效的，均不属于本地调度节点");
    errorMap.put("0215","接入的请求方编号错误(请求方编号不能为空同时该请求方需要存在)");
    errorMap.put("0218","接入的请求方版本号错误");
    errorMap.put("0301","请求接收回执");
    errorMap.put("0302","结果接收回执");
    errorMap.put("0303","同步通信成功回执");
    errorMap.put("0304","异步通信成功回执");
    errorMap.put("0501","服务方接口方法调用出错");
    errorMap.put("0502","服务方接口方法调用超时");
    errorMap.put("0503","服务方响应报文尺寸超过限制");
    errorMap.put("0601","调度节点中等待处理的请求任务过多(系统繁忙)");
    errorMap.put("0602","调度节点中等待处理的请求任务未执行");
    errorMap.put("0603","处理的请求正在执行，还未成功");
    errorMap.put("0999","调度节点其它异常");
    errorMap.put("6001","任务对象中传入的请求方ID与任务体（请求报文）中的不一致");
    errorMap.put("6002","任务对象中的任务体（请求报文）格式校验不通过");
    errorMap.put("6003","任务对象中的任务体（请求报文）尺寸超过限制");
    errorMap.put("6004","接口输入参数校验不通过");
    errorMap.put("6999","应用接入接口其它异常");
}

public static String ShowException(String errorCode){
return errorMap.get(errorCode);
}

public static String ShowExceptionFromProp(String errorCode){
return prop.getProperty(errorCode);
}
}
