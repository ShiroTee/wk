package com.digitalchina.ftpclient.view;


import java.awt.Toolkit;
import javax.swing.JOptionPane;
import com.digitalchina.common.util.PropertiesUtil;
import com.digitalchina.ftpclient.controller.Controller;
import com.digitalchina.ftpclient.model.Model;

/**
* 类描述：：CA登录认证
* 创建人：luo
* 创建时间：2014-7-8
* @version 
*/
 
public class CAlogin {
	 
	public static void main(String[] args) {
		 
		    String IP=PropertiesUtil.getValueBykey("ftpIP");
		    String port=PropertiesUtil.getValueBykey("ftpPort");
		    
			if("".equals(IP)||"".equals(port))
			{
				Toolkit.getDefaultToolkit().beep();
				JOptionPane.showMessageDialog(null, "配置文件不正确：\n        FTP服务器的IP、端口不能为空，请检查配置文件是否正确！", "提示", JOptionPane.PLAIN_MESSAGE);
				System.out.println("配置文件不正确:FTP服务器的IP、端口不能为空，请检查配置文件是否正确！");  
			}else{
				Model model = new Model();//模型初始化
				Controller controller = new Controller(model);//控制器初始化
				MainFrame view = new MainFrame(model, controller);//视图层初始化
				view.setVisible(true);//显示界面
			}	
	}
}
