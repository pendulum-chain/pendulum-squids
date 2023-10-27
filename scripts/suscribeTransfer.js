const WebSocket = require('ws')
const { createClient } = require('graphql-ws')

const port = process.env.GQL_PORT || 4350
const host = process.env.GQL_HOST || 'localhost'
const proto = process.env.GQL_PROTO || 'ws'

const client = createClient({
    webSocketImpl: WebSocket,
    url: `${proto}://${host}:${port}/graphql`,
})

client.subscribe(
    {
        query: `
    subscription {
        tokenTransfers(limit: 2, orderBy: timestamp_DESC) {
          from
          to
          amount
          currencyId
        }
    }
    `,
    },
    {
        next: (data) => {
            console.log(`New token transfers: ${JSON.stringify(data)}`)
        },
        error: (error) => {
            console.error('error', error)
        },
        complete: () => {
            console.log('done!')
        },
    }
)

client.subscribe(
    {
        query: `
    subscription {
      tokenDeposits(limit: 2, orderBy: timestamp_DESC) {
          who
          amount
          currencyId
        }
    }
    `,
    },
    {
        next: (data) => {
            console.log(`New token deposits: ${JSON.stringify(data)}`)
        },
        error: (error) => {
            console.error('error', error)
        },
        complete: () => {
            console.log('done!')
        },
    }
)

client.subscribe(
    {
        query: `
    subscription {
      tokenWithdrawns(limit: 2, orderBy: timestamp_DESC) {
          who
          amount
          currencyId
        }
    }
    `,
    },
    {
        next: (data) => {
            console.log(`New token withdrawns: ${JSON.stringify(data)}`)
        },
        error: (error) => {
            console.error('error', error)
        },
        complete: () => {
            console.log('done!')
        },
    }
)
