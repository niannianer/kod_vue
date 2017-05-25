$(function(){
	var page = 0;
	var p_type = window.location.hash==''?'FIXI':window.location.hash.slice(1);
	//切换列表时hash变化
	$(window).on('hashchange load',function(){
		bindHashTab();
		investorConfirm();
		$('.item,.dropload-down,.FIXI,.PRIF').remove();
		page = 0;
		 $('.cplbWarp').dropload({
	        scrollArea : window,
	        domDown: {
	            domClass: 'dropload-down',
	            domRefresh: '<div class="dropload-refresh" style="color:black;">上拉加载更多</div>',
	            domLoad: '<div class="dropload-load" style="color:black;"><span class="loading"></span>加载中...</div>',
	            domNoData: '<div class="dropload-noData" style="color:black;">没有更多...</div>'
	        },
	        loadDownFn : function(me){
	            $.ajax({
	                url:dist+"product/getList",
					data:{'callSystemID':callSystemID,'productType':p_type,'pageSize':10,'startRow':10*page},
					type:'get',
					xhrFields: { withCredentials: true },
			        beforeSend: function(xhr) {
		                xhr.withCredentials = true;
		            },
			        crossDomain:true,
	                success: function(json){
	                	if(json.code ==200){
	                		if(json.data.productList.length>0){
	                			showList(json.data,me);
	                		}else{
		                        me.lock();
		                        me.noData();
		                        me.resetload();
		                    }
	                	}
	                },
	                error: function(xhr, type){
	                    // 即使加载出错，也得重置
	                    console.log('error ajax');
	                    me.resetload();
	                    me.opts.autoLoad = false;
	                    //避免请求失败死循环。后面还要再改！
	                    return;
	                }
	            });
	            page++;
	        }
    	});
	})
	//切换列表
	$('.tab-op').on('click',function(){
		window.location.hash = $(this).attr('data-type');
		bindHashTab();
	})
	//确认合格投资者身份
	$('.btn').on('click',function(){
		$('.mask').slideUp(500);
		$.updateUserInfo({isEligibleInvestor:1});
	})
	//tab active(hr)与hash值绑定
	function bindHashTab(){
		p_type = window.location.hash==''?'FIXI':window.location.hash.slice(1);
		$('span[data-type='+p_type+']').addClass('active').siblings().removeClass('active');
		$('hr').css({
			'left':p_type=='FIXI'?'14%':'64%'
		});
	}
	//是否显示合格投资者遮罩。高端理财需要登录。（isEligibleInvestor投资者标记0时显示）
	function investorConfirm(){
		p_type = window.location.hash==''?'FIXI':window.location.hash.slice(1);
		if(p_type == 'PRIF'){
			$.getUserInfo(function(data){
				//登录成功。
				if(!data.isEligibleInvestor){
					$('.mask').show();
				}
			},function(data){
				//登录失败
				$.toast('请先登录...','text');
				setTimeout(function(){
					//window.location.href = 'login.html';
				},2000);
			});
		}
	}
	
	//显示列表
	function showList(data,obj){
		p_type = window.location.hash==''?'FIXI':window.location.hash.slice(1);
		if(p_type =='FIXI'){
			$.each(data.productList,function(index,item){
				var product = $(`<div class="FIXI">
								<h2>${item.productName}</h2>
								<ul class='scode${item.productStatusCode}'>
									<li class='rate'>
										 <p class='info'>${item.annualInterestRate}</p>
										 <p class='category'>预计年化收益率</p> 
									</li>
									<li>
										 <p class='info'>${item.productPeriod}</p>
										 <p class='category' style='text-align: right'>期限</p> 
									</li>
									<li class='status'>
										${item.productStatus}
									</li>
								</ul>
								<div class="progress scode${item.productStatusCode}">
									<div class='done' style='width:${item.productProgress+'%'};'></div> 
									<div class='round' style='left:${item.productProgress-1+'%'};'>
										<div></div>
									</div>
								</div>  
								<p><img src="img/rmb.png" alt="rmb">${item.productMinInvestment}</p>
							</div>`);
				$(product).on('click',function(){
					window.location.href='goodsDetail.html?u='+item.productUuid+'&t='+item.productType+'';
				})
				$('#in').append(product);
				//延迟重置。避免重复加载。
				setTimeout(function(){
					obj.resetload();
				},500)
			});
		}else{
			$.each(data.productList,function(index,item){
				var product = $(`<div class="PRIF">
							<span class="span-3">${item.productStatus}</span>
							<h2>${item.productName}</h2>
							<ul>
								<li>
									 <p style="font-style: normal;color: #ff6d00;font-size: 22px;text-align: center;margin-top: 0px;">${item.productAnnualInterestRate}</p>
									 <p>业绩基准</p> 
								</li>
								<li>
									 <i>${item.productPeriod}</i>
									 <p>期限</p> 
								</li>
								<li>
									<div class="wrap">
										<div id="circle339ce1bd7de6400aa7207e4798ae367c" class="circle clip-auto">
											<div  class="percent left" style="transform: rotate(360deg);"></div>
											<div  class="percent right"></div>  
										</div>
										<div class="num">
											<span style="color: #ff6500;width: 40px;line-height: 40px;">${item.productProgress+'%'}</span>
										</div>  
									</div>  
								</li>
							</ul>
						</div>`);
				$(product).on('click',function(){
					window.location.href='goodsDetail.html?u='+item.productUuid+'&t='+item.productType+'';
				})
				$('#in').append(product);
				//延迟重置。避免重复加载。
				setTimeout(function(){
					obj.resetload();
				},500)
			});
		}
	}
})