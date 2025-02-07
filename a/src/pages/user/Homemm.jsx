import styled from "styled-components";

const HomeContainer = styled.div`
  margin-left: 250px;
  padding: 20px;
  min-height: 100vh;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
`;

export default function Home() {
  return (
    <HomeContainer>
      <h1>Hoşgeldiniz</h1>
      <p>Bu, MD-Hygienelogistik yönetim panelidir.</p>
    </HomeContainer>
  );
}
