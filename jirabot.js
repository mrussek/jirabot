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

module.exports = {
    fulfillTicketRequest,
    constructIssue,
    fetchIssue
}
