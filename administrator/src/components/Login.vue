<template>
  <form
    class="card"
    @submit.prevent="onSubmit"
  >
    <div class="card-content">
      <span class="card-title">Log in to Newborn</span>
      <div class="input-field">
        <input
          id="email"
          type="email"
          v-model="form.email"
          @blur="$v.form.email.$touch()"
          :class="{ 'invalid': emailError }"
        >
        <label for="email">Email:</label>
        <span
          v-if="emailError"
          class="helper-text red-text"
        >
          {{ emailError }}
        </span>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model="form.password"
          @blur="$v.form.password.$touch()"
          :class="{ 'invalid': passwordError }"
        >
        <label for="password">Password:</label>
        <span
          v-if="passwordError"
          class="helper-text red-text"
        >
          {{ passwordError }}
        </span>
      </div>
    </div>
    <div class="card-action">
      <button
        type="submit"
        class="modal-action btn waves-effect"
        :disabled="$v.$invalid || disabled"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import material from '../Materialize/material.js'

export default {
  name: 'Login',

  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      disabled: false
    }
  },

  validations: {
    form: {
      email: {
        email,
        required
      },
      password: {
        required
      }
    }
  },

  computed: {
    passwordError () {
      if (this.$v.form.password.$dirty) {
        if (!this.$v.form.password.required) {
          return 'Password is required.'
        }
      }
      return ''
    },
    emailError () {
      if (this.$v.form.email.$dirty) {
        if (!this.$v.form.email.required) {
          return 'Email is required.'
        }
        if (!this.$v.form.email.email) {
          return 'Invalide email.'
        }
      }
      return ''
    },
  },

  mounted () {
    if (this.$route.query.registered) {
      material.toast('Now you can log in to system.')
    } else if (this.$route.query.accessDenied) {
      material.toast('First, log in to the system.', 'error')
    }
  },

  methods: {
    ...mapActions([
      'login'
    ]),
    onSubmit () {
      this.disabled = true
      this.login(this.form).then(() => {
        this.$router.push('/categories')
      }).catch((e) => {
        material.toast(e.message, e)
      }).finally(() => {
        this.disabled = false
      })
    }
  }
}
</script>

<style>
</style>
