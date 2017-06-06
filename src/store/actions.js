/**
 * Created by hekk on 2017/5/23.
 */

'use strict';
const actions = {};
import $api from '../tools/api';
let getUserVerifyStatus = () => {
    return $api.get('/getUserVerifyStatus');
};
actions.changeName = ({commit}, name) => {
    commit('changeName', name)
};
actions.increment = ({commit}, num) => {
    commit('increment', num)
};
actions.getUserVerifyStatus = ({commit}) => {
    getUserVerifyStatus()
        .then(data => {
            if (data.code == 200) {
                commit('setUserVerifyStatus', {userVerifyStatus:data.data});
            } else {
                commit('setUserVerifyStatus', {userVerifyStatus: 0});
            }

        });
}
export default actions;
