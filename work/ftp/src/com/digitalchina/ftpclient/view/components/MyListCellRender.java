package com.digitalchina.ftpclient.view.components;

import com.digitalchina.ftpclient.model.bean.FileBean;
import javax.swing.*;
import java.awt.*;

/**
* 类描述：ListCellRender实现类，用于将 JList 中的数据显示为图片加文字的形式
* 创建人：luo
* 创建时间：2014-7-8
* @version    
*/
 
public class MyListCellRender extends JLabel implements ListCellRenderer {

    private boolean m_selected = false;

    @Override
    public Component getListCellRendererComponent(JList list, Object value,
                                                  int index, boolean isSelected, boolean cellHasFocus) {
        if (value instanceof FileBean) {
            FileBean data = (FileBean) value;
            //根据文件的类型设置不同的图片
            if(data.getType().equals(FileBean.FileType.file)){ 
                setIcon(new ImageIcon(this.getClass().getClassLoader().getResource("com/digitalchina/ftpclient/view/components/file.png")));                
            }else if(data.getType().equals(FileBean.FileType.folder)){
                setIcon(new ImageIcon(this.getClass().getClassLoader().getResource("com/digitalchina/ftpclient/view/components/folder.png")));
            }else if(data.getType().equals(FileBean.FileType.info)){
                setIcon(new ImageIcon(this.getClass().getClassLoader().getResource("com/digitalchina/ftpclient/view/components/info.png")));
            }
            setText(data.getName());
        } 
        m_selected = isSelected;
        if (isSelected) {
            setBackground(Color.LIGHT_GRAY);
        }else {
            setBackground(Color.WHITE);
        }
        return this;
    }

    //重绘List中选中部分的背景
    @Override
    public void paintComponent(Graphics g) {
        Color bColor = getBackground();
        Icon icon = getIcon();
        g.setColor(bColor);
        int offset = 0;
        if (icon != null && getText() != null)
        g.fillRect(offset, 0, getWidth() - 1 - offset, getHeight() - 1);
        if (m_selected) {
            g.draw3DRect(offset, 0, getWidth() - 1 - offset, getHeight() - 1, true);
        }
        super.paintComponent(g);
    }

}
