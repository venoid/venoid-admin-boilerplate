<template>
  <b-button
    :type="type"
    :disabled="!isFormValid"
    @click.prevent="clickAction"
    >{{ label }}</b-button
  >
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    clickAction: {
      type: Function,
      default: null
    },
    type: {
      type: String,
      default: 'is-primary',
      validator: (type) =>
        ['is-primary', 'is-danger', 'is-secondary'].includes(type)
    },
    isFormValid: {
      type: Boolean,
      default: true
    }
  }
}
</script>
