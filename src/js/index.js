import hello from './module';

var data = [{
    index: 0,
    value: .5
}];

var widthX = 800,
    heightX = 200,
    delim = 4;

var scaleX = d3.scaleLinear()
    .domain([0, 1])
    .rangeRound([0, widthX]);

var y = d3.scaleLinear()
    .domain([0, data.length])
    .rangeRound([0, heightX]);

var svgX = d3.select("body")
    .select(".interactive-bar-chart")
    .append("svg")
    .attr("width", widthX)
    .attr("height", heightX)
    .append('g');

svgX
    .append("rect")
    .attr("border", 1)
    .style("stroke", "black")
    .style("fill", "none")
    .attr("width", widthX)
    .attr("height", heightX);

// Moveable barChart

var brushX = d3.brushX()
    .extent(function(d, i) {
        return [
            [0, y(i) + delim / 2],
            [widthX, y(i) + heightX / data.length - delim / 2]
        ];
    })
    .on("brush", brushmoveX)
    .on("end", brushendX);



var svgbrushX = svgX
    .selectAll('.brush')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'brush')
    .append('g')
    .call(brushX)
    .call(brushX.move, function(d) {
        return [0, d.value].map(scaleX);
    });

svgbrushX
    .append('text')
    .attr('x', function(d) {
        return scaleX(d.value) - 10;
    })
    .attr('y', function(d, i) {
        return y(i) + y(0.5);
    })
    .attr('dy', '.35em')
    .attr('dx', +15)
    .style('fill', 'black')
    .text(function(d) {
        return d3.format(".0%")(d.value);
    })

function brushendX() {
    if (!d3.event.sourceEvent) return;
    if (d3.event.sourceEvent.type === "brush") return;
    if (!d3.event.selection) { // just in case of click with no move
        svgbrushX
            .call(brushX.move, function(d) {
                return [0, d.value].map(scaleX);
            });
    }
}

function brushmoveX() {
    if (!d3.event.sourceEvent) return;
    if (d3.event.sourceEvent.type === "brush") return;
    if (!d3.event.selection) return;

    var d0 = d3.event.selection.map(scaleX.invert);
    var d = d3.select(this).select('.selection');

    d.datum().value = d0[1]; // Change the value of the original data

    update();
}

function update() {
    svgbrushX
        .call(brushX.move, function(d) {
            return [0, d.value].map(scaleX);
        })
        .selectAll('text')
        .attr('x', function(d) {
            return scaleX(d.value) - 10;
        })
        .attr('dx', function(d) {
            if (d.value < .955)
                return 15
            else
                return -30
        })
        .text(function(d) {
            return d3.format(".0%")(d.value);
        });
}


hello();
