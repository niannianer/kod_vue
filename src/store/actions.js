/**
 * Created by hekk on 2017/5/23.
 */

'use strict';
const actions = {};
import $api from '../tools/api';
import requestHybrid from '../tools/hybrid';
import $device from '../tools/device';

//资产信息
let getAccountBaofoo = () => {
    return $api.get('/getAccountBaofoo');
};
actions.getAccountBaofoo = ({commit}) => {
    return getAccountBaofoo()
        .then(data => {
            if (data.code == 200) {
                commit('setAccountBaofoo', data.data);
            } else {
                commit('setAccountBaofoo', {});
            }
            return data;

        });
};
// 刷新app个人信息
let refreshApp = () => {
    if ($device.kingold && $device.kingoldVersion >= '1.0.5') {
        requestHybrid({
            tagname: 'refreshUserInfo',
            param: {}
        });
    }
};
//  银行卡信息
let getBankInfo = () => {
    refreshApp();
    return $api.get('/getUserBankCardInfo');
};
actions.getBankInfo = ({commit}) => {
    getBankInfo()
        .then(data => {
            if (data.code == 200) {
                let {bankUserCardNo} = data.data;
                commit('setBankUser', data.data);
                if (!bankUserCardNo) {
                    return false;
                }
                return $api.get('/getBankInfo', {bankNo: bankUserCardNo.substring(0, 6)})
                    .then(data => {
                        if (data.code == 200) {
                            commit('setBankInfo', data.data);
                        }
                    });
            }
        });
};

// 个人信息
let getUserInfo = () => {
    refreshApp();
    return $api.get('/getUserInfo');
};
actions.getUserInfo = ({commit}) => {
    return getUserInfo()
        .then(data => {
            if (data.code == 200) {
                commit('setUserInfo', data.data)
            }
            return data;
        });
};
actions.setEligibleInvestor = ({commit}, data) => {
    commit('setEligibleInvestor', data);
};


//获取体验金总资产收益等

let getExperienceSum = () => {
    return $api.get('/experience/sum');
}
actions.getExperienceSum = ({commit}) => {
    return getExperienceSum()
        .then(data => {
            if (data.code == 200) {
                commit('setExperienceSum', data.data);
            }
            return data;
        });
};

let getPersonalCenterMsg = () => {
    return $api.get('/personalCenter');
}
actions.getPersonalCenterMsg = ({commit}) => {
    return getPersonalCenterMsg()
        .then(data => {
            if (data.code == 200) {
                commit('setPersonalCenterMsg', data.data);
                commit('setUserInfo', data.data.user)
            }
            return data;
        });
};

//  获取基金账户信息
let getAccountInfo = () => {
    return $api.get('/fund/account/info');
};
actions.getAccountInfo = ({commit}) => {
    return getAccountInfo()
        .then(data => {
            if (data.code == 200) {
                commit('setAccountInfo', data.data);
            }
            return data;
        });
};

//  获取绑定盈米支付信息
let getPaymentInfo = () => {
    return $api.get('/fund/account/payment');
};
actions.getPaymentInfo = ({commit}) => {
    return getPaymentInfo()
        .then(data => {
            if (data.code == 200) {
                commit('setPaymentInfo', data.data);
            }
            return data;
        });
};

//  获取风险评估结果
let getRiskInfo = () => {
    let terminalInfo = $device.os + '-' + $device.osVersion;
    return $api.get('/fund/account/risk', {terminalInfo});
};
actions.getRiskInfo = ({commit}) => {
    return getRiskInfo()
        .then(data => {
            if (data.code == 200) {
                commit('setRiskInfo', data.data);
            }
            return data;
        });
};
export default actions;
