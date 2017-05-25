$(document).ready(function(){
	handleUserName();

});
function handleUserName(){
	var username = $.cookie('userName');
	var usr = username.substr(0,3)+"****"+username.substr(7); 
	$("#login").val(usr);
	
}