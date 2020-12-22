package com.digitalchina.ldp.app.sps.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Table(name="VOUCHER")
@Entity
public class VoucherInfo {
  @Id
  @Column(name = "ID")
  private String id;// ID
  @Column(name = "PROPOSER_ID")
  private String proposerId;// 申请人id
  @Column(name = "PROPOSER_NAME")
  private String proposerName;// 申请人姓名
  @Column(name = "PROPOSER_ORG_NAME")
  private String proposerOrgName;// 申请人部门名称
  @Column(name = "VOUCHER_INDEX")
  private String voucherIndex;
  
  @Column(name = "ASSET_ID", length = 40, nullable = false)
  @ManyToOne
  private ResourceCatalogueInfo resource;
  @Column(name = "PRINT_TIME")
  private Date printTie;
  
  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getProposerId() {
    return proposerId;
  }

  public void setProposerId(String proposerId) {
    this.proposerId = proposerId;
  }

  public String getProposerName() {
    return proposerName;
  }

  public void setProposerName(String proposerName) {
    this.proposerName = proposerName;
  }

  public String getProposerOrgName() {
    return proposerOrgName;
  }

  public void setProposerOrgName(String proposerOrgName) {
    this.proposerOrgName = proposerOrgName;
  }

  public String getVoucherIndex() {
    return voucherIndex;
  }

  public void setVoucherIndex(String voucherIndex) {
    this.voucherIndex = voucherIndex;
  }

  public Date getPrintTie() {
    return printTie;
  }

  public void setPrintTie(Date printTie) {
    this.printTie = printTie;
  }

  public ResourceCatalogueInfo getResource() {
    return resource;
  }

  public void setResource(ResourceCatalogueInfo resource) {
    this.resource = resource;
  }

}
