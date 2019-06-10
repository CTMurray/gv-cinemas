<template>
    <div id="login">
        <section>
            <div class="col1">
                <h1>Grand Valley State University Cinemas</h1>
               
            </div>
            <div class="col2">
                <form  class="form1" @submit.prevent>
                    <h1>Welcome Lakers</h1>

                    <label for="email1" align="left">Email</label>
                    <input v-model.trim="loginForm.email" type="text" placeholder="I-live@email.com" id="email1" />

                    <label for="password1" align="left">Password</label>
                    <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />

                    <button class="button" v-on:click="signIn" >Log In</button>


                    <div class="extras">
                        <router-link class="spacing" to="/sign">Sign Up</router-link>
                        <!-- <a>Forgot Password</a><br>
                        <a>Create an Account</a> -->
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>

<script>
/* the .js suffix is optional */
    //import Sign from './components/Sign';
    import { MYDB } from "../myFirebaseInit";
    import firebase from '@firebase/app';
  require('firebase/auth');
  
    export default {
         
        data() {
            return {
                authUsers: [
                    {email: "admin@gvsucinemas.com"}

                ],
                loginForm: {
                    email: '',
                    password: ''
                }
            }
        },
        // components: {
        //     Sign
        // },
        methods: {
        signIn: function() {
            firebase.auth().signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(
            (user) => {

                if( MYDB.ref("users").orderByChild('email').equalTo(this.loginForm.email) && MYDB.ref("users").orderByChild('password').equalTo(this.loginForm.password)) {

                    this.$emit("authenticated", true);                                      

                    //default view that shows the currently available movies
                    this.$router.replace('home');
                    console.log("User " + this.loginForm.email + " is authenticated");
                }
               
            },

            (err) => {
                alert('Oops. ' + err.message)
            }
            );
            //experimenting with state====================================
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        // User is signed in.
                        var displayName = user.displayName;
                        var email = user.email;
                        var emailVerified = user.emailVerified;
                        var photoURL = user.photoURL;
                        var isAnonymous = user.isAnonymous;
                        var uid = user.uid;
                        var providerData = user.providerData;
                        // ...
                    } else {
                        // User is signed out.
                        // ...
                    }
                });
            //=============================================================
        },//end of signIn

    
    }
    }
</script>
<style scoped>  /* "scoped" attribute limit the CSS to this component only */
  .form1{
    
    display: grid;
    border-radius: 10px;
    border: 2px solid gray;
    padding: 10px; 
    width: 400px;
    height: 350px; 
}  
label {
    justify-content: left;
}
  .login {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 30%;
    padding: 15px;
  }
  button {
    margin-top: 10px;
    width: 18%;
    cursor: pointer;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
  /* input {
    margin: 10px;
    width: 10%;
    padding: 15px;
  }
  button {
    margin-top: 20px;
    width: 5%;
    height: 5%;
    cursor: pointer;
  } */
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>