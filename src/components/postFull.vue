<template>
  <div id="postfull" class="w-2/5 bg-white h-full pt-12 px-16 overflow-scroll">
    <div class="flex justify-between mb-5">
      <div class="flex justify-center items-center rounded-full bg-grey h-8 text-white px-6">
        {{ new Date($store.state.currentPost.createdAt).toLocaleDateString() }}
      </div>
      <div class="flex justify-center items-center rounded-full bg-blue h-8 font-bold text-white px-6"> Commenter</div>
    </div>
    <h1 class="font-bold text-xl">{{ $store.state.currentPost.title }}</h1>
    <p class="text-sm text-blue my-1">par {{ $store.state.currentPost.user.fullName }}</p>
    <p class="text-sm mb-3">{{ $store.state.currentPost.likes.length }} likes</p>
    <div class="line"></div>
    <img class="my-10 w-full" :src="require(`@/assets/uploads/${$store.state.currentPost.image}`)" alt="">
    <p class="text-sm">{{ $store.state.currentPost.description }}</p>
    <div class="line my-8"></div>
    <post-comments></post-comments>
  </div>
</template>

<script>
import PostComments from "@/components/postComments";
export default {
  name: "PostFull",
  components: {PostComments},
}
</script>

<style scoped>
  .line{
    height: 0.1px;
    width: 100%;
    background-color: lightgray;
  }
  #postfull::-webkit-scrollbar{
    display: none;
  }
</style>