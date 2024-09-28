import React from "react";
import LoginRegister from "../components/Form/Login_Register/Login_Register";
import { useLoginMutation } from "../ReactQuery/Auth"; // Pastikan path ini sesuai

const Login = () => {
  const loginMutation = useLoginMutation();

  const handleLogin = (formData) => {
    console.log("Form Data for Login:", formData);
    loginMutation.mutate(formData);
  };

  return (
    <div>
      <LoginRegister
        isRegister={false}
        href="/register"
        icon="/default.png"
        name="Login"
        onSubmit={handleLogin}
        h1="Welcome Back!"
        h3="Login to your account"
      />
    </div>
  );
};

export default Login;
