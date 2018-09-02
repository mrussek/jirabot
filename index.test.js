const index = require('./index')

test('fulfillment is defined', () => {
    expect(index).toHaveProperty('fulfillment')
    expect(index.fulfillment).toBeDefined()
})