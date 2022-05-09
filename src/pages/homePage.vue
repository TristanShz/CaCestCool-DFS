<template>
  <div class="w-full h-full flex">
    <side-menu></side-menu>
    <post-preview></post-preview>
    <transition name="slide">
      <post-full v-if="$store.state.currentPostId"></post-full>
    </transition>
  </div>
</template>

<script>
import SideMenu from "../components/sideMenu"
import PostPreview from "../components/postPreview"
import PostFull from "../components/postFull"

export default {
  name: "homePage",
  components: {SideMenu, PostPreview, PostFull},
  created() {
    this.$store.dispatch("setPosts");
  }
}
</script>

<style scoped>
.slide-enter-active {
  animation: slideIn .5s;
}

.slide-leave-active {
  animation: slideOut .5s;
}

@keyframes slideIn {
  0% {
    transform: translateX(100%)
  }
  100% {
    transform: translateX(0%)
  }
}

@keyframes slideOut {
  0% {
    transform: translateX(0%)
  }
  100% {
    transform: translateX(100%)
  }
}

</style>