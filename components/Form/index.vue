<template>
  <div>
    <FormField
      v-for="(field, index) in fields"
      :key="`field.${index}`"
      :v-model="field.data"
      :label="field.label"
      :type="field.type"
      :validator="field.validator || null"
      @updated="(v) => (model[index] = v)"
      @validated="(e) => updatedField(field, e)"
    />
    <hr v-if="actions" />
    <FormAction
      v-for="(action, index) in actions"
      :key="index"
      :label="action.label"
      :type="action.type"
      :click-action="action.onclick"
      :is-form-valid="isValid"
    />
  </div>
</template>

<script>
import FormField from './FormField'
import FormAction from './FormAction'

export default {
  name: 'Form',
  components: { FormField, FormAction },
  props: {
    model: {
      type: Object,
      default: () => {}
    },
    fields: {
      type: Object,
      default: () => {}
    },
    actions: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      errors: {},
      data: {},
      isValid: false
    }
  },
  created() {
    Object.keys(this.fields).forEach((key) => {
      this.$set(this.fields[key], 'isValid', false)
    })
  },
  methods: {
    updatedField(field, error) {
      field.isValid = !error

      let isValid = true
      Object.keys(this.fields).forEach((key) => {
        if (!this.fields[key].isValid) {
          isValid = false
        }
      })
      this.isValid = isValid
    }
  }
}
</script>
