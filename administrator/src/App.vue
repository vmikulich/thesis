<template>
  <div>
    <head>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    </head>
    <ul class="sidenav sidenav-fixed a-sidenav">
      <h4>Newborn</h4>
      <router-link 
        tag="li" 
        exact v-for="link in links" 
        class="bold" 
        active-class="active" 
        :to="link.path"
        :key="link.id"
        >
        <a class="waves-effect waves-orange">{{ link.name }}</a>
      </router-link>
    </ul>
    <main class="content">
      <router-view/>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      links: [
        {
          name: 'Ассортимент',
          path: '/categories'
        },
      ]
    }
  },
}
</script>

<style src="materialize-css/dist/css/materialize.min.css">
</style>

