<template>
  <div class="w-12 h-12 rounded-full bg-blue flex justify-center items-center text-white font-bold" @click="test">
    12
  </div>
</template>

<script>
export default {
  name: "newPostNotification",
  methods: {
    test() {
      const date = new Date(this.$store.state.isLogged.updated_at);
      const dateDeux = new Date(this.$store.getters.getCurrentPost.created_at);
      console.log(date.toJSON())
      console.log(dateDeux.toJSON())
      console.log(date < dateDeux)
    }
  }
}
</script>

<style scoped>

</style>