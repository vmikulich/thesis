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
      <li
        class="waves-effect waves-orange bold last"
        @click="onLogOut"
      >
        <a>Log out</a>
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
    }
  }
}
</script>

<style>
</style>

