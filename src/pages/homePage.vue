<template>
  <div class="w-full h-full flex">
    <side-menu></side-menu>
    <div id="wallContent" class="flex flex-col items-center w-2/5 px-20 overflow-scroll">
      <h1 class="text-titlegrey text-4xl mt-32 mb-5 self-start">Mon Mur</h1>
      <post-preview></post-preview>
      <post-preview></post-preview>
      <post-preview></post-preview>
      <post-preview></post-preview>
      <post-preview></post-preview>
      <post-preview></post-preview>
    </div>
    <post-full></post-full>

  </div>
</template>

<script>
import SideMenu from "../components/sideMenu"
import PostPreview from "../components/postPreview"
import PostFull from "../components/postFull"
export default {
  name: "homePage.vue",
  components: {SideMenu,PostPreview, PostFull},
}
</script>

<style scoped>
  #wallContent h1{
    font-family: 'Timmana', sans-serif;
  }
  #wallContent::-webkit-scrollbar{
    display: none;
  }
</style>