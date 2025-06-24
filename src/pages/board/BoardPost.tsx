import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../../styles/theme";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, getPost } from "../../apis/board/boards";

type Post = {
  id: number;
  title: string;
  content: string;
  boardCategory?: string;
  createdAt: string;
  author?: string;
};

const BoardPost = () => {
  const navi = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  const formatDate = (data: string): string =>
    data.slice(0, 10).replace(/-/g, ".");

  const handelDelPost = async () => {
    if (id) {
      const result = await deletePost(Number(id));
      // console.log(result);
      if (result?.status === 200) {
        alert("삭제되었습니다.");
        navi(-1);
      }
    }
  };

  const handlePatchPostNavi = async () => {
    navi(`/board/edit/${id}`);
  };

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      const res = await getPost(Number(id));
      // console.log(res);
      if (res?.data) {
        setPost(res.data);
      }
      if (res?.data === undefined) {
        alert("존재하지 않는 게시글입니다.");
        navi("/board");
      }
    };
    fetchPost();
  }, [id]);

  const categoryMap: { [key: string]: string } = {
    NOTICE: "공지",
    FREE: "자유",
    QNA: "Q&A",
    ETC: "기타",
  };

  return (
    <PostContainer>
      <TitleStyle>{post?.title}</TitleStyle>

      <InfoWrap>
        <CateStyle>{categoryMap[post?.boardCategory ?? ""]}</CateStyle>
        <InfoStyle>
          <span>{post ? formatDate(post?.createdAt) : null}</span>
        </InfoStyle>
      </InfoWrap>

      <ContentStlye>{post?.content}</ContentStlye>
      <BtnWrap>
        <BtnStyle onClick={() => navi(-1)}>목록으로</BtnStyle>
        <BtnSectionWrap>
          <BtnStyle onClick={() => handlePatchPostNavi()}>글 수정</BtnStyle>
          <DeleteBtn onClick={() => handelDelPost()}>삭제</DeleteBtn>
        </BtnSectionWrap>
      </BtnWrap>
    </PostContainer>
  );
};

export default BoardPost;

const PostContainer = styled.div`
  padding: 24px;
  background: #fff;
  border: 1px solid ${colors.stroke};
  border-radius: 12px;
  margin: 40px auto;
  max-width: 1200px;
`;

const TitleStyle = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${colors.primaryDark};
  margin-bottom: 16px;
`;

const InfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  color: #777;
  font-size: 0.9rem;
`;

const CateStyle = styled.span`
  background: ${colors.highlight};
  color: #fff;
  padding: 4px 10px;
  border-radius: 6px;
`;

const InfoStyle = styled.div`
  display: flex;
  gap: 12px;
`;

const ContentStlye = styled.div`
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
  margin-bottom: 32px;
  white-space: pre-wrap;
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BtnStyle = styled.button`
  background-color: ${colors.primary};
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;

const BtnSectionWrap = styled.div`
  display: flex;
  gap: 10px;
`;

const DeleteBtn = styled.button`
  background-color: ${colors.red};
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;
