import mongoose from "mongoose";

const dbUrl = process.env.DB_URL;

const gracefulExit = function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection with DB : is disconnected through app termination');
        process.exit(0);
    });
}

async function connectDb() {

    mongoose.connection.on("connected", function(ref) {
        console.log("Connected to DB!");
    });

    // If the connection throws an error
    mongoose.connection.on("error", function(err) {
        console.error('Failed to connect to DB on startup ', err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection to DB : disconnected');
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

    if (dbUrl) {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
    } else {
        console.error('Pass DB Url to env variables');
    }

}

export {
    connectDb
}
