const router = require('express').Router()
const KEY = process.env.STRIPE_KEY
const stripe = require('stripe')(KEY)

router.post("/payment", async(req, res) => {
    console.log("You react here")
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd"
        }, 
        (stripeErr, stripeRes) => {
            if(stripeErr) {
                console.log(stripeErr)
                res.status(500).json(stripeErr)
            }else{
                res.status(200).json(stripeRes)
            }
        })

    // try {
    //     const { tokenId, amount } = req.body;
    //     const charge = await stripe.charges.create({
    //         source: tokenId,
    //         amount: amount,
    //         currency: "usd"
    //     });
    //     res.status(200).json(charge);
    // } catch (error) {
    //     console.error("Error processing payment:", error);
    //     res.status(500).json({ error: "Payment processing failed" });
    // }
})

module.exports = router;