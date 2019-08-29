<template>
  <section class="section">
    <h2 class="title is-3 has-text-grey">
      "Just start <b-icon icon="rocket" size="is-large" />"
    </h2>
    <hr />
    <section class="paragraph">
      <h3 class="title is-4">General</h3>
      <p>
        In this boilerplate you will find just basic layout and some example of
        usage of our admin components. Everything is dummy. For fetching example
        data we're using
        <a href="https://graphql-pokemon.now.sh/">Pokemon Graphql API</a>.
      </p>
      <p>
        Everything is running on <a href="https://nuxtjs.org">NuxtJs</a>,
        <a href="https://buefy.org">Buefy</a> and GraphQl client
        <a href="https://github.com/nuxt-community/apollo-module">Apollo</a>.
      </p>
    </section>
    <section class="paragraph">
      <h3 class="title is-4">Auth</h3>
      <p>
        For enabling auth, you have to add isAuth middleware in
        <code>nuxt.config.js</code> and in
        <code>middleware/isAuth.js</code> write your logic for resolving token.
        Example is commented there.
      </p>
    </section>
    <section class="paragraph">
      <h3 class="title is-4">
        Style
      </h3>
      <p>
        Set your own theme and style in <code>theme.scss</code> and
        <code>variables.scss</code> in assets folder.
      </p>
    </section>
  </section>
</template>

<style scoped>
.paragraph {
  margin-bottom: 32px;
}
</style>
