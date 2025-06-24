import styled from "styled-components";
import { colors } from "../../styles/theme";

type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
};

export const Pagination = ({ page, setPage }: PaginationProps) => {
  const totalPage = 5;

  return (
    <PaginationWrap>
      <PageButton
        onClick={() => setPage(Math.max(page - 1, 0))}
        disabled={page === 0}
      >
        {`<`}
      </PageButton>

      {Array.from({ length: totalPage }).map((_, idx) => (
        <PageButton
          key={idx}
          $active={page === idx}
          onClick={() => setPage(idx)}
        >
          {idx + 1}
        </PageButton>
      ))}

      <PageButton
        onClick={() => setPage(Math.min(page + 1, totalPage - 1))}
        disabled={page === totalPage - 1}
      >
        {`>`}
      </PageButton>
    </PaginationWrap>
  );
};

const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  padding: 6px 12px;
  margin: 0 4px;
  border: 1px solid ${colors.stroke};
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ $active }) => ($active ? colors.highlight : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#000")};

  &:hover {
    background-color: ${colors.highlight};
    color: #fff;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
