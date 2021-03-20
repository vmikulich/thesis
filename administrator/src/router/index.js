import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Category from '../components/Category.vue'
import CategoryForm from '../components/CategoryForm.vue'
import Login from '../components/Login.vue'
import Registration from '../components/Registration.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { 
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        layout: 'AuthLayout'
      }
    },
    { 
      path: '/signup',
      name: 'Registration',
      component: Registration,
      meta: {
        layout: 'AuthLayout'
      }
    },
    { 
      path: '/categories',
      name: 'Category',
      component: Category,
      meta: {
        requiresAuth: true
      }
    },
    { 
      path: '/categories/new',
      name: 'NewCategoryForm',
      component: CategoryForm,
      meta: {
        requiresAuth: true
      }
    },
    { 
      path: '/categories/:id',
      name: 'CategoryForm',
      component: CategoryForm,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next({ path: '/login', query: { accessDenied: true } })
  } else {
    next()
  }
})

export default router



