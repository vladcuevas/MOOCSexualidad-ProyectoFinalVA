/* global d3 */

import { NumberOps } from './numberOps.js'
import { BarChart } from './barChart.js'

let nuops = new NumberOps()

export class Tooltip {
  constructor (theDate) {
    // Define the div for the tooltip
    this.theDate = theDate
    this.div = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
    this.ttData = []
  }

  setTtData (data) {
    this.ttData = data
  }

  showTT (d, ttName, color, isNormalized) {
    this.div.html('')
      .style('left', (d3.event.pageX) + 'px')
      .style('top', (d3.event.pageY - 28) + 'px')
      .style('background-color', '#F7F5F5')
      .style('height', 150)
      .styles({
        'position': 'absolute',
        'padding': '2px',
        'font-size': '12px',
        'font-family': 'sans-serif',
        'border': '1px',
        'pointer-events': 'none',
        'border-radius': '2px',
        'border-color': 'coral',
        'border-style': 'solid' }
      )

    this.div.transition()
      .duration(200)
      .style('opacity', 1)

    if (ttName === 'barTT') {
      let template

      if (isNormalized !== true) {
        template = `<strong>Cantidad: </strong>${nuops.formatNumberWith(d.value, ',')}
                    <hr>
                    <strong>Total:</strong>${nuops.formatNumberWith(d.total, ',')}<br/>`
      } else {
        template = `<strong>Cantidad: </strong>${nuops.formatPercentage(d.value)}
                    <hr>
                    <strong>Total:</strong>${nuops.formatNumberWith(d.total, ',')}<br/>`
      }

      this.div.html(template)
        .style('left', (d3.event.pageX) + 'px')
        .style('top', (d3.event.pageY - 28) + 'px')
    } else if (ttName === 'textTT') {
      let [bModule, bLesson, bItem] = d.value.split('>')

      let template = `<strong>Modulo</strong>: ${bModule} <br>
                    <strong>Lección</strong>: ${bLesson} <br>
                    <hr>
                    <strong style="font-size':'16px';font-family:sans-serif;">Actividad</strong>: ${bItem} <br>`

      this.div.html(template)
        .style('left', (d3.event.pageX) + 'px')
        .style('top', (d3.event.pageY - 28) + 'px')
    } else if (ttName === 'textTotals') {
      let template = `<strong>Total de ${this.ttData.keys[0].toLowerCase()}</strong>: ${nuops.formatNumberWith(this.ttData.totalSum.key1, ',')} <br>
                    <hr>
                    <strong>Total de ${this.ttData.keys[1].toLowerCase()}</strong>: ${nuops.formatNumberWith(this.ttData.totalSum.key2, ',')} <br>`

      if (this.ttData.keys[2] !== undefined) {
        template = template + `<hr>
            <strong>Total de ${this.ttData.keys[2].toLowerCase()}</strong>: ${nuops.formatNumberWith(this.ttData.totalSum.key3, ',')} <br>`
      }

      this.div.html(template)
        .style('left', (d3.event.pageX) + 'px')
        .style('top', (d3.event.pageY - 28) + 'px')
    } else if (ttName === 'textTotalss') {
      let d = [{ 'key': this.ttData.keys[0].toLowerCase(), 'count': this.ttData.totalSum.key1 }, { 'key': this.ttData.keys[1].toLowerCase(), 'count': this.ttData.totalSum.key2 }]

      if (this.ttData.keys[2] !== undefined) {
        d.push({ 'key': this.ttData.keys[2].toLowerCase(), 'count': this.ttData.totalSum.key3 })
      }

      this.showMiniBarchart(d, color)
    }
  }

  showMiniBarchart (d, color) {
    let bChart = new BarChart()
    let bChartHeight = 150
    let bChartWidth = 150

    this.div.html('')
      .style('left', (d3.event.pageX) + 'px')
      .style('top', (d3.event.pageY - 28) + 'px')
      .style('background-color', '#F7F5F5')
      .style('height', bChartHeight)

    bChart.graph('.tooltip', bChartHeight, bChartWidth, d, color(d.map(k => k.key)))

    this.div.transition()
      .duration(200)
      .style('opacity', 1)
  }
}
