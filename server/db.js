import mongoose from 'mongoose';

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connectToMongo; // Use export default for ES module syntax
