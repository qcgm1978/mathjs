'use strict'

import { factory } from '../../utils/factory'
import { deepMap } from '../../utils/collection'

const name = 'acosh'
const dependencies = ['typed', 'config.predictable', 'type.Complex']

export const createAcosh = /* #__PURE__ */ factory(name, dependencies, ({ typed, config, type: { Complex } }) => {
  /**
   * Calculate the hyperbolic arccos of a value,
   * defined as `acosh(x) = ln(sqrt(x^2 - 1) + x)`.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.acosh(x)
   *
   * Examples:
   *
   *    math.acosh(1.5)       // returns 0.9624236501192069
   *
   * See also:
   *
   *    cosh, asinh, atanh
   *
   * @param {number | Complex | Unit | Array | Matrix} x  Function input
   * @return {number | Complex | Array | Matrix} Hyperbolic arccosine of x
   */
  const acosh = typed(name, {
    'number': function (x) {
      if (x >= 1 || config.predictable) {
        return _acosh(x)
      }
      if (x <= -1) {
        return new Complex(Math.log(Math.sqrt(x * x - 1) - x), Math.PI)
      }
      return new Complex(x, 0).acosh()
    },

    'Complex': function (x) {
      return x.acosh()
    },

    'BigNumber': function (x) {
      return x.acosh()
    },

    'Array | Matrix': function (x) {
      return deepMap(x, acosh)
    }
  })

  return acosh
})

/**
 * Calculate the hyperbolic arccos of a number
 * @param {number} x
 * @return {number}
 * @private
 */
const _acosh = Math.acosh || function (x) {
  return Math.log(Math.sqrt(x * x - 1) + x)
}