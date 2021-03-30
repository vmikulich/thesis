import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Category from '../components/Category.vue'
import CategoryForm from '../components/CategoryForm.vue'
import Login from '../components/Login.vue'
import Registration from '../components/Registration.vue'
import Order from '../components/Order/Order.vue'
import OrderCategories from '../components/Order/OrderCategories.vue'
import OrderPositions from '../components/Order/OrderPositions.vue'
import Analytics from '../components/Analytics.vue'
import History from '../components/History.vue'
import Overview from '../components/Overview.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { 
      path: '',
      component: DefaultLayout,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          redirect: '/categories'
        },
        { 
          path: 'categories',
          name: 'Category',
          component: Category
        },
        { 
          path: 'categories/new',
          name: 'NewCategoryForm',
          component: CategoryForm,
        },
        { 
          path: 'categories/:id',
          name: 'CategoryForm',
          component: CategoryForm,
          props: true
        },
        { 
          path: 'overview',
          name: 'Overview',
          component: Overview
        },
        { 
          path: 'analytics',
          name: 'Analytics',
          component: Analytics,
        },
        { 
          path: 'history',
          name: 'History',
          component: History
        },
        { 
          path: 'order',
          component: Order,
          children: [
            { 
              path: '',
              name: 'OrderCategories',
              component: OrderCategories
            },
            { 
              path: ':id',
              name: 'OrderPositions',
              component: OrderPositions
            }
          ]
        }
      ]
    },
    { 
      path: '',
      component: AuthLayout,
      children: [
        {
          path: '',
          redirect: '/login'
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'signup',
          name: 'Registration',
          component: Registration
        }
      ]
    }
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



