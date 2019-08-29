<template>
  <section class="section">
    <b-button icon="add" @click="editPokemon()">Add Pokemon</b-button>
    <venoid-datatable
      :table-columns="tableColumns"
      :on-api-call="getPokemons"
    />
    <venoid-modal
      :active="pokemonModalActive"
      :header="modalHeader"
      :close-button="false"
      @close="closePokemonForm"
    >
      <venoid-form
        :model="pokemonForm.data"
        :is-loading="pokemonForm.isLoading"
        :fields="{
          id: {
            label: 'Id',
            placeholder: 'Enter Pokemon id',
            type: 'text'
          },
          name: {
            label: 'Name',
            placeholder: 'Enter pokemon name',
            type: 'text'
          },
          number: {
            label: 'Number',
            placeholder: 'Enter pokemon number',
            type: 'text'
          },
          classification: {
            label: 'Classification',
            placeholder: 'Enter pokemon classification',
            type: 'text'
          }
        }"
        :actions="[
          {
            label: 'Save',
            onclick: savePokemon
          },
          {
            label: 'Close',
            type: 'default',
            onclick: closePokemonForm
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
      pokemonForm: {
        isLoading: false,
        data: null
      },
      pokemonModalActive: false,
      tableColumns: [
        {
          type: 'string',
          field: (r) => r.id,
          label: 'ID',
          width: '40'
        },
        {
          type: 'string',
          label: 'Name',
          field: (r) => r.name,
          width: '60'
        },
        {
          type: 'string',
          label: 'Number',
          field: (r) => r.number,
          width: '60'
        },
        {
          type: 'string',
          label: 'Classification',
          field: (r) => r.classification,
          width: '60'
        },
        {
          type: 'action',
          label: 'Actions',
          width: '5',
          actions: [
            {
              callback: (rowData) => {
                this.editPokemon(rowData)
              },
              icon: 'pencil'
            },
            {
              callback: (rowData) => {
                this.deletePokemon(rowData)
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
      return this.pokemonForm.data !== null
        ? `Edit pokemon`
        : 'Create new pokemon'
    }
  },
  methods: {
    getPokemons() {
      return new Promise(async (resolve, reject) => {
        try {
          const pokemons = await this.$v.pokemon.getPokemons()
          resolve({
            data: pokemons,
            total: pokemons.length
          })
        } catch (e) {
          reject(e)
        }
      })
    },
    editPokemon(data = null) {
      if (data !== null) {
        this.pokemonForm.data = Object.assign({}, data)
      } else {
        this.pokemonForm.data = {
          id: null,
          name: null,
          number: null,
          classification: null
        }
      }
      this.pokemonModalActive = true
    },

    getMe() {
      this.$v.auth.me()
    },
    savePokemon() {
      try {
        console.log(this.pokemonForm.data)
        this.$v.notification.success(
          `Pokemon #${this.pokemonForm.data.id || ''} saved. Look to console :)`
        )
      } catch (e) {
        this.$v.notification.error('Could not update pokemon')
      }
      this.closePokemonForm()
    },
    deletePokemon({ id }) {
      try {
        this.$v.dialog.delete(
          `Do you really want to delete pokemon #${id}?`,
          () => {
            this.$v.notification.success(`Pokemon ${id} deleted`)
          }
        )
      } catch (e) {
        this.$v.notification.error('Could not delete pokemon')
      }
    },
    closePokemonForm() {
      this.pokemonModalActive = false
      this.pokemonForm.data = null
      this.pokemonForm.isLoading = false
    }
  }
}
</script>
