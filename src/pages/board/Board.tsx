import React, { useEffect, useState } from "react";
import { BoardLayout } from "../../components/board/BoardLayout";
import styled from "styled-components";
import { getCategories } from "../../apis/board/boards";
import { userAuthStore } from "../../store/userStore";

const Board = () => {
  const [categories, setCategories] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const getCate = async () => {
      const result = await getCategories();
      if (result?.data) {
        setCategories(result.data);
      }
      console.log(result?.data);
    };
    getCate();
  }, []);
  return (
    // <BoardWrap>
    <BoardLayout categories={categories}>게시글</BoardLayout>
    // </BoardWrap>
  );
};

export default Board;

// const BoardWrap = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: calc(100vh - 70px);
// `;
