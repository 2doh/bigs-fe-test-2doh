import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Header } from "./Header";

const Main = () => {
  return (
    <>
      <Header />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </>
  );
};

const ContentWrapper = styled.main`
  /* padding-top: 64px; */
  /* min-height: 100vh; */
`;

export default Main;
