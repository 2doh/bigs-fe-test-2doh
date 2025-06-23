import styled from "styled-components";
import { colors } from "../../styles/theme";

export const BoardList = () => {
  const dummyPosts = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    title: `게시글 제목 ${i + 1}`,
    author: "홍길동",
    date: "2025-06-23",
  }));

  return (
    <List>
      {dummyPosts.map(post => (
        <Item key={post.id}>
          <span>{post.title}</span>
          <PostMeta>
            <span>{post.author}</span>
            <span>{post.date}</span>
          </PostMeta>
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

const PostMeta = styled.div`
  display: flex;
  gap: 10px;
  color: #999;
  font-size: 0.9rem;
`;
