<template>
  <div class="w-full h-full flex">
    <side-menu></side-menu>
    <div class="flex flex-col w-2/5 px-20">
      <h1 class="text-titlegrey text-4xl mt-32 mb-10 self-start">Modifier mon mot de passe</h1>
      <form class="flex flex-col">
        <p class="font-bold mb-2">Ancien mot de passe</p>
        <input type="password" class="focus:outline-blue w-full h-12 mb-2 pl-5 rounded-full" required minlength="5">
        <p class="font-bold mb-2">Nouveau mot de passe</p>
        <input type="password" class="focus:outline-blue w-full h-12 mb-8 pl-5 rounded-full" required minlength="5">
        <button class="w-56 h-12 bg-blue text-white text-base font-bold rounded-full">Modifier</button>
      </form>
    </div>
  </div>
</template>

<script>
import SideMenu from "@/components/sideMenu"

export default {
  name: "ModifyPassword",
  components: {SideMenu},
}
</script>

<style scoped>
h1 {
  font-family: 'Timmana', sans-serif;
}

</style>