import Cookies from "js-cookie";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "./components/common/LoadingSpinner";
import Main from "./layout/Main";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { userAuthStore } from "./store/userStore";
import "./styles/css/common.css";
import "./styles/css/reset.css";
import axios from "axios";

function App() {
  const isLogin = userAuthStore(state => state.isLoggedIn);
  console.log(isLogin);

  useEffect(() => {
    if (isLogin) {
      userAuthStore.getState().setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const tryRefreshToken = async () => {
      const token = userAuthStore.getState().accessToken;
      const refresh = Cookies.get("refresh");

      // accessToken 없고, refreshToken이 있는 경우만 재발급 시도
      if (!token && refresh) {
        try {
          const res = await axios.post(
            "https://front-mission.bigs.or.kr/auth/refresh",
            {
              refreshToken: refresh,
            },
          );
          const newAccessToken = res.data.accessToken;
          userAuthStore.getState().setAccessToken(newAccessToken);
        } catch (e) {
          console.error("토큰 재발급 실패", e);
          Cookies.remove("refresh");
          window.location.href = "/auth/login";
        }
      }
    };

    tryRefreshToken();
  }, []);

  // if (isLogin === null) {
  //   return (
  //     <LoadingWrap>
  //       <LoadingSpinner />
  //     </LoadingWrap>
  //   );
  // }

  const Board = lazy(() => import("./pages/board/Board"));

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <LoadingWrap>
            <LoadingSpinner />
          </LoadingWrap>
        }
      >
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />

          <Route element={<Main />}>
            <Route
              path="/"
              element={
                isLogin ? (
                  <Navigate to="/board" />
                ) : (
                  <Navigate to="/auth/login" />
                )
              }
            />
            <Route
              path="/board"
              element={isLogin ? <Board /> : <Navigate to="/auth/login" />}
            />
            <Route
              path="*"
              element={<LoadingWrap>잘못된 경로입니다.</LoadingWrap>}
            />
          </Route>
          {/* <Route
            path="/"
            element={
              isLogin ? <Navigate to="/board" /> : <Navigate to="/auth/login" />
            }
          />
          <Route
            path="/board"
            element={isLogin ? <Board /> : <Navigate to="/auth/login" />}
          /> */}
          {/* <Route
            path="*"
            element={<LoadingWrap>잘못된 경로입니다.</LoadingWrap>}
          ></Route> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

const LoadingWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;

export default App;
