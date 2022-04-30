<template>
  <div class="flex flex-col self-start ml-8 w-11/12">
    <div class="flex w-full">
      <img v-if="$store.state.isLogged.image" src="" alt="" class="w-16 h-16 rounded-full mr-4">
      <div v-else
           class="userImageDefault w-16 h-16 rounded-full mr-4 text-4xl"
      >{{$store.state.isLogged.fullName.charAt(0)}}</div>
      <span class="textarea block w-5/6 h-fit overflow-hidden" contenteditable></span>
    </div>
      <button class="bg-blue rounded-full w-32 h-8 text-white font-bold self-end mt-4">Envoyer</button>
  </div>
</template>

<script>
export default {
  name: "AddPost"
}
</script>

<style scoped>
  .textarea[contenteditable]:empty::before{
    content: "Ajouter un article...";
    color: grey;
  }
  .textarea:hover{
    cursor: text;
  }
  .textarea:focus{
    outline: none;
  }
</style>