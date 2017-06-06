/**
 * Created by hekk on 2017/5/23.
 */
'use strict';
const mutations = {};
mutations.changeName = (state, name = '') => {
    state.username = name;
};
mutations.increment = (state, num = 1) => {
    state.count += num;
};
// 认证状态
mutations.setUserVerifyStatus = (state, data) => {
    state.userVerifyStatus = data.userVerifyStatus;
};
// 资产信息
mutations.setAccountBaofoo = (state, data) => {
    if (data.accountTotalAssets) {
        state.accountTotalAssets = data.accountTotalAssets;
        state.accountTotalInterests = data.accountTotalInterests;
        state.accountCashAmount = data.accountCashAmount;
    }
};
// 绑卡信息
mutations.setBankUser = (state, data) => {
    if (data && data.bankUserCardNo) {
        state.bankUserCardNo = data.bankUserCardNo;
        state.bankUserPhone = data.bankUserPhone;
    }
};

// 银行卡限额信息
mutations.setBankInfo = (state, data) =>{
    if (data && data.bank_code) {
        state.bank_code = data.bank_code;
        state.bank_no =data.bank_no;
        state.bank_name = data.bank_name;
        state.bank_full_name =data.bank_full_name;
        state.perday_limit =data.perday_limit;
        state.single_limit =data.single_limit;
        state.single_limit_value =data.single_limit_value;
    }
};
export default  mutations;
