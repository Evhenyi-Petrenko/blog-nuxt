<template>
  <div class="container">
    <h1 class="text-center">Admin Page</h1>
    <div class="d-flex justify-content-center">
      <form @action.prevent>
        <input v-model="title" placeholder="Title" />
        <input v-model="summary" placeholder="Summary" />
        <textarea v-model="content" placeholder="Content"></textarea>
        <input v-model="author" placeholder="Author" />
        <input v-model="published" placeholder="Published" />
        <button class="btn btn-primary" @click="addPost()">Add Post</button>
      </form>
    </div>
  </div>
</template>
<style scoped>
input,
textarea {
  width: 400px;
  display: block;
  margin: 10px 0;
  height: 30px;
  min-height: 30px;
}
</style>
<script lang="ts">
import { db } from "~/plugins/firebase.ts";
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      title: "",
      summary: "",
      content: "",
      author: "",
      published: ""
    };
  },
  computed: {},
  methods: {
    addPost() {
      const title = this.title;
      let newPost = {
        title,
        summary: this.summary,
        content: this.content,
        author: this.author,
        published: this.published,
        link: title.toLowerCase().replace(/\W+(?!$)/g, "-")
      };
      const id = db.collection("posts").doc().id;
      db.collection("posts")
        .doc(id)
        .set(newPost);
    }
  }
});
</script>
