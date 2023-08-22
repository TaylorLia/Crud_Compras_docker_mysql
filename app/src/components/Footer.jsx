import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}

`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>PENAPP.</Logo>
        <Desc>
          Somo uma emqpresa produtora e vendedora de canetas para o mundo todo !!. Nos importamos em atender
          todos os tipos de demandas, desde a canetas comuns até canetas complemtamente estilizadas que as mais diversas
          personalizações, Tudo para oferecer uma melhor experiencia com canetas para você !!
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Links</Title>
        <List>
          <ListItem>
            <Link to="/">
              Home
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/cart">
              Cart
            </Link>
            </ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contato</Title>
        <ContactItem>
          <Room style={{marginRight:"10px"}}/> Universidade do contestado
        </ContactItem>
        <ContactItem>
          <Phone style={{marginRight:"10px"}}/> 5547984480699
        </ContactItem>
        <ContactItem>
          <MailOutline style={{marginRight:"10px"}} /> marcio.junior@aluno.unc.br
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;
