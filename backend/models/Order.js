import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    order_data:{
        type:Array,
        required:true
    }
})

const Order = new mongoose.model("Order", orderSchema);

export default Order;