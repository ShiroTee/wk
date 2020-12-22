package com.digitalchina.ldp.app.osp.bean;

import javax.persistence.Transient;

/**
 * 
 * 教程基本信息
 *
 */
public class CourseSimpleBean {
	
	@Transient
	private String courseName;
	@Transient
	private String courseType;
	
	public String getCourseName() {
		return courseName;
	}
	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}
	public String getCourseType() {
		return courseType;
	}
	public void setCourseType(String courseType) {
		this.courseType = courseType;
	}
	
	
}
