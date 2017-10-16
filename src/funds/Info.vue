<template>
    <div class="info">
        <div class="header">
            根据证监会《证券期货投资者适当性管理办法》规定，投资者需要留存自己的详细住址信息。
        </div>
        <div class="content">
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
            <div class="card-item" >
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
                    {code: '01',name:'党政机关、事业单位'},
                    {code: '02',name:'企业单位'},
                    {code: '03',name:'自由业主'},
                    {code: '04',name:'学生'},
                    {code: '05',name:'军人'},
                    {code: '06',name:'其他'}
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
            this.getArea();
            this.terminalInfo = $device.os + '-' + $device.osVersion;
        },
        computed: {},
        methods: {
            setData(){
                if(!this.checkWord()){
                    return;
                }
                let {career, provinceName, cityName, countyName, detailAddress, terminalInfo, provinceCode, cityCode, countyCode} = this;
                $api.post('/fund/account/save/adequacy',{
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
                    if(resp.code == 200){
                        this.$store.dispatch('getAccountInfo');
                        this.$router.back();
                    }else{
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
                if (!this.career) {
                    Toast('请选择职业类型');
                    return false;
                }
                return true;
            },
            careerBack(result){
                this.careerPick = false;
                if(result == 0){
                    return;
                }
                result = result || this.careers[2];
                this.career = result.code;
                this.careerText = result.name;
            },
            selecting(t){
                if(t == 'address'){
                    this.isPick = true;
                }else{
                    this.careerPick = true;
                }
            },
            onValuesChange(picker,values){
                let cities = [];
                let areas = [];
                if(!values[0]){
                    cities = this.provinces[2].cities;
                    areas = values[1] ? values[1].areas : this.provinces[2].cities[2].areas;
                }else{
                    cities = values[0].cities;
                    areas = values[1].areas;
                }
                picker.setSlotValues(1, cities);
                picker.setSlotValues(2, areas);
            },
            callback(result){
                this.isPick = false;
                if(result == 0){
                    return;
                }
                if(!result[0]){
                    result[0] = this.provinces[2];
                }
                this.provinceCode = result[0].code;
                this.provinceName = result[0].state;
                this.cityCode = result[1].cityCode;
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

            }
        },
        destroyed(){

        }
    }
</script>
