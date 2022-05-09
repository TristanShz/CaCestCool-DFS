<template>
  <div id="wallContent" class="flex flex-col items-center w-2/5 px-20 overflow-y-scroll">
    <h1 class="text-titlegrey text-4xl mt-32 mb-5 self-start">Mon Mur</h1>
    <add-post></add-post>
    <div id="line" class="mt-5"></div>
    <div
        class="postpreview flex bg-white h-auto my-5 w-full hover:cursor-pointer hover:scale-105 transition-all"
        v-for="post in $route.path === '/home' ? $store.state.posts : $store.getters.getPostsOfUserLogged"
        :key="post._id"
    >
      <div class="flex pl-8 w-full" @click="$store.dispatch('setCurrentPost',post)">
        <img v-if="post.user.profilPicture" :src="require(`@/assets/userImages/${post.user.profilPicture}`)"
             alt="" class="w-16 h-16 rounded-full object-cover self-center mr-5">
        <div v-else
             class="userImageDefault w-16 h-16 rounded-full self-center text-4xl mr-5"
             v-bind:style="{ background: post.user.defaultColor}"
        >
          <p class="-translate-y-0.5">{{ post.user.fullName.charAt(0) }}</p>
        </div>

        <div class="flex flex-col mt-3 w-3/4">
          <div class="w-full flex justify-between">
            <h2 class="font-bold">{{ post.title }}</h2>
            <p class="text-blue font-medium"
               v-if="!post.readBy.includes($store.state.isLogged._id) && post.user._id !== $store.state.isLogged._id">
              New !</p>
          </div>
          <p class="leading-4 mt-1 text-lightgrey">{{ post.description.slice(0, 110) + "..." }}</p>
          <div class="flex justify-between my-4 text-lightgrey font-light">
            <span class="flex"><img class="mr-2" src="../assets/comment.svg" alt="">{{ post.comments.length }} comments</span>
            <span class="flex text-blue font-bold" v-if="post.likes.includes($store.state.isLogged._id)"
                  v-on:change="likeAnimation">
            {{ post.likes.length }}<img class="ml-0.5" src="../assets/blueThumb.svg">
          </span>
            <span class="flex" v-else>{{ post.likes.length }}<img class="ml-1" src="../assets/thumb.svg"></span>
          </div>
        </div>
        <div id="arrowRight"
             v-if="$store.getters.getCurrentPost === post || $store.getters.getEditPost === post"></div>
      </div>
      <router-link :to="{name: 'editPostPage', params: {id: post._id}}">
        <img src="../assets/edit.svg"
             class="w-8 h-8 absolute top-1 right-12 hover:cursor-pointer hover:scale-110 opacity-50 hover:opacity-100"
             v-if="post.user._id === $store.state.isLogged._id"
        >
      </router-link>
      <img src="../assets/delete.svg"
           class="w-8 h-8 absolute top-1 right-5 hover:cursor-pointer hover:scale-110 opacity-50 hover:opacity-100"
           v-if="post.user._id === $store.state.isLogged._id"
           @click="deletePost(post._id)"
      >
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import AddPost from "@/components/addPost";

export default {
  name: "PostPreview",
  components: {AddPost},
  methods: {
    deletePost(id) {
      axios.delete(`http://localhost:3000/post/${id}`, this.$store.state.header)
          .then(() => {
            this.$store.dispatch("setPosts");
            if (this.$store.state.currentPostId === id) {
              this.$store.dispatch("setCurrentPost", "");
            }
          })
          .catch(error => {
            console.log(error);
          })
    },
    likeAnimation() {
      console.log("like");
    }
  }
}
</script>

<style scoped>
.postpreview {
  border-radius: 30px;
  filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.1));
}

#wallContent h1 {
  font-family: 'Timmana', sans-serif;
}

#wallContent::-webkit-scrollbar {
  display: none;
}

#arrowRight {
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

#line {
  width: 100%;
  height: 0.2px;
  background-color: lightgray;
}

</style>