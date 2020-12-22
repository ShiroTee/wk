在Linux制作定时任务
crontab -e 编辑系统定时任务时间，添加如下语句：每天一点一分执行。
01 1 * * * java -jar  /Oracle/Middleware/user_projects/domains/luceneTimer/luceneTimer.jar >> /Oracle/Middleware/user_projects/domains/luceneTimer/luceneTimer.log 2>&1
