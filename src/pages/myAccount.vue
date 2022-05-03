<template>
  <div class="w-full h-full flex">
    <side-menu></side-menu>
    <div class="flex flex-col w-2/5 px-20">
      <h1 class="text-titlegrey text-4xl mt-32 mb-10 self-start">Mon compte</h1>
      <form class="flex flex-col" @submit.prevent="updateUser($store.state.isLogged._id)">
        <input type="text" name="fullName"
               class="w-full h-12 mb-8 pl-5 rounded-full" v-model="fullName" @input="checkFullName" maxlength="30">
        <span class="text-red text-sm font-light mb-8 self-start"
        >{{ fullNameError }}</span>
        <input type="email" name="email" class="w-full h-12 mb-8 pl-5 rounded-full"
               v-model="email" @input="checkEmail">
        <span class="text-red text-sm font-light mb-8 self-start"
        >{{ emailError }}</span>
        <input type="text" value="*************" class="w-full h-12 mb-2 pl-5 rounded-full" readonly>
        <p class="underline font-light mb-8">Modifier mon mot de passe</p>
        <div class="flex w-full">
          <p class="mr-4 font-medium">Photo de profil : </p>
          <input type="file" id="image" name="image" placeholder="Modifier ma photo de profil" accept="image/*"
                 class=" h-12 mb-8 pl-5 rounded-full">
        </div>
        <button class="w-56 h-12 bg-blue text-white text-base font-bold mb-8 rounded-full">Modifier</button>
      </form>
      <p class="text-red underline hover:cursor-pointer" @click="$store.dispatch('disconnect')">Se déconnecter</p>
    </div>
  </div>
</template>

<script>
import SideMenu from "@/components/sideMenu"
import axios from "axios"

export default {
  name: "MyAccount",
  components: {SideMenu},
  data() {
    return {
      fullName: this.$store.state.isLogged.fullName,
      email: this.$store.state.isLogged.email,
      fullNameError: "",
      emailError: "",
      fullNameValid: true,
      emailValid: true,
    }
  },
  methods: {
    updateUser(userId) {
      if (this.emailValid && this.fullNameValid) {
        const body = new FormData(document.querySelector('form'));
        axios.put(`http://localhost:3000/users/${userId}`, body, this.$store.state.header)
            .then((response) => {
              console.log(response.data);
              this.$store.dispatch("checkToken");
            })
            .catch(error => {
              console.log(error);
            })
      } else {
        return 0;
      }

    },
    checkFullName() {
      this.fullNameValid = false;
      if (this.fullName) {
        if (this.fullName.length < 3) {
          this.fullNameError = "Nom trop court (3 caractères min.)";
        } else if (this.fullName.length > 30) {
          this.fullNameError = "Nom trop long (30 caractères max.)"
        } else {
          this.fullNameError = "";
          this.fullNameValid = true;
        }
      } else {
        this.fullNameError = "";
      }
    },
    checkEmail() {
      this.emailValid = false;
      if (this.email) {
        const emailRegex = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
        if (!emailRegex.test(this.email)) {
          this.emailError = "Votre adresse email est incorrect";
        } else {
          this.emailError = "";
          this.emailValid = true;
        }
      } else {
        this.emailError = "";
      }
    },
  }
}
</script>

<style scoped>
h1 {
  font-family: 'Timmana', sans-serif;
}

</style>