<template>
  <div id="editPost" class="w-2/5 bg-white h-full pt-12 px-16 overflow-y-scroll">
    <input type="text" name="title"
           :value="$store.state.onEditPost.title"
           maxlength="50"
           class="focus:outline-none bg-commentgrey rounded-xl p-2 font-bold w-2/3">
    <p class="text-sm text-blue my-1">par {{ $store.state.onEditPost.user.fullName }}</p>
    <p class="text-sm mb-3">{{ $store.state.onEditPost.likes.length }} likes</p>
    <div class="line mb-10"></div>
    <div class="relative">
      <img v-if="newImagePreview || baseImage" src="../assets/close.png" alt=""
           class="w-10 h-10 absolute z-10 top-2 left-2 hover:scale-110 hover:cursor-pointer"
           @click="removeImage"
      >
      <img v-if="$store.state.onEditPost.image && baseImage"
           id="baseImage"
           class="mb-10 w-full z-0"
           :src="require(`@/assets/uploads/${$store.state.onEditPost.image}`)"
           alt="Post image"
      >
    </div>
    <textarea :value="$store.state.onEditPost.description"
              id="textarea"
              rows="10"
              maxlength="1500"
              class="w-full h-auto resize-none focus:outline-none bg-commentgrey rounded-l-xl p-2"
    ></textarea>
    <div class="line mt-8 mb-4"></div>
    <div class="flex justify-between self-end w-full items-center">
      <label for="image" class="hover:cursor-pointer">
        <img src="../assets/fileIcon.png" alt="" class="w-6 h-6">
      </label>
      <input type="file" name="image" id="image" accept="image/*" @change="fileInput">
      <button class="bg-blue rounded-full w-32 h-8 text-white font-bold"
      >Editer</button>
    </div>
  </div>
</template>


<script>
export default {
  name: "editPost",
  data(){
    return {
      baseImage : this.$store.state.onEditPost.image ? true : false,
      newImagePreview: false,
    }
  },
  methods: {
    fileInput(event){
      this.newImagePreview = true;
      const imageP = document.querySelector("#baseImage");
      imageP.src = URL.createObjectURL(event.target.files[0]);
      console.log(imageP);
    },
    removeImage(){
      const inputFile = document.querySelector('#image');
      const baseImage = document.querySelector('#baseImage');
      const imagePreview = document.querySelector('.imagePreview');
      if(baseImage) baseImage.src = "";
      inputFile.value="";
      this.newImagePreview= false;
      this.baseImage= false;
      if(imagePreview) imagePreview.src = "";
    },
  }
}
</script>

<style scoped>
  #image{
    display:none;
  }
  .line{
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
     background: rgba(0,0,0,0.1);
     box-shadow: inset 0 0 4px rgba(0,0,0,0.3);
   }
  textarea::-webkit-scrollbar-thumb {
     background: linear-gradient(left, rgba(0,0,0,0.1), rgba(0,0,0,0.15));
     border: 1px solid rgba(0,0,0,0.2);
   }
  textarea::-webkit-scrollbar-thumb:hover {
     background: linear-gradient(left, rgba(0,0,0,0.3), rgba(0,0,0,0.4));
   }
</style>