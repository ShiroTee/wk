package com.digitalchina.ldp.app.osp.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * 教程信息
 * Created by zhanglei on 15/4/28.
 */
@SuppressWarnings("serial")
@Table(name = "COURSE_INFO")
@Entity
public class CourseBean {
    @Id
    @Column(name = "COURSE_ID", length = 36)
    private String courseId;//教程id
    @Column(name = "COURSE_TYPE", length = 50)
    private String courseType;//教程类型
    @Column(name = "COURSE_URL")
    private String courseUrl;//教程存放路径
    @Column(name = "COURSE_DESC",length = 4000)
    private String courseDesc;//教程简介
    @Column(name = "COURSE_MODE")
    private String courseMode;//教程分类
    @Column(name = "COURSE_SIZE")
    private Long courseSize;//教程大小
    @Column(name = "CREATE_TIME")
    private Date createTime;//创建时间
    @Column(name = "COURSE_STATUS", length = 1)
    private String courseStatus;//教程状态
    @Column(name = "COURSE_NAME")
    private String courseName;//教程名称
    @Column(name = "IMG_URL")
    private String imgUrl;//教程名称

    public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getCourseType() {
        return courseType;
    }

    public void setCourseType(String courseType) {
        this.courseType = courseType;
    }

    public String getCourseUrl() {
        return courseUrl;
    }

    public void setCourseUrl(String courseUrl) {
        this.courseUrl = courseUrl;
    }

    public String getCourseDesc() {
        return courseDesc;
    }

    public void setCourseDesc(String courseDesc) {
        this.courseDesc = courseDesc;
    }

    public String getCourseMode() {
        return courseMode;
    }

    public void setCourseMode(String courseMode) {
        this.courseMode = courseMode;
    }

    public Long getCourseSize() {
        return courseSize;
    }

    public void setCourseSize(Long courseSize) {
        this.courseSize = courseSize;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getCourseStatus() {
        return courseStatus;
    }

    public void setCourseStatus(String courseStatus) {
        this.courseStatus = courseStatus;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }
}
