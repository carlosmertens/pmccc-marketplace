import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
    user: {   
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true
    }
})

const orderModel = mongoose.model("Orders", OrderSchema);

export default orderModel;