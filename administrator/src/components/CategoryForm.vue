<template>
  <div>
    <div class="page-title">
      <h4>
        <router-link to="/categories">Categories</router-link>
        <i class="material-icons">keyboard_arrow_right</i>
        {{isNew ? 'Add' : 'Create'}} category
      </h4>
      <span>
        <button 
          class="btn btn-small red"
          v-if="!isNew"
          @click="deleteCategory()"
        >
          <i class="material-icons">delete</i>
        </button>
      </span>
    </div>
    <div class="row">
      <form class="col s12 l6" @submit.prevent="onSubmit()">
        <div class="input-field">
          <input 
            id="name" 
            type="text" 
            @blur="$v.currName.$touch()"
            v-model="currName"
          >
          <label for="name">Name</label>
        </div>
        <div>
          <input 
            type="file"
            class="dn"
            ref="input"
            @change="onFileUpload($event)"
          >
          <button 
            type="button"
            class="waves-effect waves-light btn orange lighten-2 mb2"
            @click="triggerClick()"
          >
            <i class="material-icons left">backup</i>
            Upload image
          </button>
        </div>
        <div>
          <button 
            type="submit"
            class="`waves-effect waves-light btn `"
            :disabled="$v.$invalid"
          >
            Save changes
          </button>
        </div>
      </form>
      <div class="col s12 l4 center">
        <img 
          class="responsive-img h200" 
          :src="imagePreview"
          v-if="imagePreview && id !== null"
        >
        <img 
          class="responsive-img h200" 
          :src="imagePreview"
          v-if="imagePreview && id === null"
        >
      </div>
    </div>
    <Position
      v-if="id !== null"
      :categoryId="id"
    />
  </div>
</template>


<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import Position from './Position'
import { required } from 'vuelidate/lib/validators'
import material from '../Materialize/material.js'

export default {
  name: 'CategoryForm',

  data() {
    return {
      id: null,
      isNew: true,
      image: null,
      imagePreview: '',
      currName: '',
    }
  },
  components: { Position },

  validations: {
    currName: {
      required
    }
  },

  created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.isNew = false
    }
  },

  beforeDestroy (){
    this.setCategoryById(null)
  },

  mounted() {
    if (this.$route.params.id) {
      setTimeout(() => {
        material.updateTextFields()
      }, 500)
      this.getCategoryById(this.id).then(() => {
        this.currName = this.currentCategory.name
        if (this.currentCategory.imageSrc) {
          this.imagePreview = 'http://localhost:5000/' + this.currentCategory.imageSrc
        }
      }).catch((e) => {
        if (e === 'Unauthorized') {
          this.logout().then(() => this.$router.push('/login'))
        }
      })
    }
  },

  computed: {
    ...mapGetters([
      'currentCategory'
    ])
  },

  methods: {
    ...mapActions([
      'getCategoryById',
      'createCategory',
      'updateCategory',
      'removeCategory'
    ]),
    ...mapMutations([
      'setCategoryById'
    ]),
    onSubmit() {
      const category = {
        name: this.currName,
        imageSrc: this.image,
        id: this.id
      }
      if (this.isNew) {
        this.createCategory(category).then(() => {
            this.$router.push('/categories')
            material.toast('Category has been created')
          })
      } else {
        this.updateCategory(category).then(() => material.toast('Changes has been saved'))
      }
    },
    triggerClick() {
      this.$refs.input.click()
    },
    onFileUpload(event) {
      const file = event.target.files[0]
      this.image = file
      const reader = new FileReader()
      reader.onload = () => {
        this.imagePreview = reader.result
      }
      reader.readAsDataURL(file)
    },
    deleteCategory() {
      const decision = window.confirm(`Are you sure you want to delete the category ${this.currName}`)
      if (decision) {
        this.removeCategory(this.id).then(() => this.$router.push('/categories'))
      }
    }
  }
}
</script>


<style>
  .dn {
    display: none;
  }
  .h200 {
    height: 200px;
  }
</style>
