package com.digitalchina.dao;

/**
 * Created by zhanglei on 15/11/2.
 */
public interface InterceptorDao {
    /**
     * 判断密钥是否有效
     *
     * @return true 有效
     */
    boolean isValidKey(String authKey, String sqlId);

    /**
     * 判断调用次数是否达到上限
     *
     * @return true 未达到上限
     */
    boolean isLimted(String authKey, String sqlId);

    /**
     * 判断服务是否有效
     *
     * @return true 有效
     */
    boolean isValidService(String sqlId);

    /**
     * 调用次数减1
     */
    void cutNum(String authKey, String sqlId);

}
