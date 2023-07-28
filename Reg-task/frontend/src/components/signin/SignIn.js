import React from "react";
import { useState } from "react";
import "./Signin.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8060/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (data.status === "please enter email and password") {
      setError("please enter email and password");
    }
    if (data.status === "incorrect email or password") {
      setError("inncorect email and password");
    }
    if (data.status === "sucsses") {
      localStorage.setItem("token", data.token);
      navigate("/profile");

    }
  };

  const onChangeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="signin_container">
        <form onSubmit={onSubmitHandler} className="signin-form">
          <input
            onChange={onChangeEmail}
            type="email"
            value={email}
            placeholder="Email"
          />
          <input
            onChange={onChangePassword}
            type="password"
            value={password}
            placeholder="Password"
          />
          {error && <div className="error-message">{error}</div>}
          <input type="submit" value="Signin" className="signbtn" />
        </form>
      </div>
    </>
  );
};

export default SignIn;
