<template>
  <div>
    <!-- <h2>Nav Bar</h2> remember to remove h2 tag and text- -->
    <nav>
    <!-- <nav > v-if="authenticated"> -->
      <!-- <router-link class="spacing"  v-for="routes in links" 
      v-bind:key="routes.id"
      :to="`${routes.page}`">{{routes.text}}</router-link> -->
      <router-link class="spacing" to="/">Home</router-link>
      <router-link class="spacing" to="/about">About</router-link>
      <!-- <router-link class="spacing" to="/sign">Sign Up</router-link> -->
       
       <!-- Passed props set from App to Naivation -->
      <router-link class="spacing" v-show="this.authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
      <router-link class="spacing" v-show="this.authenticated" to="/profile">Profile</router-link>

      
    </nav>
  </div>
</template>

<script>
  import { MYDB } from "../myFirebaseInit";
  import firebase from '@firebase/app';
  import { METHODS } from 'http';
  require('firebase/auth');

export default {
  name: 'Navigation',
  props: {
    authenticated: Boolean
  },
  data() {
    return {
      authenticated: false,
      links: [
        // {
        //   id: 0,
        //   text: 'HelloWorld',
        //   page:'/HelloWorld'
        // },
        {
          id: 3,
          text: 'Home',
          page:'/Home'
        },
        {
          id: 1,
          text: 'About',
          page:'/About'
        },
        {
          id: 2,
          text: 'Sign Up',
          page:'/Sign'
        },
        {
          id: 3,
          text: 'Profile',
          page:'/Profile'
        },
        {
          id: 0,
          text: 'Login',
          page:'/Login'
        }
      ]
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
                // MYDB.ref(authenticated).remove(firebase.auth().currentUser);
            }
        },

        



  }
//}
</script>
<style  scoped> 
  .spacing { 
    Margin-right: 10px; 
  } 
</style>