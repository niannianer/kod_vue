<template>
    <div class="total-assets">
        <div class="header">
            <ul flex class="ul">
                <li :class="{'left':true,'active':active==0}" flex-box="1" @click.stop="active = 0" class="li">
                    总资产
                </li>
                <li :class="{'right':true,'active':active==1}" flex-box="1" @click.stop="active =1" class="li">
                    累计收益
                </li>
            </ul>
            <p class="detail color-text">明细</p>
        </div>
        <div class="chart-part">
            <p class="title">
                总资产（元）
            </p>
            <p class="info">
                7,106.00
            </p>
            <div class="svg">
                <svg ref="box"></svg>
                <div class="svg-tip" flex="dir:top main:center">
                    <p>资产</p>
                    <p>结构</p>
                </div>
            </div>
        </div>
        <div class="list">
            <div class="item" flex="cross:center">
                <img src="../images/total-assets/fixi.png" alt="" class="logo" flex-box="0">
                <p flex-box="1" class="color-text"> 定期理财</p>
                <p flex-box="0">2000.00元</p>
                <img src="../images/arrow-right.png" alt="" class="arrow" flex-box="0">
            </div>
            <div class="item" flex="cross:center">
                <img src="../images/total-assets/fund.png" alt="" class="logo" flex-box="0">
                <p flex-box="1" class="color-text"> 基金</p>
                <p flex-box="0">2000.00元</p>
                <img src="../images/arrow-right.png" alt="" class="arrow" flex-box="0">
            </div>
            <div class="item" flex="cross:center">
                <img src="../images/total-assets/remain.png" alt="" class="logo" flex-box="0">
                <p flex-box="1" class="color-text"> 账户余额</p>
                <p flex-box="0">2000.00元</p>
                <img src="../images/arrow-right.png" alt="" class="arrow" flex-box="0">
            </div>
            <div class="item" flex="cross:center">
                <img src="../images/total-assets/froze.png" alt="" class="logo" flex-box="0">
                <p flex-box="1" class="color-text"> 冻结金额</p>
                <p flex-box="0" class="mr">2000.00元</p>
            </div>
        </div>


    </div>
</template>

<script>
    import '../less/total-assets.less';
    export default {
        name: 'total-assets',
        data(){
            return {
                active: 0
            }
        },
        mounted(){
            this.pieChart(this.$refs.box, [60, 20, 20], 126, 126,
                ['#1D72C0', '#fe9c53', '#D0021B'])
        },
        computed: {},
        methods: {
            pieChart(svgObj, data, width, height, colors){
                let cx = width / 2;
                let cy = height / 2;
                let r = (width / 2 - 1);
                //这个表示svg元素的xml命名空间
                var svgns = "http://www.w3.org/2000/svg";
                //创建一个<svg>元素，同时指定像素大小和用户坐标
                /*     var chart=document.createElementNS(svgns,"svg:svg");*/
                svgObj.setAttribute("width", width);
                svgObj.setAttribute("height", height);
                svgObj.setAttribute("viewBox", "0 0 " + width + " " + height);
                //累加data值，以便于知道饼状图的大小
                var total = 0;
                for (var i = 0; i < data.length; i++) {
                    total += data[i];
                }
                //现在计算出饼状图每个分片的大小，其中角度以弧度制计算
                var angles = [];
                for (let i = 0; i < data.length; i++)
                    angles[i] = data[i] / total * Math.PI * 2;
                //遍历病状图的每个分片
                let starttangle = 0;
                for (let i = 0; i < data.length; i++) {
                    //这里表示楔的结束为止
                    var endangle = starttangle + angles[i];
                    //计算出楔和园橡胶的两个点
                    //这些计算公式都是以12点钟方向为0°
                    //顺时针方向角度递增
                    var x1 = cx + r * Math.sin(starttangle);
                    var y1 = cy - r * Math.cos(starttangle);
                    var x2 = cx + r * Math.sin(endangle);
                    var y2 = cy - r * Math.cos(endangle);
                    //这个标记表示角度大于半圆
                    //此标记在绘制SBG弧形组件的时候需要
                    var big = 0;
                    if (endangle - starttangle > Math.PI) big = 1;
                    //使用<svg:path>元素来描述楔
                    //要注意的是，使用ctreateElementNS()来创建该元素
                    var path = document.createElementNS(svgns, "path");
                    //下面的字符串包含路径的详细信息
                    var d = "M " + cx + "," + cy + //从圆心开始
                        " L " + x1 + "," + y1 +   //画一条到(x1,y1)的线段
                        " A " + r + "," + r +     //再画一条半径为r的弧
                        " 0 " + big + " 1 " +    // 弧的详细信息
                        x2 + "," + y2 +    //弧到(x2,y2)结束
                        " Z";   //d当前路径到(cx,cy)结束
                    //设置<svg:path>元素的属性
                    path.setAttribute("d", d);   //设置路径
                    path.setAttribute("fill", colors[i]); //设置楔的颜色
                    svgObj.appendChild(path); //将楔加入到饼状图中
                    //当前楔的结束就是下一个楔的开始
                    starttangle = endangle;
                }
            }
        },
        destroyed(){

        }
    }
</script>
