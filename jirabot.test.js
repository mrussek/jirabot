const rp = require('request-promise')
const jirabot = require('./jirabot')

jest.mock('request-promise')

require('dotenv').config()

test('parse issue', () => {
    expect(jirabot.constructIssue("uxtalk 100")).toBe("UXTALK-100")
})

test('fetch issue', (done) => {
    rp.mockResolvedValue({
        id: '10000'
    })
    jirabot.fetchIssue('CHAT-1')
        .then(issue => {
            expect(issue.id).toBe('10000')
            done()
        })
})

