<template>
  <div class="w-full h-full flex">
    <side-menu></side-menu>
    <post-preview></post-preview>
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

</style>