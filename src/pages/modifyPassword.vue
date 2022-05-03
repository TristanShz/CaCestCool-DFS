<template>
  <div class="w-full h-full flex">
    <side-menu></side-menu>
    <div class="flex flex-col w-2/5 px-20">
      <h1 class="text-titlegrey text-4xl mt-32 mb-10 self-start">Modifier mon mot de passe</h1>
      <form class="flex flex-col" @submit.prevent="modifyPassword($store.state.isLogged._id)">
        <input type="password" v-model="password" name="password"
               class="focus:outline-blue w-full h-12 mb-2 pl-5 rounded-full" required
               minlength="8" maxlength="30" @input="checkPassword" placeholder="Ancien mot de passe...">
        <span class="text-red text-sm font-light mb-8 self-start"
        >{{ passwordError }}</span>
        <input type="password" v-model="newPassword" name="newPassword"
               class="focus:outline-blue w-full h-12 mb-2 pl-5 rounded-full" required
               minlength="8" maxlength="30" @input="checkNewPassword" placeholder="Nouveau mot de passe...">
        <span class="text-red text-sm font-light mb-8 self-start"
        >{{ newPasswordError }}</span>
        <button class="w-56 h-12 bg-blue text-white text-base font-bold rounded-full">Modifier</button>
        <span class="text-red text-sm font-light mb-8 self-start"
        >{{ errorMessage }}</span>
      </form>
    </div>
  </div>
</template>

<script>
import SideMenu from "@/components/sideMenu"
import axios from 'axios'

export default {
  name: "ModifyPassword",
  components: {SideMenu},
  data() {
    return {
      password: "",
      newPassword: "",
      errorMessage: "",
      passwordError: "",
      newPasswordError: "",
      passwordValid: false,
      newPasswordValid: false,
    }
  },
  methods: {
    checkPassword() {
      this.passwordValid = false;
      if (this.password) {
        if (this.password.length >= 8) {
          const hasNumber = /\d/;
          const regex = /^[a-zA-Z0-9!@#%^&*]+$/g;
          if (!hasNumber.test(this.newPassword) || !regex.test(this.newPassword)) {
            this.newPasswordError = "Votre mot de passe doit contenir au moins un chiffre et ne doit pas contenir de " +
                "caractères spéciaux autres que '! @ # % $ ^ & *'";
          } else {
            this.passwordError = "";
            this.passwordValid = true;
          }
        } else {
          this.passwordError = "Mot de passe trop court";
        }
      } else {
        this.passwordError = "";
      }
    },
    checkNewPassword() {
      this.newPasswordValid = false;
      if (this.newPassword) {
        if (this.newPassword.length >= 8) {
          const hasNumber = /\d/;
          const regex = /^[a-zA-Z0-9!@#%^&*]+$/g;
          if (!hasNumber.test(this.newPassword) || !regex.test(this.newPassword)) {
            this.newPasswordError = "Votre mot de passe doit contenir au moins un chiffre et ne doit pas contenir de " +
                "caractères spéciaux autres que '! @ # % $ ^ & *'";
          } else {
            this.newPasswordError = "";
            this.newPasswordValid = true;
          }
        } else {
          this.newPasswordError = "Mot de passe trop court";
        }
      } else {
        this.newPasswordError = "";
      }
    },
    modifyPassword(userId) {
      if (this.passwordValid && this.newPasswordValid) {
        const body = {
          password: this.password,
          newPassword: this.newPassword,
        }
        axios.put(`http://localhost:3000/users/password/${userId}`, body, this.$store.state.header)
            .then(() => {
              this.$router.push("/account");
            })
            .catch((e) => {
              this.errorMessage = "L'ancien mot de passe ne correspond pas, veuillez réessayer.";
              console.log(e);
            })
      } else {
        this.errorMessage = "Une erreur est survenue, vérifiez les champs";
      }
    }
  }
}
</script>

<style scoped>
h1 {
  font-family: 'Timmana', sans-serif;
}

</style>