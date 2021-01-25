<!-- ./components/Posts.vue -->
<template>
  <section class="main-content">
    <div class="container">
      <h1 class="title has-text-centered">
        Recent Posts.
      </h1>
      <div>
        <h3 @click="addPost()">Add Post</h3>
      </div>
      <div class="columns">
        <div class="column" v-for="post in posts" :key="post.link">
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
              <nuxt-link :to="`/post/${post.link}`" class="card-footer-item">
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
import { Post } from "@/store";

export default Vue.extend({
  // async fetch({ store }) {
  //   const posts = await store.dispatch("fetch");
  //   this.posts = posts;
  // },
  data() {
    return {
      // posts: this.$store.state.posts,
    };
  },
  computed: {
    posts(): Post[] {
      return this.$store.state.posts;
    }
  },
  methods: {
    addPost() {
      const title = faker.name.title();
      let newPost = {
        title,
        summary: faker.random.words(),
        content: faker.lorem.text(),
        author: faker.internet.email(),
        published: faker.date.month(),
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
<style scoped>
.column {
  margin: 25px 0;
}
</style>
