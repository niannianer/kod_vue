/*
* @Author: DELL
* @Date:   2017-05-18 08:48:40
* @Last Modified by:   DELL
* @Last Modified time: 2017-05-23 18:23:57
*/

'use strict';
;(function(){
	document.documentElement.style.fontSize = window.innerWidth/6+'px';
// 验证手机号
	 $('#phone').change(function(){
			var phone = $("#phone").val();
			var regStr = /^1[35678]\d{9}$/;
			if(phone == "" ){
    			toast("手机号不能为空！",3000);
			}else if(!regStr.test(phone)){
				toast("请输入正确的手机号码！",3000);
			}
	});
// 发送验证码
	$('.getVerifyCode').on('click',function(){
			var imageCode = $('#imageCode').val();
		   	var phone = $("#phone").val();
			var regStr = /^1[35678]\d{9}$/;
		   if(phone == "" ){
    			toast("手机号不能为空！",3000);
			}else if(!regStr.test(phone)){
				toast("请输入正确的手机号码！",3000);
			}else {
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
			'callSystemID':callSystemID,
			'imageCode':imageCode,
			'bussType':0
			};
			$.ajax({
				type:'get',
				data:data,
				url:url,
				dataType:'json',
				success:function(data){
					if(data.code == 200){
						$('.signUp').removeAttr('disabled');
					} else if(data.code == 1001){
						// toast(data.msg+"!",3000);
					}else if(data.code == 1002){
						toast("请出入正确的校验码!",3000);
					}else if (data.code == 1004){
						$(".JYM").css("display","block");
						$(".getCode").html(data.data.imageCode);
						toast(data.msg+"!",3000);
					}else if(data.code == 1113){
						toast("该手机号已注册，可直接登录!",3000);
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
	 // $("#setPassword").focus(function(){
  //   	$(this).val("");
 	//  });
	$("#setPassword").change(function(){
    	var regStr = /^[a-zA-Z0-9]{6,20}$/; 			
    	var userpass =  $('#setPassword').val();
    	if(userpass == '' || !regStr.test(userpass)){
    		toast("请输入正确的登录密码(6-20位数字或字母)！",3000);
    	}else{
    		return
    	}
  	});
  			
	// 邀请人手机号验证
	$("#OtherPhone").change(function(){
   		var inputValue=$(this).val();
   		if(inputValue==''){
   		   var inviterPhone="null";
   		}else{
   		    var regStr = /^1[35678]\d{9}$/;
   		    if(!regStr.test(inputValue)){
   		    	toast("请输入正确的邀请人手机号！",3000);
   		    }else{
   		      inviterPhone = inputValue;
   		      return;
   		   }
   		}
  	});

	// 注册验证   当点击同意协议时才可以点击注册按钮
	// 同意注册协议
	var isEmpty = false;
	 var isAgree=false;
 	$(".agree i").click(function(){
 	  $(this).toggleClass('on');
 	  isAgree=!isAgree;
 	  var phone  = $('#phone').val();
	  var code = $('#code').val();
	  var userpass =  $('#setPassword').val();
 	  if(isAgree && phone && code && userpass){
 	    $(".signUp").css({backgroundColor:"#1D71BE",boxShadow:" 0 -0.01px 0.06rem 0 #1D71BE"}).attr('disabled',false);
 	  }else{
 	  	$(".signUp").css({backgroundColor:"#b7b7b7",boxShadow:" 0 -0.01px 0.06rem 0 #b7b7b7"}).attr('disabled','');
 	  }
 	});
	$('.signUp').click(function() {		
		var phone  = $('#phone').val();
		var code = $('#code').val();
		var userpass =  $('#setPassword').val();
		var inviterPhone = $("#OtherPhone").val();
		var url = dist+'regist'
		var data = {
				"investorMobile":phone,
				"callSystemID":callSystemID,
				"verifyCode":code,
				"userLoginPassword":userpass,
				"inviterPhone":inviterPhone,
		};
		$.ajax({
			type:'post',
			data:data,
			url:url,
			dataType:'json',
        	xhrFields: { withCredentials: true },
        	beforeSend: function(xhr) {
                xhr.withCredentials = true;
            },
        	crossDomain:true,
			contentType:"application/x-www-form-urlencoded",
			success:function(data){
				if(data.code == 200){
					// 跳转到登录页面
					window.location.href='./login.html'; 
				}else if(data.code == 1002){
   		    		toast("!",3000);
				}else if(data.code ==1101 ){
   		    		toast(data.msg+"!",3000);
				}else if(data.code ==1102 ){
   		    		toast(data.msg+"!",3000);
				}
						}
					});
				}
			);
	})();
	function checkPhone(phone){
		var regStr = /^1[35678]\d{9}$/;
		return regStr.test(phone);
	};