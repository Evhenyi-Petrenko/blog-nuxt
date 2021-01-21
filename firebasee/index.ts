import firebase from "firebase";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyC437ajrA-S9QJ2UkOeMOZV34AHndIYWSw",
    authDomain: "blog-nuxt-3e392.firebaseapp.com",
    projectId: "blog-nuxt-3e392",
    storageBucket: "blog-nuxt-3e392.appspot.com",
    messagingSenderId: "131955789621",
    appId: "1:131955789621:web:914c7e3251122da7e9067c"
  });
} else {
  firebase.app();
}

export const db = firebase.firestore();

interface Post {
  id: number;
  title: string;
  summary: string;
  content: string;
  author: string;
  published: string;
}

// async function getPosts() {
//   const posts = await db.collection("posts").get();

//   // const postsData = posts.docs.map(post => post.data() as Post);

//   // postsData.map(post => {});

//   const post = (
//     await db
//       .collection("posts")
//       .doc("124124")
//       .get()
//   ).data() as Post;
//   return post;
// }
// getPosts();
// db.collection("posts").add({ title: "asf" });
