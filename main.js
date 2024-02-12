import { error } from "console";
import mongoose, { connect } from "mongoose";
import { title } from "process";
const res = await connect("mongodb://localhost:27017/AlexanderLindgren");
import prompt from "prompt-sync";
const { db } = mongoose.connection;
const moviesSchema = mongoose.Schema({
    title: { type: String },
    director: { type: String },
    releaseYear: { type: Number },
    genres: { type: [String] },
    ratings: { type: [Number] },
    cast: { type: [String] },
});

const moviesModel = mongoose.model("movies", moviesSchema);
const moviesCol = await db.collection("movies");

let appActive = true;
const p = prompt();

try {
    start();
} catch (error) {
    console.error(error);
    start();
}
async function start() {
    while (appActive) {
        console.log(
            "\n 1. View all movies \n 2. Add a new movie \n 3. Update a movie \n 4. Delete a movie \n 5. Exit"
        );
        let input = p("Make a choice by entering a number: ");

        // printing out all the movies

        if (input == "1") {
            console.log("-------View all movies------");
            let allMovies = await moviesModel.find({});

            allMovies.forEach((movie, index) => {
                // if (movie.title && movie.director && movie.releaseYear && movie.genres && movie.releaseYear && movie.genres)
                console.log(
                    index +
                    1 +
                    ".\n" +
                    "Title: " +
                    movie.title +
                    "\n" +
                    "director: " +
                    movie.director +
                    "\n" +
                    "releaseYear: " +
                    (movie.releaseYear ? movie.releaseYear : "") +
                    "\n" +
                    "Genres: " +
                    (movie.genres ? movie.genres.join(", ") : "") +
                    "\n" +
                    "ratings: " +
                    (movie.ratings ? movie.ratings.join(", ") : "") +
                    "\n" +
                    "cast: " +
                    (movie.cast ? movie.cast.join(", ") : "") +
                    "\n" +
                    "-------------------------------------------------------"
                );
            });

            console.log("\n-------End of all movies------\n");

            console.log("Scroll up to see the movies");
        }
        //Adding a new movie
        else if (input == "2") {
            console.log("----Add a new movie----");
            console.log("Here can you add movies");

            const chooseTitle = p(
                "Write the movie title. ex. 'The Lord of the Rings': "
            );
            const chooseDirector = p(
                "Write down director name. ex. 'George Lucas': "
            );
            const chooseReleaseYear = p(
                "Choose the year of the movie. ex. '2024' (use only numbers): "
            );

            const chooseGenres = p(
                "Choose the genres of the movie, ex. crime, drama, Fantasy (write at least one and separated by comma): "
            ); // fix this
            const chooseRatings = p(
                "Write down rating ex. 5,4,3 (Use only numbers separated by comma):"
            ); // fix this
            const chooseCast = p(
                "write down cast name ex. Richard Gere, Laura Linney, Steve Coogan (write down at least one cast member and separated by comma)"
            ); //fix this

            //adding the users content in database
            moviesCol.insertOne({
                title: chooseTitle,
                director: chooseDirector,
                releaseYear: chooseReleaseYear,
                genres: chooseGenres ? chooseGenres.split(",") : [""],
                ratings: chooseRatings ? chooseRatings.split(",") : [""],
                cast: chooseCast ? chooseCast.split(",") : [""],
            });

            console.log("Movie added: ",
                "Title: ",
                chooseTitle + ", ",
                "Director: ",
                chooseDirector + ", ",
                "Release Year: ",
                chooseReleaseYear + ", ",
                "Genres: ",
                chooseGenres + ", ",
                "Ratings: ",
                chooseRatings
            );

        } else if (input == "3") {
            // updateMovie();
            let searchQuery = p(
                "Please enter the name of the movie you want to update: "
            );

            let chosenMovie = await moviesModel.findOne({ title: searchQuery });
            if (chosenMovie) {
                console.log(
                    "\nTitle: " +
                    chosenMovie.title +
                    "\n" +
                    "Director: " +
                    chosenMovie.director +
                    "\n" +
                    "Release year: " +
                    chosenMovie.releaseYear +
                    "\n" +
                    "Genres: " +
                    chosenMovie.genres.join(", ") +
                    "\n" +
                    "Ratings: " +
                    chosenMovie.ratings.join(", ") +
                    "\n" +
                    "Cast: " +
                    chosenMovie.cast.join(", ") +
                    "\n"
                );
                let updateField = p(
                    "What field would you like to update? 1: Title, 2: Director, 3: Release Date, 4:genres, 5:ratings, 6:cast. Choose the corresponding number."
                );

                if (updateField == 1 || updateField == 2 || updateField == 3) {
                    let replacementData = p("What should we replace it with?");

                    if (updateField == "1") {
                        await moviesModel.updateOne(
                            { _id: chosenMovie._id },
                            { title: replacementData }
                        );
                    } else if (updateField === "2") {
                        await moviesModel.updateOne(
                            { _id: chosenMovie._id },
                            { director: replacementData }
                        );
                    } else if (updateField === "3") {
                        await moviesModel.updateOne(
                            { _id: chosenMovie._id },
                            { releaseYear: replacementData }
                        );
                    }
                } else if (updateField == 4 || updateField == 5 || updateField == 6) {
                    console.log("\n ----- In a  Array field -----\n");

                    let AddOrDel = p(
                        "Do you want to add or delete a genre? (press 1 to add or press 2 to delete)"
                    );

                    if (AddOrDel == 1) {
                        console.log("\n -----Adding-----\n");
                        console.log(chosenMovie);
                        let Adding = p(
                            "what do you want to add (Add atleast one or more separated by comma)?"
                        );
                        if (updateField == "4") {
                            await moviesModel.updateOne(
                                { _id: chosenMovie._id },
                                { $push: { genres: Adding } }
                            );
                        } else if (updateField === "5") {
                            await moviesModel.updateOne(
                                { _id: chosenMovie._id },
                                { $push: { ratings: Adding } }
                            );
                        } else if (updateField === "6") {
                            await moviesModel.updateOne(
                                { _id: chosenMovie._id },
                                { $push: { cast: Adding } }
                            );
                        }
                    } else if (AddOrDel == 2) {
                        console.log("\n -----Deleting-----\n");
                        console.log(chosenMovie);

                        if (updateField == "4") {
                            let DeleteOneGenre = p(
                                "What genre do you want to remove? (Write down only one genre in the list to remove it)"
                            );
                            await moviesModel.updateOne(
                                { _id: chosenMovie._id },
                                { $pull: { genres: DeleteOneGenre } }
                            );
                        } else if (updateField == "5") {
                            let DeleteOneRating = p(
                                "What rating do you want to remove? (Write down only one rating in the list to remove it)"
                            );
                            console.log(chosenMovie.genres);
                            await moviesModel.updateOne(
                                { _id: chosenMovie._id },
                                { $pull: { ratings: DeleteOneRating } }
                            );
                        } else if (updateField == "6") {
                            let deletingOneCast = p(
                                "What cast do you want to remove? (Write down only one cast member in the list to remove it)"
                            );
                            await moviesModel.updateOne(
                                { _id: chosenMovie._id },
                                { $pull: { cast: deletingOneCast } }
                            );
                        }
                    }
                } else {
                    console.log("Number is invalid, choose a number between 1-3.");
                }
            } else {
                console.error("\nInvalid input, returning to menu");
            }
        }

        //delete collection that userser choose
        else if (input == "4") {
            let chooseElement2 = p("Write down title so you can delete it: ");
            let movieToDelete = await moviesModel.findOne({ title: chooseElement2 });
            let x = await moviesModel.deleteOne({ _id: movieToDelete });
            if (x.deletedCount === 0) {
                console.log("Nothing deleted");
            } else {
                console.log("Successfully deleted");
            }
        }
        //stop the program
        else if (input == "5") {
            console.log("\n------- Goodbye -------\n");
            appActive = false;
            process.exit();
        } else {
            console.log("You typed wrong");
        }
    }
}
