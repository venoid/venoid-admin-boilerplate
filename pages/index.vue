<template>
  <section class="section">
    <b-button icon="add" @click="editBook()">Add Book</b-button>
    <Datatable :table-columns="tableColumns" :table-data="tableData" />
    <Modal
      :active="bookModalActive"
      :header="modalHeader"
      :close-button="false"
      @close="closeBookForm"
    >
      <Form
        :model="bookForm.data"
        :is-loading="bookForm.isLoading"
        :fields="{
          id: {
            label: 'Book Id',
            type: 'text'
          },
          title: {
            label: 'Book title',
            placeholder: 'Enter book title',
            type: 'text'
          }
        }"
        :actions="[
          {
            label: 'Save',
            onclick: saveBook
          },
          {
            label: 'Close',
            type: 'default',
            onclick: closeBookForm
          }
        ]"
      />
    </Modal>
  </section>
</template>

<script>
import Datatable from '../components/Datatable'
import Modal from '../components/Modal'
import Form from '../components/Form'

export default {
  name: 'HomePage',
  components: {
    Datatable,
    Modal,
    Form
  },
  data() {
    return {
      bookForm: {
        isLoading: false,
        data: null
      },
      bookModalActive: false,
      tableColumns: [
        {
          type: 'id',
          field: (r) => r.id,
          label: 'ID',
          width: '20'
        },
        {
          type: 'string',
          label: 'Title',
          field: (r) => r.title,
          width: '60'
        },
        {
          type: 'string',
          label: 'Author',
          field: (r) => `${r.author.name} ${r.author.surname}`,
          width: '60'
        },
        {
          type: 'string',
          label: 'Release Date',
          field: (r) => r.releaseDate,
          width: '60'
        },
        {
          type: 'string',
          label: 'Pages',
          field: (r) => r.pages,
          width: '40'
        },
        {
          type: 'action',
          label: 'Actions',
          width: '5',
          actions: [
            {
              callback: (rowData) => {
                this.editBook(rowData)
              },
              icon: 'pencil'
            },
            {
              callback: (rowData) => {
                this.deleteBook(rowData)
              },
              icon: 'delete'
            }
          ]
        }
      ]
    }
  },
  computed: {
    modalHeader() {
      return this.bookForm.data !== null ? `Edit book: ` : 'Create new book'
    }
  },
  async asyncData({ app }) {
    const books = await app.$v.book.getBooks()
    return { tableData: books }
  },
  methods: {
    editBook(data = null) {
      if (data !== null) {
        this.bookForm.data = Object.assign({}, data)
      } else {
        this.bookForm.data = {
          id: null,
          title: null
        }
      }
      this.bookModalActive = true
    },

    getMe() {
      this.$v.auth.me()
    },
    async saveBook() {
      try {
        await this.$v.book.editBook(this.bookForm.data)
        this.$v.notification.success('Book saved')
      } catch (e) {
        this.$v.notification.error('Could not update book')
      }
      this.closeBookForm()
    },
    deleteBook(book) {
      console.log(book)
    },
    closeBookForm() {
      this.bookModalActive = false
      this.bookForm.data = null
      this.bookForm.isLoading = false
    }
  }
}
</script>
