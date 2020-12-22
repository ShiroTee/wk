package com.digitalchina.ldp.app.sps.bean;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

@SuppressWarnings("serial")
@Table(name = "Asset")
@Entity
public class AssetWithApplyStatistics extends ResourceCatalogueInfo {
  @Transient
  private int applyQuantity;

  public int getApplyQuantity() {
    return applyQuantity;
  }

  public void setApplyQuantity(int applyQuantity) {
    this.applyQuantity = applyQuantity;
  }

}
