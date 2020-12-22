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


public class checkInterfaceField {
    private ResultSet rs = null;

    public static void main(String[] args) throws Exception {
        new checkInterfaceField().getAllTableName();
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

            String name = rs.getString("INTERFACE_NAME");
            String desc = rs.getString("DATA_FIELD_DESC");

            if("".equals(desc)|| name.equals("日志")){

            }else {
                String[] array = desc.split(",");

                String select = "select * from interface_desc where NAME='" + name + "'";
                List<Map<String, String>> list = getListData(select);

                    for (int i = 0; i < list.size(); i++) {
                        Map<String, String> row = list.get(i);
                        boolean flag = false;
                        String item_name = row.get("ITEM_NAME");
                        for (int j = 0; j < array.length; j++) {
                            String item = array[j];

                            if (item.equals(item_name)) {
                                flag = true;
                                //System.out.print(item);
                            }

                        }
                    if (flag == false) {
                        System.out.println(name + "--" + item_name);
                    } else {
                        //System.out.println("-存在-" + item_name+"-----"+name);
                    }
                }

            }
        }
    }

    public static String converterToFirstSpell(String chines) {
        String pinyinName = "";
        char[] nameChar = chines.toCharArray();
        HanyuPinyinOutputFormat defaultFormat = new HanyuPinyinOutputFormat();
        defaultFormat.setCaseType(HanyuPinyinCaseType.LOWERCASE);
        defaultFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
        for (int i = 0; i < nameChar.length; i++) {
            String s = String.valueOf(nameChar[i]);
            if (s.matches("[\\u4e00-\\u9fa5]")) {
                try {
                    String[] mPinyinArray = PinyinHelper.toHanyuPinyinStringArray(nameChar[i], defaultFormat);
                    pinyinName += mPinyinArray[0].substring(0,1);
                } catch (BadHanyuPinyinOutputFormatCombination e) {
                    e.printStackTrace();
                }
            } else {
                pinyinName += nameChar[i];
            }
        }
        return pinyinName;
    }

   public List getListData(String sql){
       ResultSet rs2=null;
       try {
           rs2 = JDBCUtil.execute(sql);
       } catch (Exception e) {
           e.printStackTrace();
       }

       ResultSetMetaData md = null;
       try {
           md = rs2.getMetaData();
       } catch (SQLException e) {
           e.printStackTrace();
       }
       int columnCount = 0; // 获得列数
       try {
           columnCount = md.getColumnCount();
       } catch (SQLException e) {
           e.printStackTrace();
       }
       String[] columns = new String[columnCount];
       for (int i = 0; i < columnCount; i++) {
           try {
               columns[i] = md.getColumnName(i + 1);
           } catch (SQLException e) {
               e.printStackTrace();
           }
       }
       List<Map<String,String>> list = new ArrayList<Map<String,String>>();
       try {
           while (rs2.next()) {
               HashMap<String,String> rowData = new HashMap<String,String>();
               for (int i = 0; i < columnCount; i++) {
                   Object cols_value = rs2.getObject(columns[i]);
                   rowData.put(columns[i],
                           cols_value == null ? "" : cols_value.toString());
               }
               list.add(rowData);
           }
       } catch (SQLException e) {
           e.printStackTrace();
       }

       return list;
   }
}