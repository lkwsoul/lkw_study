package com.mybatis.demo.base.vo;

import java.io.Serializable;
import java.util.Date;

public abstract class BaseVO implements Serializable
{
  private static final long serialVersionUID = 1L;
  
  private int id;
  private Date createdOn;
  private int createdBy;
  private Date modifiedOn;
  private int modifiedBy;
  private boolean active;
  
  public int getId() {
    return id;
  }
  public void setId(int id) {
    this.id = id;
  }
  public Date getCreatedOn() {
    return createdOn;
  }
  public void setCreatedOn(Date createdOn) {
    this.createdOn = createdOn;
  }
  public int getCreatedBy() {
    return createdBy;
  }
  public void setCreatedBy(int createdBy) {
    this.createdBy = createdBy;
  }
  public Date getModifiedOn() {
    return modifiedOn;
  }
  public void setModifiedOn(Date modifiedOn) {
    this.modifiedOn = modifiedOn;
  }
  public int getModifiedBy() {
    return modifiedBy;
  }
  public void setModifiedBy(int modifiedBy) {
    this.modifiedBy = modifiedBy;
  }
  public boolean isActive() {
    return active;
  }
  public void setActive(boolean active) {
    this.active = active;
  }
}
