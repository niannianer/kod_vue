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
mutations.setUserVerifyStatus = (state, data) => {
state.userVerifyStatus =data.userVerifyStatus;
};
export default  mutations;
