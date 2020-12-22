var   CurrentApplicationRelativeClientUrl="../";
var   CurrentApplicationRootURI="http://10.6.10.199:8000";
var   CurrentUserIP="10.6.10.98";
var   CurrentUserIsAdministrator=true;
var   CurrentUserIsGuest=false;
var   CurrentUserModel =   {"UserID":"ecced82f-d532-4e54-94a0-0d22f4747169","UserName":"root","Password":"","AliasName":"系统管理员","DistrictCode":null,"CreateTime":20091208114640,"Sex":"男","Address":null,"Phone":null,"Email":null,"LastLogTime":20140825163450,"Remark":null,"ExpireTime":0,"Locked":false,"LockedIPs":null,"DepartmentID":"AA","DisplayOrder":3,"Description":null,"ExtendCode":null,"ExtendCode2":null,"ExtendCode3":null,"ExtendCode4":null,"ExtendCode5":null,"ModelTableName":"LIQUIDGIS_RBAC_USER","ModelPKFieldName":"USERID","ModelTreeParentIDName":"DEPARTMENTID"} ;
var   CurrentSessionID =   "jlq31fejv0w0pf99ik1m74q6s-20140825162741-server641" ;
var   CurrentUserKey =   "a67db68dbfb2752f9b913dff9ece867117c87e95" ;
var   CurrentDepartment =   {"DepartmentID":"AA","ParentDepartmentID":"A","DepartmentName":"共享平台管理员","Description":null,"AdminuserIDs":null,"Locked":false,"DisplayOrder":10,"DepartmentContactInfo":null,"DepartmentAddress":null,"DepartmentZipCode":null,"DepartmentPhone":null,"DepartmentFax":null,"DepartmentEmail":null,"DepartmentCode":"AA","UrlPart":"admin","ManagerSystemID":51,"ExtendCode":null,"ExtendCode2":null,"ExtendCode3":null,"ExtendCode4":null,"ExtendCode5":null,"DepartmentModels":null,"UserModels":null,"ModelTableName":"LIQUIDGIS_RBAC_DEPARTMENT","ModelPKFieldName":"DEPARTMENTID","ModelTreeParentIDName":"PARENTDEPARTMENTID"} ;



 // SYSTEM SETTING 
var GlobalSetting = {};
GlobalSetting.ClusterCacheIP="127.0.0.1" ;
GlobalSetting.ScriptCompressorMode="MIN" ;
GlobalSetting.MaxRecord=300 ;
GlobalSetting.DefaultLogin="guest" ;
GlobalSetting.SysVersion="CLOUD" ;
GlobalSetting.TileDatasourceID=7 ;
GlobalSetting.ExpressDatasourceID=4 ;
GlobalSetting.RasterDatasourceID=10 ;
GlobalSetting.DynamicDatasourceID=13 ;
GlobalSetting.SDEArcGISDatasourceID=12 ;
GlobalSetting.SDEOracleDatasourceID=11 ;
GlobalSetting.SDESTGeometrySearchNoCache="SDE.GHJ_*;SDE.GSJ_*;SDE.JD_*;SDE.YWJ_*;SDE.ZJJ_*" ;
GlobalSetting.SDESTGeometrySearchCacheSecond=250000 ;
GlobalSetting.MaxMimeDataCount=64 ;
GlobalSetting.DeleteMimeDataCount=32 ;
GlobalSetting.MaxLayerRecordCacheCount=16 ;
GlobalSetting.DeleteLayerRecordCacheCount=4 ;
GlobalSetting.MergeTimeout=20 ;
GlobalSetting.MaxMapCacheCount=8 ;
GlobalSetting.DeleteMapCacheCount=4 ;
GlobalSetting.ExportMaxCount=5000 ;
GlobalSetting.DefaultExpressRenderer="OpenWebGIS.LiquidGIS.PlugIns.ExpressCustomRenderer.DefaultRenderer, OpenWebGIS.LiquidGIS.PlugIns.ExpressCustomRenderer" ;
GlobalSetting.DefaultRasterService="OpenWebGIS.LiquidGIS.Engine.ArcGIS.Server.AOEngine.RasterService,OpenWebGIS.LiquidGIS.Engine.ArcGIS.Server.AOEngine" ;
GlobalSetting.ExpressMaxRecord=500 ;
GlobalSetting.EditTimeout=20 ;
var DigitalCitySetting = {};
DigitalCitySetting.SettingName="APPLICATION_DIGITALCITY" ;
DigitalCitySetting.CityName="SuZhou" ;
DigitalCitySetting.CityCoordinateCode=903301 ;
DigitalCitySetting.BaseDatasourceID=25 ;
DigitalCitySetting.UserDataSourceID=25 ;
DigitalCitySetting.TIFDatasourceID=24 ;
DigitalCitySetting.IndexMapDatasourceID=23 ;
DigitalCitySetting.BaseMapGroupID=4 ;
DigitalCitySetting.TileVectorName="HanZhouVector" ;
DigitalCitySetting.TileDEMName="HangZhouDEM" ;
DigitalCitySetting.TileDOMName="HangZhouDOM" ;
DigitalCitySetting.TIFPath="k:\\TIFData\\" ;
DigitalCitySetting.TileCachePath="K:\\TileCache2\\" ;
DigitalCitySetting.LocationType="ArcGIS" ;
DigitalCitySetting.ResourceExtend="OpenWebGIS.LiquidGIS.DataIntegration.DigitalCity.ResourceExtend,OpenWebGIS.LiquidGIS.DataIntegration.DigitalCity" ;
DigitalCitySetting.HistoryDataset="History" ;
DigitalCitySetting.ExchangeDataset="HZExchange" ;
DigitalCitySetting.SchedulerSumInterval=1 ;
DigitalCitySetting.SchedulerHotlayerInterval=60 ;
DigitalCitySetting.SchedulerInterval=5 ;
DigitalCitySetting.SchedulerAccountException=20 ;
DigitalCitySetting.SchedulerSystemVisit=100000 ;
DigitalCitySetting.SchedulerUserVisit=5000 ;
DigitalCitySetting.SchedulerTileVisit=5000 ;
DigitalCitySetting.SchedulerVisitSuccess=0.95 ;
DigitalCitySetting.SchedulerDataLost=5 ;
DigitalCitySetting.SchedulerPagePerformance=300 ;
DigitalCitySetting.SchedulerProxyPerformance=400 ;
DigitalCitySetting.OracleExpPath="C:\\app\\Administrator\\product\\11.2.0\\client_2\\bin\\exp.exe" ;
DigitalCitySetting.RemoteLayerCachePath="E:\\RemoteDataCache\\" ;



 // GlobalSetting.js 
if(typeof(OpenWebGIS)=="undefined")
	var OpenWebGIS = {};
if(typeof(OpenWebGIS.Portal)=="undefined")
	OpenWebGIS.Portal = {};
if(typeof(OpenWebGIS.Portal.Page)=="undefined")
	OpenWebGIS.Portal.Page = {};
if(typeof(OpenWebGIS.Portal.API)=="undefined")
	OpenWebGIS.Portal.API = {};
	if(typeof(OpenWebGIS.Portal.Map)=="undefined")
	OpenWebGIS.Portal.Map = {};
if(typeof(OpenWebGIS.Portal.Page.Index)=="undefined")
	OpenWebGIS.Portal.Page.Index = {};
if(typeof(OpenWebGIS.Portal.Page.Content)=="undefined")
	OpenWebGIS.Portal.Page.Content = {};

if(typeof(OpenWebGIS.DigitalCity)=="undefined")
	OpenWebGIS.DigitalCity = {};
if(typeof(OpenWebGIS.DigitalCity.Department)=="undefined")
	OpenWebGIS.DigitalCity.Department = {};
if(typeof(OpenWebGIS.DigitalCity.Department.Index)=="undefined")
	OpenWebGIS.DigitalCity.Department.Index = {};


function SetSiteUrlToAppRelativeClientUrl()
{
    var locationURL = window.location.toString();
    var lowerCaseUrl = locationURL.toLowerCase();
    var cHost = "http://" + window.location.host.toLowerCase();
    if(CurrentApplicationRootURI != cHost)
    {
        CurrentApplicationRootURI = "http://" + window.location.host;
    }
    var siteIndex = lowerCaseUrl.indexOf("/site/");
    if(siteIndex<0) return;
    lowerCaseUrl = lowerCaseUrl.substr(siteIndex+1);
    var urlInfos = lowerCaseUrl.split('/');
    if(urlInfos.length<2) return;
    var siteHostName = urlInfos[1];
    CurrentApplicationRootURI = CurrentApplicationRootURI+"/Site/"+siteHostName.toUpperCase()+""; // 在站点为 子站点类型的时候  需要对URL进行修正。

}
SetSiteUrlToAppRelativeClientUrl();



//var GlobalSetting = {};
GlobalSetting.DefaultLayerName = "SDE.L119901000001"; // 默认图层名称
GlobalSetting.DefaultLayerID = 201; // 默认图层名称


function ReplaceInnerHTML(obj,valueName)
{
	if(typeof(obj) == "String")
		obj = eval("obj="+obj+";");
	var replaceReg = new RegExp("{"+valueName+"}","gi");
	obj.innerHTML = obj.innerHTML.replace(replaceReg, GlobalSetting[valueName]);
	
}


// 每隔5分钟请求一次 保持连接  如果顶级页面包含 SYS_KeepActive 将不再创建定时器
if(typeof(top.SYS_KeepActive)=="undefined") 
{
	window.SYS_KeepActive = function()
	{
	    try
		{
			var xmlHttp = SYS_GetXmlHttp();
			xmlHttp.open("GET",CurrentApplicationRootURI+"/Handler/KeepActive.ashx?t="+(new Date()).toGMTString(),true);
			xmlHttp.send();
		} catch(e){}
	}
	window.setInterval("SYS_KeepActive()",300000);
}
else
{
	
}


function SYS_GetXmlHttp()
{ 
	var pgmIds=["MSXML3.XMLHTTP","MSXML2.XMLHTTP","Microsoft.XMLHTTP","MSXML.XMLHTTP","MSXML2.ServerXMLHTTP"];
	var xmlhttp=null;
	for (var i = 0; i < pgmIds.length; i++)
    {
		try
		{
			xmlhttp=new ActiveXObject(pgmIds[i]);
		}
		catch(ex)
		{
			xmlhttp=new XMLHttpRequest();
		}
		if(xmlhttp!=null)
			return xmlhttp;
    }
    try 
    {
        xmlhttp = new XMLHttpRequest();
        if (xmlhttp != null)
            return xmlhttp; 
    }
    catch (ex)
    {
        
    }
	alert("Get xmlhtttp error!");
	return null;
}
function CallbackError(obj)
{
	alert("调用的资源发生错误，错误描述：\r\n"+obj.message);
}


var StringBuilder = function (initString)
{

	this.Strings=[];
	if(typeof(initString)!="undefined" && initString != null){
		this.Append(initString);
	}
}

StringBuilder.prototype.Append=function(str)
{
	this.Strings.push(str);
}
	
StringBuilder.prototype.ToString=function()
{
	return this.Strings.join("");
}

StringBuilder.prototype.Clear = function()
{
	this.Strings.length = 0;
}

var GetQuery = function(paramName,defaultValue)
{
	var param = window.location.href.split(paramName+"=")[1];
	if(!param || param.length<1) return defaultValue;
	param = param.split("&")[0];
	param = param.split("#")[0];
	return param;
}

window.GetQuery = GetQuery;

 
 



 //SuZhou.js
 
// 全屏范围
var FullScreenEnvelope = {MinX:-12593,  MinY:-15208 , MaxX:126124,  MaxY:123509};

// 区划
var DistrictsEnvelope={};
DistrictsEnvelope.jg={MaxX:103840,MaxY:96432,MinX:81833,MinY:78474};
DistrictsEnvelope.xc={MaxX:84561,MaxY:91922,MinX:78799,MinY:81589};
DistrictsEnvelope.sc={MaxX:84787,MaxY:81654,MinX:77230,MinY:74460};
DistrictsEnvelope.gs={MaxX:84861,MaxY:97378,MinX:72324,MinY:83229};
DistrictsEnvelope.yh={MaxX:97327,MaxY:115478,MinX:33587,MinY:70728};
DistrictsEnvelope.bj={MaxX:86935,MaxY:79200,MinX:75921,MinY:68060};
DistrictsEnvelope.xs={MaxX:133137,MaxY:96214,MinX:71524,MinY:35674};
DistrictsEnvelope.xh={MaxX:81608,MaxY:92168,MinX:63942,MinY:61430};


var DigitalCity={};
DigitalCity.CopyRight= "苏州市规划局  Copyright © 2014 All rights reserved "; 
DigitalCity.ServicesInfo={};
DigitalCity.ServicesInfo.CityName="SuZhou";
DigitalCity.ServicesInfo.VectorMapName ="SZVector";
DigitalCity.ServicesInfo.RasterMapName ="SZRaster";
DigitalCity.ServicesInfo.TileMapName ="szvector";
DigitalCity.ServicesInfo.DefaultChartName ="TJ_HZDLCD";// 默认示例统计图层名称
DigitalCity.ServicesInfo.DefaultResourceName ="SDE.L119905000001";// 默认示例矢量图层名称
DigitalCity.ServicesInfo.DefaultDistrictName ="SDE.L010405000003";// 区划面图层
DigitalCity.ServicesInfo.MapList =[{Name:"矢量地图",Value:"SZVector"},{Name:"栅格地图",Value:"SZRaster"},{Name:"苏州",Value:"SZ"}];
DigitalCity.ServicesInfo.WMS={};
DigitalCity.ServicesInfo.WMS.BBOX = [-12593,-15208,126124,123509];
DigitalCity.ServicesInfo.WMS.LayerList = "221,222,212";
DigitalCity.ServicesInfo.WMS.Center = [(DigitalCity.ServicesInfo.WMS.BBOX[0]+DigitalCity.ServicesInfo.WMS.BBOX[2])/2,
										 (DigitalCity.ServicesInfo.WMS.BBOX[1]+DigitalCity.ServicesInfo.WMS.BBOX[3])/2];

