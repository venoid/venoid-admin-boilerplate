<template>
  <b-field
    :label="type === 'checkbox' || type === 'switch' ? null : label"
    :type="fieldType"
    :message="showErrorMessage ? errorMessage : null"
  >
    <b-checkbox
      v-if="type === 'checkbox'"
      v-model="currentValue"
      @input="updated"
    >
      {{ label }}
    </b-checkbox>

    <b-switch
      v-else-if="type === 'switch'"
      v-model="currentValue"
      @input="updated"
    >
      {{ label }}
    </b-switch>

    <b-select
      v-else-if="type === 'select'"
      v-model="currentValue"
      :placeholder="placeholder"
      :icon="icon"
      expanded
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
      default: 'text',
      validator: (type) =>
        ['text', 'password', 'email', 'checkbox', 'select', 'switch'].includes(
          type
        )
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
