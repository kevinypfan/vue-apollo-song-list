import Vue from 'vue'
import App from './App.vue'

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
// import { ApolloLink, split, concat } from 'apollo-link'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'

import router from './router'
import store from './store'

const httpLink = new HttpLink({
  uri: `http://localhost:3000/graphql`
})

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3000/subscriptions',
  options: {
    reconnect: true
  }
})
// const middlewareLink = new ApolloLink((operation, forward) => {
//   const token = sessionStorage.getItem('access_token')
//   operation.setContext({
//     headers: {
//       Authorization: `Bearer ${token}` || null
//     }
//   })
//   return forward(operation)
// })

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' &&
      operation === 'subscription'
  },
  wsLink,
  httpLink
)

const apolloClient = new ApolloClient({
  // 有要用 middlewareLink
  // link: concat(middlewareLink, link),
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.use(VueApollo)

Vue.config.productionTip = false

new Vue({
  provide: apolloProvider.provide(),
  router,
  store,
  render: h => h(App)
}).$mount('#app')
