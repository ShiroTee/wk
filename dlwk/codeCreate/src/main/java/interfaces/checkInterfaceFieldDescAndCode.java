package interfaces;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;
import rktpSqlBuild.JDBCUtil;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class checkInterfaceFieldDescAndCode {
    private ResultSet rs = null;

    public static void main(String[] args) throws Exception {
        new checkInterfaceFieldDescAndCode().getAllTableName();
    }

    //查询所有的表，并遍历所有的表；
    public void getAllTableName() throws Exception {
        String sql="select * from interface_config t";
        try {
            rs = JDBCUtil.execute(sql);
        } catch (Exception e) {
            e.printStackTrace();
        }
        while (rs.next()) {

            String table=rs.getString("INTERFACE_NAME");
            if(table.equals("日志")){

            }else {
                String name = rs.getString("DATA_FIELD");
                String code = rs.getString("DATA_FIELD_DESC");
                String[] names = name.split(",");
                String[] codes = code.split(",");
                if (names.length != codes.length) {

                    System.out.println(table);
                }
            }
        }
    }
}