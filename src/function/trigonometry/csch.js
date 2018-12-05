'use strict'

import { factory } from '../../utils/factory'
import { deepMap } from '../../utils/collection'
import { sign } from '../../utils/number'

const name = 'csch'
const dependencies = ['typed', 'type.BigNumber', 'type.Unit']

export const createCsch = /* #__PURE__ */ factory(name, dependencies, ({ typed, type: { BigNumber, Unit } }) => {
  /**
   * Calculate the hyperbolic cosecant of a value,
   * defined as `csch(x) = 1 / sinh(x)`.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.csch(x)
   *
   * Examples:
   *
   *    // csch(x) = 1/ sinh(x)
   *    math.csch(0.5)       // returns 1.9190347513349437
   *    1 / math.sinh(0.5)   // returns 1.9190347513349437
   *
   * See also:
   *
   *    sinh, sech, coth
   *
   * @param {number | Complex | Unit | Array | Matrix} x  Function input
   * @return {number | Complex | Array | Matrix} Hyperbolic cosecant of x
   */
  const csch = typed(name, {
    'number': _csch,

    'Complex': function (x) {
      return x.csch()
    },

    'BigNumber': function (x) {
      return new BigNumber(1).div(x.sinh())
    },

    'Unit': function (x) {
      if (!x.hasBase(Unit.BASE_UNITS.ANGLE)) {
        throw new TypeError('Unit in function csch is no angle')
      }
      return csch(x.value)
    },

    'Array | Matrix': function (x) {
      return deepMap(x, csch)
    }
  })

  return csch
})

/**
 * Calculate the hyperbolic cosecant of a number
 * @param {number} x
 * @returns {number}
 * @private
 */
function _csch (x) {
  // consider values close to zero (+/-)
  if (x === 0) {
    return Number.POSITIVE_INFINITY
  } else {
    return Math.abs(2 / (Math.exp(x) - Math.exp(-x))) * sign(x)
  }
}