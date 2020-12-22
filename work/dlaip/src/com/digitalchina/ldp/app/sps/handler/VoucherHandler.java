package com.digitalchina.ldp.app.sps.handler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.sps.bean.VoucherInfo;
import com.digitalchina.ldp.app.sps.service.VoucherService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.handler.AbstractHandler;

@Component
public class VoucherHandler  extends AbstractHandler{
  @Autowired
  private VoucherService voucherService;
  
  /**
   * 保存授权单信息
   * @param model
   * @return
   */
  @HttpService
  public String saveVoucher(Model model){
    String[] assetList = model.getValue("assetList").split(",");
    String proposerId = model.getValue("proposerId");
    String voucherIndex = model.getValue("voucherIndex");
    voucherService.saveVoucher(assetList, voucherIndex, proposerId);
    return "{success:true}";
  }
  
  /**
   * 对一张授权单进行完全授权
   * @param model
   * @return
   */
  @HttpService
  public String grantEntireVoucher(Model model){
    String voucherIndex = model.getValue("voucherIndex");
    voucherService.addAccreditationForVoucher(voucherIndex);
    return "{success:true}";
  }
  
  /**
   * 加载一张授权单的数据
   * @param model
   * @return
   */
  @HttpService
  public List<VoucherInfo> loadVoucher(Model model){
    String voucherIndex = model.getValue("voucherIndex");
    List<VoucherInfo> voucherList=voucherService.load(voucherIndex);
    return voucherList;
  }
}
