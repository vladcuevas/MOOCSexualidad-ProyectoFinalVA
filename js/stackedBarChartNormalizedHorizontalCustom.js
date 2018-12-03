/* global d3 */

import { Reader } from './models/reader.js'
import { SvgOps } from './models/svgOps.js'
import { Tooltip } from './models/tooltip.js'
import { FormOps } from './models/formOps.js'

let fo = new FormOps()

let reader = new Reader('data/stackedBarChartNormalizedHorizontalCustom.tsv')

let feedbackItemRatings = new Reader('data/feedbackItemRatings.tsv')

let femaleMaleUnknown = new Reader('data/female_male_unknown.tsv')

let neverCompletedVSCompleted = new Reader('data/activitiesNeverCompletedVSCompleted.tsv')

let types = (d) => {
  return {
    PathToItem: d.path_to_item,
    Completed: +d.Completed,
    Started: +d.Started
  }
}

let feedbackItemRatingsTypes = (d) => {
  return {
    PathToItem: d.path_to_item,
    ThumbsUp: +d['Pulgares hacia arriba'],
    ThumbsDown: +d['Pulgares abajo']
  }
}

let femaleMaleUnknownTypes = (d) => {
  return {
    PathToItem: d.path_to_item,
    female: +d['female'],
    male: +d['male'],
    unknown: +d['unknown']
  }
}

let isNormalized = false
let isOrdered = true
let isFirstLoad = true
let isFeedback = false

let divW = 964

var esCol = {
  'decimal': ',',
  'thousands': '.',
  'grouping': [3],
  'currency': ['$', '']
}

var locale = esCol

d3.formatDefaultLocale(locale)

const removeStuff = () => {
  d3.selectAll('.mainSvg').remove()
  d3.selectAll('.legendSvg').remove()
}

let popularityQuestion = '¿Cuál es la actividad con más interacciones?'
let feedbackQuestion = '¿Cuál es la actividad con mejor feedback?'
let genderQuestion = '¿Cuál es el comportamiento del sexo?'
let performanceQuestion = '¿Cuál es la actividad más popular?'
let orderText = 'Ordenado por cantidades'

d3.select('#popularityRadioText').text(popularityQuestion)
d3.select('#feedbackRadioText').text(feedbackQuestion)
d3.select('#genderRadioText').text(genderQuestion)
d3.select('#performanceRadioText').text(performanceQuestion)

let rawPopularity = reader.plainTSV(types)
let rawfeedbackItemRatings = feedbackItemRatings.plainTSV(feedbackItemRatingsTypes)
let rawfemaleMaleUnknown = femaleMaleUnknown.plainTSV(femaleMaleUnknownTypes)
let rawNeverCompletedVSCompleted = neverCompletedVSCompleted.plainTSV(types);

(async function read () {
  const dataPopularity = await rawPopularity

  const dataFeedback = await rawfeedbackItemRatings

  const dataGender = await rawfemaleMaleUnknown

  const dataPerformance = await rawNeverCompletedVSCompleted

  let data = dataPerformance

  const changeIt = () => {
    let currentView = fo.whichRadio('currentView')
    let form = fo.whichRadio('dimensions')

    isFeedback = false

    if (currentView === 'popularity') {
      data = dataPopularity
      d3.select('#thirdTaskTitle').text(popularityQuestion)
    } else if (currentView === 'feedback') {
      d3.select('#thirdTaskTitle').text(feedbackQuestion)
      isFeedback = true
      data = dataFeedback
    } else if (currentView === 'gender') {
      d3.select('#thirdTaskTitle').text(genderQuestion)
      data = dataGender
    } else if (currentView === 'performance') {
      d3.select('#thirdTaskTitle').text(performanceQuestion)
      data = dataPerformance
    }

    if (form === 'normalized') {
      isNormalized = true
    } else if (form === 'stacked') {
      isNormalized = false
    }

    if (d3.select('#isOrdered').property('checked')) {
      isOrdered = true
      orderText = 'Ordenado por cantidades'
    } else {
      isOrdered = false
      orderText = 'Ordenado por secuencia de actividades'
    }

    d3.select('#orderCBText').text(orderText)
    chart(processData(data, isOrdered, isNormalized, currentView), currentView)
  }

  d3.select('#currentView').on('change', changeIt)
  d3.select('#dimensions').on('change', changeIt)
  d3.select('#isOrdered').on('change', changeIt)

  changeIt()
})()

let processData = (data, isOrdered, isNormalized, currentView) => {

  let [, ...cat2] = Object.keys(data[0])

  let keyCat1 = 'Completed'
  let keyCat2 = 'Started'
  let keyCat3

  let xAxisLabel

  cat2.forEach((d, i) => {
    if (currentView === 'performance') {
      if (cat2[i] === 'Completed') {
        keyCat1 = cat2[i]
        cat2[i] = 'Actividades completadas'
      }
      if (cat2[i] === 'Started') {
        keyCat2 = cat2[i]
        cat2[i] = 'Actividades no completadas'
      }

      if (isNormalized !== true) xAxisLabel = 'Cantidad de completadas / no completadas'
      else xAxisLabel = 'Porcentaje de completadas / no completadas'
    } else if (currentView === 'popularity') {
      if (cat2[i] === 'Completed') {
        keyCat1 = cat2[i]
        cat2[i] = 'Actividades completadas'
      }
      if (cat2[i] === 'Started') {
        keyCat2 = cat2[i]
        cat2[i] = 'Actividades iniciadas'
      }

      if (isNormalized !== true) xAxisLabel = 'Cantidad de interacciones'
      else xAxisLabel = 'Porcentaje de interacciones'
    } else if (currentView === 'feedback') {
      if (cat2[i] === 'ThumbsUp') {
        keyCat1 = cat2[i]
        cat2[i] = 'Pulgares hacia arriba'
      }
      if (cat2[i] === 'ThumbsDown') {
        keyCat2 = cat2[i]
        cat2[i] = 'Pulgares abajo'
      }

      if (isNormalized !== true) xAxisLabel = 'Cantidad de retroalimentación'
      else xAxisLabel = 'Porcentaje de retroalimentación'
    } else if (currentView === 'gender') {
      if (cat2[i] === 'female') {
        keyCat1 = cat2[i]
        cat2[i] = 'Mujeres'
      }
      if (cat2[i] === 'male') {
        keyCat2 = cat2[i]
        cat2[i] = 'Hombres'
      }
      if (cat2[i] === 'unknown') {
        keyCat3 = cat2[i]
        cat2[i] = 'Desconocidos'
      }

      if (isNormalized !== true) xAxisLabel = 'Cantidad de usuarios por sexo'
      else xAxisLabel = 'Porcentaje de usuarios por sexo'
    }
  })

  const names = Array.from(data.map((d) => d.PathToItem))

  let courseBranchModuleName = Array.from(data.map((d) => d.PathToItem.split('>')[0]))
  let courseBranchLessonName = Array.from(data.map((d) => d.PathToItem.split('>')[1]))
  let courseBranchItemName = Array.from(data.map((d, i) => (i + 1) + '. ' + d.PathToItem.split('>')[2]))

  let courseBranchModuleLessonName = Array.from(data.map((d) => d.PathToItem.split('>')[0] + '>' + d.PathToItem.split('>')[1]))

  let totals
  let sums

  let totalSum = { 'key1': 0, 'key2': 0, 'key3': 0 }

  if (currentView !== 'gender') {
    totals = Array.from(data.map((d) => d[keyCat1] + d[keyCat2]))
    sums = Array.from(data.map((d) => [d[keyCat1], d[keyCat2]]))

    sums.map(s => {
      totalSum.key1 = totalSum.key1 + s[0]
      totalSum.key2 = totalSum.key2 + s[1]
    })
  } else {
    totals = Array.from(data.map((d) => d[keyCat1] + d[keyCat2] + d[keyCat3]))
    sums = Array.from(data.map((d) => [d[keyCat1], d[keyCat2], d[keyCat3]]))

    sums.map(s => {
      totalSum.key1 = totalSum.key1 + s[0]
      totalSum.key2 = totalSum.key2 + s[1]
      totalSum.key3 = totalSum.key2 + s[2]
    })
  }

  let variables = cat2

  let order

  if (isOrdered === false) {
    order = d3.range(data.length - 1).sort((i) => i)
  } else {
    if (isNormalized === true) {
      order = d3.range(data.length - 1).sort((i, j) => sums[j][0] / totals[j] - sums[i][0] / totals[i])
    } else {
      order = d3.range(data.length - 1).sort((i, j) => totals[j] - totals[i])
    }
  }

  let dataObject = {
    keys: variables,
    totals: d3.permute(totals, order),
    names: d3.permute(names, order),
    courseBranchModuleName: d3.permute(courseBranchModuleName, order),
    courseBranchLessonName: d3.permute(courseBranchLessonName, order),
    courseBranchItemName: d3.permute(courseBranchItemName, order),
    courseBranchModuleLessonName: d3.permute(courseBranchModuleLessonName, order),
    xAxisLabel: xAxisLabel,
    totalSum: totalSum
  }

  if (isNormalized === true) {
    return Object.assign(d3.stack().keys(d3.range(variables.length)).offset(d3.stackOffsetExpand)(d3.permute(sums, order)), dataObject)
  } else {
    return Object.assign(d3.stack().keys(d3.range(variables.length))(d3.permute(sums, order)), dataObject)
  }
}

let chart = (data, currentView) => {
  if (isFirstLoad !== true) {
    removeStuff()
  }

  let colorRange = ['#1353DB', '#47A6F2']

  if (currentView === 'gender') colorRange = ['#f172ac', '#008dc1', '#acb4b6']

  let color = d3.scaleOrdinal()
    .unknown('#ccc')
    .domain(data.keys)
    .range(colorRange)

  let activitiesFontSize = '10pt'

  // Header for the HTML body that D3 uses
  let marginLeft = d3.max(data.courseBranchItemName.map(d => getTextWidth(d, activitiesFontSize, 'sans-serif'))) + 30
  let margin = ({ top: 30, right: 10, bottom: 10, left: marginLeft })

  let height = data.courseBranchItemName.length * 25 + margin.top + margin.bottom

  let width = divW

  let thirdTaskTitle = d3.select('#thirdTaskTitle')

  thirdTaskTitle.styles({
    'font-size': '34px',
    'font-family': 'sans-serif',
    'font-weight': 'bold',
    'text-shadow': '1px 1px 2px #CACACA',
    'color': 'black',
    'position': 'relative',
    'left': `${0}px`,
    'padding': '5px',
    'width': `${divW}px`
  })

  d3.select('#thirdTask').append('div').attr('id', 'thirdTaskLegend').style('width', `${divW}px`)

  legend(data, color, margin, width)

  let svgo = new SvgOps({ 'h': height, 'margin': margin, '_': '#thirdTask' })
  svgo.appendPlainSVG()
  let svg = svgo.svg
    .style('width', width)
    .style('height', height)
    .attr('class', 'mainSvg')

  let yAxis = g => g
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSizeOuter(0))
    .call(g => g.selectAll('.domain').remove())

  let formatChar = '%'

  if (isNormalized === true) {
    formatChar = '%'
  } else {
    formatChar = ',r'
  }

  let xAxisLegend = data.xAxisLabel

  let xAxis = g => g
    .attr('transform', `translate(0,${margin.top})`)
    .call(d3.axisTop(x).ticks(width / 150, formatChar))
    .call(g => g.selectAll('.domain').remove())
    .call(g => g.append('text')
      .attr('x', width - margin.right)
      .attr('y', -20)
      .attr('class', 'xAxisLegend')
      .text(xAxisLegend)
      .styles({
        'font-size': '12px',
        'font-family': 'sans-serif',
        'font-weight': 'bold',
        'fill': 'currentColor',
        'text-anchor': 'end'
      }))

  let y = d3.scaleBand()
    .domain(data.courseBranchItemName)
    .range([margin.top, height - margin.bottom])
    .padding(0.1)

  let x = d3.scaleLinear()

  if (isNormalized !== true) {
    x.domain([0, d3.max(data.totals)])
  }

  x.range([margin.left, width - margin.right])

  let tt = new Tooltip()

  tt.setTtData(data)

  svg.append('g')
    .selectAll('g')
    .data(data)
    .enter().append('g')
    .attr('fill', (d, i) => color(data.keys[i]))
    .selectAll('rect')
    .data(d => d)
    .enter().append('rect')
    .attr('x', d => x(d[0]))
    .attr('y', (d, i) => y(data.courseBranchItemName[i]))
    .attr('width', d => x(d[1]) - x(d[0]))
    .attr('height', y.bandwidth())
    .attr('class', 'barChartRects')
    .on('mouseover', function (d) {
      let accum = 0
      d.data.map(d => accum = accum + d)
      tt.showTT({ 'total': accum, 'value': d[1] - d[0] }, 'barTT', color, isNormalized)
    })
    .on('mouseout', function () {
      tt.div.transition()
        .duration(900)
        .style('opacity', 0)
    })

  svg.append('g')
    .call(xAxis)
    .attr('class', 'axisX')

  svg.append('g')
    .call(yAxis)
    .attr('class', 'axisY')
    .styles({
      'font-size': activitiesFontSize,
      'font-family': 'sans-serif',
      'text-shadow': '1px 1px 2px #CACACA'
    })

  // Chart more

  let axisY = d3.selectAll('.axisY')

  axisY.selectAll('text').attr('class', 'itemName')

  let re = /\d+?\.\s/

  d3.selectAll('.itemName').each(function () { d3.select(this).html(d3.select(this).html().replace(re, '')) })

  // Data binding
  let itemName = d3.selectAll('.itemName').data(data.names) // UPDATE

  itemName.on('mouseover', function (d) {
    tt.showTT({ 'value': d }, 'textTT', color)
  })
    .on('mouseout', function () {
      tt.div.transition()
        .duration(900)
        .style('opacity', 0)
    })

  d3.select('.hrs').remove()
  d3.select('#thirdTask').append('hr').attr('class', 'hrs')

  d3.select('#views_title').style('font-weight', 'bold')
  d3.select('#options_title').style('font-weight', 'bold')
  d3.select('#order_title').style('font-weight', 'bold')

  let viewControls = d3.select('#controls')
    .styles({
      'font-size': '12pt',
      'font-family': 'sans-serif',
      'text-shadow': '1px 1px 2px #CACACA',
      'position': 'relative',
      'left': `${0}px`,
      'border': '1px solid #CBCBCB',
      'width': `${divW}px`,
      'padding': '5px',
      'text-align': 'left',
      'height': `${110}px`
    })

  viewControls.attrs({
    'onmouseover': 'this.style.background=\'#F6F6F6\'',
    'onmouseout': 'this.style.background=\'white\''
  })

  let controlsStyles = {
    'float': 'left',
    'padding': '5px 10px 5px 5px',
    'border-right': '1px solid #ABABAB'
  }

  d3.select('#third_task_views').styles(controlsStyles)
  d3.select('#third_task_options').styles(controlsStyles)
  d3.select('#third_task_order').styles({
    'float': 'left',
    'padding': '5px 10px 5px 5px'
  })

  d3.selectAll('#radioView').style('vertical-align', 'middle')

  // End chart more

  isFirstLoad = false
}

function getTextWidth (text, fontSize, fontFace) {
  var canvas = document.createElement('canvas')
  var context = canvas.getContext('2d')
  context.font = fontSize + ' ' + fontFace
  return context.measureText(text).width
}

function legend (data, color, margin, width) {
  let svgo = new SvgOps({ 'w': 300, 'h': data.keys.length * 20, '_': '#thirdTaskLegend' })
  svgo.appendSVGNoMargin()
  let svg = svgo.svg
    .attr('class', 'legendSvg')

  const g = svg.append('g')
    .selectAll('g')
    .data(data.keys.slice())
    .enter().append('g')
    .attr('transform', (d, i) => `translate(0,${i * 20})`)
    .attr('class', 'legendG')

  g.append('rect')
    .attr('width', 19)
    .attr('height', 19)
    .attr('fill', color)
    .attr('class', 'legendGRect')

  g.append('text')
    .attr('x', 24)
    .attr('y', 9.5)
    .attr('dy', '0.35em')
    .html(d => {
      if (isFeedback === false) return d
      else {
        if (d === 'Pulgares hacia arriba') return `&#128077; ${d}`
        else return `&#128078; ${d}`
      }
    })

  svg.styles({
    'font-size': '14px',
    'font-family': 'sans-serif',
    'text-shadow': '1px 1px 2px #CACACA',
    'position': 'relative',
    'border': '1px solid #E4E4E4',
    'padding': '5px'
  })

  svg.style('left', `${(width / 2) - (d3.select('.legendSvg').attr('width') / 2)}px`)

  let tt = new Tooltip()

  tt.setTtData(data)

  svg
    .on('mouseover', function () {
      tt.showTT({ 'value': 0 }, 'textTotals', color)
    })
    .on('mouseout', function () {
      tt.div.transition()
        .duration(900)
        .style('opacity', 0)
    })

  if (isFirstLoad === true) d3.select('#thirdTask').append('br')
}