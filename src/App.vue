<template>
  <div id="app">
    <!-- <router-link v-if="this.authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link> -->
    <Navigation @authenticated="setAuthenticated" :authenticated ="authenticated" />
    
    <img src="./assets/logo.png">
    <router-view @authenticated="setAuthenticated" />
    <!-- <img src="./assets/gvsu2.jpg"> -->
    
    <div class="movie-grid">
     <!-- <Movies></Movies>  -->

    </div>
    
    <!-- <router-view/> -->
    
  </div>
</template>

<script>

import Navigation from './components/Navigation'
import Login from './components/Login'
import About from './components/About'

export default {
name: 'app',
data() {
  return{
  authenticated: false
  }

},
//if user isn't authenticated should display the login page
mounted() {
            if(!this.authenticated) {
                this.$router.replace({ name: "Login" });
            }
},

components: {
  Navigation,
  Login,
  About

},
methods: {
            setAuthenticated(status) {
                this.authenticated = status;
                this.$emit("authenticated", status); 

            },
            logout() {
                this.authenticated = false;
                this.$emit("authenticated", false); 
            }
        },

        

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
/* .movies {
  display: block;
} */
</style>
