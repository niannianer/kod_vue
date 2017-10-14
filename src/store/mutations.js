/**
 * Created by hekk on 2017/5/23.
 */
'use strict';
import _ from 'lodash/core';
const mutations = {};

// 资产信息
mutations.setAccountBaofoo = (state, data) => {
    _.forEach(state, (value, key) => {
        if (data.hasOwnProperty(key)) {
            state[key] = data[key];
        }
    });
};
// 绑卡信息
mutations.setBankUser = (state, data) => {
    _.forEach(state, (value, key) => {
        if (data.hasOwnProperty(key)) {
            state[key] = data[key];
        }
    });
};

// 银行卡限额信息
mutations.setBankInfo = (state, data) => {
    if (data && data.bank_code) {
        _.forEach(state, (value, key) => {
            if (data.hasOwnProperty(key)) {
                state[key] = data[key];
            }
        });
    }
};
// 个人信息
mutations.setUserInfo = (state, data) => {
    if (data.userUuid) {
        _.forEach(state, (value, key) => {
            if (data.hasOwnProperty(key)) {
                state[key] = data[key];
            }
        });

    }

};
mutations.setEligibleInvestor = (state, data) => {
    state.isEligibleInvestor = data;
};

mutations.setExperienceSum = (state,data) =>{
    _.forEach(state, (value, key) => {
        if (data.hasOwnProperty(key)) {
            state[key] = data[key];
        }
    });
}
mutations.setPersonalCenterMsg = (state,data) =>{
    _.forEach(state, (value, key) => {
        if (data.hasOwnProperty(key)) {
            state[key] = data[key];
        }
    });

}
export default  mutations;
