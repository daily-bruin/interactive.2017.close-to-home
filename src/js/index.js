import hello from './module';
/* Increasing number animation */
const format = d3.format(',d');

d3
  .select('.increasing-number')
  .transition()
  .duration(1000)
  .tween('text', () => {
    const i = d3.interpolateNumber(0, 1691);
    return t => d3.select('.increasing-number').text(format(i(t)));
  });

/*
d3
  .select('.increasing-number')
  .transition()
  .duration(1500)
  .tween('text', () => {
    const that = d3.select(this);
    const i = d3.interpolateNumber(that.text().replace(/,/g, ''), 1691);
    return t => that.text(format(i(t)));
  });
  */
/* bar chart */

const trueValue = 0.42;
const startGuess = 0.5;
const minXVal = 0.001;
const maxXVal = 1;
const widthX = $('.interactive-bar-chart-container').width() * 0.9;
const heightX = $('.interactive-bar-chart-container').height() * 0.23;

const data = [
  {
    index: 0,
    value: startGuess,
  },
];

const scaleX = d3
  .scaleLinear()
  .domain([minXVal, maxXVal])
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
  .extent((d, i) => [[0, y(i)], [widthX, y(i) + heightX / data.length]]);

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
  .attr('class', 'left-arrow')
  .style('fill', 'black')
  .style('pointer-events', 'none')
  .text('\u25C4 ')
  .append('g');

svgbrushX
  .append('text')
  .attr('x', d => scaleX(d.value) + 10)
  .attr('y', (d, i) => y(i) + y(0.5))
  .attr('dy', '.35em')
  .attr('dx', -7)
  .attr('class', 'right-arrow')
  .style('fill', 'black')
  .style('pointer-events', 'none')
  .text(' \u25BA')
  .append('g');

$('.handle--w').css('pointer-events', 'none');
$('.handle--e')
  .attr('width', 30)
  .attr('x', $('.handle--e').attr('x') - 12);

function update() {
  $('.guess-button').fadeIn('slow');
  $('.left-arrow').remove();
  d3.select('text').transition();
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
  $('.handle--e')
    .attr('width', 30)
    .attr('x', $('.handle--e').attr('x') - 12);
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

function animateArrow() {
  d3
    .select('.left-arrow')
    .attr('dx', () => '-8px')
    .transition()
    .duration(1000)
    .attr('dx', '-14px')
    .transition()
    .duration(1000)
    .attr('dx', '-8px')
    .on('end', animateArrow);

  d3
    .select('.right-arrow')
    .attr('dx', () => '-7px')
    .transition()
    .duration(1000)
    .attr('dx', '-1px')
    .transition()
    .duration(1000)
    .attr('dx', '-7px')
    .on('end', animateArrow);
}

brushX.on('brush', brushmoveX).on('end', brushendX);
$(document).ready(() => {
  animateArrow();
  $('.guess-button').fadeOut(1);
  $('.guess-button').click(() => {
    $('.guess-button').remove();
    /*
      .style('pointer-events', 'none')
      could make guess highlight-able in here
    */
    const svgY = d3
      .select('body')
      .select('.answer-bar-chart')
      .append('svg')
      .attr('width', widthX)
      .attr('height', heightX)
      .append('g');
    svgY
      .append('rect')
      .style('fill', '#73b1ff')
      .attr('x', '0')
      .attr('width', 0)
      .transition()
      .duration(1200)
      .attr('width', widthX * trueValue)
      .attr('y', '0')
      .attr('height', 214)
      .attr('stroke', 'white')
      .attr('stroke-width', 1);
    svgY
      .append('text')
      .text(d3.format('.0%')(trueValue))
      .attr('fill', 'black')
      .attr('class', 'result-text')
      .attr('x', 0)
      .transition()
      .duration(1170)
      .attr('x', () => widthX * trueValue + 5)
      .attr('y', 52);
    $('.handle').css('pointer-events', 'none');
    $('.handle').css('width', '1');
    let resultString = "It's ";
    const roundedGuess = d3.format('.0%')(data[0].value);
    if (roundedGuess < d3.format('.0%')(trueValue - 0.025))
      resultString += 'more than you expected<br>...source...';
    else if (roundedGuess > d3.format('.0%')(trueValue + 0.025))
      resultString += 'less than you expected<br>...source...';
    else resultString += 'about what you expected<br>...source...';
    /*
    const source =
      'source: http://ucop.edu/global-food-initiative/best-practices/food-access-security/student-food-access-and-security-study.pdf';
    */
    $('.interactive-bar-chart-container').append(resultString);
  });
});

hello();

function setTitlePhotoHeight() {
  $('.cover-photo').height($(window).height());
}

(function fadeBar() {
  $(document).ready(() => {
    $(window).scroll(function scrollEffects() {
      if ($(this).scrollTop() >= $(window).height()) {
        $('.top-bar').addClass('fix-bar');
      } else {
        $('.top-bar').removeClass('fix-bar');
      }
    });
  });
})(jQuery);
// function hid

setTitlePhotoHeight();

$(window).resize(setTitlePhotoHeight);

$(window).waypoint(() => {
  $('.cover-photo__header').fadeIn();
  $('.db-logo').fadeIn();
});

$(window).waypoint(
  () => {
    $('.cover-photo__header').fadeOut();
    $('.db-logo').fadeOut();
  },
  { offset: -1 }
);
