package com.digitalchina.ldp.app.sps.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.sps.service.AccreditationService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.common.annotation.HttpService;

@Component
public class AccreditationHandler {
  @Autowired
  private AccreditationService accreditationService;
  
  @HttpService
  public String grant(Model model){
    String proposerId = model.getValue("proposerId");
    
    return null;
  }
}
