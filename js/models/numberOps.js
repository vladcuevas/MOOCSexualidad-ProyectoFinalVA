/* global d3 */

export class NumberOps {
  formatNumber (n) {
    return d3.format('~s')(n)
  }

  formatNumberWith (n, format) {
    return d3.format(format)(n)
  }

  formatPercentage (n) {
    return d3.format('.0%')(n)
  }
}
