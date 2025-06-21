import React from "react";
import { LabelItem } from "../../interface/auth/AuthInterface";
import Auth from "../../components/auth/Auth";

const Signup = () => {
  const labelArr: LabelItem[] = [
    { label: "이메일", type: "email" },
    { label: "이름", type: "text" },
    { label: "비밀번호", type: "password" },
    { label: "비밀번호 확인", type: "password" },
  ];
  const titleObj = { title: "로그인" };

  return <Auth labelArr={labelArr} titleObj={titleObj}></Auth>;
};

export default Signup;
