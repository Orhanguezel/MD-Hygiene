import styled from "styled-components";

const HomeContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
`;

const Home = () => {
  return (
    <HomeContainer>
      <h1>MD-Hygienelogistik Yönetim Paneli</h1>
      <p>Hoşgeldiniz! Buradan tüm işlemlerinizi yönetebilirsiniz.</p>
    </HomeContainer>
  );
};

export default Home;
