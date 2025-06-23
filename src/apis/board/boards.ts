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
