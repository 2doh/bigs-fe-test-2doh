import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authLogin } from "../../apis/auth/auth";
import { AuthFormProps } from "../../interface/auth/AuthInterface";
import { authBaseSchema, SigninFormData } from "../../schema/authSchema";
import FormBtn from "../common/FormBtn";
import InputField from "./InputField";
import Cookies from "js-cookie";
import { userAuthStore } from "../../store/userStore";

const AuthForm = ({ labelArr, titleObj }: AuthFormProps) => {
  const navi = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(authBaseSchema),
  });

  const onSubmit = async (data: SigninFormData) => {
    const result = await authLogin(data);
    if (result?.status === false && result.code === 400) {
      alert(result.message);
    }
    if (result?.status === false && result.code === undefined) {
      alert(result.message);
    }
    if (result?.status === true) {
      Cookies.set("refresh", result.data?.data.refreshToken);
      userAuthStore.getState().setAccessToken(result.data?.data.accessToken);
      userAuthStore.getState().setIsLoggedIn(true);
      // console.log(userAuthStore.getState().accessToken);

      const token = result.data?.data.accessToken;
      if (!token) return;
      const base64Url = token.split(".")[1];
      if (!base64Url) return;
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(c => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
          .join(""),
      );
      const payload = JSON.parse(jsonPayload);
      // console.log(payload);
      Cookies.set("name", payload.name);
      Cookies.set("userName", payload.username);
      navi("/board");
    }
  };

  return (
    <FormStyle onSubmit={handleSubmit(onSubmit)}>
      {labelArr.map((itm, idx) => (
        <FormGroupStyle key={idx}>
          <InputField
            label={itm.label}
            type={itm.type as keyof SigninFormData}
            register={register}
            name={itm.name}
            error={errors[itm.name]?.message as string | undefined}
          />
        </FormGroupStyle>
      ))}

      <FormBtn title={titleObj.title} />
      <LinkContainerStyle>
        <LinkStyle to="/auth/signup">회원가입</LinkStyle>
      </LinkContainerStyle>
    </FormStyle>
  );
};

export default AuthForm;

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroupStyle = styled.div``;

const LinkContainerStyle = styled.div`
  margin: 10px auto 0;
`;

const LinkStyle = styled(Link)`
  color: #3b82f6;
  margin-top: 15px;
  font-weight: 400;
  // font-size: 15px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
