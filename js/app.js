/* global d3 */

import { Reader } from './models/reader.js'

let reader = new Reader('https://raw.githubusercontent.com/juanoyuela10/Tarea_4/master/datos_curso.csv')

let tooltip
let tooltip2
let tooltip3

let width = 964

let height = 136

let cellSize = 17 // cell size

let format = d3.timeFormat('%Y-%m-%d')

// let  color = d3.scaleSequential(d3.interpolatePiYG).domain([-0.05, 0.05])
let color = d3.scaleQuantize()
  .domain([-250, 250])
  .range(d3.range(11).map(function (d) { return 'q' + d + '-11' }))

let svg = d3.select('#calView').selectAll('svg')
  .data(d3.range(2015, 2019))
  .enter().append('svg')
  .attr('width', width)
  .attr('height', height)
  .attr('class', 'RdYlGn')
  .append('g')
  .attr('transform', 'translate(' + ((width - cellSize * 53) / 2) + ',' + (height - cellSize * 7 - 1) + ')')

svg.append('text')
  .attr('transform', 'translate(-6,' + cellSize * 3.5 + ')rotate(-90)')
  .style('text-anchor', 'middle')
  .style('font-size', '12px')
  .text(function (d) { return d })

// Etiqueta para los promedios
tooltip = svg.append('text')
  .style('font-size', '10pt')
  .style('font-family', 'arial')
  .style('fill', '#0000A0')
  .style('font-weight', 'bold')
// Etiqueta para los mínimos
tooltip2 = svg.append('text')
  .style('font-size', '10pt')
  .style('font-family', 'arial')
  .style('fill', 'Red')
  .style('font-weight', 'bold')
// Etiqueta para los máximos
tooltip3 = svg.append('text')
  .style('font-size', '10pt')
  .style('font-family', 'arial')
  .style('fill', 'LimeGreen')
  .style('font-weight', 'bold')

let rect = svg.selectAll('.day')
  .data(function (d) { return d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)) })
  .enter().append('rect')
  .attr('class', 'day')
  .attr('width', cellSize)
  .attr('height', cellSize)
  .attr('x', function (d) { return d3.timeWeek.count(d3.timeYear(d), d) * cellSize })
  .attr('y', function (d) { return d.getDay() * cellSize })
  .datum(format)

rect.append('title')
  .text(function (d) { return d })

svg.selectAll('.month')
  .data(function (d) { return d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1)) })
  .enter().append('path')
  .attr('class', 'month')
  .attr('d', monthPath)

let rawDS = reader.plainCSV();

(async function read () {
  const csv = await rawDS

  let data = d3.nest()
    .key(function (d) { return d.FECHA_INICIO })
    .rollup(function (d) { return (d[0].INSCRITOS) })
    .map(csv)

  let dataMujeres = d3.nest()
    .key(function (d) { return d.FECHA_INICIO })
    .rollup(function (d) { return (d[0].MUJERES) })
    .map(csv)

  let dataHombres = d3.nest()
    .key(function (d) { return d.FECHA_INICIO })
    .rollup(function (d) { return (d[0].HOMBRES) })
    .map(csv)

  let dataNR = d3.nest()
    .key(function (d) { return d.FECHA_INICIO })
    .rollup(function (d) { return (d[0].NO_REPORTADO) })
    .map(csv)

  //  console.log('datos', data)

  rect.filter(function (d) { return data.has(d) })
    .attr('class', function (d) { return 'day ' + color(data.get(d)) })
    .select('title')
    .text(function (d) { return d + ' - Inscritos: ' + data.get(d) + ', H: ' + dataHombres.get(d) + ', M: ' + dataMujeres.get(d) + ', IND: ' + dataNR.get(d) })
})()

function monthPath (t0) {
  let t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0)

  let d0 = t0.getDay(); var w0 = d3.timeWeek.count(d3.timeYear(t0), t0)
  let d1 = t1.getDay(), w1 = d3.timeWeek.count(d3.timeYear(t1), t1)
  return 'M' + (w0 + 1) * cellSize + ',' + d0 * cellSize +
      'H' + w0 * cellSize + 'V' + 7 * cellSize +
      'H' + w1 * cellSize + 'V' + (d1 + 1) * cellSize +
      'H' + (w1 + 1) * cellSize + 'V' + 0 +
      'H' + (w0 + 1) * cellSize + 'Z'
}
