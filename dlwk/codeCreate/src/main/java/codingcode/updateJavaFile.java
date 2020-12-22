package codingcode;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by dlms on 2016/7/5.
 */
public class updateJavaFile {
    static final String basePath ="F:\\ideaworkspace\\work\\csdsc\\src\\com\\digitalchina\\ldp\\app\\csdsc\\";
    static final String handleName = "handler\\OnlineInformationHandler.java";
    static final String serviceName = "service\\OnlineInformationService.java";
    static final String serviceImplName = "service\\impl\\OnlineInformationServiceImpl.java";
    static final String daoName = "dao\\OnlineInformationDao.java";
    static final String daoImplName = "dao\\impl\\OnlineInformationDaoImpl.java";

    public static void main(String[] args){
        String Method="LYZF";
        String desc="旅游执法";
        Map<String,String> params = new HashMap<String, String>();
        params.put("name","车牌号码");
        String sql = "select * from rk_lgxx where lgmc like '%\"+name+\"%' and lgdh='\"+dhhm+\"'";
        Map<String,String> daoParams = new HashMap<String, String>();
        daoParams.put(Method,sql);
        updateBackFile(Method,desc,params,daoParams);
        System.out.println("java文件执行完成");

    }

    /*
       * Method:调用主方法（handle,service）
       * desc:方法描述
       * params: Map<String,String> Map<参数名，对应的描述>
       * daoParams:Map<String,String> Map<dao方法名，对应的sql>
       *
     */
    public static void updateBackFile(String Method,String desc,Map<String,String> params,Map<String,String> daoParams){

        updateHandleFile(desc,Method);
        updateServiceFile(Method);
        updateServiceImplFile(Method,params,daoParams);
        for(String key : daoParams.keySet()){
            updateDaoFile(key,params);
            updateDaoImplFile(key,params,daoParams.get(key));
        }

        System.out.println("java文件执行完成");

    }

    public static void updateHandleFile(String desc,String Method){
        String content = WriteReadFile.readFile(basePath+handleName);
        String Part = deleteWord(content);
        String another = "   /*\r\n" +
                "     * "+desc+"\r\n" +
                "    */\r\n" +
                "    @HttpService\r\n" +
                "    public Map<String,Object> get"+Method+"(Model model){\r\n" +
                "        DbContextHolder.setDefaultDbType(\"csdsc\");\r\n" +
                "        return this.onlineInformationService.get"+Method+"(model);\r\n" +
                "    }" +
                "\r\n}";
        WriteReadFile.writeFile(Part+another,basePath+handleName);
    }
    public static void updateServiceFile(String Method){
        String content = WriteReadFile.readFile(basePath+serviceName);
        String Part = deleteWord(content);
        String another = "    public Map<String,Object> get"+Method+"(Model model);\r\n}";
        WriteReadFile.writeFile(Part+another,basePath+serviceName);

    }
    public static void updateServiceImplFile(String Method,Map<String,String> names,Map<String,String> daoParams){
        String content = WriteReadFile.readFile(basePath+serviceImplName);
        String Part = deleteWord(content);
        String param="";
        String values="";
        if(!names.isEmpty()) {
            for (String key : names.keySet()) {
                param = param + key + ",";
                values = values + "\r\n        String " + key + "= model.getValueNotEmpty(\"" + key + "\");";
            }
            param = param.substring(0, param.length() - 1);
        }

        String getList ="";
        String mapPut="";
        for(String key : daoParams.keySet()){
            getList=getList+ "        List<Map<String,Object>> "+key+" = this.onlineInformationDao.get"+key+"("+param+");\r\n";
            mapPut=mapPut+"        map.put(\""+key+"\","+key+");\r\n";
        }


        String another = "   @Override\r\n" +
                "    public Map<String,Object> get"+Method+"(Model model){\r\n" +
                "        "+values+"\r\n" +
                        getList +
                "        Map<String,Object> map =new HashMap<String, Object>();\r\n" +
                         mapPut +
                "        return map;\r\n" +
                "    }\r\n}";
        WriteReadFile.writeFile(Part+another,basePath+serviceImplName);

    }

    public static void updateDaoFile(String Method,Map<String,String> names){
        String content = WriteReadFile.readFile(basePath+daoName);
        String Part = deleteWord(content);
        String param="";
        if(!names.isEmpty()) {
            for (String key : names.keySet()) {
                param = param + "String " + key + ",";
            }
            param = param.substring(0, param.length() - 1);
        }
        String another = "    public List<Map<String, Object>> get"+Method+"("+param+");\r\n}";
        WriteReadFile.writeFile(Part+another,basePath+daoName);
    }

    public static void updateDaoImplFile(String Method,Map<String,String> names,String sql){
        String content = WriteReadFile.readFile(basePath+daoImplName);
        String Part = deleteWord(content);
        String param="";
        if(!names.isEmpty()) {
            for (String key : names.keySet()) {
                param = param + "String " + key + ",";
            }
            param=param.substring(0,param.length()-1);
        }

        String another = "   @Override\r\n" +
                "   public List<Map<String, Object>> get"+Method+"("+param+"){\r\n" +
                "       String Sql =\""+sql+"\";\r\n" +
                "       System.out.println(Sql);\r\n" +
                "       List<Map<String,Object>> reslut = this.createJdbcTemplate().queryForList(Sql);\r\n" +
                "       return reslut;\r\n" +
                "   }\r\n}";
        WriteReadFile.writeFile(Part+another,basePath+daoImplName);
    }

    public static String deleteWord(String content){
        int location = content.lastIndexOf("}");
        String Part = content.substring(0,location);
        return  Part;
    }
}
