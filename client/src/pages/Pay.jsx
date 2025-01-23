import { useEffect } from 'react'
import { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const KEY = "pk_test_51OuKXMRxZrOWOJ2KXMs2Ada9VCaJreYKGr0HZgQGxelQJX2QaOsO10mDKCs1i8Q9ENBygBr91Ge52gsmwO3wBXhl00AgbBP8lr"

export default function Pay() {
    const navigate = useNavigate(); 

    const [stripeToken, setStripeToken] = useState(null)

    const onToken = (token) => {
       setStripeToken(token)
    }

    useEffect(() => {
        const makeRequest = async() => {
            try{
                if(stripeToken){
                    const res = await axios.post(
                        "http://localhost:8080/api/checkout/payment", 
                        {
                            tokenId: stripeToken.id,
                            amount: 2000
                        }
                    )
                    console.log(res.data)     
                    navigate('/success')     
                }else{
                    console.log("Stripe token is null")
                }

            }catch(err){
                console.log(err)
            }
        }
        if(stripeToken) makeRequest()
    }, [stripeToken, navigate])

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            {KEY}
            { stripeToken ? (<span>Processing. Please wait...</span>) : (
                 <StripeCheckout 
                    name="Kusi Shop" 
                    image="http://avatars.githubusercontent.com/u/1486366?v=4"
                    billingAddress
                    shippingAddress
                    description='Your total is $20'
                    amount={2000}
                    token={onToken}
                    stripeKey={KEY}
                >
                 <button
                     style={{
                         border: "none",
                         width: 120,
                         borderRadius: 5,
                         padding: "20px",
                         backgroundColor: "black",
                         color: "white",
                         fontWeight: "600",
                         cursor: "pointer"
                     }}
                 >
                     Pay Now
                 </button>
             </StripeCheckout>
            )}
           
        </div>
    )
}
