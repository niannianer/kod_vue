$(function(){
	document.documentElement.style.fontSize = window.innerWidth/18.75+'px';
	//模拟登陆。生成cookie  auto_token  10.10.10.69
/*		$.ajax({
		url:dist+'login',
		type:'POST',
		dataType:'json',
		data:{
			'investorMobile':'18510603824',
			'userLoginPassword':'qimei58',
			'imageCode': "OkQD"
		},
		xhrFields: { withCredentials: true },
        beforeSend: function(xhr) {
            xhr.withCredentials = true;
        },
        crossDomain:true,
		contentType:'application/x-www-form-urlencoded',
		success:function(data){
			console.log(data);
		}
	});*/
	/*获取用户真实姓名及手机号*/
	$.showLoading('获取身份信息...');
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
				$.hideLoading();
				$('#realname').val(msg.data.investorRealName)
				var tel = msg.data.investorMobile;
				tel = tel.substring(0,3)+'****'+tel.substring(7);
				$('#phone').html(tel)
			}
		}
	});
	sendMsg();
	//银行卡号输入框
	$('.inp-card').on('input propertychange',change);
	//提交绑定银行卡按钮
	$('.btn').on('click',submitFn);
	//获取验证码按钮
	$('button').on('click',function(){
			sendMsg();
	})
	//同意||取消协议
	var isAgree = true;
	$('i').on('click',function(){
		if(isAgree){
			$('i').removeClass('active');
			$('.btn').addClass('disable').off('click');
		}else{
			$('i').addClass('active');
			$('.btn').removeClass('disable').on('click',submitFn);
		}
		isAgree = !isAgree;
	})
	/*银行卡卡号每隔四位加空格*/
	function change(){  
	    this.value = this.value.replace(/\D/g, '').replace(/....(?!$)/g, '$& ');
		var val = $('.inp-card').val().replace(/[ ]/g,"");
		if(val.length<6){
			$('.bankinfo').remove();
		}
		if(val.length==6){
			$.ajax({
				url:dist+'getBankInfo',
				type:'GET',
				data:{
					'bankNo':val,
				},
				xhrFields: { withCredentials: true },
		        beforeSend: function(xhr) {
	                xhr.withCredentials = true;
	            },
		        crossDomain:true,
				success:function(msg){
					if(msg.code==200){
						var info = msg.data;
						var bankinfo = $(`<p class='bankinfo' style='height:1.6rem;line-height: 1.6rem; overflow:hidden;font-size:12px;'><img src="img/bank.png" alt="logo" style='border:1px solid red;width:20px;height:20px;border-radius: 50%;vertical-align:middle;margin:0 3px;'>${info.bank_name} 单笔限${info.single_limit}元，每日限${info.perday_limit}元</p>`);
						$('.card').after(bankinfo);
					}else{
						var bankinfo = $(`<p class='bankinfo' style='height:1.6rem;line-height: 1.6rem; overflow:hidden;font-size:12px;'>${msg.msg}</p>`);
						$('.card').after(bankinfo);
					}
					
				}
			})
		}
	}
	/*用户页面控制点击间隔*/
	function sendMsg(){
		$('button').addClass('waiting').attr('disabled','disabled');
		var time = 120;
		var timer = setInterval(function(){
			time--;
			$('button').html('已发送'+time+'s');
			if(time <=0){
				clearInterval(timer);
				$('button').removeClass('waiting').html('重新获取').removeAttr('disabled');
			}
		},1000);
		baofooAuthSMS();
	}
	/*发送验证码sendBaofooAuthSMS*/
	function baofooAuthSMS(callback){
		$.ajax({
	 	url:dist+'sendBaofooAuthSMS',
	 	type:'GET',
 		xhrFields: { withCredentials: true },
        beforeSend: function(xhr) {
            xhr.withCredentials = true;
        },
        crossDomain:true,
	 	success:function(data){
	 		if(callback){
	 			$.hideLoading();
	 			callback(data);
	 		}
	 	}
	 });
	}
	/*提交绑定银行卡*/
	function submitFn(){
		if(!$('.inp-phone').get(0).validity.valid){
			$.toast('请填入正确的手机号码','text');
		}else if(!$('.inp-card').get(0).validity.valid){
			$.toast('请填入卡号','text');
		}else if(!$('#realname').get(0).validity.valid){
			$.toast('请填入持卡人','text');
		}else{
			$.showLoading('绑卡中...');
			$.ajax({
	   			url:dist+'bindBankCard',
	   			type:'POST',
	   			data:{
	   				'callSystemID':'1003',
	   				'userName':$('#realname').val(),
	   				'bankUserCardNo':$('.inp-card').val().replace(/[ ]/g,""),
	   				'bankUserPhone':$('.inp-phone').val(),
	   				'verifyCode':$('.inp-vericode').val()
	   			},
   				xhrFields: { withCredentials: true },
		        beforeSend: function(xhr) {
	                xhr.withCredentials = true;
	            },
		        crossDomain:true,
	   			contentType:'application/x-www-form-urlencoded',
	   			success:function(data){
	   				$.hideLoading();
	   				if(data.code==200){
	   					$.toast('绑卡成功', "text");
	   				}else{
	   					$.toast(data.msg,'text');
	   				}
	   			}
	   		})
		}
		}
})