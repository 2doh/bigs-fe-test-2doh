import styled from "styled-components";

const FormBtn = ({ title }: { title: string }) => {
  return <Button type="submit">{title}</Button>;
};

export default FormBtn;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #2a1b07;
  color: white;
  font-weight: bold;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #1f1405;
  }
`;
