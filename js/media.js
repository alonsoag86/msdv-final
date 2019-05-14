// set the dimensions and margins of the graph
const margin = { top: 50, right: 50, bottom: 140, left: 180 };
const width = 1100 - margin.left - margin.right;
const height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3
  .select('#outlets-viz')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Initialize the X axis
const x = d3
  .scaleBand()
  .range([0, width])
  .padding(1);

const xAxis = svg.append('g').attr('transform', 'translate(0,' + height + ')');

// Initialize the Y axis
const y = d3.scaleLinear().range([height, 0]);

const yAxis = svg.append('g').attr('class', 'myYaxis');

// A function that create / update the plot for a given variable:
function update(selectedVar) {
  // Parse the Data

  d3.csv('js/data/media_tendency.csv').then(function(data) {
    data.forEach(function(d) {
      d.positive = +d.positive;
      d.negative = +d.negative;
      d.balanced = +d.balanced;
      d.informational = +d.informational;
      d.total = +d.total;
    });

    console.log(data);

    data.sort(function(a, b) {
      return b[selectedVar] - a[selectedVar];
    });

    // X axis
    x.domain(
      data.map(function(d) {
        return d.media_outlet;
      })
    );

    xAxis
      .transition()
      .duration(1000)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-40)')
      .style('text-anchor', 'end');

    // Add Y axis
    y.domain([
      0,
      d3.max(data, function(d) {
        return +d[selectedVar];
      }),
    ]);

    yAxis
      .transition()
      .duration(1000)
      .call(d3.axisLeft(y));

    const waypoint = new Waypoint({
      element: $('.buttons'),
      handler: function() {
        this.destroy();

        // variable u: map data to existing circle
        const j = svg.selectAll('.myLine').data(data);
        // update lines
        j.enter()
          .append('line')
          .attr('class', 'myLine')
          .merge(j)
          .transition()
          .duration(2000)
          .attr('x1', function(d) {
            //console.log(x(d.media_outlet));
            return x(d.media_outlet);
          })
          .attr('x2', function(d) {
            return x(d.media_outlet);
          })
          .attr('y1', y(0))
          .attr('y2', function(d) {
            return y(d[selectedVar]);
          })
          .attr('stroke', 'grey')
          .attr('stroke-width', 1);

        const colorScale = d3
          .scaleOrdinal()
          .domain([
            'positive',
            'negative',
            'balanced',
            'informational',
            'total',
          ])
          .range(['#5cdacc', '#ff1d34', '#ffc750', '#ff8c50', '#bfc0c1']);

        const div = d3
          .select('body')
          .append('div')
          .attr('class', 'tooltip')
          .style('opacity', 0);

        // variable u: map data to existing circle
        const u = svg.selectAll('circle').data(data);
        // update bars
        u.enter()
          .append('circle')
          .on('mouseover', function(d) {
            div
              .transition()
              .duration(200)
              .style('opacity', 0.9);
            div
              .html(
                '<h6 "class:div-title">' +
                  d.media_outlet +
                  '</h6>' +
                  'total:' +
                  ' ' +
                  d.total +
                  '<br/>' +
                  'positive:' +
                  ' ' +
                  d.positive +
                  '<br/>' +
                  'negative:' +
                  ' ' +
                  d.negative +
                  '<br/>' +
                  'balanced:' +
                  ' ' +
                  d.balanced +
                  '<br/>' +
                  'informational:' +
                  ' ' +
                  d.informational
              )
              .style('left', d3.event.pageX + 'px')
              .style('top', d3.event.pageY - 28 + 'px');
          })
          .on('mouseout', function(d) {
            div
              .transition()
              .duration(500)
              .style('opacity', 0);
          })
          .merge(u)
          .transition()
          .duration(2000)
          .attr('cx', function(d) {
            return x(d.media_outlet);
          })
          .attr('cy', function(d) {
            return y(d[selectedVar]);
          })
          .attr('r', 6)
          .attr('fill', colorScale(selectedVar));
      },
      offset: '50%',
    });
  });
}

update('total');
