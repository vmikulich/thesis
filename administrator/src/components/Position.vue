<template>
  <div>
    <div class="row" v-if="!loading">
      <div class="col s12">
        <div class="page-subtitle">
          <h4>Позиции:</h4>
          <button 
            class="waves-effect waves-light btn grey darken-1 btn-small"
            @click="onAddPosition()"
          >
              Добавить позицию
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
              <p><strong>Название:  </strong>{{position.name}}</p>
              <p><strong>Цена:  </strong>{{position.cost}}</p>
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
        <div v-else class="center">В категории нет позиций</div>
      </div>
    </div>
    <Loader v-if="loading"/>
    <form @submit.prevent="onSubmit()">
      <div class="modal" ref="modal">
        <div class="modal-content">
          <h4 class="mb1">{{positionId === null ? 'Добавить' : 'Редактировать'}} позицию</h4>
          <div class="input-field">
            <input 
              id="pos-name" 
              type="text"
              @blur="$v.name.$touch()"
              v-model="name" 
              required
            >
            <label for="pos-name">Название</label>
          </div>
          <div class="input-field">
            <input 
              id="pos-cost" 
              type="text" 
              v-model="cost" 
              @blur="$v.cost.$touch()"
              required
            >
            <label for="pos-cost">Цена</label>
          </div>
        </div>
      <div class="modal-footer">
          <button 
            type="button"
            class="modal-action waves-effect waves-black btn-flat"
            @click="onCancel()"
          >
              Отмена
          </button>
          <button 
            :disabled="$v.$invalid"
            type="submit"
            class="modal-action btn waves-effect"
          >Сохранить
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
import M from 'materialize-css/dist/js/materialize.js'

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

  mounted() {
    this.modal = this.initModal()
    // this.$store.dispatch('getPositions', this.categoryId)
    this.getPositions(this.categoryId)
  },

  beforeDestroy(){
    this.modal.destroy()
    // this.$store.commit('setCategoryPositions', [])
    this.setCategoryPositions([])
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
    },
    loading() {
      return this.loading
    }
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
    initModal() {
      return M.Modal.init(this.$refs.modal)
    },
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
        // this.$store.dispatch('updatePosition', position)
        this.updatePosition(position)
          .then(() => {
            // this.$store.dispatch('getPositions', this.categoryId)
            this.getPositions(this.categoryId)
            material.toast('Изменения сохранены')
            this.modal.close()
            this.resetForm()
          })
        // this.$store.dispatch('getPositions', this.categoryId)
        this.getPositions(this.categoryId)
      } else {
          // this.$store.dispatch('createPosition', position)
          this.createPosition(position)
            .then(() => {
              material.toast('Позиция создана')
              this.modal.close()
              this.resetForm()
            })
      }
    },
    onDeletePosition(event, position) {
      event.stopPropagation()
      const decision = window.confirm(`Вы уверены, что хотите удалить позицию ${position.name}`)
      if(decision) {
        // this.$store.dispatch('deletePosition', position)
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
