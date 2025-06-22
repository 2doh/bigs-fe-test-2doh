import Cookies from "js-cookie";

export const isLoggedIn = () => {
  const refresh = Cookies.get("refresh");
  return !!refresh; // refresh 쿠키가 있다면 로그인된 것으로 간주
};
