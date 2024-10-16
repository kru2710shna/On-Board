const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://user_1:Z952bHZuGqLAQNla@cluster0.efzi6.mongodb.net/On-Board";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectToMongo;
