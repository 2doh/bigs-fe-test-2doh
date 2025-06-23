import styled from "styled-components";
import { colors } from "../../styles/theme";

export const Pagination = () => {
  return (
    <PaginationWrap>
      <PageButton>{`<`}</PageButton>
      {[1, 2, 3, 4, 5].map(num => (
        <PageButton key={num}>{num}</PageButton>
      ))}
      <PageButton>{`>`}</PageButton>
    </PaginationWrap>
  );
};

const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PageButton = styled.button`
  padding: 6px 12px;
  margin: 0 4px;
  border: 1px solid ${colors.stroke};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.highlight};
    color: #fff;
  }
`;
