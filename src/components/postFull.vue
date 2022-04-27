<template>
  <div id="postfull" class="w-2/5 bg-white h-full pt-12 px-16 overflow-scroll">
    <div class="flex justify-between mb-5">
      <div class="flex justify-center items-center rounded-full bg-grey h-8 text-white px-6">4 avril 2022</div>
      <div class="flex justify-center items-center rounded-full bg-blue h-8 font-bold text-white px-6"> Commenter</div>
    </div>
    <h1 class="font-bold text-xl">Comment le javascript à changé le game</h1>
    <p class="text-sm text-blue my-1">par Lara Don Cicci</p>
    <p class="text-sm mb-3">16 likes</p>
    <div class="line"></div>
    <img class="my-10 w-full" src="../assets/postimage.png" alt="">
    <p class="text-sm">Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis
      deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut
      voluptate aute id deserunt nisi. Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse
      pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint
      deserunt ut voluptate aute id deserunt nisi.
      <br><br>
      Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore
      cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt
      nisi.
      <br><br>
      Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore
      cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt
      nisi.
      <br><br>
      Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore
      cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt
      nisi.
    </p>
    <div class="line my-8"></div>
  </div>
</template>

<script>
export default {
  name: "PostFull"
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