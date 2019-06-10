<template>
    <div>
        <!-- Movies will go here -->
        <div id="container">
            <!-- <span @mouseleave="getMovies" class="container" v-for="m in movies" v-bind:key="m.id"  -->
            <div class="movielist" v-for="m in movies" v-bind:key="m.id">
                <img :src="m.poster_path">
                
                <div class="details">
                    <h2 id="title"> {{m.title}}</h2>
                    <a>Release Date: {{m.release_date}}</a>
                </div>
            </div> <!-- {{m.overview}} -->
        </div>

    </div>
    
</template>

<script>
export default {
    //props:
    data() {
        //movies = [];
        iurl: "https://image.tmdb.org/t/p/w185";
        return {
            movies: [
                {id: 458156, title:  "John Wick: Chapter 3 – Parabellum" , release_date: "2019-05-15", poster_path: "https://image.tmdb.org/t/p/w185/ziEuG1essDuWuC5lpWUaw1uXY2O.jpg"},
                {id: 420817, title:  "Aladdin" , release_date: "2019-05-15", poster_path: "https://image.tmdb.org/t/p/w185/3iYQTLGoy7QnjcUYRJy4YrAgGvp.jpg"}
            ]
            
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

/* .details {
    display: grid;
    flex-direction: row;
    float: right;
    width: 300px;
    word-wrap: wrap;
    grid-column-start: 2;
    align-content: space-around;
    border: 2px solid black;
    position: relative;
    margin: 2px;
} */

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
    float: top right;
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
