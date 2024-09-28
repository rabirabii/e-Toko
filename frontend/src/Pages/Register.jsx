import React from "react";
import { useRegisterMutation } from "../ReactQuery/Auth";
import LoginRegister from "../components/Form/Login_Register/Login_Register";

const Register = () => {
  const registerMutation = useRegisterMutation();
  const handleRegister = (formData) => {
    console.log("Form Data to Register:", formData);

    registerMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Registration successful! Please log in.");
        navigate("/login");
      },
      onError: (error) => {
        console.error("Registration Error:", error);
        toast.error(error.message || "Registration failed!");
      },
    });
  };
  return (
    <div>
      <LoginRegister
        isRegister={true}
        href="/login"
        icon="/default.png"
        name="Register"
        onSubmit={handleRegister}
        h1="Create an Account"
        h3="Join our community today"
      />
    </div>
  );
};

export default Register;
