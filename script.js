var url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';

function drawGraph(data) {
    console.log(data.monthlyVariance[0]);
}
d3.json(url).then(data => {
    drawGraph(data);
}).catch(error => {
    console.log(error);
})