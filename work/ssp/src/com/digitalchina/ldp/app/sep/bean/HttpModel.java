package com.digitalchina.ldp.app.sep.bean;

import com.digitalchina.ldp.box.AbstractBox;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
public class HttpModel extends AbstractBox<String> {
    private HttpServletRequest request;
    private HttpServletResponse response;

    public HttpServletRequest getRequest() {
        return request;
    }

    public void setRequest(HttpServletRequest request) {
        this.request = request;
    }

    public HttpServletResponse getResponse() {
        return response;
    }

    public void setResponse(HttpServletResponse response) {
        this.response = response;
    }

    // 获取请求参数值，如果请求参数不存在则返回空字符
    public String getValue(String parameterName) {
        String value = null;
        if (super.containsKey(parameterName)) {
            value = super.get(parameterName);
            return value;
        }
        value = request.getParameter(parameterName);
        if (value == null) {
            value = "";
            super.add(parameterName, value);
        }
        return value;
    }

    public String getValueNotEmpty(String parameterName) {
        String value = this.getValue(parameterName);
        if ("".equals(value)) {
            throw new ServiceException("参数[" + parameterName + "]不能为空字符或null");
        }
        return value;
    }

    public int getInt(String parameterName) {
        try {
            return StringUtils.toNum(this.getValue(parameterName));
        } catch (NumberFormatException e) {
            throw new ServiceException("参数[" + parameterName + "]不能转换成Int类型");
        }
    }

    public Float getFloat(String parameterName) {
        try {
            Float f = StringUtils.toFloat(this.getValueNotEmpty(parameterName));
            return f.floatValue();

        } catch (NumberFormatException e) {
            throw new ServiceException("参数[" + parameterName + "]不能转换成Float类型");
        }
    }

    public Double getDouble(String parameterName) {
        try {
            Double d = StringUtils.toDouble(this
                    .getValueNotEmpty(parameterName));
            return d.doubleValue();

        } catch (NumberFormatException e) {
            throw new ServiceException("参数[" + parameterName + "]不能转换成Double类型");
        }
    }

    public long getLong(String parameterName) {
        try {
            Double d = StringUtils.toDouble(this
                    .getValueNotEmpty(parameterName));
            return d.longValue();

        } catch (NumberFormatException e) {
            throw new ServiceException("参数[" + parameterName + "]不能转换成Long类型");
        }
    }

    public void clear() {
        super.clear();
        this.request = null;
        this.response = null;
    }
}
