/*
* @Author: DELL
* @Date:   2017-05-18 19:36:35
* @Last Modified by:   DELL
* @Last Modified time: 2017-05-23 18:13:30
*/

'use strict';
;(function(){
	document.documentElement.style.fontSize = window.innerWidth/6+'px';
	// 验证手机号
	// 验证手机号
	$('#phone').change(function(){
		var phone = $("#phone").val();
		var regStr =  /^1[35678]\d{9}$/;
		if(phone == ""){
			toast("手机号不能为空！",3000);
		} else if( !regStr.test(phone)){
			toast("请输入正确的手机号码！",3000);
		}
		else{
			return false;
		}
	});
	// 发送验证码
	$('.getVerifyCode').on('click',function(){
		var phone = $("#phone").val();
		var regStr = /^1[35678]\d{9}$/;
		if(phone == "" ){ 
			toast("手机号不能为空！",3000);
		  	return;
		}else if (!regStr.test(phone)){
			toast("请输入正确的手机号码！",3000);
		}else{
			$(this).css("background-color","#b7b7b7").attr('disabled','disabled');
			var second = 60;
			var str = "重新发送";
			var timer = setInterval(function(){
				second --;
				$(".getVerifyCode").val(str+"("+second+"s)");
				if(second <= 0){
					clearInterval(timer);
					$(".getVerifyCode").css("background-color","#1D71BE").val(str).attr('disabled',false);
				}
		}, 1000);		   
		var url  =dist+'sendVerifyCode';
		var data = {
		'investorMobile':phone,
		"callSystemID":callSystemID,
		'bussType':1
		};
		$.ajax({
			type:'get',
			data:data,
			url:url,
			dataType:'json',
			success:function(data){
				if(data.code == 200){
					toast('发送'+data.msg+"!",3000);
					$('.signUp').removeAttr('disabled');
				} else if(data.code == 1002){
						toast("请输入正确的校验码!",3000);
				}else if (data.code == 1004){
					$(".JYM").css("display","block");
					toast(data.msg+"!",3000);
				}
			}
		});		
		}
		
	});
						
		// 验证码校验 
	$("#code").change(function(){
    	var code=$(this).val();
    	var phone = $("#phone").val();
    	var regStr = /^[0-9]{6}$/;
    	if(code ==''){
    		toast("输入不能为空！!",3000);
    	}else if(!regStr.test(code)){
    		return toast("请输入正确的验证码!",3000);
    	}else{
    		return
    	}
  	});
  		// 登录密码的验证
	$("#setPassword").change(function(){
		var phone  = $('#phone').val();
	  	var code = $('#code').val();
    	var userpass =  $('#setPassword').val();
    	var regStr = /^[a-zA-Z0-9]{6,20}$/; 
    	if(userpass == '' ||  !regStr.test(userpass)){
    		toast("请输入正确的登录密码(6-20位数字或字母)！",3000);
    	}else if(phone && code && userpass){
    		 $(".signUp").css({backgroundColor:"#1D71BE",boxShadow:" 0 -0.01px 0.06rem 0 #1D71BE"}).attr('disabled',false);
    	}else{
 	  		$(".signUp").css({backgroundColor:"#b7b7b7",boxShadow:" 0 -0.01px 0.06rem 0 #b7b7b7"}).attr('disabled','');    					
    	}
  	});
				
	// 重置密码
	$('.signUp').click(function(){
		var phone  = $('#phone').val();
		var code = $('#code').val();
		var userpass =  $('#setPassword').val();
		var inviterPhone = $("#OtherPhone").val();
		var url = dist+'resetUserPassword'
		var data = {
			"investorMobile":phone,
			"callSystemID":callSystemID,
			"verifyCode":code,
			"userLoginPassword":userpass,
		};
		$.ajax({
			type:'post',
			data:data,
			url:url,
			dataType:'json',
			contentType:"application/x-www-form-urlencoded",
			success:function(data){
				if(data.code == 200){
					// 跳转到login页面
					window.location.href="./login.html";
    				toast(data.msg+"！",3000);
				}else if(data.code == 1002){
    				toast(data.msg+"！",3000);
				}else if(data.code ==1103 ){
    				toast("该手机号未注册，快去注册吧！",3000);
				}else if(data.code == 1109){
					toast("该手机号已被禁用，如有疑问请联系客服。",3000);
				}else if(data.code == 1004){
					$(".JYM").css("display","block");
					$(".getCode").html(data.data.imageCode);
				}
			}
		});
	});

})();
	function checkPhone(phone){
		var regStr =  /^1[35678]\d{9}$/;
		return regStr.test(phone);
	};