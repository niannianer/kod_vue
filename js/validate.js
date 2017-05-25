$.fn.extend({
	valiIdCard:function(idCard){
		/*
			身份证15位编码规则：dddddd yymmdd xx p
			dddddd：6位地区编码
			yymmdd: 出生年(两位年)月日，如：910215
			xx: 顺序编码，系统产生，无法确定
			p: 性别，奇数为男，偶数为女

			身份证18位编码规则：dddddd yyyymmdd xxx y
			dddddd：6位地区编码
			yyyymmdd: 出生年(四位年)月日，如：19910215
			xxx：顺序编码，系统产生，无法确定，奇数为男，偶数为女
			y: 校验码，该位数值可通过前17位计算获得
		*/
		/*  
			15位校验 地区六位（地区首位不为0）加年份2位。（8位）  18位校验 地区六位（地区首位不为0）加年份四位。（年份第一位不为0）（10位）
			月份01-12（2位）
			日期01-31(2位)
			15位校验 顺序码性别(3位)                              18位校验 顺序码校验码（4位）
		*/
		var regIdCard = /^(^[1-9]\d{7}((0[1-9])|(1[0-2]))(0[1-9]|([1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9]|[1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
		//如果通过该验证，说明身份证格式正确，但准确性还需计算
		if(regIdCard.test(idCard)){
			//18位校验末位校验码。
			if(idCard.length==18){
				var idCardWi=new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ); //将前17位加权因子保存在数组里
				var idCardY=new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
				var idCardWiSum=0; //用来保存前17位各自乖以加权因子后的总和
				for(var i=0;i<17;i++){
					idCardWiSum+=idCard.substring(i,i+1)*idCardWi[i];
				}
				var idCardMod=idCardWiSum%11;//计算出校验码所在数组的位置
				var idCardLast=idCard.substring(17);//得到最后一位身份证号码
				//如果等于2，则说明校验码是10，身份证号码最后一位应该是X
				if(idCardMod==2){
					if(idCardLast=="X"||idCardLast=="x"){
						return true;
					}else{
						return false;
					}
				}else{
					//用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
					if(idCardLast==idCardY[idCardMod]){
						return true;
					}else{
						return false;
					}
				}
			}
			//15位校验通过
			return true; 
		}else{
			return false;
		}
	},
	valiRealName:function(realName){
		var regRealName = /^([\u4e00-\u9fa5\·]{2,20})$/;
		if(regRealName.test(realName)){
			return true;
		}else{
			return false;
		}
	}
})
