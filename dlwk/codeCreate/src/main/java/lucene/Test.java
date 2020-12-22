package lucene;

/**
 * Created by dlms on 2016/8/9\\.
 */
public class Test {
    public static void main(String[] args){
            // TODO Auto-generated method stub
            //js代码的替换
            // var strTemp="^&h\\/!@#$%^&*()+|/jgfj&%fgd''$#$@!)(}|";
            // strTemp\\.replace(/[$ <> & % ' ( ) + - = " ; / ]/g, "")

            //一种解决SQL盲注的后台过虑，其方式就是将可能出现的非法字符进行规制
            //java代码替换特殊字符
            String str="^&h\\/!@#$%^&*()+|/jgfj&%fgd''$#$@!)(}|selectoooinsertadmin--";
        String badStr = "(\\.*and\\.*)|(\\.*exec\\.*)|(\\.*execute\\.*)|(\\.*insert\\.*)|(\\.*select\\.*)|(\\.*delete\\.*)|(\\.*update\\.*)|(\\.*count\\.*)|(\\.*drop\\.*)|(\\.*\\.*\\.*)|(\\.*%\\.*)|(\\.*chr\\.*)|(\\.*mid\\.*)|(\\.*master\\.*)|(\\.*truncate\\.*)|(\\.*" +
                "char\\.*)|(\\.*declare\\.*)|(\\.*sitename\\.*)|(\\.*or\\.*)|(\\.*create\\.*)|(\\.*drop\\.*)|(\\.*" +
                "table\\.*)|(\\.*from\\.*)|(\\.*grant\\.*)|(\\.*use\\.*)|(\\.*union\\.*)|(\\.*where\\.*)|(\\.*select\\.*)|(\\.*delete\\.*)|(\\.*update\\.*)|(\\.*order\\.*)|(\\.*by\\.*)|(\\.*count\\.*)|(\\*)|(\\.*" +
                "chr\\.*)|(\\.*mid\\.*)|(\\.*master\\.*)|(\\.*truncate\\.*)|(\\.*char\\.*)|(\\.*declare\\.*)|(\\.*like\\.*)";
        String badStr2="(^|\\&)|(\\|)|(\\;)|(\\$)|(\\%)|(\\-)|(\\-\\-)|(\\@)|(\\')|(\\\")|(\\>)|(\\<)|(\\))|(\\()|(\\+)|(\\,)|(\\\\)|(\\#|$)";
            if(str!=null){
                // Pattern p = Pattern\\.compile("\\s*|| | ");
                //System\\.out\\.println("before:" + str);
                // Matcher m = p\\.matcher(str);
                String result = str.replaceAll(badStr,"");
                String result2= result.replaceAll(badStr2,"");
                System.out.println("result:" + result2);
                //输出结果：result:^h/!^*/jgfjfgd!}
            }

        }
}
