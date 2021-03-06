<template>
    <div class="info" flex="dir:top" ref="info">
        <div class="header" flex-box="0">
            根据证监会《证券期货投资者适当性管理办法》规定，投资者需要留存自己的详细住址信息。
        </div>
        <div class="content" flex-box="1">
            <div class="card-item" flex @click="selecting('address')">
                <div class="title" flex-box="1">请选择所在省</div>
                <div flex-box="0" class="icon-warp">
                    <KingoldPicker :slots="slots" v-if="isPick" @back="callback" @onValuesChange="onValuesChange"
                                   :multipick="true"></KingoldPicker>
                    {{provinceName}}
                    <img src="../images/arrow-right.png"/>
                </div>
            </div>
            <div class="card-item" flex @click="selecting('address')">
                <div class="title" flex-box="1">请选择所在市</div>
                <div flex-box="0" class="icon-warp">
                    {{cityName}}
                    <img src="../images/arrow-right.png"/>
                </div>
            </div>
            <div class="card-item" flex @click="selecting('address')">
                <div class="title" flex-box="1">请选择所在区县</div>
                <div flex-box="0" class="icon-warp">
                    {{countyName}}
                    <img src="../images/arrow-right.png"/>
                </div>
            </div>
            <div class="card-item">
                <div class="title" flex-box="1">请输入详细地址</div>
                <div class="address">
                    <textarea class="textarea" v-model="detailAddress"></textarea>
                </div>
            </div>
            <div class="card-item" flex="cross:center" @click="selecting('career')">
                <div class="title" flex-box="0">请选择职业类型</div>
                <div flex-box="1" class="icon-warp">
                    <KingoldPicker :list="careers" v-if="careerPick" @back="careerBack"></KingoldPicker>
                    {{careerText}}
                    <img src="../images/arrow-right.png"/>
                </div>
            </div>
        </div>
        <div class="footer" @click.stop="setData">提交</div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import $api from '../tools/api';
    import KingoldPicker from '../components/KingoldPicker';
    import $device from '../tools/device';
    import {Toast} from 'mint-ui';
    import '../less/fund/info.less';
    export default {
        name: 'info',
        data(){
            return {
                provinces: [],
                provinceCode: '',
                provinceName: '',
                cityCode: '',
                cityName: '',
                countyCode: '',
                countyName: '',
                detailAddress: '',
                slots: [],
                isPick: false,
                careers: [
                    {code: '01', name: '党政机关、事业单位'},
                    {code: '02', name: '企业单位'},
                    {code: '03', name: '自由业主'},
                    {code: '04', name: '学生'},
                    {code: '05', name: '军人'},
                    {code: '06', name: '其他'}
                ],
                careerPick: false,
                careerText: '',
                career: '',
                terminalInfo: ''
            }
        },
        components: {
            KingoldPicker
        },
        created(){
            this.addHive(1, 'fundsInfo',1053);
            let event = ['_trackEvent', '适当性信息录入', 'SHOW', '进入适当性信息录入页面', '进入适当性信息录入页面'];
            window._hmt.push(event);
            this.getArea();
            this.terminalInfo = $device.os + '-' + $device.osVersion;
            this.getInfo();
        },
        computed: {
            ...mapState(['userUuid'])
        },
        methods: {
            setData(){
                this.addHive(0, 'fundsInfo_btn_submit',105301);
                let event = ['_trackEvent', '适当性信息录入', 'CLICK', '适当性信息录入-点击提交', '适当性信息录入-点击提交'];
                window._hmt.push(event);
                if (!this.checkWord()) {
                    return;
                }
                let {career, provinceName, cityName, countyName, detailAddress, terminalInfo, provinceCode, cityCode, countyCode} = this;
                $api.post('/fund/account/save/adequacy', {
                    career,
                    provinceName,
                    cityName,
                    countyName,
                    detailAddress,
                    provinceCode,
                    cityCode,
                    countyCode,
                    terminalInfo
                }).then((resp) => {
                    if (resp.code == 200) {
                        this.$store.dispatch('getAccountInfo');
                        this.addHive(2, 'fundsInfo_to_lastPage',1053);
                        this.$router.back();
                    } else {
                        Toast(resp.msg);
                    }
                });
            },
            checkWord(){
                if (!this.provinceCode) {
                    Toast('请选择所在省');
                    return false;
                }
                if (!this.detailAddress) {
                    Toast('请输入详细地址');
                    return false;
                }
                let patt = /[\ud800-\udbff][\udc00-\udfff]/g;
                if (patt.test(this.detailAddress)) {
                    Toast('请输入正确的详细地址');
                    return false;
                }
                if (!this.career) {
                    Toast('请选择职业类型');
                    return false;
                }
                return true;
            },
            careerBack(result){
                this.careerPick = false;
                if (result == 0) {
                    return;
                }
                result = result || this.careers[2];
                this.career = result.code;
                this.careerText = result.name;
            },
            selecting(t){
                if (t == 'address') {
                    this.addHive(0, 'fundsInfo_btn_selectAddress',105302);
                    let event = ['_trackEvent', '适当性信息录入', 'CLICK', '适当性信息录入-选择地址', '适当性信息录入-选择地址'];
                    window._hmt.push(event);
                    this.isPick = true;
                } else {
                    this.addHive(0, 'fundsInfo_btn_selectCareer',105303);
                    let event = ['_trackEvent', '适当性信息录入', 'CLICK', '适当性信息录入-选择职业', '适当性信息录入-选择职业'];
                    window._hmt.push(event);
                    this.careerPick = true;
                }
            },
            onValuesChange(picker, values){
                let cities = [];
                let areas = [];
                if (!values[0]) {
                    cities = this.provinces[2].cities;
                    areas = values[1] ? values[1].areas : this.provinces[2].cities[2].areas;
                } else {
                    cities = values[0].cities;
                    areas = values[1].areas;
                }
                picker.setSlotValues(1, cities);
                picker.setSlotValues(2, areas);
            },
            callback(result){
                this.isPick = false;
                if (result == 0) {
                    return;
                }
                if (!result[0]) {
                    result[0] = this.provinces[2];
                }
                this.provinceCode = result[0].code;
                this.provinceName = result[0].state;
                this.cityCode = result[1].code;
                this.cityName = result[1].city;
                this.countyCode = result[2].code;
                this.countyName = result[2].area;
            },
            /*获取区域数据*/
            getArea(){
                if (window.localStorage.getItem('cityArea')) {
                    this.provinces = JSON.parse(window.localStorage.getItem('cityArea'));
                    this.farmatSlots();
                    return false;
                }
                $api.getNode('/assets/getArea')
                    .then((res) => {
                        this.provinces = res.data;
                        this.farmatSlots();
                        window.localStorage.setItem('cityArea', JSON.stringify(res.data));
                    })
            },
            farmatSlots(){
                //统一名称key
                this.provinces.map(p => {
                    p.name = p.state;
                    p.cities.map(c => {
                        c.name = c.city;
                        c.areas.map(a => {
                            a.name = a.area;
                        });
                    });
                });
                this.slots = [{
                    flex: 1,
                    values: this.provinces,
                    className: 'slot1',
                    textAlign: 'center'
                }, {
                    divider: true,
                    content: '-',
                    className: 'slot2'
                }, {
                    flex: 1,
                    values: [],
                    className: 'slot3',
                    textAlign: 'center'
                }, {
                    divider: true,
                    content: '-',
                    className: 'slot4'
                }, {
                    flex: 1,
                    values: [],
                    className: 'slot5',
                    textAlign: 'center'
                }];
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.slots[0].defaultIndex = 0;
                    }, 200);
                });

            },
            getInfo(){
                $api.get('/fund/account/adequacy', {
                    userUuid: this.userUuid
                })
                    .then(resp => {
                        this.provinceCode = resp.data.provinceCode;
                        this.provinceName = resp.data.provinceName;
                        this.cityCode = resp.data.cityCode;
                        this.cityName = resp.data.cityName;
                        this.countyCode = resp.data.countyCode;
                        this.countyName = resp.data.countyName;
                        this.detailAddress = resp.data.address;
                        this.career = resp.data.career;
                        if(this.career){
                            this.careers.map(item => {
                                if (item.code == this.career) {
                                    this.careerText = item.name
                                }
                            })
                        }
                    })
            }
        },
        mounted(){
            this.$refs.info.style.minHeight = window.innerHeight + 'px';
        },
        destroyed(){
            this.addHive(2, 'fundsInfo',1053);
        }
    }
</script>
