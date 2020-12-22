package codingcode;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by dlms on 2016/7/5.
 */
public class updateHtmlFile {
    static final String html ="F:\\ideaworkspace\\work\\dlcms\\WebContent\\WEB-INF\\t\\cms\\www\\red\\channel\\目录栏目_在线信息服务首页.html";
    static final String unspaceQueryJs = "F:\\ideaworkspace\\work\\dlcms\\WebContent\\ap\\js\\unspaceQuery.js";

    public static void main(String[] args){
        String Method=" XXHS";
        String desc="信息核实";
        int number=108;
        Map<String,String> params = new HashMap<String, String>();
        params.put("name","姓名");
        params.put("sfzjh","身份证件号");

        Map<String,Map<String,String>> showFields = new HashMap<String, Map<String,String>>();
        Map<String,String> showField = new HashMap<String, String>();
        showField.put("xm","姓名");
        showField.put("sfzh","身份证号");
        showField.put("jszh","驾驶证号");
        showField.put("yxq","有效期");
        showFields.put(Method,showField);

        updateHtmlFile(desc,Method,number,Method,params,showFields);
        updateUnspaceQueryFile(desc,Method,number,params,showFields);
        System.out.println("前端执行完成");

    }


    /*
      * Method:调用主方法（li:Id,后台方法,data值的key）
      * desc:方法描述
      * params: Map<String,String> Map<参数名，对应的描述>
      * number: div的id编号：P+number
      * showfields:Map<String,Map<String,String>> Map<dao方法名，Map<显示的字段,显示字段的描述>>
      *
    */
    public static void upadteFront(String Method,String desc,Map<String,String> params,int number,Map<String,Map<String,String>> showField){
        updateHtmlFile(desc,Method,number,Method,params,showField);
        updateUnspaceQueryFile(desc,Method,number,params,showField);
        System.out.println("前端执行完成");
    }


    //包含表头的html
    public static void updateHtmlFile(String desc,String Method,int number,String id,Map<String,String> param,Map<String,Map<String,String>> showField){
        String content = WriteReadFile.readFile(html);

        String splitJsWord="<!----codeCreatejs-->";
        String[] Part = splitWord(content,splitJsWord);
        String js = "    \r\n" +
                "    if(zxcxcd.indexOf('"+desc+"')>-1){\r\n" +
                "        $(\"#frxxcx\").show();\r\n" +
                "        $(\"#"+id+"\").show();\r\n" +
                "        if(i==0) i="+number+";\r\n" +
                "    }\r\n"
                +"     if(i=="+number+") changeDiv($(\"#"+id+" a\"),"+number+");";

        String splitLiWord="<!----codeCreateli-->";
        String[] liPart = splitWord(Part[0]+splitJsWord+js+Part[1],splitLiWord);
        String li = " \r\n                                <li id=\""+id+"\" style=\"display:none\"><a href=\"#\" onclick=\"changeDiv(this,"+number+");\">"+desc+"</a></li>";

        String splitDivWord="<!----codeCreatediv-->";
        String paramElement ="";
        for (String key : param.keySet()) {
            paramElement=paramElement
                    +"                                <span>"+param.get(key)+"：<input type=\"text\"  id=\"p"+number+"_"+key+"\"  value=\"\" style=\"width:180px;\" class=\"text\" /></span>\r\n" ;
        }

        String getTable = "";
        for (String key : showField.keySet()) {
            String field = "";
            for (String fieldkey : showField.get(key).keySet()) {
                field = field + "                                  <th>" + showField.get(key).get(fieldkey) + "</th> \r\n";
            }
           getTable=getTable+
                    "                            <table cellspacing=\"1\" style=\"height:auto;width:778px;\">\r\n" +
                    "                                 <thead>\r\n" +
                                                         field+
                    "                                 </thead>\r\n"+
                    "                                <tbody id=\"p"+number+key+"table\">\r\n" +
                    "                                </tbody>\r\n" +
                    "                            </table>\r\n" +
                    "                          <div id=\"p"+number+key+"fy\"></div>\r\n";
        }

        String[] divPart = splitWord(liPart[0]+splitLiWord+li+liPart[1],splitDivWord);
        String div = "  \r\n                    <!--"+desc+"开始-->\r\n" +
                "\r\n                    <div class=\"right\" id=\"p"+number+"\" style=\"display:none;\">\r\n" +
                "                        <form id=\"p"+number+"form\">\r\n" +
                "                            <div class=\"top1\" style=\"height:auto;width:770px;\">\r\n" +
                paramElement +
                "                                <div class=\"anniu\">\r\n" +
                "                                    <input type=\"button\" class=\"btn1\" onclick=\"queryp"+number+"_"+Method+"();\" />\r\n" +
                "                                    <input type=\"button\" class=\"btn2\" onclick=\"restP"+number+"Form();\" />\r\n" +
                "                                </div>\r\n" +
                "                            </div>\r\n" +
                "                        </form>\r\n" +
                "                        <h4>"+desc+"结果</h4>\r\n" +
                "                        <div style=\"height:auto;width:778px;overflow-x: auto\">\r\n" +
                                        getTable+
                "                        </div>\r\n" +
                "                    </div>\r\n" +
                "               <!--"+desc+"结束-->\r\n";

        WriteReadFile.writeFile(divPart[0]+splitDivWord+div+divPart[1],html);
    }

    //包含表头的js
    public static void updateUnspaceQueryFile(String desc,String Method,int number,Map<String,String> param, Map<String,Map<String,String>> showField){
        String content = WriteReadFile.readFile(unspaceQueryJs);
        String values ="";
        String data = "";
        String reset="";
        String check="";
        if(!param.isEmpty()) {
            for (String key : param.keySet()) {
                reset = reset + "    $(\"#p" + number + "_" + key + "\").val('');\r\n";
                values = values + "    var " + key + "= $(\"#p" + number + "_" + key + "\").val();\r\n";
                check = check + "    if(" + key + "==''){\r\n       alert('" + param.get(key) + "不能为空'); \r\n        return;\r\n     }\r\n";
                data = data + key + ":" + key + ",";
            }
            data = data.substring(0, data.length() - 1);
        }

        String getData="";
        for (String key : showField.keySet()) {
            String field="";
            for (String fieldkey : showField.get(key).keySet()) {
                field = field + "                         tbody = tbody + '  <td>'+checkUndefind(value['" + fieldkey.toUpperCase() + "'])+'</td>  ';\r\n";
            }
           getData=getData+ "               var "+key+" = data['data']['"+key+"'];\r\n" +
                    "                if("+key+"!=undefined){\r\n"+
                    "                   var len = "+key+".length;\r\n" +
                    "                   var tbody = '';\r\n" +
                    "                    for (var a = 0; a < len; a++) {\r\n" +
                    "                        if(a>8){\r\n" +
                    "                            tbody = tbody + \"<tr id='p"+number+key+"tr\"+a+\"' style='display:none;' >\";\r\n" +
                    "                       }else{\r\n" +
                    "                           tbody = tbody + \"<tr id='p"+number+key+"tr\"+a+\"' >\";\r\n" +
                    "                       }\r\n" +
                    "                       var value = "+key+"[a];\r\n" +
                                            field+
                    "                       tbody = tbody  +\"</tr>\";\r\n" +
                    "                   }\r\n" +
                    "                   $(\"#p"+number+key+"table\").html(tbody);\r\n" +
                    "                    if(len>9){//添加分页\r\n" +
                    "                      $(\"#p"+number+key+"fy\").html(\"<div id='kkpagerGis'></div>\");\r\n" +
                    "                      kkpagerinitbyId('p"+number+key+"',1,len,9);\r\n" +
                    "                   }\r\n"+
                    "                }\r\n";

        }
        //查询方法
        String another = " ///------------------------------"+desc+"开始--------------------\r\n" +
                "function queryp"+number+"_"+Method+"(){\r\n" +
                    values +check+
                "    $.ajax({\r\n" +
                "        url: baseUrl+'get"+Method+"?'+t,\r\n" +
                "        dataType : 'jsonp',\r\n" +
                "        jsonp : \"jsonpcallback\",\r\n" +
                "        data : {"+data+"},\r\n" +
                "        success : function(data) {\r\n" +
                "            if(data!=undefined && data['data']['"+Method+"'].length>0){\r\n" +
                                getData+
                "            }else{\r\n" +
                "                alert(\"没有查询到数据！\");\r\n" +
                "            }\r\n" +
                "        },\r\n" +
                "        error : function(response) {\r\n" +
                "            alert(response);\r\n" +
                "        },\r\n" +
                "        timeout:6000\r\n" +
                "    });\r\n" +
                "}\r\n" +
                "//------------------------------"+desc+"结束--------------------\r\n";

        //重置方法
        String resetF="function restP"+number+"Form(){\r\n" + reset+ "}\r\n";

        WriteReadFile.writeFile(content+another+resetF,unspaceQueryJs);

    }

    public static String[] splitWord(String content,String splitStr){
        String[] Part = content.split(splitStr);
        return  Part;
    }

}
