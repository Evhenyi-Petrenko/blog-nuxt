import { auth } from "~/plugins/firebase";
import { db } from "~/plugins/firebase";
import { ActionTree } from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import { createDirectStore } from "direct-vuex";

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
const {
  store,
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext
} = createDirectStore({
  actions: {
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
      try {
      } catch (err) {
        window.location.href = "http://localhost:3000/logpage";
      }
    },
    bindPosts: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef("posts", db.collection("posts"));
    })
  }
});

function initStore() {
  return store.original;
}

export const storeOriginal = store.original;
// Export the direct-store instead of the classic Vuex store.
export default initStore;

export {
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext,
  store
};
