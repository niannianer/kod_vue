/**
 * Created by hekk on 2017/6/3.
 */
import Vue from 'vue';

const AlertConstructor = Vue.extend(require('./Alert.vue'));

let instance = null;
let initInstance = () => {
    instance = new AlertConstructor({
        el: document.createElement('div')
    });
    instance.close = () => {
        instance.visible = false;
        window.setTimeout(() => {
            document.body.removeChild(instance.$el);
        });
    };
};
let Alert = (options) => {
    if (!instance) {
        initInstance();
    }
    document.body.appendChild(instance.$el);

    Vue.nextTick(() => {
        instance.visible = true;
    });
    instance.title = options.title || '提示';
    instance.content = options.content || '';
    instance.okText = options.okText || '确定';
    instance.callback = () => {
        instance.visible = false;
        window.setTimeout(() => {
            document.body.removeChild(instance.$el);
        });
        if (options.callback) {
            options.callback(1);
        }
    };
    return instance;
}
export default Alert;
