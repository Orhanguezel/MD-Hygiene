import styled from "styled-components";


const FooterContainer = styled.footer`
  background-color: #222;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  margin-top: 30px;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const LinkItem = styled.a`
  color: #ddd;
  font-size: 1.5rem;
  transition: color 0.3s;

  &:hover {
    color: #f8b400;
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  color: #bbb;
  margin-top: 10px;
`;

export { FooterContainer, FooterContent, FooterLinks, LinkItem, Copyright };