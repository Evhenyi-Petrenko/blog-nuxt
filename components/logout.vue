<template>
  <div class="logout">
    <button class="btn btn-secondary" type="submit" @click="signOut()">
      Log Out
    </button>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { auth } from "~/plugins/firebase.ts";
export default Vue.extend({
  data() {
    return {};
  },
  methods: {
    async signOut() {
      const user = await auth.signOut();
      this.$cookies.removeAll();
    }
  },
  async mounted() {
    const user = await auth.signOut();
    this.$cookies.removeAll();
  }
});
</script>
