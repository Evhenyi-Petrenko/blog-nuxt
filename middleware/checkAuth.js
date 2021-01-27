import { auth } from "~/plugins/firebase.ts";

export default function({ redirect }) {
  if (!auth) {
    redirect("/");
  }
}
