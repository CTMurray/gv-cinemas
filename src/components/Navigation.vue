<template>
  <div>
    <h2>Nav Bar</h2> <!--remember to remove h2 tag and text--->
    <nav>
      <router-link class="spacing" v-for="routes in links" 
      v-bind:key="routes.id"
      :to="`${routes.page}`">{{routes.text}}</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
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
          id: 0,
          text: 'Login',
          page:'/Login'
        }
      ]
    }
  }
}
</script>
<style  scoped> 
  .spacing { 
    Margin-right: 10px; 
  } 
</style>