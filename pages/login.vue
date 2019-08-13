<template>
  <section class="login">
    <Modal :actions="loginActions" :close-button="false">
      <b-field label="Email">
        <b-input type="email" placeholder="Your email" required> </b-input>
      </b-field>

      <b-field label="Password">
        <b-input
          type="password"
          password-reveal
          placeholder="Your password"
          required
        >
        </b-input>
      </b-field>
      <hr />
      <b-field position="is-centered">
        <b-button type="is-primary" class="is-fullsize">Login</b-button>
      </b-field>
    </Modal>
  </section>
</template>

<script>
import Modal from '../components/Modal'

export default {
  layout: 'empty',
  components: {
    Modal
  },
  data() {
    return {
      loginActions: []
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
