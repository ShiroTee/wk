/*
 Navicat Premium Data Transfer

 Source Server Type    : Oracle
 Source Server Version : 112020

 Target Server Type    : Oracle
 Target Server Version : 112020
 File Encoding         : utf-8

 Date: 11/03/2015 14:42:39 PM
*/

-- ----------------------------
--  Table structure for KEY_LIST
-- ----------------------------
CREATE TABLE "KEY_LIST" (   "ID" NUMBER, "WBJMC" VARCHAR2(20BYTE), "KEY" CHAR(32BYTE), "SQL_ID" VARCHAR2(20BYTE), "SFYX" VARCHAR2(2BYTE) DEFAULT '0', "BZ" VARCHAR2(20BYTE), "NUM" NUMBER DEFAULT 0, "ALLNUM" NUMBER DEFAULT 0
);
COMMENT ON COLUMN "KEY_LIST"."WBJMC" IS '数据申请委办局';
COMMENT ON COLUMN "KEY_LIST"."KEY" IS '密码';
COMMENT ON COLUMN "KEY_LIST"."SQL_ID" IS '锁';
COMMENT ON COLUMN "KEY_LIST"."SFYX" IS '0有效';
COMMENT ON COLUMN "KEY_LIST"."NUM" IS '当天服务剩余次数';
COMMENT ON COLUMN "KEY_LIST"."ALLNUM" IS '每天服务总次数';

-- ----------------------------
--  Table structure for SERVICE_LIST
-- ----------------------------
CREATE TABLE "SERVICE_LIST" (   "ID" NUMBER, "SQL_ID" VARCHAR2(20BYTE), "SJTGDW" VARCHAR2(20BYTE), "WBJMC" VARCHAR2(20BYTE), "TGXX" VARCHAR2(100BYTE), "CXTJ" VARCHAR2(200BYTE), "CXJG" VARCHAR2(2000BYTE), "SQLSJY" VARCHAR2(100BYTE), "SQLSTRING" VARCHAR2(2000BYTE), "SFYX" VARCHAR2(1BYTE) DEFAULT '0', "TEST" VARCHAR2(200BYTE), "BZ" VARCHAR2(20BYTE));
COMMENT ON COLUMN "SERVICE_LIST"."SQL_ID" IS '唯一编号';
COMMENT ON COLUMN "SERVICE_LIST"."SJTGDW" IS '数据来源委办局';
COMMENT ON COLUMN "SERVICE_LIST"."WBJMC" IS '数据申请委办局';
COMMENT ON COLUMN "SERVICE_LIST"."TGXX" IS '提供信息';
COMMENT ON COLUMN "SERVICE_LIST"."CXTJ" IS '查询条件';
COMMENT ON COLUMN "SERVICE_LIST"."CXJG" IS '查询结果';
COMMENT ON COLUMN "SERVICE_LIST"."SQLSJY" IS 'SQL数据源';
COMMENT ON COLUMN "SERVICE_LIST"."SQLSTRING" IS 'SQL语句';
COMMENT ON COLUMN "SERVICE_LIST"."SFYX" IS '是否有效，0有效，1无效';
COMMENT ON COLUMN "SERVICE_LIST"."TEST" IS '测试用查询条件';
COMMENT ON COLUMN "SERVICE_LIST"."BZ" IS '备注';

-- ----------------------------
--  Table structure for QUERY_LOG
-- ----------------------------
CREATE TABLE "QUERY_LOG" (   "ID" NUMBER, "ORG_NAME" VARCHAR2(510BYTE), "SQL_ID" VARCHAR2(64BYTE), "REQUSEST_INFO" VARCHAR2(1024BYTE), "REQUEST_TIME" DATE, "RESPONSE_INFO" CLOB, "RESPONSE_TIME" DATE, "INFO_NUM" NUMBER);
COMMENT ON COLUMN "QUERY_LOG"."INFO_NUM" IS '记录条数';

------------------------------------------------------------------
--  SEQUENCE QUERY_LOG_SEQ
------------------------------------------------------------------

CREATE SEQUENCE QUERY_LOG_SEQ START WITH 1
                              INCREMENT BY 1
                              MAXVALUE 9999999999999999999999999999
                              NOMINVALUE
                              NOORDER
                              NOCYCLE
                              CACHE 20;