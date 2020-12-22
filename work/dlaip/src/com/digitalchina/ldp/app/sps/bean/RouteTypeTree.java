package com.digitalchina.ldp.app.sps.bean;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class RouteTypeTree implements Serializable{
	  private static final long serialVersionUID = 5333862723190583703L;
	  private String text;
	  private String id;
	  private List<RouteTypeTree> children = new ArrayList<RouteTypeTree>();

	  public List<RouteTypeTree> getChildren() {
	    return this.children;
	  }

	  public RouteTypeTree (RouteTypeInfo rtInfo) {
	    this.text = rtInfo.getTypeName();
	    this.id = rtInfo.getServTypeId();
	  }

	  public String getText() {
	    return this.text;
	  }

	  public void setText(String text) {
	    this.text = text;
	  }

	  public String getId() {
	    return this.id;
	  }

	  public void setId(String id) {
	    this.id = id;
	  }

	  public boolean isLeaf() {
	    if (this.children.isEmpty())
	    { 
	      return true;
	    }
	    return false;
	  }
};