import mongoose, { connect } from "mongoose";
const res = await connect("mongodb://localhost:27017/AlexanderLindgren")
import prompt from "prompt-sync"
const { db } = mongoose.connection;
const moviesSchema = mongoose.Schema({
    title: { type: String },
    director: { type: String },
    releaseYear: { type: Number },
    genres: { type: [String] },
    ratings: { type: [Number] },
    cast: { type: [String] }
});

const moviesModel = mongoose.model("movies", moviesSchema)
const moviesCol = await db.collection("movies");



let appActive = true;
const p = prompt();
let pressedWrongToOften = 0;

while (appActive) {

    let input = p("choose between 1 to 5")
    if (input == 1) {
        console.log("-------View all movies------");
        let allmovies = await moviesModel.find({})
        console.log(allmovies);
        console.log("\n-------End of all movies------\n");

    }
    else if (input == 2) {

        console.log("Add a new movie");
        const chooseTitle = p("Choose the title of the move: ");
        const chooseDirector = p("write down director name");
        const chooseReleaseYear = p("Choose the year of the move: ");
        const genres = p("Choose the year of the move: ");
        const chooseRatings = p("write down rating name");
        const chooseCast = p("write down cast name");



        moviesCol.insertOne({
            title: chooseTitle,
            director: chooseDirector,
            releaseYear: chooseReleaseYear,
            genres: genres,
            ratings: chooseRatings,
            cast: chooseCast

        })
        console.log(chooseTitle, chooseDirector, chooseReleaseYear, genres, chooseRatings);

        let findAddedMovie = await moviesModel.find({ title: chooseTitle })
        console.log(findAddedMovie);
    }
    else if (input == 3) {
console.log("-----------------------------1111--------------------------");
    let UpdateCollection = p("How do you want get your wished collection. By: \n ..1 title\n.2 director\n.3 releaseYear\n")
    let chooseElement = p("write down the title/director or  release year to change the collection by the chose you made before")
   
    // let updatetitle = p("update title");
    // let updatetitle = p("update title");
    // let updatetitle = p("update title");
    
        if (UpdateCollection == 1){
            
            let cartoupdate = await moviesModel.findOne({title: chooseElement}) 
            console.log(cartoupdate);
 let updatetitle = p("update title");
    let updatedirector = p("update director");
    let updatereleaseYear = p("update releaseYear");

            console.log("-----------------------------222--------------------------");
            let result1 = await moviesModel.updateOne({_id: cartoupdate._id} ,{ title: updatetitle});
            let result2 = await moviesModel.updateOne({_id: cartoupdate._id} ,{ director: updatedirector})
            let result3 =await moviesModel.updateOne({_id: cartoupdate._id} ,{ releaseYear: updatereleaseYear})
        // let result4= await moviesModel.updateOne({_id: cartoupdate._id} ,{ genres: "kaka"})
        // let result5= await moviesModel.updateOne({_id: cartoupdate._id} ,{ ratings: "kaka"})
        // let result6 =await moviesModel.updateOne({_id: cartoupdate._id} ,{ cast:"kaka"})

        console.log("-----------------------------33--------------------------");


        }
        else if (UpdateCollection == 2){
            let cartoupdate = await moviesModel.findOne({title: "55"}) 
            console.log(cartoupdate);
            let result = await moviesModel.updateOne({_id: cartoupdate._id} ,{ director: "kaka"})        }
        else if (UpdateCollection == 3){
            let cartoupdate = await moviesModel.findOne({title: "55"}) 
            console.log(cartoupdate);
            let result = await moviesModel.updateOne({_id: cartoupdate._id} ,{ director: "kaka"})        }

    }
    else if (input == 4) {
      
        let chooseElement2 = p("write down title so you can delete it")
        let movieToDelete = await moviesModel.findOne({ title : chooseElement2})
        let result = await moviesModel.deleteOne({_id: movieToDelete})
    }
    else if (input == 5) {
        
        appActive = false
    }

}


// let activeUpdate = true;

// while (activeUpdate) {
//     console.log("Update a movie (Update title, director or release date)");
//     let UpdateCollection = p("choose what you want to update\n 1. title \n 2. director \n 3. release date\n 4. go Back\n choose wisely: ")




//     if (UpdateCollection == 1) {
//         console.log("title");
//         let originalTitle = p("write down what the original title you want to change: ")
//         let updatechangeTitle = p("write down the title should be ")
//         let findAddedMovie = await moviesModel.find({ title: originalTitle }, { title: updatechangeTitle })
//         console.log(findAddedMovie);
//     }
//     else if (UpdateCollection == 2) {
//         console.log("director");
//         let originalDirector = p("write down what the original title, director or release date that you want to change: ")
//         let updatechangeDirector = p("wirte down what the original title, director or release date that you want to change: ")
//         let findAddedMovie = await moviesModel.find({ director: originalDirector }, { director: updatechangeDirector })
//         console.log(findAddedMovie);
        
//     }
//     else if (UpdateCollection == 3) {
//         console.log("release date ");
//         let originalReleaseDate = p("write down what the original title, director or release date that you want to change: ")
//         let updatechangeReleaseDate = p("wirte down what the original title, director or release date that you want to change: ")
//         let findAddedMovie = await moviesModel.find({ releaseYear: originalReleaseDate }, { releaseYear: updatechangeReleaseDate })
//         console.log(findAddedMovie);
//     }
//     else if (UpdateCollection == 4) {
//         console.log("go back");
//         activeUpdate = false
//     }
//     else {
//         console.log("testta");
//     }
// }

      



// console.log("Update a movie (Update title, director or release date)");
// let UpdateCollection = p("choose what you want to update\n 1. title \n 2. director \n 3. release date\n choose wisely: ")


//     let original = p("write down what the original title you want to change: ")
//     let updateChange = p("write down the title should be ")

// if (UpdateCollection == 1) {
//     console.log("title");
//     let findAddedMovie = await moviesModel.findOne({ title: original })
//     console.log(findAddedMovie);
//     let result = await moviesModel.updateOne({_id: findAddedMovie._id}, {title: updateChange})
//     console.log(result);


  
// }
// else if (UpdateCollection == 2) {
//     console.log("director");
//     let findAddedMovie = await moviesModel.findOne({ director: original })
//     console.log(findAddedMovie);
//     moviesModel.updateOne({_id: findAddedMovie._id}, {director: updateChange})
// }
// else if (UpdateCollection == 3) {
//     console.log("release date ")
//     let findAddedMovie = await moviesModel.findOne({ releaseYear: original })
//     console.log(findAddedMovie);
//     moviesModel.updateOne({_id: findAddedMovie._id}, {releaseYear: updateChange})
// }




// let UpdateCollection = p("How do you want get your wished collection. By: \n ..1 title\n.2 director\n.3 releaseYear\n")
//         let x;
//         if (UpdateCollection == 1){
//             x = "title"
//         }
//         else if (UpdateCollection == 2){
//             x = "director"
//         }
//         else if (UpdateCollection == 3){
//             x = "releaseYear"
//         }
//         console.log(x);
//     let cartoupdate = await moviesModel.findOne({director: "d"}) 
//       console.log(cartoupdate);
//       let result = await moviesModel.updateOne({x: cartoupdate.x} ,{ x: "kaka"})
//       console.log(result);
//       let a = await moviesModel.findOne({director: "d"}) 
//       console.log(a);

//         console.log("tes");


// const shutdown = p("Are you sure to you want to exit everything will reset if you start again. (yes or no) ")
//         if (shutdown == "yes") {
//             console.log("- - - - - - - - -");
//             console.log("      Exit");
//             console.log("- - - - - - - - -");
           
//         }

//         else if (shutdown == "no") {
//             console.log(
//                 "nice to know you want to be still here:)"
//             );
//         }