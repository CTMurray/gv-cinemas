<template >
   <div>
       <v-container id="container">
           <v-layout class="movielist" v-for="mo in movies" v-bind:key="mo.id"> 
                <img :src="mo.poster_path"> 
                    <!-- <template v-slot:activator="{ on }"> -->
                    <v-layout class="details" > 
                        <h2> {{mo.title}}</h2> <b>Release Date {{mo.release_date}} </b> 
                        <!-- <b> Movie ID {{mo.id}} </b> -->
                        <div  class="times" v-for="(t, index) in mo.sessions"  v-bind:key="index" >
                              <!-- <v-btn color="primary" >  {{t.time}} </v-btn> @click="reserve(`${t.time}`, `${t.reservation-=1}`, `${index}`, `${mo.title}` )"-->
                        
                        <v-menu bottom offset-y>
                            <template v-slot:activator="{ on }">
                            <v-btn v-on="on">{{t.time}}</v-btn>
                            </template>
                            <v-list >
                            <v-list-tile  v-for="(day, i) in days" :key="i" 
                            @click="reserve(`${t.time}`, `${t.reservation-=1}`, `${index}`, `${mo.title}`, `${day.title}` )">
                                <v-list-tile-title>{{ day.title }}</v-list-tile-title>
                            </v-list-tile>
                            </v-list>
                        </v-menu>

                        <!-- <v-tooltip right > -->
                            <!-- <template v-slot:activator="{ on }"  -->
                            <!-- <v-btn >Reserve</v-btn> -->
                                    <!-- {{t.time}}  -->
                                    
                            <!-- </template> -->
                        <!-- <span > Reservation </span> -->
                        
                            
                        <!-- </v-tooltip> -->
                        </div>

                        <!-- <v-flex class="button"> -->
                        <!-- <v-btn @click="reserve " small round color="success">Reserve</v-btn> -->
                        <!-- </v-flex> -->
                    </v-layout>
           </v-layout>
       </v-container>



   </div> 
  
</template>

<script>
    import { MYDB } from "../myFirebaseInit";
    import firebase from '@firebase/app';
    require('firebase/auth');


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
            hover: false,
            movies: [
                {id: 458156, title:  "John Wick: Chapter 3 – Parabellum" , release_date: "2019-05-15", poster_path: "https://image.tmdb.org/t/p/w185/ziEuG1essDuWuC5lpWUaw1uXY2O.jpg", sessions:[]},
                {id: 420817, title:  "Aladdin" , release_date: "2019-05-15", poster_path: "https://image.tmdb.org/t/p/w185/3iYQTLGoy7QnjcUYRJy4YrAgGvp.jpg", sessions:[] }
            ],

            movieTimes: [
            {time: "12:00 PM", seats: 30}, 
            {time: "3:00 PM", seats: 30}, 
            {time: "6:00 PM", seats: 30}, 
            {time: "9:00 PM", seats: 30},
        ],
        id: 0,
        

        days: [
          {
            title: 'saturday'
          },
          {
            title: 'sunday'
          },
        //   {
        //     title: 'Click Me'
        //   },
        //   {
        //     title: 'Click Me 2'
        //   }
        ],
        
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
            //movies[i].movieTimes = { time1: "12:00 PM", time2: "3:00 PM", time3: "6:00 PM", time4: "9:00 PM" };
            movies[i].sessions = [
                {time: "12:00 PM", reservation: 30},
                {time: "3:00 PM",  reservation: 30},
                {time: "6:00 PM",  reservation: 30},
                {time: "9:00 PM",  reservation: 30},
            ];
        }


    },
    reserve: function(time, reservation, index, title, day) {

        let count = 0;
        // let sunCount = 0;
        let currentUser = firebase.auth().currentUser.email;   

        // let queryc = MYDB.ref("reservation/saturday");
        // queryc.transaction(function(currentData) {
        //     if (currentData.movie === title && currentData.time === time) {
        //         return { movie: title, time: time, user: currentUser };
        //     } else {
        //         console.log('failed.');
        //         return; // Abort the transaction.
        //     }
        // }, function(error, committed, snapshot) {
        //     if (error) {
        //         console.log('Transaction failed abnormally!', error);
        //     } else if (!committed) {
        //         console.log('We aborted the transaction ' + currentData);
        //     } else {
        //         console.log('Reservation added!');
        //     }
        //     console.log("Reservation data: ", snapshot.val());
        //     });




        if(day !== null){

            var queryb = MYDB.ref("reservation/" + day)   //orderByKey().limitToFirst(20);
            queryb.on("value", (snapshot) =>{

                var cData = snapshot.val();
                 Object.keys(cData).forEach((item) => {
                    //console.log(item); // key
                    //console.log(cData[item].movie); // value

                    //correlates the selection of a day and time counts the reservations
                    //if there are not enough don't process reservation
                    if((cData[item].movie == title) && (cData[item].time == time )) {
                        count+=1;  
                        
                    }

                    //are there spots available?
                    if(count < 2) {  
                        
                            //push reservation to firebase for specific day
                            MYDB.ref("reservation/" + day).push().set({
                            movie: title, 
                            time: time, 
                            user: currentUser
                            });

                            alert("Reservation successful for " + firebase.auth().currentUser.email);
                            return true;
                           

                        } else {
                            alert("Reservation are full for " + title);
                            return true;
                            
                        }
                       

                    });
                    

                    queryb.off("value");
                        
                                    


                //});
                //console.log("satCount is: " + count);
                console.log("===========================");


            //console.log(snapshot.val());
            //}
            // }, function (errorObject) {
            // console.log("The read failed: " + errorObject.code);
             });
            //queryb.off("value");

            // Loop through users in order with the forEach() method. The callback
            // provided to forEach() will be called synchronously with a DataSnapshot
            // for each child:

            // var query = MYDB.ref("reservation/saturday").orderByChild("saturday/movie");   //orderByKey();
            // query.once("value")
            // .then(function(snapshot) {
            //     snapshot.forEach(function(childSnapshot) {
            //     // key will be "ada" the first time and "alan" the second time
            //     var key = childSnapshot.key;
            //     // childData will be the actual contents of the child
            //     var childData = childSnapshot.val();

                //prints only one record
                // Object.keys(childData).forEach(function (item) {
                //     console.log(item); // key
                //     console.log(childData[item]); // value
                // });

           
            //    console.log("child data is: " + childData.time);
            //    console.log("satCount is: " + satCount);

                // if(childData.movie == title && childData.time == time ) {
                //     satCount+=1;
                //     if(satCount < 1) {
                //         //push reservation to firebase for specific day
                //         MYDB.ref("reservation/" + day).push().set({
                //         movie: title, 
                //         time: time, 
                //         user: currentUser
                //         });

                //         alert("Reservation successful for " + firebase.auth().currentUser.email);
                //         return true;

                //     }
                //     else {
                //         alert("Reservation are full for " + title);
                //         return true;
                //     }
                // } else {
                //         alert("Reservation are full for " + title);
                //         return true;
                //     }

                


            // });
            // });


            

        }

        // if(day == "sunday") {

        // }
        // confirm('Your message')
        // .then(result => {
        //     console.log(result);
        // });

        // let currentUser = firebase.auth().currentUser.email;

        // alert("Reservation created " + reservation + " are left!");

        // console.log("The current user is: " + this.firebase.auth().currentUser);
        // console.log("The current time is: " + time);
        // console.log("The current seats are: " + reservation);
        // console.log("Day is: " + day);
        // console.log("Title is: " + title);
        // console.log("user id is: " + firebase.auth().currentUser.email);

        //push reservation to firebase
        // MYDB.ref("reservation").push().set({
        //     movie: title, 
        //     time: time, 
        //     user: currentUser
        //     });


            //push reservation to firebase for specific day
            // MYDB.ref("reservation/" + day).push().set({
            // movie: title, 
            // time: time, 
            // user: currentUser
            // });
        

    },

    // mouseOver: function() {
        

    // }



},
created() {
     //url to obtain 
        let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=1018aeb5095f005f4feaa53d9169e7c8&language=en-US&page=1`;

        //let iurl = "https://image.tmdb.org/t/p/w185";

        fetch(url)
        .then(r => r.json())
        .then(d => {

            //this.movies.push(d.results.id,d.results.title, d.results.release_date, d.results.poster_path = iurl + d.results.poster_path);
           
           // works to build the poster path
            this.modPoster(d.results);

            this.movies = d.results;
            // works to build the poster path
            // this.modPoster(this.movies);
            
        });
        
    }

};
</script>

<style scoped>

.button {
    width:30%;
}

 /* .times:hover {
     background: red;
    
} */

.times {
    display: flex;
    justify-content: space-around;
    width: 80px;
    border-collapse: separate;
    /* background-color: lightskyblue; */

    /* border: 1px solid black; */
    padding: 3px;
    margin-left: 0.5rem;
    user-select: none;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: white;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.3);
    white-space: nowrap;
    /* grid-gap: 2px; */
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
