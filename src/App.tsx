import "./styles/css/reset.css";
import "./styles/css/common.css";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        {/* <Login></Login> */}
        <Signup></Signup>
      </RootLayout>
    </BrowserRouter>
  );
}

const RootLayout = styled.main`
  min-height: 100vh;
`;

export default App;
