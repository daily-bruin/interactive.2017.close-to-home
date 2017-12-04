/* Increasing number animation */
const numGuess1 = 1691;
const containerName = '.guess-the-number-container';
const numGuessSource = 'Source: UCLA ECR Team';
const rotateGuess = [
  '0 - 500',
  '500 - 1,000',
  '1,000 - 1,500',
  '1,500 - 2,000',
];

const format = d3.format(',d');
let rotateGuessIdx = 0;

$(`${containerName} .left-rotate-button`).click(() => {
  rotateGuessIdx -= 1;
  if (rotateGuessIdx < 0) rotateGuessIdx = 0;
  d3.select(`${containerName} .range`).text(rotateGuess[rotateGuessIdx]);
});
$(`${containerName} .right-rotate-button`).click(() => {
  rotateGuessIdx += 1;
  if (rotateGuessIdx > 3) rotateGuessIdx = 3;
  d3.select(`${containerName} .range`).text(rotateGuess[rotateGuessIdx]);
});

$(`${containerName} .rotate-button`).click(() => {
  if (rotateGuessIdx === 0) {
    $(`${containerName} .left-rotate-button`).css({
      visibility: 'hidden',
      'pointer-events': 'none',
    });
  } else if (rotateGuessIdx === 3) {
    $(`${containerName} .right-rotate-button`).css({
      visibility: 'hidden',
      'pointer-events': 'none',
    });
  } else {
    $(`${containerName} .left-rotate-button`).css({
      visibility: 'visible',
      'pointer-events': 'all',
    });
    $(`${containerName} .right-rotate-button`).css({
      visibility: 'visible',
      'pointer-events': 'all',
    });
  }
});

$(`${containerName} .num-guess-button`).click(() => {
  $(`${containerName} .left-rotate-button`).remove();
  $(`${containerName} .right-rotate-button`).remove();
  $(`${containerName} .range`).css('width', 300);
  d3
    .select(`${containerName} .range`)
    .text(`Guess: ${rotateGuess[rotateGuessIdx]}`);
  $(`${containerName} .increasing-number`).fadeIn(800);
  d3
    .select(`${containerName} .increasing-number`)
    .transition()
    .duration(1500)
    .tween('text', () => {
      const i = d3.interpolateNumber(0, numGuess1);
      return t =>
        d3
          .select(`${containerName} .range`)
          .text(`Guess: ${rotateGuess[rotateGuessIdx]}`)
          .append('text')
          .text(`Actual: ${format(i(t))}`);
    })
    .on('end', () => {
      let numResult = '';
      if (numGuess1 < rotateGuessIdx * 500) numResult += 'overestimated ';
      else if (numGuess1 > rotateGuessIdx * 500 + 500)
        numResult += 'underestimated ';
      else numResult += 'correctly estimated ';
      d3
        .select(`${containerName}`)
        .append('text')
        .attr('class', 'numguess1-result');
      $(`${containerName} .numguess1-result`)
        .hide()
        .append(`You ${numResult} the number.`)
        .fadeIn();
      d3
        .select(`${containerName}`)
        .append('text')
        .attr('class', 'numguess-source');
      $(`${containerName} .numguess-source`)
        .hide()
        .append(numGuessSource)
        .fadeIn();
    });
  $(`${containerName} .guess-the-number`).css({
    'flex-direction': 'column',
    'justify-content': 'center',
  });
  $(`${containerName} .num-guess-button`).remove();
});
/*
/* bar chart
const trueValue = 0.42;
const startGuess = 0.5;
const minXVal = 0.009;
const maxXVal = 1;
let widthX = $('.interactive-bar-chart-container').width() * 0.9;
let heightX = $('.interactive-bar-chart-container').height() * 0.23;
$('.percent-guide').css('width', widthX);

const data = [
  {
    index: 0,
    value: startGuess,
  },
];

let scaleX = d3
  .scaleLinear()
  .domain([minXVal, maxXVal])
  .rangeRound([0, widthX]);

let y = d3
  .scaleLinear()
  .domain([0, 1]) // data.length
  .rangeRound([0, heightX]);

const svgX = d3
  .select('body')
  .select('.interactive-bar-chart')
  .append('svg')
  .attr('height', heightX)
  .attr('viewBox', `0 0 ${widthX} ${heightX}`)
  .attr('preserveAspectRatio', 'xMidYMid meet')
  .attr('height', 116)
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
  .append('g')
  .append('text')
  .attr('x', d => scaleX(d.value) - 13)
  .attr('y', (d, i) => y(i) + y(0.5))
  .attr('dy', '.35em')
  .attr('dx', -8)
  .attr('class', 'left-arrow')
  .style('fill', 'black')
  .style('pointer-events', 'none')
  .style(
    'font-family',
    "Helvetica, 'DejaVu Sans', 'Arial Unicode MS', 'Lucida Sans Unicode', sans-serif"
  )
  .style('font-size', '30px')
  .text('\u25C4 ')
  .append('g');
svgbrushX
  .append('g')
  .append('text')
  .attr('x', d => scaleX(d.value) + 10)
  .attr('y', (d, i) => y(i) + y(0.5))
  .attr('dy', '.35em')
  .attr('dx', -7)
  .attr('class', 'right-arrow')
  .style('fill', 'black')
  .style('pointer-events', 'none')
  .style(
    'font-family',
    "Helvetica, 'DejaVu Sans', 'Arial Unicode MS', 'Lucida Sans Unicode', sans-serif"
  )
  .style('font-size', '30px')
  .text(' \u25BA')
  .append('g');

svgbrushX
  .append('g')
  .append('text')
  .attr('class', 'guess-percent')
  .attr('x', d => scaleX(d.value) + 10)
  .attr('y', (d, i) => y(i) + y(0.5))
  .attr('dy', '.35em')
  .attr('dx', -7)
  .style('fill', 'black')
  .style('pointer-events', 'none')
  .append('g');

$('.handle--w').css('pointer-events', 'none');
$('.handle--e')
  .attr('width', 30)
  .attr('x', $('.handle--e').attr('x') - 12);

function update() {
  $('.bar-guess-button').fadeIn('slow');
  $('.left-arrow').remove();
  $('.right-arrow').remove();
  svgbrushX
    .select('.guess-percent')
    .attr('class', 'guess-percent')
    .style('fill', d => {
      if (d.value < 0.93) return 'black';
      return 'white';
    });

  svgbrushX
    .call(brushX.move, d => [0, d.value].map(scaleX))
    .select('.guess-percent')
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

function barChartResize() {
  widthX = $('.interactive-bar-chart-container').width() * 0.9;
  heightX = $('.interactive-bar-chart-container').height() * 0.23;

  $('.percent-guide').css('width', widthX);
}
$(window).resize(barChartResize);
*/
$(document).ready(() => {
  $('.increasing-number').fadeOut(1);
  d3
    .select('.range')
    .append('text')
    .text(rotateGuess[rotateGuessIdx]);

  // animateArrow();
  /*
  $('.bar-guess-button').fadeOut(1);
  $('.bar-guess-button').click(() => {

    $(window).resize(barChartResize);
    $('.bar-guess-button').remove();

    const svgY = d3
      .select('body')
      .select('.answer-bar-chart')
      .append('svg')
      .attr('height', heightX)
      .attr('viewBox', `0 0 ${widthX} ${heightX}`)
      .attr('height', 116)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g');
    svgY
      .append('rect')
      .style('fill', '#73b1ff')
      .attr('width', 0)
      .transition()
      .duration(1200)
      .attr('width', widthX * trueValue)
      .attr('viewBox', `0 0 ${widthX} ${heightX}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('height', 116)
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
      .attr('y', 62);
    $('.handle').css('pointer-events', 'none');
    $('.handle').css('width', '1');
    $(window).resize(barChartResize);
    let resultString = "It's ";
    const roundedGuess = d3.format('.0%')(data[0].value);
    if (roundedGuess < d3.format('.0%')(trueValue - 0.05))
      resultString += 'more than you expected';
    else if (roundedGuess > d3.format('.0%')(trueValue + 0.05))
      resultString += 'less than you expected';
    else resultString += 'about what you expected';
    /*
    const source =
      'source: http://ucop.edu/global-food-initiative/best-practices/food-access-security/student-food-access-and-security-study.pdf';

    d3
      .select('.interactive-bar-chart-container')
      .append('text')
      .text(resultString);
    d3
      .select('.interactive-bar-chart-container')
      .append('text')
      .attr('class', 'bar-source')
      .text(
        'Source: Martinez, S. M., Maynard, K., Ritchie, L. D. Student Food Access and Security Study. Retrieved from http://ucop.edu/global-food-initiative/best-practices/food-access-security/student-food-access-and-security-study.pdf'
      );

  });
  */
});

function setTitlePhotoHeight() {
  $('.cover-photo').height($(window).height());
}

$(window).scroll(function scrollEffects() {
  if ($(this).scrollTop() >= $(window).height() + 50) {
    $('.top-bar').fadeIn();
  } else {
    $('.top-bar').fadeOut();
  }
});

// function hid

setTitlePhotoHeight();

$(window).resize(setTitlePhotoHeight);
$(window).waypoint(
  () => {
    $('.cover-photo__header').fadeIn();
    $('.db-logo').fadeIn();
  },
  { offset: -1 }
);

$(window).waypoint(
  () => {
    $('.cover-photo__header').fadeOut();
    $('.db-logo').fadeOut();
  },
  { offset: -2 }
);
