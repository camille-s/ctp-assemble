d3.queue()
    .defer(d3.csv, '../assets/data/community/wellbeing_survey_trend.csv')
    // .defer(d3.json, '')
    .await(initCommunity);

function initCommunity(error, safetyTrend) {
    if (error) throw error;

    safetyTrend.forEach(function(d) {
        d.value = +d.value;
    });

    console.log(safetyTrend);
}
