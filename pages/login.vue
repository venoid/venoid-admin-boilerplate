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
            validator: $v.validator.isUsername
          },
          password: {
            label: 'Password',
            placeholder: 'Enter password',
            type: 'password',
            validator: $v.validator.isPassword
          },
          remember: {
            label: 'Remember Me',
            type: 'checkbox'
          },
          agree: {
            label: 'Send newsletter?',
            type: 'switch'
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
    async submit() {
      this.isLoading = true
      const { username } = this.credentials

      try {
        const login = await this.$v.auth.login(username)
        this.$v.notification.success(`Logged in as ${login.username}`)
        this.$router.push({ name: 'index' })
      } catch (e) {
        this.$v.notification.error(e.message)
      }

      this.isLoading = false
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
