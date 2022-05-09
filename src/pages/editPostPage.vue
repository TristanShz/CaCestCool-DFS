<template>
  <div class="w-full h-full flex">
    <side-menu></side-menu>

    <div id="editPost" class="flex flex-col w-full px-20 overflow-y-scroll">
      <form class="w-2/5" @submit.prevent="updatePost">
        <h1 class="text-titlegrey text-4xl mt-32 mb-10 self-start">Modifier mon post</h1>
        <input type="text" name="title" id="title"
               :value="post.title"
               maxlength="50"
               class="focus:outline-none bg-commentgrey rounded-xl p-2 font-bold w-2/3">
        <p class="text-sm text-blue my-1">par {{ post.user.fullName }}</p>
        <p class="text-sm mb-3">{{ post.likes.length }} likes</p>
        <div class="line mb-10"></div>
        <div class="relative">
          <img v-if="baseImgPreview" src="../assets/close.png" alt=""
               class="w-10 h-10 absolute z-10 top-2 left-2 hover:scale-110 hover:cursor-pointer"
               @click="removeImage"
          >
          <img v-if="baseImgPreview"
               id="baseImgPreview"
               class="mb-10 w-full z-0"
               :src="require(`@/assets/postImages/${post.image}`)"
               alt="Post image"
          >
        </div>
        <div class="relative">
          <img v-if="imgPreview" src="../assets/close.png" alt=""
               class="w-10 h-10 absolute z-10 top-2 left-2 hover:scale-110 hover:cursor-pointer"
               @click="removeImage"
          >
          <img
              id="imgPreview"
              class="mb-10 w-full z-0 hidden"
              src=""
              alt="Post image"
          >
        </div>
        <textarea :value="post.description"
                  id="textarea"
                  rows="10"
                  maxlength="1500"
                  class="w-full h-auto resize-none focus:outline-none bg-commentgrey rounded-l-xl p-2"
        ></textarea>
        <div class="line mt-8 mb-4"></div>
        <div class="flex justify-between self-end w-full items-center mb-32">
          <label for="image" class="hover:cursor-pointer">
            <img src="../assets/fileIcon.png" alt="" class="w-6 h-6">
          </label>
          <input type="file" name="image" id="image" accept="image/*" @change="fileInput">
          <button class="bg-blue rounded-full w-32 h-8 text-white font-bold"
          >Editer
          </button>
        </div>

      </form>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
import SideMenu from "@/components/sideMenu"

export default {
  name: "editPostPage",
  components: {SideMenu},
  data() {
    return {
      post: {},
      baseImgPreview: false,
      imgPreview: false,
    }
  },
  created() {
    this.post = this.$store.state.posts.find(post => post._id === this.$route.params.id);
    if (this.post.image) this.baseImgPreview = true;
  },
  methods: {
    fileInput(event) {
      if (this.baseImgPreview) this.removeImage();
      this.imgPreview = true;
      const imageP = document.querySelector("#imgPreview");
      imageP.style.display = "block";
      imageP.src = URL.createObjectURL(event.target.files[0]);
    },
    removeImage() {
      const imagePreview = document.querySelector('#imgPreview');
      const baseImagePreview = document.querySelector('#baseImgPreview');
      this.imgPreview = false;
      this.baseImgPreview = false;
      imagePreview.style.display = "none";
      if (imagePreview) imagePreview.src = "";
      if (baseImagePreview) baseImagePreview.src = "";
    },
    putRequest(body) {
      axios.put(`http://localhost:3000/post/${this.post._id}`, body, this.$store.state.header)
          .then((response) => {
            console.log(response);
            this.$router.push("/home");
          })
          .catch(error => {
            console.log(error)
          })
    },
    updatePost() {
      if (this.baseImgPreview) {
        const body = {
          title: document.querySelector('#title').value,
          description: document.querySelector('#textarea').value,
        }
        this.putRequest(body);

      }
      if (!this.baseImgPreview && this.imgPreview) {
        const body = new FormData(document.querySelector('form'));
        this.putRequest(body);
      }
      if (!this.baseImgPreview && !this.imgPreview) {
        const body = {
          title: document.querySelector('#title').value,
          description: document.querySelector('#textarea').value,
          image: "delete"
        }
        this.putRequest(body);
      }
    }
  }
}
</script>

<style scoped>

h1 {
  font-family: 'Timmana', sans-serif;
}

#image {
  display: none;
}

.line {
  height: 0.1px;
  width: 100%;
  background-color: lightgray;
}

#editPost::-webkit-scrollbar {
  width: 0.8em;
}

#editPost::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

#editPost::-webkit-scrollbar-thumb {
  background-color: dodgerblue;
  outline: 1px solid #333333;
}

textarea::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

textarea::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
}

textarea::-webkit-scrollbar-thumb {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.15));
  border: 1px solid rgba(0, 0, 0, 0.2);
}

textarea::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4));
}
</style>