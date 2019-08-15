<template>
  <div>
    <FormField
      v-for="(field, index) in fields"
      :key="`field.${index}`"
      :value="model[index]"
      :label="field.label"
      :placeholder="field.placeholder"
      :type="field.type"
      :icon="field.icon"
      :options="field.options"
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
    <b-loading :active.sync="isLoading"></b-loading>
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
    },
    isLoading: {
      type: Boolean,
      default: false
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
