import { defineModule } from "direct-vuex";
import { db } from "~/firebasee/index.ts";

interface Post {
  title: string;
  summary: string;
  content: string;
  author: string;
  published: string;
}
export const getPost = defineModule({
  state: () => {
    return {
      posts: [] as Post[]
    };
  },

  mutation: {
    setPosts(state: any, posts: Post[]) {
      state.posts = posts;
    }
  },

  actions: {
    async fetch({ commit, state }) {
      if (state.posts.length) {
        return state.posts;
      }
      const postsData = await db.collection("posts").get();
      const posts = postsData.docs.map(post => post.data());
      commit("setPosts", posts);
      return posts;
    },
    async nuxtServerInit({ state }) {
      state.posts = await state.dispatch("fetch");
    }
  }
});
