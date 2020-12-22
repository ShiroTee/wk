<%@ page language="java" pageEncoding="UTF-8" %>
<div class="mr20">
    <div class="col-sm-12" style="padding:0;">
        
        <div class="space"></div>
        <div class="space"></div>
    </div>
</div>
<input type="file" id="import-data-file" name="file"
       style="display: none;" accept=".xls,.xlsx"/>
<link rel="stylesheet" type="text/css"
      href="${ctx}/resources/plugins/webuploader/webuploader.css">
<script type="text/javascript"
        src="${ctx}/resources/plugins/webuploader/webuploader.js"></script>

<script>
    var ctx = "${ctx }";
    $(function () {
        $("#edit-password-2002").click(function () {
            $.modal({
                url: "user/password.html",
                data: {
                    userId: "${userId}"
                }
            });
        });
    });
</script>