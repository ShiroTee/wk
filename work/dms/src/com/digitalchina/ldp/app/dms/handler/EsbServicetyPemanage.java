package com.digitalchina.ldp.app.dms.handler;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.handler.AbstractExtHandler;
import org.springframework.stereotype.Component;
@Component
public class EsbServicetyPemanage extends AbstractExtHandler {
    @Override
    public ViewModel page(Model model) {
        ViewModel viewModel = new ViewModel("page/esblog/esbservicetypemanage.jsp",
                "page/esblog/esbservicetypemanage.js");
        return viewModel;
    }
}
