package com.digitalchina.ldp.app.dms.common.util.quarts;

import java.io.Serializable;

public class JobRunManagerBean
        implements Serializable {
    private static final long serialVersionUID = -7190099247695744403L;
    private String jobId;
    private String jobName;
    private String jobDirectoryDir;
    private String isRepeat;
    private String gapTime;
    private String isExecute;
    private String status;

    public String getJobName() {
        return this.jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public String getIsRepeat() {
        return this.isRepeat;
    }

    public void setIsRepeat(String isRepeat) {
        this.isRepeat = isRepeat;
    }

    public String getGapTime() {
        return this.gapTime;
    }

    public void setGapTime(String gapTime) {
        this.gapTime = gapTime;
    }

    public String getIsExecute() {
        return this.isExecute;
    }

    public void setIsExecute(String isExecute) {
        this.isExecute = isExecute;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getJobDirectoryDir() {
        return this.jobDirectoryDir;
    }

    public void setJobDirectoryDir(String jobDirectoryDir) {
        this.jobDirectoryDir = jobDirectoryDir;
    }

    public String getJobId() {
        return this.jobId;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }
}