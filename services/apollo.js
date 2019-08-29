export default class Apollo {
  constructor(apolloClient) {
    this.apolloClient = apolloClient
    this.options = {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    }
  }

  async query(gql, variables = null) {
    const { data, errors } = await this.apolloClient.query({
      query: gql,
      variables,
      ...this.options
    })

    if (errors) {
      throw new Error(errors)
    }

    return data
  }

  async mutate(gql, variables = null) {
    const { data, errors } = await this.apolloClient.mutate({
      mutation: gql,
      variables,
      ...this.options
    })

    if (errors) {
      throw new Error(errors)
    }

    return data
  }
}
