<template>
  <div>
    <!-- navigation -->
    <nav
      class="navbar has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="container">
        <div class="navbar-start w-100">
          <div class="d-flex justify-content-between">
            <div class="nuxt-link">
              <nuxt-link
                active-class="is-active"
                to="/"
                class="navbar-item is-tab"
                exact
                >Home</nuxt-link
              >
              <nuxt-link
                active-class="is-active"
                to="/about"
                class="navbar-item is-tab"
                exact
                >About</nuxt-link
              >
              <nuxt-link
                active-class="is-active"
                to="/admin"
                class="navbar-item is-tab"
                exact
                v-if="this.$store.state.user.role === 'admin'"
                >Admin</nuxt-link
              >
              <nuxt-link
                active-class="is-active"
                to="/logpage"
                class="navbar-item is-tab"
                exact
                >Log Page</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- /navigation -->
    <Nuxt />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Login from "~/components/login.vue";
import Logout from "~/components/logout.vue";
import { User } from "@/store";
export default Vue.extend({
  data() {
    return {
      // posts: this.$store.state.posts,
    };
  },
  async mounted() {
    await this.$store.dispatch("bindPosts");
  },
  components: {
    Login,
    Logout
  },
  computed: {
    session(): string {
      return this.$cookies.get("session");
    },
    user(): User[] {
      console.log(this.$store.state.users);
      return this.$store.state.users;
    }
  }
});
</script>
<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.login,
.logout {
  display: inline-block;
}
</style>
