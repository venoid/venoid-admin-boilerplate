<template>
  <section class="login">
    <Modal :close-button="false" header="Log In">
      <Form
        :model="credentials"
        :is-loading="isLoading"
        :fields="{
          username: {
            label: 'Username',
            placeholder: 'Enter username',
            type: 'text',
            validator: $validator.isUsername
          },
          password: {
            label: 'Password',
            placeholder: 'Enter password',
            type: 'password',
            validator: $validator.isPassword
          },
          remember: {
            label: 'Remember Me',
            type: 'checkbox'
          },
          agree: {
            label: 'Send newsletter?',
            type: 'radio'
          },
          fruit: {
            label: 'Which fruit?',
            placeholder: 'Select',
            type: 'select',
            options: ['orange', 'apple']
          }
        }"
        :actions="[
          {
            label: 'Submit',
            onclick: submit
          }
        ]"
      />
    </Modal>
  </section>
</template>

<script>
import Modal from '../components/Modal'
import Form from '../components/Form'

export default {
  layout: 'empty',
  components: {
    Modal,
    Form
  },
  data() {
    return {
      credentials: {
        username: '',
        password: '',
        remember: false,
        agree: false,
        fruit: null
      },
      isLoading: false
    }
  },
  methods: {
    submit() {
      this.$notification.info(`Logiing in ${this.credentials.username}`)
      this.isLoading = true
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  background: $color-primary
    url('https://i.annihil.us/u/prod/marvel/i/mg/9/a0/5b4fbd679a614/clean.jpg')
    center;
  background-size: cover;
  min-height: 100vh;
}
</style>
