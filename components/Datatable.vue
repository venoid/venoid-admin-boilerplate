<template>
  <b-table :data="model.tableData" :hoverable="true" :loading="isLoading">
    <template slot-scope="props">
      <b-table-column
        v-for="(column, index) in model.tableColumns"
        :key="index"
        :field="column.field"
        :label="column.label"
        :width="column.width"
        :numeric="column.type === 'id' || column.type === 'number'"
      >
        <div v-if="column.type === 'action'" class="buttons">
          <!-- if action is just redirecting to somewhere -->
          <b-button
            v-if="column.options.href"
            tag="a"
            size="is-medium"
            :href="column.options.href"
            :target="column.options.target || '_blank'"
          >
            <b-icon
              :icon="column.options.icon || 'help-circle'"
              size="is-small"
            ></b-icon>
          </b-button>

          <!-- if action is some function -->
          <b-button
            v-else
            type="is-primary"
            size="is-small"
            outlined
            @click="column.options.callback(props.row)"
          >
            <b-icon
              :icon="column.options.icon || 'help-circle'"
              size="is-small"
            ></b-icon>
          </b-button>
        </div>
        {{ props.row[column.field] }}
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
    model: {
      type: Object,
      default() {
        return undefined
      }
    }
  },
  data() {
    return {
      isLoading: false
    }
  }
}
</script>
