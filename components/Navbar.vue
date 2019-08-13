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
          <a class="button is-secondary">
            <strong>Sign up</strong>
          </a>
          <b-button :to="{ name: 'login' }" tag="nuxt-link">
            Log in
          </b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {}
</script>
