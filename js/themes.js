const ePositive = function() {
  const waffle = d3.select('#e-positive');

  const numbers = d3.range(100);

  waffle
    .selectAll('.block')
    .data(numbers)
    .enter()
    .append('div')
    .attr('class', 'block')
    .style('background-color', function(d) {
      if (d < 31) {
        return '#5cdacc';
      } else {
        return '#CCCCCC';
      }
    });
};

ePositive();

const eNegative = function() {
  const waffle = d3.select('#e-negative');

  const numbers = d3.range(100);

  waffle
    .selectAll('.block')
    .data(numbers)
    .enter()
    .append('div')
    .attr('class', 'block')
    .style('background-color', function(d) {
      if (d < 26) {
        return '#ff1d34';
      } else {
        return '#CCCCCC';
      }
    });
};

eNegative();

const eBalanced = function() {
  const waffle = d3.select('#e-balanced');

  const numbers = d3.range(100);

  waffle
    .selectAll('.block')
    .data(numbers)
    .enter()
    .append('div')
    .attr('class', 'block')
    .style('background-color', function(d) {
      if (d < 28) {
        return '#ffc750';
      } else {
        return '#CCCCCC';
      }
    });
};

eBalanced();

const eInformational = function() {
  const waffle = d3.select('#e-informational');

  const numbers = d3.range(100);

  waffle
    .selectAll('.block')
    .data(numbers)
    .enter()
    .append('div')
    .attr('class', 'block')
    .style('background-color', function(d) {
      if (d < 15) {
        return '#ff8c50';
      } else {
        return '#CCCCCC';
      }
    });
};

eInformational();

const pPositive = function() {
  const waffle = d3.select('#p-positive');

  const numbers = d3.range(100);

  waffle
    .selectAll('.block')
    .data(numbers)
    .enter()
    .append('div')
    .attr('class', 'block')
    .style('background-color', function(d) {
      if (d < 22) {
        return '#5cdacc';
      } else {
        return '#CCCCCC';
      }
    });
};

pPositive();

const pNegative = function() {
  const waffle = d3.select('#p-negative');

  const numbers = d3.range(100);

  waffle
    .selectAll('.block')
    .data(numbers)
    .enter()
    .append('div')
    .attr('class', 'block')
    .style('background-color', function(d) {
      if (d < 35) {
        return '#ff1d34';
      } else {
        return '#CCCCCC';
      }
    });
};

pNegative();

const pBalanced = function() {
  const waffle = d3.select('#p-balanced');

  const numbers = d3.range(100);

  waffle
    .selectAll('.block')
    .data(numbers)
    .enter()
    .append('div')
    .attr('class', 'block')
    .style('background-color', function(d) {
      if (d < 25) {
        return '#ffc750';
      } else {
        return '#CCCCCC';
      }
    });
};

pBalanced();

const pInformational = function() {
  const waffle = d3.select('#p-informational');

  const numbers = d3.range(100);

  waffle
    .selectAll('.block')
    .data(numbers)
    .enter()
    .append('div')
    .attr('class', 'block')
    .style('background-color', function(d) {
      if (d < 18) {
        return '#ff8c50';
      } else {
        return '#CCCCCC';
      }
    });
};

pInformational();

const sPositive = function() {
  const waffle = d3.select('#s-positive');

  const numbers = d3.range(100);

  waffle
    .selectAll('.block')
    .data(numbers)
    .enter()
    .append('div')
    .attr('class', 'block')
    .style('background-color', function(d) {
      if (d < 15) {
        return '#5cdacc';
      } else {
        return '#CCCCCC';
      }
    });
};

sPositive();

const sNegative = function() {
  const waffle = d3.select('#s-negative');

  const numbers = d3.range(100);

  waffle
    .selectAll('.block')
    .data(numbers)
    .enter()
    .append('div')
    .attr('class', 'block')
    .style('background-color', function(d) {
      if (d < 51) {
        return '#ff1d34';
      } else {
        return '#CCCCCC';
      }
    });
};

sNegative();

const sBalanced = function() {
  const waffle = d3.select('#s-balanced');

  const numbers = d3.range(100);

  waffle
    .selectAll('.block')
    .data(numbers)
    .enter()
    .append('div')
    .attr('class', 'block')
    .style('background-color', function(d) {
      if (d < 20) {
        return '#ffc750';
      } else {
        return '#CCCCCC';
      }
    });
};

sBalanced();

const sInformational = function() {
  const waffle = d3.select('#s-informational');

  const numbers = d3.range(100);

  waffle
    .selectAll('.block')
    .data(numbers)
    .enter()
    .append('div')
    .attr('class', 'block')
    .style('background-color', function(d) {
      if (d < 14) {
        return '#ff8c50';
      } else {
        return '#CCCCCC';
      }
    });
};

sInformational();

const prPositive = function() {
  const waffle = d3.select('#pr-positive');

  const numbers = d3.range(100);

  waffle
    .selectAll('.block')
    .data(numbers)
    .enter()
    .append('div')
    .attr('class', 'block')
    .style('background-color', function(d) {
      if (d < 28) {
        return '#5cdacc';
      } else {
        return '#CCCCCC';
      }
    });
};

prPositive();

const prNegative = function() {
  const waffle = d3.select('#pr-negative');

  const numbers = d3.range(100);

  waffle
    .selectAll('.block')
    .data(numbers)
    .enter()
    .append('div')
    .attr('class', 'block')
    .style('background-color', function(d) {
      if (d < 44) {
        return '#ff1d34';
      } else {
        return '#CCCCCC';
      }
    });
};

prNegative();

const prBalanced = function() {
  const waffle = d3.select('#pr-balanced');

  const numbers = d3.range(100);

  waffle
    .selectAll('.block')
    .data(numbers)
    .enter()
    .append('div')
    .attr('class', 'block')
    .style('background-color', function(d) {
      if (d < 23) {
        return '#ffc750';
      } else {
        return '#CCCCCC';
      }
    });
};

prBalanced();

const prInformational = function() {
  const waffle = d3.select('#pr-informational');

  const numbers = d3.range(100);

  waffle
    .selectAll('.block')
    .data(numbers)
    .enter()
    .append('div')
    .attr('class', 'block')
    .style('background-color', function(d) {
      if (d < 5) {
        return '#ff8c50';
      } else {
        return '#CCCCCC';
      }
    });
};

prInformational();

const stPositive = function() {
  const waffle = d3.select('#st-positive');

  const numbers = d3.range(100);

  waffle
    .selectAll('.block')
    .data(numbers)
    .enter()
    .append('div')
    .attr('class', 'block')
    .style('background-color', function(d) {
      if (d < 44) {
        return '#5cdacc';
      } else {
        return '#CCCCCC';
      }
    });
};

stPositive();

const stNegative = function() {
  const waffle = d3.select('#st-negative');

  const numbers = d3.range(100);

  waffle
    .selectAll('.block')
    .data(numbers)
    .enter()
    .append('div')
    .attr('class', 'block')
    .style('background-color', function(d) {
      if (d < 20) {
        return '#ff1d34';
      } else {
        return '#CCCCCC';
      }
    });
};

stNegative();

const stBalanced = function() {
  const waffle = d3.select('#st-balanced');

  const numbers = d3.range(100);

  waffle
    .selectAll('.block')
    .data(numbers)
    .enter()
    .append('div')
    .attr('class', 'block')
    .style('background-color', function(d) {
      if (d < 14) {
        return '#ffc750';
      } else {
        return '#CCCCCC';
      }
    });
};

stBalanced();

const stInformational = function() {
  const waffle = d3.select('#st-informational');

  const numbers = d3.range(100);

  waffle
    .selectAll('.block')
    .data(numbers)
    .enter()
    .append('div')
    .attr('class', 'block')
    .style('background-color', function(d) {
      if (d < 22) {
        return '#ff8c50';
      } else {
        return '#CCCCCC';
      }
    });
};

stInformational();
