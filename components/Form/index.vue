<template>
  <form>
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
      @validated="(e) => updatedField(index, e)"
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
    <Loading :is-loading="isLoading" />
  </form>
</template>

<script>
import Loading from '../Loading'
import FormField from './FormField'
import FormAction from './FormAction'

export default {
  name: 'Form',
  components: { FormField, FormAction, Loading },
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
      data: {}
    }
  },
  computed: {
    isValid() {
      for (const key in this.errors) {
        if (this.errors[key] || this.errors[key] === null) {
          return false
        }
      }

      return true
    }
  },
  created() {
    Object.keys(this.fields).forEach((key) => {
      this.$set(this.errors, key, null)
    })
  },
  methods: {
    updatedField(fieldKey, error) {
      this.errors[fieldKey] = error
    }
  }
}
</script>
