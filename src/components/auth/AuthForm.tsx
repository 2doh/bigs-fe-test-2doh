import styled from "styled-components";
import FormBtn from "../common/FormBtn";
import { AuthFormProps } from "../../interface/auth/AuthInterface";

const AuthForm = ({ labelArr, titleObj }: AuthFormProps) => {
  return (
    <FormStyle>
      {labelArr.map((itm, idx) => (
        <FormGroupStyle key={idx}>
          <LabelStyle>{itm.label}</LabelStyle>
          <InputStyle type={itm.type}></InputStyle>
          <ErrorStyle></ErrorStyle>
        </FormGroupStyle>
      ))}
      <FormBtn title={titleObj.title} />
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

const LabelStyle = styled.label`
  display: block;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  color: #2a1b07;
`;

const InputStyle = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #e6e5e6;
  border-radius: 0.5rem;
  outline: none;

  &:focus {
    border-color: #a29bfe;
    box-shadow: 0 0 0 2px rgba(162, 155, 254, 0.2);
  }

  color: #2a1b07;
`;

const ErrorStyle = styled.p`
  font-size: 0.875rem;
  margin-top: 0.25rem;
  color: #dc2626;
`;
