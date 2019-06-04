<template>
  <div id="app">
    <Navigation></Navigation>
    <img src="./assets/logo.png">
    <!-- <img src="./assets/gvsu2.jpg"> -->
    <!-- <h1>Cinemas</h1> -->
    <div class="movie-grid">
     <!-- <Movies></Movies>  -->

    </div>
    
    <router-view/>
    
  </div>
</template>

<script>
import Navigation from './components/Navigation'
//import Movies from './components/Movies'

export default {
name: 'app',
data() {

},
components: {
  Navigation,
  //Movies

}

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
