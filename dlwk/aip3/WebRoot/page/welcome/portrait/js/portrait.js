$(document)
		.ready(
				function() {
					getUserInfo=function(d){
						this.userinfo = d.userinfo.data[0];
						this.idpic    = d.userinfo.id_picture;
					}
					showTags = function(data) {
						//
						var datajson1=[];
						var datai=0;
						for (var key in data){
							if(key=="userinfo")continue;
							var datas ={};
							datas.key=key;
							//
							var children=null;
							for(keyn=0;keyn<data[key].length;keyn++){
								if(children == null){
							    	children = data[key][keyn].tableDesc+"="+ data[key][keyn].tableName+"-"+data[key][keyn].columnName+"-"+data[key][keyn].columnDesc+"-"+data[key][keyn].tableId+"-"+data[key][keyn].dbconnection+"-"+data[key][keyn].tableDesc;
							    }else{
							    	children +=";"+ data[key][keyn].tableDesc+"="+data[key][keyn].tableName+"-"+data[key][keyn].columnName+"-"+data[key][keyn].columnDesc+"-"+data[key][keyn].tableId+"-"+data[key][keyn].dbconnection+"-"+data[key][keyn].tableDesc;
							    }
							}
							//
							datas.children=children;
							datajson1.push(datas);
							datai++;
						}
						var tags={};
						tags.datas=datajson1;
						var html = $("#usertagTmp").render(tags);
						$("#usertags").html(  html );
						//
						$('.person_box').removeClass("show_info");
						$('.classify').html("");	
					}
					
					loadData = function() {
						idcard  = $("#searchIdinput").val();
						if(idcard==null || idcard == '') return;
						$.ajax({
							url : ctx + "/mdp/portrait/searchTag.json",
							type: 'POST',
							data:{idcard: idcard },
							success : function(d) {
								console.log(d);
								if(d.error){
									$('#infoid').modal('show');
									$('#infocontent').html( "来自服务【"+d.error_url+"】 信息: 【"+d.error_msg+"】" );
									//
									$("#userbaseinfo").html("");
									$("#userdetailinfo").html("");
									$("#usertags").html("");
									$("#tagcontentid").html("");
									$('.classify').html("");
									$('.person_box').removeClass('show_info');
									$('.left_area .base_info').removeClass('more_info_show');
									//
									return;	
								}
								if(d==null ) {
									$("#msgId").html("未查询到相关数据");
									return;	
								}
								getUserInfo(d);
                                showInfo();
                                showTags(d);
							}
						});
					}
					
					showInfo=function(){
						xb=userinfo['性别'];
						$("#xbpicw").hide();
						$("#xbpicm").hide();
						if(xb=="女"){
							$("#xbpic").html('<img  id="xbpicw"  src="'+ctx+'/page/welcome/portrait/images/womansvg.svg" />') ;
						}else{
							$("#xbpic").html('<img  id="xbpicw"  src="'+ctx+'/page/welcome/portrait/images/mansvg.svg" />') ;
						}
						
						var datas = new Array();
						var datas2 = new Array();
						var i=0;
						for (var key in userinfo){
							if( i<5){
								var user = {};
								user.key = key;
								user.value= userinfo[key];
								datas.push(user);
							}else{
								var user = {};
								user.key = key;
								user.value= userinfo[key];
								datas2.push(user);
							}
							i++;
						}
						 
						//
						users={};
						users.datas=datas;
						users.datas2=datas2;
						var reg=new RegExp("null"+"$");    
						if(reg.test(this.idpic)){
							users.idpic='';
						}else{
							users.idpic=this.idpic;
						}
						
						html = $("#infoTmp").render(users);
						$("#userbaseinfo").html(html);
						
						$("#userdetailinfo").html($("#moreinfoTmp").render(users));
					}
					
					searchTag = function(e){
						$("svg").remove();
						$("#portraitId").hide();
						$("#infoid,#basicId").html("");
						$("#msgId").html("");
						loadData();
					}
					
					seachDetail=function(obj){
						var searchvalues= $(obj).attr("values");
						$.ajax({
							url : ctx + "/mdp/portrait/searchTagDetail.json",
							type: 'POST',
							data:{idcard: idcard,searchValues: searchvalues},
							success : function(d) {
								
								if(d.error){
									//$("#msgId").html("服务地址:"+d.error_url+" ;【"+d.error_msg+"】");
									return;	
								}
								
								 details={};
								 var detailArray = new Array();
								 for(i=0;i<d.length;i++){
									 detail = {};
									 tempd = d[i];
									 detail.name=tempd.name;
									 var datas = new Array();
									 n=0;
									 for (var key in tempd.map){
										 values = {};
										 values.key=key;
										 values.value= tempd.map[key];
										 datas[n]=values;
										 n++;
									 }
									 detail.datas=datas;
									 detailArray[i]=detail;
								 }
								 details.result  = detailArray;
								 
								 html = $("#tagdetailTemp").render(details);
								  
								 $(obj).next("div").html(html);
								 $(obj).next().slideDown();
							}
						});						
					}
					main = function() {
						 
						loadData();
						$("#searchIdbutton").on("click",function(){
							loadData();
						});
						
					}
					modelExist($("[data-modecode]").attr("data-modecode"));
					main();
				});
