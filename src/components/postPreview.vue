<template>
  <div id="wallContent" class="flex flex-col items-center w-2/5 px-20 overflow-scroll">
    <h1 class="text-titlegrey text-4xl mt-32 mb-5 self-start">Mon Mur</h1>
    <add-post></add-post>
    <div class="postpreview flex bg-white h-32 pl-8 my-5 w-full"
         v-for="post in $store.state.posts"
         :key="post._id"
         @click="$store.dispatch('setCurrentPost',post)"
    >
      <img v-if="post.image" src="../assets/userExample.jpg" alt="" class="w-16 h-16 rounded-full mr-5 self-center">
      <img v-else src="../assets/userdefault.png" alt="" class="w-16 h-16 rounded-full mr-5 self-center">
      <div class="flex flex-col mt-3 w-3/4">
        <h2 class="font-bold">{{ post.title }}</h2>
        <p class="leading-4 mt-1 text-lightgrey">{{ post.description }}</p>
        <div class="flex justify-between my-4 text-lightgrey font-light">
          <span class="flex"><img class="mr-2" src="../assets/comment.svg" alt="">{{ post.comments.length }} comments</span>
          <span class="flex">{{ post.likes.length }}<img class="ml-2" src="../assets/thumb.svg"></span>
        </div>
      </div>
      <div id="arrowRight" v-if="$store.state.currentPost === post"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AddPost from "@/components/addPost";

export default {
  name: "PostPreview",
  components: {AddPost},
  created() {
    const header = {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    }
    axios.get("http://localhost:3000/post",header)
        .then(response => {
          this.$store.dispatch("setPosts", response.data);
        })
  }
}
</script>

<style scoped>
  .postpreview{
    border-radius: 30px;
    filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.1));
  }
  #wallContent h1{
    font-family: 'Timmana', sans-serif;
  }
  #wallContent::-webkit-scrollbar{
    display: none;
  }
  #arrowRight{
    width: 16px;
    height: 16px;
    border-bottom: 2px solid black;
    border-right: 2px solid black;
    position: absolute;
    right: -40px;
    top: 50%;
    transform: translateY(-50%);
    transform: rotate(-45deg);
  }
</style>