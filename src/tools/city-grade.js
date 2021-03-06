/**
 * Created by DELL on 2017/6/13.
 */

//一线
let gradeOne = `成都市、杭州市、武汉市、南京市、重庆市、西安市、长沙市、青岛市、沈阳市、大连市、厦门市、苏州市、宁波市、无锡市`;
// 二线
let gradeTwo = `福州市、合肥市、郑州市、哈尔滨市、佛山市、济南市、东莞市、昆明市、太原市、南昌市、南宁市、温州市、石家庄市、长春市、泉州市、
贵阳市、常州市、珠海市、金华市、烟台市、海口市、惠州市、乌鲁木齐市、徐州市、潍坊市、洛阳市、南通市、嘉兴市、扬州市、汕头市`;
// 热门
let gradeHot = `北京、上海、广州、深圳、天津`;
let hotD = [{
    name: '北京',
    value: 5766,
    zip:'010'
}, {
    name: '上海',
    value: 6689,
    zip:'021'
}, {
    name: '广州',
    value: 5374,
    zip:'020'
}, {
    name: '深圳',
    value: 6284,
    zip:'0755'
}, {
    name: '天津',
    value: 3870,
    zip:'022'
}];
let hotE = [{
    name: '北京',
    value: 3355
}, {
    name: '上海',
    value: 3746
}, {
    name: '广州',
    value: 3200
}, {
    name: '深圳',
    value: 3615
}, {
    name: '天津',
    value: 2525
}];
let hotG = [{
    name: '北京',
    value: 1.4
}, {
    name: '上海',
    value: 2.0
}, {
    name: '广州',
    value: 2.7
}, {
    name: '深圳',
    value: 2.3
}, {
    name: '天津',
    value: 2.1
}];
let prices=[{
    name: '北京',
    value: 2151719
}, {
    name: '上海',
    value: 1518384
}, {
    name: '广州',
    value: 1507958
}, {
    name: '深圳',
    value: 2851128
}, {
    name: '天津',
    value: 942983
}]
export let getValueD = (name = '') => {
    if (!name) {
        return 3113;
    }
    for (let d in hotD) {
        if (name.indexOf(hotD[d].name) > -1) {
            return hotD[d].value
        }
    }
    if (gradeOne.indexOf(name) > -1) {
        return 4004;
    }
    if (gradeTwo.indexOf(name) > -1) {
        return 3702;
    }
    return 3113;
};
export let getValueE = (name = '') => {
    if (!name) {
        return 1868;
    }
    for (let d in hotE) {
        if (name.indexOf(hotE[d].name) > -1) {
            return hotE[d].value
        }
    }
    if (gradeOne.indexOf(name) > -1) {
        return 2442;
    }
    if (gradeTwo.indexOf(name) > -1) {
        return 2184;
    }
    return 1868;
};

export let getValueG = (name = '') => {
    if (!name) {
        return 2.1;
    }
    for (let d in hotG) {
        if (name.indexOf(hotG[d].name) > -1) {
            return hotG[d].value
        }
    }
    if (gradeOne.indexOf(name) > -1) {
        return 1.9;
    }
    if (gradeTwo.indexOf(name) > -1) {
        return 2;
    }
    return 2.1;
};
export let getPrice=(name='')=>{
    if (!name) {
        return 610575;
    }
    for (let d in prices) {
        if (name.indexOf(prices[d].name) > -1) {
            return prices[d].value
        }
    }
    if (gradeOne.indexOf(name) > -1) {
        return 796509;
    }
    if (gradeTwo.indexOf(name) > -1) {
        return 762466;
    }
    return 610575;
}
export  default {
    gradeOne,
    gradeTwo,
    gradeHot,hotD
};
