var url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';
var heatmapGraph = document.getElementById('heatmapGraph');
var width = 0.98 * Math.floor(heatmapGraph.parentElement.clientWidth);
var height = 0.86 * Math.floor(heatmapGraph.parentElement.clientHeight);
var padding = {"top": 10, "right": 10, "bottom": 40, "left": 60};

var svg = d3.select('#heatmapGraph')
.append('svg')
.attr('width', width)
.attr('height', height);

//reload the page when window size changes so that svg dimensions can be adjusted accordingly
window.onresize = () => location.reload();

//function to draw the graph
const drawGraph = (dataset) => {
    var data = dataset.monthlyVariance;
    var baseTemperature = dataset.baseTemperature;
    
    //define x-axis scale
    var xAxisScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.year), d3.max(data, d => d.year)])
    .range([0, width-padding.left-padding.right]);
    
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
    .attr('transform', 'translate('+ padding.left +', '+ padding.top + ')')
    .call(yAxis);
    
    var barWidth = width/(data.length/12);
    var barHeight = height/12;
        
    //define color scale for the bars
    var colorScale = d3.scaleSequential(d3.interpolateRdBu).domain(d3.extent(data, d => d.variance));
    
    svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'cell')
    .attr('width', barWidth)
    .attr('height', barHeight)
    .attr('x', d => xAxisScale(d.year))
    .attr('y', d => yAxisScale(d.month))
    .attr('transform', 'translate('+ padding.left + ',' + padding.top +')')
    .style('fill', (d, i) => colorScale(d.variance))
    .append('title')
    .text(d => d.variance);
}


d3.json(url).then(dataset => {
    drawGraph(dataset);
}).catch(error => {
    console.log(error);
});