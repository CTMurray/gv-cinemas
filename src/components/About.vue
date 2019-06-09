<template>
  <div>
    <h1>About</h1>
    <p>Grand Valley State University Cinemas is a ficticious cinema located at Allendale university</p>
   
  </div>
</template>

<script>
import Navigation from '@/components/Navigation';
import {MYDB} from '../myFirebaseInit';
import firebase from '@firebase/app';
require('firebase/auth');
export default {
  name: 'About', //this is the name of the component

  components: {
  Navigation  

}
}
</script>
<style>
</style>