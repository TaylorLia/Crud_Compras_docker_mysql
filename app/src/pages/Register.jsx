import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://media.gazetadopovo.com.br/haus/2016/10/cadeira-assento-escritorio-produtividade-design2-1024x681-547d3fb0.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #545454;
  color: white;
  cursor: pointer;
  margin-top: 10px;
`;

const Link_a = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  margin : 10px;
`;
const Error = styled.span`
  color: red;
`;
const Register = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    nome : '',
    email: '',
    username : '',
    cpf : '',
    fone : '',
    endereco : '',
    cidade : '',
    bairro : '',
    cep : '',
    numero : 0,
    senha : ''
  });
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    register(dispatch, user);
  }
  
useEffect(()=> console.log( JSON.stringify(user)),[user]);

  return (
    <Container>
      <Wrapper>
        <Title>CRIE UMA CONTA</Title>
        <Form>
          <Input placeholder="Nome" onChange={ (e) => setUser({...user, nome : e.target.value})}/>
          <Input placeholder="email" type="email" onChange={(e) => setUser({...user, email : e.target.value})} />
          <Input placeholder="Username" onChange={(e) => setUser({...user, username : e.target.value})} />
          <Input placeholder="CPF" onChange={(e) => setUser({...user, cpf : e.target.value})} />
          <Input placeholder="Celular" type="phone" onChange={(e) => setUser({...user, fone : e.target.value})} />
          <Input placeholder="Endereço" onChange={(e) => setUser({...user, endereco : e.target.value})} />
          <Input placeholder="Cidade" onChange={(e) => setUser({...user, cidade : e.target.value})} />
          <Input placeholder="Bairro" onChange={(e) => setUser({...user, bairro : e.target.value})} />
          <Input placeholder="CEP" onChange={(e) => setUser({...user, cep : Number(e.target.value)})} />
          <Input placeholder="Numero" type="number" onChange={(e) => setUser({...user, numero : e.target.value})} />
          <Input placeholder="Senha" type="password" onChange={(e) => setUser({...user, senha : e.target.value})} />
          <Agreement>
            Ou, então
            <Link to="/login">
              <span> </span>entre com sua conta
            </Link>
          </Agreement>
          <Button onClick={handleClick}>CADASTRE-SE</Button>
        </Form>
        <Wrapper>
        {error && <Error>Houve um erro...</Error>} 
        </Wrapper>
      </Wrapper>
    </Container>
  );
};

export default Register;
