<template>
  <div class="flex flex-col justify-center items-center h-full overflow-hidden relative">
    <img src=".././assets/bgVector1.svg" alt="background" class="absolute -right-64 -bottom-4">
    <img src=".././assets/bgVector2.svg" alt="background" class="absolute top-0 left-0">
    <img src=".././assets/logo.png" alt="logo-CaCestCool" class="w-72 mb-16 ">
    <form class="flex flex-col items-center w-1/4">
      <input type="email" placeholder="Email" class="w-full h-12 mb-8 pl-5 rounded-full">
      <input type="password" placeholder="Mot de passe" class="w-full h-12 mb-8 pl-5 rounded-full">
      <input type="password" placeholder="Confirmer le mot de passe" class="w-full h-12 mb-8 pl-5 rounded-full">
      <button class="w-56 h-12 bg-blue text-white text-base font-bold mb-8 rounded-full">S'enregistrer</button>
      <a href="#" class="text-blue">Vous avez déjà un compte ?</a>
    </form>
  </div>

</template>

<script>

export default {
  name: "registerPage"
}
</script>

<style scoped>
  form input:focus{
    outline-color: #0085FF;
  }
  form button:active{
    background-color: #004286;
    transform: scale(0.95,0.95);
  }
</style>