<template>
  <v-app>
    
    <!-- <v-toolbar app> -->

      <!-- <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
      </v-toolbar-title> -->
        <!-- <span class="font-weight-light">MATERIAL DESIGN</span> -->
              
      <!-- <v-spacer></v-spacer> -->
      <!-- <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      > -->
        <!-- <span class="mr-2">Latest Release</span> -->
      <!-- </v-btn> -->
    <!-- </v-toolbar> -->

    <v-content>
      <!-- <HelloWorld/> -->
      <Navigation @authenticated="setAuthenticated" :authenticated ="authenticated" />
      <router-view @authenticated="setAuthenticated" />
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Navigation from './components/Navigation'
import Login from './components/Login'
import About from './components/About'

export default {
  name: 'App',
  components: {
    Navigation,
    Login,
    About,
    HelloWorld
  },
  data () {
    return {
      authenticated: false
      //
    }
  },
  //if user isn't authenticated should display the login page
    mounted() {
      if(!this.authenticated) {
          this.$router.replace({ name: "Login" });
      }
    }, 
    methods: {
            setAuthenticated(status) {
                this.authenticated = status;
                this.$emit("authenticated", status); 
            },
            logout() {
                this.authenticated = false;
                this.$emit("authenticated", false); 
                MYDB.ref("authenticated/" ).remove();
            }
        }, 
  }
</script>
<style scoped>
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
</style>

