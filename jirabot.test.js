const rp = require('request-promise')
const jirabot = require('./jirabot')

jest.mock('request-promise')

require('dotenv').config()

describe('jirabot', () => {
    test('parse issue', () => {
        expect(jirabot.constructIssue('uxtalk 100')).toBe('UXTALK-100')
        expect(jirabot.constructIssue('uxdrive-100')).toBe('UXDRIVE-100')
    })

    test('fetch issue', () => {
        rp.mockResolvedValue({
            id: '10000'
        })

        return jirabot.fetchIssue('CHAT-1')
            .then(issue => {
                expect(issue.id).toBe('10000')
            })
    })
})