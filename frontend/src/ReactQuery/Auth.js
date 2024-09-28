import { useDispatch } from "react-redux";
import { LoginUser, RegisterUser } from "../Redux/Reducer/auth";
import { setToken } from "../Redux/Slicer/Auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const useLoginMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: LoginUser,
    onSuccess: (data) => {
      dispatch(setToken({ token: data.token, user: data.user }));
      localStorage.setItem("token", data.token);
      toast.success("Login Successful");
      navigate("/");
    },
    onError: async (error) => {
      let errorMessage = "Invalid Password or Email";

      // Cek apakah error respons dari backend
      if (error.response && error.response.json) {
        const errorData = await error.response.json();
        errorMessage = errorData.message || errorMessage;
      }

      toast.error(errorMessage);
    },
  });
};

export const useRegisterMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: RegisterUser,
    onSuccess: (data) => {
      console.log("Registration Successful:", data);
      toast.success("You have successfully registered. Please log in.");
      navigate("/login");
    },
    onError: (error) => {
      console.error("Registration Error:", error);
      toast.error(error.message || "An error occurred during registration.");
    },
  });
};
