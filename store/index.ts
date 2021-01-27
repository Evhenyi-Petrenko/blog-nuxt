import { defineModule } from "direct-vuex";
import { db } from "~/plugins/firebase";
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
export interface User {
  admin: boolean;
  name: string;
}

interface State {
  posts: Post[];
  status: string;
  users: object | null;
}

export const state = (): State => {
  return {
    posts: [],
    status: "",
    users: null
  };
};

export const mutations = {
  ...vuexfireMutations,
  setPosts(state: State, posts: Post[]) {
    state.posts = posts;
  },
  setUsers(state: State, users: User[]) {
    state.users = users;
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

    const userData = await db.collection("user").get();

    const users = userData.docs.map(users => users.data());

    commit("setUsers", users);
  },
  bindPosts: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef("posts", db.collection("posts"));
  })
};
