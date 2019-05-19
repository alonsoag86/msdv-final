const people = {};
let time_so_far = 0;

// Node size and spacing.
const radius = 5,
  padding = 1, // Space between nodes
  cluster_padding = 5; // Space between nodes in different stages

// Dimensions of chart.
const margin = { top: 5, right: 20, bottom: 20, left: 120 },
  width = 900 - margin.left - margin.right,
  height = 360 - margin.top - margin.bottom;

const svg = d3
  .select('#theme_viz')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

d3.select('#chart').style('width', width + margin.left + margin.right + 'px');

// Group coordinates and meta info.

const groups = {
  met: {
    x: width / 5,
    y: height / 2,
    color: '#5cdacc',
    cnt: 0,
    fullname: 'Politics',
  },
  romantic: {
    x: (2 * width) / 5,
    y: height / 2,
    color: '#ff1d34',
    cnt: 0,
    fullname: 'Economic',
  },
  lived: {
    x: (3 * width) / 5,
    y: height / 2,
    color: '#ffc750',
    cnt: 0,
    fullname: 'Security',
  },
  married: {
    x: (4 * width) / 5,
    y: height / 2,
    color: '#ff8c50',
    cnt: 0,
    fullname: 'President',
  },
};

// Load data.
const stages = d3.tsv('data/stages.tsv', d3.autoType);

// Once data is loaded...
stages.then(function(data) {
  // Consolidate stages by pid.
  // The data file is one row per stage change.
  data.forEach(d => {
    if (d3.keys(people).includes(d.pid + '')) {
      people[d.pid + ''].push(d);
    } else {
      people[d.pid + ''] = [d];
    }
  });

  // Create node data.
  var nodes = d3.keys(people).map(function(d) {
    // Initialize coount for each group.
    groups[people[d][0].grp].cnt += 1;

    return {
      id: 'node' + d,
      x: groups[people[d][0].grp].x + Math.random(),
      y: groups[people[d][0].grp].y + Math.random(),
      r: radius,
      color: groups[people[d][0].grp].color,
      group: people[d][0].grp,
      timeleft: people[d][0].duration,
      istage: 0,
      stages: people[d],
    };
  });

  // Circle for each node.
  const circle = svg
    .append('g')
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('fill', d => d.color);

  // Ease in the circles.
  circle
    .transition()
    .delay((d, i) => i * 5)
    .duration(800)
    .attrTween('r', d => {
      const i = d3.interpolate(0, d.r);
      return t => (d.r = i(t));
    });

  // Group name labels
  svg
    .selectAll('.grp')
    .data(d3.keys(groups))
    .join('text')
    .attr('class', 'grp')
    .attr('text-anchor', 'middle')
    .attr('x', d => groups[d].x)
    .attr('y', d => 50)
    .text(d => groups[d].fullname);

  // Group counts
  svg
    .selectAll('.grpcnt')
    .data(d3.keys(groups))
    .join('text')
    .attr('class', 'grpcnt')
    .attr('text-anchor', 'middle')
    .attr('x', d => groups[d].x)
    .attr('y', d => 70)
    .text(d => groups[d].cnt);

  // Forces
  const simulation = d3
    .forceSimulation(nodes)
    .force('x', d => d3.forceX(d.x))
    .force('y', d => d3.forceY(d.y))
    .force('cluster', forceCluster())
    .force('collide', forceCollide())
    .alpha(0.09)
    .alphaDecay(0);

  // Adjust position of circles.
  simulation.on('tick', () => {
    circle
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('fill', d => groups[d.group].color);
  });
});

// Force to increment nodes to groups.
function forceCluster() {
  const strength = 0.15;
  let nodes;

  function force(alpha) {
    const l = alpha * strength;
    for (const d of nodes) {
      d.vx -= (d.x - groups[d.group].x) * l;
      d.vy -= (d.y - groups[d.group].y) * l;
    }
  }
  force.initialize = _ => (nodes = _);

  return force;
}

// Force for collision detection.
function forceCollide() {
  const alpha = 0.2; // fixed for greater rigidity!
  const padding1 = padding; // separation between same-color nodes
  const padding2 = cluster_padding; // separation between different-color nodes
  let nodes;
  let maxRadius;

  function force() {
    const quadtree = d3.quadtree(nodes, d => d.x, d => d.y);
    for (const d of nodes) {
      const r = d.r + maxRadius;
      const nx1 = d.x - r,
        ny1 = d.y - r;
      const nx2 = d.x + r,
        ny2 = d.y + r;
      quadtree.visit((q, x1, y1, x2, y2) => {
        if (!q.length)
          do {
            if (q.data !== d) {
              const r =
                d.r +
                q.data.r +
                (d.group === q.data.group ? padding1 : padding2);
              let x = d.x - q.data.x,
                y = d.y - q.data.y,
                l = Math.hypot(x, y);
              if (l < r) {
                l = ((l - r) / l) * alpha;
                (d.x -= x *= l), (d.y -= y *= l);
                (q.data.x += x), (q.data.y += y);
              }
            }
          } while ((q = q.next));
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    }
  }

  force.initialize = _ =>
    (maxRadius = d3.max((nodes = _), d => d.r) + Math.max(padding1, padding2));

  return force;
}