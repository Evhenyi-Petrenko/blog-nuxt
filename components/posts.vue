<!-- ./components/Posts.vue -->
<template>
  <section class="main-content">
    <div class="container">
      <h1 class="title has-text-centered">
        Recent Posts
      </h1>
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
                  by <strong>{{ post.author }}</strong> \\
                  {{ parseDate(post.published) }}
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
import Vue from "vue";
import { Post } from "@/store";
import moment from "moment";
export default Vue.extend({
  data() {
    return {};
  },
  computed: {
    posts(): Post[] {
      return this.$store.state.posts;
    }
  },
  methods: {
    parseDate(date: any) {
      return moment(date).format("MM-DD-YYYY");
    }
  }
});
</script>
<style scoped>
.column {
  margin: 25px 0;
}
</style>
