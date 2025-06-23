import styled from "styled-components";
import { colors } from "../../styles/theme";
import { BoardList } from "./BoardList";
import { Pagination } from "./Pagination";

type BoardLayoutProps = {
  children: React.ReactNode;
  categories: { [key: string]: string };
};

export const BoardLayout = ({ children, categories }: BoardLayoutProps) => {
  const categoryValues = Object.values(categories);
  return (
    <Wrap>
      {/* <Header></Header> */}
      <BoardTopStyle>
        <TitleStyle>게시판</TitleStyle>
        <BtnWrap>
          <WriteButton>글쓰기</WriteButton>
          {/* <LogoutButton>로그아웃</LogoutButton> */}
        </BtnWrap>
      </BoardTopStyle>
      <CategoryList>
        {categoryValues.map(data => (
          <Category key={data}>{data}</Category>
        ))}
      </CategoryList>
      <Content>{children}</Content>
      {/* <br /> */}
      <BoardList></BoardList>
      <Pagination></Pagination>
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 20px;
  /* min-width: 1200px; */
  width: 100%;
  max-width: 1200px;
  margin: 50px auto 0;
`;

const BoardTopStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleStyle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.primaryDark};
`;

const BtnWrap = styled.div`
  display: flex;
  gap: 1rem;
`;

const WriteButton = styled.button`
  background-color: ${colors.primary};
  color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
`;

const CategoryList = styled.div`
  display: flex;
  /* gap: 0.25rem; */
  margin: 20px 0;
`;

const Category = styled.div`
  padding: 6px 12px;
  border: 0.5px solid ${colors.stroke};
  /* border-radius: 8px; */
  cursor: pointer;

  &:hover {
    background-color: ${colors.highlight};
    color: #fff;
  }
`;

const Content = styled.div`
  margin: 10px 0;
`;
