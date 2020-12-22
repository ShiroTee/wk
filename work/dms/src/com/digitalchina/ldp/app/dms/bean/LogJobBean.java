package com.digitalchina.ldp.app.dms.bean;

import java.io.Serializable;
import java.sql.Clob;
import java.util.Date;

public class LogJobBean
        implements Serializable
{
    private String jobId;
    private String isRepeat;
    private String dir;
    private Integer idJob;
    private String channelId;
    private String jobName;
    private String status;
    private Integer linesRead;
    private Integer linesWritten;
    private Integer linesupdated;
    private Integer linesInput;
    private Integer linesOutput;
    private Integer linesRejected;
    private Integer errors;
    private String startDate;
    private String endDate;
    private String logDate;
    private Date depDate;
    private String replayDate;
    private String govName;
    private String id_directory;
    private String id_root;
    private Clob logField;

    public String getDir()
    {
        return this.dir;
    }

    public void setDir(String dir) {
        this.dir = dir;
    }

    public String getJobId() {
        return this.jobId;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }

    public String getIsRepeat() {
        return this.isRepeat;
    }

    public void setIsRepeat(String isRepeat) {
        this.isRepeat = isRepeat;
    }

    public String getId_directory() {
        return this.id_directory;
    }

    public void setId_directory(String idDirectory) {
        this.id_directory = idDirectory;
    }

    public String getId_root() {
        return this.id_root;
    }

    public void setId_root(String idRoot) {
        this.id_root = idRoot;
    }

    public String getLogDate() {
        return this.logDate;
    }

    public void setLogDate(String logDate) {
        this.logDate = logDate;
    }

    public String getReplayDate() {
        return this.replayDate;
    }

    public void setReplayDate(String replayDate) {
        this.replayDate = replayDate;
    }

    public String getGovName() {
        return this.govName;
    }

    public void setGovName(String govName) {
        this.govName = govName;
    }

    public Integer getIdJob() {
        return this.idJob;
    }

    public void setIdJob(Integer idJob) {
        this.idJob = idJob;
    }

    public String getChannelId() {
        return this.channelId;
    }

    public void setChannelId(String channelId) {
        this.channelId = channelId;
    }

    public String getJobName() {
        return this.jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getLinesRead() {
        return this.linesRead;
    }

    public void setLinesRead(Integer linesRead) {
        this.linesRead = linesRead;
    }

    public Integer getLinesWritten() {
        return this.linesWritten;
    }

    public void setLinesWritten(Integer linesWritten) {
        this.linesWritten = linesWritten;
    }

    public Integer getLinesupdated() {
        return this.linesupdated;
    }

    public void setLinesupdated(Integer linesupdated) {
        this.linesupdated = linesupdated;
    }

    public Integer getLinesInput() {
        return this.linesInput;
    }

    public void setLinesInput(Integer linesInput) {
        this.linesInput = linesInput;
    }

    public Integer getLinesOutput() {
        return this.linesOutput;
    }

    public void setLinesOutput(Integer linesOutput) {
        this.linesOutput = linesOutput;
    }

    public Integer getLinesRejected() {
        return this.linesRejected;
    }

    public void setLinesRejected(Integer linesRejected) {
        this.linesRejected = linesRejected;
    }

    public Integer getErrors() {
        return this.errors;
    }

    public void setErrors(Integer errors) {
        this.errors = errors;
    }

    public String getStartDate() {
        return this.startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return this.endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public Date getDepDate() {
        return this.depDate;
    }

    public void setDepDate(Date depDate) {
        this.depDate = depDate;
    }

    public Clob getLogField() {
        return this.logField;
    }

    public void setLogField(Clob logField) {
        this.logField = logField;
    }
}