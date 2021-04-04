<template>
  <div class="categories">
    <div class="page-title">
    <h4>Category</h4>
      <router-link to="/categories/new">
        <button class="waves-effect waves-light btn grey darken-1">Add category</button>
      </router-link>
    </div>
    <div class="row" v-if="!loading">
      <div class="col s12">
        <div class="collection" v-if="categoriesList.length !== 0">
          <router-link 
            :to="{ name: 'CategoryForm', params: { id: category._id } }" 
            v-for="category in categoriesList" 
            :key="category.id"
            class="collection-item"
            >
            {{ category.name }}
          </router-link >
        </div>
        <div v-else class="center">You don't have any categories</div>
      </div>
    </div>
    <Loader v-if="loading"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Loader from './Loader'

export default {
  name: 'Category',

  components: { Loader },

  mounted() {
    this.getCategories().catch((e) => {
      if (e === 'Unauthorized') {
        this.logout().then(() => this.$router.push('/login'))
      }
    })
  },

  computed: {
    ...mapGetters ([
      'categories',
      'loading'
    ]),
    categoriesList () {
      return this.categories || []
    }
  },

  methods: {
    ...mapActions ([
      'getCategories',
      'logout'
    ])
  }
}
</script>

<style>
</style>
