<template>
  <div>
    <h1>Grand Valley's Home for Movies</h1>
    <!-- <p>Currently showing at GVSU Cinemans</p> -->
    <movies></movies>

  </div>
</template>

<script>
import Movies from '@/components/Movies'
import Login from '@/components/Login' //importing to get authUsers array props from Login

export default {
  name: 'Home', //this is the name of the component
  props: [authUsers], //may not need as a prop when importing
//   data() {      

//   },
  components: {
      Movies
  }
};
</script>
<style>
</style>