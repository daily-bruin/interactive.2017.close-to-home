import hello from './module';
const trueValue = 0.82;
let data = [
  {
    index: 0,
    value: 0.5,
  },
];
// 500 100
const widthX = $('.interactive-bar-chart-container').width() * 0.9;
const heightX = $('.interactive-bar-chart-container').height() * 0.23;
const delim = 10;

const scaleX = d3
  .scaleLinear()
  .domain([0, 1])
  .rangeRound([0, widthX]);

const y = d3
  .scaleLinear()
  .domain([0, 1]) // data.length
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
  $('.guess-button').fadeIn('slow');
  svgbrushX.select('text').attr('class', '');
  svgbrushX.select('text').style('fill', d => {
    if (d.value < 0.93) return 'black';
    return 'white';
  });
  svgbrushX
    .call(brushX.move, d => [0, d.value].map(scaleX))
    .selectAll('text')
    .attr('x', d => scaleX(d.value) - 10)
    .attr('dx', d => {
      if (d.value < 0.93) return 15;
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
$(document).ready(() => {
  $('.guess-button').fadeOut(1);
  $('.guess-button').click(() => {
    $('.guess-button').remove();

    const svgY = d3
      .select('body')
      .select('.answer-bar-chart')
      .append('svg')
      .attr('width', widthX)
      .attr('height', heightX)
      .append('g');

    const brushY = d3
      .brushX()
      .extent((d, i) => [
        [0, y(i) + delim / 2],
        [widthX, y(i) + heightX / data.length - delim / 2],
      ]);

    const svgbrushY = svgY
      .selectAll('.brush')
      .data([
        {
          index: 0,
          value: trueValue, // replace with actual precent
        },
      ])
      .enter()
      .append('g')
      .attr('class', 'brush')
      .append('g')
      .call(brushX)
      .call(brushX.move, d => [0, d.value].map(scaleX));

    svgbrushY
      .append('text')
      .attr('x', d => scaleX(d.value) - 10)
      .attr('y', (d, i) => y(i) + y(0.5))
      .attr('dy', '.35em')
      .attr('dx', d => {
        if (d.value < 0.93) return 15;
        return -33;
      })
      .style('fill', 'black')
      .style('pointer-events', 'none')
      .text(d => d3.format('.0%')(d.value))
      .append('g');

    $('.handle--e').css('pointer-events', 'none');
    let resultString = 'It is ';
    const roundedGuess = d3.format('.0%')(data[0].value);
    console.log(trueValue);
    if (roundedGuess < d3.format('.0%')(trueValue - 0.025))
      resultString += 'more than you expected';
    else if (roundedGuess > d3.format('.0%')(trueValue + 0.025))
      resultString += 'less than you expected';
    else resultString += 'about what you expected';
    $('.interactive-bar-chart-container').append(resultString);
  });
});
hello();

function setTitlePhotoHeight() {
  $('.title-photo').height($(window).height());
}

// function hid

setTitlePhotoHeight();

$(window).resize(setTitlePhotoHeight);
$(window).scroll();
