import { useEffect, useState } from "react";
import styled from "styled-components";
import {mobile} from "../responsive";
import { login, saveProduct } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://s1.1zoom.me/b5050/497/Closeup_Ballpoint_pen_526272_1920x1080.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #545454;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link_a = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;
const Success = styled.span`
  color: green;
`;


const AddProducts = () => {
 
  const [produto, setProduto] = useState({
    nome : '',
    descricao : '',
    preco : 0,
    imagem : '',
    categoria : '',
  });
  const dispatch = useDispatch();
  const token = useSelector(state=>state.user.accessToken);
  const succes = useSelector(state=>state.product.success);
  const error = useSelector(state=>state.product.error);

  const handleClick = (e) => {
    e.preventDefault();
    saveProduct(dispatch, produto, token);
  }

useEffect(() => console.log(JSON.stringify(produto)), [produto])
  return (
  <>
    <Navbar />
    <Container>
      <Wrapper>
        <Title>Adicionar Produto</Title>
        <Form>
          <Input 
            placeholder="Nome do produto"
            onChange={(e) => setProduto({...produto, nome : e.target.value})} 
            />
            
          <Input
            placeholder="Descrição do produto"
            onChange={(e) => setProduto({...produto, descricao : e.target.value})} 
            />

          <Input
            placeholder="Preço"
            type="number"
            onChange={(e) => setProduto({...produto, preco : e.target.value})} 
            />

          <Input
            placeholder="Url da imagem"
            onChange={(e) => setProduto({...produto, imagem : e.target.value})} 
            />
            <Input
            placeholder="Categoria"
            onChange={(e) => setProduto({...produto, categoria : e.target.value})} 
            />
          <Button onClick={handleClick}>
            Cadastrar Produto
          </Button>
          {succes && <Success>Cadastrado com sucesso</Success> }
          {error && <Error>Erro ao cadastrar produto</Error> }
        </Form>
      </Wrapper>
    </Container>
 </>
  );
};

export default AddProducts;
