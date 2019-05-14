d3.csv('js/data/final_all_news_16.csv')
  .then(function(data) {
    // 1) read csv file
    // 2) make sure there are no errors
    // 3) turn strings into numbers
    // 4) console.log the data
    // 5) callback for the function that will make our chart
    // it takes the data from our d3.csv method
    data.forEach(function(d) {
      d.day_number = +d.day_number;
      d.tier = +d.tier;
      d.media_month = +d.media_month;
      d.media_year = +d.media_year;
      d.media_tendency = +d.media_tendency;
      d.tendency_month = +d.tendency_month;
      d.tendency_year = +d.tendency_year;
      d.theme_month = +d.theme_month;
      d.theme_year = +d.theme_year;
      d.month_count = +d.month_count;
      d.total_count = +d.total_count;
      d.tendency_month_percentage = +d.tendency_month_percentage;
      d.tendency_year_percentage = +d.tendency_year_percentage;
      d.theme_month_percentage = +d.theme_month_percentage;
      d.theme_year_percentage = +d.theme_year_percentage;
    });
    // console.log(data);
    tendencyViz(data);
    tendencyMonth(data);
  })
  .catch(function(error) {
    console.log(error);
  });

function tendencyMonth(newsData) {
  const months = {
    January: 'January',
    February: 'February',
    March: 'March',
    April: 'April',
    May: 'May',
    June: 'June',
    July: 'July',
    August: 'August',
    September: 'September',
    October: 'October',
    November: 'November',
    December: 'December',
  };

  // Use d3 to next our data and give it structure.
  // Here we are nesting by month and then tendency.
  const newsNested = d3
    .nest()
    .key(k => months[k['month']])
    .key(k => k['tendency'])
    .object(newsData);
  // console.log(newsNested);

  // Structures our data even further.
  // Here we end up with an array with the month as
  // index 0 and an object with all the information for each
  // tendency value as index 1
  const tendencyValues = Object.entries(newsNested);
  // console.log(tendencyValues);

  // Final Structure for the line chart
  const data = tendencyValues.map(function(month) {
    return {
      month: month[0],
      positive: Number(month[1].Positive.length),
      negative: Number(month[1].Negative.length),
      balanced: Number(month[1].Balanced.length),
      informational: Number(month[1].Informational.length),
      // percentage: month[1].tendency_month_percentage,
      total:
        Number(month[1].Positive.length) +
        Number(month[1].Negative.length) +
        Number(month[1].Balanced.length) +
        Number(month[1].Informational.length),
    };
  });
  // console.log(data);

  const margin = { top: 15, right: 10, bottom: 35, left: 215 };
  const width = 800 - margin.left - margin.right;
  const height = 100 - margin.top - margin.bottom;

  const svg = d3
    .select('#tendency-month')
    .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  const max = d3.max(data, function(d) {
    return +d.total;
  });
  //   console.log(max);

  const y = d3
    .scaleLinear()
    .domain([0, max])
    .range([height, 0]);

  const waypoint = new Waypoint({
    element: $('#tendency-viz'),
    handler: function() {
      this.destroy();

      const bars = svg
        .selectAll('.bars')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bars')
        .attr('width', 35)
        .attr('x', function(d, i) {
          return i * 40;
        })
        .attr('height', 0)
        .attr('y', height)
        .style('fill', '#6D6875');

      bars
        .transition()
        .duration(1200)
        .delay(function(d, i) {
          return i * 200;
        })
        .attr('y', function(d) {
          return y(+d.total);
        })
        .attr('height', function(d, i) {
          return height - y(+d.total);
        });

      bars
        .on('mouseover', function(d) {
          d3.select(this).style('fill', '#D3D3D3');
          d3.select('#month-info').html(
            '<h5>' +
              d.month +
              '</h5>' +
              'positive: ' +
              d.positive +
              '<br>' +
              'negative: ' +
              d.negative +
              '<br>' +
              'balanced: ' +
              d.balanced +
              '<br>' +
              'informational: ' +
              d.informational +
              '<br>' +
              'total: ' +
              d.total
          );
        })
        .on('mouseout', function(d) {
          d3.select(this).style('fill', '#6D6875');
          d3.select('#month-info').html(
            '<h5>' +
              d.month +
              '</h5>' +
              'positive: ' +
              d.positive +
              '<br>' +
              'negative: ' +
              d.negative +
              '<br>' +
              'balanced: ' +
              d.balanced +
              '<br>' +
              'informational: ' +
              d.informational +
              '<br>' +
              'total: ' +
              d.total
          );
        });
    },
    offset: '30%',
  });
}

function tendencyViz(newsData) {
  // 1) create an object with all our months
  const months = {
    January: 'January',
    February: 'February',
    March: 'March',
    April: 'April',
    May: 'May',
    June: 'June',
    July: 'July',
    August: 'August',
    September: 'September',
    October: 'October',
    November: 'November',
    December: 'December',
  };

  // Use d3 to next our data and give it structure.
  // Here we are nesting by month and then tendency.
  const newsNested = d3
    .nest()
    .key(k => months[k['month']])
    .key(k => k['tendency'])
    .object(newsData);
  //console.log(newsNested);

  // Structures our data even further.
  // Here we end up with an array with the month as
  // index 0 and an object with all the information for each
  // tendency value as index 1
  const tendencyValues = Object.entries(newsNested);
  //console.log(tendencyValues);

  // Final Structure for the line chart
  const data = tendencyValues.map(function(month) {
    return {
      month: month[0],
      positive: Number(month[1].Positive.length),
      negative: Number(month[1].Negative.length),
      balanced: Number(month[1].Balanced.length),
      informational: Number(month[1].Informational.length),
    };
  });
  //console.log(data);

  // Set all the parameters of our chart area
  const margin = { top: 45, right: 50, bottom: 30, left: 210 };
  const width = 950 - margin.left - margin.right;
  const height = 470 - margin.top - margin.bottom;

  // Create the svg and the group thar is going to
  // hold our data
  const svg = d3
    .select('#tendency-viz')
    .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Make an array with the months
  const months_list = Object.values(months);
  //console.log(months_list);

  // Create our x scale with the months
  const x = d3
    .scalePoint()
    .domain(months_list)
    .range([0, width]);
  svg
    .append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .attr('class', 'domain')
    .call(d3.axisBottom(x));

  // Finding d3 extent of multiple values in object array
  // Source: https://stackoverflow.com/questions/29493843/finding-d3-extent-of-multiple-values-in-object-array

  const tValues = ['positive', 'negative', 'balanced', 'informational'];

  const y = d3
    .scaleLinear()
    .domain(
      d3.extent(
        (function(array, names) {
          var res = [];
          array.forEach(function(item) {
            names.forEach(function(name) {
              res = res.concat(item[name]);
            });
          });
          return res;
        })(data, tValues)
      )
    )
    .nice()
    .range([height, 0]);
  svg.append('g').call(d3.axisLeft(y));

  svg
    .append('text')
    .attr('class', 'y-label')
    .attr('x', -(height / 2))
    .attr('y', -80)
    .attr('transform', 'rotate(-90)')
    .attr('font-size', 16)
    .attr('text-anchor', 'middle')
    .text('Number of Articles');

  // Establish out color palette
  const color = d3
    .scaleOrdinal()
    .domain(tValues)
    .range(['#5cdacc', '#ff1d34', '#ffc750', '#ff8c50']);

  const waypoint = new Waypoint({
    element: $('#tendency-month'),
    handler: function(direction) {
      this.destroy();
      // Iterate over every element of our data (except month)
      // and create a line for each tendency value.
      Object.keys(data[0]).forEach(key => {
        if (key != 'month') {
          const tendencyLines = d3
            .line()
            .x(d => x(d.month))
            .y(d => y(d[key]))
            .curve(d3.curveBasis);

          function length(path) {
            return d3
              .create('svg:path')
              .attr('d', path)
              .node()
              .getTotalLength();
          }
          const l = length(tendencyLines(data));
          svg
            .append('path')
            .style('id', key + 'Area')
            .attr('d', tendencyLines(data))
            .attr('fill', 'none')
            .attr('stroke', color(key))
            .attr('stroke-width', 1.5)
            .attr('stroke-dasharray', `0,${l}`)
            .transition()
            .duration(5000)
            .ease(d3.easeLinear)
            .attr('stroke-dasharray', `${l},${l}`);
        }
      });

      const annotations = [
        {
          type: d3.annotationCalloutCircle,
          note: {
            label: 'The Mexican Government captures "El Chapo Guzmán"',
            wrap: 190,
          },
          subject: {
            radius: 3,
          },
          x: 5,
          y: 119,
          dy: -30,
          dx: 50,
        },
        {
          type: d3.annotationCalloutCircle,
          note: {
            title: 'The Republican Candidate meets the President of Mexico',
            wrap: 210,
          },
          subject: {
            radius: 3,
          },
          x: 480,
          y: 26,
          dy: -20,
          dx: -20,
        },
        {
          type: d3.annotationCalloutCircle,
          note: {
            title: '"El Chapo Guzmán" gets extradited to the U.S.',
            wrap: 210,
          },
          subject: {
            radius: 3,
          },
          x: 685,
          y: 232,
          dy: 60,
          dx: -3,
        },
        {
          type: d3.annotationCalloutCircle,
          note: {
            title: 'The Election reaches its conclusion',
            wrap: 150,
          },
          subject: {
            radius: 3,
          },
          x: 628,
          y: 95,
          dy: 50,
          dx: -50,
        },
      ].map(function(d) {
        d.color = '#02111b';
        return d;
      });
      const makeAnnotations = d3
        .annotation()
        .type(d3.annotationLabel)
        .annotations(annotations);

      svg
        .append('g')
        .attr('class', 'annotation-group')
        .call(makeAnnotations);

      d3.selectAll('.annotation-group')
        .attr('opacity', 0)
        .transition()
        .duration(7850)
        .ease(d3.easeExpIn)
        .attr('opacity', 1);
    },
    offset: '16%',
  });

  svg
    .append('g')
    .attr('class', 'legendOrdinal')
    .attr('transform', 'translate(' + (width - 60) + ',' + '0.1)');

  legendOrdinal = d3
    .legendColor()
    .shape(
      'path',
      d3
        .symbol()
        .type(d3.symbolTriangle)
        .size(35)()
    )
    .shapePadding(5)
    .scale(color);

  svg.select('.legendOrdinal').call(legendOrdinal);
}

$('#month-info').css('opacity', 0);

const waypoint = new Waypoint({
  element: $('#month-info'),
  handler: function(direction) {
    $('#month-info').addClass('fadeInRight');
  },
  offset: '15%',
});
