<template>
  <div class="flex w-3/4 text-lightgrey">
    <div class="flex flex-col mr-5 items-center">
      <img class="h-10 w-20 mb-1.5" src="../assets/usermini.png" alt="">
      <p class="date font-light">12:32</p>
      <p class="time font-light italic">21/04/22</p>
    </div>
    <div class="comment px-6 py-4 bg-commentgrey">
      <h1 class="text-xs font-bold pb-4">Lara Don Cicci</h1>
      <p class="text-xs">Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit
        dolore cillum minim tempor enim. <br>
        Elit aute irure tempor cupidatat incididunt sint deserunt</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostComments"
}
</script>

<style scoped>
  .date{
    font-size: 12px;
    line-height: 12.05px;
  }
  .time{
    font-size: 9px;
    line-height: 9.04px;
  }
  .comment{
    border-radius: 30px;
  }
</style>