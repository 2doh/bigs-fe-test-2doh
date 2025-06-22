import { UseFormRegister } from "react-hook-form";
import styled from "styled-components";

type InputFieldProps = {
  label: string;
  type: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
};

const InputField = ({
  label,
  type,
  register,
  name,
  error,
}: InputFieldProps) => {
  return (
    <>
      <LabelStyle>{label}</LabelStyle>
      <InputStyle type={type} {...register(name)} />
      {error && <ErrorStyle>{error}</ErrorStyle>}
    </>
  );
};

export default InputField;

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
  margin-top: 0.5rem;
  color: #dc2626;
`;
