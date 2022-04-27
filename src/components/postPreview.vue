<template>
  <div id="wallContent" class="flex flex-col items-center w-2/5 px-20 overflow-scroll">
    <h1 class="text-titlegrey text-4xl mt-32 mb-5 self-start">Mon Mur</h1>
    <div class="postpreview flex bg-white h-32 pl-8 my-5 w-full">
      <img src="../assets/userExample.jpg" alt="" class="w-16 h-16 rounded-full mr-5 self-center">
      <div class="flex flex-col mt-3 w-3/4">
        <h2 class="font-bold">Comment JavaScript a changé le game</h2>
        <p class="leading-4 mt-1 text-lightgrey">Depuis le début des années 2010 et l'arrivé de node.js, les choses ont...</p>
        <div class="flex justify-between my-4 text-lightgrey font-light">
          <span class="flex"><img class="mr-2" src="../assets/comment.svg" alt="">22 comments</span>
          <span class="flex">16<img class="ml-2" src="../assets/thumb.svg"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostPreview"
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
</style>