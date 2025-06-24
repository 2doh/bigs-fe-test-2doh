import React, { useEffect, useState } from "react";
import { BoardLayout } from "../../components/board/BoardLayout";
import styled from "styled-components";
import { getCategories, getPostsAll } from "../../apis/board/boards";
import { userAuthStore } from "../../store/userStore";
import { BoardList } from "../../components/board/BoardList";

const Board = () => {
  const [categories, setCategories] = useState<{ [key: string]: string }>({});
  const [seletedCate, setSeletedCate] = useState<string>("전체");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getCate = async () => {
      const result = await getCategories();
      if (result?.data) {
        setCategories(result.data);
      }

      // console.log(result?.data);
    };
    getCate();
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      const tempData = {
        currentPage: page,
      };
      const result = await getPostsAll(tempData);
      // console.log(result);

      if (result?.data?.content) {
        setPosts(result.data.content);
      }
    };
    getPosts();
  }, [seletedCate, page]);

  return (
    // <BoardWrap>
    <BoardLayout
      categories={categories}
      seletedCate={seletedCate}
      setSeletedCate={setSeletedCate}
      page={page}
      setPage={setPage}
    >
      <BoardList posts={posts} selectedCate={seletedCate}></BoardList>
    </BoardLayout>
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
