<template>
  <div class="loginForms">
    <form @submit.prevent v-if="!reg">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit" @click="singin()">Sing IN</button>
      <button type="submit" @click="reg = true">Or Sing Up</button>
    </form>
    <form @submit.prevent v-if="reg">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit" @click="singup()">Sing UP</button>
      <button type="submit" @click="reg = false">Or Sing In</button>
    </form>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { auth } from "~/plugins/firebase.ts";

export default Vue.extend({
  data() {
    return {
      email: "",
      password: "",
      reg: false
    };
  },
  methods: {
    async singup() {
      const user = await auth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );
    },
    async singin() {
      const user = await auth.signInWithEmailAndPassword(
        this.email,
        this.password
      );
      const token = await auth.currentUser?.getIdToken();

      this.$cookies.set("session", token);
    }
  }
});
</script>
