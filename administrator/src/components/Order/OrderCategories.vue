<template>
  <div>
    <div v-if="!loading">
      <div
        v-if="categoriesList.length !== 0"
        class="frow order-row"
      >
        <router-link
          v-for="category in categoriesList"
          :key="category.id"
          :to="`/order/${category._id}`"
          class="card waves-effect pointer"
        >
          <div class="center">
            <img
              v-if="category.imageSrc"
              :src="'http://localhost:5000/' + category.imageSrc"
              class="responsive-img order-img"
            >
          </div>
          <div class="card-content center p10">
            <h5 class="m0 black-text">{{ category.name }}</h5>
          </div>
        </router-link>
      </div>
      <div v-else class="center">You don't have any categories</div>
    </div>
    <Loader v-if="loading"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Loader from '../Loader'

export default {
  components: { Loader },

  computed: {
    ...mapGetters([
      'categories',
      'loading'
    ]),
    categoriesList () {
      return this.categories || []
    }
  },

  mounted () {
    this.getCategories().catch((e) => {
      if (e === 'Unauthorized') {
        this.logout().then(() => this.$router.push('/login'))
      }
    })
  },

  methods: {
    ...mapActions([
      'getCategories',
      'logout'
    ])
  }
}
</script>

<style lang="scss" scoped>
</style>