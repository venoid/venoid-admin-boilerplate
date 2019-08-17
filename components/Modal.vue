<template>
  <b-modal
    :active="active"
    :width="400"
    :can-cancel="closeButton"
    @close="close"
  >
    <div class="card">
      <header class="card-header">
        <div class="card-header-title is-size-4">
          {{ header }}
        </div>
      </header>
      <div class="card-content">
        <slot>
          Content here
        </slot>
      </div>
      <footer v-if="actions" class="card-footer">
        <div
          v-for="(action, index) in actions"
          :key="index"
          class="card-footer-item"
        >
          <b-button type="is-primary" @click="action.onclick">{{
            action.label
          }}</b-button>
        </div>
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    header: {
      type: String,
      default: 'Modal name'
    },
    closeButton: {
      type: Boolean,
      default: true
    },
    actions: {
      type: Array,
      default() {
        return []
      }
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.card-footer-item {
  justify-content: flex-end;
}
</style>
