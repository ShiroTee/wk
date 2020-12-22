package com.digitalchina.ldp.app.csdsc.bean;
 
import java.text.SimpleDateFormat;
import java.util.Date;

/**
* 类描述：文件 Bean
* 创建人：luo
* 创建时间：2014-7-8
* @version    
*/

public class FileBean {

    //类型：文件夹,文件,提示
    public enum FileType {

        folder, file, info
    };
    private String name; //文件名
    private String path; //文件路径
    private FileType type; //文件类型
    private long size; //文件大小
    private Date lastModified; //最后修改时间

    //空构造
    public FileBean() {
    }

    //复写 toString
    @Override
    public String toString() {
        return "FileBean{" + "name=" + name + ", path=" + path + ", type=" + type + ", size=" + size + ", lastModified=" + lastModified + '}';
    }

    public String getDisplayString() {
        String s = "类型：" + (type.equals(FileType.file)?"文件":"文件夹") + "\n"
                + "名称：" + name + "\n"                
                + "路径：" + path + "\n"
                + "文件大小：" + size + "字节\n"
                + "最后修改时间：" + new SimpleDateFormat().format(lastModified);                
        return s;
    }

    //getter & setter
    public Date getLastModified() {
        return lastModified;
    }

    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }

    public FileType getType() {
        return type;
    }

    public void setType(FileType type) {
        this.type = type;
    }
}
