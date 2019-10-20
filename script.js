var url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';
var heatmapGraph = document.getElementById('heatmapGraph');
var width = 0.9 * heatmapGraph.parentElement.clientWidth;
var height = 0.86 * heatmapGraph.parentElement.clientHeight;
console.log(height);

var svg = d3.select('#heatmapGraph')
.append('svg')
.attr('width', width)
.attr('height', height);

//reload the page when window size changes so that svg dimensions can be adjusted accordingly
window.onresize = () => location.reload();

const drawGraph = (data) => {
    
    //define x-axis scale
    var xAxisScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.year), d3.max(data, d => d.year)])
    .range([0, width]);
    
    //set up the x axis orientation
    var xAxis = d3.axisBottom(xAxisScale).tickFormat(d3.format('d'));
    
    //append the x axis to svg
    svg.append("g")
    .attr('transform', 'translate(20, '+ (height-20) + ')')
    .call(xAxis);
}

d3.json(url).then(data => {
    var data = data.monthlyVariance;
    drawGraph(data);
}).catch(error => {
    console.log(error);
});