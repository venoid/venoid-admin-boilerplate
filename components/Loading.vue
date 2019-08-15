<template>
  <b-loading :active.sync="isLoading" :is-full-page="false"></b-loading>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
