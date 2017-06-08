<template>
	<div flex="dir:top" flex-box="1" class="shade">
		<div class="cancel" flex='main:right' flex-box='1'>关闭</div>
		<div class="content"flex-box='4'>
			<div>
                <p>您的直接理财师好友推荐客户购买平台产品后， 您将获得直接邀请津贴。</p>
                <p>奖励金额=好友奖励*奖励系数</p>
            </div>
            <div>
                <p>您的间接理财师好友推荐客户购买平台产品后， 您将获得间接邀请奖励。</p>
                <p>奖励金额=好友奖励*奖励系数</p>
            </div>
            <div>
                <p>注：直接邀请奖励系数为16%</p>
                <p>间接邀请奖励系数为4%</p>
            </div>
		</div>
    </div>
</template>
<script>
	import '../less/shade.less';
	export default {
        name: 'shade',
    }
</script>