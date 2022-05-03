<template>
  <form class="flex flex-col self-start ml-8 w-11/12" @submit.prevent="addPost">
    <div class="flex w-full">
      <img v-if="$store.state.isLogged.profilPicture"
           :src="require(`@/assets/userImages/${$store.state.isLogged.profilPicture}`)" alt=""
           class="w-16 h-16 rounded-full mr-4 object-cover">
      <div v-else
           class="userImageDefault w-16 h-16 rounded-full mr-4 text-4xl"
           v-bind:style="{ background: $store.state.isLogged.defaultColor}"
      >{{ $store.state.isLogged.fullName.charAt(0) }}
      </div>
      <div class="w-5/6">
        <input type="text"
               name="title"
               placeholder="Titre de l'article..."
               maxlength="50"
               v-model="title"
               class="w-full font-bold focus:outline-none mb-1"
        >
        <textarea
            name="description"
            placeholder="Contenu de l'article..."
            maxlength="1500"
            class="w-full h-auto resize-none focus:outline-none overflow-hidden"
            v-model="description"
            @input="checkTextArea"
        ></textarea>
      </div>
    </div>
    <div class="relative">
      <img v-if="imagePreview" src="../assets/close.png" alt=""
           class="w-10 h-10 absolute z-10 top-2 left-2 hover:scale-110 hover:cursor-pointer"
           @click="removeImage"
      >
      <img src="" alt="" id="imgPreview" class="mb-8 rounded-xl z-0">
    </div>
    <p class="text-red self-end mb-4">{{ errorMessage }}</p>
    <div class="flex justify-between self-end w-5/6 items-center">
      <label for="file" class="hover:cursor-pointer hover:scale-125 active:scale-100">
        <img src="../assets/fileIcon.png" alt="" class="w-6 h-6">
      </label>
      <input type="file" name="image" id="file" accept="image/*" @change="fileInput">
      <button class="bg-blue rounded-full w-32 h-8 text-white font-bold active:bg-darkblue"
      >Envoyer
      </button>
    </div>
  </form>
</template>

<script>
import axios from "axios"

export default {
  name: "AddPost",
  data() {
    return {
      title: "",
      description: "",
      imagePreview: false,
      errorMessage: "",
    }
  },
  methods: {
    checkTextArea() {
      const textarea = document.querySelector('textarea');
      textarea.style.height = textarea.scrollHeight + "px";
    },
    fileInput(event) {
      const imgPreview = document.querySelector('#imgPreview');
      imgPreview.src = URL.createObjectURL(event.target.files[0]);
      this.imagePreview = true;
    },
    removeImage() {
      const inputFile = document.querySelector('#file');
      const imgPreview = document.querySelector('#imgPreview');
      inputFile.value = "";
      this.imagePreview = false;
      imgPreview.src = "";
    },
    async addPost() {
      if (this.title.length && this.description.length) {
        const body = new FormData(document.querySelector('form'));
        axios.post("http://localhost:3000/post", body, this.$store.state.header)
            .then(() => {
              this.$store.dispatch("setPosts");
              this.title = "";
              this.description = "";
              this.errorMessage = "";
              this.removeImage();
            })
            .catch((e) => {
              console.log(e);
              this.errorMessage = "Erreur lors de l'envoi du formulaire, veuillez réessayer"
            })
      } else {
        this.errorMessage = "Les champs titre et description sont nécessaires"
      }

    },
  }
}
</script>

<style scoped>
input[name="title"], textarea {
  background-color: #EDEDED;
}

#file {
  display: none;
}

#imgPreview {
  filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.5));
}
</style>