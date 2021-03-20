<template>
  <div>
    <ul class="sidenav sidenav-fixed a-sidenav">
      <h4>Newborn</h4>
      <li
        v-for="(link, index) in links"
        :key="index"
      >
        <router-link 
          exact
          active-class="active"
          :to="link.path"
          class="waves-effect waves-orange bold"
          >
            {{ link.name }}
        </router-link>
      </li>
    </ul>
    <main class="content">
      <slot />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          name: 'Ассортимент',
          path: '/categories'
        },
      ]
    }
  }
}
</script>

<style>
</style>

