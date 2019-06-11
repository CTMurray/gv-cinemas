<template>
    <div>
        <div id="user">
            <label for="name" align="left">Name</label><br>
            <input type="text" v-model.trim="name" placeholder="Enter Name"> 
             <br>
            <label for="dob" align="left">DOB</label><br>
            <input type="text" v-model.trim="DOB" placeholder="mm/dd/yyyy"  >
             <br>
        </div>
        <br>

        <div id="genre">
            <input type="checkbox" id="animation" value="Animation" v-model="userData">
            <label for="animation">Animation</label>
            <input type="checkbox" id="comedy" value="Comedy" v-model="userData">
            <label for="comedy">Comedy</label>
            <input type="checkbox" id="crime" value="Crime" v-model="userData">
            <label for="crime">Crime</label>
            <input type="checkbox" id="documentary" value="Documentary" v-model="userData">
            <label for="documentary">Documentary</label>
            <input type="checkbox" id="drama" value="Drama" v-model="userData">
            <label for="drama">Drama</label>
            <input type="checkbox" id="horror" value="Horror" v-model="userData">
            <label for="horror">Crime</label>
            <br><br>

            <button >Submit</button>
        </div>



    </div>
</template>

<script>
export default {
    data() {
        return {
            userData: [],
            name: "",
            DOB: ""

        }
    },
    methods: {
        //submit to firebase create profile table
        //to display on right side of movie page
        submit: function() {

        }

    }

}
</script scoped>

#user {
    
    display: grid;
    border-radius: 10px;
    border: 2px solid gray;
    padding: 10px; 
    width: 400px;
    height: 350px;

}

<style>

</style>
