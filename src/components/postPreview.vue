<template>
  <div class="postpreview flex bg-white h-32 pl-8 my-10">
    <img src="../assets/userExample.jpg" alt="" class="w-16 h-16 rounded-full mr-5 self-center">
    <div class="flex flex-col mt-3 w-3/4">
      <h1 class="font-bold">Comment JavaScript a changé le game</h1>
      <p class="leading-4 mt-1 text-lightgrey">Depuis le début des années 2010 et l'arrivé de node.js, les choses ont...</p>
      <div class="flex justify-between my-4 text-lightgrey font-light">
        <span class="flex"><img class="mr-2" src="../assets/comment.svg" alt="">22 comments</span>
        <span class="flex">16<img class="ml-2" src="../assets/thumb.svg"></span>
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
    width: 488px;
  }
</style>