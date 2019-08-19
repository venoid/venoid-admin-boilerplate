import booksGql from '../apollo/queries/books'
import editBookGql from '../apollo/mutations/editBook'
import createBookGql from '../apollo/mutations/createBook'
import deleteBookGql from '../apollo/mutations/deleteBook'

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

  async editBook({ id, title, releaseDate, pages }) {
    try {
      const mutation = id ? editBookGql : createBookGql
      await this.apolloClient.mutate({
        mutation,
        variables: id
          ? { id, title, releaseDate, pages }
          : { title, releaseDate, pages },
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
      })
    } catch (e) {
      console.log(e)
    }
  }

  async deleteBook(id) {
    try {
      await this.apolloClient.mutate({
        mutation: deleteBookGql,
        variables: { id },
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
      })
    } catch (e) {
      console.log(e)
    }
  }
}
