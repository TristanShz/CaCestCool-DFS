<template>
  <div class="flex flex-col justify-center items-center h-full overflow-hidden relative">
    <img src=".././assets/bgVector1.svg" alt="background" class="absolute -right-64 -bottom-4 -z-1">
    <img src=".././assets/bgVector2.svg" alt="background" class="absolute top-0 left-0 -z-1">
    <img src=".././assets/logo.png" alt="logo-CaCestCool" class="w-72 mb-16 ">
    <form class="flex flex-col items-center w-1/4 z-0" @submit.prevent="register()">
      <input type="text"
             placeholder="Nom complet (ex : John Doe)"
             class="w-full h-12 mb-1 pl-5 rounded-full"
             v-model="fullName"
             @input="checkFullName()"
      >
      <span class="text-red text-sm font-light mb-8 self-start"
      >{{ fullNameError }}</span>
      <input type="email"
             placeholder="Email"
             class="w-full h-12 mb-1 pl-5 rounded-full"
             v-model="email"
             @input="checkEmail()"
      >
      <span class="text-red text-sm font-light mb-8 self-start"
      >{{ emailError }}</span>
      <input type="password"
             placeholder="Mot de passe"
             class="w-full h-12 mb-8 pl-5 rounded-full"
             v-model="password"
             @input="checkPassword()"
      >
      <input type="password"
             placeholder="Confirmer le mot de passe"
             class="w-full h-12 mb-1 pl-5 rounded-full"
             v-model="confirmPassword"
             @input="checkPassword()"
      >
      <span class="text-red text-sm font-light mb-8 self-start"
      >{{ passwordError }}</span>
      <button type="submit"
              class="w-56 h-12 bg-blue text-white text-base font-bold mb-8 rounded-full"
      >S'enregistrer
      </button>
      <router-link to="/login"><a class="text-blue">Vous avez déjà un compte ?</a></router-link>
    </form>
  </div>

</template>

<script>
import axios from "axios"

export default {
  name: "registerPage",
  data() {
    return {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      fullNameError: "",
      emailError: "",
      passwordError: "",
      fullNameValid: false,
      emailValid: false,
      passwordValid: false,
    }
  },
  methods: {
    register() {
      if (this.fullNameValid && this.emailValid && this.passwordValid) {
        axios.post("http://localhost:3000/users", {
          fullName: this.fullName,
          email: this.email,
          password: this.password,
        })
            .then(() => {
              this.$router.push('/login');
            })
            .catch((e) => {
              console.error(e);
              alert("Erreur lors de l'envoi du formulaire");
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
        } else if (!/^[a-zA-Z\s]*$/.test(this.fullName)) {
          this.fullNameError = "Ne peut contenir que des caractères (A-Z)";
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
    checkPassword() {
      this.passwordValid = false;
      if (this.password) {
        if (this.password.length >= 8) {
          const hasNumber = /\d/;
          const regex = /^[a-zA-Z0-9!@#%^&*]+$/g;
          if (!hasNumber.test(this.password) || !regex.test(this.password)) {
            this.passwordError = "Votre mot de passe doit contenir au moins un chiffre et ne doit pas contenir de " +
                "caractères spéciaux autres que '!@#%$^&*'";
          } else {
            if (this.confirmPassword && this.password !== this.confirmPassword) {
              this.passwordError = "Les mots de passes ne correspondent pas"
            } else {
              this.passwordError = "";
              this.passwordValid = true;
            }
          }
        } else {
          this.passwordError = "Mot de passe trop court";
        }
      } else {
        this.passwordError = "";
      }
    },
  }
}
</script>

<style scoped>
form input:focus {
  outline-color: #0085FF;
}

form button:active {
  background-color: #004286;
  transform: scale(0.95, 0.95);
}
</style>