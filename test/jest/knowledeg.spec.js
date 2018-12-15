const math = require('../../dist/math')
it(`Neutron`, () => {
    const base1 = 10 ** 2
    const base2 = base1 ** 2
    const base3 = base2 * 10 * 5
    const ratio = base3
    expect(math.compareEquation(ratio, 500000)).toBeTruthy()
});