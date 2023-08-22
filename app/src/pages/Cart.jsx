import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { saveCart } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Success = styled.span`
  color: green;
`;

const Error = styled.span`
  color: red;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Link_a = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
  font-color: black;
  color:black
`;


const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const pedido = useSelector((state) => state.pedido);
  const usuario = useSelector((state) => state.user.currentUser.id);
  

  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const onToken = (token) => {  
    setStripeToken(token);
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log({...cart, userId : usuario }, 'MEU CART')
    saveCart(dispatch, {...cart, userId : usuario });
  }

  useEffect(() => {
    const makeRequest = async () => {
      console.log(stripeToken.id)
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
          pedido : pedido.numeroPedido
        });

        history.push("/listorders", {
          stripeData: res.data,
          products: cart, });
      } catch {
        console.log('erro 1');
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>SEU PENAL</Title>
        <Top>
          <TopButton>
          <Link to="/">
            <Link_a>
              CONTINUE SUA BUSCA
            </Link_a>
            </Link>
          </TopButton>
          <TopTexts>
            <TopText>Seu penal contem {cart.quantity} caneta(s)</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
          {cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.imagem} />
                  <Details>
                    <ProductName>
                      <b>Produto:</b> {product.nome}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product.id}
                    </ProductId>
                    <ProductColor color={product.color} />
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <ProductAmount> quantidade :  {product.quantity}</ProductAmount>
                  </ProductAmountContainer>
                  <ProductPrice>
                    R$ { product.preco * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>Resumo do Pedido</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>R$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Quantidade de itens na cesta</SummaryItemText>
              <SummaryItemPrice>{cart.quantity}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>R$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={handleClick}>FAZER PEDIDO</Button>
            {cart.success && <Success> Cadastrado com sucesso </Success>}
            {cart.error && <Error> Houve um erro... </Error>}
            <StripeCheckout
              name="PENAPP"
              image="https://img.freepik.com/fotos-premium/linda-caneta-tinteiro_309761-528.jpg"
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
            <Button>FINALIZAR COMPRA</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
