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
  user: object | null;
}

export const state = (): State => {
  return {
    posts: [],
    status: "",
    user: null
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

    const token = this.$cookies.get("session");

    // Тут проверяем токен на валидность
    // Отправляя его на наш сервер

    if (token) {
    }
  },
  bindPosts: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef("posts", db.collection("posts"));
  })
};
