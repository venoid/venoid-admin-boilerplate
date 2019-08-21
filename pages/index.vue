<template>
  <section class="section">
    <b-button icon="add" @click="editBook()">Add Book</b-button>
    <venoid-datatable
      :is-loading="isLoading"
      :table-columns="tableColumns"
      :table-data="tableData"
    />
    <venoid-modal
      :active="bookModalActive"
      :header="modalHeader"
      :close-button="false"
      @close="closeBookForm"
    >
      <venoid-form
        :model="bookForm.data"
        :is-loading="bookForm.isLoading"
        :fields="{
          title: {
            label: 'Title',
            placeholder: 'Enter book title',
            type: 'text'
          },
          releaseDate: {
            label: 'Release Date',
            placeholder: 'Enter release date',
            type: 'text'
          },
          pages: {
            label: 'Pages',
            placeholder: 'Enter number of pages',
            type: 'number'
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
    </venoid-modal>
  </section>
</template>

<script>
import venoidDatatable from '@venoid/admin-datatable'
import venoidModal from '@venoid/admin-modal'
import venoidForm from '@venoid/admin-form'

export default {
  name: 'HomePage',
  components: {
    venoidDatatable,
    venoidModal,
    venoidForm
  },
  data() {
    return {
      isLoading: false,
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
          field: (r) =>
            r.author ? `${r.author.name} ${r.author.surname}` : 'Unknown',
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
      return this.bookForm.data !== null ? `Edit book` : 'Create new book'
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
          title: null,
          releaseDate: null,
          pages: 0
        }
      }
      this.bookModalActive = true
    },

    getMe() {
      this.$v.auth.me()
    },
    async saveBook() {
      try {
        this.isLoading = true
        await this.$v.book.editBook(this.bookForm.data)
        this.$v.notification.success(
          `Book #${this.bookForm.data.id || ''} saved`
        )
        this.tableData = await this.$v.book.getBooks()
        this.isLoading = false
      } catch (e) {
        this.$v.notification.error('Could not update book')
      }
      this.closeBookForm()
    },
    deleteBook({ id }) {
      try {
        this.$v.dialog.delete(
          `Do you really want to delete book #${id}?`,
          async () => {
            this.isLoading = true
            await this.$v.book.deleteBook(id)
            this.$v.notification.success(`Book ${id} deleted`)
            this.tableData = await this.$v.book.getBooks()
            this.isLoading = false
          }
        )
      } catch (e) {
        this.$v.notification.error('Could not delete book')
      }
      // TODO delete book mutation
    },
    closeBookForm() {
      this.bookModalActive = false
      this.bookForm.data = null
      this.bookForm.isLoading = false
    }
  }
}
</script>
