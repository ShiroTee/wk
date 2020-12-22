package com.digitalchina.ldp.app.sps.service;

import java.util.List;

import com.digitalchina.ldp.app.sps.bean.VoucherInfo;

public interface VoucherService {

  public void addAccreditationForVoucher(String voucherIndex);

  public List<VoucherInfo> load(String voucherIndex);

  public void add(VoucherInfo vi);
  
  public void saveVoucher(String[] assetList,String voucherIndex,String proposerId);

}
