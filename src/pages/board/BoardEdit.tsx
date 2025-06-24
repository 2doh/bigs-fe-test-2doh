import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getPost, patchPost } from "../../apis/board/boards";
import { colors } from "../../styles/theme";

export type patchReq = {
  title: string;
  content: string;
  category: string;
  id: number;
};

const BoardEdit = () => {
  const navi = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const currentPost = async () => {
      const result = await getPost(Number(id));
      setContent(result?.data.content);
      setTitle(result?.data.title);
      setCategory(result?.data.boardCategory);
    };
    currentPost();
  }, []);

  const handleUpdate = async () => {
    const reqData = {
      title: title,
      content: content,
      category: category,
      id: Number(id),
    };
    if (!id) {
      return;
    }
    const result = await patchPost(reqData, file || undefined);
    if (result?.status !== 200) {
      alert("에러가 발생했습니다.");
      navi("/board");
      return;
    }
    alert("수정되었습니다.");
    navi("/board");
    // console.log(result);
  };

  return (
    <WrapStyle>
      <TitleStyle>글 수정</TitleStyle>

      <LabelStyle>카테고리</LabelStyle>
      <SelectStyle value={category} onChange={e => setCategory(e.target.value)}>
        <option value="NOTICE">공지</option>
        <option value="FREE">자유</option>
        <option value="QNA">질문</option>
        <option value="ETC">기타</option>
      </SelectStyle>

      <LabelStyle>제목</LabelStyle>
      <Input value={title} onChange={e => setTitle(e.target.value)} />

      <LabelStyle>내용</LabelStyle>
      <TextareaStyle
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <LabelStyle>이미지</LabelStyle>
      <input
        type="file"
        accept="image/*"
        onChange={e => {
          if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
          }
        }}
      />
      <BtnWrap>
        <BtnStlye onClick={() => handleUpdate()}>수정 완료</BtnStlye>
        <CancelBtnStlye onClick={() => navi(-1)}>취소</CancelBtnStlye>
      </BtnWrap>
    </WrapStyle>
  );
};

export default BoardEdit;

const WrapStyle = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 24px;
  background: #fff;
  border: 1px solid ${colors.stroke};
  border-radius: 12px;
`;

const TitleStyle = styled.h2`
  font-size: 1.5rem;
  color: ${colors.primaryDark};
  margin-bottom: 20px;
`;

const LabelStyle = styled.label`
  display: block;
  margin: 12px 0 4px;
  font-weight: bold;
`;

const SelectStyle = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid ${colors.stroke};
  border-radius: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${colors.stroke};
  border-radius: 6px;
`;

const TextareaStyle = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  margin-top: 4px;
  border: 1px solid ${colors.stroke};
  border-radius: 6px;
  resize: vertical;
`;

const BtnWrap = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

const BtnStlye = styled.button`
  background-color: ${colors.primary};
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;

const CancelBtnStlye = styled(BtnStlye)`
  background-color: ${colors.red};
`;
