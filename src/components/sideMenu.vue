<template>
  <div id="menu" class="w-1/5 h-full flex flex-col text-grey">
    <img src="../assets/logo.png" class="self-center w-28 mt-14 mb-10">
    <img v-if="$store.state.isLogged.image" src=""
          class="bg-white w-52 h-52 rounded-full mb-8 self-center border-4 border-white">
      <div v-else
           class="userImageDefault w-52 h-52 rounded-full mb-8 self-center border-4 border-white text-9xl"
      >{{$store.state.isLogged.fullName.charAt(0)}}</div>
    <div id="name" class="w-full my-8 flex items-center justify-center">
      <h1 class="font-bold text-xl">{{ $store.state.isLogged.fullName }}</h1>
    </div>


    <ul class="text-xl ml-10">
      <router-link to="/home"><li class="font-bold my-6">Mon mur</li></router-link>
      <li class="my-6">Mes messages</li>
      <router-link to="/account"><li class="my-6" >Mon compte</li></router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "sideMenu.vue"
}
</script>

<style scoped>
  #menu{
    background: linear-gradient(180deg, #D5EBFF 0%, #E2E9EF 100%);
  }
  #name{
    background: rgba(237, 237, 237, 0.37);
    height: 70px;
  }

</style>