import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authSignup } from "../../apis/auth/auth";
import { AuthSignupFormProps } from "../../interface/auth/AuthInterface";
import { SignupFormData, signupSchema } from "../../schema/authSchema";
import FormBtn from "../common/FormBtn";
import InputField from "./InputField";

const SignupForm = ({ labelArr, titleObj }: AuthSignupFormProps) => {
  const navi = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    const result = await authSignup(data);
    if (result?.status === false && result.code === 400) {
      alert(result.message);
    }
    if (result?.status === false && result.code === undefined) {
      alert(result.message);
    }
    if (result?.status === true) {
      alert("회원가입 되었습니다.");
      navi("/auth/login");
    }
  };

  return (
    <FormStyle onSubmit={handleSubmit(onSubmit)}>
      {labelArr.map((itm, idx) => (
        <FormGroupStyle key={idx}>
          <InputField
            label={itm.label}
            type={itm.type as keyof SignupFormData}
            register={register}
            name={itm.name}
            error={errors[itm.name]?.message as string | undefined}
          />
        </FormGroupStyle>
      ))}
      <Requirements>
        비밀번호는 8자 이상, 숫자, 영문자, 특수문자(!%*#?&)를 포함해야 합니다
      </Requirements>
      <FormBtn title={titleObj.title} />
      <LinkContainerStyle>
        <LinkStyle to="/auth/login">이미 계정이 있습니까?</LinkStyle>
      </LinkContainerStyle>
    </FormStyle>
  );
};

export default SignupForm;

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

const Requirements = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 12px;
  line-height: 1.4;
`;
