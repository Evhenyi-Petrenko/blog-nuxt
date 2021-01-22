import { defineModule } from "direct-vuex";
import { db } from "~/firebasee/index.ts";

interface Post {
  title: string;
  summary: string;
  content: string;
  author: string;
  published: string;
}

export const state = () => {
  return {
    posts: [] as Post[]
  };
};

export const mutations = {
  setPosts(state: any, posts: Post[]) {
    state.posts = posts;
  }
};

export const actions = {
  async nuxtServerInit({ commit }) {
    const postsData = await db.collection("posts").get();
    const posts = postsData.docs.map(post => post.data());
    commit("setPosts", posts);
    console.log(posts);
  }
};
