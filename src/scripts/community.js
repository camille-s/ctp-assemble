d3.queue()
    .defer(d3.csv, '../assets/data/community/wellbeing_survey_trend.csv')
    // .defer(d3.json, '')
    .await(initCommunity);

function initCommunity(error, safety) {
    if (error) throw error;

    safety.forEach(function(d) {
        d.value = +d.value;
    });

    var safetyTrend = makeSafetyTrend(safety);

    d3.select(window).on('resize', function() {
        safetyTrend = makeSafetyTrend(safety);

        redrawDots();
    });

    redrawDots();
}

function makeSafetyTrend(data) {
    var margin = { top: 24, right: 32, bottom: 48, left: 32 };

    var svg = d3.select('#safety-trend')
        .select('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .html('');

    var chart = new dimple.chart(svg, data);
    chart.setMargins(margin.left, margin.top, margin.right, margin.bottom);

    var x = chart.addTimeAxis('x', 'year', '%Y', '%Y');
    x.title = null;

    var y = chart.addMeasureAxis('y', 'value');
    y.tickFormat = '.0%';
    y.ticks = 4;

    chart.defaultColors = [ pink, dkblue ];
    var line = chart.addSeries('name', dimple.plot.line);
    line.lineMarkers = true;

    chart.draw();

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .html(trendTip);

    svg.selectAll('circle.dimple-marker')
        .call(tip)
        .on('mouseover', function(d) {
            tip.show(d);
            dotOver(this);
        })
        .on('mouseout', function(d) {
            tip.hide(d);
            dotOut(this);
        })
        .on('touchstart', function(d) {
            d3.event.preventDefault();
            tip.show(d);
            dotOver(this);
        });

    return chart;
}
