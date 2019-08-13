<template>
  <div>
    <Navbar />

    <section class="main-content columns">
      <aside class="column is-2 section sidebar">
        <Sidebar />
      </aside>

      <div class="container column is-10">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default {
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style lang="scss">
.sidebar {
  border-right: 1px solid $color-primary-light;
  min-height: calc(100vh - 2.5rem);
}
</style>
