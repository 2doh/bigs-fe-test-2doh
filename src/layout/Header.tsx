import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../styles/theme";
import { userAuthStore } from "../store/userStore";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navi = useNavigate();
  const [userName, setUserName] = useState<string | undefined>("");
  const [userMail, setUserMail] = useState<string | undefined>("");
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    Cookies.remove("refresh");
    Cookies.remove("name");
    Cookies.remove("userName");
    userAuthStore.getState().setAccessToken("");
    userAuthStore.getState().setIsLoggedIn(false);
    navi("/auth/login");
  };

  useEffect(() => {
    const userNameStr = Cookies.get("name");
    const userMailStr = Cookies.get("userName");
    setUserName(userNameStr);
    setUserMail(userMailStr);
  }, []);

  return (
    <HeaderWrap>
      <HeaderContainer>
        <NavWrap>
          <NavStyle>홈</NavStyle>
          <NavStyle href="/board">게시판</NavStyle>
          <NavStyle>마이페이지</NavStyle>
        </NavWrap>
        <UserInfoWrap>
          {userName && <UserMailAdr>{userMail}</UserMailAdr>}
          {userName && <UserName>{userName}님</UserName>}
          <LogoutBtn onClick={e => handleLogout(e)}>로그아웃</LogoutBtn>
        </UserInfoWrap>
        {/* <LogoutBtn onClick={e => handleLogout(e)}>로그아웃</LogoutBtn> */}
      </HeaderContainer>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.header`
  width: 100%;
  height: 64px;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.stroke};
  /* position: fixed; */
  top: 0;
  left: 0;
  z-index: 100;
`;

const HeaderContainer = styled.div`
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavWrap = styled.nav`
  display: flex;
  gap: 24px;
`;

const NavStyle = styled.a`
  text-decoration: none;
  color: ${colors.grayDark};
  font-weight: 500;

  &:hover {
    color: ${colors.primaryDark};
  }
`;

const LogoutBtn = styled.button`
  background-color: ${colors.red};
  color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
`;

const UserInfoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserName = styled.span`
  font-weight: 400;
  color: ${colors.primaryDark};
  @media screen and (max-width: 400px) {
    display: none;
  }
`;

const UserMailAdr = styled.span`
  font-weight: 400;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;
