<template>
  <b-navbar class="is-primary">
    <template slot="brand">
      <b-navbar-item href="/">
        <img
          src="~assets/venoid.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
      </b-navbar-item>
    </template>

    <template slot="start">
      <b-navbar-item href="#">
        Home
      </b-navbar-item>
      <b-navbar-item href="#">
        Documentation
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-button @click="logout">
            Log out
          </b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$v.auth.logout()
    }
  }
}
</script>
