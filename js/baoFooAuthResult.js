$(function(){
	var uid = '';

	kingoldAjax('getUserVerifyStatus').done(function(resp){
		if(resp >= 2) {
			window.location.replace('./bindBankCard.html');
		} else {
			$("#tipt").html("失败");
		}
	  }).fail(function(err){
	});
})