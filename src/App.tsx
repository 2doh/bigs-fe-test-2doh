import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "./components/common/LoadingSpinner";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import "./styles/css/common.css";
import "./styles/css/reset.css";
import { isLoggedIn } from "./util/authUtil";

function App() {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  useEffect(() => {
    const loggenIn = isLoggedIn();
    setIsLogin(loggenIn);
  }, []);

  if (isLogin === null) {
    return (
      <LoadingWrap>
        <LoadingSpinner />
      </LoadingWrap>
    );
  }

  const Board = lazy(() => import("./pages/board/Board"));

  return (
    <BrowserRouter>
      <RootLayout>
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
            <Route
              path="/board"
              element={isLogin ? <Board /> : <Navigate to="/auth/login" />}
            />
            <Route
              path="*"
              element={<LoadingWrap>잘못된 경로입니다.</LoadingWrap>}
            ></Route>
          </Routes>
        </Suspense>
      </RootLayout>
    </BrowserRouter>
  );
}

const RootLayout = styled.main`
  min-height: 100vh;
`;

const LoadingWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export default App;
