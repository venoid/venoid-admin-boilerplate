<template>
  <section class="login">
    <Modal :close-button="false" header="Log In">
      <Form
        :model="credentials"
        :fields="{
          username: {
            label: 'Username',
            type: 'text',
            validator: $validator.isUsername
          },
          password: {
            label: 'Password',
            type: 'password',
            validator: $validator.isPassword
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
        username: 'cccc',
        password: ''
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
