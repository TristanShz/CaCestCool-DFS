<template>
  <div id="postfull" class="w-2/5 bg-white h-full pt-12 px-16 overflow-y-scroll">
    <div class="flex justify-between mb-5">
      <div class="flex justify-center items-center rounded-full bg-grey h-8 text-white px-6">
        {{
          $store.getters.getCurrentPost.created_at ? new Date($store.getters.getCurrentPost.created_at).toLocaleDateString() :
              new Date($store.getters.getCurrentPost.createdAt).toLocaleDateString()
        }}
      </div>
      <div
          class="flex justify-center items-center rounded-full bg-blue h-8 font-bold text-white px-6 hover:cursor-pointer
          hover:scale-110 active:scale-100 transition-all"
          v-if="$store.getters.getCurrentPost.user._id !== $store.state.isLogged._id"
          v-bind:class="$store.getters.getCurrentPost.likes.includes($store.state.isLogged._id) ? 'bg-red' : 'bg-blue' "
          @click="likePost($store.getters.getCurrentPost._id)"
      >
        {{ $store.getters.getCurrentPost.likes.includes($store.state.isLogged._id) ? "Unlike" : "Like" }}
      </div>
    </div>
    <h1 class="font-bold text-xl">{{ $store.getters.getCurrentPost.title }}</h1>
    <p class="text-sm text-blue my-1">par {{ $store.getters.getCurrentPost.user.fullName }}</p>
    <p class="text-sm mb-3">
      {{ $store.getters.getCurrentPost.likes.length }}
      {{ $store.getters.getCurrentPost.likes.length > 1 ? "likes" : "like" }}
    </p>
    <div class="line mb-5"></div>
    <img v-if="$store.getters.getCurrentPost.image"
         class="my-5 w-full"
         :src="require(`@/assets/postImages/${$store.getters.getCurrentPost.image}`)"
         alt="Post image">
    <pre class="text-sm w-full overflow-ellipsis whitespace-pre-wrap">{{
        $store.getters.getCurrentPost.description
      }}</pre>
    <div class="line my-5"></div>
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

</style>