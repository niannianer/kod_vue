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
export default  mutations;
