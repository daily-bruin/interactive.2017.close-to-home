import hello from './module';

const data = [
  {
    index: 0,
    value: 0.5,
  },
];

const widthX = 800;
const heightX = 200;
const delim = 4;

const scaleX = d3
  .scaleLinear()
  .domain([0, 1])
  .rangeRound([0, widthX]);

const y = d3
  .scaleLinear()
  .domain([0, data.length])
  .rangeRound([0, heightX]);

const svgX = d3
  .select('body')
  .select('.interactive-bar-chart')
  .append('svg')
  .attr('width', widthX)
  .attr('height', heightX)
  .append('g');

const brushX = d3
  .brushX()
  .extent((d, i) => [
    [0, y(i) + delim / 2],
    [widthX, y(i) + heightX / data.length - delim / 2],
  ]);

const svgbrushX = svgX
  .selectAll('.brush')
  .data(data)
  .enter()
  .append('g')
  .attr('class', 'brush')
  .append('g')
  .call(brushX)
  .call(brushX.move, d => [0, d.value].map(scaleX));

svgbrushX
  .append('text')
  .attr('x', d => scaleX(d.value) - 10)
  .attr('y', (d, i) => y(i) + y(0.5))
  .attr('dy', '.35em')
  .attr('dx', -8)
  .attr('class', 'blink')
  .style('fill', 'black')
  .style('pointer-events', 'none')
  .text('\u25C4  \u25BA')
  .append('g');

function update() {
  svgbrushX.select('text').attr('class', '');
  svgbrushX
    .call(brushX.move, d => [0, d.value].map(scaleX))
    .selectAll('text')
    .attr('x', d => scaleX(d.value) - 10)
    .attr('dx', d => {
      if (d.value < 0.955) return 15;
      return -33;
    })
    .text(d => d3.format('.0%')(d.value));
}

function brushendX() {
  if (!d3.event.sourceEvent) return;
  if (d3.event.sourceEvent.type === 'brush') return;
  if (!d3.event.selection) {
    // just in case of click with no move
    svgbrushX.call(brushX.move, d => [0, d.value].map(scaleX));
  }
}

function brushmoveX() {
  if (!d3.event.sourceEvent) return;
  if (d3.event.sourceEvent.type === 'brush') return;
  if (!d3.event.selection) return;

  const d0 = d3.event.selection.map(scaleX.invert);
  const d = d3.select(this).select('.selection');

  d.datum().value = d0[1]; // Change the value of the original data

  update();
}

brushX.on('brush', brushmoveX).on('end', brushendX);

hello();

function setTitlePhotoHeight() {
  $('.title-photo').height($(window).height());
}

// function hid

setTitlePhotoHeight();

$(window).resize(setTitlePhotoHeight);
$(window).scroll();
