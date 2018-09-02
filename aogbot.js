const { dialogflow } = require('actions-on-google')
const functions = require('firebase-functions')
const jirabot = require('./jirabot')

const app = dialogflow()
app.intent('Ticket Description', (conv, params) => {
    const ticket = params['Ticket']
    return jirabot.fulfillTicketRequest(ticket)
        .then(s => {
            conv.ask(s)
        })
})

module.exports = {
    fulfillment: functions.https.onRequest(app)
}