/**
 * Created by hekk on 2017/5/23.
 */
'use strict'
const state = {
    userVerifyStatus: 0, //认证状态
    userVerifyStatusDesc:'',
    userUuid:'',// uid
    userId:'',
    investorRiskScore:0,
    investorGender:'', //gender
    investorIdCardNo:'',// ID card
    investorMobile:'',// mobile
    investorRealName:'',// realname,
    isEligibleInvestor:0,
    investorRiskType:0,
    investorRiskLevel:0, //
    investorRiskLevelDesc:'',
    investorType:'',
    investorTypeDesc:'',
    investorGenderDesc:'',

    accountTotalAssets:0.00, //总资产
    accountTotalInterests:0.00,//收益总额，
    accountCashAmount:0.00,// 可提现金额
    reservationCount:0, //预约数量
    investmentAmount:0.00,//投资总额
    rewardSum:0.00,//奖励数额
    relationCount:0,//好友数量


    bankUserCardNo:'',//银行卡
    bankUserPhone:'',//绑卡手机
    bank_code:'',
    bank_name:'',
    bank_full_name:'',
    bank_no:'',
    perday_limit:'',
    single_limit:'',
    single_limit_value:'',

    experienceProfit:'',//已收益
    notExpireProfit:'',//待收益
    notRecieveExperience:'',//未领取体验金
    totalExperience:'',

    cashCouponCount:'',//现金券数量
    experienceAmount:''//体验金数额


};
export default state;
