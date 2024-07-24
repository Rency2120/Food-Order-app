import mongoose from 'mongoose';

const connectToMongodb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected");
        try {
            const fetched_data = await mongoose.connection.db.collection("fooditems").find({}).toArray();
            global.fooditems= fetched_data;
            
            const fetched_category = await mongoose.connection.db.collection("foodcategory").find({}).toArray();
            global.foodcategory= fetched_category;
            // console.log(global.foodcategory)
        } catch (err) {
            console.log("Error in fetching", err);
        }


    } catch (error) {
        console.log("Error connecting to mongodb", error)
    }
};

export default connectToMongodb;