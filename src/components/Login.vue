<template>
    <div id="login">
        <section>
            <div class="col1">
                <h1>Grand Valley State University Cinemas</h1>
               
            </div>
            <div class="col2">
                <form @submit.prevent>
                    <h1>Welcome Lakers</h1>

                    <label for="email1">Email</label>
                    <input v-model.trim="loginForm.email" type="text" placeholder="ilive@email.com" id="email1" />

                    <label for="password1">Password</label>
                    <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />

                    <button class="button" v-on:click="signIn" >Log In</button>

                    <div class="extras"><br>
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
        methods: {
        signIn: function() {
            firebase.auth().signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(
            (user) => {

                if( MYDB.ref("users").orderByChild('email').equalTo(this.loginForm.email) && MYDB.ref("users").orderByChild('password').equalTo(this.loginForm.password)) {

                    this.$router.replace('home');
                    console.log("User is logged in");
                }
               
            },
            (err) => {
                alert('Oops. ' + err.message)
            }
            );
        }
    }
    }
</script>
<style scoped>  /* "scoped" attribute limit the CSS to this component only */
  .login {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 10px;
    width: 10%;
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