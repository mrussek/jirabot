const jirabot = require('./jirabot')
const { makeApp } = require('./aogbot')

jest.mock('./jirabot')

describe('makeApp', () => {
    test('exports intents', () => {
        const intent = jest.fn()

        makeApp({ intent })

        expect(intent).toHaveBeenCalledTimes(2)

        const intentNames = intent.mock.calls.map(args => args[0])

        expect(intentNames).toContain('Ticket Status')
        expect(intentNames).toContain('Ticket Description')
    })

    test('Ticket Description intent defers to jirabot', () => {
        const intent = jest.fn()

        makeApp({ intent })

        const {
            mock: {
                calls
            }
        } = intent

        const ticketDescriptionCallback = calls.find(call => call[0] === 'Ticket Description')[1]

        const params = { 'Ticket': 'UXTALK-100' }
        const ask = jest.fn()
        const conv = { ask }

        jirabot.ticketDescription.mockResolvedValue('description')
        
        return ticketDescriptionCallback(conv, params).then(_ => {
            expect(ask).toBeCalledWith('description')
        })
    })
})