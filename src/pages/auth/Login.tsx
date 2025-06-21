import React from "react";
import Auth from "../../components/auth/Auth";
import { LabelItem } from "../../interface/auth/AuthInterface";

const Login = () => {
  const labelArr: LabelItem[] = [
    { label: "이메일", type: "email" },
    { label: "비밀번호", type: "password" },
  ];
  const titleObj = { title: "로그인" };

  return <Auth labelArr={labelArr} titleObj={titleObj}></Auth>;
};

export default Login;
