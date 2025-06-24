import styled from "styled-components";
import { colors } from "../../styles/theme";
import { BoardList } from "./BoardList";
import { Pagination } from "./Pagination";
import { useNavigate } from "react-router-dom";

type BoardLayoutProps = {
  children: React.ReactNode;
  categories: { [key: string]: string };
  seletedCate: string;
  setSeletedCate: (category: string) => void;
  page: number;
  setPage: (page: number) => void;
};

export const BoardLayout = ({
  children,
  categories,
  seletedCate,
  setSeletedCate,
  page,
  setPage,
}: BoardLayoutProps) => {
  const navi = useNavigate();

  const categoryList = ["전체", ...Object.values(categories)];

  const onCateSelect = (e: React.MouseEvent, data: string) => {
    e.preventDefault();
    setSeletedCate(data);
    setPage(0);
  };

  const handleNavi = () => {
    navi(`/board/write`);
  };

  return (
    <WrapStlye>
      {/* <Header></Header> */}
      <BoardTopStyle>
        <TitleStyle>게시판</TitleStyle>
        <BtnWrap>
          <WriteBtn onClick={() => handleNavi()}>글쓰기</WriteBtn>
        </BtnWrap>
      </BoardTopStyle>

      <CategoryList>
        {categoryList.map(data => (
          <Category
            $active={seletedCate === data}
            key={data}
            onClick={e => {
              e.preventDefault();
              setSeletedCate(data);
              setPage(0);
            }}
          >
            {data}
          </Category>
        ))}
      </CategoryList>

      <Content>{children}</Content>
      <Pagination page={page} setPage={setPage} />
    </WrapStlye>
  );
};

const WrapStlye = styled.div`
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

const WriteBtn = styled.button`
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

const Category = styled.div<{ $active?: boolean }>`
  padding: 6px 12px;
  border: 0.5px solid ${colors.stroke};
  /* border-radius: 8px; */
  cursor: pointer;
  background-color: ${({ $active }) => ($active ? colors.highlight : "white")};
  color: ${({ $active }) => ($active ? "#fff" : "#000")};

  &:hover {
    background-color: ${colors.highlight};
    color: #fff;
  }
`;

const Content = styled.div`
  margin: 10px 0;
`;
