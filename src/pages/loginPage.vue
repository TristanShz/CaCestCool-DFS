<template>
  <div class="flex flex-col justify-center items-center h-full overflow-hidden relative">
    <img src=".././assets/bgVector1.svg" alt="background" class="absolute -right-64 -bottom-4 -z-1">
    <img src=".././assets/bgVector2.svg" alt="background" class="absolute top-0 left-0 -z-1">
    <img src=".././assets/logo.png" alt="logo-CaCestCool" class="w-72 mb-16 ">
    <form class="flex flex-col items-center w-1/4 z-0" @submit.prevent="login()">
      <input type="email"
             placeholder="Email"
             class="w-full h-12 mb-8 pl-5 rounded-full"
             v-model="email"
      >
      <input type="password"
             placeholder="Mot de passe"
             class="w-full h-12 mb-8 pl-5 rounded-full"
             v-model="password"
      >
      <button class="w-56 h-12 bg-blue text-white text-base font-bold mb-1 rounded-full"
              type="submit"
      >Se connecter</button>
      <span class="text-red text-sm font-light mb-8">{{errorMessage}}</span>
      <router-link to="/"><a href="#" class="text-blue">Vous n'avez pas de compte ?</a></router-link>
    </form>
  </div>

</template>

<script>
import axios from 'axios';
export default {
  name: "loginPage",
  data(){
    return {
      email: "",
      password:"",
      errorMessage:"",
    }
  },

  methods: {
    async login(){
      const logRequest = await axios
          .post("http://localhost:3000/users/login",
      {
              email: this.email,
              password: this.password,
            })
          .then(result => {
            return {
              canLogin: true,
              data: result.data.access_token,
              user: result.data.user,
            };
          })
          .catch(error => {
            return {
              canLogin: false,
              data: error.response.data.message
            };
          });
      if(logRequest.canLogin){
        localStorage.setItem("token", logRequest.data);
        await this.$store.dispatch("logUser", logRequest.user);
        this.$router.push("/home");
      }else{
        this.errorMessage = logRequest.data;
      }
}
  }
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