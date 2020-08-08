// Plot D3 bar chart


d3.json("/agency").then(data => {
    // console.log(data)

    var keys = []
    var values = []

    sortedlist.forEach(borough => {
        keys.push(borough[0]);
        values.push(borough[1])
    })

    var data = [
        {
            type: 'bar',
            x: values,
            y: keys,
            orientation: "h"
        },
    ];
    var layout = {
        title: "311 Calls By Agency",
        autosize: false,
        width: 550,
        height: 550,
        margin: {
            l: 200,
            r: 50,
            b: 50,
            t: 50,
            pad: 5
        }
    }
    var config = { responsive: true }
    Plotly.newPlot('311_calls_by_Agency', data, layout, config);
});




// Plot D3 borough pie chart

d3.json("/borough").then(data => {
    // console.log(data)

    var labels = Object.keys(data)
    var values = Object.values(data)
    var trace = {
        type: 'pie',
        labels: labels,
        values: values
    }
    var layout = {
        width: 375,
        height: 375,
        title: '311 Calls by Borough'
    }
    var config = { responsive: true }
    Plotly.newPlot('borough_pie_chart', [trace], layout, config);
});



// Plot D3 borough bubble chart

d3.json("/complaint").then(data => {
    // console.log(data)


    var diameter = 600;

    var svg = d3.select('#graph').append('svg')
        .attr('width', diameter)
        .attr('height', diameter);

    var bubble = d3.layout.pack()
        .size([diameter, diameter])
        .value(function (d) { return d.size; })
        // .sort(function(a, b) {
        // 	return -(a.value - b.value)
        // }) 
        .padding(3);

    // generate data with calculated layout values
    var nodes = bubble.nodes(processData(json))
        .filter(function (d) { return !d.complaint; }); // filter out the outer bubble

    var vis = svg.selectAll('circle')
        .data(nodes);

    vis.enter().append('circle')
        .attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')'; })
        .attr('r', function (d) { return d.r; })
        .attr('class', function (d) { return d.complaint; });

    function processData(data) {
        var obj = data.complaint;

        var newDataSet = [];

        for (var prop in obj) {
            newDataSet.push({ name: prop, complaint: prop.toLowerCase(), size: obj[prop] });
        }
        return { complaint: newDataSet };
    }

})();