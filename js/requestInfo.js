var contentType = 'application/x-www-form-urlencoded';
$.extend({
	getUserInfo:function(suc,logFail){
		$.ajax({
			url:dist+'getUserInfo',
			type:'GET',
			data:{
				'callSystemID':callSystemID
			},
			success:function(msg){
				if(!(typeof msg ==='object')){
					console.log('object')
					msg = JSON.parse(msg);
				}
				if(msg.code==200){
					suc&&suc(msg.data);
				}else if(msg.code==401){
					logFail&&logFail(msg.msg);
				}
			}
		});
	},
	updateUserInfo:function(json,suc,logFail){
		$.ajax({
			url:dist+'updateUserInfo',
			type:'POST',
			data:$.extend({
				'callSystemID':callSystemID,
			},json),
			contentType:contentType,
			success:function(msg){
				if(!(typeof msg ==='object')){
					console.log('object')
					msg = JSON.parse(msg);
				}
				if(msg.code==200){
					suc&&suc(msg.data);
				}else if(msg.code==401){
					logFail&&logFail(msg.msg);
				}
			}
		});
	}
})