<template>
  <div id="postfull" class="w-2/5 bg-white h-full pt-12 px-16 overflow-scroll">
    <div class="flex justify-between mb-5">
      <div class="flex justify-center items-center rounded-full bg-grey h-8 text-white px-6">
        {{ new Date($store.getters.currentPost.createdAt).toLocaleDateString() }}
      </div>
      <div
          class="flex justify-center items-center rounded-full bg-blue h-8 font-bold text-white px-6 hover:cursor-pointer"
          v-if="$store.getters.currentPost.user._id !== $store.state.isLogged._id"
          @click="likePost($store.getters.currentPost._id)"
      >
        {{ $store.getters.currentPost.likes.includes($store.state.isLogged._id) ? "Unlike" : "Like" }}
      </div>
    </div>
    <h1 class="font-bold text-xl">{{ $store.getters.currentPost.title }}</h1>
    <p class="text-sm text-blue my-1">par {{ $store.getters.currentPost.user.fullName }}</p>
    <p class="text-sm mb-3">
      {{ $store.getters.currentPost.likes.length }}
      {{ $store.getters.currentPost.likes.length > 1 ? "likes" : "like" }}
    </p>
    <div class="line"></div>
    <img v-if="$store.getters.currentPost.image"
         class="my-10 w-full"
         :src="require(`@/assets/postImages/${$store.getters.currentPost.image}`)"
         alt="Post image">
    <pre class="text-sm w-full overflow-ellipsis whitespace-pre-wrap">{{ $store.getters.currentPost.description }}</pre>
    <div class="line my-8"></div>
    <post-comments></post-comments>
  </div>
</template>

<script>
import PostComments from "@/components/postComments";
import axios from "axios";

export default {
  name: "PostFull",
  components: {PostComments},
  methods: {
    likePost(id) {
      axios.post(`http://localhost:3000/post/like/${id}`, {id: this.$store.state.isLogged._id}, this.$store.state.header)
          .then(() => {
            this.$store.dispatch("setPosts");
          })
          .catch(error => {
            console.log(error);
          })
    }
  }
}
</script>

<style scoped>
.line {
  height: 0.1px;
  width: 100%;
  background-color: lightgray;
}

#postfull::-webkit-scrollbar {
  display: none;
}
</style>