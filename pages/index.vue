<template>
  <section class="section">
    <Datatable :model="datatable" />

    <!-- <button @click="getMe">me</button> -->
  </section>
</template>

<script>
import Datatable from '../components/Datatable'

export default {
  name: 'HomePage',
  components: {
    Datatable
  },
  data() {
    return {
      datatable: {
        tableColumns: [
          {
            type: 'id',
            field: 'id',
            label: 'ID',
            width: '20'
          },
          {
            type: 'string',
            label: 'First name',
            field: 'first_name',
            width: '60'
          },
          {
            type: 'string',
            label: 'Last name',
            field: 'last_name',
            width: '60'
          },
          {
            type: 'string',
            label: 'Date',
            field: 'date',
            width: '60'
          },
          {
            type: 'string',
            label: 'Gender',
            field: 'gender',
            width: '40'
          },
          {
            type: 'action',
            label: 'Action',
            options: {
              callback: (rowData) => {
                this.$buefy.snackbar.open({
                  duration: 4000,
                  indefinite: true,
                  message: `Are you sure to remove ${rowData.first_name} ${rowData.last_name}?`,
                  type: 'is-danger',
                  position: 'is-top',
                  actionText: 'Remove',
                  queue: false,
                  onAction: () => {
                    this.$buefy.snackbar.open({
                      duration: 3000,
                      message: `${rowData.first_name} ${rowData.last_name} was successfulz removed.`,
                      type: 'is-success',
                      position: 'is-bottom-right',
                      actionText: null,
                      queue: false
                    })
                  }
                })
              },
              icon: 'pencil'
            },
            width: '20'
          }
        ],
        tableData: [
          {
            id: 1,
            first_name: 'Jesse',
            last_name: 'Simmons',
            date: '2016/10/15 13:43:27',
            gender: 'Male'
          },
          {
            id: 2,
            first_name: 'John',
            last_name: 'Jacobs',
            date: '2016/12/15 06:00:53',
            gender: 'Male'
          },
          {
            id: 3,
            first_name: 'Tina',
            last_name: 'Gilbert',
            date: '2016/04/26 06:26:28',
            gender: 'Female'
          },
          {
            id: 4,
            first_name: 'Clarence',
            last_name: 'Flores',
            date: '2016/04/10 10:28:46',
            gender: 'Male'
          },
          {
            id: 5,
            first_name: 'Anne',
            last_name: 'Lee',
            date: '2016/12/06 14:38:38',
            gender: 'Female'
          }
        ]
      }
    }
  },
  methods: {
    getMe() {
      this.$v.auth.me()
    }
  }
}
</script>
