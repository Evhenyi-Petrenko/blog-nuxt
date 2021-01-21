<!-- ./components/Posts.vue -->
<template>
  <section class="main-content">
    <div class="container">
      <h1 class="title has-text-centered">
        Recent Posts.
      </h1>
      <div v-if="!postForm">
        <h3 @click="postForm = true">Add Post</h3>
      </div>
      <div v-else class="postPopup">
        <h3 @click="postForm = false">Close Form</h3>
        <div @click="addPost()">Push post</div>
      </div>
      <div class="columns">
        <div class="column" v-for="post in posts" :key="post.id">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                {{ post.title }}
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                {{ post.summary }}
                <br />
                <small>
                  by <strong>{{ post.author }}</strong> \\ {{ post.published }}
                </small>
              </div>
            </div>
            <footer class="card-footer">
              <nuxt-link
                :to="`/post/${post.title.toLowerCase().replace(/ /g, '-')}`"
                class="card-footer-item"
              >
                Read More
              </nuxt-link>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { db } from "~/firebasee/index.ts";
import Vue from "vue";
import faker from "faker";

export default Vue.extend({
  data() {
    return {
      posts: [],
      postForm: false
    };
  },
  methods: {
    pushPost() {
      base.forEach(el => db.collection("posts").add(el));
    },
    addPost() {
      let newPost = {
        title: faker.name.title(),
        summary: faker.random.words(),
        content: faker.lorem.text(),
        author: faker.internet.email(),
        published: faker.date.month()
      };

      const id = db.collection("posts").doc().id;
      db.collection("posts")
        .doc(id)
        .set(newPost);
      this.getPost();
    },
    async getPost() {
      const postsDB = await db.collection("posts").get();
      this.posts = postsDB.docs.map(post => post.data());
    }
  },
  mounted() {
    this.getPost();
  }
});
</script>
<style scoped>
.column {
  margin: 25px 0;
}
</style>
