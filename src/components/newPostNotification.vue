<template>
  <div class="relative flex flex-col items-center" v-if="$store.getters.getPostsUnreadByUserLogged.length">
    <transition name="popup">
      <div class="w-max px-2.5 py-2 rounded-full bg-white absolute -top-16" v-if="hover">
        <p class="font-medium">{{ $store.getters.getPostsUnreadByUserLogged.length }}
          {{ $store.getters.getPostsUnreadByUserLogged.length > 1 ? "posts" : "post" }} non lu</p>
        <div class="w-4 h-4 bg-white absolute left-1/2 -translate-x-1/2 rotate-45 -bottom-2"></div>
      </div>
    </transition>
    <div class="w-10 h-10 rounded-full bg-blue flex justify-center items-center text-white font-bold"
         @mouseenter="hover=true"
         @mouseleave="hover=false"
    >
      {{ $store.getters.getPostsUnreadByUserLogged.length }}
    </div>
  </div>
</template>

<script>
export default {
  name: "newPostNotification",
  data() {
    return {
      hover: false,
    }
  },
  methods: {}
}
</script>

<style scoped>
.popup-enter-active, .popup-leave-active {
  transition: all .2s;
}

.popup-enter, .popup-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.5);
}
</style>