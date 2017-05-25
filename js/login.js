
$(document).ready(function(){
  document.documentElement.style.fontSize = window.innerWidth/6+'px';
	var paramsString = "";
	// 登录密码的校验
  padding();
  $('.signUp').removeAttr('disabled');
  $("#password").change(function(){
      var regStr = /^[a-zA-Z0-9]{6,20}$/;       
      var password =  $('#password').val();
      if(password == '' || !regStr.test(password)){
        toast("请输入正确的登录密码(6-20位数字或字母)！",3000);
      }else{
        return
      }
    });
    $(".signUp").click(function(){
		var password = $('.password').val();
    	var phone = $("#phone").val();
    	var flag = checkPhone(phone);
    	var imageCode = $('.imageCode').val();
    	if(!flag){
        toast("请输入正确的手机号！",3000);
    	    return
    	}
  		 paramsString = {
          "callSystemID":callSystemID,
			    'investorMobile':phone,
			    'userLoginPassword':password,
			    'imageCode': imageCode		    
		   };
  		$.ajax({
  			type:'post',
  			url:dist+'login',
  			data:paramsString,
        xhrFields: { withCredentials: true },
        beforeSend: function(xhr) {
                xhr.withCredentials = true;
            },
        crossDomain:true,
			  contentType:"application/x-www-form-urlencoded",
			  success:function(data){
			 	   if(data.code == 200){
                      // 跳转到当前浏览页面
			 		    window.location.href='./personal-center.html';
              $.cookie('message', data.data, { expires: 30, path: '/' });
			 		    return;
			 	     }else if(data.code == 1110){
			 	       toast(data.msg+"!",3000);
			 	     }else if(data.code == 1109){
                toast(data.msg+"!",3000);
             }else if(data.code == 1103){
               toast(data.msg+"!",3000);
             }else if(data.code == 1102){
               toast(data.msg+"!",3000);
             }else if(data.code == 1004){
               $(".JYM").css("display","block");
              $(".getCode").html(data.data.imageCode);
               toast(data.msg+"!",3000);
             }
			   }
  		});
    	
    });
});

// 动态切换密码显示与隐藏
var isAgree=false;
  $(".right").click(function(){
    isAgree = !isAgree;
    if(isAgree){
      $(this).attr("src","img/pwd-show@2x.png");
      $('#password').attr('type','text');

    }else{
      $(this).attr("src","img/pwd-hide@2x.png");
      $('#password').attr('type','password');
    }
  });

// 手机号码校验
function checkPhone(phone){
	var regStr =  /^1[35678]\d{9}$/;
	if(!regStr.test(phone)){ 
    toast("请输入正确的手机号！",3000);
		console.log("请输入正确的手机号！");
        return false; 
    }else{
      $.cookie('userName', phone, { expires: 30, path: '/' });
    	return true;
    }
}
//进入登录界面填入用户名密码登录
function padding(){
  var userName = $.cookie('userName');
  var userPassword = $.cookie('userPassword');
  if (userName==null || userPassword == null) return;
  // document.login.action = "";
  // document.login.submit();
  $('#phone').val(userName);
  $('#password').val(userPassword);
  $('.singnUp').click();
}