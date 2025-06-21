import React from "react";
import styled from "styled-components";
import AuthForm from "./AuthForm";
import { AuthFormProps } from "../../interface/auth/AuthInterface";

const Auth = ({ labelArr, titleObj }: AuthFormProps) => {
  return (
    <AuthWrap>
      <AuthBox>
        <TitleStyle>{titleObj.title}</TitleStyle>
        <AuthForm labelArr={labelArr} titleObj={titleObj}></AuthForm>
      </AuthBox>
    </AuthWrap>
  );
};

export default Auth;

const AuthWrap = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
  padding: 1rem;
`;

const AuthBox = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: white;
  border: 1px solid #e6e5e6;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TitleStyle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #2a1b07;
`;
