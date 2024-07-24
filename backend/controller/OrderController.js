import Order from "../models/Order.js";

export const order = async (req,res)=>{
    let data = req.body.order_data;
    await data.splice(0,0,{Order_date:req.body.order_date});
    
    let eId = await Order.findOne({"email": req.body.email});
    
    if(eId === null){
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(()=>{
                res.json({success: true})
            })
        } catch (error) {
            console.log(error);
            res.send("Server error", error)
        }
    }else{
        try {
            await Order.findOneAndUpdate({email: req.body.email},
                { $push:{order_data:data}}).then(()=>{
                    res.json({success: true})
                })
        } catch (error) {
            res.send("Server error", error)
        }
    }
}

export const myorder = async (req,res)=>{
    try {
        let myData = await Order.findOne({'email':req.body.email});
        res.status(200).json(myData)
        console.log(myData)
    } catch (error) {
        res.send("Server error", error)
    }
}