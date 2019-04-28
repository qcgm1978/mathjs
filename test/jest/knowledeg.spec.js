const math = require('../../dist/math')
it(`Neutron: a normal-sized matchbox containing neutron-star material would have a weight of approximately 3 billion tonnes, the same weight as a 0.5 cubic kilometre chunk of the Earth (a cube with edges of about 800 metres)`, () => {
    const base1 = 10 ** 2
    const base2 = base1 ** 2
    const base3 = base2 * 10 * 5
    const ratio = base3
    const chunk = .5 * 1000 ** 2
    expect(ratio)
        .toBe(chunk)
        .toBe(500000)
});