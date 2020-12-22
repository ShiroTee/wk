/**
 * 
 */

function TaskObj(taskId,interval,orgName,stageName){
	this.taskId 		= taskId;
	this.interval 		= interval;
	this.orgName		=orgName;
	this.stageName      =stageName;
}

function TaskAllInfoObj(ids,treeLink,taskId,taskName,status,interval,orgName){
	this.ids			=ids;
	this.taskId 		= taskId;
	this.interval 		= interval;
	this.orgName		=orgName;
	this.treeLink 		= treeLink;
	this.taskName 		= taskName;
	this.status			=status;
}