<template>
  <div class="w-full h-full flex">
    <side-menu></side-menu>
    <div id="wallContent" class="px-20">
      <h1 class="text-titlegrey text-4xl mt-32">Mon Mur</h1>
      <post-preview></post-preview>
      <post-preview></post-preview>
      <post-preview></post-preview>
      <post-preview></post-preview>
      <post-preview></post-preview>
      <post-preview></post-preview>
    </div>
  </div>
</template>

<script>
import SideMenu from "../components/sideMenu"
import PostPreview from "../components/postPreview"
export default {
  name: "homePage.vue",
  components: {SideMenu,PostPreview},
}
</script>

<style scoped>
  #wallContent h1{
    font-family: 'Timmana', sans-serif;
  }
</style>