import Cookies from "js-cookie";
import { lazy, Suspense, useEffect, useState } from "react";
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
import BoardPost from "./pages/board/BoardPost";
import BoardEdit from "./pages/board/BoardEdit";
import BoardWritePost from "./pages/board/BoardWritePost";

function App() {
  const { setAccessToken, setIsLoggedIn, accessToken } = userAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);
  const isLogin = !!Cookies.get("refresh");
  // const isLogin = userAuthStore(state => state.isLoggedIn);
  // console.log(isLogin);

  // useEffect(() => {
  //   if (isLogin) {
  //     userAuthStore.getState().setIsLoggedIn(true);
  //   }
  // }, []);

  useEffect(() => {
    const tryRefreshToken = async () => {
      // const token = userAuthStore.getState().accessToken;
      const refresh = Cookies.get("refresh");
      // accessToken 없고, refreshToken이 있는 경우만 재발급 시도
      if (!accessToken && refresh) {
        // console.log("토큰재발급");
        try {
          const res = await axios.post(
            "https://front-mission.bigs.or.kr/auth/refresh",
            {
              refreshToken: refresh,
            },
          );
          // console.log(res.data);
          setAccessToken(res.data.accessToken);
          Cookies.set("refresh", res.data.refreshToken);
          setIsLoggedIn(true);
          // const newAccessToken = res.data.accessToken;
          // userAuthStore.getState().setAccessToken(newAccessToken);
        } catch (e) {
          console.error("토큰 재발급 실패", e);
          alert("로그인 만료되었습니다.");
          Cookies.remove("refresh");
          Cookies.remove("userName");
          Cookies.remove("name");
          window.location.href = "/auth/login";
        }
      } else {
        setIsLoggedIn(!!accessToken);
      }
      setIsInitializing(false);
    };

    tryRefreshToken();
  }, [accessToken]);

  if (isInitializing === null) {
    return (
      <LoadingWrap>
        <LoadingSpinner />
      </LoadingWrap>
    );
  }

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
                isLogin ? <Navigate to="/" /> : <Navigate to="/auth/login" />
              }
            />
            <Route
              path="/board"
              element={isLogin ? <Board /> : <Navigate to="/auth/login" />}
            />
            <Route
              path="/board/:id"
              element={isLogin ? <BoardPost /> : <Navigate to="/auth/login" />}
            />
            <Route
              path="/board/edit/:id"
              element={isLogin ? <BoardEdit /> : <Navigate to="/auth/login" />}
            />
            <Route
              path="/board/write"
              element={
                isLogin ? <BoardWritePost /> : <Navigate to="/auth/login" />
              }
            />
            <Route
              path="*"
              element={<LoadingWrap>잘못된 경로입니다.</LoadingWrap>}
            />
          </Route>
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
