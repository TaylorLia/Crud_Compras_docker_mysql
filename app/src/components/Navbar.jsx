import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { redirect } from "react-router-dom";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
  background-color: #bdbebd;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
  cursor: pointer;
  color:white;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);


  const checkout = () => {
    try {
      localStorage.removeItem("persist:root");
      window.location.href = "http://localhost:3000/login";
    } catch (error) {
      console.log(error);
    }  
  }

  return (
    <Container>
      <Wrapper>
        <Left>
        {user?.is_adm && <Link to="/addproducts"> <MenuItem>Cadastrar produto</MenuItem></Link>} 
        {user?.is_adm && <Link to="/listorders"><MenuItem>Listagem de pedidos</MenuItem></Link> }
        </Left>
        <Center>
          <Logo>
            <Link to="/">
              PENAPP!
            </Link>
          </Logo>
        </Center>
        <Right>
        {!user && <Link to="/login">
          <MenuItem>ENTRE</MenuItem>
        </Link> }
        {!user && <Link to="/register">
          <MenuItem>CADASTRE-SE</MenuItem>
        </Link>}
        {user?.usuario}
        {user && <MenuItem onClick={checkout}>SAIR</MenuItem>}
          <Link to="/cart">
          <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
