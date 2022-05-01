<template>
  <div class="w-full h-full flex">
    <side-menu></side-menu>
    <div class="flex flex-col w-2/5 px-20">
      <h1 class="text-titlegrey text-4xl mt-32 mb-10 self-start">Mon compte</h1>
      <form class="flex flex-col">
        <input type="text" placeholder="Don Cicci" class="w-full h-12 mb-8 pl-5 rounded-full">
        <input type="text" placeholder="Lara" class="w-full h-12 mb-8 pl-5 rounded-full">
        <input type="text" placeholder="laradoncicicai@gmail.com" class="w-full h-12 mb-8 pl-5 rounded-full">
        <input type="file" class="w-full h-12 mb-8 pl-5 rounded-full">
        <input type="text" placeholder="**********" class="w-full h-12 mb-2 pl-5 rounded-full">
        <p class="underline font-light mb-8">Modifier mon mot de passe</p>
        <button class="w-56 h-12 bg-blue text-white text-base font-bold mb-8 rounded-full">Modifier</button>
      </form>
      <p class="text-red underline hover:cursor-pointer" @click="$store.dispatch('disconnect')" >Se déconnecter</p>
    </div>
  </div>
</template>

<script>
import SideMenu from "@/components/sideMenu"
export default {
  name: "MyAccount",
  components: {SideMenu}
}
</script>

<style scoped>
  h1{
    font-family: 'Timmana', sans-serif;
  }
</style>