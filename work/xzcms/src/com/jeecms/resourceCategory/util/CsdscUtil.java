package com.jeecms.resourceCategory.util;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpClient;
import org.apache.http.client.HttpResponseException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.util.List;

/**
 * Created by zhanglei on 15/9/8.
 */
public class CsdscUtil {
    public static String httpPost(String url, List<NameValuePair> params) throws IOException {
        HttpClient httpclient = new DefaultHttpClient();

        HttpPost httpPost = new HttpPost(url);

        // 设置 HTTP POST 请求参数
        httpPost.setEntity(new UrlEncodedFormEntity(params, HTTP.UTF_8));
        // 设置回调函数，将 responseData 转成 utf-8 编码
        ResponseHandler<String> responseHandler = new BasicResponseHandler() {
            @Override
            public String handleResponse(final HttpResponse response)
                    throws HttpResponseException, IOException {
                StatusLine statusLine = response.getStatusLine();
                if (statusLine.getStatusCode() >= 300) {
                    throw new HttpResponseException(statusLine.getStatusCode(),
                            statusLine.getReasonPhrase());
                }

                HttpEntity entity = response.getEntity();
                if (entity == null) {
                    return "";
                }
                String charSet = EntityUtils.getContentCharSet(entity);
                if (charSet == null) {
                    charSet = HTTP.ISO_8859_1;
                }
                String responseData = EntityUtils.toString(entity);
                return new String(responseData.getBytes(charSet), HTTP.UTF_8);
            }
        };
        String responseData = "";
        try {
            responseData = httpclient.execute(httpPost, responseHandler);
        } finally {
            httpclient.getConnectionManager().shutdown();
        }
        return responseData;
    }

    public static String httpPost(String url) throws IOException {
        HttpClient httpclient = new DefaultHttpClient();

        HttpPost httpPost = new HttpPost(url);

        // 设置回调函数，将 responseData 转成 utf-8 编码
        ResponseHandler<String> responseHandler = new BasicResponseHandler() {
            @Override
            public String handleResponse(final HttpResponse response)
                    throws HttpResponseException, IOException {
                StatusLine statusLine = response.getStatusLine();
                if (statusLine.getStatusCode() >= 300) {
                    throw new HttpResponseException(statusLine.getStatusCode(),
                            statusLine.getReasonPhrase());
                }

                HttpEntity entity = response.getEntity();
                if (entity == null) {
                    return "";
                }
                String charSet = EntityUtils.getContentCharSet(entity);
                if (charSet == null) {
                    charSet = HTTP.ISO_8859_1;
                }
                String responseData = EntityUtils.toString(entity);
                return new String(responseData.getBytes(charSet), HTTP.UTF_8);
            }
        };
        String responseData = "";
        try {
            responseData = httpclient.execute(httpPost, responseHandler);
        } finally {
            httpclient.getConnectionManager().shutdown();
        }
        return responseData;
    }
}
