<template>
  <section class="login">
    <venoid-modal :active="true" :close-button="false" header="Log In">
      <venoid-form
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
    </venoid-modal>
  </section>
</template>

<script>
import venoidModal from '@venoid/admin-modal'
import venoidForm from '@venoid/admin-form'

export default {
  layout: 'empty',
  components: {
    venoidModal,
    venoidForm
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
      const { username, password } = this.credentials

      try {
        const { user } = await this.$v.auth.login(username, password)
        this.$v.notification.success(`Logged in as ${user.username}`)
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
