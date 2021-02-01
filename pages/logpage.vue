<template>
  <div class="container">
    <div class="singForm mt-4 ">
      <login v-if="!session" />
      <logout v-else />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Login from "~/components/login.vue";
import Logout from "~/components/logout.vue";

export default Vue.extend({
  data() {
    return {};
  },
  async mounted() {},
  components: {
    Login,
    Logout
  },
  computed: {
    session(): string {
      return this.$cookies.get("session");
    }
  }
});
</script>
