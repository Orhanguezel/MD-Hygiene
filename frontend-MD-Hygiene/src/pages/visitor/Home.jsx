import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomeContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
`;

const Home = () => {
  const state = useSelector((state) => state.auth);

  return (
    <HomeContainer>
      <h1>
        Merhaba,{" "}
        <Link
          to="/profile"
          style={{ color: "blue", textDecoration: "none", cursor: "pointer" }}
        >
          {state?.user?.name || "Misafir"}
        </Link>
        !
      </h1>
    </HomeContainer>
  );
};

export default Home;
