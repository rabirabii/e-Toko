import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input } from "../../ui/input";
import { Checkbox } from "../../ui/checkbox";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";

const LoginRegister = ({ isRegister, href, icon, name, onSubmit, h1, h3 }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <section className="flex justify-between items-center p-8">
      <div className="w-1/2">
        <h1 className="text-3xl font-bold mb-2">{h1}</h1>
        <h3 className="text-xl mb-6">{h3}</h3>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1">
                Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          {!isRegister && (
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                <label htmlFor="rememberMe" className="ml-2">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot Password
              </Link>
            </div>
          )}
          <Button type="submit" className="w-full mb-4">
            {isRegister ? "Register" : "Login"}
          </Button>
        </form>
        {!isRegister && (
          <div className="text-center">
            <span>Don't have an account? </span>
            <Link to={href} className="text-blue-600 hover:underline">
              Register
            </Link>
          </div>
        )}
      </div>
      <div className="w-1/2 flex justify-center">
        <img src={icon} alt={`${name} icon`} className="max-w-full h-auto" />
      </div>
    </section>
  );
};

LoginRegister.propTypes = {
  isRegister: PropTypes.bool.isRequired,
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  h1: PropTypes.string.isRequired,
  h3: PropTypes.string.isRequired,
};

export default LoginRegister;
