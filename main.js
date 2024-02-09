import mongoose, { connect } from "mongoose";
const res = await connect("mongodb://localhost:27017/AlexanderLindgren")
import prompt from "prompt-sync";
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

        let x = allmovies.length;
        console.log(allmovies[allmovies.length-1]);
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




    console.log("Update a movie (Update title, director or release date)");
    let UpdateCollection = p("choose what you want to update\n 1. title \n 2. director \n 3. release date\n 4. go Back\n choose wisely: ")

        let original = p("write down what the original title you want to change: ")
        let updatechange = p("write down the title should be ")


    if (UpdateCollection == 1) {
        console.log("title");
       
        let findAddedMovie = await moviesModel.findOne({ title: original } )
        let s = await moviesModel.updateOne({_id: findAddedMovie._id}, { title: updatechange })
      
      
    }
    else if (UpdateCollection == 2) {
        console.log("director");

        

        let findAddedMovie = await moviesModel.findOne({ director: original } )
        let s = await moviesModel.updateOne({_id: findAddedMovie._id}, { director: updatechange })
    }
    else if (UpdateCollection == 3) {
        console.log("release date ");
        

        let findAddedMovie = await moviesModel.findOne({ releaseYear: original } )
        let s = await moviesModel.updateOne({_id: findAddedMovie._id}, { releaseYear: updatechange })
    }
    
    else {
        console.log("testta");
    }
}

    
    else if (input == 4) {
      
        let chooseElement2 = p("write down title so you can delete it")
        let movieToDelete = await moviesModel.findOne({ title : chooseElement2})
        let result = await moviesModel.deleteOne({_id: movieToDelete})
    }
    else if (input == 5) {
        
        appActive = false
    }
else{
    console.log("wrong");
}
}