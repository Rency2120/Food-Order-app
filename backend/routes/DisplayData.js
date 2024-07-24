import express from 'express';
const router = express.Router();

router.post('/foodData', (req,res)=>{
    try {

        res.send([global.fooditems, global.foodcategory]) 
    } catch (error) {
        console.log(error);
        res.send("server error")
    }

})
export default router;