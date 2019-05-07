d3.csv('..msdv-final/data/media_tendency.csv')
  .then(function(data) {
    data.forEach(function(d) {
      d.positive = +d.positive;
      d.negative = +d.negative;
      d.balanced = +d.balanced;
      d.informational = +d.informational;
      d.total = +d.total;
    });
    //console.log(data);

    outlets(data);
  })
  .catch(function(error) {
    console.log(error);
  });

function outlets(newsData) {
  //console.log(newsData);

  const data = newsData.sort(function(a, b) {
    if (a.total < b.total) {
      return 1;
    } else {
      return -1;
    }
  });

  //console.log(data);

  const groups = d3
    .nest()
    .key(function(d) {
      return d.media_outlet;
    })
    .entries(data);

  console.log(groups);

  const colors = ['#5cdacc', '#ff1d34', '#ffc750', '#ff8c50'];

  const margin = { top: 40, right: 50, bottom: 40, left: 50 };
  const width = 310 - margin.left - margin.right;
  const height = 150 - margin.top - margin.bottom;

  const svgs = d3
    .select('#outlets-viz')
    .selectAll('svg')
    .data(groups)
    .enter()
    .append('svg')
    .attr('class', 'media-svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  const tValues = ['P', 'N', 'B', 'I'];

  const color = d3
    .scaleOrdinal()
    .domain(tValues)
    .range(['#5cdacc', '#ff1d34', '#ffc750', '#ff8c50']);

  const x = d3
    .scalePoint()
    .domain(tValues)
    .range([0, width]);
  svgs
    .append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .attr('class', 'domain')
    .call(d3.axisBottom(x));

  const max = d3.max(data, function(d) {
    return +d.total;
  });
  console.log(max);

  const y = d3
    .scaleLinear()
    .domain([0, max])
    .range([height, 0]);

  const bars = svgs
    .selectAll('.bars')
    .data(function(d) {
      console.log(d.values);
      return d.values;
    })
    .enter()
    .append('rect')
    .attr('class', 'bars')
    .attr('width', 10)
    .attr('x', function(d, i) {
      return i * 5;
    })
    .attr('height', function(d, i) {
      return height - y(+d.total);
    })
    .attr('y', function(d) {
      return y(+d.total);
    })
    .style('fill', 'black');
}

//   bars
//     .transition()
//     .duration(1200)
//     .delay(function(d, i) {
//       return i * 200;
//     })
//     .attr('y', function(d) {
//       return y(+d.total);
//     })
//     .attr('height', function(d, i) {
//       return height - y(+d.total);
//     });

//   svgs
//     .append('text')
//     .attr('class', 'media-label')
//     .attr('x', margin.left)
//     .attr('y', margin.top / 10)
//     .attr('font-size', '12')
//     .text(function(d) {
//       return d.media_outlet;
//     });
