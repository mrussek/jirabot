const rp = require('request-promise')
const jirabot = require('./jirabot')

require('dotenv').config()

test('smoke test', () => {
    const options = {
        uri: `${process.env.BASE_URL}/issue/CHAT-1`,
        headers: {
            'Authorization': `Basic ${process.env.BOT_API_TOKEN}`
        },
        json: true
    }
    return rp(options).then(issue => {
        expect(issue.id).toBe('10000')
    })
})

test('test chat 2', () => {
    return jirabot.ticketDescription('chat 2').then(s => {
        expect(s).toBe("CHAT-2 is Build a Jira Chatbot")
    })
})