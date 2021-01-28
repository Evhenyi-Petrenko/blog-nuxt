export default function({ redirect }) {
  if (this.$store.state.user.role !== "admin") {
    redirect("/");
  }
}
