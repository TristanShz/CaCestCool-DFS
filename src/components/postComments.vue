<template>
  <div class="flex w-full text-lightgrey flex-col">
    <transition-group name="comment">
      <div class="flex w-full mr-5 items-center mb-8 relative"
           v-for="comment in $store.getters.getCurrentPost.comments"
           :key="comment._id"
           v-bind:class="{'justify-end': comment.user._id === $store.state.isLogged._id}"
      >
        <div class="flex flex-col items-center mr-6">
          <img v-if="comment.user.profilPicture"
               :src="require(`@/assets/userImages/${comment.user.profilPicture}`)"
               alt="" class="w-10 h-10 rounded-full mb-1.5 object-cover">
          <div v-else
               class="userImageDefault w-10 h-10 rounded-full text-2xl"
               v-bind:style="{ background: comment.user.defaultColor}"
          >
            {{ comment.user.fullName.charAt(0) }}
          </div>
          <p class="date mb-0.5">{{ new Date(comment.created_at).toLocaleTimeString() }}</p>
          <p class="time italic">{{ new Date(comment.created_at).toLocaleDateString() }}</p>
        </div>

        <div class="comment px-6 py-4 w-2/3"
             v-bind:class="[comment.user._id === $store.state.isLogged._id ? 'bg-blue text-white' : 'bg-commentgrey' ]"
        >
          <h1 class="text-xs font-bold mb-2">{{ comment.user.fullName }}</h1>
          <p class="text-xs">{{ comment.content }}</p>
        </div>
        <div class="absolute right-1 hover:scale-125 hover:cursor-pointer opacity-70 hover:opacity-100 mr-2 p-2"
             v-if="comment.user._id === $store.state.isLogged._id"
             @click="setOptionsOnComment(comment._id)"
        >
          <div class="w-1 h-1 mb-0.5 rounded-full bg-white"></div>
          <div class="w-1 h-1 mb-0.5 rounded-full bg-white"></div>
          <div class="w-1 h-1 rounded-full bg-white"></div>
        </div>
        <div class="deleteMenu w-32 h-12 bg-white absolute right-7 top-8 rounded-xl flex items-center"
             v-if="currentIdOptions === comment._id && optionOnComment"
        >
          <p class="text-red text-xs ml-2 hover:cursor-pointer hover:scale-110 active:scale-100"
             @click="deleteComment($store.getters.getCurrentPost._id, comment._id)"
          >Supprimer</p>
        </div>
      </div>
    </transition-group>

    <div class="w-full">
      <form class="w-full flex flex-col" @submit.prevent="addComment($store.getters.getCurrentPost._id)"
            @keyup.enter.prevent="addComment($store.getters.getCurrentPost._id)">
        <textarea placeholder="Ajouter un commentaire..."
                  class="w-full resize-none mb-4 bg-commentgrey rounded-3xl p-2 focus:outline-blue"
                  rows="4"
                  maxlength="280"
                  v-model="content"
        ></textarea>
        <button class="flex text-blue font-medium self-end active:scale-110 mb-10">
          envoyer
          <div class="rounded-full w-6 h-6 bg-blue flex justify-center items-center ml-1">
            <div class="w-2 h-2 border-t-2 border-r-2 border-white rotate-45 -translate-x-0.5"></div>
          </div>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "PostComments",
  data() {
    return {
      content: "",
      optionOnComment: false,
      currentIdOptions: "",
    }
  },
  methods: {
    addComment(postId) {
      if (this.content.length > 1) {
        const body = {
          user: this.$store.state.isLogged._id,
          content: this.content,
        };
        axios.post(`http://localhost:3000/post/${postId}`, body, this.$store.state.header)
            .then(() => {
              this.$store.dispatch("setPosts");
              this.content = "";
            })
            .catch(error => {
              console.log(error);
            })
      }
    },
    deleteComment(postId, commentId) {
      axios.delete(`http://localhost:3000/post/${postId}/${commentId}`, this.$store.state.header)
          .then(() => {
            this.$store.dispatch("setPosts");
          })
          .catch(error => {
            console.log(error);
          })
    },
    setOptionsOnComment(commentId) {
      this.currentIdOptions = commentId;
      this.optionOnComment = !this.optionOnComment;
    }
  }
}
</script>

<style scoped>
.date {
  font-size: 12px;
  line-height: 12.05px;
}

.time {
  font-size: 9px;
  line-height: 9.04px;
}

.comment {
  border-radius: 30px;
}

.deleteMenu {
  filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.1));
}

.comment-enter-active, .comment-leave-active {
  transition: all .2s;
}

.comment-enter, .comment-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.5);
}
</style>