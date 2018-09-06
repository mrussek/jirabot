const functions = require('firebase-functions')
const jirabot = require('./jirabot')

const makeApp = app => {
    app.intent('Ticket Description', (conv, params) => {
        const ticket = params['Ticket']
        return jirabot.ticketDescription(ticket)
            .then(s => {
                conv.ask(s)
            })
    })

    app.intent('Ticket Status', (conv, params) => {
        const ticket = params['Ticket']
        return jirabot.ticketDescription(ticket)
            .then(s => {
                conv.ask(s)
            })
    })
}

const { dialogflow } = require('actions-on-google')
const app = dialogflow()
makeApp(app)
module.exports = {
    makeApp,
    fulfillment: functions.https.onRequest(app)
}