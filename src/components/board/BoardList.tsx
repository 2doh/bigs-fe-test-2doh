import styled from "styled-components";
import { colors } from "../../styles/theme";
import { getPost } from "../../apis/board/boards";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type Post = {
  id: number;
  title: string;
  category?: string;
  createdAt: string;
};

type BoardListProps = {
  posts: Post[];
  selectedCate: string;
};

export const BoardList = ({ posts, selectedCate }: BoardListProps) => {
  const navi = useNavigate();

  const formatDate = (data: string): string => {
    return data.slice(0, 10).replace(/-/g, ".");
  };

  const handleOnClick = async (data: Post) => {
    const postId = data.id;
    const result = await getPost(postId);
    if (result?.status !== 200) {
      alert("알 수 없는 에러가 발생했습니다.");
      return;
    }
    navi(`/board/${data.id}`);
  };

  const categoryMap: { [key: string]: string } = {
    NOTICE: "공지",
    FREE: "자유",
    QNA: "Q&A",
    ETC: "기타",
  };

  const filteredPosts =
    selectedCate === "전체"
      ? posts
      : posts.filter(
          post => categoryMap[post.category ?? "ETC"] === selectedCate,
        );

  return (
    <List>
      {filteredPosts.map(post => (
        <Item key={post.id} onClick={() => handleOnClick(post)}>
          <span>{categoryMap[post.category ?? ""]}</span>
          <span>{post.title}</span>
          <PostWrap>
            <span>{formatDate(post.createdAt)}</span>
          </PostWrap>
        </Item>
      ))}
    </List>
  );
};

const List = styled.div`
  border-top: 2px solid ${colors.stroke};
`;

const Item = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid ${colors.stroke};
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const PostWrap = styled.div`
  display: flex;
  gap: 10px;
  color: #999;
  font-size: 0.9rem;
`;
