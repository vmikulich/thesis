<template>
  <div>
    <div class="row" v-if="!loading">
      <div class="col s12">
        <div class="page-subtitle">
          <h4>Positions:</h4>
          <button 
            class="waves-effect waves-light btn grey darken-1 btn-small"
            @click="onAddPosition()"
          >
              Add position
          </button>
        </div>
        <div class="collection" v-if="positions.length !== 0">
          <a 
              class="collection-item collection-item-icon" 
              v-for="position in positions"
              :key="position.id"
              @click="onSelectPosition(position)"
          >
            <div>
              <p><strong>Name:  </strong>{{position.name}}</p>
              <p><strong>Cost:  </strong>{{position.cost}}</p>
            </div>
            <span>
              <i 
                class="material-icons" 
                @click="onDeletePosition($event, position)"
              >
              delete
              </i>
            </span>
          </a>
        </div>
        <div v-else class="center">This category does not have any positions</div>
      </div>
    </div>
    <Loader v-if="loading"/>
    <form @submit.prevent="onSubmit()">
      <div class="modal" ref="modal">
        <div class="modal-content">
          <h4 class="mb1">{{positionId === null ? 'Add' : 'Edit'}} позицию</h4>
          <div class="input-field">
            <input 
              id="pos-name" 
              type="text"
              @blur="$v.name.$touch()"
              v-model="name" 
              required
            >
            <label for="pos-name">Name</label>
          </div>
          <div class="input-field">
            <input 
              id="pos-cost" 
              type="text" 
              v-model="cost" 
              @blur="$v.cost.$touch()"
              required
            >
            <label for="pos-cost">Cost</label>
          </div>
        </div>
        <div class="modal-footer">
          <button 
            type="button"
            class="modal-action waves-effect waves-black btn-flat"
            @click="onCancel()"
          >
              Cancel
          </button>
          <button 
            :disabled="$v.$invalid"
            type="submit"
            class="modal-action btn waves-effect"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import material from '../Materialize/material.js'
import Loader from './Loader'

export default {
  name: 'Position',

  components: { Loader },

  props: ['categoryId'],

  data() {
    return {
      modal: null,
      name: '',
      cost: '',
      positionId: null
    }
  },

  validations: {
    name: {
      required
    },
    cost: {
      required
    }
  },

  computed: {
    ...mapGetters([
      'categoryPositions',
      'loading'
    ]),
    positions() {
      return this.categoryPositions || []
    }
  },

  mounted () {
    this.modal = material.initModal(this.$refs.modal)
    this.getPositions(this.categoryId)
  },

  beforeDestroy () {
    this.modal.destroy()
    this.setCategoryPositions([])
  },

  methods: {
    ...mapActions([
      'getPositions',
      'updatePosition',
      'createPosition',
      'deletePosition'
    ]),
    ...mapMutations([
      'setCategoryPositions'
    ]),
    onSelectPosition(position) {
      setTimeout(() => {
        material.updateTextFields()
      }, 200)
      this.positionId = position._id
      this.name = position.name
      this.cost = position.cost
      this.modal.open()
    },
    onAddPosition() {
      this.positionId = null
      this.name = ''
      this.cost = ''
      this.modal.open()
    },
    onCancel() {
      this.modal.close()
    },
    onSubmit() {
      const position = {
        name: this.name,
        cost: this.cost,
        category: this.categoryId
      }
      if (this.positionId) {
        position._id = this.positionId
        this.updatePosition(position)
          .then(() => {
            this.getPositions(this.categoryId)
            material.toast('Changes saved')
            this.modal.close()
            this.resetForm()
          })
        this.getPositions(this.categoryId)
      } else {
          this.createPosition(position)
            .then(() => {
              material.toast('Position created')
              this.modal.close()
              this.resetForm()
            })
      }
    },
    onDeletePosition(event, position) {
      event.stopPropagation()
      const decision = window.confirm(`Are you sure you want to delete the position ${position.name}`)
      if(decision) {
        this.deletePosition(position)
      }
    },
    resetForm() {
        this.name = ''
        this.cost = ''
    },
    triggerClick() {
        this.$refs.input.click()
    }
  }
}
</script>

<style>
  .textarea {
    width: 500px;
  }
  .flex {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
</style>
