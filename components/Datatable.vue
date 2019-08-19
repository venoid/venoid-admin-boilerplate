<template>
  <b-table :data="tableData" :hoverable="true" :loading="isLoading">
    <template slot-scope="props">
      <b-table-column
        v-for="(column, index) in tableColumns"
        :key="index"
        :label="column.label"
        :width="column.width"
        :numeric="column.type === 'id' || column.type === 'number'"
      >
        <div v-if="column.type === 'action'" class="buttons">
          <b-button
            v-for="(action, i) in column.actions"
            :key="`button.${i}`"
            type="is-primary"
            size="is-small"
            outlined
            @click="action.callback(props.row)"
          >
            <b-icon
              :icon="action.icon || 'help-circle'"
              size="is-small"
            ></b-icon>
          </b-button>
        </div>
        <div v-else>
          {{ column.field(props.row) }}
        </div>
      </b-table-column>
    </template>

    <template slot="empty">
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon icon="emoticon-sad" size="is-large"> </b-icon>
          </p>
          <p>Nothing here.</p>
        </div>
      </section>
    </template>
  </b-table>
</template>

<script>
export default {
  components: {},
  props: {
    tableColumns: {
      type: Array,
      default() {
        return undefined
      }
    },
    tableData: {
      type: Array,
      default() {
        return undefined
      }
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
