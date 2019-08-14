<template>
  <b-field
    :label="label"
    :type="fieldType"
    :message="showErrorMessage ? errorMessage : null"
  >
    <b-input
      v-model="currentValue"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      @input="updated"
    >
    </b-input>
  </b-field>
</template>

<script>
import fieldTypes from '../../enums/FormFieldTypeEnum'

export default {
  components: {},
  props: {
    value: {
      type: null,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: fieldTypes.TEXT,
      validator: (type) => fieldTypes.validate(type)
    },
    placeholder: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: true
    },
    validator: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      currentValue: '',
      errorMessage: null,
      showErrorMessage: false
    }
  },
  computed: {
    fieldType() {
      if (this.currentValue) {
        return this.errorMessage ? 'is-danger' : 'is-success'
      }
      return null
    }
  },
  created() {
    this.currentValue = this.value
    this.validate()
  },
  methods: {
    validate() {
      this.errorMessage = null
      if (this.validator) {
        try {
          this.validator(this.currentValue)
        } catch (e) {
          this.errorMessage = e.message
        }
      }

      this.$emit('validated', this.errorMessage)
    },

    updated() {
      this.validate()
      this.$emit('updated', this.currentValue)
      this.showErrorMessage = true
    }
  }
}
</script>
