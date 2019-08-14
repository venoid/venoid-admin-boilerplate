<template>
  <b-field
    :label="
      type === fieldTypes.CHECKBOX || type === fieldTypes.RADIO ? null : label
    "
    :type="fieldType"
    :message="showErrorMessage ? errorMessage : null"
  >
    <b-checkbox
      v-if="type === fieldTypes.CHECKBOX"
      v-model="currentValue"
      @input="updated"
    >
      {{ label }}
    </b-checkbox>

    <b-switch
      v-else-if="type === fieldTypes.RADIO"
      v-model="currentValue"
      @input="updated"
    >
      {{ label }}
    </b-switch>

    <b-select
      v-else-if="type === fieldTypes.SELECT"
      v-model="currentValue"
      placeholder="Select"
      :icon="icon"
      @input="updated"
    >
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option }}</option
      >
    </b-select>

    <b-input
      v-else
      v-model="currentValue"
      :type="type"
      :placeholder="placeholder"
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
    validator: {
      type: Function,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentValue: null,
      errorMessage: null,
      showErrorMessage: false,
      fieldTypes
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
