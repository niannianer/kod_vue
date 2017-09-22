<template>
    <div class="total-assets">

    </div>
</template>

<script>
    export default {
        name: 'total-assets',
        data(){
            return {}
        },
        created(){
        },
        computed: {},
        methods: {
            svgCircle(cx, cy, r, values, colors, stroke){
                var paper = this,
                    rad = Math.PI / 180,
                    chart = this.set();
                function sector(cx, cy, r, startAngle, endAngle, params) {
                    var x1 = cx + r * Math.cos(-startAngle * rad),
                        x2 = cx + r * Math.cos(-endAngle * rad),
                        y1 = cy + r * Math.sin(-startAngle * rad),
                        y2 = cy + r * Math.sin(-endAngle * rad);
                    return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
                }
                var angle = 0,
                    total = 0,
                    start = 0,
                    process = function (j) {
                        var value = values[j],
                            angleplus = 360 * value / total,
                            popangle = angle + (angleplus / 2),
                            color = colors[j],
                            ms = 500,
                            delta = 30,
                            p = sector(cx, cy, r, angle, angle + angleplus, {fill: "90-" + color + "-" + color, stroke: stroke, "stroke-width": 3});
                        p.mouseover(function () {
                            p.stop().animate({transform: "s1.1 1.1 " + cx + " " + cy}, ms, "elastic");
                        }).mouseout(function () {
                            p.stop().animate({transform: ""}, ms, "elastic");
                        });
                        angle += angleplus;
                        chart.push(p);

                        start += .1;
                    };
                for (var i = 0, ii = values.length; i < ii; i++) {
                    total += values[i];
                }
                for (i = 0; i < ii; i++) {
                    process(i);
                }
                return chart;


           /*     var values = [20,20,20,20,20,20,20,20],
                    colors = ["#FFF001","#5FB982","#2EC9E8","#FF6B01","#D0EAE7","#51473D","#AD2B1B","#3B2F83"];
                Raphael("holder", 300, 300).pieChart(150, 150, 100, values, colors, "");*/

            }
        },
        destroyed(){

        }
    }
</script>
