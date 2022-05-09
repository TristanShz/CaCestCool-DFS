<template>
  <div id="menu" class="w-1/5 h-full flex flex-col text-grey">
    <img src="../assets/logo.png" class="self-center w-28 mt-14 mb-10">
    <div class="w-52 h-52 rounded-full mb-8 self-center relative">
      <img v-if="$store.state.isLogged.profilPicture"
           :src="require(`@/assets/userImages/${$store.state.isLogged.profilPicture}`)"
           class="w-full h-full rounded-full object-cover border-4 border-white absolute z-0">
      <div v-else
           class="userImageDefault w-full h-full rounded-full object-cover border-4 border-white absolute z-0 text-9xl"
           v-bind:style="{ background: $store.state.isLogged.defaultColor}"
      ><p class="-translate-y-1">{{ $store.state.isLogged.fullName.charAt(0) }}</p>
      </div>
      <router-link to="/account">
        <div
            class="w-full h-full rounded-full bg-black z-50 opacity-0 hover:opacity-50 hover:cursor-pointer flex justify-center items-center">
          <img src="../assets/editPhoto.svg" alt="" class="w-20 h-20">
        </div>
      </router-link>
    </div>
    <div id="name" class="w-full my-8 flex items-center justify-center">
      <h1 class="font-bold text-xl">{{ $store.state.isLogged.fullName }}</h1>
    </div>


    <ul class="text-xl ml-10 mr-10">
      <router-link to="/home">
        <div class="flex justify-between items-end">
          <li class="mt-6 mb-0.5" v-bind:class="{'font-bold': $route.path==='/home'}">Mon mur</li>
          <new-post-notification></new-post-notification>
        </div>
      </router-link>
      <router-link to="/messages">
        <li class="my-6" v-bind:class="{'font-bold': $route.path==='/messages'}">Mes messages</li>
      </router-link>
      <router-link to="/account">
        <li class="my-6" v-bind:class="{'font-bold': $route.path==='/account' || $route.path === '/password'}">Mon
          compte
        </li>
      </router-link>
    </ul>

  </div>
</template>

<script>
import newPostNotification from "@/components/newPostNotification";

export default {
  name: "sideMenu.vue",
  components: {newPostNotification}

}
</script>

<style scoped>
#menu {
  background: linear-gradient(180deg, #D5EBFF 0%, #E2E9EF 100%);
}

#name {
  background: rgba(237, 237, 237, 0.37);
  height: 70px;
}

</style>