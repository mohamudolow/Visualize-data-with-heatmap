var url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';
var heatmapGraph = document.getElementById('heatmapGraph');
var width = 0.9 * heatmapGraph.parentElement.clientWidth;
var height = 0.86 * heatmapGraph.parentElement.clientHeight;
var padding = {"top": 10, "right": 10, "bottom": 30, "left": 80};

var svg = d3.select('#heatmapGraph')
.append('svg')
.attr('width', width)
.attr('height', height);

//reload the page when window size changes so that svg dimensions can be adjusted accordingly
window.onresize = () => location.reload();

const drawGraph = (data) => {
    
    //yAxisScale.domain(data, d => d.variance);
    
    //define x-axis scale
    var xAxisScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.year), d3.max(data, d => d.year)])
    .range([0, width]);
    
    //set up the x axis orientation
    var xAxis = d3.axisBottom(xAxisScale).tickFormat(d3.format('d'));
    
    //append the x axis to svg
    svg.append("g")
    .attr('transform', 'translate('+ padding.left +', '+ (height-padding.bottom) + ')')
    .call(xAxis);
    
    //define y-axis scale
    var yAxisScale = d3.scaleBand()
    .domain(data.map(d => d.month))
    .rangeRound([height-padding.top-padding.bottom, 0]);
    var yAxis = d3.axisLeft(yAxisScale).tickValues(yAxisScale.domain()).tickFormat(month => {
        var date = new Date(0);
        date.setUTCMonth(month);
        return d3.timeFormat('%B')(date);
    });
    
    svg.append('g')
    .attr('transform', 'translate('+ padding.left +', '+ padding.right + ')')
    .call(yAxis);
}

d3.json(url).then(data => {
    var data = data.monthlyVariance;
    drawGraph(data);
}).catch(error => {
    console.log(error);
});