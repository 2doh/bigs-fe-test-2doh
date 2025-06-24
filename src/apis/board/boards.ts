import { patchReq } from "../../pages/board/BoardEdit";
import { postReq } from "../../pages/board/BoardWritePost";
import axiosInstance from "../../util/axiosInstance";

export const getCategories = async () => {
  try {
    const res = await axiosInstance(
      "https://front-mission.bigs.or.kr/boards/categories",
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getPostsAll = async ({ currentPage }: { currentPage: number }) => {
  try {
    const res = await axiosInstance(
      `https://front-mission.bigs.or.kr/boards?page=${currentPage}&size=10`,
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getPost = async (id: number) => {
  try {
    const res = await axiosInstance(
      `https://front-mission.bigs.or.kr/boards/${id}`,
    );
    return res;
  } catch (error) {
    console.log(error);
    // return {
    //   message: "존재하지 않는 게시글",
    // };
  }
};

export const deletePost = async (id: number) => {
  try {
    const res = await axiosInstance.delete(
      `https://front-mission.bigs.or.kr/boards/${id}`,
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const patchPost = async (reqData: patchReq, file?: File) => {
  const formData = new FormData();
  const req = {
    title: reqData.title,
    content: reqData.content,
    category: reqData.category,
  };
  formData.append(
    "request",
    new Blob([JSON.stringify(req)], { type: "application/json" }),
  );
  if (file) {
    formData.append("file", file);
  }
  // console.log(reqData);
  try {
    const res = await axiosInstance.patch(
      `https://front-mission.bigs.or.kr/boards/${reqData.id}`,
      formData,
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const writePost = async (req: postReq, file?: File) => {
  const formData = new FormData();
  const requestJson = {
    title: req.title,
    content: req.content,
    category: req.category,
  };
  formData.append(
    "request",
    new Blob([JSON.stringify(requestJson)], { type: "application/json" }),
  );
  // formData.append("request", JSON.stringify(requestJson));
  if (file) {
    formData.append("file", file);
  }
  try {
    const res = await axiosInstance.post(
      `https://front-mission.bigs.or.kr/boards`,
      formData,
    );
    return res;
  } catch (error) {
    console.log("업로드 실패:", error);
  }
};
