<template>
  <div>
    <ul class="sidenav sidenav-fixed a-sidenav">
      <h4>Newborn</h4>
      <li
        v-for="(link, index) in links"
        :key="index"
        :class="{ active: isActiveLink(link.path) }"
      >
        <router-link 
          :to="link.path"
          class="waves-effect waves-orange bold"
          exact
          >
            {{ link.name }}
        </router-link>
      </li>
      <li @click="onLogOut">
        <a class="waves-effect waves-orange bold last">Log out</a>
      </li>
    </ul>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      links: [
        {
          name: 'Overview',
          path: '/overview'
        },
        {
          name: 'Analytics',
          path: '/analytics'
        },
        {
          name: 'History',
          path: '/history'
        },
        {
          name: 'Add order',
          path: '/order'
        },
        {
          name: 'Assortment',
          path: '/categories'
        },
      ]
    }
  },

  methods: {
    ...mapActions([
      'logout'
    ]),
    onLogOut () {
      this.logout().then(() => this.$router.push('/login'))
    },
    isActiveLink (path) {
      return this.$route.path === path
    }
  }
}
</script>

<style>
</style>

