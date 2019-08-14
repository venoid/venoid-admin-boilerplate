<template>
  <b-button
    :type="type"
    :disabled="!isFormValid"
    @click.prevent="clickAction"
    >{{ label }}</b-button
  >
</template>

<script>
import actionTypes from '../../enums/FormActionTypeEnum'

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
      default: actionTypes.PRIMARY
    },
    isFormValid: {
      type: Boolean,
      default: true
    }
  }
}
</script>
