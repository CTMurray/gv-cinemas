<template>
    <div>
        <!-- Movies will go here -->
        <div id="container">
            <!-- <span @mouseleave="getMovies" class="container" v-for="m in movies" v-bind:key="m.id"  -->
            <div class="movielist" v-for="m in movies" v-bind:key="m.id">
                <img :src="m.poster_path">
                
                <div class="details">
                    <table>
                        <th id="title"> {{m.title}}</th>
                        <tr><a>Release Date: {{m.release_date}}</a></tr>
                        <tr>
                            <label> {{m.mvReservation}} Spots Remaining </label>
                            <button v-on:click="subtract(m)">Reserve</button>
                        </tr>
                    </table>
                </div>
                
            </div> <!-- {{m.overview}} -->
        </div>

    </div>
    
</template>

<script>
import { MYDB } from "../myFirebaseInit";
export default {
    
    data() {
        //movies = [];
        iurl: "https://image.tmdb.org/t/p/w185";
        return {
            movies: [],
        }
    },

//don't need watch yet
// watch: {
//     movies: function (newVal, oldVal) {
//     //url to obtain 
//         let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=1018aeb5095f005f4feaa53d9169e7c8&language=en-US&page=1`;
       
//         fetch(url)
//         .then(r => r.json())
//         .then(d => {
//             //this.movies.push(`{{d.results.title}}`, `{{d.results.release_date}}`, `{{d.results.title}}`)
//             this.movies = d.results;
//             console.log(this.movies);
//         });
//     }


//     },

    

methods: {
    getMovies() {
        //url to obtain 
        let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=1018aeb5095f005f4feaa53d9169e7c8&language=en-US&page=1`;

        fetch(url)
        .then(r => r.json())
        .then(d => {
            //this.movies.push(`{{d.results.title}}`, `{{d.results.release_date}}`, `{{d.results.title}}`)
            this.movies = d.results;
        });
    },
    //convert to v-for
    modPoster: function (movies){
        var iurl = "https://image.tmdb.org/t/p/w185";
        for(let i = 0; i < movies.length; i++ ){
            movies[i].poster_path = iurl + movies[i].poster_path;
        }
        
        for(let i = 0; i < movies.length; i++ ){
            movies[i].mvReservation = 30;
        }

    },

    subtract(m){
        console.log(m);
        m.mvReservation -= 1;
        console.log(m);
        // return m;
    }

},
created() {
     //url to obtain 
        let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=1018aeb5095f005f4feaa53d9169e7c8&language=en-US&page=1`;

        //let iurl = "https://image.tmdb.org/t/p/w185";

        fetch(url)
        .then(r => r.json())
        .then(d => {

            //this.movies.push(d.results.id,d.results.title, d.results.release_date, d.results.poster_path = iurl + d.results.poster_path);
           
            this.movies = d.results;
            // works to build the poster path
            this.modPoster(this.movies);
            
        });
        
    }
};
</script>

<style>

body {
    background-color: aliceblue;
}
#container {
    background-color: aliceblue;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    justify-items: start;
    word-wrap: wrap;
}
.movielist {
    border-collapse: separate;
    float: left;
    padding-bottom: 50px;
}
#title {
    float: left;
}
/* h2 + p {
    float: right;
    word-wrap: normal;
} */

.details{
    float: right;
    padding: 25px;
}

</style>
