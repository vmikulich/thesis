<template>
  <div>
    <head>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    </head>
    <component :is="layout">
      <router-view/>
      
    </component>
  </div>
</template>

<script>

export default {
  name: 'app',

  computed: {
    layout() {
      return this.$route.meta.layout || 'DefaultLayout'
    }
  }
}
</script>

<style>
</style>

