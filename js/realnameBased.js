$(function(){
	var uid = '';
	function setCookie(name,value)
	{
		var exp = new Date();
		exp.setTime(exp.getTime() + 12*60*60*1000);
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	}
	function getCookie(name)
	{
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
		else
		return null;
	}
	//模拟登陆。生成cookie  auto_token  10.10.10.69
/*	$.ajax({
		url:dist+'login',
		type:'POST',
		dataType:'json',
		data:JSON.stringify({
			'investorMobile':'13936663194',
			'userLoginPassword':'abc123',
			'imageCode': "bzfA"
		}),
		contentType:'application/json',
		success:function(data){
			console.log(data);
		}
	});*/
	//获取用户信息。以发送给宝付做授权
	$.ajax({
		url:dist+'getUserInfo',
		type:'GET',
		data:{
			'callSystemID':'1003'
		},
		xhrFields: { withCredentials: true },
        beforeSend: function(xhr) {
                xhr.withCredentials = true;
            },
        crossDomain:true,
		success:function(msg){
			if(msg.code==200){
				uid = msg.data.userId;
			}
		}
	});


	//显示输入内容是否正确
/*	$('#username').on('input',function(){
		console.log('真实姓名'+$(this).valiRealName(this.value));
	})
	$('#userid').on('input',function(){
		console.log('身份证号'+$(this).valiIdCard(this.value));
	})*/
	$('.btn').on('click',function(){
		var times = getCookie('frequency')==null?0:getCookie('frequency');
		if(times >= 5){
			$.toast("您失败次数过多，请12小时候重试，如有疑问请联系客服", "text");
			return 
		}
		if($('#username').valiRealName($('#username').val())&&$('#userid').valiIdCard($('#userid').val())){
			$.ajax({
				url:dist+'openAccount',
				type:'POST',
				// headers: {"auth_token":'69f35592-3aec-11e7-af10-00155d0af601'},
				data:{
					'userName':$('#username').val(),
					'userIdCardNumber':$('#userid').val()
				},
				xhrFields: { withCredentials: true },
		        beforeSend: function(xhr) {
		                xhr.withCredentials = true;
		            },
		        crossDomain:true,
				contentType:'application/x-www-form-urlencoded',
				success:function(data){
					$.hideLoading();
					switch (data.code)
					{
					case 200:
					  $.toast("身份认证成功！", "text");
					  setTimeout(function(){
					  	window.location.replace('baoFoo.html?uid='+uid);
					  },1000);
					  break;
					default:
					  $.toast(data.msg, "text");
					  setCookie('frequency',++times);
					  break;
					}						
				}
			});
			$.showLoading('实名认证中...');
		}
		else{
			if(!$('#username').get(0).validity.valid){
				$.toast('请输入真实姓名','text');
			}if(!$('#userid').get(0).validity.valid){
				$.toast('请输入身份证号','text');
			}
			else{
				$.toast("身份信息格式不正确，请重新填写。", "text");
			}
		}
	})
})