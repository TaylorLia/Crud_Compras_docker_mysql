import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: #545454;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Announcement = () => {
  return <Container>Bem vindo a PenApp !!</Container>;
};

export default Announcement;
