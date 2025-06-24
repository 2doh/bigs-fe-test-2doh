import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../styles/theme";
import { useNavigate, useParams } from "react-router-dom";
import { writePost } from "../../apis/board/boards";

export type postReq = { title: string; content: string; category: string };

const BoardWritePost = () => {
  const navi = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("NOTICE");
  const [file, setFile] = useState<File | null>(null);

  const handleWrite = async () => {
    if (title === "" || (content === "" && category === "")) {
      alert("빈 칸을 입력해주세요.");
      return;
    }
    const reqData = {
      title: title,
      content: content,
      category: category,
    };
    const result = await writePost(reqData, file ?? undefined);
    // console.log(result);
    if (result?.status !== 201) {
      alert("에러가 발생했습니다.");
      navi("/board");
      return;
    }

    alert("작성되었습니다.");
    navi("/board");
  };

  return (
    <WrapStyle>
      <TitleStyle>글 작성</TitleStyle>

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

      <LabelStyle>이미지 첨부</LabelStyle>
      <Input
        type="file"
        accept="image/*"
        onChange={e => {
          if (e.target.files?.[0]) setFile(e.target.files[0]);
        }}
      />

      <BtnWrap>
        <BtnStlye onClick={() => handleWrite()}>작성</BtnStlye>
        <CancelBtnStlye onClick={() => navi(-1)}>취소</CancelBtnStlye>
      </BtnWrap>
    </WrapStyle>
  );
};

export default BoardWritePost;

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
