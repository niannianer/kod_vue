$(function(){
	$(window).on('load',function(){
		var settings = {}
		$.each(window.location.search.slice(1).split('&'),function(index,item){
			settings[item.split('=')[0]] = item.split('=')[1];
		});
		getDetail(settings);
	});
	function getDetail(json){
		$.ajax({
			url:dist+"product/getDetail", 
			data:{'callSystemID':1003,'productUuid':json.u,'productType':json.t},
			type:'get',
			xhrFields: { withCredentials: true },
	        beforeSend: function(xhr) {
                xhr.withCredentials = true;
            },
	        crossDomain:true,
			success:function(json){
				if(json.code==200){
					json.data.timeRemain = timeRemain(json.data.serverTime,json.data.productInterestDate);
					if(!json.data.canBuy){//不可购买按钮为灰。点击disable
						$('.btn').html('不可购买').css('background','#DBDBDB').off('click');
					}
					$('#wrap').html(template('temp', json.data));
					//错误处理
					openList();
				}
			}
		});
	}
	function timeRemain(serverTime,calTime){
		var calTime = new Date((calTime+' 00:00:00').replace(/-/g,'/'));
		var serverTime = new Date(serverTime.replace(/-/g,'/'));
		var timeRemain = (calTime-serverTime)/1000;
		if(timeRemain<=0){
			return '已结束';
		}
		var hours = Math.floor(timeRemain%86400/3600);
		hours = hours<10?'0'+hours+'小时':hours+'小时'
		var day = Math.floor(timeRemain/86400);
		if(day==0){
			if(hours==0){
				return '不足一小时';
			}
			return hours;
		}else{
			day = day<10?'0'+day+'天':day+'天';
			return day+hours;
		}
	}
	function getCookie(name)
	{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
	}
	//模拟登陆
/*	$.ajax({
		url:dist+'login',
		type:'POST',
		dataType:'json',
		data:JSON.stringify({
			'investorMobile':'18510603824',
			'userLoginPassword':'qimei58',
			'imageCode': "OkQD"
		}),
		contentType:'application/json',
		success:function(data){
			console.log(data);
		}
	});*/
	//立即投资相关代码后续添加
	$('.btn').on('click',function(){
		console.log('aaaaaa');
		var amount = $('.inp').val()==''?1000:$('.inp').val();
		console.log(amount);
		if(amount<1000){
			$.toast('起投金额1000元','text');
		}else{
			var userVerifyStatus = getCookie('userVerifyStatus')
			if(userVerifyStatus == null){
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
							userVerifyStatus = msg.data.userVerifyStatus;
							if(userVerifyStatus == 0){
								window.location.href ='realnameBased.html';
							}else{
								alert(msg.data.userVerifyStatusDesc);
							}
						}
					}
				});
			}
			else if(userVerifyStatus == 0){
				window.location.href ='realnameBased.html';
			}else {
				alert(msg.data.userVerifyStatusDesc);
			}
		}
	})
	//列表展开
	function openList(){
		$('.open').click(function(){				
			if ($(this).find('p').css('display')=='none') {				
				$(this).find('p').slideDown(200);
				$(this).find('img').css('transform','rotate(180deg)');
			} else{
				$(this).find('p').slideUp(200);
				$(this).find('img').css('transform','rotate(360deg)');
			}				
		});
		$('.sel-b').click(function(){					
			if ($(this).css('background')=="#D8D8D8") {	
				$(this).css('background','#FFFFFF');
			} else{
				$(this).css('background','#D8D8D8');
			}
		});
	}
});
function appointNow(){
	var goodsState = $("#goodsState").val();
	if(goodsState == "0"){
		showTip("该产品还未正式开放募集，当前无法进行预约","info",2000);
		return;
	}else if(goodsState == "2"){
		showTip("该产品已售罄，无法进行预约","info",2000);
		return;
	}else if(goodsState == "3"){
		showTip("该产品已成立，无法进行预约","info",2000);
		return;
	}else if(goodsState == "4"){
		showTip("该产品已进入封闭期，无法进行预约","info",2000);
		return;
	}else if(goodsState == "5"){
		showTip("该产品已进入存续期，无法进行预约","info",2000);
		return;
	}else if(goodsState == "6"){
		showTip("该产品已结束，无法进行预约","info",2000);
		return;
	}
	window.location="/f/wx/g/judgesion/addCustomerreservation.html?id=750d8b1634994827933d9ad39085cf9b";
}