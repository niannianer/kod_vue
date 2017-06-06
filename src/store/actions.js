/**
 * Created by hekk on 2017/5/23.
 */

'use strict';
const actions = {};
import $api from '../tools/api';
// 认证信息
let getUserVerifyStatus = () => {
    return $api.get('/getUserVerifyStatus');
};
//
let  getAccountBaofoo =()=>{
    return $api.get('/getAccountBaofoo');
};
actions.changeName = ({commit}, name) => {
    commit('changeName', name)
};
actions.increment = ({commit}, num) => {
    commit('increment', num)
};
actions.getUserVerifyStatus = ({commit}) => {
   return getUserVerifyStatus()
        .then(data => {
            if (data.code == 200) {
                commit('setUserVerifyStatus', {userVerifyStatus:data.data});
            } else {
                commit('setUserVerifyStatus', {userVerifyStatus: 0});
            }

        });
};
actions.getAccountBaofoo=({commit})=>{
    return getAccountBaofoo()
        .then(data=>{
            if(data.code==200){
                commit('setAccountBaofoo',data.data);
            }else {
                commit('setAccountBaofoo',{});
            }

        });
};
export default actions;
