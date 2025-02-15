import React, { useEffect, useState } from 'react'
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { mobile } from '../responsive';
import { useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from '../requestMethod';
import { useNavigate } from 'react-router-dom';

const KEY = process.env.REACT_APP_STRIPE

const Container = styled.div`

`
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px" })} 
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`
const TopBottom = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "black" : "transparent"};
    color: ${props => props.type === "filled" && "white"};
`

const TopTexts = styled.div`
    ${mobile({ display: "none" })} 
`
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px; 
`
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })} 
`
const Info = styled.div`
    flex: 3;
`      
const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })} 
` 
const ProductDetails = styled.div`
    flex: 2;
    display: flex;
` 
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: "5px 15px" })} 
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px" })} 
`

const Image = styled.img`
    width: 200px;
` 
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
` 
const ProductName = styled.span`

` 
const ProductId = styled.span`

` 
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
` 
const ProductSize = styled.span`

` 
const PriceDetails = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 55vh;
`
const SummaryTitle = styled.h1`
    font-weight: 200;
`
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === "total" && "500"};
    font-size: ${props => props.type === "total" && "24px"};
`
const SummaryItemText = styled.span`
    
`
const SummaryItemPrice = styled.span`
    
`
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`

export default function Cart() {

    const cart = useSelector(state => state.cart)
    const [stripeToken, setStripeToken] = useState(null)
    const navigate = useNavigate()

    

  const onToken = (token) => {
    setStripeToken(token)
  }

  useEffect(() => {
    const makeRequest = async() => {
        try{
            const res = await userRequest.post('/checkout/payment', {
                tokenId: stripeToken.id,
                amount: cart.total * 100,
            })
            navigate("/success", { data: res.data })
        }catch(err){
            console.log(err)
        }
    }
    stripeToken && cart.total >= 1 && makeRequest()
  }, [stripeToken, cart.total, navigate])

  return (
    <Container>
        <Announcement />
        <Navbar />

        <Wrapper>
            <Title>YOUR BAG</Title>
            <Top>
                <TopBottom>CONTINUE SHOPPING</TopBottom>
                <TopTexts>
                    <TopText>Shopping Bag(2)</TopText>
                    <TopText>Your Wishlist(0)</TopText>
                </TopTexts>
                <TopBottom type="filled">CHECKOUT NOW</TopBottom>
            </Top>
            <Bottom>
                <Info>
                {/* {cart?.product?.length > 0 ? (  */}
                
                {cart.products.map((product, index) => (
                    <Product key={index}>
                        <ProductDetails>
                            <Image src={product.img} />
                            <Details>
                                <ProductName><b>Product:</b>{product.title}</ProductName>
                                <ProductId><b>ID:</b>{product._id}</ProductId>
                                <ProductColor color={product.color} />
                                <ProductSize><b>Size:</b>{product.size}</ProductSize>
                            </Details>
                        </ProductDetails>

                        <PriceDetails>
                            <ProductAmountContainer>
                                <AddIcon />
                                <ProductAmount>{product.quantity}</ProductAmount>
                                <RemoveIcon />
                            </ProductAmountContainer>

                            <ProductPrice>{product.price * product.quantity}</ProductPrice>

                        </PriceDetails>
                    </Product>
                )) }
                <Hr />

                </Info>
                <Summary>
                
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemPrice>{cart?.total || 0}</SummaryItemPrice>
                    </SummaryItem>

                    <SummaryItem>
                        <SummaryItemText>Estimated Shipping</SummaryItemText>
                        <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                    </SummaryItem>

                    <SummaryItem>
                        <SummaryItemText>Shipping Discount</SummaryItemText>
                        <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                    </SummaryItem>

                    <SummaryItem type="total">
                        <SummaryItemText>Total</SummaryItemText>
                        <SummaryItemPrice>{cart?.total}</SummaryItemPrice>
                    </SummaryItem>

                    <StripeCheckout 
                        name="Kusi Shop" 
                        image="https://avatars.githubusercontent.com/u/1486366?v=4"
                        billingAddress
                        shippingAddress
                        description={`Your total is $${cart?.total}`}
                        amount={cart?.total * 100}
                        token={onToken}
                        stripeKey={KEY}
                    />
                    <Button>CHECKOUT NOW</Button>
            
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer />
    </Container>
  )
}
