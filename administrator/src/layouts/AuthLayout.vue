<template>
  <div>
    <nav>
      <div class="nav-wrapper grey darken-1">
        <router-link
          to="/"
          class="brand-logo"
        >
          Newborn
        </router-link>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <router-link
              to="/login"
              exact-active-class="active"
              active-class="active"
            >
              Log in
            </router-link>
          </li>
          <li>
            <router-link
              to="/signup"
              exact-active-class="active"
              active-class="active"
            >
              Sign up
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="auth-block">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
</style>

