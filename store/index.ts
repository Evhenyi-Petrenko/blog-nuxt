import { auth } from "~/plugins/firebase";
import { db } from "~/plugins/firebase";
import { ActionTree } from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";

export interface Post {
  title: string;
  summary: string;
  content: string;
  author: string;
  published: number;
  link: string;
}
export interface User {
  id: string;
  name: string;
  role: string;
}

interface State {
  posts: Post[];
  status: string;
  users: object | null;
  user: object | null;
}

export const state = (): State => {
  return {
    posts: [],
    status: "",
    users: null,
    user: {}
  };
};

export const mutations = {
  ...vuexfireMutations,
  setPosts(state: State, posts: Post[]) {
    state.posts = posts;
  },
  setUsers(state: State, users: User[]) {
    state.users = users;
  },
  setUser(state: State, user: User[]) {
    state.user = user;
  }
};

export const actions: ActionTree<any, any> = {
  async nuxtServerInit({ commit }) {
    const postsData = await db
      .collection("posts")
      .orderBy("published", "desc")
      .get();
    const posts = postsData.docs.map(post => post.data());

    commit("setPosts", posts);
    const token = this.$cookies.get("session");
    // Тут проверяем токен на валидность
    // Отправляя его на наш сервер

    if (token) {
      const decodeToken = await auth.verifyIdToken(token);
      const user = (
        await db
          .collection("user")
          .doc(decodeToken.uid)
          .get()
      ).data();
      commit("setUser", user);
    }
    const userData = await db.collection("user").get();
    const users = userData.docs.map(users => users.data());

    commit("setUsers", users);
  },
  bindPosts: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef("posts", db.collection("posts"));
  })
};
