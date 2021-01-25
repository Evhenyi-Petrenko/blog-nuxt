import { defineModule } from "direct-vuex";
import { db } from "~/firebasee/index.ts";
import { ActionTree } from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";

export interface Post {
  title: string;
  summary: string;
  content: string;
  author: string;
  published: string;
  link: string;
}

interface State {
  posts: Post[];
  status: string;
  user: object;
  token: string;
}

export const state = (): State => {
  return {
    posts: [],
    status: "",
    user: {},
    token: ""
  };
};

export const mutations = {
  ...vuexfireMutations,
  setPosts(state: State, posts: Post[]) {
    state.posts = posts;
  }
};

export const actions: ActionTree<any, any> = {
  async nuxtServerInit({ commit }) {
    const postsData = await db.collection("posts").get();
    const posts = postsData.docs.map(post => post.data());
    commit("setPosts", posts);
  },
  bindPosts: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef("posts", db.collection("posts"));
  }),
  login({ commit }, user) {
    return new Promise((resolve, reject) => {});
  }
};
