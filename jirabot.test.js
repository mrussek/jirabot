const rp = require('request-promise')
const jirabot = require('./jirabot')

require('dotenv').config()

test('smoke test', (done) => {
    const options = {
        uri: `${process.env.BASE_URL}/issue/CHAT-1`,
        headers: {
            'Authorization': `Basic ${process.env.BOT_API_TOKEN}`
        },
        json: true
    }
    rp(options).then(issue => {
        expect(issue.id).toBe("10000")
        done()
    })
})

test('parse issue', () => {
    expect(jirabot.constructIssue("uxtalk 100")).toBe("UXTALK-100")
})

test('fetch issue', (done) => {
    jirabot.fetchIssue('CHAT-1')
        .then(issue => {
            expect(issue.id).toBe('10000')
            done()
        })
})

test('test chat 2', done => {
    jirabot.fulfillTicketRequest('chat 2').then(s => {
        expect(s).toBe("CHAT-2 is Build a Jira Chatbot")
        done()
    })
})
