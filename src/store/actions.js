/**
 * Created by hekk on 2017/5/23.
 */

'use strict';
const actions = {};
import $api from '../tools/api';

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
//  银行卡信息
let getBankInfo = () => {
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
actions.setEligibleInvestor = ({commit},data) => {
    commit('setEligibleInvestor',data);
};


//获取体验金总资产收益等

let getExperienceSum = () =>{
    return $api.get('/experience/sum');
}
actions.getExperienceSum = ({commit}) => {
    return getExperienceSum()
        .then(data => {
            if (data.code == 200) {
                commit('setExperienceSum', data.data)
            }
            return data;
        });
};
export default actions;
