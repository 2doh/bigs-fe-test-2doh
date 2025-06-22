import axios from "axios";
import { SigninFormData, SignupFormData } from "../../schema/authSchema";
import axiosInstance from "../../util/axiosInstance";

export const authLogin = async (data: SigninFormData) => {
  // console.log(data);
  const req = { username: data.mail, password: data.pass };
  try {
    const response = await axios.post(
      `https://front-mission.bigs.or.kr/auth/signin`,
      req,
    );
    return {
      status: true,
      data: response,
    };
  } catch (error) {
    // console.log(error);
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      //   const message = error.response?.data;
      //   console.error("Axios error:", {
      //     status,
      //     message,
      //   });

      return {
        status: false,
        code: status,
        message: "아이디 혹은 비밀번호를 확인해주세요.",
      };
    } else {
      //   console.error("Unknown error:", error);
      return {
        status: false,
        message: "예상치 못한 오류가 발생했습니다.",
      };
    }
  }
};

export const authSignup = async (data: SignupFormData) => {
  const req = {
    username: data.mail,
    name: data.userName,
    password: data.pass,
    confirmPassword: data.confirmPass,
  };
  try {
    const response = await axios.post(
      `https://front-mission.bigs.or.kr/auth/signup`,
      req,
    );
    return {
      status: true,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      return {
        status: false,
        code: status,
        message: "회원가입에 실패하였습니다.",
      };
    } else {
      return {
        status: false,
        message: "예상치 못한 오류가 발생했습니다.",
      };
    }
  }
};
