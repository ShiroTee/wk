 
OpenWebGIS.Portal.API.CurentPageName = "";
OpenWebGIS.Portal.API.CurentCheckedElement = {};
OpenWebGIS.Portal.API.CacheLeftPages = {};
//OpenWebGIS.Portal.API.CacheRightPages = {};
 
 
		
OpenWebGIS.Portal.API.OnLoad = function(isMain)
{
	$("#pageCopyright").html(DigitalCity.CopyRight);
	$("#loadingDIV").fadeOut(800,function(){
						$("#bodyDiv").fadeIn(800);
						OpenWebGIS.Portal.API.SetEvents();
						OpenWebGIS.Portal.API.PageResize();
						$(window).resize(function(){window.setTimeout("OpenWebGIS.Portal.API.PageResize ();",200);});
						/*
						$(window).scroll( function() { 
												if($(window).scrollTop()>109)
												{
												 	 if($("#bodyContentCenterLeftDIV").parent().height()<$("#bodyContentCenterRightContentDIV").height())
													 	$("#bodyContentCenterLeftDIV").css("padding-top", ($(window).scrollTop()-108)+"px"); 
												}
												else $("#bodyContentCenterLeftDIV").css("padding-top", "6px"); 
												} );
						$(window).click( function() { alert($("#bodyContentCenterLeftDIV").parent().height())  } );*/
						
		  });
		  
    $.ajaxSetup ({ 
		//cache: true  
		});
}


OpenWebGIS.Portal.API.PageResize = function(recycle)
{
	if(typeof(recycle)=="undefined" || !recycle) window.setTimeout("OpenWebGIS.Portal.API.PageResize(true);",200);

	if($("#allTop").css("display")!="none")
	{
		
		// resize fullScreen
		//var centerHeight = $("#bodyContentCenterDIV").height();
		//alert($("#bodyContentCenterDIV").innerHeight())
		//var centerFullHeight = $(window).height() - $("#bodyContentTopDIV").height() - $("#bodyContentBottomDIV").height() - $("#bodyContentMenusDIV").height()  ;
		//if(centerFullHeight>centerHeight ) 
		//{
		//	$("#bodyContentCenterDIV").height(centerFullHeight); 
		//	$("#bodyContentCenterRightDIV").height(centerFullHeight); 
		//}

		var winWidth = $(window).width();
		
		var rightMinWidth =  680;
		var rightMaxWidth = 1000;
		var leftWidth = 280;
		var centerOtherHeight = 175;
		var rightWidth = winWidth - leftWidth -35;
		var childrenHeight = $("#bodyContentCenterRightContentDIV").children().height();
		if(childrenHeight< ($(window).height() -centerOtherHeight )) childrenHeight = $(window).height()-centerOtherHeight;
		
		if($("#bodyContentCenterRightContentDIV").children()[0]!=null)
		{
		 	if($("#bodyContentCenterRightContentDIV").children()[0].nodeName.toUpperCase() == "IFRAME")
			{
				//$("iframe").contents().find("body")
				childrenHeight = $($("#bodyContentCenterRightContentDIV").children()[0]).contents().find("body").innerHeight() ;
				$($("#bodyContentCenterRightContentDIV").children()[0]).height(childrenHeight);
			}
		}
		//alert(childrenHeight + "----" +$("#bodyContentCenterRightContentDIV").height() ) 
		if(childrenHeight>$("#bodyContentCenterRightContentDIV").height())
		{
			
			$("#bodyContentCenterRightContentDIV").height(childrenHeight);
			$("#bodyContentCenterRightDIV").height(childrenHeight+32);
			$("#bodyContentCenterRightDIV").parent().height(childrenHeight+32);
		}
		else
		{
			$("#bodyContentCenterRightContentDIV").height(childrenHeight);
			$("#bodyContentCenterRightDIV").height(childrenHeight+32);
			$("#bodyContentCenterRightDIV").parent().height(childrenHeight+32);
				
		}
		
		//$("#bodyContentCenterRightContentDIV").height()  	
		$("#bodyContentCenterRightDIV").height($("#bodyContentCenterRightDIV").parent().height());
		$("#bodyContentCenterRightContentDIV").height($("#bodyContentCenterRightDIV").height()-32);
		//return;
		 	
		$("#bodyContentCenterLeftDIV").width(leftWidth);
		if( rightWidth  <=rightMinWidth )  $("#bodyContentCenterRightDIV").width(rightMinWidth);
		else
		{
			if(rightWidth>rightMaxWidth)$("#bodyContentCenterRightDIV").width(rightMaxWidth);
			else $("#bodyContentCenterRightDIV").width(rightWidth);
		}
		
		$("#bodyContentCenterRightContentDIV").width($("#bodyContentCenterRightDIV").width()-32);
		
		if(top&&$("#bodyContentMapDIV"))
		{
			//$("#bodyContentMapDIV").height() = 
		}
		//alert($("#bodyContentCenterRightDIV").width())
		//$("#bodyContentCenterRightDIV").css("z-index",40);
		
	}	
}
 
 
 
OpenWebGIS.Portal.API.SetEvents = function()
{
	
	// APIMenus events  
	OpenWebGIS.Portal.API.CurrentMenuElement = $("#topMenu_Index");	
	$("#topMenu_Index").attr("background","images/API/Menu_BG.png");//background="images/API/Menu_BG.png" 
	OpenWebGIS.Portal.API.GetLeftPage($("#topMenu_Index").attr("id"));
	
	$(".APIMenus").mouseover(function (e)
        {
			var currentElement = $(this);
			if(OpenWebGIS.Portal.API.CurrentMenuElement.attr("id") == currentElement.attr("id")) return;
				currentElement.attr("background","images/API/Menu_BG_Over.png");
        }).mouseout(function (e)
        {
            var currentElement = $(this);
			if(OpenWebGIS.Portal.API.CurrentMenuElement.attr("id") == currentElement.attr("id")) return;
			if(OpenWebGIS.Portal.API.CurrentMenuElement!=null&&OpenWebGIS.Portal.API.CurrentMenuElement.attr("id") != currentElement.attr("id"))
				currentElement.attr("background","");
			else
				currentElement.attr("background","images/API/Menu_BG.png");
        }).click(function (e)
        {
			var currentElement = $(this);
			if(OpenWebGIS.Portal.API.CurrentMenuElement.attr("id") == currentElement.attr("id")) return;
			if(OpenWebGIS.Portal.API.CurrentMenuElement !=null)
			{
				OpenWebGIS.Portal.API.CurrentMenuElement.attr("background","");
			}
			OpenWebGIS.Portal.API.CurrentMenuElement = currentElement;
			
			currentElement.attr("background","images/API/Menu_BG.png");
            
			OpenWebGIS.Portal.API.GetLeftPage( currentElement.attr("id"));
        });
		
		
}


OpenWebGIS.Portal.API.GetLeftPage = function (pageName)
{
	
	if(OpenWebGIS.Portal.API.CurentPageName  == pageName) return;
	
	OpenWebGIS.Portal.API.CurentPageName  = pageName;
	OpenWebGIS.Portal.API.CurentCheckedElement = {};
	switch(pageName)
	{
		case "topMenu_Index":	
				$("#bodyContentCenterLeftDIV").load("API/Introduce.htm",function(){OpenWebGIS.Portal.API.PageResize();});
				$("#bodyContentCenterRightContentDIV").load("API/IntroduceDetail.htm",function(){OpenWebGIS.Portal.API.PageResize();});
				break;
		case "topMenu_Guide":	
				$("#bodyContentCenterLeftDIV").load("API/GuideMenus.htm",function(){$("#GuideFirstMenu").click();});
				break;
		case "topMenu_Service":	
				$("#bodyContentCenterLeftDIV").load("API/ServiceMenus.htm",function(){
					$("#ServiceFirstMenu").click(); 
					for(var i=0;i<OpenWebGIS.Portal.API.TransformPermissionInfo.length;i++)
					{
						var  dom = $("#Transform_"+OpenWebGIS.Portal.API.TransformPermissionInfo[i]);
						if(dom!=null) dom.css("display","");	
					}
					
				});
				break;
		case "topMenu_REST":	
				$("#bodyContentCenterLeftDIV").load("API/RESTMenus.htm",function(){$("#RESTFirstMenu").click();});
				break;
		case "topMenu_Example":	
				$("#bodyContentCenterLeftDIV").load("API/ExampleMenus.htm",function(){OpenWebGIS.Portal.API.PageResize();});
				$("#bodyContentCenterRightContentDIV").load("API/IntroduceDetail.htm",function(){OpenWebGIS.Portal.API.PageResize();});
				break;
		case "topMenu_Extend":	
				$("#bodyContentCenterLeftDIV").load("API/ExtendMenus.htm",function(){OpenWebGIS.Portal.API.PageResize();});
				$("#bodyContentCenterRightContentDIV").load("API/IntroduceDetail.htm",function(){OpenWebGIS.Portal.API.PageResize();});
				break;
		case "topMenu_Question":	
				$("#bodyContentCenterLeftDIV").load("API/QuestionMenus.htm",function(){$("#QUESTIONFirstMenu").click();});
				//$("#bodyContentCenterRightContentDIV").load("API/IntroduceDetail.htm",function(){$("#QUESTIONFirstMenu").click(); });
				break;
				
		default: //alert(pageName+' 未配置。');
			break;
	}
	
	OpenWebGIS.Portal.API.PageResize();
	
}

OpenWebGIS.Portal.API.ClickTopMenus = function (menuName)
{
	 $("#"+menuName).click();
}


OpenWebGIS.Portal.API.ShowCenterPage = function (element, pageName,isFrame)
{
	var checkedElement = OpenWebGIS.Portal.API.CurentCheckedElement[OpenWebGIS.Portal.API.CurentPageName] ;
	if(checkedElement== element) return;
	if(checkedElement!=null)
		$(checkedElement).removeClass("APIMenuTitle_Over");
	$(element).addClass("APIMenuTitle_Over");
	OpenWebGIS.Portal.API.CurentCheckedElement[OpenWebGIS.Portal.API.CurentPageName] = element;
	if(!isFrame)
		$("#bodyContentCenterRightContentDIV").load(pageName,function(){OpenWebGIS.Portal.API.PageResize();});
	else
	{
		$("#bodyContentCenterRightContentDIV").html("<iframe  frameborder='0' width='100%' height='100%' src='"+pageName+"' style='z-index:1;' ></iframe>");		
	}
	
}

OpenWebGIS.Portal.API.WriteLink=function(url)
{
	document.write("<div style=\"padding-left:40px\" ><a href=\"#\" style=\"color:#0088cc;\" onclick=\"window.open(this.innerText.replace(/ /g,'')) \">"+url.replace(/ /g,'')+"</a></div>");
}



