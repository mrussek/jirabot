const { dialogflow } = require('actions-on-google')
const functions = require('firebase-functions')
const rp = require('request-promise')

const jira = path => {
    const options = {
        uri: `${process.env.BASE_URL}/${path}`,
        headers: {
            'Authorization': `Basic ${process.env.BOT_API_TOKEN}`
        },
        json: true
    }

    return rp(options)
}

const fetchIssue = ticketId => {
    return jira(`issue/${ticketId}`)
}

const constructIssue = issue => {
    const [ projectText, number ] = issue.split(/[- ]/)
    const projectId = projectText.toUpperCase()

    return `${projectId}-${number}`
}

const fulfillTicketRequest = issue => {
    const ticketId = constructIssue(issue)
    return fetchIssue(ticketId)
        .then(issue => `${ticketId} is ${issue.fields.description}`)
}

const app = dialogflow()
app.intent('Ticket Description', (conv, params) => {
    const ticket = params['Ticket']
    return fulfillTicketRequest(ticket)
        .then(s => {
            conv.ask(s)
        })
})

module.exports = {
    fulfillTicketRequest,
    constructIssue,
    fetchIssue,
    fulfillment: functions.https.onRequest(app)
}
