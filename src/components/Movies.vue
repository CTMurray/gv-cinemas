<template>
    <div>
        <!-- Movies will go here -->
        <div id="container">
            <!-- <span @mouseleave="getMovies" class="container" v-for="m in movies" v-bind:key="m.id"  -->
            <div class="movielist" v-for="mo in movies" v-bind:key="mo.id"> 
                <img :src="mo.poster_path"> 
                <div class="details"> 
                    <h2> {{mo.title}}</h2> <b>Release Date {{mo.release_date}} </b>
                    <div class="times" v-for="t in mo.movieTimes" v-bind:key="t.id">
                        {{t}}
                    </div>
                    
                     <!-- <div class="times" id="id++" v-for="m in movieTimes" @click ="reserve(m.id)" v-bind:key="m.id" 
                       >{{m.time}} </div> -->
                </div> 
            
            </div> 

            <!-- {{m.overview}} -->

        </div>

    </div>
    
</template>

<script>
export default {
    //props:
    data() {
        id: 0


        movieTimes: [
            {time: "12:00 PM", seats: 30, id: 0}, 
            {time: "3:00 PM", seats: 30, id: 1}, 
            {time: "6:00 PM", seats: 30, id: 2}, 
            {time: "9:00 PM", seats: 30, id: 3},
        ]

        //movies = [];
        iurl: "https://image.tmdb.org/t/p/w185";
        return {
            movies: [
                {id: 458156, title:  "John Wick: Chapter 3 – Parabellum" , release_date: "2019-05-15", poster_path: "https://image.tmdb.org/t/p/w185/ziEuG1essDuWuC5lpWUaw1uXY2O.jpg"},
                {id: 420817, title:  "Aladdin" , release_date: "2019-05-15", poster_path: "https://image.tmdb.org/t/p/w185/3iYQTLGoy7QnjcUYRJy4YrAgGvp.jpg"}
            ],

            movieTimes: [
            {time: "12:00 PM", seats: 30}, 
            {time: "3:00 PM", seats: 30}, 
            {time: "6:00 PM", seats: 30}, 
            {time: "9:00 PM", seats: 30},
        ],
        id: 0
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
            //var merged = [].concat.apply([], arr);
            rData =  d.results.concat.apply((movieTimes));
            this.movies = rData; //(d.results.push({...movieTimes}));
        });
    },
    //convert to v-for
    modPoster: function (movies){
        var iurl = "https://image.tmdb.org/t/p/w185";
        for(let i = 0; i < movies.length; i++ ){
            movies[i].poster_path = iurl + movies[i].poster_path;
        }
        //add 30 spots for movie theater
        for(let i = 0; i < movies.length; i++ ){
            movies[i].mvReservation = 30;
            movies[i].movieTimes = { time1: "12:00 PM", time2: "3:00 PM", time3: "6:00 PM", time4: "9:00 PM" };
        }


    },
    reserve: function(id) {

        // console.log("The current seats are:" + this.movieTimes.seats);
        console.log("The current id is:" + this.id);

    },

    mouseOver: function() {
        

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

<style scoped>

.times {
    display: flex;
    justify-content: space-around;
    width: 80px;
    border-collapse: separate;
    background-color: lightskyblue;

    border: 1px solid black;
    padding: 3px;
    margin-left: 0.5rem;
    user-select: none;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: white;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.3);
    white-space: nowrap;
}

/* .times:hover {
    
} */

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
span + img {
    border-collapse: separate;
    float: left;
    margin: 2px;
}
img + h2 {
    float: right;
    align-content: left;
}
h2 + p {
    float: right;
    word-wrap: normal;
}

.details {
    display: flex;
    flex-direction: column;
    float: right;
    justify-content: space-between;
    text-align: left;
    /* border: 1px solid green; */
    
        
    
}

</style>
