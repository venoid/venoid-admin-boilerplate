import booksGql from '../apollo/queries/books'
import editBookGql from '../apollo/mutations/editBook'

export default class Book {
  constructor(apolloClient) {
    this.apolloClient = apolloClient
  }

  async getBooks() {
    const { data, errors } = await this.apolloClient.query({
      query: booksGql,
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    })

    if (errors) {
      throw new Error("Couldn't get books.")
    }

    return data.books
  }

  async editBook({ id, title }) {
    try {
      await this.apolloClient.mutate({
        mutation: editBookGql,
        variables: { id, title },
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
      })
    } catch (e) {
      console.log(e)
    }
  }
}
