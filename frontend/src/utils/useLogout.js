import { useDispatch } from "react-redux";
import { apiSlice } from "../features/api/apiSlice";
import { navigateTo } from "../utils/navigation";

export const useLogout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    // 1. Remove token
    localStorage.removeItem("authToken");

    // 2. Reset RTK Query cache
    dispatch(apiSlice.util.resetApiState());

    navigateTo("/login");
  };

  return logout;
};
